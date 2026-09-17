// Copy the built deck out of the session scratchpad into ~/Work/marriott, where
// documents/media belong and where the files survive this session.
// Run: node decks/source/stage-deliverables.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SCRATCH = '/private/tmp/claude-501/-Users-tylerdevries-Dev-actz-may/8dcd07e5-2fad-41a5-a268-a10f2a0e929c/scratchpad';
const WT = '/Users/tylerdevries/Dev/_idle/actz-design-system/.claude/worktrees/hotel-deck';
const OUT = path.join(os.homedir(), 'Work', 'marriott');

fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  [`${SCRATCH}/actz-hotel-partner-deck.pdf`, 'ACTZ-x-Marriott-concierge-partner-deck.pdf'],
  [`${WT}/one-pagers/actz-hotel-partner-deck.html`, 'ACTZ-x-Marriott-concierge-partner-deck.html'],
];

for (const [src, name] of jobs) {
  const dest = path.join(OUT, name);
  fs.copyFileSync(src, dest);
  console.log(`${dest}  ${(fs.statSync(dest).size / 1048576).toFixed(2)} MB`);
}
