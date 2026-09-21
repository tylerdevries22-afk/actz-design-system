// The seven slides whose argument genuinely differs for a hotel, re-authored
// against the council deck's own classes — .pcards/.pcard/.pav/.ptag/.ppts,
// .devtwo/.aphone/.ascreen/.vnotch, .stat/.statc/.cmp-*, .askgrid/.ask,
// .kicker/.gradient-text-flag/.flagrule/.brandword. No class is invented.
import { art, logoChip, logoStrip, marriottMark, marriottTile, posterUri } from './assets.mjs';

// One idea per card, three to five marks each. The earlier version showed
// everything on every card, which made the strips read as a logo wall rather
// than as three different relationships. The long tail moved to the shared band
// underneath, where it belongs.
const GUEST_STACK = [
  ['marriottBrand', 'Marriott'],
  ['hilton', 'Hilton'],
  ['hyatt', 'Hyatt'],
];

const OPERATOR_STACK = [
  ['fareharbor', 'FareHarbor'],
  ['google', 'Google Places'],
  ['tripadvisor', 'Tripadvisor'],
  ['ticketmaster', 'Ticketmaster'],
  ['getyourguide', 'GetYourGuide'],
];

const HOTEL_STACK = [['actz', 'ACTZ platform', true]];

// Everything ACTZ connects that is not the point of one particular card. Sits
// in a band spanning all three, so the breadth is visible without any single
// persona drowning in marks.
const ALL_INTEGRATIONS = [
  ['amadeus', 'Amadeus'],
  ['alltrails', 'AllTrails'],
  ['cotrex', 'COTREX'],
  ['ridb', 'Recreation.gov'],
  ['viator', 'Viator'],
  ['airbnb', 'Airbnb'],
  ['vrbo', 'Vrbo'],
  ['apple', 'Apple Maps'],
  ['stripe', 'Stripe'],
  ['square', 'Square'],
  ['gemini', 'Gemini'],
  ['anthropic', 'Claude'],
  ['openai', 'ChatGPT'],
  ['cloudflare', 'Cloudflare'],
  ['supabase', 'Supabase'],
  ['colorado', 'Colorado Tourism Office'],
];

// Five filled stars. Operators carry a rating in the product, so the card shows
// one — and the line under it says what the rating actually rests on. Every
// clause is verifiable: licences and insurance are collected in the provider
// portal, and the claim pipeline in shared/schema/page-claims.ts is explicit
// that an admin reviews the evidence and no method auto-approves.
const STARS = `<span class="pstars" aria-label="5 out of 5">${'★'.repeat(5)}</span>`;

const TOTAL = 14;
const chrome = (foot, n) =>
  `<div class="foot">${foot}</div><div class="idx">${String(n).padStart(2, '0')} / ${TOTAL}</div>`;

const bg = (src, stops) =>
  `<div style="position:absolute;inset:0;z-index:0"><img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:.5"></div>
  <div style="position:absolute;inset:0;z-index:1;background:linear-gradient(${stops})"></div>`;

const vid = (clip, style = '') =>
  `<video autoplay muted loop playsinline preload="auto" data-clip="${clip}" poster="${posterUri(clip)}" style="${style}"></video>`;

// The ACTZ × Marriott lockup, built from the council deck's .cover-brand.
const lockup = `<div class="cover-brand"><img class="logo" src="${art.logo}" alt="ACTZ" style="height:46px">
  <span style="opacity:.35;font-size:1.2rem">&times;</span>
  <span style="display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#A70023;color:#fff">${marriottMark}</span>
  <span class="brandword" style="letter-spacing:.2em;font-size:1rem">MARRIOTT</span></div>`;

export const s1 = `
<section class="slide" id="s1">
  ${bg(art.hero08, 'hsl(var(--co-navy-deep)) 26%,hsl(var(--co-navy-deep)/.58) 52%,hsl(var(--co-navy-deep)/.12)')}
  <div class="glow"></div>
  <div class="inner">
    ${lockup}
    <div style="margin-top:2rem"><span class="kicker" style="background:hsl(var(--foreground)/.06);border-color:hsl(var(--foreground)/.2);color:hsl(var(--foreground)/.8)">Prepared for Marriott</span></div>
    <h1 class="big">Turn a night's stay into<br><span class="gradient-text-flag">a booked itinerary.</span></h1>
    <p class="lead" style="margin-top:1.3rem">A working demonstration for your property &mdash; how ACTZ turns a guest with a free
      afternoon into a booked day, keeps the spend attributable to the hotel, and hands you the reporting to prove it.</p>
    <div style="margin-top:1.8rem;color:hsl(var(--foreground)/.5)" class="brandword">Act. Create. Transform.</div>
  </div>
  ${chrome('ACTZ · concierge distribution partner', 1)}
</section>`;

