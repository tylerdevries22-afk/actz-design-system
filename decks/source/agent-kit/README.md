# ACTZ Deck Agent — autonomous capture → Georgetown pitch deck

Save this folder, point a Claude Code agent at it, and it captures the real ACTZ app UI with **Puppeteer**
(+ one native Capacitor pass), then assembles the **business-as-hero** Georgetown deck in **HTML + Figma** —
running unattended until the deck exists.

## Use it
1. Unzip and `cd` in.
2. `cp .env.example .env`; add a **test** account + login config; keep Stripe in TEST mode.
3. (Optional) `export REPO_PATH=/path/to/actz-may`.
4. Run and paste:
   ```bash
   claude            # paste the block in AGENT_PROMPT.md
   # or headless:
   REPO_PATH=$REPO_PATH claude -p "$(cat AGENT_PROMPT.md)"
   ```
5. Output: `deck/ACTZ_Georgetown_Pitch.html` (primary), a Figma file, `clips/`, `REPORT.md`.

## What's inside
| Path | What |
|---|---|
| `AGENT_PROMPT.md` | the paste-into-terminal prompt |
| `DECISIONS.md` | audit resolutions (single source of truth = the walkthrough doc) |
| `PRD.md` | requirements + locked scope + done criteria |
| `CLAUDE.md` | agent context + hard rules |
| `phases/RUNBOOK.md` | phases 0–7 |
| `pitch/PITCH_SCRIPT.md` | detailed pitch narrative (business-as-hero, 3 perspectives) |
| `pitch/DECK_BUILD_PROMPT.md` | brand/design + 10-slide spec + capture→slide map |
| `deck/REFERENCE_ACTZ_Georgetown_Pitch.html` | **premium finished reference deck** the agent replicates (open it to preview) |
| `capture/record-web.mjs` | Puppeteer: screenshots + <=8s screencast snippets, auto-detect, .env login |
| `capture/record-native.sh` + `flows/georgetown.yaml` | one native Capacitor pass |
| `capture/targets.json` | capture map — suites `homepage / intercept / toolkit / proof` |
| `capture/post.sh` | ffmpeg → small mp4/webm/poster |
| `embed/clip.html` | drop-in `<video>` embed |

## Prereqs
Node 18+, ffmpeg, Puppeteer ≥ 22.6 (`page.screencast`). Native pass: macOS+Xcode (iOS, needs Metal) or Android SDK; Maestro optional (supports Capacitor).

## Honest notes
- Routes/selectors in `targets.json` and the login config are **placeholders** — pin them in `.env` or let the agent self-correct against the DOM.
- Roadmap features (geo-push targeting, native events/ticketing/waivers, attendee CRM, Tier-3 real-time) are **skipped in capture and described, never shown as Live.**
- iOS sim recording needs a real Mac (Metal); `adb screenrecord` caps at 180s, no audio. Figma video has a first-view autoplay quirk — the HTML `<video>` deck is most reliable for presenting.
- Never commit `.env` / `.auth.json`; Stripe stays TEST mode.
