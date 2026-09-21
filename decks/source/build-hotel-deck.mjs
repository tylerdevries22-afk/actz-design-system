// ACTZ × Hotel concierge-partner deck generator.
// A fork of build-georgetown-deck.mjs for a hotel audience: same tokens, same
// components, same type and colour, rewritten copy and four new slides.
// Self-contained — real ACTZ tokens/components, the Ethnocentric brand face, the
// ACTZ logo and every capture are base64-inlined, so the file opens offline.
// Run from the repository root: `node decks/source/build-hotel-deck.mjs`.
import fs from 'node:fs';
import { ARTWORK_NOTICE, clipTable, compCss, ethno, tokensCss } from './hotel-deck/assets.mjs';
import { coreCss } from './hotel-deck/css-core.mjs';
import { appCss } from './hotel-deck/css-app.mjs';
import { s1, s2, s3 } from './hotel-deck/slides-a.mjs';
import { s5, s6, s7, s8 } from './hotel-deck/slides-b.mjs';
import { s9, s10, s11, s12 } from './hotel-deck/slides-c.mjs';
import { sDash, sHero, sPays } from './hotel-deck/slides-hero.mjs';

const OUT = 'one-pagers/actz-hotel-partner-deck.html';
// Georgetown's arc, retargeted: cover → the cost of planning → the intercept →
// ★ the hotel as hero → every surface → the dashboard → what it is worth →
// already built → the ordering stack → counted proof → honest state → tiers →
// first 90 days → the ask. Slide numbering in chrome() must match this order.
const slides = [s1, s2, s3, sHero, s5, sDash, sPays, s6, s7, s8, s9, s10, s11, s12];

// Each clip's base64 is emitted exactly once into this table and attached to
// every <video data-clip> at boot. The Georgetown deck inlined the bytes at each
// call site; slide 05 alone shows four clips, so the table is what keeps this
// file from doubling in size.
const clipBoot = `
window.__CLIPS=${JSON.stringify(clipTable)};
document.querySelectorAll('video[data-clip]').forEach(function(v){
  var c=window.__CLIPS[v.dataset.clip];if(!c)return;
  [['video/webm',c.webm],['video/mp4',c.mp4]].forEach(function(p){
    var s=document.createElement('source');s.src=p[1];s.type=p[0];v.appendChild(s);
  });
  v.load();var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});
});
// Muted autoplay is usually allowed, but some browsers still refuse it until the
// page has been interacted with — which would leave the cover slide frozen on
// its poster at the worst possible moment. Retry every clip on the first real
// interaction, and again whenever the tab is brought back to the front.
function resumeClips(){
  document.querySelectorAll('video').forEach(function(v){
    if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}
  });
}
['pointerdown','keydown','wheel','touchstart'].forEach(function(e){
  addEventListener(e,resumeClips,{once:true,passive:true});
});
document.addEventListener('visibilitychange',function(){if(!document.hidden)resumeClips();});`;

const html = `<!DOCTYPE html>
<html lang="en">
<!-- actz:generated source=decks/source/build-hotel-deck.mjs · edit the generator, not this file -->
${ARTWORK_NOTICE}
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ACTZ × Hotel — Concierge Distribution Partner</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
@font-face{font-family:'Ethnocentric';src:url(data:font/ttf;base64,${ethno}) format('truetype');font-weight:400;font-display:swap}
/* ===== real ACTZ tokens ===== */
${tokensCss}
/* ===== real ACTZ components ===== */
${compCss}
/* ===== deck layer ===== */
${coreCss}
${appCss}
</style>
</head>
<body>
<div class="rail"></div><div class="railfill" id="railfill"></div>
<div id="deck">
${slides.join('\n')}
</div>
<div class="dots" id="dots">${slides.map((_, i) => `<a href="#s${i + 1}"></a>`).join('')}</div>
<div class="hint">↑ ↓ / scroll to move · ⌘P to export PDF · real ACTZ captures embedded · auth-gated screens recreated from real components, labeled</div>
<script>
${clipBoot}
const deck=document.getElementById('deck');const slides=[...document.querySelectorAll('.slide')];
const dots=[...document.querySelectorAll('#dots a')];const rf=document.getElementById('railfill');
let i=0;
function set(n){i=Math.max(0,Math.min(slides.length-1,n));slides[i].scrollIntoView({behavior:'smooth'});}
addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();set(i+1);}if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();set(i-1);}});
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){i=slides.indexOf(en.target);dots.forEach((d,k)=>d.classList.toggle('on',k===i));rf.style.width=((i+1)/slides.length*100)+'%';
  en.target.querySelectorAll('video').forEach(v=>{const p=v.play();if(p&&p.catch)p.catch(()=>{});});}}),{root:deck,threshold:.55});
slides.forEach(s=>io.observe(s));
dots[0].classList.add('on');rf.style.width=(100/slides.length)+'%';
</script>
</body></html>`;

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), 'MB', `· ${slides.length} slides`);
