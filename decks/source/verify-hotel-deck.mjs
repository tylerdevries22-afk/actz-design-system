// Headless verification + capture for the ACTZ × Hotel partner deck.
// Puppeteer is not a dependency of this repository, so it is resolved out of
// the actz-may checkout that already ships it. Run with node from anywhere:
//   node decks/source/verify-hotel-deck.mjs
import { createRequire } from 'node:module';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const DIR = '/private/tmp/claude-501/-Users-tylerdevries-Dev-actz-may/8dcd07e5-2fad-41a5-a268-a10f2a0e929c/scratchpad';
const SRC = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck/one-pagers/actz-hotel-partner-deck.html';
const URL = `file://${SRC}`;
const W = 1600;
const H = 900;

// Puppeteer's own Chrome download is not present on this machine; drive the
// installed system Chrome instead.
const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`);
});
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url().slice(0, 80)} ${r.failure()?.errorText}`));

await page.goto(URL, { waitUntil: 'load', timeout: 180000 });
await new Promise((r) => setTimeout(r, 4000));

const report = await page.evaluate(() => {
  const cs = getComputedStyle(document.body);
  const vids = [...document.querySelectorAll('video[data-clip]')];
  const devs = [...document.querySelectorAll('.devwall .dev')];
  const eyebrow = document.querySelector('.eyebrow');
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return `${Math.round(r.width)}x${Math.round(r.height)}`;
  };
  const clipped = [...document.querySelectorAll('.slide')]
    .map((s, i) => ({ n: i + 1, over: s.scrollHeight - s.clientHeight }))
    .filter((o) => o.over > 2);
  return {
    slides: document.querySelectorAll('.slide').length,
    dots: document.querySelectorAll('#dots a').length,
    clipKeys: Object.keys(window.__CLIPS || {}),
    videos: vids.length,
    videosWithSource: vids.filter((v) => v.querySelector('source')).length,
    videosDecoded: vids.filter((v) => v.readyState >= 2).length,
    devices: devs.length,
    deviceBoxes: devs.map(box),
    deviceScreens: [...document.querySelectorAll('.devwall .screen')].map(box),
    bodyBg: cs.backgroundColor,
    bodyFont: cs.fontFamily.split(',')[0],
    eyebrowColor: eyebrow ? getComputedStyle(eyebrow).color : null,
    clipped,
    kpis: document.querySelectorAll('.kpi').length,
    tiers: document.querySelectorAll('.tier').length,
    gcards: document.querySelectorAll('.gcard').length,
  };
});
console.log(JSON.stringify(report, null, 2));

// Deterministic per-slide captures: instant jump, settle, shoot.
for (let n = 1; n <= report.slides; n += 1) {
  await page.evaluate((i) => {
    const deck = document.getElementById('deck');
    deck.scrollTo({ top: document.getElementById(`s${i}`).offsetTop, behavior: 'instant' });
  }, n);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${DIR}/s${String(n).padStart(2, '0')}.png` });
}

// PDF backup: unlock the scroll container and break one slide per page.
await page.addStyleTag({
  content: `#deck{height:auto!important;overflow:visible!important}
.slide{min-height:${H}px!important;height:${H}px!important;break-after:page;page-break-after:always}
.rail,.railfill,.dots,.hint{display:none!important}
@page{size:${W}px ${H}px;margin:0}`,
});
await new Promise((r) => setTimeout(r, 1500));
await page.pdf({
  path: `${DIR}/actz-hotel-partner-deck.pdf`,
  width: `${W}px`,
  height: `${H}px`,
  printBackground: true,
  pageRanges: `1-${report.slides}`,
});

console.log('CONSOLE_ISSUES', errors.length);
errors.slice(0, 40).forEach((e) => console.log(' ', e));
await browser.close();
