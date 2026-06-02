/* global React */
// ─────────────────────────────────────────────────────────────
// ACTZ mobile-app UI kit — shared data + small primitives
// ─────────────────────────────────────────────────────────────

const ACTIVITIES = [
  { id: 'maroon-bells', title: 'Maroon Bells Sunrise Hike',     op: 'Mountain Provider Co.',   loc: 'Aspen, CO',          dist: '2.4 mi', cat: 'Hiking',      price: 148, rating: 4.9, img: 'hero-08.webp' },
  { id: 'hot-springs',  title: 'Glenwood Hot Springs Soak',     op: 'Aspen Wellness',          loc: 'Glenwood Springs',   dist: '18 mi',  cat: 'Wellness',    price: 89,  rating: 4.8, img: 'hero-06.webp' },
  { id: 'snowmass',     title: 'Snowmass Backcountry Camp',     op: 'Trailblazer Outfitters',  loc: 'Snowmass',           dist: '12 mi',  cat: 'Camping',     price: 312, rating: 5.0, img: 'hero-05.webp' },
  { id: 'balloon',      title: 'Sunrise Balloon, Snowmass',     op: 'Sky-High Tours',          loc: 'Snowmass',           dist: '9 mi',   cat: 'Tour',        price: 245, rating: 4.9, img: 'hero-03.webp' },
  { id: 'kayak',        title: 'Sea Cave Kayak Tour',           op: 'Coastline Crew',          loc: 'Pacific',            dist: '1.2 mi', cat: 'Water',       price: 129, rating: 4.8, img: 'hero-04.webp' },
  { id: 'autumn',       title: 'Autumn Aspens Photo Tour',      op: 'Range Photography',       loc: 'Maroon Lake',        dist: '6.8 mi', cat: 'Photo',       price: 95,  rating: 4.7, img: 'hero-08.webp' },
];

const CATS = ['All', 'Hiking', 'Camping', 'Tours', 'Wellness', 'Water', 'Photo', 'Events'];

const TRIP_DAYS = [
  {
    day: 'Sat · May 22',
    label: 'Arrival + golden hour',
    items: [
      { time: '6:00 AM', title: 'Maroon Bells Sunrise Hike', op: 'Mountain Provider Co.', dur: '4 hr', status: 'confirmed' },
      { time: '1:30 PM', title: 'Lunch · Pyramid Bistro',     op: 'Reservation',           dur: '90 min', status: 'pending' },
      { time: '6:30 PM', title: 'Glenwood Hot Springs',       op: 'Aspen Wellness',        dur: '2 hr',  status: 'confirmed' },
    ],
  },
  {
    day: 'Sun · May 23',
    label: 'Backcountry day',
    items: [
      { time: '7:30 AM', title: 'Snowmass Camp · check in',   op: 'Trailblazer Outfitters', dur: 'overnight', status: 'confirmed' },
      { time: '11:00 AM',title: 'Crystal Mill Photo Tour',    op: 'Range Photography',      dur: '5 hr',  status: 'confirmed' },
    ],
  },
];

const CHAT = [
  { from: 'actz',  body: 'Welcome — I drafted a 2-day Aspen plan based on your interests. Tap any stop to swap.' },
  { from: 'you',   body: "Can we move the hot springs to Sunday morning instead?" },
  { from: 'actz',  body: 'Done — moved to 8:30 AM Sunday. Window stays open until 10. Should I open a poll to confirm with your crew?' },
  { from: 'you',   body: "Yeah, open it." },
];

// Build full image url with relative path resolution
const IMG = (name) => `../../assets/imagery/${name}`;

// Tag → tint color
const CAT_TINT = {
  Hiking:   'hsl(var(--co-blue))',
  Wellness: 'hsl(var(--secondary))',
  Camping:  'hsl(var(--accent))',
  Tour:     'hsl(var(--primary))',
  Water:    'hsl(var(--secondary))',
  Photo:    'hsl(var(--accent))',
};

