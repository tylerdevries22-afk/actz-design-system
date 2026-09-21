// Archive the 2026-06-02 "ACTZ × Georgetown — Founding Partner Proposal" deck
// lineage. This is a MOVE, never a delete: every file lands under
// ~/Work/actz/_archive/<stamp>/ with its original location recorded in
// MANIFEST.tsv, so the whole operation is reversible by reading that file back.
//
// Deliberately NOT touched, because none of these are redundant copies:
//   • actz-may/client/public/deck/georgetown/index.html — the council deck (keep)
//   • actz-may/ios/App/App/public/... — the shipped iOS bundle
//   • actz-may/dist/public/...       — build output, regenerates
//   • any path under .claude/worktrees/ — three agent sessions are live
//   • georgetown.html / ACTZ_Georgetown_Partnership_Model.* — different documents
//   • build-georgetown-deck.mjs — the generator that can rebuild all of this
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DS = '/Users/tylerdevries/Dev/_idle/actz-design-system';
const IC = path.join(os.homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Work/actz');

const sources = [
  `${DS}/one-pagers/georgetown-pitch-deck.html`,
  `${DS}/one-pagers/ACTZ_Georgetown_Pitch.pptx`,
  `${DS}/decks/source/reference/REFERENCE_ACTZ_Georgetown_Pitch.html`,
  `${DS}/decks/source/reference/ACTZ_Georgetown_Pitch.reference-replica.html`,
  `${IC}/files/actz-deck-agent/deck/ACTZ_Georgetown_Pitch.html`,
  `${IC}/files/actz-deck-agent/deck/ACTZ_Georgetown_Pitch.reference-replica.html`,
  `${IC}/files/actz-deck-agent/deck/ACTZ_Georgetown_Pitch.pptx`,
  `${IC}/files/ACTZ_Georgetown_Pitch_REFERENCE.html`,
  `${IC}/ACTZ Georgetown Pitch.pptx`,
];

const stamp = '2026-09-16-georgetown-founding-partner-lineage';
const dest = path.join(os.homedir(), 'Work', 'actz', '_archive', stamp);
fs.mkdirSync(dest, { recursive: true });

const rows = ['archived_to\toriginal_path\tbytes'];
let moved = 0;
for (const src of sources) {
  if (!fs.existsSync(src)) {
    console.log(`skip (missing): ${src}`);
    continue;
  }
  // Flatten into one folder, prefixing with a tag so same-named files from the
  // repo and from iCloud cannot collide.
  const tag = src.startsWith(DS) ? 'repo' : 'icloud';
  let name = `${tag}__${path.basename(src).replace(/\s+/g, '_')}`;
  let target = path.join(dest, name);
  let n = 2;
  while (fs.existsSync(target)) target = path.join(dest, `${n++}__${name}`);

  const bytes = fs.statSync(src).size;
  fs.renameSync(src, target); // same volume for repo files
  rows.push(`${path.basename(target)}\t${src}\t${bytes}`);
  console.log(`archived ${(bytes / 1048576).toFixed(2)} MB  ${src}`);
  moved += 1;
}

fs.writeFileSync(path.join(dest, 'MANIFEST.tsv'), `${rows.join('\n')}\n`);
console.log(`\n${moved} file(s) -> ${dest}`);
console.log('Reverse with the paths in MANIFEST.tsv.');
