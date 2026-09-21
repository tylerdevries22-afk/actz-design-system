// Render the council-based hotel deck to PDF and stage both files in
// ~/Work/marriott. One slide per page at presentation size.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const require = createRequire('/Users/tylerdevries/Dev/actz-may/package.json');
const puppeteer = require('puppeteer');

const WT = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck';
const SRC = `${WT}/one-pagers/actz-hotel-council-deck.html`;
const OUT = path.join(os.homedir(), 'Work', 'marriott');
const W = 1600;
const H = 900;
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(`file://${SRC}`, { waitUntil: 'load', timeout: 180000 });
await new Promise((r) => setTimeout(r, 5000));

const n = await page.evaluate(() => document.querySelectorAll('.slide').length);
await page.addStyleTag({
  content: `#deck{height:auto!important;overflow:visible!important}
.slide{min-height:${H}px!important;height:${H}px!important;break-after:page;page-break-after:always}
.rail,.railfill,.dots,.hint{display:none!important}
@page{size:${W}px ${H}px;margin:0}`,
});
await new Promise((r) => setTimeout(r, 1500));

const pdf = path.join(OUT, 'ACTZ-x-Marriott-council-deck.pdf');
await page.pdf({ path: pdf, width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: `1-${n}` });
await browser.close();

fs.copyFileSync(SRC, path.join(OUT, 'ACTZ-x-Marriott-council-deck.html'));
for (const f of [pdf, path.join(OUT, 'ACTZ-x-Marriott-council-deck.html')]) {
  console.log(`${f}  ${(fs.statSync(f).size / 1048576).toFixed(2)} MB`);
}
console.log(`pages: ${n}`);
