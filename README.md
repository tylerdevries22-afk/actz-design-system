# ACTZ Design System

> Dark, cinematic, Colorado-rooted. ACTZ is an activity & adventure-travel
> marketplace; the brand sits at the intersection of national-park wilderness
> photography, Colorado flag iconography, and frosted-glass mobile UI.

---

## What is ACTZ?

**ACTZ** (formerly "Actota") is a full-stack marketplace platform that connects
travelers with unique local activities and experiences. It's a hybrid of
Airbnb-experiences, AllTrails, and a group-trip planner — wrapped in a
native-feeling mobile app and a cinematic marketing site.

There are three product surfaces inside this codebase:

| Surface | Stack | Vibe |
|---|---|---|
| **Marketing landing page** | Vite + React + Motion.dev | Cinematic dark hero, curved photo carousels, scroll-driven storytelling |
| **Traveler app** | React + Capacitor (iOS/Android shell) + Tailwind | Mobile-first dark frosted glass, Instagram-style swipeable tabs, Airbnb-style map + cards |
| **Provider/Admin portal** | Next-style internal tool | Same tokens, denser data, sidebar layout |

The map of how everything fits together is in `replit.md` inside the source
repo (also summarised in the system context here).

---

## Sources

This design system was built by reading two GitHub projects:

- **Main monorepo** — <https://github.com/tylerdevries22-afk/actz-may>
  Contains the full app (`client/`), the marketing site (`landing-page/`),
  the admin portal (`admin-portal/`), the Capacitor mobile wrappers
  (`ios/`, `android/`), and ~1,800 brand-related attached_assets.
- **Landing page design system master** —
  [`landing-page/design-system/actz-cinematic-landing/MASTER.md`][master]
  defines the explicit color/type/spacing tokens for the marketing surface.

[master]: https://github.com/tylerdevries22-afk/actz-may/blob/main/landing-page/design-system/actz-cinematic-landing/MASTER.md

If you want to do deeper-fidelity work, **open these repos**. The
`landing-page/src/components/` folder has production-quality Motion.dev
reference implementations of the cinematic Hero, curved carousels, sticky
parallax sections, and the WhatMakesUsDifferent slideshow — far richer than
what's recreated in this skill.

---

## Index

| Path | What it is |
|---|---|
| `README.md` | This file. Read first. |
| `SKILL.md` | Front-matter for use as an Agent Skill in Claude Code. |
| `colors_and_type.css` | All CSS variables: Colorado palette, semantic tokens, Manrope+Ethnocentric type, radii, shadows, easings. |
| `components.css` | Glass surfaces, buttons, marketplace cards, mobile tabbar, search bar. |
| `fonts/` | `Ethnocentric-Regular.ttf`, `Ethnocentric-Italic.ttf` — the brand-display face. Manrope is loaded via Google Fonts. |
| `assets/brand/` | ACTZ logos (mono triangle + color flag wordmark), favicon, social icon sprite. |
| `assets/imagery/` | 8 hero photographs — warm-saturated, Colorado outdoor adventure. |
| `assets/partners/` | Logo lockups for partner brands ACTZ integrates with. |
| `preview/` | One HTML card per concept, registered into the Design System tab. |
| `ui_kits/marketing/` | High-fidelity recreation of the landing-page hero, nav, sections. |
| `ui_kits/app/` | High-fidelity recreation of the mobile app (marketplace, itinerary, ai-chat). |

---

## Content fundamentals

ACTZ writes like a confident, slightly-cinematic outfitter — not a SaaS PM.
Copy is **plural-first** ("travelers", "providers", "crews"), **specific over
generic** ("Maroon Bells sunrise hike" not "your next adventure"), and
**punchy**. Sentences favour fragments and parallel structure.

### Voice and tone
- **Second person, plural ambient.** "Plan with your crew." "Travel
  intentionally." Rarely "I". Frequent "we" when ACTZ is the actor.
- **Confident, not corporate.** "Built for action seekers. Powered by
  active providers." reads as a manifesto, not a deck. Avoid
  consultant-isms ("solutions", "leveraging", "robust").
