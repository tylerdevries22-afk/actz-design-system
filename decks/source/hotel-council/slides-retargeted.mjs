// The seven data-heavy slides — solution ecosystem, social loop, dashboard,
// competitor comparison, value tiles, the tier matrix and the ROI model. Their
// markup is the council deck's, byte-for-byte, with the town-specific copy
// substituted. Re-authoring them would have meant re-implementing components
// like .tfrow (78 rows) and .roi-calc by hand and getting them subtly wrong;
// substitution guarantees they render exactly as the town deck does.
import { marriottTile, townSlides } from './assets.mjs';
import { auditHotelRoi } from './copy-audit.mjs';

const BADGE = '<span class="csbadge">Case study</span>';

// Applied in order, longest first, so "the Town's" is consumed before "Town".
// Every entry is a literal seen in the source — nothing here touches a class
// name, and `town` as a bare word is deliberately absent because it appears in
// `class="pcard pe town"`.
// Real bookable inventory near the property keeps its real name — "Georgetown
// Loop Railroad" is a place, not town-vs-hotel framing. These are stashed behind
// sentinels before the generic Georgetown rule runs and restored afterwards,
// because otherwise the rule turns it into "the your property Loop".
const PROTECT = ['Georgetown Loop', 'Mt Bierstadt', 'Lebanon Mine'];

