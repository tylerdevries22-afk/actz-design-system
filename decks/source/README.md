# Georgetown Founding-Partner Pitch Deck — source

The deck shown in the design system at **one-pagers/georgetown-pitch-deck.html** is a
single self-contained file (clips, Ethnocentric font, and ACTZ logo are base64-inlined),
generated from the real ACTZ design system + captured app UI.

## Regenerate

From the **design-system root** (`/Users/tylerdevries/actz-design-system`):

```bash
node decks/source/build-georgetown-deck.mjs
```

This reads:
- `./colors_and_type.css` + `./components.css` + `./fonts/Ethnocentric-Regular.ttf` — the design system itself
- `decks/source/clips/*` — the 4 captured app clips (mp4 + webm + poster)
- `decks/source/ACTZ_logo.png` — brand logo

…and writes `one-pagers/georgetown-pitch-deck.html` (with a built-in ⤓ PPTX download button
that points at the sibling `one-pagers/ACTZ_Georgetown_Pitch.pptx`).

## What's in here (full Georgetown-pitch archive)

| Path | What |
|---|---|
| `build-georgetown-deck.mjs` | the generator (uses the design system's own CSS/fonts) |
| `ACTZ_logo.png` | brand logo used on cover + close |
| `clips/` | **deck-ready videos** — `home-hero`, `hub-landing`, `ai-trip-builder`, `rails-scroll`, each `.mp4` + `.webm` + `.poster.jpg` (≤8 s, what the deck embeds) |
| `raw/` | **original screen recordings** (`*.webm`) + full-page stills (`*.png`) straight from the capture, before ffmpeg post-processing |
| `docs/` | pitch narrative + specs + run report — `PITCH_SCRIPT.md`, `DECK_BUILD_PROMPT.md`, `PRD.md`, `DECISIONS.md`, `REPORT.md` |
| `reference/` | `REFERENCE_ACTZ_Georgetown_Pitch.html` (the premium visual target) + `ACTZ_Georgetown_Pitch.reference-replica.html` (the earlier slot-replica build) |

Also alongside in the repo:
- `../../one-pagers/georgetown-pitch-deck.html` — the live, self-contained deck (videos base64-inlined)
- `../../one-pagers/ACTZ_Georgetown_Pitch.pptx` — PowerPoint export (playable clips)
- `../../one-pagers/georgetown.html` — the standalone Georgetown one-pager

## Content notes (honesty)

- Cover/close, intercept, and Hub clips are **real recordings** from the shipped app (actz.org).
- The **provider dashboard** (slide 4) and **town dashboard** (slide 5) are **recreated from the
  real ACTZ components** (provider offerings, `KpiCard`, `VisitorIntelSection`) using the
  Georgetown demo / representative figures — they are labeled as such, and contain **no live
  card data**. Roadmap features are labeled Roadmap, never shown as Live.

## Original build workspace

The first build + capture pipeline (Puppeteer recorder, ffmpeg post, Figma build, REPORT.md)
lives at `~/Desktop/files/actz-deck-agent/`. The Figma version:
https://www.figma.com/design/zX0dcdfoQ7BzJy9oAWAlYb
