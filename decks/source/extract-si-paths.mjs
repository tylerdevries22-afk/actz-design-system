// Pull path data for the brand marks that the partner folder does not ship, so
// they can be inlined as brand-coloured SVGs instead of text chips.
import fs from 'node:fs';

const SI = '/Users/tylerdevries/Dev/coffee-story/node_modules/simple-icons/icons';
const WANT = ['tripadvisor', 'square', 'airbnb'];

for (const slug of WANT) {
  const svg = fs.readFileSync(`${SI}/${slug}.svg`, 'utf8');
  const d = svg.match(/ d="([^"]+)"/)[1];
  console.log(`${slug}\t${d.length} chars`);
  console.log(d);
  console.log('---');
}
