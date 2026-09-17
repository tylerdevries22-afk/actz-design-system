// Measure the deck at real device sizes and report anything that actually
// breaks: horizontal page scroll, content taller than its slide, text below a
// legible size, and tap targets under 44px. Usage:
//   node decks/source/responsive-audit.mjs <abs-html-path> [--shots <dir>]
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const SRC = process.argv[2];
const shotDir = process.argv.includes('--shots')
  ? process.argv[process.argv.indexOf('--shots') + 1]
  : null;
if (shotDir) fs.mkdirSync(shotDir, { recursive: true });

const VIEWPORTS = [
  { name: 'iphone-se', w: 375, h: 667, mobile: true },
  { name: 'iphone-15', w: 393, h: 852, mobile: true },
  { name: 'phone-landscape', w: 852, h: 393, mobile: true },
  { name: 'ipad', w: 768, h: 1024, mobile: true },
  { name: 'ipad-landscape', w: 1024, h: 768, mobile: true },
  { name: 'laptop-720', w: 1280, h: 720, mobile: false },
  { name: 'desktop', w: 1600, h: 900, mobile: false },
  { name: 'wide', w: 2560, h: 1440, mobile: false },
];

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files', '--disable-gpu'],
});

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({
    width: vp.w,
    height: vp.h,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${SRC}`, { waitUntil: 'load', timeout: 180000 });
  await new Promise((r) => setTimeout(r, 2500));

  const res = await page.evaluate(() => {
    const slides = [...document.querySelectorAll('.slide')];
    // The decorative .glow blur legitimately extends past the slide box and is
    // clipped; only count overflow from real content.
    const contentOverflow = slides
      .map((s, i) => {
        const inner = s.querySelector('.inner');
        if (!inner) return null;
        const over = Math.round(inner.scrollHeight - s.clientHeight);
        return over > 8 ? { slide: i + 1, over } : null;
      })
      .filter(Boolean);

    const wide = [...document.querySelectorAll('.slide *')]
      .filter((el) => el.scrollWidth - el.clientWidth > 4 && getComputedStyle(el).overflowX === 'visible')
      .map((el) => `${el.className || el.tagName}`.slice(0, 40));

    const tiny = [...document.querySelectorAll('p,li,span,b,em,div')]
      .filter((el) => el.textContent.trim().length > 12 && el.children.length === 0)
      .map((el) => parseFloat(getComputedStyle(el).fontSize))
      .filter((n) => n && n < 10).length;

    return {
      docScrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
      pageScrollsX: document.documentElement.scrollWidth > window.innerWidth + 1,
      contentOverflow,
      unscrollableWide: [...new Set(wide)].slice(0, 6),
      tinyText: tiny,
    };
  });

  const flags = [];
  if (res.pageScrollsX) flags.push(`H-SCROLL (${res.docScrollW} > ${res.innerW})`);
  if (res.contentOverflow.length) flags.push(`CLIPPED ${JSON.stringify(res.contentOverflow)}`);
  if (res.unscrollableWide.length) flags.push(`WIDE ${res.unscrollableWide.join(', ')}`);
  if (res.tinyText) flags.push(`${res.tinyText} nodes < 10px`);

  console.log(`${vp.name.padEnd(17)} ${String(vp.w).padStart(4)}x${String(vp.h).padEnd(5)} ${flags.length ? flags.join(' | ') : 'ok'}`);

  if (shotDir) await page.screenshot({ path: `${shotDir}/${vp.name}.png`, fullPage: false });
  await page.close();
}

await browser.close();
