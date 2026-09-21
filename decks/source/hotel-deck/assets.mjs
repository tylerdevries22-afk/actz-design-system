// Asset loader for the ACTZ hotel partner deck.
// Everything is inlined as base64 so the single HTML file presents offline —
// from a thumb drive, in a hotel conference room, with no wifi.
import fs from 'node:fs';

const DS = '.';
const CLIPS = 'decks/source/clips';
const FRAMES = 'decks/source/device-frames';

export const read = (p) => fs.readFileSync(p, 'utf8');
export const b64 = (p) => fs.readFileSync(p).toString('base64');
export const uri = (p, m) => `data:${m};base64,${b64(p)}`;

export const tokensCss = read(`${DS}/colors_and_type.css`)
  // strip the Google Fonts @import (we add it once in <head>)
  .replace(/@import url\([^)]*\);/g, '')
  // drop the relative-URL @font-face blocks — Ethnocentric is inlined as base64
  // below, and the relative path 404s when served from /one-pagers/.
  .replace(/@font-face\s*\{[^}]*\}/g, '');
export const compCss = read(`${DS}/components.css`);
export const ethno = b64(`${DS}/fonts/Ethnocentric-Regular.ttf`);
export const logo = uri('decks/source/ACTZ_logo.png', 'image/png');

export const CLIP_NAMES = ['home-hero', 'town-plan', 'town-browse', 'hub-landing'];

// Clip bytes are emitted ONCE into window.__CLIPS and attached to every <video>
// at boot. A clip shown on four surfaces then costs one copy of the base64, not
// four — the difference between a ~45 MB file and a ~22 MB one. Posters stay
// inline as attributes, so a still frame shows even with scripting off.
export const clipTable = Object.fromEntries(
  CLIP_NAMES.map((n) => [
    n,
    { webm: uri(`${CLIPS}/${n}.webm`, 'video/webm'), mp4: uri(`${CLIPS}/${n}.mp4`, 'video/mp4') },
  ]),
);
const posters = Object.fromEntries(CLIP_NAMES.map((n) => [n, uri(`${CLIPS}/${n}.poster.jpg`, 'image/jpeg')]));
export const posterUri = (n) => posters[n];

export const frames = {
  computer: uri(`${FRAMES}/imac.png`, 'image/png'),
  tablet: uri(`${FRAMES}/ipad-pro-landscape.png`, 'image/png'),
  phone: uri(`${FRAMES}/iphone-x.png`, 'image/png'),
};

// Screen insets as fractions of each artwork's own box, copied verbatim from
// coffee-story/apps/hq/lib/device-fit.ts — so the deck frames its captures
// exactly the way the product's own preview wall does. `ratio` is the PNG's
// measured aspect (width/height); the chassis box must match it or the artwork
// distorts. `r` is the screen-corner radius at presentation size.
export const ART = {
  computer: { ratio: 1843 / 1483, left: 0.040694519805, top: 0.050573162508, w: 0.918610960391, h: 0.64194200944, r: 3 },
  tablet: { ratio: 3180 / 2294, left: 0.070440251572, top: 0.054054054054, w: 0.859119496855, h: 0.892327811683, r: 6 },
  phone: { ratio: 726 / 1444, left: 0.068870523416, top: 0.031855955679, w: 0.862258953168, h: 0.936288088643, r: 20 },
};

// MIT requires the notice to travel with the artwork; it rides in the emitted
// HTML as a comment. See decks/source/device-frames/LICENSE.txt.
export const ARTWORK_NOTICE =
  '<!-- Device chassis artwork: Copyright (c) 2017, Angelos Arnis, Tomi Hiltunen. ' +
  'Licensed under the MIT License; the full notice ships at ' +
  'decks/source/device-frames/LICENSE.txt. -->';
