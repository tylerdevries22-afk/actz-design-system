// Premium ACTZ × Georgetown deck generator.
// Self-contained: inlines the REAL actz-may/actz-design-system tokens + components,
// Ethnocentric brand font, ACTZ logo, and all 4 captured clips (base64).
// Recreates the provider dashboard (S4) + town dashboard (S5) from the real components.
import fs from 'node:fs';

const DS = '.';
const REPO = '.';
const CLIPS = 'decks/source/clips';
const OUT = 'one-pagers/georgetown-pitch-deck.html';

const read = (p) => fs.readFileSync(p, 'utf8');
const b64 = (p) => fs.readFileSync(p).toString('base64');
const uri = (p, m) => `data:${m};base64,${b64(p)}`;

const tokensCss = read(`${DS}/colors_and_type.css`)
  // strip the Google Fonts @import (we add it once in <head>)
  .replace(/@import url\([^)]*\);/g, '')
  // drop the relative-URL @font-face blocks — Ethnocentric is inlined as base64 below,
  // and the relative path 404s when the deck is served from /one-pagers/.
  .replace(/@font-face\s*\{[^}]*\}/g, '');
const compCss = read(`${DS}/components.css`);
const ethno = b64(`${DS}/fonts/Ethnocentric-Regular.ttf`);
const logo = uri('decks/source/ACTZ_logo.png', 'image/png');

const clip = (name, { label = 'LIVE · actz.org', cls = '' } = {}) => `
<figure class="vid ${cls}">
  <video autoplay muted loop playsinline preload="auto" poster="${uri(`${CLIPS}/${name}.poster.jpg`, 'image/jpeg')}">
    <source src="${uri(`${CLIPS}/${name}.webm`, 'video/webm')}" type="video/webm">
    <source src="${uri(`${CLIPS}/${name}.mp4`, 'video/mp4')}" type="video/mp4">
  </video>
  <figcaption class="live-pill"><i></i>${label}</figcaption>
</figure>`;

// tiny inline icon set (stroke currentColor)
const ic = {
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/><path d="M16 13h.01"/></svg>',
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M21 8v5h-5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"/></svg>',
};

// real Georgetown provider offerings (Summit Seekers Adventures demo seed)
const offerings = [
  { t: 'Georgetown Loop Railroad', meta: '2h 15m · Narrow-gauge', price: '$49', img: 'linear-gradient(135deg,#1b3a5c,#0b1a2c)', tag: 'Active', rating: '4.9' },
  { t: 'Lebanon Silver Mine Tour', meta: '1h 30m · Underground', price: '$39', img: 'linear-gradient(135deg,#5c3a1b,#2c1a0b)', tag: 'Active', rating: '4.8' },
  { t: 'Mount Bierstadt Guided 14er', meta: 'Full day · Strenuous', price: '$189', img: 'linear-gradient(135deg,#2c5c3a,#0b2c1a)', tag: 'Active', rating: '5.0' },
  { t: 'Guanella Pass Sunset Tour', meta: '3h · Scenic drive', price: '$79', img: 'linear-gradient(135deg,#5c1b3a,#2c0b1a)', tag: 'Active', rating: '4.9' },
];

// town dashboard KPIs (Summit tier · representative)
const kpis = [
  { icon: ic.users, label: 'Visitors this season', value: '18,432' },
  { icon: ic.clock, label: 'Avg. length of stay', value: '1.8 nights' },
  { icon: ic.wallet, label: 'Est. visitor spend', value: '$2.4M' },
  { icon: ic.trend, label: 'Hub booking revenue', value: '$214,900' },
];
const origins = [['Denver Metro', 41], ['Front Range', 27], ['Out-of-state', 23], ['International', 9]];
const stays = [['Day trip', 38], ['1 night', 34], ['2 nights', 19], ['3+ nights', 9]];

const chip = (txt, kind) => `<span class="pill ${kind}"><i></i>${txt}</span>`;

