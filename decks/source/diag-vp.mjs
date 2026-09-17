// Slide 10's value-tile grid renders as one narrow column with the right 60%
// of the slide empty. Is that inherited from the council deck or did this
// build's CSS break it? Measure the same element in both.
import { createRequire } from 'node:module';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const TARGETS = [
  ['town   ', 'file:///Users/tylerdevries/Dev/actz-may/client/public/deck/georgetown/index.html'],
  ['hotel  ', `file://${process.argv[2]}`],
];

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--disable-gpu', '--allow-file-access-from-files'],
});

for (const [label, url] of TARGETS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.goto(url, { waitUntil: 'load', timeout: 180000 });
  await new Promise((r) => setTimeout(r, 2500));

  const out = await page.evaluate(() => {
    const g = document.querySelector('.vp-grid');
    if (!g) return { missing: true };
    const cs = getComputedStyle(g);
    const r = g.getBoundingClientRect();
    const slide = g.closest('.slide').getBoundingClientRect();
    return {
      display: cs.display,
      cols: cs.gridTemplateColumns,
      overflowX: cs.overflowX,
      gridW: Math.round(r.width),
      slideW: Math.round(slide.width),
      children: g.children.length,
      childW: [...g.children].map((c) => Math.round(c.getBoundingClientRect().width)),
    };
  });
  console.log(label, JSON.stringify(out));
  await page.close();
}

await browser.close();
