// Final hotel-specific accuracy pass for slides inherited from the Georgetown
// deck. The source layout is preserved; only unsupported ROI promises and one
// audience-label grammar issue are corrected.

const replacements = [
  [
    'Pays for itself &mdash; <span class="gold">then it pays the property.</span>',
    'The pilot establishes ROI &mdash; <span class="gold">before you scale.</span>',
  ],
  [
    '<p class="roi-sub">Even a <b>1&ndash;2% share</b> of guests booking through the lobby covers the fee. It is repaid out of <b>ordering and ancillary margin</b>, then runs net-positive. A worked illustration on the assumptions below — not a forecast.</p>',
    '<p class="roi-sub">A credible hotel ROI case needs four measured inputs: <b>eligible guests, booking conversion, average order, and the hotel&rsquo;s agreed share.</b> We model the framework now; the pilot supplies the property-specific numbers.</p>',
  ],
  [
    'How the money converts <span>&middot; a conservative floor the pilot proves in one season</span>',
    'How the model works <span>&middot; an illustrative sensitivity, not a forecast</span>',
  ],
  ['<div class="rc-step"><b>1,000</b><span>guests who book one itinerary</span></div>', '<div class="rc-step"><b>20</b><span>bookings from 1,000 eligible guests at 2%</span></div>'],
  ['<div class="rc-step blue"><b>$276k</b><span>booked through your property</span></div>', '<div class="rc-step blue"><b>$5,520</b><span>booked value attributed to the hotel</span></div>'],
  ['<div class="rc-step gold"><b>~$8.3k</b><span>ordering margin (3.00%)</span></div>', '<div class="rc-step gold"><b>Agreed</b><span>hotel share set in written pilot terms</span></div>'],
  [
    '<div class="roi-calc-foot">That one move <b>more than repays the Summit tier</b> &mdash; from a small share of a year&rsquo;s guests. The pilot measures the real conversion rate on your own guests, before any commitment.</div>',
    '<div class="roi-calc-foot">The hotel&rsquo;s direct revenue depends on written commercial terms. The pilot measures the booking rate and ancillary lift on your guests before any scaled commitment.</div>',
  ],
  ['At full scale <span>&middot; projection, once the pilot proves the conversion</span>', 'Sensitivity <span>&middot; annual bookings needed to offset each tier fee</span>'],
  ['Fee back in', 'At 10% hotel share'],
  ['~9&ndash;12 mo', '83 bookings'],
  ['~10&ndash;14 mo', '250 bookings'],
  ['~12&ndash;18 mo', '580 bookings'],
  ['via ordering margin', 'per year to offset fee'],
  ['Then ongoing', 'At 5% share'],
  ['Guests', 'At 15% share'],
  ['+$8&ndash;15k/yr ordering margin', '166 bookings / year'],
  ['+$15&ndash;30k/yr ordering margin', '499 bookings / year'],
  ['+$30&ndash;70k/yr ordering margin', '1,159 bookings / year'],
  ['+$250&ndash;500k/yr booked locally', '56 bookings / year'],
  ['+$500k&ndash;1.0M/yr booked locally', '167 bookings / year'],
  ['+$1.0&ndash;3.0M/yr local spend', '387 bookings / year'],
  [
    'Model: $276 average itinerary, taken from the live ACTZ checkout &middot; 3.00% ordering platform fee, falling to 1.50% above $20,000/month per location &middot; published ACTZ partner tier pricing. The worked example is a conservative floor; the tier figures are Year-1 projections the pilot is designed to prove. Illustrative, not a guarantee — ACTZ has taken no production hotel bookings, so the conversion rate is exactly what a 90-day pilot would measure.',
    'Sensitivity uses a $276 illustrative average itinerary and hypothetical hotel shares of 5%, 10%, and 15%. It excludes ancillary outlet lift. ACTZ has taken no production hotel bookings; final economics require written terms and the pilot&rsquo;s measured conversion. Not a forecast or guarantee.',
  ],
];

export const auditHotelRoi = (html) =>
  replacements.reduce((result, [from, to]) => result.split(from).join(to), html);