const COMMON = [
  ['app.actz.com / town-dashboard / georgetown', 'actz.org / concierge / marriott / dashboard'],
  // Town-scale figures on the dashboard rescaled to one 180-key property. Still
  // sample data — badged as such — but plausible rather than absurd.
  ['18,432', '412'],
  ['1,240', '148'],
  ['$2.4M', '$61,400'],
  ['$214,900', '$18,900'],
  ['23 active', '9 active'],
  ['+18 other visitors exploring town', '+4 other guests out exploring'],
  // ── Tier matrix ─────────────────────────────────────────────────────────
  // Town tiers priced $10k–$150k; the published hotel tiers are Trailhead /
  // Summit / Destination Partner at $2,287 / $6,887 / $15,987, so the names,
  // the prices and the audience section headers all move together.
  ['Destination Starter', 'Trailhead'],
  ['Growth OS', 'Summit'],
  ['Smart Infrastructure', 'Destination Partner'],
  ['$10k–$20k', '$2,287/yr'],
  ['$25k–$50k', '$6,887/yr'],
  ['$50k–$150k', '$15,987/yr'],
  ['Launch in 30 days — turn millions of I-70 travelers into Main-St visits.', 'Launch in 30 days — turn a full house into booked afternoons.'],
  ['Operate the engine — grow visitor spend and recover every lodging-tax dollar.', 'Operate the engine — grow attributed guest spend across every outlet.'],
  ['Main-St commission &middot; your tier buys it down', 'Operator commission &middot; your tier buys it down'],
  ['For Main-Street businesses', 'For partner operators'],
  ['For the Town &amp; Council', 'For the property'],
  ['For visitors', 'For guests'],
  ['The Town&rsquo;s data engine', 'The property&rsquo;s data engine'],
  ['Every booking becomes grant-ready, exportable Town data.', 'Every booking becomes attributable, exportable property data.'],
  ['Georgetown guides + group planning', 'Local guides + group planning'],
  ['Grant exports + council briefings', 'Owner reporting + brand-standard exports'],
  ['Lodging-tax auto-calc + attribution', 'Multi-jurisdiction tax + attribution'],
  ['Visitor-intelligence + spend analytics', 'Guest-intelligence + spend analytics'],
  ['Visitor-flow heatmaps + overtourism', 'Guest-flow heatmaps + peak smoothing'],
  ['AI Tourism Concierge (town-facing)', 'AI concierge (staff-facing)'],
  ['Regional alliance + joint grants', 'Multi-property + group rollout'],
  ['White-label &ldquo;Visit Georgetown&rdquo; app', 'White-label guest app, your brand'],
  ['Branded destination hub + sub-domain', 'Branded property hub + sub-domain'],
  ['Nothing for the Town to operate.', 'Nothing for the front desk to operate.'],
  // ── ROI ─────────────────────────────────────────────────────────────────
  // The council model is "new visitor spend becomes town sales tax". A hotel has
  // no tax line, so the payback is restated on figures this deck can actually
  // stand behind: the $276 checkout the live product produces, the published
  // 3.00% ordering fee, and the published tier prices. It is labelled an
  // illustration, because the conversion rate is the one thing a pilot measures.
  ['then it pays the Town.', 'then it pays the property.'],
  ['Even a', 'Even a'],
  ['in visitor spend covers the fee. The Town&rsquo;s investment comes back as', 'of guests booking through the lobby covers the fee. It is repaid out of'],
  ['new sales tax in about a year', 'ordering and ancillary margin'],
  ['then runs net-positive &mdash; while Main Street grows.', 'then runs net-positive. A worked illustration on the assumptions below — not a forecast.'],
  ['1&ndash;2% shift', '1&ndash;2% share'],
  ['drive-bys turned into overnight stays', 'guests who book one itinerary'],
  ['avg overnight visitor spend', 'average booked itinerary (live checkout)'],
  ['new Main-Street spending', 'booked through your property'],
  ['new town tax (4.5%)', 'ordering margin (3.00%)'],
  ['$437k', '$276k'],
  ['$437', '$276'],
  ['~$20k', '~$8.3k'],
  ['more than repays a Tier-1 fee', 'more than repays the Summit tier'],
  ['&mdash; from a fraction of one percent of the 12M cars. The pilot proves the real conversion rate on Georgetown&rsquo;s own numbers, before any commitment.', '&mdash; from a small share of a year&rsquo;s guests. The pilot measures the real conversion rate on your own guests, before any commitment.'],
  ['via new sales tax', 'via ordering margin'],
  ['$10&ndash;20k/yr<small>net ~$0&ndash;10k w/ grants</small>', '$2,287/yr<small>published Trailhead price</small>'],
  ['$25&ndash;50k/yr<small>net ~$0&ndash;25k w/ grants</small>', '$6,887/yr<small>published Summit price</small>'],
  ['$50&ndash;150k/yr<small>net ~$0&ndash;75k w/ grants</small>', '$15,987/yr<small>published Partner price</small>'],
  ['+$12&ndash;25k/yr town tax', '+$8&ndash;15k/yr ordering margin'],
  ['+$25&ndash;50k/yr town tax', '+$15&ndash;30k/yr ordering margin'],
  ['+$50&ndash;150k/yr town tax', '+$30&ndash;70k/yr ordering margin'],
  ['Main St', 'Guests'],
  ['+$250&ndash;500k/yr local spend', '+$250&ndash;500k/yr booked locally'],
  ['+$500k&ndash;1.0M/yr local spend', '+$500k&ndash;1.0M/yr booked locally'],
  // The whole sources line is replaced rather than patched — every input in the
  // council version (CDOT counts, town sales tax, Clear Creek lodging tax, DOLA
  // grant eligibility) is a town input with no hotel equivalent.
  [
    'Model: CDOT I-70 counts (~12M vehicles/yr) &middot; Colorado Tourism Office / Dean Runyan per-visitor spend ($96 day, $276 overnight) &middot; ~130&ndash;230k Georgetown visitors/yr &middot; Georgetown 4.5% town sales tax + 2% Clear Creek lodging tax. The worked example is a conservative floor; the tier figures are full-scale projections (Year-1 ramp) the pilot is designed to prove. Illustrative, not a guarantee. Grant-eligible via Colorado DOLA, the Colorado Tourism Office, and federal EDA programs (subject to award).',
    'Model: $276 average itinerary, taken from the live ACTZ checkout &middot; 3.00% ordering platform fee, falling to 1.50% above $20,000/month per location &middot; published ACTZ partner tier pricing. The worked example is a conservative floor; the tier figures are Year-1 projections the pilot is designed to prove. Illustrative, not a guarantee — ACTZ has taken no production hotel bookings, so the conversion rate is exactly what a 90-day pilot would measure.',
  ],
  ['Tier 1 · Trailhead', 'Trailhead'],
  ['Tier 2 · Summit', 'Summit'],
  ['Tier 3 · Destination Partner', 'Destination Partner'],
  // Plural before singular: "Main-St Business" would otherwise match inside
  // "Main-St Businesses" and leave the stranded suffix "Partner operatores".
  ['<span class="nm">Main-St Businesses', '<span class="nm">Partner operators'],
  ['<span class="nm">Town', '<span class="nm">Marriott'],
  ['<span class="to">To the</span><span class="nm">Marriott</span>', '<span class="to">To</span><span class="nm">Marriott</span>'],
  ['<span class="nm">Visitors', '<span class="nm">Guests'],
  ['Lead the region — run Georgetown as smart-destination infrastructure.', 'Lead the flag — roll one configuration across every property.'],
  ['multi-town', 'multi-property'],
  // ── The hotel node ──────────────────────────────────────────────────────
  // Every place the town deck pictured Georgetown becomes the Marriott mark on
  // its brand red, with the case-study badge alongside the label.
  [
    '<img src="/deck/georgetown/assets/imagery/i70-georgetown.webp" alt="Georgetown">',
    `<img src="${marriottTile}" alt="Marriott">`,
  ],
  ['>The Hotel<', `>The Hotel${BADGE}<`],
  ['AI promotes all of Georgetown', 'AI promotes every outlet on the property'],
  ['Booking spend stays in town', 'Booking spend stays attributable to you'],
  ['Branded &lsquo;Visit Georgetown&rsquo; hub', 'Branded, white-label guest hub'],
  // ── Value tiles ─────────────────────────────────────────────────────────
  ['New tax revenue &middot; grant-funded', 'Attributed revenue &middot; owner-reported'],
  ['Marco, a Main-St owner', 'Marco, a local operator'],
  ['What a PDF, an OTA, and a CMS wish they', 'What a rack, an OTA, and a front desk wish they'],
  ['could do for Georgetown.', 'could do for your property.'],
  [', exportable for grants.', ', exportable to your own BI stack.'],
  ['exportable for grants', 'exportable to your own systems'],
  ['Real ACTZ Town Dashboard components', 'Real ACTZ dashboard components'],
  ['Council access', 'Owner access'],
  ['the Town&rsquo;s tier rises', 'your tier rises'],
  ['data &amp; audience stay the Town&rsquo;s', 'data and audience stay yours'],
  ['Real-time data the Council owns', 'Real-time data you own'],
  ['one council-owned platform', 'one property-owned platform'],
  ['The Town pays a flat subscription', 'The property pays a flat subscription'],
  ['Main-St businesses pay just', 'Partner operators pay just'],
  ['Council owns the data — exportable for grants.', 'You own the data — exportable to your BI stack.'],
  ['Grant-ready reporting', 'Brand-standard reporting'],
  ['Grant-ready export · Live', 'Brand-standard export · Live'],
  ['Live town dashboard · included', 'Concierge dashboard · included'],
  ['Live in Georgetown now', 'In the building now'],
  ['+18 other visitors exploring town', '+18 other guests out exploring'],
  ['AI itinerary from local inventory', 'AI itinerary from bookable local inventory'],
  ['Money stays local · ~1% vs 20&ndash;30% commission', 'Spend attributed to you · ~1% vs 20&ndash;30% commission'],
  ['Book local businesses live', 'Book local operators live'],
  ['Static visitor PDF', 'The pamphlet rack'],
  ['Generic tourism CMS', 'Concierge desk alone'],
  ['for Georgetown.', 'for your property.'],
  ['Georgetown fills up.', 'Your property fills up.'],
  ['Georgetown Adventure Weekend', 'the hotel adventure weekend'],
  ['the Georgetown trip', 'the group trip'],
  ['ACTZ app visitors', 'Guest requests this month'],
  ['New overnight stays', 'Itineraries booked'],
  ['Est. visitor spend', 'Attributed off-property spend'],
  ['Hub booking revenue', 'Booking revenue attributed'],
  ['Where visitors come from', 'What your guests asked for'],
  ['Denver Metro', 'Outdoor &amp; trails'],
  ['Front Range', 'Dining &amp; nightlife'],
  ['Out-of-state', 'History &amp; rail'],
  ['International', 'Family &amp; kids'],
  ['Stop governing tourism by the', 'Stop guessing what your guests did'],
  ['rear-view mirror.', 'all day.'],
  ['For the Council', 'For ownership'],
  ['Council dashboard', 'Concierge dashboard'],
  ['Invisible to the cars going by', 'Invisible once the guest leaves the lobby'],
  ['Keeps the traffic, not the spend', 'Keeps the guest, not the spend'],
  ['No real plan — so they drive past', 'No real plan — so the day is improvised'],
  ['Main-St Business', 'Partner operator'],
  ['The Town', 'The Hotel'],
  ['Visitors', 'Guests'],
  ['the Council', 'ownership'],
  ['Council', 'Ownership'],
  ['Georgetown', 'your property'],
];