- **Specific nouns.** "Polls", "crews", "outfit", "guide", "lodging plus
  tour plus dinner sold as one offer". Every benefit grounded in a
  concrete thing the product does.
- **Lower-case starts inside fragments.** Common in marketing copy —
  "ACTZ replaces the 47-message group chat." reads conversational.
- **No emoji as UI.** Emoji forbidden in production interfaces (see
  Anti-patterns in MASTER.md). Brand uses Lucide icons.

### Casing
- **Headlines:** Sentence case, not Title Case. "Travel on your terms."
- **Buttons:** Title Case. "App Store", "Get the App", "Reserve your slice".
- **Eyebrows / kickers:** UPPER CASE with 0.2em tracking.
- **Brand mark:** Always **ACTZ** in caps, never lowercase. The
  Ethnocentric-set logotype is the only exception (handled by the file).
- **Numbers:** tabular-nums on stats. "50K+", "98%", "<2s".

### Diction patterns to copy
- Numbered absolutes for credibility: *"$0 subscription · ever"*,
  *"0% markups · ever"*, *"<2s itinerary draft"*.
- "Real X, not stale Y" hook: *"Live availability, not stale lists."*
- "Replaces the X" reframe: *"replaces the 47-message group chat"*.
- Doubled subjects: *"Verified providers only."*, *"Local first, low-impact
  by default."*
- The Colorado word does heavy lifting — used as both place and brand
  signifier. Don't substitute "Rocky Mountains" or "the US".

### Concrete examples from the codebase
> Built for action seekers. Powered by active providers.
> *— Hero headline (`HERO.headlineTop`/`headlineBottom`)*

> A direct-to-traveler activity platform for discovery, community, and
> adventure. AI-curated itineraries, live inventory, and a crew that
> travels with intention.
> *— Hero sub*

> ACTZ replaces the 47-message group chat.
> *— Traveler benefit*

> Other social media apps treat music as just another piece of content;
> JoyJam treats it as an experience.
> *— Pattern reused from the JoyJam template ACTZ is built on. Worth noting
> the marketing site borrowed structure from the JoyJam Webflow audit; see
> `landing-page/JOYJAM_AUDIT.md` in the source repo.*

### What ACTZ never sounds like
- ❌ "Discover unforgettable experiences tailored to you." (generic)
- ❌ "Our AI leverages cutting-edge ML to surface the perfect activity." (corporate)
- ❌ "🏔️ Adventure awaits! ✨" (emoji-led)
- ✅ "Sunrise hike, locked in. Crew of six. Glenwood Springs, Saturday." (specific, present-tense)

---

## Visual foundations

### Palette
ACTZ uses the **literal Colorado state flag** as its brand palette:
PMS 287 Navy, PMS 200 Red, PMS 116 Gold. The marketing site darkens this
into a navy-deep canvas (`hsl(215 60% 5%)`) and uses the three flag colors
as accent only — red is the CTA, blue is the companion, gold is the
highlight. There is **no purple**, **no teal**, **no green** in brand
chrome (those colors appear inside photography, not on tokens).

| Role | HSL | Hex | Notes |
|---|---|---|---|
| `background` (navy-deep) | `215 60% 5%` | `#04080F` | Pages, full-bleed surfaces |
| `card` (navy-soft) | `215 45% 14%` | `#141E2E` | Elevated cards, modals |
| `primary` (CO red) | `348 85% 47%` | `#DE124E` | Primary CTAs, favorite/heart |
| `secondary` (CO blue) | `215 95% 58%` | `#2D7AF5` | Companion accent, info |
| `accent` (CO gold) | `48 95% 55%` | `#F1C923` | Highlights, ratings, indicator bar |
| `foreground` (off-white) | `210 30% 96%` | `#F0F3F8` | Body text on dark |
| `muted-foreground` | `215 18% 70%` | `#A2ADBD` | Captions, meta |
| `border` (stroke) | `215 30% 22%` | `#2B3A4F` | Hairlines, dividers |
| `destructive` | `0 72% 51%` | `#DB3535` | Errors only |

Gradients (used sparingly, on hero accent words and feature halos):
- **Brand gradient** — primary-light → primary → secondary (red → blue, diagonal)
- **Flag gradient** — blue → red → gold horizontally (used on the wordmark only)

