// Assets for the hotel build of the Georgetown City Council deck.
//
// The council deck is the newer of the two town decks (client/public/deck/
// georgetown/index.html in actz-may). Its 195 KB of CSS is taken VERBATIM — the
// hotel deck must render with the same components, not a re-implementation — and
// its eleven image assets are inlined as base64 so the result opens offline from
// a thumb drive, which the original cannot do (it loads images by absolute path
// and streams two videos from R2).
import fs from 'node:fs';

const TOWN = '/Users/tylerdevries/Dev/actz-may/client/public/deck/georgetown';
const CLIPS = 'decks/source/clips';

const b64 = (p) => fs.readFileSync(p).toString('base64');
export const uri = (p, m) => `data:${m};base64,${b64(p)}`;

const townHtml = fs.readFileSync(`${TOWN}/index.html`, 'utf8');

// Everything between <style> and </style>, concatenated in document order.
export const councilCss = [...townHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
  .map((m) => m[1])
  .join('\n');

// The deck's own keyboard/scroll/dots behaviour, reused rather than rewritten.
export const councilScript = [...townHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1])
  .join('\n');

// The Ethnocentric @font-face in the council CSS points at a data URI already,
// so nothing to do for type.

// ── Images, inlined ────────────────────────────────────────────────────────
// Same eleven files the council deck uses. The two person avatars carry over
// unchanged: the guest and the local operator are the same two human roles in
// the hotel story, so reusing their portraits keeps the decks visibly related.
const img = (rel, mime) => uri(`${TOWN}/assets/${rel}`, mime);

export const art = {
  logo: img('brand/actz-logo-color.webp', 'image/webp'),
  maya: img('brand/maya-avatar.webp', 'image/webp'),
  local: img('brand/local-avatar.webp', 'image/webp'),
  event: img('brand/event-avatar.webp', 'image/webp'),
  priya: img('brand/avatar-priya.jpg', 'image/jpeg'),
  sam: img('brand/avatar-sam.jpg', 'image/jpeg'),
  diego: img('brand/avatar-diego.jpg', 'image/jpeg'),
  jordan: img('brand/avatar-jordan.jpg', 'image/jpeg'),
  hero05: img('imagery/hero-05.webp', 'image/webp'),
  hero08: img('imagery/hero-08.webp', 'image/webp'),
  i70: img('imagery/i70-georgetown.webp', 'image/webp'),
};

// ── Clips ──────────────────────────────────────────────────────────────────
// The council deck streams two recordings from R2, so it needs a network. These
// are the local captures already cut for the hotel deck, emitted once into
// window.__CLIPS and attached at boot — same single-copy trick as the other
// hotel deck, so a clip used twice costs one copy of its bytes.
export const CLIP_NAMES = ['home-hero', 'hub-landing', 'town-browse'];

export const clipTable = Object.fromEntries(
  CLIP_NAMES.map((n) => [
    n,
    { webm: uri(`${CLIPS}/${n}.webm`, 'video/webm'), mp4: uri(`${CLIPS}/${n}.mp4`, 'video/mp4') },
  ]),
);

const posters = Object.fromEntries(
  CLIP_NAMES.map((n) => [n, uri(`${CLIPS}/${n}.poster.jpg`, 'image/jpeg')]),
);
export const posterUri = (n) => posters[n];

// Marriott's mark, as used on the other hotel deck. Trademark of Marriott
// International; present only to address the party this proposal is made to.
export const marriottMark =
  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.802 11.083l-1.178 2.41c-.8 1.425-1.931 3.167-3.646 3.603-.668.232-1.255.023-1.9-.023L0 20.476a1.626 1.626 0 0 0 .59.386c3.647 1.39 5.122-.1 8.722-8.238l3.403 7.249h4.53l-2.14-4.893 1.213-2.53 3.345 7.311 4.337.027-7.59-16.677-3.475 1.738 2.738 6.222-1.201 2.445L9.45 2.678l-3.7 1.877Z"/></svg>';

// ── Partner / integration marks ────────────────────────────────────────────
// The same logo library the product's own about and landing pages draw from
// (client/public/partners, catalogued in landing-v2/data/site/partners.ts), so
// the deck shows the real set rather than a marketing approximation. Every mark
// named here was verified present on disk and the integration behind it
// verified present in the server code before being claimed on a slide.
const PARTNERS = '/Users/tylerdevries/Dev/actz-may/client/public/partners';