// Figures on the dashboard slide are invented. The council deck buries that in
// the word "representative"; a hotel exec deserves it on the frame.
const SAMPLE_NOTE = [
  [
    '· representative figures.',
    '· <b>sample data</b> shaped to a 180-key property (ACTZ has taken no production hotel bookings yet).',
  ],
];

const apply = (html, pairs) =>
  pairs.reduce((acc, [from, to]) => acc.split(from).join(to), html);

// Swap a set of coordinate pairs in both directions in one pass. A plain
// sequential replace would move A onto B and then move both back again, so each
// swap goes via a sentinel.
const swapCoords = (html, pairs) => {
  const viaSentinel = pairs.flatMap(([a, b], i) => [
    [a, `S${i}A`],
    [b, `S${i}B`],
  ]);
  const restore = pairs.flatMap((_, i) => [
    [`S${i}A`, pairs[i][1]],
    [`S${i}B`, pairs[i][0]],
  ]);
  return apply(apply(html, viaSentinel), restore);
};

// The ecosystem ring puts the guest at the top, and two actors along the
// bottom. Each bottom actor owns three things that must travel together or the
// diagram stops making sense: its node, the label naming the arc that leaves it,
// and the trailing icons scattered along that arc. Swapping the hotel and the
// operator therefore swaps nine coordinates, not two — the hotel keeps its red
// node, red pins and "The Hotel" label; the operator keeps gold throughout.
const SWAP_HOTEL_AND_OPERATOR = [
  // the two bottom nodes
  ['left:52px;top:296px', 'left:340px;top:296px'],
  // the arc labels — "The Hotel" sits on the left arc, "Partner operator" on
  // the bottom arc, so the two exchange places along with their nodes
  ['left:92px;top:193px', 'left:244px;top:413px'],
  // trailing icons: the three red pins on the left arc trade with the three
  // gold bags along the bottom arc, largest to largest
  ['left:121px;top:268px', 'left:308px;top:357px'],
  ['left:135px;top:214px', 'left:251px;top:373px'],
  ['left:171px;top:172px', 'left:192px;top:364px'],
];

