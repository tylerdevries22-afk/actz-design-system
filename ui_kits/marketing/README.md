# Marketing landing kit

Hi-fi recreation of the **ACTZ landing page** marketing surface
(`landing-page/` in the source repo). One static HTML file —
`index.html` — that mirrors the joyjam-inspired cinematic flow:

1. **Sticky liquid-glass nav pill** with App Store / Google Play CTAs
2. **Hero** — radial-glow background + two infinite-marquee photo carousels
   (top tilted +10°, bottom -10°) flanking the headline. Headline carries
   the brand's signature italic-gradient accent on *action* / *active*.
3. **Partner strip** — grayscale wordmarks, 0.7 opacity at rest
4. **Traveler benefits grid** — 4-up card grid, tinted icon badges
5. **Live trips rail** — horizontal scroll-snap of 4:5 portrait cards
   (Airbnb-style) with price pill + heart action over photography
6. **Value pair** — two large split cards: For Providers (blue accent)
   + For Travelers (gold accent), each with stat-block "0%" / "$0"
7. **CTA + 4-column footer**

## How to edit
- Copy/lift sections into your own pages. Each `<section>` carries
  `data-screen-label` so comments can pin to it.
- Type, color, glass, button, card classes all come from
  `colors_and_type.css` + `components.css` at the project root.
- Carousels are pure CSS `@keyframes marquee` — pause on hover.
- The italic-gradient accent on hero words is just
  `font-style: italic` + `.gradient-text-primary` (defined in
  `colors_and_type.css`).

## What's mocked / lossy
- The source uses **Motion.dev** scroll-tied parallax and per-word blur
  reveals on the hero — replaced here with a static stack so the file
  stays plain HTML you can direct-edit.
- The source has a curved 3-row carousel with overlay badges that flip
  on spotlight — replaced here with a simpler 2-row marquee.
- The "What Makes Us Different" 9-slide carousel and reviews carousel
  are not in this kit. Add them by reading
  `landing-page/src/components/WhatMakesUsDifferent.tsx` upstream.

## What's faithful
- Color tokens (Colorado palette) — exact.
- Type (Manrope) — exact.
- Pill nav, hero headline structure + accent treatment — exact.
- 4:5 trip-card layout, price-pill, gradient-bottom overlay — exact.
- Footer column structure and copy register — exact.
