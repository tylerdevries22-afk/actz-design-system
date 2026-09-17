// Deck CSS, part 1 of 2 — carried over from build-georgetown-deck.mjs unchanged.
// The brief was "full copy pass, keep design": every rule here is byte-for-byte
// the Georgetown deck's, so the two decks read as one family.
export const coreCss = `
*{box-sizing:border-box}
html{font-size:clamp(13px,1.05vw,18px);scroll-behavior:smooth}
body{margin:0;background:hsl(var(--co-navy-deep));color:hsl(var(--foreground));font-family:var(--font-body);-webkit-font-smoothing:antialiased}
#deck{height:100vh;overflow-y:auto;scroll-snap-type:y mandatory;scroll-behavior:smooth}
.slide{position:relative;min-height:100vh;scroll-snap-align:start;display:flex;align-items:center;overflow:hidden;
  padding:clamp(26px,4.4vh,66px) clamp(28px,6vw,104px);border-bottom:1px solid hsl(var(--co-stroke)/.4)}
.inner{position:relative;z-index:3;width:100%;max-width:1240px;margin:0 auto}
/* fixed flag progress rail */
.rail{position:fixed;top:0;left:0;right:0;height:4px;z-index:50;
  background:linear-gradient(90deg,#003366,#d52b1e,#fbbf24)}
.railfill{position:fixed;top:0;left:0;height:4px;z-index:51;background:hsl(var(--co-gold));width:0;box-shadow:0 0 14px hsl(var(--co-gold)/.8);transition:width .2s}
/* ambient glow */
.glow{position:absolute;inset:0;z-index:0;pointer-events:none}
.glow::before,.glow::after{content:"";position:absolute;border-radius:50%;filter:blur(90px);opacity:.5}
.glow::before{width:46vw;height:46vw;left:-10vw;top:-12vw;background:radial-gradient(circle,hsl(var(--co-blue)/.28),transparent 60%)}
.glow::after{width:42vw;height:42vw;right:-12vw;bottom:-14vw;background:radial-gradient(circle,hsl(var(--co-gold)/.22),transparent 60%)}
.grain{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.5;
  background-image:radial-gradient(hsl(var(--foreground)/.04) 1px,transparent 1px);background-size:22px 22px}
/* type helpers */
.eyebrow{font:700 .8rem/1 var(--font-body);letter-spacing:.22em;text-transform:uppercase;color:hsl(var(--co-gold))}
.kicker{display:inline-flex;align-items:center;gap:.55rem;padding:.5rem .95rem;border-radius:var(--r-pill);
  background:hsl(var(--co-gold)/.1);border:1px solid hsl(var(--co-gold)/.34);color:hsl(var(--co-gold));
  font:700 .72rem/1 var(--font-body);letter-spacing:.16em;text-transform:uppercase}
h1.big{font:800 clamp(2.6rem,5.4vw,5.2rem)/1.02 var(--font-display);letter-spacing:-.035em;margin:.6rem 0 0}
h2.big{font:800 clamp(2rem,3.6vw,3.5rem)/1.05 var(--font-display);letter-spacing:-.03em;margin:.4rem 0 0}
.lead{font:400 clamp(1rem,1.35vw,1.3rem)/1.6 var(--font-body);color:hsl(var(--muted-foreground));max-width:46ch}
.gold{color:hsl(var(--co-gold))}.red{color:hsl(var(--co-red-light))}.blue{color:hsl(var(--co-blue-light))}
.brandword{font-family:var(--font-brand);letter-spacing:.04em}
.two{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,4vw,64px);align-items:center}
.foot{position:absolute;left:clamp(28px,6vw,104px);bottom:30px;z-index:3;font:600 .72rem/1 var(--font-body);letter-spacing:.14em;text-transform:uppercase;color:hsl(var(--muted-foreground))}
.idx{position:absolute;right:clamp(28px,6vw,104px);bottom:30px;z-index:3;font-family:var(--font-brand);font-size:.8rem;color:hsl(var(--foreground)/.5)}
/* video frame */
.vid{position:relative;margin:0;border-radius:var(--r-m);overflow:hidden;background:#060d18;
  border:1px solid hsl(var(--foreground)/.1);box-shadow:var(--shadow-card),0 0 0 1px rgba(255,255,255,.04),0 0 60px -20px hsl(var(--co-blue)/.5)}
.vid video{display:block;width:100%;height:100%;object-fit:cover}
.vid.fill{position:absolute;inset:0;border-radius:0;border:0;box-shadow:none}
.vid.fill video{height:100%}
.live-pill{position:absolute;left:12px;bottom:12px;display:inline-flex;align-items:center;gap:.45rem;
  padding:.35rem .7rem;border-radius:var(--r-pill);font:700 .62rem/1 var(--font-body);letter-spacing:.12em;text-transform:uppercase;
  background:var(--glass-dark-bg);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#fff;box-shadow:var(--shadow-pop)}
.live-pill i{width:7px;height:7px;border-radius:50%;background:hsl(var(--co-red));box-shadow:0 0 9px hsl(var(--co-red))}
.phone{aspect-ratio:9/19.5;max-height:62vh;margin:0 auto;border-radius:38px;border:8px solid #0a1422;box-shadow:0 40px 80px -30px #000,0 0 0 1px rgba(255,255,255,.06),0 0 70px -18px hsl(var(--co-gold)/.4)}
/* The captures are landscape, so a 9:19.5 phone box has to throw most of the
   width away. Centring the crop cut the content column down the middle and left
   every line clipped at both edges; anchoring top-left keeps the column intact,
   which is the same reasoning behind object-position:top center on .devwall. */
.phone video{object-position:left top}
/* status pills (Live / Roadmap) */
.pill{display:inline-flex;align-items:center;gap:.45rem;padding:.42rem .8rem;border-radius:var(--r-pill);
  font:600 .76rem/1 var(--font-body);white-space:nowrap}
.pill i{width:7px;height:7px;border-radius:50%}
.pill.live{background:hsl(var(--co-blue)/.12);border:1px solid hsl(var(--co-blue)/.45);color:hsl(var(--co-blue-light))}
.pill.live i{background:hsl(var(--co-blue));box-shadow:0 0 8px hsl(var(--co-blue))}
.pill.road{background:hsl(var(--co-gold)/.1);border:1px solid hsl(var(--co-gold)/.4);color:hsl(var(--co-gold))}
.pill.road i{background:hsl(var(--co-gold));box-shadow:0 0 8px hsl(var(--co-gold))}
.pills{display:flex;flex-wrap:wrap;gap:.55rem;margin-top:1.4rem}
.clipgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
/* stat */
.stat{padding:1.2rem 1.4rem;border-radius:var(--r-m);background:hsl(215 50% 11%/.6);border:1px solid hsl(var(--co-stroke));margin-bottom:14px}
.stat b{display:block;font:800 2.4rem/1 var(--font-display);color:hsl(var(--co-gold));letter-spacing:-.02em}
.stat span{display:block;margin-top:.4rem;font-size:.95rem;color:hsl(var(--muted-foreground));line-height:1.4}
/* Source attribution rides inside the stat, set back so it reads as a citation
   rather than as part of the claim. */
.stat span i{font-style:normal;font-size:.82rem;color:hsl(var(--foreground)/.45);white-space:nowrap}
/* logo */
.logo{height:46px;width:auto;display:block;filter:drop-shadow(0 4px 12px rgba(0,0,0,.5))}
.cover-brand{display:flex;align-items:center;gap:18px}
.wordmark{font-family:var(--font-brand);font-size:1.8rem;letter-spacing:.12em;color:#fff}
/* feature list */
.pts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:1.05rem}
.pts li{display:flex;gap:.95rem;align-items:flex-start}
.pts .k{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:hsl(var(--co-gold)/.14);color:hsl(var(--co-gold));font:800 .9rem/1 var(--font-display)}
.pts b{font:700 1.08rem/1.3 var(--font-body);color:hsl(var(--foreground))}
.pts em{display:block;margin-top:.2rem;font-style:normal;font-size:.96rem;color:hsl(var(--muted-foreground));line-height:1.45}
`;
