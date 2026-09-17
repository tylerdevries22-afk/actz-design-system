// Commercial content: what it costs, what is honestly built, what happens in
// the first 90 days, and what we are asking for.

// Published Colorado partner tiers. Annual contracts, 12-month minimum, 5%
// discount for annual prepay, 60-day notice. Year-one totals are setup + 12×
// monthly, computed from the same table the provider portal renders.
export const tiers = [
  {
    name: 'Trailhead',
    year: '$2,287',
    terms: '$499 setup + $149/mo',
    blurb: 'A claimed, published hotel page with concierge itineraries.',
    pts: ['Claimed hotel Business Page', 'ACTZ-branded itinerary builder', 'Guest requests routed to your desk'],
  },
  {
    name: 'Summit',
    year: '$6,887',
    terms: '$1,499 setup + $449/mo',
    blurb: 'Co-branded on your own subdomain, with the lobby kiosk.',
    pts: ['Co-branded domain', 'Lobby kiosk hardware profile', 'Concierge dashboard + reporting'],
    hot: true,
  },
  {
    name: 'Destination Partner',
    year: '$15,987',
    terms: '$3,999 setup + $999/mo',
    blurb: 'Full white-label. Our attribution disappears entirely.',
    pts: ['White-label — attribution suppressed', 'Your ordering stack, your brand', 'Multi-property and group rollout'],
  },
];

// The two commercial models, stated side by side so neither reads as a
// surprise later. They are alternatives, not a stack.
export const models = [
  {
    name: 'Marketplace',
    head: '10% platform fee',
    body: 'ACTZ takes a platform fee on bookings it sells, settled through Stripe Connect. No retainer, no setup — we only earn when a guest books.',
  },
  {
    name: 'Partner retainer',
    head: '0% of booking revenue',
    body: 'On a partner tier, ACTZ earns solely from the retainer. Booking revenue passes through untouched. You pick one model, not both.',
  },
  {
    name: 'Ordering',
    head: '3.00% → 1.50%',
    body: 'Café, bar and room-service orders carry a 3.00% platform fee, dropping to 1.50% above $20,000 per month per location. Card processing is Square’s, on your own merchant account.',
  },
];

// ─── Slide 09: honest build state ──────────────────────────────────────────
export const live = [
  'Hotel is a first-class Business Page type — shipped, not planned',
  'Claim flow end-to-end: public CTA → portal wizard → admin review queue',
  'White-label branding level with attribution fully suppressed',
  'AI concierge with interests, budget, date and time → a full itinerary',
  'Native iOS app distributed through TestFlight, with over-the-air updates in production',
  'White-label ordering stack running on five surfaces, deployed and healthy',
];
export const roadmap = [
  'Public App Store listing — the next milestone after TestFlight',
  'No room-night inventory: ACTZ deep-links your existing booking engine',
  'Kiosk card-reader authorization is still simulated, not live-charging',
  'Hotel surfaces are Colorado-anchored today; other markets are a data question',
  'The ordering stack has not yet taken a live customer order',
  'Hotel-specific pricing tier — today you would sit on a town tier',
  // The 60 seconds on slide 02 is ACTOTA's own documented Dream Vacations
  // figure, but that service had a human curating behind the form. Saying so
  // here is the price of putting the number on the cover slide at all.
  '60 seconds end-to-end is our design target for the automated builder — the documented 60-second figure is from ACTOTA’s concierge-assisted Dream Vacations service',
];

// ─── Slide 11: first 90 days ───────────────────────────────────────────────
export const timeline = [
  { k: '01', t: 'Week 1 — claim the page', d: 'You claim your hotel Business Page through the flow that is already live. Check-in and check-out times, amenities, room count, and your booking URL come with it.' },
  { k: '02', t: 'Weeks 2–4 — kiosk in the lobby', d: 'An iPad goes where the pamphlet rack is. Guests pick interests, budget, date and time and walk away with an itinerary instead of a stack of brochures.' },
  { k: '03', t: 'Weeks 4–8 — menu import', d: 'Your café or bar menu imports from CSV or a PDF. A model does the first pass, a human reviews every row, and one signed write commits it.' },
  { k: '04', t: 'Weeks 8–12 — first itineraries out', d: 'Concierge dashboard live, requests attributed to your property, and a monthly read on what your guests actually asked for.' },
];

// ─── Slide 12: the ask ─────────────────────────────────────────────────────
export const asks = [
  {
    primary: true,
    head: 'Become the founding hotel partner',
    body: 'One property, one lobby kiosk, one claimed page. A 90-day pilot on the Summit tier, and we build the hotel tier around what you actually need.',
  },
  {
    head: 'What we need from you',
    body: 'A named contact at the front desk, your menu in whatever shape it is in, and permission to put one iPad where the rack is today.',
  },
];

export const contact = 'Tyler DeVries · <b>tyler@actz.org</b>';
