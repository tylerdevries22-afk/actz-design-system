import assert from 'node:assert/strict';
import test from 'node:test';

import { auditHotelRoi } from './copy-audit.mjs';

test('replaces unsupported hotel payback claims with a measured sensitivity', () => {
  const source = [
    'Pays for itself &mdash; <span class="gold">then it pays the property.</span>',
    '<div class="rc-step"><b>1,000</b><span>guests who book one itinerary</span></div>',
    '<div class="rc-step blue"><b>$276k</b><span>booked through your property</span></div>',
    '<div class="rc-step gold"><b>~$8.3k</b><span>ordering margin (3.00%)</span></div>',
    'Fee back in ~9&ndash;12 mo via ordering margin',
  ].join(' ');

  const result = auditHotelRoi(source);

  assert.match(result, /The pilot establishes ROI/);
  assert.match(result, /20<\/b><span>bookings from 1,000 eligible guests at 2%/);
  assert.match(result, /\$5,520/);
  assert.match(result, /hotel share set in written pilot terms/);
  assert.match(result, /83 bookings/);
  assert.doesNotMatch(result, /then it pays the property/);
  assert.doesNotMatch(result, /via ordering margin/);
});

test('leaves unrelated slide markup unchanged', () => {
  const source = '<section id="s1"><h1>Turn a night into a booked itinerary.</h1></section>';
  assert.equal(auditHotelRoi(source), source);
});
