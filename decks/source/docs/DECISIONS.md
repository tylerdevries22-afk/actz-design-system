# Audit Resolutions — 2026-06 (cohesion pass)

The plan had drift between the newer `pitch/PITCH_SCRIPT.md` (from the repo's
`georgetown-walkthrough-script.md`) and the older `pitch/DECK_BUILD_PROMPT.md`.
**Source of truth = the walkthrough doc.** All files were aligned to it.

| # | Conflict | Resolution |
|---|---|---|
| 1 | Tier names + pricing | **Canonical tiers WITH prices:** Trailhead $2,287 · **Summit $6,887** (highlighted) · Destination Partner $15,987. Dropped Spotlight/Activate/Transform + "no hard prices." |
| 2 | Protagonist / slide arc | **Business-as-hero arc.** Deck reordered: Cover → Traffic → Intercept → **Toolkit ⭐** → Proof → Honest state → Tiers → Ask → Grants → Close. |
| 3 | Build posture | **Honest Live-vs-Roadmap + aspirational** (replaces "conservative ≤90-day only"). Roadmap features always labeled. |
| 4 | Figma autonomy | Agent **attempts Figma + HTML; HTML is the primary artifact**; if the Figma approval gate blocks, it logs the blocker and continues (no stall). |
| 5 | Capture auth | **Best-effort self-correct + pin-able config.** Real login URL/creds/selectors are env-overridable in `.env`; if unset/wrong, agent inspects the DOM, fixes `targets.json`, and falls back to public capture + logs gaps. |

**Naming sync applied everywhere:** capture suites are `homepage / intercept / toolkit / proof`
(old `traveler / town_provider` removed). Clip names unified to `home-hero, hub-landing,
ai-trip-builder, rails-scroll, provider-getbooked, provider-stripe, provider-notify, town-dashboard`.
