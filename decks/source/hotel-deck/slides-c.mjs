// Slides 09–12: the honest build state, the commercial models, the first 90
// days, and the ask.
import { ic } from './icons.mjs';
import { asks, contact, live, models, roadmap, timeline, tiers } from './data-biz.mjs';
import { chrome, clip, gcard, pt, scrim } from './parts.mjs';

// A gold dot rather than an icon: nothing in the shared CSS sizes a raw <svg>
// inside a `.tier`, and a bullet reads cleaner at this scale anyway.
const dot = '<i style="flex:none;width:6px;height:6px;border-radius:50%;background:hsl(var(--co-gold));margin-top:.45rem"></i>';
const tierPt = (t) => `<span style="display:flex;gap:.55rem;align-items:flex-start">${dot}<span>${t}</span></span>`;

const tierCard = (t) => `
<div class="tier${t.hot ? ' hot' : ''}">
  <div class="nm">${t.name}</div>
  <div class="pr">${t.year}</div>
  <div class="yr">year one &middot; ${t.terms}</div>
  <div class="ds">${t.blurb}</div>
  <div class="ds" style="display:flex;flex-direction:column;gap:.5rem">${t.pts.map(tierPt).join('')}</div>
  ${t.hot ? '<div class="rec">Recommended for the 90-day pilot</div>' : ''}
</div>`;

export const s9 = `
<section class="slide" id="s11">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <div class="eyebrow">Where we actually are</div>
    <h2 class="big">What is live &mdash; and<br>what is <span class="gold">honestly not.</span></h2>
    <div class="cols">
      <div class="col lv"><h4>Live today</h4>
        <ul>${live.map((t) => `<li>${ic.check}<span>${t}</span></li>`).join('')}</ul></div>
      <div class="col rd"><h4>Not yet / on the roadmap</h4>
        <ul>${roadmap.map((t) => `<li>${ic.spark}<span>${t}</span></li>`).join('')}</ul></div>
    </div>
    <p class="note">The right-hand column is on this slide on purpose. You should hear the gaps from us today rather than
      discover them in week three.</p>
  </div>
  ${chrome('§7 honest build state', 11)}
</section>`;

export const s10 = `
<section class="slide" id="s12">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <div class="eyebrow">Two ways to do business</div>
    <h2 class="big">Pick the model.<br>Then pick <span class="gold">the tier.</span></h2>
    <div class="gcards" style="grid-template-columns:repeat(3,1fr);margin-top:1.3rem">
      ${models.map((m, i) => gcard(i + 1, `${m.name} &mdash; ${m.head}`, m.body)).join('')}
    </div>
    <div class="tiers" style="margin-top:1.2rem">${tiers.map(tierCard).join('')}</div>
    <p class="note">Published Colorado partner pricing. Annual contracts, 12-month minimum, 5% discount for annual prepay,
      60 days&rsquo; notice. A hotel-specific tier does not exist yet &mdash; today you would sit on the town table above.</p>
  </div>
  ${chrome('Partner tier system', 12)}
</section>`;

export const s11 = `
<section class="slide" id="s13">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <div class="eyebrow">The first 90 days</div>
      <h2 class="big">Rack out.<br><span class="gold">Kiosk in.</span></h2>
      <p class="lead" style="margin-top:1.3rem">No migration, no integration project, no IT ticket. Every step below runs on
        something that is already shipped &mdash; the work is configuration and your menu, not new engineering.</p>
    </div>
    <div>
      <ul class="pts">${timeline.map((t) => pt(t.k, t.t, t.d)).join('')}</ul>
    </div>
  </div>
  ${chrome('§8 the first 90 days', 13)}
</section>`;

export const s12 = `
<section class="slide" id="s14">
  <div class="glow"></div>
  ${clip('home-hero', { cls: 'fill', label: 'LIVE · actz.org' })}
  ${scrim('hsl(var(--co-navy-deep)) 36%,hsl(var(--co-navy-deep)/.9) 64%,hsl(var(--co-navy-deep)/.62)')}
  <div class="inner">
    <div class="eyebrow">The ask</div>
    <h1 class="big">Retire <span class="gradient-text-flag">the rack.</span></h1>
    <div class="askgrid">
      ${asks
        .map(
          (a) => `<div class="ask${a.primary ? ' primary' : ''}">
        <div class="tag${a.primary ? '' : ' b'}">${a.primary ? 'What we are asking' : 'What we need'}</div>
        <h3>${a.head}</h3><p>${a.body}</p></div>`,
        )
        .join('')}
    </div>
    <div class="contact">${contact}</div>
    <p class="note">Marriott&rsquo;s name and mark appear here only to identify the party this proposal is addressed to.
      ACTZ is not affiliated with, endorsed by, or sponsored by Marriott International.</p>
  </div>
  ${chrome('Close · why now', 14)}
</section>`;