const MARK_FILES = {
  google: ['google-mark.svg', 'image/svg+xml'],
  apple: ['apple-mark.svg', 'image/svg+xml'],
  stripe: ['stripe-mark.svg', 'image/svg+xml'],
  cloudflare: ['cloudflare-mark.svg', 'image/svg+xml'],
  supabase: ['supabase-mark.svg', 'image/svg+xml'],
  ticketmaster: ['ticketmaster-mark.png', 'image/png'],
  fareharbor: ['fareharbor-mark.png', 'image/png'],
  amadeus: ['amadeus-mark.png', 'image/png'],
  alltrails: ['alltrails-mark.png', 'image/png'],
  cotrex: ['cotrex-mark.png', 'image/png'],
  ridb: ['ridb-mark.svg', 'image/svg+xml'],
  viator: ['viator-mark.png', 'image/png'],
  getyourguide: ['getyourguide-mark.svg', 'image/svg+xml'],
  vrbo: ['vrbo-mark.svg', 'image/svg+xml'],
  anthropic: ['anthropic-mark.svg', 'image/svg+xml'],
  openai: ['openai-mark.svg', 'image/svg+xml'],
  gemini: ['gemini-mark.svg', 'image/svg+xml'],
  colorado: ['colorado-mark.svg', 'image/svg+xml'],
};

