// Content for the three slides ported from the Georgetown deck: the ★ hotel-as-
// hero toolkit, the concierge dashboard, and the four commercial arguments.
import { ic } from './icons.mjs';

// ─── The concierge dashboard ───────────────────────────────────────────────
// SAMPLE DATA, and the slide says so on the frame chrome, not just in a
// footnote. ACTZ has taken no production hotel bookings, so every figure below
// is illustrative — shaped to a 180-key property on the Summit tier. The
// components rendering them are the real ones; only the numbers are invented.
export const hotelKpis = [
  { icon: ic.users, label: 'Guest requests this month', value: '412' },
  { icon: ic.check, label: 'Itineraries booked', value: '148' },
  { icon: ic.wallet, label: 'Attributed off-property spend', value: '$61,400' },
  { icon: ic.trend, label: 'Average party size', value: '2.4' },
];

export const askedFor = [
  ['Outdoor & trails', 34],
  ['Dining & nightlife', 26],
  ['History & rail', 22],
  ['Family & kids', 18],
];

// The timing split is the argument for a kiosk rather than a desk: most of the
// demand lands when the desk is thinnest.
export const requestTiming = [
  ['After 8pm', 39],
  ['Before checkout', 24],
  ['At check-in', 22],
  ['Midday', 15],
];

// ─── Slide: four ways it pays ──────────────────────────────────────────────
// Every dollar figure here is sourced from ACTOTA's own strategic plan, which
// cites the Colorado Tourism Office and OEDIT. Nothing here is ACTZ's own
// performance — these are the size of the prize, not a claim about results.
export const revenueCards = [
  {
    h: 'Attributed off-property spend',
    p: 'Colorado travelers spend $516 per person per trip; skiers $1,259. Statewide that was $27.7 billion in 2022. Today essentially all of it leaves your lobby unattributed. ACTZ books it and shows you the number.',
  },
  {
    h: 'Groups, weddings and conference blocks',
    p: 'Party size is already an input to the builder. A forty-person wedding block or a conference group filling its free Thursday afternoon — planned once, booked once, billed once, instead of forty separate front-desk conversations.',
  },
  {
    h: 'Guest interest data you own',
    p: 'Every itinerary is a declared-preference profile: interests, budget, party size, timing. That is the CRM a brand normally buys from a third party, generated here as a by-product of a service the guest actually wanted.',
  },
  {
    h: 'Off-peak and shoulder-season demand shaping',
    p: 'You control what surfaces on the kiosk. Steer guests toward the slow Tuesday, the empty 2pm café, and the shoulder-season operator who needs the volume — the same lever Georgetown uses to fill Main Street.',
  },
];

// ─── The ★ slide: hotel as hero ────────────────────────────────────────────
// Georgetown's ★ slide made the Main-St business the protagonist. The hotel
// equivalent: the property supplies every resource that makes the answer good,
// and ACTZ supplies only the engine that assembles it.
export const heroPoints = [
  [
    '01',
    'Every guest, every group',
    'A couple with one free evening, a family of five, a forty-person wedding block. The same four questions, the same minute, and an itinerary sized to the party that asked.',
  ],
  [
    '02',
    'Your resources, your recommendations',
    'Your partner operators, your negotiated rates, your preferred tables. ACTZ supplies the engine; the hotel supplies everything that makes the answer worth having.',
  ],
  [
    '03',
    'The same standard at every property',
    'One configuration rolls to the whole flag. An 11pm check-in met by a first-week hire gets the recommendation quality of your twenty-year veteran at noon.',
  ],
  [
    '04',
    'One relationship',
    'One partner, one install, one invoice. The guest never sees two products — they see your hotel.',
  ],
];
