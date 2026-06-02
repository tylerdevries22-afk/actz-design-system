# REPORT — Autonomous ACTZ Georgetown Pitch-Deck Agent

_Run date: 2026-06-02 · agent: Claude Code (autonomous, no-questions mode)_

This file is written incrementally during the run. Assumptions/decisions are logged
as they are made (per the "log the assumption and continue" directive). Final summary
is at the bottom.

---

## Assumptions & decisions log

| # | Phase | Decision / assumption | Why |
|---|---|---|---|
| A1 | 0 | Project files lived inside `actz-deck-agent.zip`; extracted it in place and ran from `actz-deck-agent/`. | The named files (PRD.md, RUNBOOK.md, etc.) did not exist at the bare `files/` paths; they were inside the kit zip. |
| A2 | 0 | `.env` created from `.env.example` (placeholder creds `demo@actz.org` / `changeme`). | No real test creds supplied; documented default is to copy the example and accept public-only capture if login fails. |
| A3 | 0 | **SAFETY:** actz-may `.env` holds **LIVE** Stripe keys (`sk_live_`/`pk_live_`, 3 live-key lines). Did **not** boot the repo's consumer dev server, and did **not** capture `provider-stripe`. | Hard rule: "Stripe must be TEST mode; never record live payments." Booting `npm run dev` would activate live keys in the running app. |
| A4 | 1 | Auto-detect found a dev server on **:5173, but it is the `admin-portal` app** (`<title>Admin Portal</title>`). Its 200s on `/town/georgetown` and `/provider` are SPA history-fallback shells, not real consumer screens. | Capturing the admin portal as if it were the consumer Hub would be fabricating screens — violates the honesty rule. |
| A5 | 1 | **Chosen target = `https://actz.org`** (live consumer app; `/`, `/town/georgetown`, `/town-dashboard/georgetown` all return 200 with a working backend). Set `BASE_URL=https://actz.org` in `.env`. | It is the real ACTZ consumer app and the documented fallback in the target chain (dev→build→actz.org); it renders correct public content client-side. |
| A6 | 2 | Auth suites (`toolkit`, `proof`) expected to be **skipped** (placeholder creds will fail login on the live site). `provider-stripe` + `town-dashboard` slots therefore stay as labeled placeholders in the deck — described, never faked. | requiresAuth:true suites are skipped when no session; honest Live/Roadmap posture keeps un-captured screens labeled, not invented. |

| A7 | 2 | **Chrome fix:** Puppeteer's bundled Chrome-for-Testing failed to spawn (`errno -88`, Gatekeeper/quarantine on freshly-extracted binary). Pointed the recorder at system **Google Chrome** via `PUPPETEER_EXECUTABLE_PATH` (added `executablePath` to `puppeteer.launch`). | Without a working browser there is no capture; system Chrome launches and renders actz.org (title "ACTZ"). |
| A8 | 2 | **Mobile screencast unrecoverable:** `page.screencast()` wrote 0-byte webm at every sub-desktop viewport (390×844, 412×892, 768×1024 — emulate and plain setViewport alike); desktop 1440×900 records fine. Captured `hub-landing` + `ai-trip-builder` on **desktop** instead; deck frames them with `object-fit:cover`. | Chrome/Puppeteer screencast limitation in this environment; desktop captures are real consumer screens, just wider aspect. Full mobile PNG screenshots also retained. |
| A9 | 2 | **targets.json self-corrected:** live `/town/georgetown` DOM has no `#town-ai-builder`/`#chat-input`; the real control is a button reading **"Plan my georgetown trip"** (clicked by text). Updated the intercept suite (selectors + viewport) in `capture/targets.json`. | Runbook: inspect live DOM, prefer testids, fix targets.json, re-run that suite. (No matching data-testid exists, so text-click was used.) |
| A10 | 2 | Auth suites `toolkit` + `proof` **skipped** (placeholder creds → login selector `#email` not found on live site → no session). `provider-getbooked/stripe/notify` and `town-dashboard` not captured. | requiresAuth suites skip without a session; this also keeps the run clear of the live-Stripe payment screen. Slots stay as labeled placeholders. |
| A11 | 3 | **Native Capacitor pass skipped + logged.** iOS sims + Metal exist, but repo has no `node_modules`/`@capacitor/cli`, Maestro absent, a full `npm run build` is slow/uncertain, and booting the app would activate the repo's **live Stripe keys**. | Native pass is explicitly secondary ("one pass, else skip+log"); CLAUDE.md says mobile-viewport web ≈ app UI, already captured. Safety + reliability first. |

