// Responsive layer, appended after the council CSS so it wins on equal
// specificity. The council deck already ships queries at 960/900/880/760/540/
// 480/400 and honours prefers-reduced-motion; this file covers what a fixed
// 1600x900 presentation deck does not: the slides authored for this build, very
// wide displays, short laptop viewports, and touch devices where a 100vh slide
// is taller than the visible area.
export const responsiveCss = `
/* A slide is a viewport, not a fixed 900px box. Using dynamic viewport units
   keeps the last line off the mobile browser's collapsing toolbar; the vh value
   stays first as the fallback for engines without dvh. */
.slide{min-height:100vh;min-height:100dvh}
#deck{height:100vh;height:100dvh}

/* ── Minimum legible label size, at every width ──────────────────────────── */
/* The root is clamp(13px,1.05vw,18px), so it only reaches 18px past a 1714px
   viewport — on a 1280px laptop it sits at ~13.4px and labels declared at
   .5-.58rem render at 7-8px. That is too small to read on a phone and too small
   to project in a meeting room, so every micro-label gets a hard floor. max()
   keeps them scaling up on large displays and never lets them fall below it. */
/* !important is deliberate here and nowhere else. The council CSS is reused
   byte-for-byte and reaches these labels through more specific selectors
   (.pcard .ptag, .src .lbl and so on); matching every one of them would mean
   forking that stylesheet, which defeats the point of reusing it. This is a
   single-property legibility floor, not a restyle. */
.foot,.idx,.ptag,.csbadge,.lbl,.roi-tl,.roi-src,.roi-tier,.rp-lbl,.rp-sub,
.tcomm-name,.tcomm-h,.tlabel,.tribbon,.cmp-lbl,.cmp-n,.mkt-h,.mkt-dh,.mkt-prov,
.vp-eye,.lf-t,.lf-ac,.slf-cap,.fw-lab,.badge,.kicker,.tag,
.ppts b,.ppts span,.src p,.src .lbl,.vp-tile .to,.slf-cnt,.cnt,
.roi-tv small,.rc-step span{font-size:max(10.5px,.66rem)!important}
.csbadge{letter-spacing:.12em}

/* The tier matrix is the densest grid in the deck — 78 rows across four
   columns — so its cells get a slightly smaller floor than the rest. */
.tsec,.q,.tfrow .ft{font-size:max(10px,.62rem)!important}

/* ── Persona cards: three across, always ─────────────────────────────────── */
/* These three read as a comparison — guest, operator, hotel, side by side — so
   collapsing them into a column loses the whole point of the slide. They stay
   in a row at every width. Below 700px three equal columns would be ~100px
   each, so the row becomes a snap-scrolling carousel instead: still horizontal,
   still comparable, and each card keeps a readable width. */
.pcards{grid-template-columns:repeat(3,1fr);gap:clamp(10px,1.4vw,24px);align-items:stretch}
.pcard{padding:clamp(1rem,1.6vw,2.2rem) clamp(.8rem,1.2vw,1.65rem) clamp(.95rem,1.4vw,2rem)}
.pcard .pav{width:clamp(52px,6vw,98px);height:clamp(52px,6vw,98px)}
.pnm{font-size:clamp(.92rem,1.3vw,1.3rem)}

@media(max-width:700px){
  .pcards{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;
    -webkit-overflow-scrolling:touch;scrollbar-width:thin;padding-bottom:.6rem;
    /* Bleed to the slide edges so the next card peeks and the row reads as
       swipeable rather than cut off. */
    margin-inline:calc(-1 * clamp(16px,5vw,26px));padding-inline:clamp(16px,5vw,26px)}
  .pcard{flex:0 0 min(78vw,320px);scroll-snap-align:center}
}

/* ── Integration strip inside each persona card ──────────────────────────── */
.plogos{margin-top:auto;padding-top:.85rem;width:100%;border-top:1px solid hsl(var(--co-stroke))}
.plh{display:block;font:700 max(10px,.58rem)/1 var(--font-body);letter-spacing:.14em;
  text-transform:uppercase;color:hsl(var(--foreground)/.42);margin-bottom:.55rem}
.plrow{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center;align-items:center}
/* A white tile per mark. Recolouring was the obvious first move and it was
   wrong: these logos are a mix of flat black SVGs (Apple, OpenAI) and solid
   full-colour PNGs (FareHarbor, AllTrails, Amadeus), so a brightness/invert
   filter renders the second group as blank white squares. A light tile is the
   only treatment that lets every brand render as itself on a navy ground — and
   it is what each brand's own guidelines ask for. */
.plogo{display:inline-grid;place-items:center;width:clamp(26px,2.2vw,32px);height:clamp(26px,2.2vw,32px);
  border-radius:8px;background:#f6f7f9;border:1px solid rgba(255,255,255,.16);
  padding:4px;box-shadow:0 2px 6px -2px rgba(0,0,0,.5)}
.plogo img{width:100%;height:100%;object-fit:contain;display:block}
/* Wordmark chip: the tile grows sideways, the lockup keeps its aspect and is
   bounded by the tile's height. The earlier min-width forced the image wider
   than its box while height stayed at 100%, so the ACTZ lockup spilled out the
   bottom of the chip. */
.plogo{overflow:hidden}
.plogo.wide{width:auto;padding:4px 10px}
/* Explicit height, not 100%: as a centred grid item the percentage resolved to
   auto and the lockup rendered at its intrinsic size, overflowing the chip. */
.plogo.wide img{width:auto;height:clamp(13px,1.15vw,18px);max-width:94px;object-fit:contain}
.plogo.ptxt{width:auto;min-width:0;height:clamp(26px,2.2vw,32px);padding:0 .52rem;
  font:700 max(10px,.57rem)/1 var(--font-body);letter-spacing:.02em;color:#1a2433;white-space:nowrap}

/* ── Operator rating ─────────────────────────────────────────────────────── */
.pstars{display:block;margin-top:.5rem;font-size:max(12px,.8rem);line-height:1;color:hsl(var(--co-gold));letter-spacing:.14em}

/* ── Shared integrations band ────────────────────────────────────────────── */
/* Spans the full width under all three cards: the long tail of integrations
   belongs to the platform, not to any one persona, and putting it here keeps
   each card down to the three-to-five marks that make its own point. */
.intall{margin-top:clamp(14px,1.6vw,22px);padding:clamp(12px,1.4vw,18px) clamp(14px,1.6vw,22px);
  border-radius:var(--r-l);background:hsl(215 50% 11%/.55);border:1px solid hsl(var(--co-stroke));
  display:flex;flex-direction:column;align-items:center;gap:.7rem}
.intall-h{font:700 max(10px,.58rem)/1 var(--font-body);letter-spacing:.16em;text-transform:uppercase;
  color:hsl(var(--foreground)/.42)}
.intall .plrow{gap:.45rem}

@media(max-width:700px){
  /* The band sits outside the card carousel, so it keeps its own full width. */
  .intall{margin-top:16px}
}

/* ── Very wide / very tall displays ─────────────────────────────────────── */
@media(min-width:1800px){
  .inner{max-width:1500px}
}

/* ── Short viewports (laptop at 1280x720, or any landscape phone) ────────── */
/* Scroll-snap plus a hard 100vh slide traps content taller than the screen.
   Below 720px of height the deck stops snapping and lets slides grow. */
@media(max-height:720px){
  #deck{scroll-snap-type:none}
  .slide{min-height:0;height:auto;padding-top:clamp(20px,4vh,40px);padding-bottom:clamp(44px,7vh,64px)}
  .pcard{padding:1.5rem 1.15rem 1.35rem}
  .pcard .pav{width:74px;height:74px}
}

/* ── Tablet and below ───────────────────────────────────────────────────── */
@media(max-width:1024px){
  .devtwo{grid-template-columns:1fr;gap:1.4rem;justify-items:center}
  .devtwo .pts{margin-top:.4rem}
}

@media(max-width:820px){
  /* The council deck sizes everything in rem off html{font-size:clamp(13px,
     1.05vw,18px)}. Below ~820px that clamp pins the root at its 13px floor, so
     labels declared at .54-.72rem render at 7-9px — measurably unreadable. The
     root floor moves to 15px here, which is only safe because slides stop being
     a fixed 100dvh at the same breakpoint: a slide built for 1600x900 cannot
     hold its content in a 393px-wide viewport, so on phones and portrait
     tablets it grows and the deck scrolls normally instead of clipping. */
  html{font-size:15px}
  #deck{scroll-snap-type:none}
  .slide{min-height:0;height:auto;padding-top:clamp(28px,6vh,48px);padding-bottom:clamp(54px,9vh,74px)}
  .two,.inner.two{grid-template-columns:1fr;gap:1.4rem}
  /* Stacked columns read top-down, so a media panel that was beside the copy
     should follow it rather than push it off the first screen. */
  .two > figure.vid{order:2;height:clamp(260px,44vh,420px)!important;width:100%}
  .aphone{width:min(76vw,268px)!important}
  .stat{padding:.9rem 1.05rem;margin-bottom:10px}
  .stat b{font-size:1.9rem}
}

/* ── Phone ──────────────────────────────────────────────────────────────── */
@media(max-width:560px){
  .slide{padding-left:clamp(16px,5vw,26px);padding-right:clamp(16px,5vw,26px)}
  h1.big{font-size:clamp(1.85rem,8.2vw,2.5rem)}
  h2.big{font-size:clamp(1.5rem,6.6vw,2rem)!important}
  .lead{font-size:1rem;max-width:none}
  .pcard{padding:1.5rem 1.2rem 1.4rem}
  .pcard .pav{width:76px;height:76px}
  .askgrid{grid-template-columns:1fr;gap:12px}
  .ask{padding:1.15rem}
  .ask h3{font-size:1.15rem}
  .pts li{gap:.7rem}
  .pts b{font-size:1rem}
  .pts em{font-size:.9rem}
  .foot{font-size:.6rem;bottom:14px}
  .idx{font-size:.68rem;bottom:14px}
  .csbadge{font-size:.5rem}
  /* The nav rail would sit on top of the content at this width. */
  .dots{display:none}
}

/* ── Wide data blocks ───────────────────────────────────────────────────── */
/* The tier matrix, the comparison grid and the ROI cards are genuinely tabular:
   they cannot reflow into one column without losing the comparison. Give each
   its own horizontal scroller instead, so the page itself never scrolls
   sideways. A thin scrollbar keeps the affordance visible. */
@media(max-width:1100px){
  .tfwrap,.cmp,.roi-grid,.tiers,.tcomm,.vp-grid{
    overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;
    padding-bottom:.5rem;
  }
  .cmp,.roi-grid,.vp-grid{min-width:0}
  .cmp > *,.roi-grid > *{min-width:210px}
}

/* ── Touch / coarse pointers ────────────────────────────────────────────── */
@media(hover:none){
  /* Lift-on-hover never resolves on touch and leaves cards stuck raised. */
  .pcard:hover{transform:none}
}

/* ── Print / PDF export ─────────────────────────────────────────────────── */
@media print{
  #deck{height:auto;overflow:visible}
  .slide{min-height:900px;height:900px;break-after:page;page-break-after:always}
  .rail,.railfill,.dots,.hint{display:none!important}
}
`;
