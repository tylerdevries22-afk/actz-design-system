# Traveler app kit

Hi-fi recreation of the **ACTZ traveler mobile app** (`client/` in the
source repo, Capacitor-wrapped React). Four iOS-framed screens side-by-side.

## Files
- `index.html` — entry point. Loads React + Babel + the kit components.
- `ios-frame.jsx` — iOS 26 liquid-glass device frame (starter component).
- `Data.jsx` — fixture data (activities, trip days, chat) + inline SVG
  icons (Lucide-equivalents drawn directly so they survive Babel re-runs).
- `Screens.jsx` — the four screen components (`MarketplaceScreen`,
  `MapScreen`, `TripScreen`, `AIChatScreen`) + shared `ScreenChrome` +
  `BottomTabbar`.

## Screens

| Screen | What it shows |
|---|---|
| **Marketplace** | Search bar, scrollable category chips, 2-column card grid (mirrors `UniversalMarketplaceCard` from the source). |
| **Map** | Airbnb-style price-pin map with bottom card carousel — mirrors the source's `marketplace-map-portal` + `cluster-list-sheet` interaction. |
| **Trip** | Day-by-day itinerary timeline with confirmed/pending dots, crew avatars, total-split price pill. |
| **AI chat** | ACTZ AI concierge (Gemini-backed in source) — assistant bubbles, suggestion chips below replies, glass composer at the bottom. |

Each screen renders the **shared bottom tabbar** with the gold
active-indicator (Home · Map · Explore · Crew · Profile).

## What's faithful
- Dark navy-deep canvas, exact card surface + border tokens
- Frosted-glass tabbar with gold indicator bar above the active tab
- 20px-radius marketplace cards, badge-over-photo pattern
- Status pills, heart action button in dark-frosted-glass circles
- Trip timeline pattern (vertical line + tinted dots + status meta)

## What's mocked / lossy
- The iOS frame is the design-system starter (iOS 26 liquid-glass),
  not the real Capacitor iOS WebView render path.
- The source app has Instagram-style swipeable tab transitions (see
  `navigation-v2/core/swipeable-tab-view.tsx`) — here, tabs are static.
- The map is a stylized SVG grid + topo lines, not a real Google Maps /
  Apple MapKit canvas.
- Each card's hero photo is reused from the marketing kit; the real app
  pulls Cloudflare Images thumbnails.

## How to edit
- Hard-coded fixture data lives in `Data.jsx` — change the activity
  list, trip days, chat transcript there.
- Replace `<img>` `src` paths to swap photography.
- Add a screen: write a new component in `Screens.jsx`, expose it on
  `window`, and add a `<DeviceCard>` slot in `index.html`.
