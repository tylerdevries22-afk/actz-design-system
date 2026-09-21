// Diagnostic: why do two of the four device-wall screens look wrong, and is the
// uniform per-slide overflow just the decorative .glow blur bleeding past the
// slide box? Run: node decks/source/diagnose-devwall.mjs
import { createRequire } from 'node:module';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const DIR = '/private/tmp/claude-501/-Users-tylerdevries-Dev-actz-may/8dcd07e5-2fad-41a5-a268-a10f2a0e929c/scratchpad';
const URL = `file://${DIR}/actz-hotel-partner-deck.html`;

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files', '--disable-gpu'],
});
const page = await browser.newPage();

// 1200px wide instead of 1600: if the overflow is the .glow::after blur at
// bottom:-14vw, the overage must track the width (14% of 1200 = 168).
await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'load', timeout: 180000 });
await new Promise((r) => setTimeout(r, 5000));

const overflow = await page.evaluate(() => {
  const s = document.querySelector('.slide');
  const glow = document.querySelector('.glow');
  const after = glow ? getComputedStyle(glow, '::after') : null;
  return {
    viewportWidth: innerWidth,
    over: s.scrollHeight - s.clientHeight,
    glowAfterBottom: after ? after.bottom : null,
    glowAfterHeight: after ? after.height : null,
  };
});
console.log('OVERFLOW', JSON.stringify(overflow));

// Back to presentation size for the device-wall inspection.
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
await page.evaluate(() => {
  document.getElementById('deck').scrollTo({ top: document.getElementById('s5').offsetTop, behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 2500));

const wall = await page.evaluate(() => {
  const round = (n) => Math.round(n);
  return [...document.querySelectorAll('.devwall .screen')].map((sc) => {
    const v = sc.querySelector('video');
    const cs = getComputedStyle(v);
    const r = sc.getBoundingClientRect();
    return {
      clip: v.dataset.clip,
      screenBox: `${round(r.width)}x${round(r.height)}`,
      intrinsic: `${v.videoWidth}x${v.videoHeight}`,
      readyState: v.readyState,
      paused: v.paused,
      currentTime: Number(v.currentTime.toFixed(2)),
      duration: Number.isFinite(v.duration) ? Number(v.duration.toFixed(2)) : String(v.duration),
      objectFit: cs.objectFit,
      objectPosition: cs.objectPosition,
      sources: [...v.querySelectorAll('source')].map((s) => `${s.type}:${s.src.length}b`),
    };
  });
});
console.log('DEVWALL', JSON.stringify(wall, null, 2));

// Crop each device screen on its own so the content is legible at full size.
const screens = await page.$$('.devwall .screen');
for (let i = 0; i < screens.length; i += 1) {
  await screens[i].screenshot({ path: `${DIR}/screen-${i + 1}.png` });
}

await browser.close();
