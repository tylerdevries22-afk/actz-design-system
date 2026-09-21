// One-shot: drop the superseded slide 04 ("One screen, two jobs") from
// slides-a.mjs. Its points now live on the ★ hotel-as-hero slide, and its app
// frame is the one that slide reuses. Keeping both would say the same thing
// twice with the same component.
import fs from 'node:fs';

const P = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck/decks/source/hotel-deck/slides-a.mjs';
const lines = fs.readFileSync(P, 'utf8').split('\n');

// Slide 03 ends at the line that closes it; slide 04 starts at `export const s4`.
const start = lines.findIndex((l) => l.startsWith('export const s4 ='));
if (start < 0) throw new Error('s4 not found — already trimmed?');

const kept = lines.slice(0, start).join('\n').replace(/\n+$/, '\n');
// `ocard` and `offerings` were only used by s4; drop them from the imports.
const out = kept
  .replace("import { chip, offerings } from './data.mjs';", "import { chip } from './data.mjs';")
  .replace('import { chrome, clip, cobrand, ocard, pt, scrim }', 'import { chrome, clip, cobrand, pt, scrim }');

fs.writeFileSync(P, out);
console.log(`trimmed slides-a.mjs: ${lines.length} -> ${out.split('\n').length} lines`);
