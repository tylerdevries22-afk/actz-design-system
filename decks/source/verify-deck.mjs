// Generic headless verify + capture. Usage:
//   node decks/source/verify-deck.mjs <abs-html-path> <out-subdir>
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const SRC = process.argv[2];
const DIR = `/private/tmp/claude-501/-Users-tylerdevries-Dev-actz-may/8dcd07e5-2fad-41a5-a268-a10f2a0e929c/scratchpad/${process.argv[3] || 'deck'}`;
fs.mkdirSync(DIR, { recursive: true });
const W = 1600;
const H = 900;

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
page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url().slice(0, 70)} ${r.failure()?.errorText}`));

await page.goto(`file://${SRC}`, { waitUntil: 'load', timeout: 180000 });
await new Promise((r) => setTimeout(r, 4000));

const report = await page.evaluate(() => ({
  slides: document.querySelectorAll('.slide').length,
  dots: document.querySelectorAll('#dots a').length,
  ids: [...document.querySelectorAll('.slide')].map((s) => s.id),
  feet: [...document.querySelectorAll('.foot')].map((f) => f.textContent),
  idx: [...document.querySelectorAll('.idx')].map((f) => f.textContent.trim()),
  personas: document.querySelectorAll('.pcard').length,
  videos: document.querySelectorAll('video').length,
  decoded: [...document.querySelectorAll('video')].filter((v) => v.readyState >= 2).length,
  brokenImgs: [...document.querySelectorAll('img')].filter((i) => !i.complete || i.naturalWidth === 0).length,
  images: document.querySelectorAll('img').length,
  overflow: [...document.querySelectorAll('.slide')]
    .map((s, i) => ({ n: i + 1, over: s.scrollHeight - s.clientHeight }))
    .filter((o) => o.over > 2),
}));
console.log(JSON.stringify(report, null, 2));

const deck = await page.$('#deck');
for (let n = 0; n < report.slides; n += 1) {
  await page.evaluate((i) => {
    const d = document.getElementById('deck');
    d.scrollTo({ top: document.querySelectorAll('.slide')[i].offsetTop, behavior: 'instant' });
  }, n);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${DIR}/s${String(n + 1).padStart(2, '0')}.png` });
}
void deck;

console.log('CONSOLE_ISSUES', errors.length);
errors.slice(0, 25).forEach((e) => console.log(' ', e));
await browser.close();
