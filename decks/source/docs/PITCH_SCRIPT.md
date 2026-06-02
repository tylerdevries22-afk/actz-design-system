# ACTZ × Georgetown — Pitch Script (detailed)

> Source of truth: `docs/plans/georgetown-walkthrough-script.md` (actz-may, 2026-06) +
> `ACTZ_Master_Workbook_mvp.xlsx` (v5). This file is the **presenter-facing** narrative the
> deck and the captured snippets serve. Engineer-facing build plan lives in the repo doc's Appendices A–D.

## Framing (read before the room)
- **Deal:** B2G **founding partner** on the ACTZ **Colorado Small Towns** program. Anchor season: **summer**.
- **Wedge:** *Put every Main-St business to work and intercept the I-70 traveler before they drive past.*
- **Proof:** real-time, **town-owned** data that replaces the stale county rollup.
- **Close:** **Summit (Tier 2) founding contract — $6,887/yr**; **Letter of Intent + one-season pilot** as fallback.
- **Demo surfaces:** Destination Hub `/town/georgetown` (evolved location-detail) · Town Dashboard `/town-dashboard/georgetown`.
- **Canonical tiers (numbers in the room — do not invent new ones):** Trailhead **$2,287/yr** · **Summit $6,887/yr** ($1,499 setup + $449/mo) · Destination Partner **$15,987/yr**.

> **Protagonist = the Main-St business owner.** Brick-and-mortar first, events second. The bakery, the
> outfitter, the B&B are the heroes; the traveler story and the data story exist to serve them.

## One braided story, three perspectives
Tell it as a single arc, reusing **one protagonist pair the whole way through**:
the **Subaru family** (I-70 traveler, 12 min out) and the **6th-St bakery** (the Main-St business that catches them).

| Perspective | Role | Where it shows up |
|---|---|---|
| I-70 Traveler | the car you currently lose | §1 Intercept |
| **Main-St Business** | **protagonist / what we're really selling** | **§2 Toolkit ⭐** |
| Town / Council | the buyer | §3 Proof + §5 Ask |

---

## §0 · Cold open — the traffic you don't capture (45s) · *laptop closed*
On-screen: nothing. Stand at the window, point toward I-70.

> "On a July afternoon, a few thousand cars an hour come off I-70 past Georgetown. Those people are
> already in a buying mood — on a trip, wallet open, looking for a reason to stop. Today almost none do.
> They ride the Loop, grab one lunch, drive home. You carry the traffic, the parking, the trail wear —
> and capture a sliver of the spend. When the season ends, all you get is a county summary that lands
> months late and tells you nothing you can act on. We built the system that catches those cars *and*
> proves it to you in real time."

Hold the beat. **Problem before product** — don't open the laptop yet.
*Capture cue: `home-hero` clip can play silently behind the title; the spoken pain comes first.*

## §1 · The intercept — push to the I-70 traveler (3 min)
On-screen: open the Hub `/town/georgetown`. One protagonist:

> "A family in a Subaru, 12 minutes out, heading to the mountains for the weekend. Here's what changes."