let html = `<!DOCTYPE html>
<html lang="en">
<!-- actz:generated source=decks/source/build-georgetown-deck.mjs · edit the generator, not this file -->
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ACTZ × Georgetown — Founding Partner Proposal</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
@font-face{font-family:'Ethnocentric';src:url(data:font/ttf;base64,${ethno}) format('truetype');font-weight:400;font-display:swap}
/* ===== real ACTZ tokens ===== */
${tokensCss}
/* ===== real ACTZ components ===== */
${compCss}
/* ===== deck layer ===== */
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
/* ===== app-frame (real-component recreations) ===== */
.app{border-radius:var(--r-l);overflow:hidden;border:1px solid hsl(var(--co-stroke));background:hsl(215 55% 7%);box-shadow:var(--shadow-card),0 0 70px -26px hsl(var(--co-blue)/.5)}
.app-bar{display:flex;align-items:center;gap:.7rem;padding:.8rem 1rem;background:hsl(215 55% 9%);border-bottom:1px solid hsl(var(--co-stroke))}
.app-dot{width:11px;height:11px;border-radius:50%}.d1{background:#ff5f57}.d2{background:#febc2e}.d3{background:#28c840}
.app-url{margin-left:.6rem;flex:1;font:500 .8rem/1 var(--font-body);color:hsl(var(--muted-foreground));
  background:hsl(215 55% 6%);border:1px solid hsl(var(--co-stroke));border-radius:var(--r-pill);padding:.45rem .9rem}
.app-body{padding:1rem}
.prov-head{display:flex;align-items:center;gap:.9rem;margin-bottom:1.1rem}
.avatar{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-family:var(--font-brand);font-size:1.1rem;color:#0b1a2c;background:linear-gradient(135deg,hsl(var(--co-gold)),hsl(var(--co-gold-light,48 100% 70%)))}
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
.pay .stripe{font:700 .82rem/1 var(--font-body);color:#635bff;display:inline-flex;align-items:center;gap:.4rem}
.stripe svg{width:15px;height:15px;flex:none}
.pay .amt{margin-top:.5rem;font:800 1.7rem/1 var(--font-display);color:hsl(var(--foreground));letter-spacing:-.02em}
.pay .sub{font-size:.78rem;color:hsl(var(--muted-foreground));margin-top:.2rem}
.direct{margin-top:.7rem;display:inline-flex;align-items:center;gap:.45rem;font:600 .82rem/1.2 var(--font-body);color:hsl(var(--co-gold))}
.direct svg{width:15px;height:15px;flex:none}
.notify{border-radius:16px;border:1px solid hsl(var(--co-stroke));background:hsl(var(--card));padding:1rem}
.notify .field{margin-top:.6rem;background:hsl(215 55% 6%);border:1px solid hsl(var(--co-stroke));border-radius:12px;padding:.7rem .8rem;font-size:.86rem;color:hsl(var(--foreground)/.9)}
.notify .field .ph{color:hsl(var(--muted-foreground))}
/* KPI */
.kpi{display:flex;align-items:center;gap:.9rem;padding:1.1rem 1.15rem;border-radius:18px;background:hsl(var(--card));border:1px solid hsl(var(--co-stroke))}
.kpi .ico{flex:none;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:hsl(var(--co-gold)/.12);color:hsl(var(--co-gold))}
.kpi .ico svg{width:20px;height:20px}
.kpi .lbl{font-size:.82rem;color:hsl(var(--muted-foreground))}
.kpi .val{font:800 1.5rem/1.05 var(--font-display);letter-spacing:-.01em;margin-top:.15rem}
.bucket{border-radius:16px;background:hsl(var(--card));border:1px solid hsl(var(--co-stroke));padding:1rem 1.1rem}
.bucket h5{margin:0 0 .7rem;font:700 .82rem/1 var(--font-body);color:hsl(var(--muted-foreground))}
.bar{display:flex;align-items:center;gap:.7rem;margin-bottom:.6rem}
.bar .nm{width:96px;font-size:.85rem;color:hsl(var(--foreground)/.85)}
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
@media(max-width:900px){.two,.cols,.askgrid,.gcards,.grid2{grid-template-columns:1fr}.tiers,.grid4{grid-template-columns:1fr 1fr}.clipgrid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="rail"></div><div class="railfill" id="railfill"></div>
<div id="deck">

<!-- 1 COVER -->
<section class="slide" id="s1">
  <div class="glow"></div>
  ${clip('home-hero', { cls: 'fill', label: 'LIVE · actz.org' })}
  <div style="position:absolute;inset:0;z-index:2;background:linear-gradient(105deg,hsl(var(--co-navy-deep)) 22%,hsl(var(--co-navy-deep)/.45) 48%,hsl(var(--co-navy-deep)/.05))"></div>
  <div class="inner">
    <div class="cover-brand"><img class="logo" src="${logo}" alt="ACTZ"><span class="wordmark">ACTZ</span></div>
    <div style="margin-top:2.4rem"><span class="kicker">Founding Partner · Colorado Small Towns</span></div>
    <h1 class="big">The operating system for a<br><span class="gradient-text-flag">regenerative tourism economy.</span></h1>
    <p class="lead" style="margin-top:1.3rem">For the Town of Georgetown, Colorado — catch the cars you already pay for, and keep the money on Main Street.</p>
    <div style="margin-top:2.2rem" class="brandword gold">Act. Create. Transform.</div>
  </div>
  <div class="foot">ACTZ · Adventure Colorado</div><div class="idx">01 / 10</div>
</section>

<!-- 2 PROBLEM -->
<section class="slide" id="s2">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <span class="eyebrow">The traffic you don't capture</span>
      <h1 class="big">A few thousand cars an hour come off I-70 — <span class="red">and drive past.</span></h1>
      <p class="lead" style="margin-top:1.2rem">They're already in a buying mood. Today they ride the Loop, grab one lunch, and leave. You carry the traffic, the parking, the trail wear — and capture a sliver of the spend. When the season ends, all you get is a county summary that lands months late.</p>
    </div>
    <div>
      <div class="stat"><b>3,000+</b><span>cars/hour off I-70 past Georgetown on a July afternoon</span></div>
      <div class="stat"><b>~15%</b><span>of an OTA booking leaves the local economy as commission</span></div>
      <div class="stat"><b>months</b><span>late, anonymized, un-actionable — the county data you get today</span></div>
    </div>
  </div>
  <div class="foot">The problem · §0</div><div class="idx">02 / 10</div>
</section>

<!-- 3 INTERCEPT -->
<section class="slide" id="s3">
  <div class="glow"></div>
  <div class="inner two">
    <div>
      <span class="eyebrow">The intercept · I-70 traveler</span>
      <h2 class="big">A car that would've passed becomes a <span class="gold">booked weekend.</span></h2>
      <p class="lead" style="margin-top:1.1rem">A family in a Subaru, 12 minutes out. A geo-fenced nudge surfaces the 6th-St bakery; they land on Georgetown's Hub and an AI trip-builder turns intent into a day-by-day itinerary built from Georgetown's own businesses.</p>
      <div class="clipgrid" style="margin-top:1.5rem">
        ${clip('ai-trip-builder', { label: 'LIVE · AI trip-builder' })}
        ${clip('rails-scroll', { label: 'LIVE · Hub rails' })}
      </div>
      <div class="pills">
        ${chip('Hub landing · Live', 'live')}${chip('AI trip-builder · Live', 'live')}${chip('Geo-push targeting · Roadmap', 'road')}
      </div>
    </div>
    <div>${clip('hub-landing', { cls: 'phone', label: 'LIVE · /town/georgetown' })}</div>
  </div>
  <div class="foot">§1 intercept</div><div class="idx">03 / 10</div>
</section>

<!-- 4 TOOLKIT (centerpiece) -->
<section class="slide" id="s4">
  <div class="glow"></div>
  <div class="inner">
    <span class="kicker">★ The toolkit · the heart of the pitch</span>
    <h2 class="big" style="margin-top:.5rem;font-size:clamp(1.7rem,2.9vw,2.7rem)">Not a brochure site — <span class="gold">every Main-St business gets an account.</span></h2>
    <div class="two" style="margin-top:1rem;align-items:stretch">
      <div class="app">
        <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span><span class="app-url">app.actz.com / provider / dashboard</span></div>
        <div class="app-body">
          <div class="prov-head">
            <div class="avatar">SS</div>
            <div><h4>Summit Seekers Adventures</h4><p>Georgetown, CO · 5 active offerings · ★ 4.9</p></div>
            <span class="badge" style="margin-left:auto">Approved</span>
          </div>
          <div class="grid2">
            ${offerings.map(o => `<div class="ocard"><div class="media" style="background:${o.img}"><span class="rate">${ic.star}${o.rating}</span></div><div class="b"><div class="t">${o.t}</div><div class="m">${o.meta}</div><div class="row"><span class="price">${o.price}</span><span class="badge">${o.tag}</span></div></div></div>`).join('')}
          </div>
          <div class="grid2" style="margin-top:12px">
            <div class="pay">
              <div class="hd"><span class="stripe">${ic.card}Stripe payouts</span><span class="badge" style="background:hsl(var(--co-blue)/.18);color:hsl(var(--co-blue-light))">Connected</span></div>
              <div class="amt">$18,420</div><div class="sub">paid out this season · direct to the business</div>
              <div class="direct">${ic.check} ACTZ takes 0% revenue share</div>
            </div>
            <div class="notify">
              <span class="stripe" style="color:hsl(var(--co-gold))">${ic.bell}Send a same-day offer</span>
              <div class="field"><span class="ph">Empty 2pm tables?</span> Fresh pastries on 6th — 10% off this hour.</div>
              <div class="pills" style="margin-top:.7rem">${chip('Push infra · Live', 'live')}</div>
            </div>
          </div>
          <p class="note" style="margin:.9rem 0 0">Real ACTZ provider components · Georgetown demo data (Summit Seekers Adventures). No live card data.</p>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center">
        <ul class="pts">
          <li><span class="k">01</span><div><b>Get found &amp; get booked.</b><em>In the Hub rails and marketplace — the visitor books the town's Hub, no OTA cut to Expedia.</em></div></li>
          <li><span class="k">02</span><div><b>Take payments — Stripe.</b><em>Tour, table, room, class. Money goes directly to the business; ACTZ takes no revenue share.</em></div></li>
          <li><span class="k">03</span><div><b>Send notifications.</b><em>Empty 2pm tables → a same-day push to nearby travelers — the intercept, driven by the business itself.</em></div></li>
        </ul>
        <div class="pills">${chip('Events + ticketing + waivers · Roadmap', 'road')}${chip('Per-business attendee CRM · Roadmap', 'road')}</div>
      </div>
    </div>
  </div>
  <div class="foot">§2 toolkit — the heart</div><div class="idx">04 / 10</div>
</section>

<!-- 5 PROOF -->
<section class="slide" id="s5">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">The proof · real-time, town-owned data</span>
    <h2 class="big" style="margin-top:.5rem">Stop governing tourism by the <span class="gold">rear-view mirror.</span></h2>
    <div class="app" style="margin-top:1.3rem">
      <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span><span class="app-url">app.actz.com / town-dashboard / georgetown</span><span class="badge" style="background:hsl(var(--co-gold)/.16);color:hsl(var(--co-gold))">Summit tier</span></div>
      <div class="app-body">
        <div class="grid4">
          ${kpis.map(k => `<div class="kpi"><div class="ico">${k.icon}</div><div><div class="lbl">${k.label}</div><div class="val">${k.value}</div></div></div>`).join('')}
        </div>
        <div class="grid2" style="margin-top:12px">
          <div class="bucket"><h5>Where visitors come from</h5>${origins.map(([n, p]) => `<div class="bar"><span class="nm">${n}</span><span class="track"><span class="fillb" style="width:${p}%"></span></span><span class="pc">${p}%</span></div>`).join('')}</div>
          <div class="bucket"><h5>Length of stay</h5>${stays.map(([n, p]) => `<div class="bar"><span class="nm">${n}</span><span class="track"><span class="fillb" style="width:${p}%"></span></span><span class="pc">${p}%</span></div>`).join('')}</div>
        </div>
        <p class="note" style="margin:.9rem 0 0">Real ACTZ Town Dashboard components (KpiCard · VisitorIntelSection) · representative Summit-tier figures.</p>
      </div>
    </div>
    <div class="pills">${chip('Your own dashboard · Summit', 'live')}${chip('Real-time + journey mapping · Tier-3', 'road')}${chip('Grant-ready export · Live', 'live')}</div>
  </div>
  <div class="foot">§3 proof</div><div class="idx">05 / 10</div>
</section>

<!-- 6 HONEST BUILD STATE -->
<section class="slide" id="s6">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">Honest build state</span>
    <h2 class="big" style="margin-top:.4rem">Live today. <span class="gold">The rest, you help design.</span></h2>
    <div class="cols">
      <div class="col lv"><h4>Live today</h4><ul>
        <li>${ic.check}Destination Hub + 10 category rails</li>
        <li>${ic.check}AI itinerary builder</li>
        <li>${ic.check}Marketplace bookings</li>
        <li>${ic.check}Stripe payments — no revenue share</li>
        <li>${ic.check}Push notification infrastructure</li>
        <li>${ic.check}Provider dashboards + maps</li>
      </ul></div>
      <div class="col rd"><h4>Roadmap · founding-partner co-design</h4><ul>
        <li>${ic.spark}Geo-fenced / interest push targeting</li>
        <li>${ic.spark}Native events + pre-sale ticketing</li>
        <li>${ic.spark}Liability waivers + scheduling</li>
        <li>${ic.spark}Per-business attendee CRM</li>
        <li>${ic.spark}Tier-3 real-time + visitor-journey mapping</li>
      </ul></div>
    </div>
    <p class="note">"The features greyed today, you help design. Georgetown's businesses become the model every other Colorado town copies."</p>
  </div>
  <div class="foot">§4 honest build state</div><div class="idx">06 / 10</div>
</section>

<!-- 7 TIERS -->
<section class="slide" id="s7">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">The Town Tier system</span>
    <h2 class="big" style="margin-top:.4rem">Founding pricing, <span class="gold">locked.</span></h2>
    <div class="tiers">
      <div class="tier"><div class="nm">Trailhead</div><div class="pr">$2,287</div><div class="yr">/ year</div><div class="ds">Get Georgetown on the map — Hub presence + business onboarding.</div></div>
      <div class="tier hot"><div class="nm gold">Summit</div><div class="pr">$6,887</div><div class="yr">/ year · $1,499 setup + $449/mo</div><div class="ds">Co-branded georgetown.actz.com, your own analytics dashboard, every Georgetown business onboarded.</div><div class="rec">★ Recommended founding close</div></div>
      <div class="tier"><div class="nm">Destination Partner</div><div class="pr">$15,987</div><div class="yr">/ year</div><div class="ds">Year-2 upgrade — real-time data + visitor-journey mapping across the season.</div></div>
    </div>
    <p class="note">Co-branded <b class="gold">georgetown.actz.com</b> — every Georgetown business onboarded under the town's account.</p>
  </div>
  <div class="foot">Town Tier system</div><div class="idx">07 / 10</div>
</section>

<!-- 8 ASK -->
<section class="slide" id="s8">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">The ask</span>
    <h2 class="big" style="margin-top:.4rem">Two ways forward.</h2>
    <div class="askgrid">
      <div class="ask primary"><span class="tag">Primary</span><h3>Sign as a Summit founding partner — $6,887/yr.</h3><p>$1,499 setup + $449/mo, founding pricing locked. Co-branded georgetown.actz.com, your own analytics dashboard, every Georgetown business onboarded. Destination Partner is the year-2 upgrade.</p></div>
      <div class="ask"><span class="tag b">Fallback</span><h3>A Letter of Intent + a one-season summer pilot.</h3><p>A handful of Main-St businesses, to prove the intercept-and-book loop before the full contract.</p></div>
    </div>
    <div class="contact">Tyler DeVries · <b>tyler@actz.org</b> · Town Clerk (303) 569-2555</div>
  </div>
  <div class="foot">§5 the ask</div><div class="idx">08 / 10</div>
</section>

<!-- 9 GRANTS -->
<section class="slide" id="s9">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">Grants</span>
    <h2 class="big" style="margin-top:.4rem">The data ACTZ generates <span class="gold">wins the grants that fund year one.</span></h2>
    <div class="gcards">
      <div class="gcard g1"><h4>CPW Partners in the Outdoors</h4><p>LOI ~ July 18</p></div>
      <div class="gcard g2"><h4>CTO Marketing Matching</h4><p>State tourism match</p></div>
      <div class="gcard g3"><h4>DOLA REDI</h4><p>Rural economic development</p></div>
      <div class="gcard g4"><h4>America 250</h4><p>Heritage / mining-history fit</p></div>
    </div>
  </div>
  <div class="foot">Grants</div><div class="idx">09 / 10</div>
</section>

<!-- 10 CLOSE -->
<section class="slide" id="s10">
  ${clip('home-hero', { cls: 'fill', label: 'LIVE · actz.org' })}
  <div style="position:absolute;inset:0;z-index:2;background:linear-gradient(105deg,hsl(var(--co-navy-deep)) 28%,hsl(var(--co-navy-deep)/.7) 56%,hsl(var(--co-navy-deep)/.32))"></div>
  <div class="glow"></div>
  <div class="inner">
    <span class="kicker">Why now</span>
    <h1 class="big">Catch the cars you're already paying for.<br><span class="gradient-text-flag">Keep the money on Main Street.</span></h1>
    <p class="lead" style="margin-top:1.2rem">Summer is the window. A founding partnership makes Georgetown's businesses the model every other Colorado town copies.</p>
    <div class="cover-brand" style="margin-top:2.2rem"><img class="logo" src="${logo}" alt="ACTZ"><span class="brandword gold" style="font-size:1.2rem">Act. Create. Transform.</span></div>
  </div>
  <div class="foot">Close · why now</div><div class="idx">10 / 10</div>
</section>

</div>
<div class="dots" id="dots">${Array.from({ length: 10 }, (_, i) => `<a href="#s${i + 1}"></a>`).join('')}</div>
<div class="hint">↑ ↓ / scroll to move · ⌘P to export PDF · real ACTZ captures embedded · auth-gated screens recreated from real components, labeled</div>
<script>
const deck=document.getElementById('deck');const slides=[...document.querySelectorAll('.slide')];
const dots=[...document.querySelectorAll('#dots a')];const rf=document.getElementById('railfill');
let i=0;
function set(n){i=Math.max(0,Math.min(slides.length-1,n));slides[i].scrollIntoView({behavior:'smooth'});}
addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();set(i+1);}if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();set(i-1);}});
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){i=slides.indexOf(en.target);dots.forEach((d,k)=>d.classList.toggle('on',k===i));rf.style.width=((i+1)/slides.length*100)+'%';
  // ensure videos in view are playing
  en.target.querySelectorAll('video').forEach(v=>{const p=v.play();if(p&&p.catch)p.catch(()=>{});});}}),{root:deck,threshold:.55});
slides.forEach(s=>io.observe(s));
dots[0].classList.add('on');rf.style.width='10%';
</script>
</body></html>`;

html = html.replace('</body></html>', '<a href=\"ACTZ_Georgetown_Pitch.pptx\" download title=\"Download PowerPoint\" style=\"position:fixed;top:14px;right:20px;z-index:80;display:inline-flex;align-items:center;gap:.4rem;padding:.5rem .9rem;border-radius:999px;font:700 .72rem/1 Manrope,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#0b1a2c;background:linear-gradient(90deg,#fbbf24,#ffd75e);text-decoration:none;box-shadow:0 10px 28px -10px rgba(0,0,0,.7)\">&#8595; PPTX</a></body></html>');
fs.writeFileSync(OUT, html);
console.log('wrote', OUT, (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), 'MB');
