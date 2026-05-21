---
name: actz-design
description: Use this skill to generate well-branded interfaces and assets for ACTZ — a Colorado-rooted activity & adventure-travel marketplace — for production or throwaway prototypes, mocks, slides, and decks. Contains essential design guidelines, the Colorado-flag color palette, Manrope + Ethnocentric typography, logos, hero photography, and high-fidelity UI kit components for the marketing landing page and the iOS-style traveler app.
user-invocable: true
---

Read the `README.md` file within this skill first — it contains the
brand context, content-fundamentals (voice/tone/casing), visual
foundations (color, type, motion, glass, layout rules), iconography
notes, and an index of the other files available.

Other files to explore:
- `colors_and_type.css` — CSS variables for the Colorado-flag palette,
  semantic tokens, Manrope + Ethnocentric type, spacing, radii,
  shadows, easings, glass tokens.
- `components.css` — buttons, glass surfaces, marketplace card, mobile
  tabbar, search bar, badges.
- `fonts/Ethnocentric-Regular.ttf` + `Ethnocentric-Italic.ttf` — brand
  display face. Manrope loads from Google Fonts at the top of
  `colors_and_type.css`.
- `assets/brand/` — ACTZ logo lockups (mono triangle + Colorado-flag
  color wordmark), favicon, social icon sprite.
- `assets/imagery/hero-01.webp` … `hero-08.webp` — eight
  warm-saturated outdoor adventure photographs. Use as full-bleed hero
  imagery or inside cards.
- `assets/partners/` — Apple, Amadeus, Cloudflare, Colorado wordmarks
  for partner strips.
- `ui_kits/marketing/index.html` — static-HTML recreation of the
  cinematic marketing landing page. Lift sections.
- `ui_kits/app/index.html` + `*.jsx` — React recreation of the
  traveler iOS app: Marketplace, Map, Trip itinerary, ACTZ AI
  concierge.

## Working modes

**If creating visual artifacts** (slides, mocks, throwaway prototypes,
landing pages, screenshots, decks): copy `colors_and_type.css` and
`components.css` into your output folder, copy whatever assets you
need from `assets/`, then write static HTML or React. Link the CSS
files. Use Lucide via CDN
(`<script src="https://unpkg.com/lucide@latest"></script>`) for icons.

**If working on production code**: read the rules in `README.md` and
import the tokens into the source repo's `client/src/index.css` or
`landing-page/src/index.css`. The codebase already mirrors most of
these tokens; this skill is the canonical statement of intent.

## When invoked with no other guidance

Ask the user **what they want to build or design** — a slide deck, a
marketing page section, a new app screen, a sales sheet, a poster?
Ask follow-ups about audience, length, fidelity. Then act as an
expert ACTZ designer who outputs HTML artifacts or production code,
respecting the brand's content-fundamentals (voice, casing, no emoji
as UI) and visual-foundations (Colorado-flag palette only, generous
pill corners, Manrope, frosted-glass surfaces, warm outdoor photography
as primary texture).

## Hard rules

- **Never invent new colors.** Use only the tokens in `colors_and_type.css`.
- **No emoji as UI** — Lucide icons only.
- **Never draw illustrations.** Use photography from `assets/imagery/`
  or ask the user for assets.
- **Use cubic-bezier easings**, never raw `ease-out`. The four
  branded easings are in `:root` of `colors_and_type.css`.
- **Always pill buttons.** Never `border-radius: 4px / 8px` on
  primary controls.
- **Headlines in sentence case**, not Title Case. Buttons in Title Case.
- **Brand mark in caps**: ACTZ. Use the Ethnocentric face for the
  wordmark via `font-family: var(--font-brand)`.

## Common composition

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="components.css">
<header class="liquid-glass" style="padding: 8px 16px; border-radius: 999px;">
  <span style="font: 400 18px/1 var(--font-brand); letter-spacing: 0.04em;">ACTZ</span>
</header>
<h1 class="h1">
  Built for <em class="gradient-text-primary">action</em> seekers.
</h1>
<button class="btn btn-hero">Get the App</button>
```

That's the brand at its baseline. Everything else builds from there.
