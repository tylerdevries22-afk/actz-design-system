// Which classes fall below 10px on a phone, and is the comparison grid actually
// inside a scroller? Measured rather than guessed.
import { createRequire } from 'node:module';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--disable-gpu', '--allow-file-access-from-files'],
});
const page = await browser.newPage();
await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
await page.goto(`file://${process.argv[2]}`, { waitUntil: 'load', timeout: 180000 });
await new Promise((r) => setTimeout(r, 2000));

const out = await page.evaluate(() => {
  const tiny = {};
  [...document.querySelectorAll('.slide *')].forEach((el) => {
    if (el.children.length || el.textContent.trim().length < 3) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 10) {
      const k = `${el.className || el.tagName}`.toString().slice(0, 34);
      tiny[k] = tiny[k] || { count: 0, px: Math.round(fs * 10) / 10 };
      tiny[k].count += 1;
    }
  });
  const probe = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      display: cs.display,
      overflowX: cs.overflowX,
      scrollW: el.scrollWidth,
      clientW: el.clientWidth,
      parent: `${el.parentElement.className}`.slice(0, 30),
    };
  };
  return {
    rootFontSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
    tiny,
    cmp: probe('.cmp'),
    cmpHead: probe('.cmp-head'),
    statc: probe('.statc'),
  };
});

console.log(JSON.stringify(out, null, 1));
await browser.close();
