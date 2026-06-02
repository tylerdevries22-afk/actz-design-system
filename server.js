#!/usr/bin/env node
// ACTZ Design System — unified server
// Port 4321: static files + nav API + (optional) Claude Edit API
//
// Usage:
//   node server.js                         # static + nav only
//   ANTHROPIC_API_KEY=sk-ant-... node server.js  # + AI edit

'use strict';

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const ROOT       = __dirname;
const PORT       = 4321;
const API_KEY    = process.env.ANTHROPIC_API_KEY || null;
const MODEL      = 'claude-sonnet-4-6';
const LABELS_FILE = path.join(ROOT, 'nav-labels.json');

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.ico': 'image/x-icon', '.md': 'text/markdown',
};

// ─── helpers ────────────────────────────────────────────────────

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch (e) { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function safePath(rel) {
  const abs = path.resolve(ROOT, rel.replace(/^\/+/, ''));
  if (!abs.startsWith(ROOT + path.sep) && abs !== ROOT) return null;
  return abs;
}

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function serveStatic(req, res, reqPath) {
  let filePath = path.join(ROOT, reqPath === '/' ? 'index.html' : reqPath);
  // strip query string
  filePath = filePath.split('?')[0];

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  // if path points to a directory, try index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not found: ' + reqPath); return;
  }

  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);
  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-store',
  });
  res.end(data);
}

// ─── nav helpers ────────────────────────────────────────────────

function readLabels() {
  try { return JSON.parse(fs.readFileSync(LABELS_FILE, 'utf-8')); }
  catch { return { sectionOrder: [], files: {} }; }
}

