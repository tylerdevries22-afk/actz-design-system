// Puppeteer capture for the ACTZ web app + mobile-viewport (Capacitor = same web app in a shell).
// Produces SHORT muted snippets (<=8s) via page.screencast() + key screenshots.
// Auto-detects target (Q2=D): dev server -> local build -> https://actz.org.
// Autonomous login via .env creds (Q4=B), session cached to .auth.json so it logs in once.
// Requires: Node 18+, Puppeteer >= 22.6 (for page.screencast), ffmpeg on PATH.
//
// Run:  node capture/record-web.mjs           (captures every suite in targets.json)
//       SUITE=traveler node capture/record-web.mjs
import 'dotenv/config';
import fs from 'node:fs';
import puppeteer, { KnownDevices } from 'puppeteer';

const cfg = JSON.parse(fs.readFileSync(new URL('./targets.json', import.meta.url)));
fs.mkdirSync('./raw', { recursive: true });
const ONLY = process.env.SUITE;

const CURSOR = `(()=>{const d=document.createElement('div');d.style.cssText='position:fixed;z-index:2147483647;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:rgba(249,197,19,.9);box-shadow:0 0 0 6px rgba(249,197,19,.25);pointer-events:none;transition:transform .12s';document.documentElement.appendChild(d);addEventListener('mousemove',e=>{d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';},true);})();`;

async function reachable(url){ try{ const c=new AbortController(); const t=setTimeout(()=>c.abort(),1500);
  const r=await fetch(url,{signal:c.signal}); clearTimeout(t); return r.ok||r.status<500; }catch{ return false; } }

async function detectTarget(){
  if(process.env.BASE_URL) return process.env.BASE_URL.replace(/\/$/,'');
  for(const u of ['http://localhost:5173','http://localhost:3000','http://localhost:8100','http://localhost:4173']){
    if(await reachable(u)){ console.log('target: dev/build server', u); return u; } }
  console.log('target: live site https://actz.org'); return 'https://actz.org';
}

async function applyViewport(page, vp){
  if(vp.preset && KnownDevices[vp.preset]) await page.emulate(KnownDevices[vp.preset]);
  else await page.setViewport({ width:vp.width||1440, height:vp.height||900, deviceScaleFactor:vp.dsf||2 });
}

async function login(browser, BASE){
  if(fs.existsSync('./.auth.json')) return JSON.parse(fs.readFileSync('./.auth.json'));
  if(!process.env.ACTZ_EMAIL) { console.warn('no creds -> public capture only'); return null; }
  const page=await browser.newPage();
  try{
    const loginUrl=process.env.ACTZ_LOGIN_URL||'/login';
    const emailSel=process.env.ACTZ_EMAIL_SEL||'#email';
    const passSel=process.env.ACTZ_PASSWORD_SEL||'#password';
    const submitSel=process.env.ACTZ_SUBMIT_SEL||'button[type=submit]';
    await page.goto(loginUrl.startsWith('http')?loginUrl:`${BASE}${loginUrl}`,{waitUntil:'networkidle2'});
    // Selectors are env-overridable; if they fail, the agent should inspect the DOM (prefer data-testid) and update .env.
    await page.type(emailSel, process.env.ACTZ_EMAIL, {delay:40});
    await page.type(passSel, process.env.ACTZ_PASSWORD, {delay:40});
    await Promise.all([ page.click(submitSel), page.waitForNavigation({waitUntil:'networkidle2'}).catch(()=>{}) ]);
    const cookies=await page.cookies(); fs.writeFileSync('./.auth.json', JSON.stringify(cookies));
    console.log('logged in, session cached'); return cookies;
  }catch(e){ console.warn('login failed:', e.message); return null; }
  finally{ await page.close(); }
}

async function runActions(page, actions){
  for(const a of (actions||[])){
    try{
      if(a.wait) await new Promise(r=>setTimeout(r,a.wait));
      else if(a.scrollTo!=null) await page.evaluate(y=>scrollTo({top:y,behavior:'smooth'}), a.scrollTo);
      else if(a.click) { const sel=a.click.startsWith('text=')?null:a.click;
        if(sel) await page.click(sel); else await page.evaluate(t=>{[...document.querySelectorAll('*')].find(e=>e.textContent?.trim()===t)?.click();}, a.click.slice(5)); }
      else if(a.type) { const [sel,txt]=a.type; await page.click(sel); await page.type(sel, txt, {delay:70}); }
    }catch(e){ console.warn('  action skipped:', JSON.stringify(a), '-', e.message); }
  }
}

async function captureSnippet(browser, BASE, cookies, vpMap, s){
  const page=await browser.newPage();
  if(cookies) await page.setCookie(...cookies);
  await applyViewport(page, vpMap[s.viewport]||vpMap.desktop);
  await page.evaluateOnNewDocument(CURSOR);
  try{
    await page.goto(`${BASE}${s.route}`,{waitUntil:'networkidle2',timeout:30000});
    await page.screenshot({ path:`./raw/${s.name}.png` });
    let rec; try{ rec=await page.screencast({ path:`./raw/${s.name}.webm` }); }catch(e){ console.warn('screencast unavailable (need Puppeteer>=22.6 + ffmpeg):',e.message); }
    const cap=Math.min((s.maxSeconds||8),8)*1000;
    await Promise.race([ runActions(page, s.actions), new Promise(r=>setTimeout(r,cap)) ]);
    if(rec) await rec.stop();
    console.log('  captured', s.name);
  }catch(e){ console.warn('  snippet failed', s.name, '-', e.message); }
  finally{ await page.close(); }
}

(async()=>{
  const BASE=await detectTarget();
  const browser=await puppeteer.launch({ headless:'new', executablePath: process.env.PUPPETEER_EXECUTABLE_PATH||undefined, args:['--no-sandbox','--force-color-profile=srgb'] });
  const needAuth=Object.values(cfg.suites).some(su=>su.requiresAuth && (!ONLY||ONLY===Object.keys(cfg.suites).find(k=>cfg.suites[k]===su)));
  const cookies = needAuth ? await login(browser, BASE) : null;
  for(const [key,suite] of Object.entries(cfg.suites)){
    if(ONLY && ONLY!==key) continue;
    if(suite.requiresAuth && !cookies){ console.log(`skip ${key} (no session)`); continue; }
    console.log('suite:', key, `(${suite.narrative})`);
    for(const s of suite.snippets){
      if(s.capturable===false || !s.route){ console.log('  skip (Roadmap/describe-only):', s.name); continue; }
      await captureSnippet(browser, BASE, cookies, cfg.viewports, s);
    }
  }
  await browser.close();
  console.log('Done -> ./raw. Next: bash capture/post.sh ./raw ./clips');
})();