export const s2 = `
<section class="slide" id="s2">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <span class="eyebrow">A Saturday at your property</span>
    <h2 class="big" style="margin-top:.4rem">Three perspectives, <span class="gold">one free afternoon.</span></h2>
    <div class="pcards">
      <article class="pcard pv">
        <span class="pav"><img src="${art.maya}" alt="Maya Rivera"></span>
        <div class="pnm">Maya Rivera</div>
        <span class="ptag">Guest</span>
        <ul class="ppts">
          <li><b>Profile</b><span>24, Denver · two nights, one free day</span></li>
          <li><b>Wants</b><span>hiking, history &amp; good food, under $150</span></li>
          <li><b>At stake</b><span>a day she spends somewhere you never see</span></li>
        </ul>
        ${logoStrip('Wherever she is staying', GUEST_STACK)}
      </article>
      <article class="pcard pe town">
        <span class="pav sq"><img src="${marriottTile}" alt="Marriott"></span>
        <div class="pnm">Marriott</div>
        <span class="ptag">The Hotel</span>
        <span class="csbadge">Case study</span>
        <ul class="ppts">
          <li><b>Profile</b><span>a full house and a lobby rack of brochures</span></li>
          <li><b>Wants</b><span>higher guest scores &amp; attributable spend</span></li>
          <li><b>At stake</b><span>the whole day between check-in and checkout</span></li>
        </ul>
        ${logoStrip('Runs on', HOTEL_STACK)}
      </article>
      <article class="pcard pl">
        <span class="pav"><img src="${art.local}" alt="Marco Alvarez"></span>
        <div class="pnm">Marco Alvarez</div>
        <span class="ptag">Local partner operator</span>
        ${STARS}
        <ul class="ppts">
          <li><b>Profile</b><span>runs tours and a diner near the property</span></li>
          <li><b>Wants</b><span>your guests, not a walk-in gamble</span></li>
          <li><b>At stake</b><span>the referral you can't currently make at scale</span></li>
        </ul>
        ${logoStrip('Bookable through', OPERATOR_STACK)}
      </article>
    </div>
    <div class="intall">
      <span class="intall-h">Everything else ACTZ already connects</span>
      <span class="plrow">${ALL_INTEGRATIONS.map(([k, l]) => logoChip(k, l)).join('')}</span>
    </div>
  </div>
  ${chrome('The story', 2)}
</section>`;

export const s3 = `
<section class="slide" id="s3">
  ${bg(art.i70, 'hsl(var(--co-navy-deep)) 27%,hsl(var(--co-navy-deep)/.55) 55%,hsl(var(--co-navy-deep)/.2)')}
  <div class="glow"></div>
  <div class="inner two">
    <div>
      <span class="eyebrow">What your property captures today</span>
      <h1 class="big">Sixteen hours of planning &mdash; <span class="red">and none of the spend.</span></h1>
      <p class="lead" style="margin-top:1.2rem"><img class="mava" src="${art.maya}" alt="Maya">Maya planned this trip for two working
        days before she arrived, and she will spend her free afternoon somewhere you never see, booked through channels that
        pay you nothing.</p>
      <div class="src"><span class="lbl">Sources</span><p>Priceline traveler planning research · MNTN Research on experiential
        travel demand · Colorado Tourism Office / OEDIT per-visitor spend, via the ACTOTA strategic plan · published OTA
        commission rates. Figures size the opportunity; they are not a claim about ACTZ&rsquo;s results.</p></div>
    </div>
    <div>
      <div class="stat"><b style="color:#fff">16 hrs</b><span>the average traveler spends planning and booking one trip — two full working days, before they reach your lobby (Priceline)</span></div>
      <div class="stat"><b style="color:hsl(var(--co-red-light))">15&ndash;30%</b><span>of every OTA booking leaves as commission — and off-property activity spend is not attributed to you at all</span></div>
      <div class="stat"><b style="color:hsl(var(--co-red-light))">70%</b><span>of travelers want guided experiences on their next trip; experience spend now runs 34% above 2019 (MNTN)</span></div>
      <div class="statc"><div class="cmp-lbl">Per guest, per trip &middot; what walks out the door</div>
        <div class="cmp-r"><span class="cmp-n">Average visitor</span><span class="cmp-bar"><i class="gt" style="width:41%"></i></span><b class="cmp-v">~$516</b></div>
        <div class="cmp-r"><span class="cmp-n">Ski visitor</span><span class="cmp-bar"><i class="is" style="width:100%"></i></span><b class="cmp-v gold">~$1,259</b></div></div>
    </div>
  </div>
  ${chrome('The problem', 3)}
</section>`;

