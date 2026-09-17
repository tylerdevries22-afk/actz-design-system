// Shared render helpers. Markup matches the class contract in css-core.mjs /
// css-app.mjs exactly, so the two decks render identically from identical CSS.
import { ART, frames, posterUri } from './assets.mjs';
import { ic } from './icons.mjs';

// The ACTZ × Marriott lockup. Two marks, one divider, no invented composite
// logo — each brand keeps its own mark, which is how a partner lockup is
// supposed to read.
export const cobrand = () =>
  `<div class="cobrand"><span class="actz">ACTZ</span><span class="x">&times;</span>
  <span class="mmark">${ic.marriott}</span><span class="nm">Marriott</span></div>`;

// Clips carry `data-clip` instead of inline <source> elements. The boot script
// attaches the base64 sources from window.__CLIPS, so a clip shown on four
// surfaces costs one copy of its bytes. The poster stays inline, so a still
// frame renders even with scripting off.
export const clip = (name, { label = 'LIVE · actz.org', cls = '' } = {}) => `
<figure class="vid ${cls}">
  <video autoplay muted loop playsinline preload="auto" data-clip="${name}" poster="${posterUri(name)}"></video>
  <figcaption class="live-pill"><i></i>${label}</figcaption>
</figure>`;

// Two layers, not one. The 105deg wash alone left the bottom-right quadrant of
// the full-bleed slides bright enough that the town cards in the footage ran
// straight through the lead paragraph and the footnote. The vertical veil sits
// under it and darkens the lower half on every full-bleed slide at once.
export const scrim = (stops) =>
  `<div style="position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,hsl(var(--co-navy-deep)/.3),hsl(var(--co-navy-deep)/.55) 52%,hsl(var(--co-navy-deep)/.88)),linear-gradient(105deg,${stops})"></div>`;

export const kpiCard = ({ icon, label, value }) =>
  `<div class="kpi"><div class="ico">${icon}</div><div><div class="lbl">${label}</div><div class="val">${value}</div></div></div>`;

export const ocard = (o, star) => `
<div class="ocard">
  <div class="media" style="background:${o.img}"><span class="rate">${star}${o.rating}</span></div>
  <div class="b"><div class="t">${o.t}</div><div class="m">${o.meta}</div>
    <div class="row"><span class="price">${o.price}</span><span class="badge">${o.tag}</span></div></div>
</div>`;

export const pt = (k, t, d) => `<li><span class="k">${k}</span><div><b>${t}</b><em>${d}</em></div></li>`;

export const gcard = (n, h, p) => `<div class="gcard g${n}"><h4>${h}</h4><p>${p}</p></div>`;

// Georgetown's horizontal bucket chart, unchanged. Rows are [label, percent].
export const bucket = (title, rows) => `
<div class="bucket"><h5>${title}</h5>${rows
  .map(
    ([n, p]) =>
      `<div class="bar"><span class="nm">${n}</span><span class="track"><span class="fillb" style="width:${p}%"></span></span><span class="pc">${p}%</span></div>`,
  )
  .join('')}</div>`;

// The dashboard slide carries invented figures, so the badge rides on the frame
// chrome where nobody can miss it — a footnote alone is not enough when the rest
// of the deck insists its numbers are counted.
export const sampleBadge = '<span class="sample">Sample data</span>';

const pct = (f) => `${(f * 100).toFixed(4)}%`;

// A chassis is the artwork painted as a 100%/100% background on a box locked to
// the PNG's own measured aspect ratio, with the capture inset at the fractions
// the product's own preview wall uses. Nothing stretches, nothing is guessed.
export const deviceItem = (d) => {
  const a = ART[d.art];
  return `
<div class="devitem" style="flex:${d.flex}">
  <div class="dev" style="aspect-ratio:${a.ratio};background-image:url(${frames[d.art]})">
    <div class="screen" style="left:${pct(a.left)};top:${pct(a.top)};width:${pct(a.w)};height:${pct(a.h)};border-radius:${a.r}px">
      <video autoplay muted loop playsinline preload="auto" data-clip="${d.clip}" poster="${posterUri(d.clip)}"></video>
    </div>
  </div>
  <div class="devlabel"><b>${d.label}</b>${d.sub}</div>
</div>`;
};

export const TOTAL = 14;
export const chrome = (foot, n) =>
  `<div class="foot">${foot}</div><div class="idx">${String(n).padStart(2, '0')} / ${TOTAL}</div>`;