| A12 | 5 | Built the deck by **copying the reference and surgically swapping the 5 `[data-clip]` slots** (vs. hand-rewriting 170 KB). | Guarantees byte-exact replication of layout/type/spacing/copy/prices/arc; only the slots change. |
| A13 | 5 | **Honest relabeling:** `provider-stripe` + `town-dashboard` slots had no capture (auth-gated). Their reference captions said "live capture (Stripe TEST)" — rewrote them to "**Live feature — not captured this run (auth-gated); Stripe kept out of LIVE mode; no payment screen recorded**". | Hard rule: never present an un-captured screen as if recorded; these stay labeled placeholders, not faked. They remain labeled **Live features**, and Roadmap chips on the same slides stay Roadmap. |
| A14 | 5 | Bonus clips `ai-trip-builder` + `rails-scroll` captured but **not placed** (reference has no matching `[data-clip]` slot). Kept in `clips/` for reuse. | Instruction is to replace slots by name; only `home-hero`/`hub-landing` had matching named slots among the captured set. |
| A15 | 6 | **Figma full build blocked + logged.** Blank file created in the team, but the mandatory `/figma-use` skill (and `/figma-create-new-file`) are **not available in this environment**, so the governed code-to-design flow that places 10 frames + video fills cannot run correctly. | Directive: attempt Figma; if a gate/missing dependency blocks it, log and continue — HTML is the primary artifact (complete). |

---

## Session 2 — premium rebuild, real components, launch + PPTX (follow-up)

User feedback: "screen recordings aren't showing", make it premium, use **real actz-may UI
components**, and launch on localhost or as PowerPoint. Actions:

| # | What | Detail |
|---|---|---|
| B1 | **Root-caused "recordings not showing"** | Videos were playing fine (`readyState 4`), but the two `home-hero` clips sat at 0.12–0.16 opacity (faint bg) and `hub-landing` rendered tiny — only one small clip was really visible. |
| B2 | **Rebuilt the deck premium** (`build-premium-deck.mjs`) | From-scratch, self-contained **13 MB** deck inlining the **real ACTZ design system** (`actz-design-system/colors_and_type.css` + `components.css`), **Ethnocentric** brand font (base64), and the **ACTZ logo**. All **4 clips now prominent**: full-bleed cinematic cover/close (`home-hero`), a phone-framed `hub-landing`, plus `ai-trip-builder` + `rails-scroll` framed on the intercept slide. Flag-gradient rail, ambient glows, glass cards, gradient headlines. |
| B3 | **Real actz-may components recreated** | S4 = the **provider dashboard** rebuilt from real components + the **Provider Demo seed data** (Summit Seekers Adventures; Georgetown Loop Railroad $49, Lebanon Silver Mine $39, Mt Bierstadt $189, Guanella Pass $79; Stripe payouts $18,420 / 0% revenue share; notify composer). S5 = the **Town Dashboard** rebuilt from `KpiCard` + `VisitorIntelSection` (Visitors 18,432 · 1.8 nights · $2.4M spend · $214,900 revenue; origin + length-of-stay bars). Both clearly labeled "real ACTZ components · representative/demo data — no live card data". |
| B4 | **Launched on localhost** | `python3 -m http.server 8099` (background) → opened **http://localhost:8099/deck/ACTZ_Georgetown_Pitch.html** in the default browser; clips autoplay reliably over http. |
| B5 | **PowerPoint export** | `deck/ACTZ_Georgetown_Pitch.pptx` (7 MB) via pptxgenjs — 10 full-bleed 1080p slide images + an appendix slide with the **4 real clips embedded as playable video** in PowerPoint. |
| B6 | **Figma populated + polished** | The 10 frames now carry the **real captured stills as image fills** (cover, hub phone, close) and **recreated provider + town dashboards** from real components, with honest captions. File: https://www.figma.com/design/zX0dcdfoQ7BzJy9oAWAlYb |

**Safety held throughout:** still no live Stripe (the provider card shows demo payout totals, never card data), no real PII, no secrets in any artifact (`sk_live_/pk_live_` sweep = 0), nothing committed. The prior reference-replica is preserved at `deck/ACTZ_Georgetown_Pitch.reference-replica.html`.

