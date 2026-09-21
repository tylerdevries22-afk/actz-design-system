// Three slides ported from build-georgetown-deck.mjs, retargeted to a hotel.
// The layouts are Georgetown's byte-for-byte — the ★ toolkit slide (app frame
// beside a points column), the dashboard slide (KPI grid over two bucket
// charts), and the four-card grid that used to carry grants.
import { ic } from './icons.mjs';
import { chip, offerings } from './data.mjs';
import { askedFor, heroPoints, hotelKpis, requestTiming, revenueCards } from './data-dash.mjs';
import { bucket, chrome, gcard, kpiCard, ocard, pt, sampleBadge } from './parts.mjs';

const FOOT_HERO = '§2 the hotel is the concierge — the heart';
const FOOT_DASH = '§3 proof · your own reporting';
const FOOT_PAYS = '§4 what it is worth';

// Georgetown's slide 04, reshaped. There the protagonist was the Main-St
// business; here it is the hotel, which supplies every resource that makes a
// recommendation good while ACTZ supplies only the engine.
export const sHero = `
<section class="slide" id="s4">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <span class="kicker">★ The heart of it · your hotel is the hero</span>
    <h2 class="big" style="margin-top:.5rem;font-size:clamp(1.7rem,2.9vw,2.7rem)">Not a rack of pamphlets &mdash;
      <span class="gold">your hotel is the concierge.</span></h2>
    <div class="two" style="margin-top:1rem;align-items:stretch">
      <div class="app">
        <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span>
          <span class="app-url">actz.org / concierge / marriott</span></div>
        <div class="app-body">
          <div class="prov-head"><div class="avatar mar">${ic.marriott}</div>
            <div><h4>Marriott &mdash; concierge desk</h4><p>Party of 2 · one free evening · $200 per person · outdoors, history</p></div>
            <span class="badge" style="margin-left:auto">Live</span></div>
          <div class="grid2">${offerings.map((o) => ocard(o, ic.star)).join('')}</div>
          <div class="grid2" style="margin-top:12px">
            <div class="pay"><div class="hd"><span class="stripe">${ic.card}One checkout</span><span class="badge">Settled</span></div>
              <div class="amt">$276.00</div><div class="sub">Two tickets, one table, one transfer &mdash; paid once.</div>
              <div class="direct">${ic.check}Each operator paid out directly</div></div>
            <div class="notify"><span class="stripe" style="color:hsl(var(--co-gold))">${ic.bell}Send a same-day offer</span>
              <div class="field"><span class="ph">Quiet 2pm in the caf&eacute;?</span> Push an afternoon rate to guests still in the building.</div>
              <div class="pills" style="margin-top:.7rem">${chip('Push infrastructure · Live', 'live')}</div></div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center">
        <ul class="pts">${heroPoints.map(([k, t, d]) => pt(k, t, d)).join('')}</ul>
        <div class="pills">${chip('Events + ticketing · Roadmap', 'road')}${chip('Group block planning · Roadmap', 'road')}</div>
        <p class="note">Real ACTZ components behind an authenticated view. Listings are live provider inventory from the
          Summit Seekers account.</p>
      </div>
    </div>
  </div>
  ${chrome(FOOT_HERO, 4)}
</section>`;

// Georgetown's slide 05, unchanged in structure: a KPI grid above two bucket
// charts inside an app frame. The figures are invented, so the frame carries a
// Sample-data badge beside the tier badge and the note says it again.
export const sDash = `
<section class="slide" id="s6">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <span class="eyebrow">The proof · reporting you own</span>
    <h2 class="big" style="margin-top:.5rem">Stop guessing what your guests <span class="gold">did all day.</span></h2>
    <div class="app" style="margin-top:1.3rem">
      <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span>
        <span class="app-url">actz.org / concierge / marriott / dashboard</span>
        <span class="badge" style="background:hsl(var(--co-gold)/.16);color:hsl(var(--co-gold))">Summit tier</span>
        ${sampleBadge}</div>
      <div class="app-body">
        <div class="grid4">${hotelKpis.map(kpiCard).join('')}</div>
        <div class="grid2" style="margin-top:12px">
          ${bucket('What your guests asked for', askedFor)}
          ${bucket('When they asked', requestTiming)}
        </div>
        <p class="note" style="margin:.9rem 0 0">Real ACTZ dashboard components (KpiCard · VisitorIntelSection). <b>The figures are
          sample data</b> shaped to a 180-key property &mdash; ACTZ has taken no production hotel bookings yet, so on day one this
          dashboard is empty and fills as your guests use it.</p>
      </div>
    </div>
    <div class="pills">${chip('Your own dashboard · Summit tier', 'live')}${chip('Monthly guest-interest read · Live', 'live')}${chip('Real-time attribution · Roadmap', 'road')}</div>
  </div>
  ${chrome(FOOT_DASH, 6)}
</section>`;

// Georgetown's grants slide, which has no hotel equivalent. The four-card grid
// survives; it now carries the four commercial arguments instead.
export const sPays = `
<section class="slide" id="s7">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <div class="eyebrow">What it is worth to you</div>
    <h2 class="big">Four ways this pays<br>for <span class="gold">itself.</span></h2>
    <div class="gcards">${revenueCards.map((c, i) => gcard(i + 1, c.h, c.p)).join('')}</div>
    <p class="note">Colorado figures are from the Colorado Tourism Office and OEDIT by way of the ACTOTA strategic plan. They size
      the opportunity; they are not a claim about ACTZ&rsquo;s results, which slide 11 states plainly.</p>
  </div>
  ${chrome(FOOT_PAYS, 7)}
</section>`;
