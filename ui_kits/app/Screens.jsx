/* global React, ACTIVITIES, CATS, TRIP_DAYS, CHAT, IMG, CAT_TINT, Star, MapPin, Heart, Share, Search, Sparkles, ArrowUp, Home, MapIcon, CompassIcon, MessageIcon, UserIcon, CalendarIcon, Filter */

// ============================================================
// Shared chrome
// ============================================================
function ScreenChrome({ children, scroll = true }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      paddingTop: 54,
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-body)',
      display: 'flex', flexDirection: 'column',
      overflow: scroll ? 'auto' : 'hidden',
    }}>
      {children}
    </div>
  );
}

function TopBar({ title, subtitle, trailing }) {
  return (
    <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ font: '500 11px/1 var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>{subtitle}</div>
        <div style={{ font: '700 26px/1.1 var(--font-display)', letterSpacing: '-0.025em', color: 'hsl(var(--foreground))', marginTop: 4 }}>{title}</div>
      </div>
      {trailing}
    </div>
  );
}

function BottomTabbar({ active = 'home' }) {
  const tabs = [
    { id: 'home', label: 'Home',   Icon: Home },
    { id: 'map',  label: 'Map',    Icon: MapIcon },
    { id: 'explore', label: 'Explore', Icon: CompassIcon },
    { id: 'crew', label: 'Crew',   Icon: MessageIcon },
    { id: 'me',   label: 'Profile',Icon: UserIcon },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 42, zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '10px 6px 12px',
      background: 'hsl(215 60% 6% / 0.78)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 999,
      boxShadow: '0 22px 50px -15px rgba(0,0,0,0.55)',
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const on = id === active;
        return (
          <button key={id} style={{
            position: 'relative', background: 'transparent', border: 0, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 6px', color: on ? 'hsl(var(--accent))' : 'hsl(var(--foreground) / 0.6)',
            font: '600 9px/1 var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            {on && <div style={{ position: 'absolute', top: -10, left: '30%', right: '30%', height: 3, borderRadius: 2, background: 'hsl(var(--accent))', boxShadow: '0 0 10px hsl(var(--accent) / 0.7)' }} />}
            <Icon size={20} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// Marketplace screen
// ============================================================
function MarketplaceScreen() {
  const [active, setActive] = React.useState('All');
  const visible = active === 'All' ? ACTIVITIES : ACTIVITIES.filter(a => a.cat === active);

  return (
    <ScreenChrome>
      <TopBar
        subtitle="Aspen, CO · this week"
        title="Find your next move"
        trailing={
          <div style={{ width: 38, height: 38, borderRadius: 999, background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))', border: '2px solid hsl(var(--foreground) / 0.15)' }} />
        }
      />

      {/* search */}
      <div style={{ margin: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px',
                    background: 'hsl(var(--co-navy))', border: '1px solid hsl(var(--border))',
                    borderRadius: 999 }}>
        <div style={{ color: 'hsl(var(--foreground) / 0.5)' }}><Search size={16} /></div>
        <span style={{ flex: 1, font: '400 14px/1 var(--font-body)', color: 'hsl(var(--foreground) / 0.55)' }}>Hikes, hot springs, hidden gems…</span>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'hsl(var(--primary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Filter size={14} /></div>
      </div>

      {/* category chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 18px', overflowX: 'auto' }}>
        {CATS.map(c => {
          const on = c === active;
          return (
            <button key={c} onClick={() => setActive(c)} style={{
              flexShrink: 0,
              padding: '8px 14px', borderRadius: 999,
              background: on ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.04)',
              border: '1px solid ' + (on ? 'hsl(var(--primary))' : 'hsl(var(--border))'),
              color: on ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground) / 0.85)',
              font: '500 12px/1 var(--font-body)', cursor: 'pointer',
            }}>{c}</button>
          );
        })}
      </div>

      {/* card grid */}
      <div style={{ padding: '0 20px 120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {visible.map((a, i) => (
          <article key={a.id} style={{
            position: 'relative', borderRadius: 20, overflow: 'hidden',
            background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
          }}>
            <div style={{ aspectRatio: '4 / 3', position: 'relative' }}>
              <img src={IMG(a.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
                <button style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'hsl(215 60% 6% / 0.72)', backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)',
                  color: i === 0 || i === 2 ? 'hsl(var(--primary))' : 'white', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Heart size={13} filled={i === 0 || i === 2} /></button>
              </div>
              <div style={{ position: 'absolute', left: 8, bottom: 8, padding: '4px 10px', borderRadius: 999,
                            background: 'hsl(215 60% 6% / 0.72)', backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            color: 'white', font: '700 9px/1 var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {a.cat}
              </div>
            </div>
            <div style={{ padding: '8px 10px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4 }}>
                <h3 style={{ margin: 0, font: '600 12px/1.2 var(--font-body)', color: 'hsl(var(--foreground))', flex: 1 }}>{a.title}</h3>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: 'hsl(var(--accent))', font: '600 11px/1 var(--font-body)' }}>
                  <Star size={10} filled />
                  <span style={{ color: 'hsl(var(--foreground))', fontVariantNumeric: 'tabular-nums' }}>{a.rating.toFixed(1)}</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, font: '400 10px/1.3 var(--font-body)', color: 'hsl(var(--foreground) / 0.6)' }}>
                <span style={{ color: 'hsl(var(--secondary))' }}><MapPin size={10} /></span>
                <span>{a.loc} · {a.dist}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 6 }}>
                <span style={{ font: '700 13px/1 var(--font-display)', color: 'hsl(var(--foreground))', fontVariantNumeric: 'tabular-nums' }}>${a.price}</span>
                <span style={{ font: '500 9px/1 var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>per person</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <BottomTabbar active="home" />
    </ScreenChrome>
  );
}

// ============================================================
// Trip screen (itinerary)
// ============================================================
function TripScreen() {
  return (
    <ScreenChrome>
      <TopBar
        subtitle="Trip · 2 days · 6 stops"
        title="Aspen, May 22–23"
        trailing={
          <button style={{ width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Share size={16} />
          </button>
        }
      />

      {/* trip cover */}
      <div style={{ margin: '0 20px 18px', borderRadius: 24, overflow: 'hidden', position: 'relative', height: 130 }}>
        <img src={IMG('hero-08.webp')} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7))' }} />
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ font: '500 10px/1 var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Crew of 4</div>
            <div style={{ display: 'flex', marginTop: 6 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{
                  width: 24, height: 24, borderRadius: '50%',
                  marginLeft: i === 1 ? 0 : -8,
                  border: '2px solid hsl(var(--background))',
                  background: `linear-gradient(135deg, hsl(${200 + i * 30} 70% 55%), hsl(${340 + i * 4} 70% 50%))`,
                }} />
              ))}
            </div>
          </div>
          <div style={{ padding: '6px 12px', borderRadius: 999, background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))', font: '700 10px/1 var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            $1,640 · split 4
          </div>
        </div>
      </div>

      {/* day timeline */}
      <div style={{ padding: '0 20px 110px' }}>
        {TRIP_DAYS.map((d, di) => (
          <div key={di} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
              <div style={{ font: '700 16px/1 var(--font-display)', letterSpacing: '-0.01em', color: 'hsl(var(--foreground))' }}>{d.day}</div>
              <div style={{ font: '400 12px/1 var(--font-body)', color: 'hsl(var(--foreground) / 0.55)' }}>· {d.label}</div>
            </div>
            <div style={{ position: 'relative', paddingLeft: 18 }}>
              <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: 'hsl(var(--border))' }} />
              {d.items.map((it, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 10 }}>
                  <div style={{ position: 'absolute', left: -16, top: 14, width: 9, height: 9, borderRadius: '50%',
                                background: it.status === 'confirmed' ? 'hsl(var(--accent))' : 'hsl(var(--co-navy))',
                                border: '2px solid ' + (it.status === 'confirmed' ? 'hsl(var(--accent))' : 'hsl(var(--border))'),
                                boxShadow: it.status === 'confirmed' ? '0 0 10px hsl(var(--accent) / 0.6)' : 'none' }} />
                  <div style={{ padding: '10px 14px', borderRadius: 16,
                                background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      <span style={{ font: '600 10px/1 var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--accent))' }}>{it.time}</span>
                      <span style={{ font: '500 9px/1 var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase',
                                     color: it.status === 'confirmed' ? 'hsl(var(--co-blue-light))' : 'hsl(var(--muted-foreground))' }}>
                        {it.status === 'confirmed' ? '● Confirmed' : '○ Pending'}
                      </span>
                    </div>
                    <h4 style={{ margin: '6px 0 2px', font: '600 13px/1.2 var(--font-display)', color: 'hsl(var(--foreground))' }}>{it.title}</h4>
                    <div style={{ font: '400 11px/1.3 var(--font-body)', color: 'hsl(var(--foreground) / 0.6)' }}>{it.op} · {it.dur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomTabbar active="crew" />
    </ScreenChrome>
  );
}

// ============================================================
// AI Chat screen (ACTZ AI)
// ============================================================
function AIChatScreen() {
  return (
    <ScreenChrome>
      <TopBar
        subtitle="ACTZ AI · Aspen concierge"
        title="Plan your trip"
        trailing={
          <div style={{ width: 38, height: 38, borderRadius: 999, background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Sparkles size={18} />
          </div>
        }
      />

      <div style={{ padding: '0 20px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CHAT.map((m, i) => {
          const isAi = m.from === 'actz';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: isAi ? 'flex-start' : 'flex-end' }}>
              <div style={{
                maxWidth: '78%', padding: '10px 14px', borderRadius: 18,
                background: isAi ? 'hsl(var(--card))' : 'hsl(var(--primary))',
                color: isAi ? 'hsl(var(--foreground))' : 'hsl(var(--primary-foreground))',
                border: isAi ? '1px solid hsl(var(--border))' : 'none',
                font: '400 13px/1.4 var(--font-body)',
                borderBottomLeftRadius: isAi ? 6 : 18,
                borderBottomRightRadius: isAi ? 18 : 6,
              }}>{m.body}</div>
            </div>
          );
        })}
        {/* suggestion chips below AI reply */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 4 }}>
          {['Open poll · Hot springs time', 'Show map', 'Swap photo tour'].map(s => (
            <button key={s} style={{
              padding: '6px 12px', borderRadius: 999,
              background: 'transparent', border: '1px solid hsl(var(--secondary) / 0.5)',
              color: 'hsl(var(--co-blue-light))', font: '500 11px/1 var(--font-body)',
              cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* composer pinned bottom */}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 110, padding: '8px 8px 8px 16px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'hsl(215 60% 6% / 0.82)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    borderRadius: 999, border: '1px solid hsl(var(--border))',
                    boxShadow: '0 22px 50px -15px rgba(0,0,0,0.55)' }}>
        <span style={{ flex: 1, font: '400 13px/1 var(--font-body)', color: 'hsl(var(--foreground) / 0.55)' }}>Ask ACTZ AI…</span>
        <button style={{ width: 34, height: 34, borderRadius: '50%', background: 'hsl(var(--primary))', color: 'white', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowUp size={14} />
        </button>
      </div>

      <BottomTabbar active="explore" />
    </ScreenChrome>
  );
}

// ============================================================
// Map screen (Airbnb-style pins + bottom carousel)
// ============================================================
function MapScreen() {
  return (
    <ScreenChrome scroll={false}>
      {/* map background — use a hero image as stand-in for the actual map tiles */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, hsl(215 60% 8%), hsl(215 40% 18%))' }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="topo" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--co-blue) / 0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          <rect width="100%" height="100%" fill="url(#topo)"/>
          {/* fake topo contours */}
          {[0, 1, 2, 3, 4].map(i => (
            <path key={i} d={`M -20 ${120 + i * 35} Q ${100 + i * 20} ${80 + i * 25} ${260 + i * 10} ${130 + i * 30} T 500 ${200 + i * 30}`}
                  fill="none" stroke="hsl(var(--co-blue) / 0.18)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      {/* search at top */}
      <div style={{ position: 'absolute', top: 56, left: 12, right: 12, padding: '10px 12px',
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'hsl(215 60% 6% / 0.85)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    borderRadius: 999, border: '1px solid hsl(var(--border))',
                    boxShadow: '0 22px 50px -15px rgba(0,0,0,0.55)' }}>
        <span style={{ color: 'hsl(var(--foreground) / 0.7)' }}><Search size={14} /></span>
        <span style={{ flex: 1, font: '500 13px/1 var(--font-body)', color: 'hsl(var(--foreground))' }}>Aspen, CO · May 22–27</span>
        <span style={{ padding: '4px 10px', borderRadius: 999, background: 'hsl(var(--primary))', color: 'white', font: '700 10px/1 var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>32</span>
      </div>

      {/* pins */}
      {[
        { x: '30%', y: '36%', price: '$148', cat: 'primary' },
        { x: '62%', y: '28%', price: '$89',  cat: 'secondary' },
        { x: '48%', y: '52%', price: '$312', cat: 'accent' },
        { x: '22%', y: '64%', price: '$245', cat: 'primary' },
        { x: '70%', y: '60%', price: '$95',  cat: 'secondary' },
      ].map((p, i) => {
        const bgs = {
          primary:  'hsl(var(--primary))',
          secondary:'hsl(var(--secondary))',
          accent:   'hsl(var(--accent))',
        };
        const fgs = {
          primary: 'white', secondary: 'white', accent: 'hsl(var(--accent-foreground))',
        };
        return (
          <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -100%)' }}>
            <div style={{
              padding: '6px 12px', borderRadius: 999,
              background: bgs[p.cat], color: fgs[p.cat],
              font: '700 12px/1 var(--font-body)', fontVariantNumeric: 'tabular-nums',
              border: '2px solid hsl(var(--background))',
              boxShadow: '0 8px 20px -2px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}>{p.price}</div>
          </div>
        );
      })}

      {/* bottom card carousel */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 110, padding: '0 16px', display: 'flex', gap: 12, overflowX: 'auto' }}>
        {ACTIVITIES.slice(0, 3).map(a => (
          <div key={a.id} style={{ flex: '0 0 240px', padding: 10, display: 'flex', gap: 10,
                                    background: 'hsl(215 60% 6% / 0.92)',
                                    backdropFilter: 'blur(28px)',
                                    WebkitBackdropFilter: 'blur(28px)',
                                    borderRadius: 18, border: '1px solid hsl(var(--border))',
                                    boxShadow: '0 22px 50px -15px rgba(0,0,0,0.55)' }}>
            <img src={IMG(a.img)} alt="" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '600 11px/1.2 var(--font-body)', color: 'hsl(var(--foreground))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
              <div style={{ font: '400 10px/1.3 var(--font-body)', color: 'hsl(var(--foreground) / 0.6)', marginTop: 2 }}>{a.loc} · {a.dist}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6 }}>
                <span style={{ font: '700 12px/1 var(--font-display)', color: 'hsl(var(--foreground))', fontVariantNumeric: 'tabular-nums' }}>${a.price}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, color: 'hsl(var(--accent))', font: '600 10px/1 var(--font-body)' }}>
                  <Star size={9} filled /><span style={{ color: 'hsl(var(--foreground))' }}>{a.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomTabbar active="map" />
    </ScreenChrome>
  );
}

Object.assign(window, { MarketplaceScreen, TripScreen, AIChatScreen, MapScreen, BottomTabbar, ScreenChrome });