function writeLabels(data) {
  fs.writeFileSync(LABELS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

const DEFAULT_SECTION_ORDER = [
  'UI Kit — Marketing', 'UI Kit — Onboarding', 'UI Kit — App',
  'Type', 'Colors', 'Spacing', 'Components', 'Brand',
];

function inferSection(fileUrl) {
  const filename = path.basename(fileUrl).toLowerCase();
  if (fileUrl.startsWith('ui_kits/')) {
    const dir = fileUrl.split('/')[1];
    return 'UI Kit — ' + dir.charAt(0).toUpperCase() + dir.slice(1);
  }
  if (fileUrl.startsWith('one-pagers/')) return 'Brand';
  if (filename.startsWith('brand-'))     return 'Brand';
  if (filename.startsWith('color'))      return 'Colors';
  if (filename.startsWith('type') || filename.startsWith('typography')) return 'Type';
  if (filename.startsWith('spacing') || filename.startsWith('easing') ||
      filename.startsWith('radii')   || filename.startsWith('shadow') ||
      filename.startsWith('radius'))   return 'Spacing';
  if (filename.startsWith('component') || filename.startsWith('button') ||
      filename.startsWith('glass')     || filename.startsWith('pill') ||
      filename.startsWith('input')     || filename.startsWith('modal') ||
      filename.startsWith('card')      || filename.startsWith('nav-') ||
      filename.startsWith('badge'))    return 'Components';
  return null;
}

function inferLabel(fileUrl, section) {
  const name = path.basename(fileUrl, '.html')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
  return section ? section + ' · ' + name : name;
}

function scanFiles() {
  const found = [];

  const scanDir = (dir, prefix) => {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return;
    fs.readdirSync(abs).filter(f => f.endsWith('.html')).forEach(f => {
      found.push(prefix + f);
    });
  };

  scanDir('preview', 'preview/');
  scanDir('one-pagers', 'one-pagers/');

  // ui_kits: one index.html per subfolder
  const ukRoot = path.join(ROOT, 'ui_kits');
  if (fs.existsSync(ukRoot)) {
    fs.readdirSync(ukRoot).forEach(dir => {
      const idx = path.join(ukRoot, dir, 'index.html');
      if (fs.existsSync(idx)) found.push(`ui_kits/${dir}/index.html`);
    });
  }

  return found;
}

// ─── route: GET /api/nav ────────────────────────────────────────

function handleGetNav(req, res) {
  const labels = readLabels();
  const sectionOrder = labels.sectionOrder || DEFAULT_SECTION_ORDER;
  const knownFiles   = labels.files || {};

  const allFiles  = scanFiles();
  const knownSet  = new Set(Object.keys(knownFiles));
  const newFiles  = [];

  allFiles.forEach(fileUrl => {
    if (knownSet.has(fileUrl)) return;
    // new file — try to auto-detect section
    const inferredSection = inferSection(fileUrl);
    const inferredLabel   = inferLabel(fileUrl, inferredSection);
    newFiles.push({ url: fileUrl, inferredSection, inferredLabel });
  });

  // Build groups from known files (only include files that exist on disk)
  const groupMap = {};
  sectionOrder.forEach(s => { groupMap[s] = { label: s, open: true, items: [] }; });

  Object.entries(knownFiles).forEach(([fileUrl, meta]) => {
    const abs = path.join(ROOT, fileUrl);
    if (!fs.existsSync(abs)) return;
    const sec = meta.section;
    if (!groupMap[sec]) groupMap[sec] = { label: sec, open: true, items: [] };
    groupMap[sec].items.push({
      label:  meta.label,
      url:    fileUrl,
      status: meta.status || 'check',
      ...(meta.sub ? { sub: meta.sub } : {}),
    });
  });

  // Build ordered groups, skip empty ones
  const seen = new Set();
  const groups = [];
  sectionOrder.forEach(s => {
    if (groupMap[s] && groupMap[s].items.length > 0) {
      groups.push(groupMap[s]);
      seen.add(s);
    }
  });
  // Append any unlisted sections
  Object.values(groupMap).forEach(g => {
    if (!seen.has(g.label) && g.items.length > 0) groups.push(g);
  });

  send(res, 200, { groups, newFiles });
}

// ─── route: POST /api/nav/label ─────────────────────────────────

async function handlePostNavLabel(req, res) {
  let body;
  try { body = await readBody(req); }
  catch (e) { return send(res, 400, { error: e.message }); }

  const { url: fileUrl, label, section, status } = body;
  if (!fileUrl || !label || !section) {
    return send(res, 400, { error: 'url, label, and section are required' });
  }

  const labels = readLabels();
  labels.files = labels.files || {};
  labels.files[fileUrl] = { label, section, status: status || 'check' };

  // Ensure section is in the order list
  if (!labels.sectionOrder.includes(section)) {
    labels.sectionOrder.push(section);
  }

  writeLabels(labels);
  console.log(`  + labeled ${fileUrl} → "${label}" (${section})`);
  send(res, 200, { success: true });
}

// ─── route: GET /api/assets ─────────────────────────────────────

function handleGetAssets(req, res, query) {
  const dir     = (query.dir || '').replace(/\.\./g, '');
  const pattern = query.pattern || '';
  const absDir  = path.join(ROOT, 'assets', dir);

  if (!absDir.startsWith(ROOT) || !fs.existsSync(absDir)) {
    return send(res, 404, { error: 'Directory not found' });
  }

  const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
  let files = fs.readdirSync(absDir)
    .filter(f => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .filter(f => !pattern || f.toLowerCase().includes(pattern.toLowerCase()))
    .map(f => ({
      name: f,
      url:  `assets/${dir}/${f}`,
      size: fs.statSync(path.join(absDir, f)).size,
    }));

  send(res, 200, { files });
}

// ─── route: POST /api/edit (requires API key) ───────────────────

function makeDiff(original, modified) {
  const oLines = original.split('\n');
  const mLines = modified.split('\n');
  const ops = [];
  let i = 0, j = 0;
  while (i < oLines.length || j < mLines.length) {
    if (i >= oLines.length)      { ops.push({ t: 'add',    line: mLines[j++] }); }
    else if (j >= mLines.length) { ops.push({ t: 'remove', line: oLines[i++] }); }
    else if (oLines[i] === mLines[j]) { ops.push({ t: 'same', line: oLines[i++] }); j++; }
    else {
      let foundO = -1, foundM = -1;
      for (let d = 1; d <= 4 && foundM === -1; d++) {
        if (j + d < mLines.length && mLines[j + d] === oLines[i]) foundM = d;
        if (i + d < oLines.length && oLines[i + d] === mLines[j]) foundO = d;
      }
      if (foundM !== -1 && (foundO === -1 || foundM <= foundO)) {
        for (let d = 0; d < foundM; d++) ops.push({ t: 'add', line: mLines[j++] });
      } else if (foundO !== -1) {
        for (let d = 0; d < foundO; d++) ops.push({ t: 'remove', line: oLines[i++] });
      } else {
        ops.push({ t: 'remove', line: oLines[i++] });
        ops.push({ t: 'add',    line: mLines[j++] });
      }
    }
  }
  return {
    ops,
    linesAdded:   ops.filter(o => o.t === 'add').length,
    linesRemoved: ops.filter(o => o.t === 'remove').length,
  };
}

// ─── smart-edit helpers (blob strip + scoped patches) ───────────
const ASSET_RE = /data:[\w.+\/-]+;base64,[A-Za-z0-9+\/=]+/g;
function stripBlobs(src) {
  const map = [];
  const out = src.replace(ASSET_RE, m => { const t = '⟦ASSET_' + map.length + '⟧'; map.push(m); return t; });
  return { out, map };
}
function restoreBlobs(s, map) {
  return s.replace(/⟦ASSET_(\d+)⟧/g, (m, i) => (map[+i] !== undefined ? map[+i] : m));
}
function parseEdits(text) {
  let t = (text || '').trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '').trim();
  let obj = null;
  try { obj = JSON.parse(t); } catch (e) { const m = t.match(/\{[\s\S]*\}/); if (m) { try { obj = JSON.parse(m[0]); } catch (_) {} } }
  if (!obj || !Array.isArray(obj.edits)) throw new Error('Model did not return a valid edit set.');
  return obj;
}
function applyEdits(src, edits) {
  let out = src;
  for (let i = 0; i < edits.length; i++) {
    const oldS = edits[i].old, nw = edits[i].new;
    if (oldS === undefined || nw === undefined) throw new Error('Edit ' + (i + 1) + ' missing old/new.');
    if (oldS === '') { out = nw + out; continue; }
    const idx = out.indexOf(oldS);
    if (idx === -1) throw new Error('Could not locate edit ' + (i + 1) + ' in the file.');
    if (out.indexOf(oldS, idx + oldS.length) !== -1) throw new Error('Edit ' + (i + 1) + ' is ambiguous (multiple matches).');
    out = out.slice(0, idx) + nw + out.slice(idx + oldS.length);
  }
  return out;
}

function callClaude(system, userMsg) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL, max_tokens: 16000,
      system,
      messages: [{ role: 'user', content: userMsg }],
    });
    const req = https.request({
      hostname: 'api.anthropic.com', path: '/v1/messages', method: 'POST',
      headers: {
        'content-type': 'application/json', 'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'content-length': Buffer.byteLength(body),
      },
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          if (data.error) reject(new Error(data.error.message));
          else resolve((data.content || []).filter(b => b.type === 'text').map(b => b.text).join(''));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function handleEdit(req, res) {
  if (!API_KEY) return send(res, 503, { error: 'ANTHROPIC_API_KEY not set — restart server with the key to enable AI edits.' });

  let body;
  try { body = await readBody(req); }
  catch (e) { return send(res, 400, { error: e.message }); }

  const { filePath, prompt, context, selection } = body;
  const images = Array.isArray(body.images) ? body.images.slice(0, 4) : [];
  if (!filePath || (!prompt && images.length === 0)) return send(res, 400, { error: 'filePath and prompt (or an image) required' });

  const abs = safePath(filePath);
  if (!abs) return send(res, 403, { error: 'Path outside project root' });

  let original;
  try { original = fs.readFileSync(abs, 'utf-8'); }
  catch { return send(res, 404, { error: 'File not found: ' + filePath }); }

  const ext  = path.extname(filePath);
  const lang = { '.html': 'HTML', '.jsx': 'JSX/React', '.js': 'JavaScript', '.css': 'CSS' }[ext] || 'code';
  const { out: stripped, map } = stripBlobs(original);

  const selText = selection ? (
    '\n\nThe user SELECTED this element — focus the edit here:\n' +
    '- selector: ' + (selection.selector || '') + '\n' +
    (selection.anchorId ? '- nearest id (find it in source): #' + selection.anchorId + '\n' : '') +
    (selection.openingTag ? '- opening tag: ' + selection.openingTag + '\n' : '') +
    (selection.styles ? '- key computed styles: ' + JSON.stringify(selection.styles) + '\n' : '') +
    (selection.mediaNote ? '- NOTE: ' + selection.mediaNote + '\n' : '')
  ) : '';

  const system = `You are an expert frontend developer maintaining the ACTZ design system.
ACTZ: dark cinematic UI, Colorado-flag palette (gold #fbbf24, blue #3b82f6, red #e11d48), Manrope + Ethnocentric fonts, glass-morphism, pill buttons.
File: ${filePath} (${lang}).
Large base64 assets are replaced by placeholders like ⟦ASSET_3⟧ — NEVER modify, remove, or reference placeholders.
Return ONLY strict JSON (no markdown, no prose): {"edits":[{"old":"<verbatim unique substring of the file>","new":"<replacement>"}],"note":"<short summary>"}.
Each "old" MUST be copied exactly from the file and be UNIQUE (include enough surrounding text). Make the smallest change that satisfies the request. Attached images are visual references.`;

  const textPart = `${context ? 'Context:\n' + context + '\n\n' : ''}Current file (base64 assets stripped):\n\`\`\`\n${stripped}\n\`\`\`${selText}\n\nRequest: ${prompt || '(use the attached image as the reference)'}\n\nReturn ONLY the JSON edit set.`;
  const content = [];
  for (const im of images) { if (im && im.media_type && im.data) content.push({ type: 'image', source: { type: 'base64', media_type: im.media_type, data: im.data } }); }
  content.push({ type: 'text', text: textPart });

  try {
    const raw = await callClaude(system, content);
    const parsed = parseEdits(raw);
    const strippedAfter = applyEdits(stripped, parsed.edits);
    const finalOut = restoreBlobs(strippedAfter, map);
    const { ops, linesAdded, linesRemoved } = makeDiff(stripped, strippedAfter);
    fs.writeFileSync(abs, finalOut, 'utf-8');
    console.log(`  ✓ edited ${filePath} (+${linesAdded} -${linesRemoved})${parsed.note ? ' — ' + parsed.note : ''}`);
    send(res, 200, { success: true, ops, linesAdded, linesRemoved, note: parsed.note || '' });
  } catch (e) {
    console.error('  ✗ Claude error:', e.message);
    send(res, 500, { error: e.message });
  }
}

async function handleUndo(req, res) {
  let body;
  try { body = await readBody(req); }
  catch (e) { return send(res, 400, { error: e.message }); }
  const { filePath, content } = body;
  const abs = safePath(filePath);
  if (!abs) return send(res, 403, { error: 'Forbidden' });
  try {
    fs.writeFileSync(abs, content, 'utf-8');
    send(res, 200, { success: true });
  } catch (e) { send(res, 500, { error: e.message }); }
}

// ─── server ─────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const parsed  = url.parse(req.url, true);
  const method  = req.method;
  const route   = parsed.pathname;
  const query   = parsed.query;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // API routes
  if (route === '/api/health')    return send(res, 200, { ok: true });
  if (route === '/api/nav'     && method === 'GET')  return handleGetNav(req, res);
  if (route === '/api/nav/label' && method === 'POST') return handlePostNavLabel(req, res);
  if (route === '/api/assets'  && method === 'GET')  return handleGetAssets(req, res, query);
  if (route === '/api/edit'    && method === 'POST') return handleEdit(req, res);
  if (route === '/api/undo'    && method === 'POST') return handleUndo(req, res);

  // Static files
  serveStatic(req, res, route);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n  ACTZ Design System');
  console.log('  ──────────────────────────────────');
  console.log(`  http://localhost:${PORT}`);
  console.log(`  Nav API: /api/nav`);
  if (API_KEY) console.log(`  AI Edit: enabled (${MODEL})`);
  else         console.log(`  AI Edit: disabled (set ANTHROPIC_API_KEY to enable)`);
  console.log('  ──────────────────────────────────\n');
});