// Hotel-brand marks come from the simple-icons set (icon files are CC0; each
// mark remains its owner's trademark). Used only to show which flags a guest
// might be staying under — no endorsement is implied or claimed.
const siTile = (hex, d) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${hex}"><path d="${d}"/></svg>`,
  ).toString('base64')}`;

const SI = {
  marriottBrand: [
    'A70023',
    'M8.802 11.083l-1.178 2.41c-.8 1.425-1.931 3.167-3.646 3.603-.668.232-1.255.023-1.9-.023L0 20.476a1.626 1.626 0 0 0 .59.386c3.647 1.39 5.122-.1 8.722-8.238l3.403 7.249h4.53l-2.14-4.893 1.213-2.53 3.345 7.311 4.337.027-7.59-16.677-3.475 1.738 2.738 6.222-1.201 2.445L9.45 2.678l-3.7 1.877Z',
  ],
  // Integrated brands that ship no mark in client/public/partners. Taken from
  // the same CC0 icon set as the hotel flags; each mark stays its owner's
  // trademark and is here only to identify an integration.
  tripadvisor: [
    '34E0A1',
    'M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z',
  ],
  square: [
    '3E4348',
    'M4.01 0A4.01 4.01 0 000 4.01v15.98c0 2.21 1.8 4 4.01 4.01h15.98C22.2 24 24 22.2 24 19.99V4A4.01 4.01 0 0019.99 0H4zm1.62 4.36h12.74c.7 0 1.26.57 1.26 1.27v12.74c0 .7-.56 1.27-1.26 1.27H5.63c-.7 0-1.26-.57-1.26-1.27V5.63a1.27 1.27 0 011.26-1.27zm3.83 4.35a.73.73 0 00-.73.73v5.09c0 .4.32.72.72.72h5.1a.73.73 0 00.73-.72V9.44a.73.73 0 00-.73-.73h-5.1Z',
  ],
  airbnb: [
    'FF5A5F',
    'M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z',
  ],
  hilton: [
    '231F20',
    'M0 7.544v8.912h24V7.544H0zm23.588 8.503H.406V7.95h23.182v8.097zM3.682 14.41h-1.62v-.249l.324-.044V9.873l-.324-.045v-.242h1.62v.242l-.324.045v1.813h2.107V9.873l-.355-.045v-.242h1.647v.242l-.334.045v4.244l.334.044v.25H5.11v-.25l.355-.044v-1.933H3.358v1.933l.324.044v.25zm5.298 0H7.466v-.218l.31-.044V11.24l-.31-.045v-.218h1.203v3.17l.31.045v.218zm2.171.004H9.638v-.215l.303-.041V9.845l-.303-.044V9.59h1.203v4.568l.31.04v.216zm.941-3.116h-.634v-.32h.658v-.717l.88-.262v.978h.807v.32h-.81v2.043c0 .528.108.695.589.695.177 0 .334 0 .48-.037v.235c-.436.153-.804.218-1.114.218-.696 0-.856-.314-.856-.914v-2.24zm3.924 3.214c1.139 0 1.861-.715 1.861-1.786 0-1.176-.678-1.844-1.803-1.844-1.139 0-1.861.74-1.861 1.844 0 1.32.702 1.786 1.803 1.786zm.024-3.364c.525 0 .849.474.849 1.558 0 1.111-.304 1.544-.85 1.544-.51 0-.834-.453-.834-1.544 0-1.105.323-1.558.835-1.558zm3.72 3.262h-1.521v-.218l.31-.044v-2.884l-.31-.045v-.242h1.21v.478c.375-.3.74-.543 1.248-.543.678 0 .981.396.981 1.173v2.066l.31.041v.218h-1.513v-.218l.303-.044v-1.954c0-.542-.2-.784-.613-.784-.191 0-.495.133-.716.287v2.45l.31.045v.218zM7.738 10.07a.487.487 0 0 1 .975 0 .487.487 0 0 1-.488.485.485.485 0 0 1-.487-.485z',
  ],
};

export const marks = {
  ...Object.fromEntries(
    Object.entries(MARK_FILES).map(([k, [file, mime]]) => [k, uri(`${PARTNERS}/${file}`, mime)]),
  ),
  ...Object.fromEntries(Object.entries(SI).map(([k, [hex, d]]) => [k, siTile(hex, d)])),
  // The same lockup the cover uses, rather than the app's own copy — one ACTZ
  // logo asset across the whole deck.
  actz: img('brand/actz-logo-color.webp', 'image/webp'),
};

// Airbnb and Tripadvisor are integrated but ship no mark in the partner folder.
// Rather than source a logo from somewhere unverified, they render as a plain
// text chip in the same strip — which is also the safer trademark posture.
// `wide` is for wordmarks rather than square marks — the ACTZ logo is a long
// lockup and is unreadable letterboxed into a 30px square.
export const logoChip = (key, label, wide = false) =>
  marks[key]
    ? `<span class="plogo${wide ? ' wide' : ''}" title="${label}"><img src="${marks[key]}" alt="${label}"></span>`
    : `<span class="plogo ptxt" title="${label}">${label}</span>`;

export const logoStrip = (heading, items) =>
  `<div class="plogos"><span class="plh">${heading}</span>
  <span class="plrow">${items.map(([k, l, w]) => logoChip(k, l, w)).join('')}</span></div>`;

// Wherever the town deck pictured Georgetown itself — the ecosystem diagram's
// third node, the value-tile column, the persona card — the hotel equivalent is
// a brand, not a place, so a photograph is the wrong object. This tile drops
// into any <img> slot: the Marriott mark on Marriott red, sized to the same box.
const MARRIOTT_TILE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
<rect width="120" height="120" rx="26" fill="#A70023"/>
<g transform="translate(24,24) scale(3)" fill="#fff"><path d="M8.802 11.083l-1.178 2.41c-.8 1.425-1.931 3.167-3.646 3.603-.668.232-1.255.023-1.9-.023L0 20.476a1.626 1.626 0 0 0 .59.386c3.647 1.39 5.122-.1 8.722-8.238l3.403 7.249h4.53l-2.14-4.893 1.213-2.53 3.345 7.311 4.337.027-7.59-16.677-3.475 1.738 2.738 6.222-1.201 2.445L9.45 2.678l-3.7 1.877Z"/></g>
</svg>`;

export const marriottTile = `data:image/svg+xml;base64,${Buffer.from(MARRIOTT_TILE_SVG).toString('base64')}`;

// A deliberately quiet badge. The deck is a proposal, and the property shown is
// an illustration of how Marriott would appear — saying so once, small, in the
// same place each time, is more honest than a disclaimer nobody reads.
export const caseStudyCss = `
.csbadge{display:inline-flex;align-items:center;gap:.34rem;margin-top:.4rem;padding:.2rem .5rem;border-radius:999px;
  font:700 .54rem/1 var(--font-body);letter-spacing:.16em;text-transform:uppercase;
  color:hsl(var(--foreground)/.62);background:hsl(var(--foreground)/.05);border:1px solid hsl(var(--foreground)/.14)}
.csbadge::before{content:"";width:4px;height:4px;border-radius:50%;background:#A70023}
`;

// The council deck's own slide markup, keyed by id — the source for the slides
// the hotel build retargets by content substitution rather than re-authoring.
export const townSlides = Object.fromEntries(
  [...townHtml.matchAll(/<section class="slide"[^>]*id="([^"]+)"[\s\S]*?<\/section>/g)].map((m) => [
    m[1],
    m[0],
  ]),
);