export const s4 = `
<section class="slide" id="s4">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">Maya opens ACTZ in your lobby</span>
    <h2 class="big" style="margin-top:.4rem;font-size:clamp(1.6rem,2.8vw,2.5rem)">A few taps in &mdash; a full day,
      <span class="gold">built and booked.</span></h2>
    <div class="devtwo">
      <div class="aphone" style="aspect-ratio:9/17.5;width:clamp(248px,23vw,312px)">
        <div class="ascreen" style="background:#000;display:block">
          ${vid('hub-landing', 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:left top')}
          <span class="vnotch"></span>
        </div>
      </div>
      <div>
        <ul class="pts">
          <li><span class="k">1</span><div><b>Tell ACTZ what she likes.</b><em>Interests, budget, the window she is free, how many in the party. Four questions, not a four-hour planning project.</em></div></li>
          <li><span class="k">2</span><div><b>A day built from real, bookable inventory.</b><em>Ordered and timed &mdash; tickets, a tour, a table, and the ride between them, all genuinely available in that window.</em></div></li>
          <li><span class="k">3</span><div><b>One checkout, attributed to you.</b><em>Every operator is paid direct. The booking carries your property's attribution, so for the first time the day shows up in your reporting.</em></div></li>
        </ul>
        <div class="pills"><span class="pill live"><i></i>Inside the live ACTZ app</span></div>
      </div>
    </div>
  </div>
  ${chrome('What ACTZ does', 4)}
</section>`;

export const s6 = `
<section class="slide" id="s6">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">For every outlet on the property</span>
    <h2 class="big" style="margin-top:.4rem;font-size:clamp(1.7rem,2.9vw,2.7rem)">A storefront and a checkout &mdash;
      <span class="gold">for the whole property.</span></h2>
    <div class="two" style="margin-top:1rem;align-items:stretch">
      <figure class="vid" style="aspect-ratio:1366/1922;height:clamp(360px,60vh,560px);margin:0 auto;align-self:center">
        ${vid('town-browse', 'width:100%;height:100%;object-fit:cover')}
        <figcaption class="live-pill"><i></i>LIVE · actz.org</figcaption>
      </figure>
      <div style="display:flex;flex-direction:column;justify-content:center">
        <ul class="pts">
          <li><span class="k">01</span><div><b>Caf&eacute;, bar, spa, room service.</b><em>One white-label ordering surface across five shipped devices &mdash; your brand, your menu, your merchant account.</em></div></li>
          <li><span class="k">02</span><div><b>Card processing settles to you.</b><em>Per-location Square OAuth. The platform fee rides alongside it at 3.00%, falling to 1.50% above $20,000 a month per location.</em></div></li>
          <li><span class="k">03</span><div><b>Fill the slow hours.</b><em>Empty 2pm in the caf&eacute; &rarr; a same-day offer pushed to guests still in the building. The intercept, run by the property itself.</em></div></li>
        </ul>
        <div class="pills"><span class="pill live"><i></i>Your neighbourhood operators · listed free</span></div>
      </div>
    </div>
  </div>
  ${chrome('The property', 6)}
</section>`;

export const s11 = `
<section class="slide" id="s11">
  <div class="glow"></div>
  <div class="inner">
    <span class="eyebrow">The ask</span>
    <h2 class="big" style="margin-top:.4rem">Two ways you can say yes.</h2>
    <div class="askgrid">
      <div class="ask primary"><span class="tag">Start here · recommended</span><h3>A 90-day pilot at one property.</h3>
        <p>One lobby kiosk, one claimed page, a handful of neighbourhood operators &mdash; enough to prove the plan-and-book loop
          on your own guests before any full agreement. We onboard the operators; the front desk does nothing operational.
          No long-term commitment, no upfront budget line.</p></div>
      <div class="ask"><span class="tag b">Then scale</span><h3>Become the founding hotel partner.</h3>
        <p>Summit tier, founding price locked &mdash; co-branded on your own subdomain, the concierge dashboard, and the ordering
          stack across every outlet. We build the hotel tier around what your pilot actually needed.</p></div>
    </div>
  </div>
  ${chrome('The ask', 11)}
</section>`;

export const s12 = `
<section class="slide" id="s12">
  ${bg(art.hero05, 'hsl(var(--co-navy-deep)) 30%,hsl(var(--co-navy-deep)/.72) 58%,hsl(var(--co-navy-deep)/.3)')}
  <div class="glow"></div>
  <div class="inner">
    <span class="kicker">Why now</span>
    <h1 class="big">Be the founding hotel partner.<br><span class="gradient-text-flag">The model every property copies.</span></h1>
    <div class="flagrule"></div>
    <p class="lead" style="margin-top:1.2rem">Multiply one Maya by every guest with a free afternoon &mdash; that is the spend ACTZ
      books through your property instead of past it, with the reporting to prove it.</p>
    ${lockup}
    <p class="note" style="margin-top:1.4rem">Marriott&rsquo;s name and mark appear here only to identify the party this proposal is
      addressed to. ACTZ is not affiliated with, endorsed by, or sponsored by Marriott International.</p>
  </div>
  ${chrome('Close · why now', 14)}
</section>`;
