// Pull the council deck apart so its CSS and per-slide markup can be reused
// verbatim for the hotel deck. Writes extracts to the scratchpad; changes
// nothing in actz-may.
import fs from 'node:fs';

const SRC = '/Users/tylerdevries/Dev/actz-may/client/public/deck/georgetown/index.html';
const OUT = '/private/tmp/claude-501/-Users-tylerdevries-Dev-actz-may/8dcd07e5-2fad-41a5-a268-a10f2a0e929c/scratchpad/council';
fs.mkdirSync(OUT, { recursive: true });

const html = fs.readFileSync(SRC, 'utf8');

// 1. Every <style> block, concatenated.
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
fs.writeFileSync(`${OUT}/council.css`, styles.join('\n/* ---- next style block ---- */\n'));

// 2. Each slide's markup as its own file.
const slides = [...html.matchAll(/<section class="slide"[^>]*id="([^"]+)"[\s\S]*?<\/section>/g)];
for (const m of slides) fs.writeFileSync(`${OUT}/slide-${m[1]}.html`, m[0]);

// 3. Inventory: size of each part, plus whether any binary assets are inlined.
const b64 = [...html.matchAll(/data:([a-z/+-]+);base64,/g)].map((m) => m[1]);
const counts = b64.reduce((a, t) => ({ ...a, [t]: (a[t] || 0) + 1 }), {});
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1].length);

console.log(`css bytes        ${styles.join('').length}`);
console.log(`slides           ${slides.length}: ${slides.map((m) => m[1]).join(' ')}`);
slides.forEach((m) => console.log(`  ${m[1].padEnd(5)} ${String(m[0].length).padStart(7)} bytes`));
console.log(`inline data URIs ${JSON.stringify(counts)}`);
console.log(`script blocks    ${scripts.join(', ')} bytes`);
console.log(`\nextracts -> ${OUT}`);