// Star + dot icon strings (inline SVG returned by Lucide are flaky inside iOS frame
// because the createIcons call only runs once; use straight unicode for simple things)
function Star({ size = 12, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function MapPin({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function Heart({ size = 14, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function Share({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
function Search({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function Sparkles({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.88 5.62L19.5 10.5l-5.62 1.88L12 18l-1.88-5.62L4.5 10.5l5.62-1.88z"/>
      <path d="M19 3v4"/><path d="M21 5h-4"/>
    </svg>
  );
}
function ArrowUp({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  );
}
function Home({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H10v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
}
function MapIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
}
function CompassIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
}
function MessageIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>;
}
function UserIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function CalendarIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function Filter({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
}
function Bell({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>;
}
function ChevronLeft({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
function Check({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}

/* Single SVG dictionary used for interest tiles, mode rows, etc.
   Outline glyphs, 1.75 stroke, 24-grid — consistent visual weight. */
function Glyph({ name, size = 18 }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'mountain':   return <svg {...c}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>;
    case 'tent':       return <svg {...c}><path d="M3.5 21 14 3l7.5 18-9-7-9 7Z"/><path d="M14 3v18"/></svg>;
    case 'droplet':    return <svg {...c}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>;
    case 'camera':     return <svg {...c}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
    case 'bike':       return <svg {...c}><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>;
    case 'waves':      return <svg {...c}><path d="M2 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>;
    case 'snowflake':  return <svg {...c}><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>;
    case 'utensils':   return <svg {...c}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
    case 'music':      return <svg {...c}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    case 'sparkles':   return <svg {...c}><path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"/></svg>;
    case 'paw':        return <svg {...c}><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>;
    case 'solo':       return <svg {...c}><circle cx="12" cy="8" r="4"/><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>;
    case 'crew':       return <svg {...c}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'family':     return <svg {...c}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="2"/><path d="M14 21v-1c0-1.5 1-3 3-3s3 1.5 3 3v1"/></svg>;

    /* ── New glyphs for 8-screen onboarding ── */
    case 'compass':    return <svg {...c}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    case 'calendar':   return <svg {...c}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case 'bookmark':   return <svg {...c}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
    case 'megaphone':  return <svg {...c}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
    case 'briefcase':  return <svg {...c}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>;
    case 'eye':        return <svg {...c}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'eye-off':    return <svg {...c}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
    case 'crosshair':  return <svg {...c}><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>;
    case 'home-pin':   return <svg {...c}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H10v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="9" r="1.5"/></svg>;
    case 'plane':      return <svg {...c}><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>;
    case 'zap':        return <svg {...c}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
    case 'list-check': return <svg {...c}><path d="M11 12H3"/><path d="M16 6H3"/><path d="M16 18H3"/><polyline points="21 6 17.4 10 15.5 8"/><polyline points="21 12 17.4 16 15.5 14"/><polyline points="21 18 17.4 22 15.5 20"/></svg>;
    case 'bot':        return <svg {...c}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
    case 'lock':       return <svg {...c}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
    case 'wallet':     return <svg {...c}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 7v13a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>;
    case 'crown':      return <svg {...c}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/></svg>;
    case 'running':    return <svg {...c}><circle cx="13" cy="4" r="2"/><path d="M6 20 9 14l-3-3 4-4 4 2 4-2"/><path d="M9 14l1 6"/><path d="M15 7l1 5-3 2"/></svg>;
    case 'activity':   return <svg {...c}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
    case 'moon':       return <svg {...c}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    case 'car':        return <svg {...c}><path d="m5 7 2-4h10l2 4"/><rect x="3" y="7" width="18" height="10" rx="1"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>;
    case 'hotel':      return <svg {...c}><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M9 22V12h6v10"/><path d="M8 7h.01M16 7h.01M8 11h.01M16 11h.01"/></svg>;

    default: return null;
  }
}

Object.assign(window, {
  ACTIVITIES, CATS, TRIP_DAYS, CHAT, IMG, CAT_TINT,
  Star, MapPin, Heart, Share, Search, Sparkles, ArrowUp,
  Home, MapIcon, CompassIcon, MessageIcon, UserIcon, CalendarIcon, Filter,
  Bell, ChevronLeft, Check, Glyph,
});
