// Slides 01–03: cover, what a guest is really buying, the intercept.
// Slide 04 ("One screen, two jobs") was folded into the ★ hotel-as-hero slide
// in slides-hero.mjs, which reuses the same app frame and points column.
import { logo } from './assets.mjs';
import { chip } from './data.mjs';
import { chrome, clip, cobrand, scrim } from './parts.mjs';

export const s1 = `
<section class="slide" id="s1">
  <div class="glow"></div>
  ${clip('home-hero', { cls: 'fill', label: 'LIVE · actz.org' })}
  ${scrim('hsl(var(--co-navy-deep)) 22%,hsl(var(--co-navy-deep)/.45) 48%,hsl(var(--co-navy-deep)/.05)')}
  <div class="inner">
    <div class="cover-brand"><img class="logo" src="${logo}" alt="ACTZ"><span class="wordmark">ACTZ</span></div>
    <div class="kicker" style="margin-top:1.7rem">Concierge Distribution Partner</div>
    <h1 class="big">The concierge desk<br><span class="gradient-text-flag">that never closes.</span></h1>
    <p class="lead" style="margin-top:1.3rem">Your guests tell a screen what they like, what they want to spend, and when
      they are free. It hands back the exact itinerary &mdash; booked, in seconds, with nobody waiting in line.</p>
    <div style="margin-top:1.7rem">${cobrand()}</div>
  </div>
  ${chrome('Partner proposal · September 2026', 1)}
</section>`;

// Slide 02 used to be a full slide on the pamphlet rack. The rack is a symptom;
// the thing a hotel brand actually buys is the hours it gives a guest back and
// the private, on-brand experience it puts in their hands. Every figure below is
// sourced — Priceline and MNTN from the ACTOTA strategic plan's own research
// section, the 60 seconds from ACTOTA's own Dream Vacations record.
export const s2 = `
<section class="slide" id="s2">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <div class="eyebrow">What a guest is really buying</div>
      <h1 class="big">Sixteen hours.<br>Or <span class="gold">sixty seconds.</span></h1>
      <p class="lead" style="margin-top:1.4rem">Planning is the part of travel people dread. Your guests either arrive having
        already spent two working days on it, or they arrive having skipped it &mdash; and then decide their whole stay over
        breakfast. Neither version is an experience you control, and neither one feels like the property they booked.</p>
      <p class="lead" style="margin-top:1rem">ACTZ hands them a private, curated itinerary in the time it takes to ride the
        elevator up &mdash; booked, priced and built around what <em>they</em> said they wanted.</p>
    </div>
    <div>
      <div class="stat"><b>16 hrs</b><span>the average traveler spends planning and booking one trip &mdash; two full working days, before they ever reach your lobby. <i>Priceline</i></span></div>
      <div class="stat"><b>60 sec</b><span>is what it took on ACTOTA&rsquo;s Dream Vacations service: budget, dates, interests and party size in &mdash; a curated private itinerary out. Over 500 five-star reviews.</span></div>
      <div class="stat"><b>70%</b><span>of travelers want cultural immersion and guided experiences on their next trip, and spending on experiences now runs 34% above 2019. <i>MNTN Research</i></span></div>
    </div>
  </div>
  ${chrome('The problem · §0', 2)}
</section>`;

// Structurally identical to the Georgetown deck's slide 03: copy and clip grid
// on the left, a single full-height `.phone` on the right. The four questions
// live in the pill row rather than a points list, which is where Georgetown put
// its capability chips too — and it frees the column for the phone.
export const s3 = `
<section class="slide" id="s3">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <div class="eyebrow">The intercept · your guest</div>
      <h2 class="big">Four questions.<br>One <span class="gold">exact</span> itinerary.</h2>
      <p class="lead" style="margin-top:1.1rem">What they like. What they will spend. When they are free. How many of them
        there are. From those four answers ACTZ assembles a day that is ordered, timed and genuinely bookable &mdash; tickets,
        tours, a table and the ride between them, settled in one checkout instead of five phone calls.</p>
      <div class="clipgrid" style="margin-top:1.5rem">
        ${clip('town-plan', { label: 'LIVE · Plan with ACTZ AI' })}
        ${clip('town-browse', { label: 'LIVE · actz.org' })}
      </div>
      <div class="pills">
        ${chip('Interests', 'live')}${chip('Budget', 'live')}${chip('Date &amp; time', 'live')}
        ${chip('Party size', 'live')}${chip('One checkout', 'live')}
      </div>
    </div>
    <div>${clip('hub-landing', { cls: 'phone', label: 'LIVE · on the guest’s phone' })}</div>
  </div>
  ${chrome('§1 intercept', 3)}
</section>`;
