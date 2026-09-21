// Is the cover's background image actually covering the whole slide on a phone,
// or is it offset? Measured, not eyeballed.
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

console.log(
  JSON.stringify(
    await page.evaluate(() => {
      const r = (el) => {
        const b = el.getBoundingClientRect();
        return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
      };
      const s = document.getElementById('s1');
      const img = s.querySelector('img[alt=""]') || s.querySelector('img');
      const foot = s.querySelector('.foot');
      const inner = s.querySelector('.inner');
      return {
        slide: r(s),
        slidePos: getComputedStyle(s).position,
        bgWrap: r(img.parentElement),
        bgWrapPos: getComputedStyle(img.parentElement).position,
        img: r(img),
        inner: r(inner),
        innerBottom: r(inner)[1] + r(inner)[3],
        foot: r(foot),
        footOverlapsInner: r(foot)[1] < r(inner)[1] + r(inner)[3],
      };
    }),
    null,
    1,
  ),
);
await browser.close();
