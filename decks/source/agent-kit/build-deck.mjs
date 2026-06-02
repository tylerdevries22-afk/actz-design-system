// Build deck/ACTZ_Georgetown_Pitch.html by replicating the reference exactly and
// swapping each [data-clip="NAME"] slot for the matching base64-inlined <video>.
// Uncaptured slots (auth-gated) become HONEST labeled placeholders — never faked.
import fs from 'node:fs';

const REF = 'deck/REFERENCE_ACTZ_Georgetown_Pitch.html';
const OUT = 'deck/ACTZ_Georgetown_Pitch.html';
const CLIPDIR = 'clips';

const b64 = (p) => fs.readFileSync(p).toString('base64');
const dataUri = (p, mime) => `data:${mime};base64,${b64(p)}`;

function videoEl(name, { caption } = {}) {
  const webm = dataUri(`${CLIPDIR}/${name}.webm`, 'video/webm');
  const mp4 = dataUri(`${CLIPDIR}/${name}.mp4`, 'video/mp4');
  const poster = dataUri(`${CLIPDIR}/${name}.poster.jpg`, 'image/jpeg');
  const vid = `<video autoplay muted loop playsinline preload="auto" poster="${poster}" ` +
    `style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;z-index:0">` +
    `<source src="${webm}" type="video/webm"><source src="${mp4}" type="video/mp4"></video>`;
  const cap = caption
    ? `<div style="position:absolute;left:10px;bottom:10px;z-index:2;font:600 11px Manrope,sans-serif;` +
      `color:#f4efe6;background:linear-gradient(90deg,#036,#d52b1e,#fbbf24);padding:4px 10px;border-radius:999px">${caption}</div>`
    : '';
  return vid + cap;
}

// Inner HTML to inject per data-clip name. Captured -> video. Uncaptured -> honest placeholder.
const replacements = {
  'home-hero': () => videoEl('home-hero'), // full-bleed background, no caption
  'hub-landing': () => videoEl('hub-landing', { caption: 'Live · /town/georgetown' }),
  'provider-stripe': () =>
    `<div class="play"></div><div class="cn">provider-getbooked · provider-stripe · provider-notify</div>` +
    `<div class="cc"><b>Live feature</b> — not captured this run (auth-gated demo login). ` +
    `Stripe kept out of LIVE mode; no payment screen recorded.</div>`,
  'town-dashboard': () =>
    `<div class="play"></div><div class="cn">town-dashboard</div>` +
    `<div class="cc">/town-dashboard/georgetown — <b>Live (Summit)</b>, not captured this run (auth-gated). ` +
    `Origin · length of stay · spend · revenue.</div>`,
};

let html = fs.readFileSync(REF, 'utf8');

// Locate every data-clip slot, find its enclosing <div ...> ... </div> with depth matching.
function findSlots(s) {
  const slots = [];
  const re = /data-clip="([^"]+)"/g;
  let m;
  while ((m = re.exec(s))) {
    const name = m[1];
    // walk back to the enclosing "<div"
    const openStart = s.lastIndexOf('<div', m.index);
    const tagEnd = s.indexOf('>', m.index);
    // walk forward counting <div .../ </div> to find matching close
    let depth = 1, i = tagEnd + 1;
    while (i < s.length && depth > 0) {
      const nextOpen = s.indexOf('<div', i);
      const nextClose = s.indexOf('</div>', i);
      if (nextClose === -1) break;
      if (nextOpen !== -1 && nextOpen < nextClose) { depth++; i = nextOpen + 4; }
      else { depth--; if (depth === 0) { slots.push({ name, openStart, innerStart: tagEnd + 1, innerEnd: nextClose }); } i = nextClose + 6; }
    }
  }
  return slots;
}

const slots = findSlots(html);
console.log('found slots:', slots.map(s => s.name).join(', '));

// Replace from last to first so indices stay valid.
slots.sort((a, b) => b.innerStart - a.innerStart);
let swapped = 0, placeholders = 0;
for (const slot of slots) {
  const fn = replacements[slot.name];
  if (!fn) { console.warn('no replacement for', slot.name); continue; }
  const inner = fn();
  if (slot.name === 'provider-stripe' || slot.name === 'town-dashboard') placeholders++; else swapped++;
  html = html.slice(0, slot.innerStart) + inner + html.slice(slot.innerEnd);
}

// Update the hint line so it reflects the finished deck (not "dashed slots = ... agent swaps in").
html = html.replace(
  /↑ ↓ to move · ⌘P to export PDF · dashed slots = live-capture clips the agent swaps in/,
  '↑ ↓ to move · ⌘P to export PDF · real ACTZ captures embedded · auth-gated screens labeled, not faked'
);
// Title: drop "(reference)".
html = html.replace('Founding Partner Proposal (reference)', 'Founding Partner Proposal');

fs.writeFileSync(OUT, html);
const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`wrote ${OUT} — ${kb} KB · video swaps: ${swapped} · honest placeholders: ${placeholders}`);
