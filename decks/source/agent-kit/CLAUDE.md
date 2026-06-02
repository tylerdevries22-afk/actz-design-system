# CLAUDE.md — operating context for the ACTZ deck agent

Produce `deck/ACTZ_Georgetown_Pitch.html` (+ a Figma build) with real ACTZ UI snippets, autonomously.

## Project facts
- ACTZ = regenerative-tourism platform; Capacitor app = the React web app in a native shell (mobile viewport in
  Puppeteer ≈ app UI). Look/spec: `pitch/DECK_BUILD_PROMPT.md`. Narrative: `pitch/PITCH_SCRIPT.md`. Decisions: `DECISIONS.md`.
- **Arc = business-as-hero** (Toolkit is the centerpiece, Slide 4). Protagonist: Subaru family + 6th-St bakery.
- **Posture = honest Live-vs-Roadmap, aspirational.** Roadmap features are always labeled, never shown as Live.
- **Tiers shown WITH prices:** Trailhead $2,287 / **Summit $6,887** (close, highlighted) / Destination Partner $15,987.

## Capture
- Suites in `capture/targets.json`: `homepage, intercept, toolkit, proof`. Snippets <=8s, muted loops.
- `capturable:false` = Roadmap → skip + describe (geo-push targeting, native events/ticketing/waivers, attendee CRM, Tier-3 real-time).
- Selectors are placeholders — verify against live DOM, prefer data-testid; fix-and-rerun a suite, don't abort.
- Clip -> slide map: `home-hero`->S1/2 · `hub-landing`/`ai-trip-builder`/`rails-scroll`->S3 · `provider-*`->S4 · `town-dashboard`->S5.

## Hard rules
- NEVER commit/print `.env` or `.auth.json`. Stripe must be TEST mode; never record real PII/cards.
- If a route/screen doesn't exist, SKIP + note it. Don't fabricate a screen as real.
- Keep the HTML deck self-contained (base64-inline clips < ~4MB). Figma is secondary — log any approval blocker and continue.

## Commands
`npm i` · `node capture/record-web.mjs` · `bash capture/record-native.sh auto` · `bash capture/post.sh ./raw ./clips`
