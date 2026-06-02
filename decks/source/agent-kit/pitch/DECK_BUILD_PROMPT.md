# Build Prompt — ACTZ × Georgetown Founding-Partner Pitch Deck

**Goal:** a 10-slide deck (HTML + Figma) on the **live ACTZ brand**, telling the walkthrough's
**business-as-hero** story, with real captured UI snippets embedded. Source of truth for narrative:
`pitch/PITCH_SCRIPT.md` (← `docs/plans/georgetown-walkthrough-script.md`).

## 0. Sourcing rule
Use real `actz-may` components in priority order:
1. If an ACTZ Figma library is linked → `search_design_system` / `get_libraries`, place real component **instances**.
2. Else rebuild to the **real specs below** (extracted from the shipped build at `actz.org`). Never invent colors/fonts/radii.

## 1. Real design tokens (verbatim from actz-may index.css)
```
--co-navy-deep 215 60% 5%   (bg)      --co-navy 215 55% 9%      --co-navy-soft 215 45% 14% (card)
--co-stroke 215 30% 22%               --co-blue 215 95% 58% (secondary)  --co-blue-light 210 100% 72%
--co-red 348 85% 47% (accent)         --co-red-light 348 90% 62%
--co-gold 48 95% 55% (primary)        --co-gold-light 50 100% 70%        --co-cream 40 35% 94%
--foreground 210 30% 96%              --muted-foreground 215 18% 70%
primary=gold · secondary=blue · accent=red   (Colorado-flag system)
```
Radius: `--r-s 1.1rem · --r-m 1.66rem · --r-l 2.2rem · --r-pill (full)`.

## 2. Real fonts & assets
- Body/display **Manrope** (200–800). Brand/wordmark/numerals **Ethnocentric** (upload via `upload_assets`, else Manrope ExtraBold).
- Type scale (rem): h1 6 · h2 4.4 · h3 3.3 · h4 2.2 · h5 1.66 · body 1.1–1.25.
- Logo `/ACTZ_logo.png`. Tagline **"Act. Create. Transform."**

## 3. Real components + signature elements
- Reuse: `shared-actz-header`, `actz-button-enabled`, `landing-flag`, `backgrounds-*`, `location-picker-*`,
  `SearchBarModal`, `HotelOfferCard`/`FlightOfferCard`, `global-bottom-navbar`, `notification-bell`.
- Signature: **flag gradient** `linear-gradient(90deg,#036,#d52b1e,#fbbf24)` (top rail + featured-tier border);
  **glassmorphism** (blur 12–16px, hairline `0 0 0 1px #fff12`, soft shadow); **flag-bordered feature pills**
  (gold/blue/red/white); indigo-violet ambient **glow**.

## 4. Slide-by-slide spec — business-as-hero arc (matches PITCH_SCRIPT §0–§5)

> **Premium reference deck:** `deck/REFERENCE_ACTZ_Georgetown_Pitch.html` is the finished visual target —
> 10 slides, locked type tiers, generous whitespace, one idea per slide, dashed `[data-clip="NAME"]` slots.
> **Replicate it exactly**, then replace each `[data-clip]` slot with the matching clip and save as `deck/ACTZ_Georgetown_Pitch.html`.

Audience = **Georgetown council** (B2G founding partner, Colorado Small Towns program, **summer** anchor).
Posture = **honest Live vs Roadmap, aspirational about the vision**. Protagonist = **the Main-St business**
(Subaru family + 6th-St bakery braided throughout). Prices ARE shown (canonical tiers).

1. **Cover** — ACTZ wordmark + logo; Ethnocentric headline; flag rail; founding-partner subtitle; feature pills; "Act. Create. Transform." `[clip: home-hero behind title]`
2. **The traffic you don't capture** (§0) — I-70 cars in a buying mood drive past; town carries cost, captures a sliver; county data lands months late. Stat panel (corridor volume · ~15% OTA leakage · stale data). *Problem before product.*
3. **The intercept** (§1) — the Subaru family; geo-push *(label Roadmap)* → Hub `/town/georgetown` + AI trip-builder + real rails (Loop Railroad, Guanella Pass, Chateau Chamonix); 3-hr drive-through → booked 2-day trip. `[clips: hub-landing, ai-trip-builder, rails-scroll; geo-push-mock labeled Roadmap]`
4. **The toolkit — every business gets to work** ⭐ *(§2 — CENTERPIECE)* — bakery/outfitter/B&B each get an account: **get found & booked (Live)**, **Stripe, no revenue share (Live)**, **notifications (Live infra)**, events+pre-sale ticketing+waivers+scheduling *(Roadmap)*, per-business **attendee CRM** *(Roadmap)*. `[clips: provider-getbooked, provider-stripe, provider-notify]`
5. **The proof — real-time data, not the rear-view mirror** (§3) — Town Dashboard `/town-dashboard/georgetown`: origin, length of stay, spend, demographics, revenue *(Summit)*; real-time + visitor-journey mapping *(Tier-3)*; grant-ready export. `[clip: town-dashboard]`
6. **Honest build state** (§4) — two-column **Live vs Roadmap** table; "features greyed today, you help design."
7. **The Town Tier system** — Trailhead **$2,287/yr** · **Summit $6,887/yr** (highlighted, flag border, $1,499 setup + $449/mo) · Destination Partner **$15,987/yr**. Co-branded `georgetown.actz.com`.
8. **The ask** (§5) — Primary: **sign as a Summit founding partner ($6,887/yr)**. Fallback: **LOI + one-season summer pilot**. Contact card (Tyler DeVries · tyler@actz.org · town clerk (303) 569-2555).
9. **Grants** — the data ACTZ generates **wins the grants that fund year one**: CPW Partners in the Outdoors (LOI ~July 18), CTO Marketing Matching, DOLA REDI, America 250.
10. **Close / why now** — summer anchor; "catch the cars you're already paying for, keep the money on Main Street." Tagline + flag rail.

## 5. Capture → slide embedding
| Clip (from targets.json) | Slide | State |
|---|---|---|
| `home-hero` | 1 (bg), 2 | Live |
| `hub-landing`, `ai-trip-builder`, `rails-scroll` | 3 | Live |
| `geo-push-mock` | 3 (inset, **labeled Roadmap**) | Roadmap mock |
| `provider-getbooked`, `provider-stripe`, `provider-notify` | **4** | Live (Stripe TEST) |
| `town-dashboard` | 5 | Live (Summit) |

- **HTML:** `<video autoplay muted loop playsinline poster=…>`; base64-inline clips < 4 MB → one file.
- **Figma:** place clips as **video fills** (`figma.createVideoAsync`); if blocked, log + continue. Pitchdeck → PPTX for handoff.

## 6. Build & QA checklist
- [ ] Slide order = business-hero arc above; Toolkit (Slide 4) is the visual centerpiece.
- [ ] Dark navy `--co-navy-deep`, flag rail every slide; Manrope + Ethnocentric loaded; real logo.
- [ ] **Canonical tier prices shown; Summit highlighted.** Roadmap features clearly labeled (never shown as Live).
- [ ] Real clips embedded per §5; clips loop; no real PII / live card data.
- [ ] HTML opens offline. Figma: cover frame screenshot before building 2–10 (or logged blocker).
