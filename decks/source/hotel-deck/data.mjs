// Slide content: lists, numbers and rows. Slide modules stay layout-only so a
// copy change never means touching markup.
import { ic } from './icons.mjs';

export const chip = (txt, kind) => `<span class="pill ${kind}"><i></i>${txt}</span>`;

// Real listings from the Summit Seekers Adventures provider account — the same
// six offerings the Georgetown deck shows, because they are genuinely in the
// database and bookable today.
export const offerings = [
  { t: 'Georgetown Loop Railroad', meta: '2h 15m · Narrow-gauge', price: '$49', img: 'linear-gradient(135deg,#1b3a5c,#0b1a2c)', tag: 'Active', rating: '4.9' },
  { t: 'Lebanon Silver Mine Tour', meta: '1h 30m · Underground', price: '$39', img: 'linear-gradient(135deg,#5c3a1b,#2c1a0b)', tag: 'Active', rating: '4.8' },
  { t: 'Mount Bierstadt Guided 14er', meta: 'Full day · Strenuous', price: '$189', img: 'linear-gradient(135deg,#2c5c3a,#0b2c1a)', tag: 'Active', rating: '5.0' },
  { t: 'Guanella Pass Sunset Tour', meta: '3h · Scenic drive', price: '$79', img: 'linear-gradient(135deg,#5c1b3a,#2c0b1a)', tag: 'Active', rating: '4.9' },
];

// A sample concierge-KPI dashboard (requests this month, attributed value,
// request mix) was drafted for this deck and deliberately cut. ACTZ has taken
// no production hotel bookings, so any such figure would be invented — and this
// deck's whole claim is that its numbers are counted. If the hotel asks what
// the reporting looks like, show them the live dashboard, empty.

// ─── Slide 05: the device wall ─────────────────────────────────────────────
// `art` selects the chassis artwork + screen insets from assets.mjs ART.
// `flex` is the relative on-slide width; the chassis box then derives its own
// height from the artwork's measured aspect ratio, so nothing distorts.
// Captures are landscape — the phone screen is a top-anchored crop, exactly the
// way the Georgetown deck frames its `.phone` clip. `town-plan` is cut 4:3 so it
// fills the iPad screen edge to edge without cover throwing content away.
export const devices = [
  { art: 'computer', flex: 1.95, clip: 'home-hero', label: 'Front desk &amp; back office', sub: 'Desktop · 1440 × 900' },
  { art: 'tablet', flex: 1.3, clip: 'town-plan', label: 'Lobby kiosk', sub: 'iPad · 1180 × 820' },
  { art: 'tablet', flex: 1.02, clip: 'town-browse', label: 'Staff &amp; operator', sub: 'iPad · handheld' },
  { art: 'phone', flex: 0.5, clip: 'hub-landing', label: 'Guest mobile', sub: 'iPhone · 390 × 844' },
];

// ─── Slide 08: the proof ───────────────────────────────────────────────────
// Every number here was counted out of the repositories themselves — tables in
// the schema, paths in the OpenAPI document, files on disk, workflows in CI.
// Nothing here is a projection, a placeholder, or a marketing round number.
export const proofStats = [
  { icon: ic.card, label: 'Database tables, RLS on every one', value: '333' },
  { icon: ic.spark, label: 'Documented API endpoints', value: '1,183' },
  { icon: ic.check, label: 'Automated test files', value: '1,998' },
  { icon: ic.trend, label: 'Migrations applied in order', value: '212' },
  { icon: ic.bell, label: 'CI/CD pipelines gating every merge', value: '40' },
  { icon: ic.star, label: 'Page components in the client', value: '630' },
  { icon: ic.pin, label: 'Colorado towns already modeled', value: '24' },
  { icon: ic.users, label: 'Shipped surfaces: web, iOS, kiosk, operator, display', value: '5' },
];
