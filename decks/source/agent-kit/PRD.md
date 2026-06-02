# PRD — Autonomous ACTZ Georgetown Pitch-Deck Agent

## 1. Objective
A Claude Code agent, run from one pasted prompt, that autonomously captures the ACTZ app UI (Puppeteer web +
mobile-viewport + one native pass), then assembles the **business-as-hero** Georgetown pitch deck in **HTML + Figma**,
running unattended until the deck exists.

## 2. Resources (this folder)
`AGENT_PROMPT.md` (paste-in) · `DECISIONS.md` (audit resolutions) · `CLAUDE.md` (context+rules) ·
`phases/RUNBOOK.md` · `pitch/PITCH_SCRIPT.md` (narrative, source of truth) · `pitch/DECK_BUILD_PROMPT.md` (design+slides) ·
`capture/` (Puppeteer recorder, native pass, targets, ffmpeg) · `.env` (test creds + login config).

## 3. Scope (locked, aligned to walkthrough — see DECISIONS.md)
- **Capture:** Puppeteer web + mobile viewport + **one native Capacitor pass**.
- **Target:** auto-detect — dev server -> local build -> actz.org.
- **Suites:** `homepage, intercept, toolkit, proof`. Roadmap beats are skipped + described.
- **Narrative:** business-as-hero; protagonist = Main-St business (Subaru family + 6th-St bakery).
- **Posture:** honest Live-vs-Roadmap, aspirational.
- **Tiers:** shown WITH prices — Trailhead $2,287 / **Summit $6,887** (close) / Destination Partner $15,987.
- **Auth:** .env login config + DOM self-correction + public fallback.
- **Output:** self-contained HTML deck (primary) + Figma build (secondary; log blocker, don't stall).

## 4. Functional requirements
1. Auto-detect target; never block on a URL. 2. Authenticate via .env config; degrade to public capture if it fails.
3. Capture every capturable snippet; one failure must not abort. 4. Normalize to `clips/*` <=8s.
5. Build HTML per DECK_BUILD_PROMPT §4–§5; embed clips. 6. Build Figma frames + video fills; log any blocker.
7. Write `REPORT.md`.

## 5. Guardrails
- Autonomy: proceed on defaults, log assumptions, don't pause. - Safety: no real PII/payments (Stripe TEST); never commit `.env`/`.auth.json`.
- Honesty: skip + label missing screens; never show Roadmap as Live. - Idempotent: reuse session, overwrite clips cleanly.

## 6. Definition of done
- [ ] `clips/` has homepage + intercept + toolkit + proof snippets (or logged reason).
- [ ] `deck/ACTZ_Georgetown_Pitch.html` opens offline, 10 slides (business-hero), real brand, prices shown, clips loop.
- [ ] Figma file created (or blocker logged). - [ ] `REPORT.md` written. - [ ] No secrets on disk; no real card data.

## 7. Out of scope
App-store submission, real bookings, production data, paid Maestro Cloud.

## 8. Conflict resolutions
See `DECISIONS.md` — five audit conflicts resolved by aligning all files to `pitch/PITCH_SCRIPT.md`
(from the repo's `georgetown-walkthrough-script.md`) as the single source of truth.
