// Deck CSS, part 2 of 2 — app-frame recreations, KPI/bucket charts, tiers,
// two-column live/roadmap, ask, grants, nav chrome. Carried over unchanged from
// build-georgetown-deck.mjs; the only addition is the `.devwall` block at the
// end, which the Georgetown deck had no slide for.
export const appCss = `
/* ===== app-frame (real-component recreations) ===== */
.app{border-radius:var(--r-l);overflow:hidden;border:1px solid hsl(var(--co-stroke));background:hsl(215 55% 7%);box-shadow:var(--shadow-card),0 0 70px -26px hsl(var(--co-blue)/.5)}
.app-bar{display:flex;align-items:center;gap:.7rem;padding:.8rem 1rem;background:hsl(215 55% 9%);border-bottom:1px solid hsl(var(--co-stroke))}
.app-dot{width:11px;height:11px;border-radius:50%}.d1{background:#ff5f57}.d2{background:#febc2e}.d3{background:#28c840}
.app-url{margin-left:.6rem;flex:1;font:500 .8rem/1 var(--font-body);color:hsl(var(--muted-foreground));
  background:hsl(215 55% 6%);border:1px solid hsl(var(--co-stroke));border-radius:var(--r-pill);padding:.45rem .9rem}
.app-body{padding:1rem}
/* Sample-data badge. Deliberately loud: it rides on the window chrome of the
   one frame in this deck whose numbers are invented, so it reads before the
   figures do. */
.sample{margin-left:.5rem;flex:none;font:800 .6rem/1 var(--font-body);letter-spacing:.12em;text-transform:uppercase;
  padding:.35rem .6rem;border-radius:var(--r-pill);color:#ffd9df;background:var(--mar);box-shadow:0 0 0 1px rgba(255,255,255,.18)}
.prov-head{display:flex;align-items:center;gap:.9rem;margin-bottom:1.1rem}
.avatar{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-family:var(--font-brand);font-size:1.1rem;color:#0b1a2c;background:linear-gradient(135deg,hsl(var(--co-gold)),hsl(var(--co-gold-light,48 100% 70%)))}
/* The partner avatar carries Marriott red (PMS-equivalent #A70023) rather than
   ACTZ gold, so the tenant in every recreated screen reads as the hotel, not
   as us. --mar-lt is the same hue lifted to stay legible on the navy ground. */
.avatar.mar{background:var(--mar);color:#fff;box-shadow:0 10px 26px -12px var(--mar)}
.avatar.mar svg{width:27px;height:27px}
.prov-head h4{margin:0;font:700 1.05rem/1.1 var(--font-body)}
.prov-head p{margin:.2rem 0 0;font-size:.82rem;color:hsl(var(--muted-foreground))}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.ocard{border-radius:16px;overflow:hidden;background:hsl(var(--card));border:1px solid hsl(var(--co-stroke))}
.ocard .media{height:46px;position:relative}
.ocard .media .rate{position:absolute;top:8px;right:8px;display:inline-flex;align-items:center;gap:.2rem;font:700 .7rem/1 var(--font-body);color:#fff;background:rgba(0,0,0,.5);padding:.25rem .5rem;border-radius:var(--r-pill)}
.ocard .media .rate svg{width:11px;height:11px;color:hsl(var(--co-gold))}
.ocard .b{padding:.5rem .7rem}
.ocard .b .t{font:700 .92rem/1.2 var(--font-body)}
.ocard .b .m{margin-top:.25rem;font-size:.78rem;color:hsl(var(--muted-foreground))}
.ocard .b .row{margin-top:.55rem;display:flex;align-items:center;justify-content:space-between}
.ocard .b .price{font:800 1.05rem/1 var(--font-display);color:hsl(var(--co-gold))}
.badge{font:700 .6rem/1 var(--font-body);letter-spacing:.08em;text-transform:uppercase;padding:.25rem .5rem;border-radius:var(--r-pill);background:hsl(140 60% 45%/.18);color:#5ee08a}
.pay{border-radius:16px;border:1px solid hsl(var(--co-stroke));background:hsl(var(--card));padding:1rem}
.pay .hd{display:flex;align-items:center;justify-content:space-between}
/* A base rule, not only the .pay descendant: the card headings inside .notify
   used the same markup but inherited no layout, so their icon butted straight
   into the label with no gap. (No backticks in here — this file is one big
   template literal.) */
.stripe{display:inline-flex;align-items:center;gap:.45rem;font:700 .82rem/1 var(--font-body);color:hsl(var(--co-blue-light))}
.pay .stripe{font:700 .82rem/1 var(--font-body);color:#635bff;display:inline-flex;align-items:center;gap:.45rem}
.stripe svg{width:15px;height:15px;flex:none}
.pay .amt{margin-top:.5rem;font:800 1.7rem/1 var(--font-display);color:hsl(var(--foreground));letter-spacing:-.02em}
.pay .sub{font-size:.78rem;color:hsl(var(--muted-foreground));margin-top:.2rem}
.direct{margin-top:.7rem;display:inline-flex;align-items:center;gap:.45rem;font:600 .82rem/1.2 var(--font-body);color:hsl(var(--co-gold))}
.direct svg{width:15px;height:15px;flex:none}
.notify{border-radius:16px;border:1px solid hsl(var(--co-stroke));background:hsl(var(--card));padding:1rem}
.notify .field{margin-top:.6rem;background:hsl(215 55% 6%);border:1px solid hsl(var(--co-stroke));border-radius:12px;padding:.7rem .8rem;font-size:.86rem;color:hsl(var(--foreground)/.9)}
.notify .field .ph{color:hsl(var(--muted-foreground))}
/* KPI */
/* Labels reserve two lines whether or not they wrap. Without it the one-line
   cards floated their number a half-line above the two-line cards and the row
   of figures read as crooked. */
.kpi{display:flex;align-items:flex-start;gap:.9rem;padding:1.1rem 1.15rem;border-radius:18px;background:hsl(var(--card));border:1px solid hsl(var(--co-stroke))}
.kpi .ico{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:hsl(var(--co-gold)/.12);color:hsl(var(--co-gold))}
.kpi .ico svg{width:20px;height:20px}
.kpi .lbl{font-size:.82rem;line-height:1.3;color:hsl(var(--muted-foreground));min-height:2.6em}
.kpi .val{font:800 1.5rem/1.05 var(--font-display);letter-spacing:-.01em;margin-top:.15rem}
.bucket{border-radius:16px;background:hsl(var(--card));border:1px solid hsl(var(--co-stroke));padding:1rem 1.1rem}
.bucket h5{margin:0 0 .7rem;font:700 .82rem/1 var(--font-body);color:hsl(var(--muted-foreground))}
.bar{display:flex;align-items:center;gap:.7rem;margin-bottom:.6rem}
/* 96px was enough for Georgetown's one-word origin labels ("Denver Metro");
   the hotel deck's interest categories are longer and wrapped to two lines,
   which threw every bar off its own baseline. */
.bar .nm{width:132px;font-size:.85rem;color:hsl(var(--foreground)/.85)}
.bar .track{flex:1;height:8px;border-radius:999px;background:hsl(215 50% 16%);overflow:hidden}
.bar .fillb{height:100%;border-radius:999px;background:linear-gradient(90deg,hsl(var(--co-blue)),hsl(var(--co-gold)))}
.bar .pc{width:38px;text-align:right;font:600 .8rem/1 var(--font-body);color:hsl(var(--muted-foreground));font-variant-numeric:tabular-nums}
/* tiers */
.tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:1.6rem}
.tier{position:relative;border-radius:var(--r-l);background:hsl(215 50% 10%/.7);border:1px solid hsl(var(--co-stroke));padding:1.6rem 1.5rem;display:flex;flex-direction:column}
.tier.hot{background:hsl(215 50% 12%/.85);border:1.5px solid hsl(var(--co-gold)/.6);box-shadow:0 0 0 1px hsl(var(--co-gold)/.25),0 30px 60px -30px hsl(var(--co-gold)/.5)}
.tier.hot::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;border-radius:var(--r-l) var(--r-l) 0 0;background:linear-gradient(90deg,#003366,#d52b1e,#fbbf24)}
.tier .nm{font:700 1.1rem/1 var(--font-body)}
.tier .pr{font:800 2.6rem/1 var(--font-display);letter-spacing:-.02em;margin:.6rem 0 .1rem}
.tier .yr{color:hsl(var(--muted-foreground));font-size:.95rem}
.tier .ds{margin-top:.7rem;color:hsl(var(--muted-foreground));font-size:.92rem;line-height:1.5}
.tier .rec{margin-top:auto;padding-top:1rem;font:700 .8rem/1 var(--font-body);color:hsl(var(--co-gold));display:inline-flex;align-items:center;gap:.4rem}
/* two-col live/roadmap */
.cols{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:1.4rem}
.col{border-radius:var(--r-l);padding:1.5rem;background:hsl(215 50% 10%/.7)}
.col.lv{border:1px solid hsl(var(--co-blue)/.5)}.col.rd{border:1px solid hsl(var(--co-gold)/.5)}
.col h4{margin:0 0 .9rem;font:700 .82rem/1 var(--font-body);letter-spacing:.12em;text-transform:uppercase}
.col.lv h4{color:hsl(var(--co-blue-light))}.col.rd h4{color:hsl(var(--co-gold))}
.col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem}
.col li{display:flex;gap:.55rem;align-items:flex-start;font-size:.98rem;color:hsl(var(--foreground)/.92);line-height:1.4}
.col li svg{flex:none;width:16px;height:16px;margin-top:3px}.col.lv li svg{color:hsl(var(--co-blue))}.col.rd li svg{color:hsl(var(--co-gold))}
/* ask */
.askgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:1.5rem}
.ask{border-radius:var(--r-l);padding:1.6rem;background:hsl(215 50% 10%/.7);border:1px solid hsl(var(--co-stroke))}
.ask.primary{border:1.5px solid hsl(var(--co-gold)/.6);background:hsl(215 50% 12%/.85)}
.ask .tag{font:700 .72rem/1 var(--font-body);letter-spacing:.16em;text-transform:uppercase}
.ask.primary .tag{color:hsl(var(--co-gold))}.ask .tag.b{color:hsl(var(--co-blue-light))}
.ask h3{margin:.6rem 0 0;font:700 1.5rem/1.2 var(--font-display);letter-spacing:-.01em}
.ask p{margin:.7rem 0 0;color:hsl(var(--muted-foreground));font-size:.96rem;line-height:1.55}
.contact{margin-top:1.4rem;padding:1rem 1.2rem;border-radius:var(--r-m);background:hsl(215 55% 8%);border:1px solid hsl(var(--co-stroke));font:600 1rem/1.4 var(--font-body)}
.contact b{color:hsl(var(--co-gold))}
/* grants */
.gcards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:1.5rem}
.gcard{position:relative;border-radius:var(--r-m);background:hsl(215 50% 10%/.7);border:1px solid hsl(var(--co-stroke));padding:1.3rem 1.4rem;overflow:hidden}
.gcard::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px}
.gcard.g1::before{background:hsl(var(--co-gold))}.gcard.g2::before{background:hsl(var(--co-blue))}.gcard.g3::before{background:hsl(var(--co-red))}.gcard.g4::before{background:hsl(var(--co-cream))}
.gcard h4{margin:0 0 .35rem;font:700 1.15rem/1.2 var(--font-body)}
.gcard p{margin:0;color:hsl(var(--muted-foreground));font-size:.9rem}
/* nav dots */
.dots{position:fixed;right:22px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:11px}
.dots a{width:9px;height:9px;border-radius:50%;background:hsl(var(--foreground)/.25);transition:all .2s}
.dots a.on{background:hsl(var(--co-gold));box-shadow:0 0 10px hsl(var(--co-gold)/.8);transform:scale(1.3)}
.hint{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:40;font:500 .72rem/1 var(--font-body);color:hsl(var(--foreground)/.45)}
.note{font-size:.78rem;color:hsl(var(--muted-foreground));margin-top:.7rem;font-style:italic}
/* ===== device wall (slide 05) ===== */
/* Each chassis is the artwork as a background sized 100%/100% on a box locked to
   the PNG's own aspect ratio, with the live capture inset at the fractions the
   product's preview wall uses. Nothing is cropped or stretched. */
.devwall{display:flex;align-items:flex-end;gap:clamp(12px,1.8vw,26px);margin-top:1.5rem}
.devitem{min-width:0;display:flex;flex-direction:column;justify-content:flex-end}
.dev{position:relative;width:100%;background-repeat:no-repeat;background-size:100% 100%;
  filter:drop-shadow(0 34px 62px rgba(0,0,0,.6))}
.dev .screen{position:absolute;overflow:hidden;background:#060d18}
.dev .screen video,.dev .screen img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
.devlabel{margin-top:.8rem;text-align:center;font:700 .62rem/1.4 var(--font-body);letter-spacing:.14em;text-transform:uppercase;color:hsl(var(--muted-foreground))}
.devlabel b{display:block;color:hsl(var(--co-gold));font-size:.72rem;letter-spacing:.12em;margin-bottom:.25rem}
/* ===== Marriott co-brand ===== */
/* This is a proposal to Marriott, so the deck addresses Marriott by name. The
   ACTZ navy ground and Manrope/Ethnocentric type are untouched; what changes is
   the accent on the two co-branded moments — the cover lockup and the surface
   wall on slide 05 — which swap ACTZ gold for Marriott red. #A70023 is the
   brand red; --mar-lt is that hue lifted so it stays legible on navy. */
:root{--mar:#A70023;--mar-lt:#EB3D5B}
.cobrand{display:inline-flex;align-items:center;gap:.9rem;padding:.55rem 1.2rem .55rem .6rem;border-radius:var(--r-pill);
  background:hsl(215 55% 8%/.72);border:1px solid hsl(var(--co-stroke));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.cobrand .actz{font-family:var(--font-brand);font-size:1rem;letter-spacing:.14em;color:hsl(var(--co-gold));padding-left:.5rem}
.cobrand .x{font:400 1.05rem/1 var(--font-body);color:hsl(var(--foreground)/.38)}
.cobrand .mmark{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:var(--mar);color:#fff}
.cobrand .mmark svg{width:20px;height:20px}
.cobrand .nm{font:700 .95rem/1 var(--font-body);letter-spacing:.2em;text-transform:uppercase;color:#fff}
.mar-accent .eyebrow{color:var(--mar-lt)}
.mar-accent .gold{color:var(--mar-lt)}
.mar-accent .devlabel b{color:var(--mar-lt)}
.mar-accent .glow::after{background:radial-gradient(circle,rgba(167,0,35,.36),transparent 62%)}
.mar-accent .dev .screen{box-shadow:0 0 0 1px rgba(167,0,35,.4)}
.mar-accent .cobrand{margin-top:1.1rem}
@media(max-width:900px){.two,.cols,.askgrid,.gcards,.grid2{grid-template-columns:1fr}.devwall{flex-wrap:wrap}.tiers,.grid4{grid-template-columns:1fr 1fr}.clipgrid{grid-template-columns:1fr}}
`;
