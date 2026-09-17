// Slides 05–08: the device wall, hotel as a supported tenant type, the
// ordering stack, and the counted proof.
import { ic } from './icons.mjs';
import { chip, devices, proofStats } from './data.mjs';
import { chrome, cobrand, deviceItem, kpiCard, pt } from './parts.mjs';

export const s5 = `
<section class="slide mar-accent" id="s5">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <div class="eyebrow">Every surface, already shipping</div>
    <h2 class="big">Front desk. Lobby kiosk.<br>Staff iPad. <span class="gold">Guest phone.</span></h2>
    ${cobrand()}
    <div class="devwall">${devices.map(deviceItem).join('')}</div>
    <p class="note">Every screen above is a real capture of the running product, not a mockup. The chassis artwork is
      illustrative; the software inside it is what your guests would use.</p>
  </div>
  ${chrome('§2 toolkit · every surface', 5)}
</section>`;

export const s6 = `
<section class="slide" id="s8">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <div class="eyebrow">You are already a supported tenant type</div>
      <h2 class="big">Nothing here<br>needs <span class="gold">building for you.</span></h2>
      <ul class="pts" style="margin-top:1.6rem">
        ${pt('01', 'Hotel is a first-class page type', 'The platform models towns, hotels and businesses as distinct tenants. Hotel is not a re-skinned town page — it has its own schema.')}
        ${pt('02', 'Your attributes, not a generic profile', 'Check-in and check-out times, amenities, room count and a link straight into your own booking engine.')}
        ${pt('03', 'The claim flow is live', 'Public &ldquo;Is this your hotel?&rdquo; call to action &rarr; portal wizard &rarr; admin review queue. Verified by a human; no method auto-approves.')}
        ${pt('04', 'Three branding levels', 'ACTZ-branded, co-branded on your own domain, or full white-label &mdash; where our attribution is suppressed entirely.')}
      </ul>
    </div>
    <div>
      <div class="app">
        <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span>
          <span class="app-url">actz.org / portal / page / marriott</span></div>
        <div class="app-body">
          <div class="prov-head"><div class="avatar mar">${ic.marriott}</div>
            <div><h4>Marriott &mdash; page editor</h4><p>Type: hotel · Status: claimed · Branding: white-label</p></div></div>
          <div class="grid2">
            <div class="notify"><span class="stripe">${ic.clock}Stay details</span>
              <div class="field">Check-in <b>16:00</b> · Check-out <b>11:00</b></div></div>
            <div class="notify"><span class="stripe">${ic.pin}Rooms &amp; amenities</span>
              <div class="field">Room count, amenity list, and your direct booking URL</div></div>
          </div>
          <div class="pills" style="margin-top:12px">
            ${chip('ACTZ-branded', 'live')}${chip('Co-branded', 'live')}${chip('White-label', 'live')}
            ${chip('Claim: unclaimed → pending → claimed', 'live')}
          </div>
          <p class="note">Editor recreated from the real components behind an authenticated view. Field names are the ones
            the hotel schema actually enforces.</p>
        </div>
      </div>
    </div>
  </div>
  ${chrome('§5 already built for you', 8)}
</section>`;

export const s7 = `
<section class="slide" id="s9">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner two">
    <div>
      <div class="eyebrow">The ordering stack</div>
      <h2 class="big">Your café.<br><span class="gold">Your brand.</span><br>Your money.</h2>
      <ul class="pts" style="margin-top:1.6rem">
        ${pt('01', 'White-label, multi-tenant', 'One platform, many brands. The same binaries already run a coffee shop and a construction franchisor &mdash; the tenant is configuration, not a fork.')}
        ${pt('02', 'Your own merchant account', 'Per-location Square OAuth. Card processing settles to you; the platform fee rides alongside it.')}
        ${pt('03', 'Loyalty in your language', 'A four-step ladder with points and credit named whatever you call them &mdash; not &ldquo;platform points&rdquo;.')}
        ${pt('04', 'Menus in, without retyping', 'CSV, PDF or a photo. A model does the first pass, a person reviews every row, and one signed write commits it.')}
      </ul>
    </div>
    <div>
      <div class="app">
        <div class="app-bar"><span class="app-dot d1"></span><span class="app-dot d2"></span><span class="app-dot d3"></span>
          <span class="app-url">hq.actz.org / marriott / orders</span></div>
        <div class="app-body">
          <div class="prov-head"><div class="avatar mar">${ic.marriott}</div>
            <div><h4>Lobby café &mdash; operations</h4><p>Square merchant · multi-jurisdiction tax · role-scoped access</p></div></div>
          <div class="grid2">
            <div class="pay"><div class="hd"><span class="stripe">${ic.card}Platform fee</span><span class="badge">Per order</span></div>
              <div class="amt">3.00%</div><div class="sub">Falls to 1.50% above $20,000 per month, per location.</div>
              <div class="direct">${ic.check}Card processing settles to your merchant account</div></div>
            <div class="notify"><span class="stripe">${ic.bell}Order ticket</span>
              <div class="field"><span class="ph">created &rarr; paid &rarr;</span> in progress &rarr; ready &rarr; picked up. Every transition is an append-only event.</div></div>
          </div>
          <div class="pills" style="margin-top:12px">
            ${chip('Customer app', 'live')}${chip('Lobby kiosk', 'live')}${chip('Staff operator', 'live')}
            ${chip('Kitchen display', 'live')}${chip('HQ back office', 'live')}
          </div>
          <p class="note">Screens recreated from the real components. The stack is deployed and healthy on all five
            surfaces; it has not yet taken a live customer order.</p>
        </div>
      </div>
    </div>
  </div>
  ${chrome('§5 the ordering stack', 9)}
</section>`;

export const s8 = `
<section class="slide" id="s10">
  <div class="glow"></div><div class="grain"></div>
  <div class="inner">
    <div class="eyebrow">Built and live</div>
    <h2 class="big">This is not a deck<br>looking for <span class="gold">an engineer.</span></h2>
    <div class="grid4" style="margin-top:1.6rem">${proofStats.map(kpiCard).join('')}</div>
    <p class="note">Every figure <b>on this slide</b> was counted directly out of the repositories on 16 September 2026 &mdash; tables
      in the schema, paths in the API document, test files on disk, pipelines in CI. None of it is a projection or a round number.
      The one slide in this deck carrying invented figures is the dashboard on 06, and it is badged as sample data.</p>
  </div>
  ${chrome('§6 counted proof', 10)}
</section>`;
