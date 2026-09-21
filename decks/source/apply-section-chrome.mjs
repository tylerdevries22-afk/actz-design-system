// Adopt the Georgetown deck's chrome scheme wholesale. There the footer names
// the section of the spoken pitch the slide belongs to (§0 the problem, §1
// intercept, §2 toolkit — the heart …) rather than repeating the brand line on
// every slide, so a presenter always knows where they are in the arc. The hotel
// deck was carrying one generic footer on eleven of fourteen slides.
import fs from 'node:fs';

const DIR = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck/decks/source/hotel-deck';

// [file, slide index as it appears in chrome(), replacement footer text].
// Slide 01 already carries its own literal rather than the shared FOOT const.
const feet = [
  ['slides-a.mjs', 2, 'The problem · §0'],
  ['slides-b.mjs', 5, '§2 toolkit · every surface'],
  ['slides-b.mjs', 8, '§5 already built for you'],
  ['slides-b.mjs', 9, '§5 the ordering stack'],
  ['slides-b.mjs', 10, '§6 counted proof'],
  ['slides-c.mjs', 11, '§7 honest build state'],
  ['slides-c.mjs', 12, 'Partner tier system'],
  ['slides-c.mjs', 13, '§8 the first 90 days'],
  ['slides-c.mjs', 14, 'Close · why now'],
];

const touched = new Map();
for (const [file, n, text] of feet) {
  const path = `${DIR}/${file}`;
  const src = touched.get(path) ?? fs.readFileSync(path, 'utf8');
  const needle = n === 1 ? "chrome('Partner proposal · September 2026', 1)" : `chrome(FOOT, ${n})`;
  if (!src.includes(needle)) throw new Error(`${file}: ${needle} not found`);
  touched.set(path, src.replace(needle, `chrome('${text}', ${n})`));
}
for (const [path, src] of touched) {
  fs.writeFileSync(path, src);
  console.log(`${path.split('/').pop()}: section footers applied`);
}