### Typography
- **Manrope** (300–800) is the universal UI face. Loaded from Google Fonts
  in this skill; loaded via `@fontsource/manrope` in the source repo.
- **Ethnocentric** is the brand-display face used **only** for the ACTZ
  wordmark and the largest hero word-marks. Geometric, technical,
  un-trendy. The TTF files live in `fonts/`.
- **Inter** is a fallback (the original MASTER.md specified Playfair +
  Inter; the codebase migrated to Manrope everywhere — Manrope is the
  source of truth).

The type scale is rem-based and rides on a fluid html font-size
(`clamp(13px, 1.05vw, 19.2px)`) so the entire scale shrinks and grows
with the viewport. Display: 9.72rem. H1: 6rem. Body: 1.1rem.
Letter-spacing tightens as size grows (`-0.035em` on display, `0` on body).

### Backgrounds
- **Default background** is a flat `#04080F` navy-deep — *not* a
  gradient. Resist the urge to add radial gradients to every screen.
- **Hero / featured sections** add a soft radial-glow overlay
  (`.bg-radial-glow` utility): a primary-tinted blob at center, a
  secondary-tinted blob at the top-right. This is the only place
  gradients appear on backgrounds.
- **Photography is the primary visual texture.** Hero carousels,
  marketplace cards, spotlight tiles all lean on the eight reference
  photographs in `assets/imagery/` — warm, saturated, golden-hour-leaning
  outdoor scenes. Mountains, tents, kayaks, hikers in puffy jackets.
- **No noise / no grain layers** on backgrounds (the `.noise` utility
  exists in the source CSS but is rarely used).
- **No hand-drawn illustrations.** All illustrative work is photography
  or sharp Lucide vector icons. Do not introduce sketchy/sketched art.

### Corners
ACTZ corners are **generous and pill-leaning**. The default `--radius` is
`1.66rem` (~26px), and the design language often goes further:
- `--r-s`: 1.1rem (small UI: chips, inputs)
- `--r-m`: 1.66rem (standard cards) ← default
- `--r-l`: 2.2rem (hero/featured cards)
- `--r-pill`: 256rem (full pill — buttons, nav, status chips, search)

Buttons are **always pills**. Cards are **always rounded** (never square).
Avoid `border-radius: 4px` / `8px` — looks off-brand.

### Cards
A canonical ACTZ card has:
- 20–26px corner radius (depending on size)
- Solid dark fill (`hsl(var(--card))`) — never transparent unless it's
  the explicit "frosted-glass-card" variant
- 1px stroke (`hsl(var(--border))`)
- Drop shadow `0 22px 50px -15px rgba(0,0,0,0.55)` (deep, soft) — only
  on **hover** or **featured** state, not at rest
- On hover: `translateY(-2px)` and the shadow appears
- Inside the card, a full-bleed image with 4:3 aspect ratio for media
  tiles, or 1:1 for square spotlight tiles

### Shadows + glows
- **Drop shadow on dark.** Soft and deep. Only on hover/featured.
- **Inset hi-light** (`inset 0 1px 1px rgba(255,255,255,0.08)`) on every
  glass surface — this is the trick that makes glass read as glass.
- **Color glow halos** behind featured cards/buttons:
  `0 0 24px hsl(var(--primary) / 0.35), 0 0 56px hsl(var(--primary) / 0.18)`.
  Used on focus states, the marketplace card's "heart" action, the hero
  spotlight halo. Always tinted with a brand color, never neutral.

### Transparency + blur
- Glass surfaces are the brand's signature material. Three flavours:
  - `liquid-glass` — tight (4px) blur, used on the nav pill at the
    top of the marketing site. Almost imperceptible blur, mostly used
    for the gradient hairline border effect.
  - `frosted-glass-card` — 20px blur + 160% saturate, light-tinted glass
    (`hsl(210 90% 96% / 0.06)`). Used on cards floating over photography.
  - `dark-frosted-glass` — 20px blur, dark-tinted glass
    (`hsl(215 60% 6% / 0.72)`). Used on badge overlays inside marketplace
    cards and on the bottom navbar.
- All three pair with a `border: 1px solid rgba(255,255,255, 0.06–0.08)`.

