# AGENT_PROMPT — paste this into Claude Code (from this folder)

> Save this folder, `cd` in, `cp .env.example .env` (fill it), then run `claude` and paste the block.
> Headless: `REPO_PATH=/path/to/actz-may claude -p "$(cat AGENT_PROMPT.md)"`.

---

```
You are an autonomous build agent. Work end-to-end WITHOUT asking me questions. On ambiguity, choose the
documented default, log the assumption in REPORT.md, and keep going until deck/ACTZ_Georgetown_Pitch.html exists.

READ FIRST (this folder): DECISIONS.md, PRD.md, CLAUDE.md, phases/RUNBOOK.md, pitch/PITCH_SCRIPT.md,
pitch/DECK_BUILD_PROMPT.md, capture/targets.json.

CONTEXT: ACTZ is a regenerative-tourism platform; the Capacitor app is the React web app in a native shell.
Deliverable: a 10-slide Georgetown founding-partner deck (HTML + Figma), business-as-hero arc, on the live ACTZ
brand, with short (<=8s, muted, looping) real UI snippets embedded. Narrative = pitch/PITCH_SCRIPT.md.
Posture = honest Live-vs-Roadmap, aspirational. Prices ARE shown (Trailhead $2,287 / Summit $6,887 / Dest. Partner $15,987).

PHASES (detail in phases/RUNBOOK.md):
0. PREFLIGHT: `cp .env.example .env` if missing; `npm i`; ensure ffmpeg. Locate actz-may via $REPO_PATH or common paths. Stripe TEST mode.
1. TARGET (auto): dev server (5173/3000/8100/4173) -> local build -> https://actz.org. Start `npm run dev` if repo present and none up.
2. CAPTURE (Puppeteer, web+mobile): `node capture/record-web.mjs`. It reads login config from .env, caches .auth.json,
   then records every capturable snippet in capture/targets.json across suites: homepage, intercept, toolkit, proof.
   Roadmap snippets (capturable:false) are SKIPPED — describe, never fake. If a route/selector is wrong, inspect the
   live DOM (prefer data-testid), fix targets.json, re-run that suite. One failure must not abort the run.
3. CAPTURE (one native pass): `bash capture/record-native.sh auto` if Xcode/Android SDK present; else skip + log.
4. POST: `bash capture/post.sh ./raw ./clips` -> short mp4+webm+poster per snippet.
5. BUILD HTML: START FROM deck/REFERENCE_ACTZ_Georgetown_Pitch.html (the premium, finished visual target).
   Replicate its layout/type/spacing EXACTLY. Replace each element with [data-clip="NAME"] by embedding the matching
   clip (clips/NAME.{webm,mp4}) as <video autoplay muted loop playsinline poster=...>; base64-inline clips <4MB so the
   deck is one file. Keep copy/prices/arc as-is unless a clip reveals a needed tweak. Save as deck/ACTZ_Georgetown_Pitch.html.
   Clip map: home-hero->S1/10 bg; hub-landing/ai-trip-builder->S3; provider-*->S4 (centerpiece); town-dashboard->S5.
6. BUILD FIGMA: via Figma MCP create the file in my team, 10 frames to the same spec, clips as video fills.
   If the approval gate or missing library blocks it, LOG the blocker and continue. HTML is the primary artifact.
7. QA + REPORT: HTML opens offline, clips loop; no .env/.auth.json committed; no real card data; Roadmap labeled.
   Write REPORT.md (target used, clips made, suites captured, slides built, Figma status, skips + reasons). Stop.

RULES: never commit secrets; never record real PII/payments (Stripe TEST); if a screen doesn't exist, skip + note it,
never fabricate it as Live; snippets <=8s; report assumptions instead of pausing.
```

---

**Run unattended:** pre-approve `Bash`, `Edit`, and the Figma MCP (or `claude --dangerously-skip-permissions` in a trusted sandbox).