---

## Final summary (session 1)

**Primary artifact — DONE:** `deck/ACTZ_Georgetown_Pitch.html` — a single self-contained 7.9 MB
file, 10 slides, business-as-hero arc, real ACTZ brand, canonical tier prices (Trailhead
$2,287 / **Summit $6,887** / Destination Partner $15,987). Verified offline (`file://`):
10 slides, 0 console errors, 3 embedded clips all `loop+muted+autoplay+playsinline`,
`readyState 4`, playing.

### Target used
`https://actz.org` (live consumer app; title "ACTZ"). Auto-detected dev server on `:5173`
was the **admin-portal** (wrong app), and the repo's own consumer server was not booted
because its `.env` carries **live Stripe keys** (see A3–A5).

### Clips made (`clips/` — mp4 + webm + poster each, all ≤8 s, all < 4 MB)
| Clip | Source route | State | In deck |
|---|---|---|---|
| `home-hero` | `/` | Live | ✅ Slides 1 (cover bg) + 10 (close bg) |
| `hub-landing` | `/town/georgetown` | Live | ✅ Slide 3 (intercept) |
| `ai-trip-builder` | `/town/georgetown` ("Plan my georgetown trip") | Live | captured, not placed (no matching slot) |
| `rails-scroll` | `/town/georgetown` | Live | captured, not placed (no matching slot) |

### Suites captured
- `homepage` ✅ (home-hero)
- `intercept` ✅ (hub-landing, ai-trip-builder, rails-scroll; `geo-push-mock` = Roadmap, skipped/described)
- `toolkit` ⏭️ skipped — requiresAuth, no session (placeholder creds). `provider-stripe` also avoided per live-Stripe guardrail. Roadmap beats (events/ticketing/CRM) described, never recorded.
- `proof` ⏭️ skipped — requiresAuth, no session. `realtime-journey` = Roadmap, described.

### Slides built
10/10, business-hero order preserved from the reference: Cover → Problem(§0) → Intercept(§1)
→ **Toolkit ⭐(§2)** → Proof(§3) → Honest build state(§4) → Town Tier system → Ask(§5) →
Grants → Close. Live/Roadmap chips intact; uncaptured slots honestly labeled (A13).

### Figma status
Blank file **created** in "Tyler DeVries's team":
`https://www.figma.com/design/zX0dcdfoQ7BzJy9oAWAlYb`.
Full 10-frame + video-fill population **blocked** — the mandatory `/figma-use` skill is not
available in this environment (A15). HTML remains the primary, complete artifact.

### Native pass
**Skipped + logged** (A11): repo has no `node_modules`/`@capacitor/cli`, Maestro absent,
and booting the app would activate live Stripe keys. Web mobile-viewport captures stand in
per CLAUDE.md ("mobile viewport ≈ app UI").

### Safety / QA confirmation
- ✅ HTML opens offline; all clips loop.
- ✅ Roadmap features labeled as Roadmap; no Roadmap feature shown as Live.
- ✅ Uncaptured Live screens labeled "not captured this run", not faked.
- ✅ Secret scan of the deck = 0 (no `sk_live_`/`pk_live_`/`sk_test_`/passwords/keys).
- ✅ No `.auth.json` written (login intentionally not completed). `.env`/`.auth.json` are gitignored; this folder is **not a git repo**, so nothing was committed.
- ✅ No real PII or live card data in any frame; Stripe never driven (kept out of LIVE mode).

### Things skipped + why (recap)
1. Local consumer dev server boot — **live Stripe keys** in repo `.env` (A3).
2. Auth-gated `toolkit`/`proof` capture — placeholder creds, no session (A10).
3. `provider-stripe` recording — auth + live-Stripe guardrail (A3/A10).
4. Native Capacitor pass — tooling/safety (A11).
5. Figma frame population — missing `/figma-use` skill (A15).

### To complete later (optional)
- Add real test creds + a TEST-mode Stripe env to `.env` → re-run `SUITE=toolkit` and
  `SUITE=proof` to fill the `provider-stripe` + `town-dashboard` slots, then re-run `node build-deck.mjs`.
- Install the `/figma-use` skill to populate the created Figma file with 10 frames + video fills.
