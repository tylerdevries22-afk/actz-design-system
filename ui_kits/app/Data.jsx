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

Object.assign(window, {
  ACTIVITIES, CATS, TRIP_DAYS, CHAT, IMG, CAT_TINT,
  Star, MapPin, Heart, Share, Search, Sparkles, ArrowUp,
  Home, MapIcon, CompassIcon, MessageIcon, UserIcon, CalendarIcon, Filter,
});
