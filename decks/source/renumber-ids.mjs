// One-shot: the deck addresses slides by sequential DOM id — the nav dots link
// to #s1..#sN and the verifier scrolls by getElementById('s'+n). The three
// ported slides shipped with semantic ids (sHero/sDash/sPays) and the tail
// slides still carried their old numbers, so the fourth dot pointed at nothing.
// Renames run highest-first so an id never lands on one that still exists.
import fs from 'node:fs';

const DIR = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck/decks/source/hotel-deck';

const plan = {
  'slides-b.mjs': [['s8', 's10'], ['s7', 's9'], ['s6', 's8']],
  'slides-c.mjs': [['s12', 's14'], ['s11', 's13'], ['s10', 's12'], ['s9', 's11']],
  'slides-hero.mjs': [['sHero', 's4'], ['sDash', 's6'], ['sPays', 's7']],
};

for (const [file, renames] of Object.entries(plan)) {
  const path = `${DIR}/${file}`;
  let src = fs.readFileSync(path, 'utf8');
  for (const [from, to] of renames) {
    const needle = `id="${from}"`;
    if (!src.includes(needle)) throw new Error(`${file}: ${needle} not found`);
    src = src.replace(needle, `id="${to}"`);
  }
  fs.writeFileSync(path, src);
  console.log(`${file}: ${renames.map(([a, b]) => `${a}->${b}`).join(', ')}`);
}
