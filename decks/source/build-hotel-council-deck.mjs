// ACTZ × Marriott partner deck, built on the Georgetown CITY COUNCIL deck.
//
// The council deck (actz-may/client/public/deck/georgetown/index.html) is the
// newer of the two town decks — persona cards, the social-loop graphic, the live
// council dashboard, the 78-row tier matrix and the ROI model. This build reuses
// all 195 KB of its CSS verbatim, its nav script, its eleven image assets and its
// component markup; only the copy is retargeted to a hotel.
//
// Unlike the original it is fully self-contained: images are base64-inlined and
// the two R2-streamed recordings are replaced by local captures, so it opens
// offline. Run from the repository root:
//   node decks/source/build-hotel-council-deck.mjs
import fs from 'node:fs';
import { art, caseStudyCss, clipTable, councilCss, councilScript } from './hotel-council/assets.mjs';
import { responsiveCss } from './hotel-council/css-responsive.mjs';
import { s1, s2, s3, s4, s6, s11, s12 } from './hotel-council/slides-authored.mjs';
import {
  ASSET_PREFIX,
  s10c,
  s10d,
  s3b,
  s5,
  s7,
  s8,
  s8b,
} from './hotel-council/slides-retargeted.mjs';

const OUT = 'one-pagers/actz-hotel-council-deck.html';

// Council-deck arc, retargeted: cover → three perspectives → the problem →
// what ACTZ does → one ecosystem → the property → the group loop → the
// dashboard → how it compares → value to everyone → the ask → tiers → ROI →
// close. Authored and retargeted slides interleave; both use the same classes.
const slides = [s1, s2, s3, s4, s3b, s6, s5, s7, s8, s8b, s11, s10c, s10d, s12];

// Any absolute asset path left in the retargeted markup would 404 once this file
// is opened from disk, so swap each for its inlined data URI.
const INLINE = {
  'brand/actz-logo-color.webp': art.logo,
  'brand/maya-avatar.webp': art.maya,
  'brand/local-avatar.webp': art.local,
  'brand/event-avatar.webp': art.event,
  'brand/avatar-priya.jpg': art.priya,
  'brand/avatar-sam.jpg': art.sam,
  'brand/avatar-diego.jpg': art.diego,
  'brand/avatar-jordan.jpg': art.jordan,
  'imagery/hero-05.webp': art.hero05,
  'imagery/hero-08.webp': art.hero08,
  'imagery/i70-georgetown.webp': art.i70,
};

// Slide ids are left exactly as the council deck wrote them — s3b, s8b, s10c,
// s10d and the rest. They look like leftovers but 68 of that stylesheet's rules
// are scoped to them (#s8b .vp-grid sets the value-tile grid's four columns,
// #s10d the whole ROI block), so renumbering them into document order silently
// strips the layout off five slides. The nav dots below are built from the real
// ids instead, which is the part that actually has to agree.
const slideIds = slides.map((s) => s.match(/<section class="slide"[^>]*?id="([^"]+)"/)[1]);
if (new Set(slideIds).size !== slideIds.length) {
  throw new Error(`duplicate slide ids: ${slideIds.join(', ')}`);
}

let body = slides.join('\n');
for (const [rel, data] of Object.entries(INLINE)) {
  body = body.split(`${ASSET_PREFIX}${rel}`).join(data);
}
const leftover = body.match(new RegExp(`${ASSET_PREFIX}[^"')]*`, 'g'));
if (leftover) throw new Error(`un-inlined asset reference(s): ${[...new Set(leftover)].join(', ')}`);

// The two R2 recordings need a network; point those <video> elements at the
// local clip table instead so the deck presents from a thumb drive.
body = body.replace(
  /<video([^>]*?)src="https:\/\/pub-[^"]*"([^>]*)>/g,
  '<video$1data-clip="town-browse"$2>',
);

const clipBoot = `
window.__CLIPS=${JSON.stringify(clipTable)};
document.querySelectorAll('video[data-clip]').forEach(function(v){
  var c=window.__CLIPS[v.dataset.clip];if(!c)return;
  [['video/webm',c.webm],['video/mp4',c.mp4]].forEach(function(p){
    var s=document.createElement('source');s.src=p[1];s.type=p[0];v.appendChild(s);
  });
  v.load();var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});
});
function resumeClips(){document.querySelectorAll('video').forEach(function(v){
  if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}});}
['pointerdown','keydown','wheel','touchstart'].forEach(function(e){
  addEventListener(e,resumeClips,{once:true,passive:true});});
document.addEventListener('visibilitychange',function(){if(!document.hidden)resumeClips();});`;

const html = `<!DOCTYPE html>
<html lang="en">
<!-- actz:generated source=decks/source/build-hotel-council-deck.mjs · edit the generator, not this file -->
<!-- CSS, nav script and component markup reused verbatim from the Georgetown City Council deck. -->
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ACTZ × Marriott — Concierge Distribution Partner</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
${councilCss}
${caseStudyCss}
${responsiveCss}
</style>
</head>
<body>
<div class="rail"></div><div class="railfill" id="railfill"></div>
<div id="deck">
${body}
</div>
<div class="dots" id="dots">${slideIds.map((id) => `<a href="#${id}"></a>`).join('')}</div>
<script>
${councilScript}
${clipBoot}
</script>
</body></html>`;

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, (fs.statSync(OUT).size / 1048576).toFixed(2), 'MB', `· ${slides.length} slides`);
