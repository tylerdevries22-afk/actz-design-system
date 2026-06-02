# RUNBOOK — phase-by-phase

## Phase 0 — Preflight
- `cp .env.example .env` if missing; fill creds + login config (or accept public-only). `npm i`. Ensure ffmpeg + Node>=18.
- Locate `actz-may` via `$REPO_PATH` or common paths. Confirm Stripe TEST mode.

## Phase 1 — Target detection (auto)
- Probe dev servers 5173/3000/8100/4173; if repo present and none up, start `npm run dev` in background.
- Else serve a local build; else fall back to `https://actz.org`. Log the chosen target.

## Phase 2 — Web + mobile capture (Puppeteer)
- `node capture/record-web.mjs`. Logs in via .env config (caches `.auth.json`).
- Captures suites `homepage, intercept, toolkit, proof` at the viewports in targets.json.
- Each capturable snippet: screenshot + `page.screencast()` (Puppeteer>=22.6 + ffmpeg) for <=8s while running its actions.
- `capturable:false` snippets are skipped (Roadmap — describe in the deck, don't record).
- Wrong selectors -> inspect DOM, update targets.json (data-testid), re-run only that suite.

## Phase 3 — One native pass
- `bash capture/record-native.sh auto` (iOS sim on macOS+Xcode w/ Metal, else Android emulator). Maestro flow drives+records; simctl/adb fallback. Skip+log if no SDK.

## Phase 4 — Post-process
- `bash capture/post.sh ./raw ./clips` -> `clips/<name>.{mp4,webm,poster.jpg}`, each <=8s.

## Phase 5 — Build HTML deck
- Generate `deck/ACTZ_Georgetown_Pitch.html` per `pitch/DECK_BUILD_PROMPT.md` §4 (business-hero 10-slide arc),
  real tokens + Manrope/Ethnocentric, canonical tier prices, honest Live/Roadmap. Embed clips per §5; base64-inline <4MB.

## Phase 6 — Build Figma
- Figma MCP: create file in the user's team, 10 frames to spec, clips as video fills. If approval/library blocks it, log + continue. HTML is primary.

## Phase 7 — QA + report
- HTML opens offline; clips loop; Roadmap labeled; no secrets committed; no real card data. Write `REPORT.md`. Stop.