const retarget = (id, extra = []) => {
  const src = townSlides[id];
  if (!src) throw new Error(`council slide ${id} not found`);
  const hidden = apply(src, PROTECT.map((t, i) => [t, ` P${i} `]));
  const done = apply(hidden, [...extra, ...COMMON]);
  return apply(done, PROTECT.map((t, i) => [` P${i} `, t]));
};

// Slide numbering: the council deck hard-codes "NN / 12" (and a stray "/ 13")
// in its .idx. Rewrite each to this deck's own position out of 14.
const renumber = (html, n) =>
  html.replace(
    /<div class="idx">[^<]*<\/div>/,
    `<div class="idx">${String(n).padStart(2, '0')} / 14</div>`,
  );

export const s3b = renumber(swapCoords(retarget('s3b'), SWAP_HOTEL_AND_OPERATOR), 5);
export const s5 = renumber(retarget('s5'), 7);
export const s7 = renumber(retarget('s7', SAMPLE_NOTE), 8);
export const s8 = renumber(retarget('s8'), 9);
export const s8b = renumber(retarget('s8b'), 10);
export const s10c = renumber(retarget('s10c'), 12);
export const s10d = renumber(auditHotelRoi(retarget('s10d')), 13);

// The council deck references its images by absolute server path. This build
// inlines everything, so any surviving /deck/georgetown/assets/... reference
// would 404 from a file:// or thumb-drive open; the generator rewrites them.
export const ASSET_PREFIX = '/deck/georgetown/assets/';