### Borders
Single 1px strokes, low-contrast (`hsl(215 30% 22%)`). Never thick
borders. Never colored borders except as a focus ring (the `--ring`
token uses blue). Never inset borders (no `border-style: groove`).

### Animation
- **Easing — always cubic-bezier, never CSS `ease-out`.**
  - `--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)` — the workhorse
    (entrances, hover lifts).
  - `--ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275)` —
    slight overshoot for button hovers and "land" moments.
  - `--ease-in-out-expo: cubic-bezier(0.696, 0.001, 0.304, 0.995)` —
    page transitions, parallax scroll-tied transforms.
- **Durations:**
  - 160–240ms for state changes (hover, focus, toggle)
  - 320ms for entrances and "land" moments
  - 550–750ms for hero word-by-word reveals, flip-card overlays
- **Hero word-reveal pattern** — each word fades up with a soft blur
  (`filter: blur(12px) → blur(0px)`), opacity 0 → 1, y +14 → 0,
  staggered 160ms apart, 750ms each. The accent word in italic+gradient
  reveals on the same cadence — that's how "action" / "active" land.
- **Carousels: marquees** — infinite horizontal scroll
  (`@keyframes marquee { from translateX(0) to translateX(-50%) }`,
  duration 24–56s, linear). Pause on hover/touch. Two-row patterns with
  opposite directions for visual rhythm.
- **Scroll-tied parallax** — sections that hold their content pinned
  while inner orbits move on `useScroll` + `useTransform`. The Hero
  spans `170vh` to give itself a long scroll runway.
- **Flip-on-feature** — the marketplace spotlight cards (in the curved
  carousel) flip vertically (rotateX 90 → 0) when they hit the center
  threshold, paired with a scale 1 → 1.22 zoom. Half flip from top
  (rotateX -90 → 0), half from bottom (rotateX +90 → 0) — interleaved
  so the reveal feels random.

### Hover + press states
- **Hover lift.** Cards and buttons translate up `-1` to `-3px`. Never
  scale — scale would shift adjacent layout.
- **Hover tint.** Genre pills and chips shift toward `hsl(var(--primary)
  / 0.15)` background + `hsl(var(--primary) / 0.55)` border.
- **Press.** No explicit `:active` shrink in the source. Mobile uses
  the OS default ripple.
- **Focus.** Always visible — 2px ring of `hsl(var(--ring) / 0.7)` with
  2px offset, plus a 3px translucent ring inside on inputs. Critical:
  do not remove focus outlines on buttons.

### Layout rules
- **Sticky nav pill.** Floating pill, 8–16px from the top, centered,
  max-width 1200px. On scroll past 40px it tightens (top: 16 → 8).
  Liquid-glass material.
- **Sticky bottom CTA** in mobile detail screens (Airbnb pattern).
- **Section padding** is `var(--sp-2xl)` (5rem) on mobile, scaled ~1.4×
  on `min-width: 768px`. Apply via the `.joy-section` utility.
- **Max content width** is generally ~1200px; hero copy is constrained
  to ~24ch for headlines via `max-w-[24ch]` so wrap breaks land
  intentionally. Use `text-wrap: balance` on all headlines.
- **Z-index tiers** (from `replit.md`): z-50 nav bars, z-400 modals.

### Iconography
ACTZ uses **Lucide React** (`lucide-react@^0.453`) almost exclusively for
in-app icons — stroke-only, 1.5–2 stroke-width, monoline. The codebase
imports specific icons (`MapPin`, `Users`, `Heart`, `Flame`, `Ticket`,
`Star`, `Bookmark`, etc.) — never an entire pack. See `ICONOGRAPHY`
section below.

### Imagery treatment
- **Photography is warm and saturated.** Golden-hour sunrise/sunset
  light, vibrant outerwear (orange jackets, teal packs, red tents),
  natural Colorado wilderness. Mountains feature in almost every image.
- **People are present.** ~60% of imagery shows people in action
  (hiking, sitting around fires, kayaking) — not landscapes alone.
- **No black-and-white.** No de-saturated treatments. No duotones.
- **No grain overlay.** Photos run clean.
- **No heavy color filters.** Light warmth/saturation bump is fine;
  Instagram-style strong filters are not on-brand.