- **Geo-fenced, interest-based push** *(Roadmap — describe, don't fake):* as they near the exit —
  *"Hungry? The bakery on 6th has fresh pastries — 10% off this hour. Tap for directions."* A hiker gets
  the trailhead + gear shop; a foodie gets Main St + the brewery; a family gets the Loop + ice cream.
- **The Hub catches the tap** *(Live):* they land on `/town/georgetown` — a Featured strip + **AI trip-builder**:
  *"Plan my Georgetown weekend"* → a day-by-day summer itinerary built from Georgetown's own businesses.
- **Real rails, real data today** *(Live, scroll live):* Things to Do (Loop Railroad, Lebanon/Phoenix mine
  tours), Eat & Drink (Main St), Trails (Guanella Pass, Mt. Bierstadt), Sleep (Hotel Chateau Chamonix, B&Bs),
  plus Shop, Transportation, Camp, Ski, Rentals.
- **The conversion:** a 3-hour drive-through becomes a booked 2-day trip — more covers, more rooms, more
  Main-St spend; the day-tripper you used to lose now stays the night.

> Land it: "That notification is the difference between a car that passes and a customer who stops."

*Capture cues — Live: `hub-landing`, `ai-trip-builder`, `rails-scroll`. Roadmap (do not record as live): geo-push — use a clearly-labeled mock clip or a primed device shot.*

## §2 · The toolkit — every Georgetown business gets to work (4 min) ⭐ *heart of the pitch*
On-screen: switch to a business/provider view.

> "What we're really selling isn't a brochure site. **Every brick-and-mortar business in Georgetown gets an
> account** — the bakery, the outfitter, the B&B, the museum, the brewery. One platform, the whole Main St."

- **Get found & get booked** *(Live):* each business appears in the Hub rails + marketplace and takes bookings
  through the same funnel — **no OTA cut to Expedia; the visitor books the town's Hub.**
- **Take payments** *(Live — Stripe):* tour, table, room, class. Money goes **directly** to the business;
  **ACTZ takes no revenue share.**
- **Send notifications** *(Live infra):* empty 2pm tables → push a same-day offer to nearby travelers — the
  intercept, driven by the business itself.
- **Run events & sell tickets ahead** *(Roadmap — co-design):* create an event, **pre-sell tickets**, collect
  **liability waivers at checkout**, manage **scheduling/time-slots** — no more chasing paper waivers in the lot.
- **Build a customer database** *(Roadmap):* every ticket buyer becomes a **contact the business owns** — the
  first real CRM most Main-St shops have ever had; next season they remarket directly.

> Land it: "Economic development you can hand to your businesses — tools they could never afford on their own, included."

*Capture cues — Live: `provider-getbooked`, `provider-stripe` (TEST mode), `provider-notify`. Roadmap (describe only): events/ticketing/waivers, attendee CRM.*

## §3 · The proof — real-time data, not the county's rear-view mirror (3 min)
On-screen: Town Dashboard `/town-dashboard/georgetown`.

> "Today, how do you know tourism is working? You wait on a county report — aggregated, anonymized to
> uselessness, months old. You're governing by the rear-view mirror."

- **Your own dashboard** *(Summit, Tier 2):* visitor **origin**, **length of stay**, **spend**, time-of-visit,
  demographics, booking revenue — for **Georgetown specifically**, not a county roll-up.
- **Real-time + visitor-journey mapping** *(Destination Partner, Tier 3 upgrade):* watch the season live, see
  which businesses one trip touches, **distribute crowds** off the Loop platform and the Guanella trailhead.
- **Grant-ready:** export a branded report; walk into a state tourism-grant meeting with **numbers you own.**

> Land it: "You stop flying blind. You ease overtourism *while raising* revenue — and you can prove both."

*Capture cues — Live: `town-dashboard` (KPIs, scroll). Tier-3 real-time/journey-map = Roadmap, describe.*

## §4 · Honest build state (1 min)
Posture: **honest about Live vs Roadmap, aspirational about the vision.**

| Live today | Roadmap (founding-partner co-design) |
|---|---|
| Destination Hub + 10 rails · AI itinerary builder · marketplace bookings · **Stripe** · **push infra** · provider dashboards · maps | Geo-fenced/interest **push targeting** · native **events + pre-sale ticketing + waivers + scheduling** · per-business **attendee CRM** · Tier-3 real-time + journey mapping |

> "The features greyed today, you help design. Georgetown's businesses become the model every other Colorado town copies."

## §5 · The ask (1 min)
> "Two ways forward."
- **Primary — sign as a Summit founding partner: $6,887/yr** ($1,499 setup + $449/mo, founding pricing locked).
  Co-branded `georgetown.actz.com`, your own analytics dashboard, every Georgetown business onboarded.
  Destination Partner (Tier 3) is the year-2 upgrade.
- **Fallback — a Letter of Intent + a one-season summer pilot** with a handful of Main-St businesses, to prove
  the intercept-and-book loop before the full contract.

> "Either way, the goal this summer: catch the cars you're already paying for, and keep that money on Main Street."

---

## Delivery notes
- **One protagonist all the way through** — the Subaru family + 6th-St bakery reappear in §1, §2, §3. No new examples.
- **Problem before product** — §0 and §3 open on pain before any screen.
- **Lead with brick-and-mortar** — if time runs short, cut event/festival talk before the §2 business toolkit.
- **Numbers:** quote the canonical tiers above; per-business cost = founding businesses onboard under the town's
  account (setup fee passed through or town-subsidized — decide before the meeting).

## Capture → beat map (for `capture/targets.json`)
| Beat | Snippet(s) | State |
|---|---|---|
| §0 cold open bg | `home-hero` | Live |
| §1 intercept | `hub-landing`, `ai-trip-builder`, `rails-scroll` | Live |
| §1 geo-push | `geo-push-mock` (labeled) | **Roadmap — mock only** |
| §2 toolkit ⭐ | `provider-getbooked`, `provider-stripe`, `provider-notify` | Live (Stripe TEST) |
| §2 events/CRM | — | **Roadmap — describe, don't record** |
| §3 proof | `town-dashboard` | Live (Summit) |
| §3 real-time/journey | — | **Roadmap — describe** |

**Demo prerequisites (from the repo doc):** `GOOGLE_PLACES_API_KEY` set; town-Explore blob warmed for
"Georgetown"; a push notification primed on the demo device (or a recorded clip) for the §1 moment.
Note: georgetown-colorado.org before/after shots must be captured from a host with **open egress** (not CI).

## Deck alignment notes (reconcile before final build)
1. **Reorder the 10 slides to this arc:** Cold-open problem → Intercept → **Business toolkit (hero)** → Proof
   (dashboard) → Honest build state → Tiers → Pilot → Grants → Ask. Business toolkit is the centerpiece, not the traveler.
2. **Pricing:** this script quotes canonical tiers; the earlier deck choice was "no hard prices." Pick one —
   recommend showing the **Trailhead/Summit/Destination Partner** ladder with Summit highlighted (matches the close).
3. **Tier names:** use **Trailhead / Summit / Destination Partner** (canonical), not Spotlight/Activate/Transform.
4. **Surfaces:** capture the real `/town/georgetown` Hub and `/town-dashboard/georgetown`, not invented screens.