- **Crops favour wide horizons.** 16:9 / 4:3 / 1:1 — never tall
  portrait crops as hero imagery.

### Fixed elements
- Top: floating glass nav pill (always sticky, always pill-shaped).
- Bottom: mobile tab-bar (in app surface only). Pill-shaped, gold
  active-indicator on top of the active icon.
- "Scroll to explore" caption fades in at hero bottom (UPPER-case,
  0.2em tracking, opacity 0.55).

---

## Iconography

ACTZ uses **two icon systems**:

1. **Lucide React** for in-product UI — by far the most common.
   Loaded via the `lucide-react` npm package in source; can be loaded
   from the CDN (<https://unpkg.com/lucide@latest>) in throwaway HTML.
   Stroke-only, monoline, 1.5px stroke-width, 16–20px box.
   Common icons in the code:
   - Navigation: `MapPin`, `Compass`, `Map`, `Home`, `Search`, `Menu`, `X`
   - Social/engagement: `Heart`, `Bookmark`, `Star`, `MessageCircle`, `Users`
   - Activity: `Flame`, `Tent`, `TreePine`, `Snowflake`, `TrendingUp`, `Ticket`, `Camera`
   - Provider: `DollarSign`, `Megaphone`, `Database`, `Zap`, `Eye`, `Network`
   - Apps: `Apple`, `Play` (used as App Store / Google Play marks in the nav)

2. **An icons.svg sprite** for social/external brand marks only —
   `bluesky-icon`, `discord-icon`, `github-icon`, `x-icon`,
   `documentation-icon`, `social-icon`. These are filled-style, sit in
   `assets/brand/icons.svg`, and reference via `<svg><use href="..."/></svg>`.

**Substitutions in this skill.** No icons were substituted. Lucide is the
icon system the codebase already uses; load it from CDN for throwaway
HTML artifacts:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
<i data-lucide="map-pin"></i>
```

**Emoji** are explicitly forbidden as icons (see Anti-patterns in
`landing-page/design-system/.../MASTER.md`). Reach for Lucide.

**Unicode characters** appear inside copy ("·" as separator between
location and provider name; "—" em-dash in prose). Never as functional UI.

**Partner logos** live in `assets/partners/`. Each partner has both a
*mark* (icon-only thumbnail, used on mobile) and a *wordmark* (full
lockup, used on desktop). When showing partners on a logo strip, use
the wordmark with a uniform max-height of ~32px and a single grayscale
tint (`opacity: 0.6, filter: grayscale(1)`) so the strip reads as a
horizon, not a competing rainbow.

---

## Substitutions + caveats

- **No specific font substitution required** — Manrope (Google Fonts)
  and Ethnocentric (TTF bundled) are both present.
- **Inter** is referenced in the original MASTER.md but not used in the
  current codebase. Treated as a fallback only.
- **Several partner logos** were not imported (Google, Microsoft, Stripe,
  Supabase, FareHarbor, RIDB, Ticketmaster). Pull them from the source
  repo's `landing-page/public/partners/` if you need a complete partner
  strip. The ones bundled here are Amadeus, Apple, Cloudflare, Colorado.
- **Spotlight portraits** (`/spotlight/woman-hiker.webp`,
  `/spotlight/male-explorer.webp`, `/spotlight/photographer.webp`)
  are referenced in the codebase but were not present in the public
  folder — they are AI-generated placeholders that the team is producing
  separately. Use the hero photographs (`assets/imagery/hero-XX.webp`)
  as substitute spotlight imagery.
- **Map pin imagery** (`/map/pin-red.webp` etc.) was not imported —
  use Lucide's `MapPin` icon tinted with brand colors instead.

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<body>
  <header class="liquid-glass" style="padding: 0.6rem 1rem; border-radius: 999px;">…</header>
  <h1 class="h1">Built for <span class="gradient-text-primary" style="font-style: italic">action</span> seekers.</h1>
  <button class="btn btn-hero">Get the App</button>
</body>
```

See `preview/*.html` for live examples of each token cluster and
`ui_kits/*/index.html` for full screen recreations.
