/* global React, IMG, ChevronLeft, Check, Glyph, Bell, Search, Heart */
// ============================================================
// ACTZ Onboarding flow — 6-step prototype
// REVAMPED to reuse landing-page visual DNA:
//   • Tilted infinite marquees (Welcome + Done bookends)
//   • Italic gradient accent on headlines
//   • Hero-badge pattern (pill + note in glass)
//   • Trip-card pattern (image + tag + heart + price-pill)
//   • Status-pill rows (.onb-status-pill with dot)
//   • Genre-pill cluster (.onb-genre-pill)
//   • Stagger fade-up entrance animations
//
// Layout tokens (locked):
//   • screen H-padding:   24px
//   • header bar:         42px
//   • title→sub gap:      8px
//   • content → footer:   128px reserved (CTA 52 + sec 40 + 38 safe)
//   • marquee height:     112px (fits 96-card + shadow)
// ============================================================

const STEPS = ['welcome', 'interests', 'where', 'crew', 'notifications', 'done'];

// Hero photo loop (matches marketing/index.html top + bot carousels)
const HERO_LOOP_TOP = ['hero-01.webp','hero-04.webp','hero-08.webp','hero-03.webp','hero-06.webp','hero-02.webp'];
const HERO_LOOP_BOT = ['hero-05.webp','hero-07.webp','hero-02.webp','hero-06.webp','hero-01.webp','hero-04.webp'];

// ─────────────────────────────────────────────────────────────
// Reusable marquee (mirrors .carousel-row from landing page)
// ─────────────────────────────────────────────────────────────
function OnbMarquee({ photos, row = 'top' }) {
  // duplicate for seamless loop (matches landing pattern)
  const cards = [...photos, ...photos];
  return (
    <div className={`onb-marquee ${row}`}>
      <div className="track">
        {cards.map((p, i) => (
          <div key={i} className="card"><img src={IMG(p)} alt="" /></div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared chrome
// ─────────────────────────────────────────────────────────────
function OnbChrome({ children, bgImage, bgOverlay = true, radialGlow = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      fontFamily: 'var(--font-body)',
      overflow: 'hidden',
    }}>
      {bgImage && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={IMG(bgImage)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {bgOverlay && (
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, hsl(215 60% 5% / 0.25) 0%, hsl(215 60% 5% / 0.55) 50%, hsl(215 60% 5%) 100%)',
            }} />
          )}
        </div>
      )}
      {radialGlow && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(60% 50% at 50% 35%, hsl(var(--primary) / 0.14) 0%, transparent 60%), radial-gradient(60% 50% at 80% 20%, hsl(var(--secondary) / 0.10) 0%, transparent 60%)',
        }} />
      )}
      <div style={{ position: 'absolute', inset: 0, paddingTop: 54, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

function OnbHeader({ step, total, onBack, light = false }) {
  const trackBg = light ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.10)';
  const counter = light ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)';
  return (
    <div style={{ padding: '10px 20px 14px', display: 'flex', alignItems: 'center', gap: 12, height: 42, boxSizing: 'content-box', position: 'relative', zIndex: 5 }}>
      {onBack ? (
        <button onClick={onBack} aria-label="Back" style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'hsl(215 60% 6% / 0.55)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.10)', color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
          transition: 'transform 200ms var(--ease-out-expo), background 200ms',
        }}><ChevronLeft size={13} /></button>
      ) : <div style={{ width: 30 }} />}
      <div style={{ flex: 1, display: 'flex', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => {
          const done = i < step;
          const here = i === step;
          return (
            <div key={i} style={{
              flex: 1, height: 2.5, borderRadius: 2,
              background: done || here ? 'hsl(var(--primary))' : trackBg,
              boxShadow: here ? '0 0 8px hsl(var(--primary) / 0.55)' : 'none',
              opacity: done ? 0.7 : 1,
              transition: 'background 220ms ease, opacity 220ms ease',
            }} />
          );
        })}
      </div>
      <div style={{ minWidth: 30, font: '600 10px/1 var(--font-body)', letterSpacing: '0.14em', textAlign: 'right', color: counter, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
        {String(step + 1).padStart(2, '0')}<span style={{ opacity: 0.5 }}>/{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

function OnbFooter({ primaryLabel, onPrimary, secondaryLabel, onSecondary, disabled, hint }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      padding: '20px 24px 38px',
      display: 'flex', flexDirection: 'column', gap: 4,
      background: 'linear-gradient(180deg, transparent 0%, hsl(215 60% 5% / 0.95) 40%, hsl(215 60% 5%) 100%)',
      zIndex: 4,
    }}>
      {hint && (
        <div style={{ font: '500 10px/1.4 var(--font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 6 }}>
          {hint}
        </div>
      )}
      <button onClick={disabled ? null : onPrimary} disabled={disabled} style={{
        width: '100%', height: 52, padding: '0 18px', borderRadius: 999,
        background: disabled ? 'rgba(255,255,255,0.06)' : 'hsl(var(--primary))',
        color: disabled ? 'rgba(255,255,255,0.4)' : 'hsl(var(--primary-foreground))',
        border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
        font: '600 15px/1 var(--font-body)', letterSpacing: '-0.005em',
        boxShadow: disabled ? 'none' : '0 12px 28px -10px hsl(var(--primary) / 0.6)',
        transition: 'background 220ms, transform 220ms var(--ease-back-out), box-shadow 220ms',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>{primaryLabel}</button>
      {secondaryLabel ? (
        <button onClick={onSecondary} style={{
          width: '100%', height: 40,
          background: 'transparent', color: 'rgba(255,255,255,0.65)',
          border: 0, cursor: 'pointer',
          font: '500 13px/1 var(--font-body)',
        }}>{secondaryLabel}</button>
      ) : <div style={{ height: 16 }} />}
    </div>
  );
}

// Shared title block — eyebrow + headline + sub
function StepTitle({ eyebrow, title, sub, eyebrowColor = 'hsl(var(--primary))', delay = 1 }) {
  return (
    <div style={{ padding: '22px 24px 0' }}>
      {eyebrow && (
        <div className={`onb-anim onb-anim-${delay}`} style={{
          font: '600 10px/1 var(--font-body)', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: eyebrowColor, marginBottom: 12,
          display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 14, height: 1, background: eyebrowColor, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap' }}>{eyebrow}</span>
        </div>
      )}
      <h2 className={`onb-anim onb-anim-${delay + 1}`} style={{
        margin: 0, font: '700 28px/1.05 var(--font-display)',
        letterSpacing: '-0.03em', color: 'white',
        textWrap: 'balance', maxWidth: '17ch',
      }}>{title}</h2>
      {sub && (
        <p className={`onb-anim onb-anim-${delay + 2}`} style={{ margin: '8px 0 0', font: '400 13.5px/1.5 var(--font-body)', color: 'rgba(255,255,255,0.65)', maxWidth: '34ch' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 · Welcome
//   Layout: header → top marquee → headline block → bot marquee → footer
//   Pulls from landing hero: tilted carousels, hero-badge, italic accent.
// ─────────────────────────────────────────────────────────────
function WelcomeStep({ go, total }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={0} total={total} />

      {/* TOP MARQUEE */}
      <div className="onb-anim" style={{ marginTop: 8 }}>
        <OnbMarquee photos={HERO_LOOP_TOP} row="top" />
      </div>

      {/* HEADLINE BLOCK — centered between marquees */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', textAlign: 'center', alignItems: 'center' }}>
        <span className="onb-hero-badge onb-anim onb-anim-1" style={{ marginBottom: 16 }}>
          <span className="pill">New</span>
          <span className="note">Travel intentionally.</span>
        </span>

        <h1 className="onb-anim onb-anim-2" style={{
          margin: 0, font: '700 30px/1.02 var(--font-display)',
          letterSpacing: '-0.035em', color: 'white',
          textWrap: 'balance', maxWidth: '14ch',
        }}>
          Built for <span className="onb-accent">action</span> seekers.
        </h1>

        <p className="onb-anim onb-anim-3" style={{
          margin: '12px 0 0', font: '400 13.5px/1.55 var(--font-body)',
          color: 'rgba(255,255,255,0.78)', maxWidth: '28ch',
        }}>
          Plan, share, and book trips your crew will actually agree on.
        </p>
      </div>

      {/* BOT MARQUEE */}
      <div className="onb-anim onb-anim-1" style={{ marginBottom: 132 }}>
        <OnbMarquee photos={HERO_LOOP_BOT} row="bot" />
      </div>

      <OnbFooter
        primaryLabel="Get started"
        onPrimary={() => go(1)}
        secondaryLabel="I have an account · Sign in"
        onSecondary={() => go(1)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 · Interests — genre-pill cluster (landing DNA)
// ─────────────────────────────────────────────────────────────
const INTEREST_GROUPS = [
  {
    group: 'Outdoor',
    items: [
      { label: 'Hiking',   glyph: 'mountain' },
      { label: 'Camping',  glyph: 'tent' },
      { label: 'Cycling',  glyph: 'bike' },
      { label: 'Skiing',   glyph: 'snowflake' },
    ],
  },
  {
    group: 'Wellness & water',
    items: [
      { label: 'Hot springs', glyph: 'droplet' },
      { label: 'Water',       glyph: 'waves' },
      { label: 'Wildlife',    glyph: 'paw' },
    ],
  },
  {
    group: 'Culture',
    items: [
      { label: 'Photo',       glyph: 'camera' },
      { label: 'Food',        glyph: 'utensils' },
      { label: 'Concerts',    glyph: 'music' },
      { label: 'Hidden gems', glyph: 'sparkles' },
    ],
  },
];

function InterestsStep({ go, back, total, picks, setPicks }) {
  const toggle = (label) => {
    setPicks(picks.includes(label) ? picks.filter(p => p !== label) : [...picks, label]);
  };
  const min = 3;
  const enough = picks.length >= min;

  return (
    <OnbChrome radialGlow>
      <OnbHeader step={1} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Step 02 · Interests"
          title={<>What's your <span className="onb-accent">vibe</span>?</>}
          sub={`Pick at least ${min}. We rank everything against what you actually like — not what's trending.`}
          delay={1}
        />
      </div>

      <div style={{ flex: 1, padding: '20px 24px 150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {INTEREST_GROUPS.map(({ group, items }, gi) => (
          <div key={group} className={`onb-anim onb-anim-${Math.min(gi + 2, 4)}`}>
            <div style={{
              font: '600 10px/1 var(--font-body)', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
              marginBottom: 10,
            }}>{group}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {items.map(({ label, glyph }) => {
                const on = picks.includes(label);
                return (
                  <button
                    key={label}
                    className="onb-genre-pill"
                    data-on={on}
                    onClick={() => toggle(label)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: on ? 'hsl(var(--primary-foreground))' : 'hsl(var(--co-blue-light))' }}>
                      <Glyph name={glyph} size={15} />
                    </span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <OnbFooter
        primaryLabel={enough ? `Continue · ${picks.length} picked` : (picks.length ? `Pick ${min - picks.length} more` : 'Pick at least 3')}
        onPrimary={() => go(2)}
        disabled={!enough}
        secondaryLabel="Skip for now"
        onSecondary={() => go(2)}
        hint={enough ? null : `${picks.length}/${min} picked`}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 · Destination — trip-card pattern (matches landing trips-rail)
// ─────────────────────────────────────────────────────────────
const DESTINATIONS = [
  { city: 'Aspen',         state: 'Colorado',   img: 'hero-08.webp', tag: 'Hiking',   tagColor: 'primary',   meta: '124 activities · 6 lodges' },
  { city: 'Snowmass',      state: 'Colorado',   img: 'hero-05.webp', tag: 'Camping',  tagColor: 'accent',    meta: '78 activities · 4 lodges' },
  { city: 'Glenwood Sprs', state: 'Colorado',   img: 'hero-06.webp', tag: 'Wellness', tagColor: 'secondary', meta: '52 activities' },
  { city: 'Pacific Coast', state: 'California', img: 'hero-04.webp', tag: 'Water',    tagColor: 'secondary', meta: '96 activities' },
];

function WhereStep({ go, back, total, picked, setPicked }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={2} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Step 03 · Destination"
          title={<>Where <span className="onb-accent">to</span>?</>}
          sub="Pick a destination or search for your own — dates can change anytime."
          delay={1}
        />
      </div>

      <div className="onb-anim onb-anim-2" style={{ padding: '18px 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* search bar mirroring landing .search-bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 14,
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}><Search size={14} /></span>
          <span style={{ flex: 1, font: '400 13px/1 var(--font-body)', color: 'rgba(255,255,255,0.55)' }}>Search city · trail · region</span>
        </div>

        {/* dates row */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, padding: '10px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
            cursor: 'pointer',
          }}>
            <span style={{ font: '500 9px/1 var(--font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>Arrive</span>
            <span style={{ font: '600 13px/1 var(--font-body)', color: 'white', whiteSpace: 'nowrap' }}>May 22</span>
          </button>
          <button style={{
            flex: 1, padding: '10px 12px', borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
            cursor: 'pointer',
          }}>
            <span style={{ font: '500 9px/1 var(--font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>Depart</span>
            <span style={{ font: '600 13px/1 var(--font-body)', color: 'white', whiteSpace: 'nowrap' }}>May 27</span>
          </button>
          <button style={{
            width: 44, padding: 0, borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: 'rgba(255,255,255,0.7)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }} aria-label="Flexible">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h13"/><path d="M3 12h11"/><path d="M3 18h13"/><path d="m17 8 3-3-3-3"/><path d="m17 20 3-3-3-3"/></svg>
          </button>
        </div>
      </div>

      {/* TRIP-CARD GRID — full landing-DNA pattern (.trip-card) */}
      <div style={{ padding: '16px 24px 150px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, overflowY: 'auto' }}>
        {DESTINATIONS.map((d, i) => {
          const on = picked === d.city;
          return (
            <button
              key={d.city}
              onClick={() => setPicked(d.city)}
              className={`onb-anim onb-anim-${Math.min(i + 2, 4)}`}
              style={{
                position: 'relative', padding: 0, border: 0, cursor: 'pointer',
                borderRadius: 18, overflow: 'hidden', aspectRatio: '3 / 4',
                transition: 'transform 240ms var(--ease-back-out), box-shadow 240ms',
                transform: on ? 'scale(0.97)' : 'scale(1)',
                boxShadow: on
                  ? 'inset 0 0 0 2.5px hsl(var(--primary)), 0 12px 30px -10px hsl(var(--primary) / 0.55)'
                  : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              <img src={IMG(d.img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* gradient overlay like landing trip-card .grad */}
              <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '70%', background: 'linear-gradient(to top, rgba(0,0,0,0.86) 0%, transparent 100%)' }} />

              {/* tag — top-left like landing .tag */}
              <span style={{
                position: 'absolute', top: 10, left: 10,
                display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                background: `hsl(var(--${d.tagColor}))`,
                color: d.tagColor === 'primary' ? 'hsl(var(--primary-foreground))' : 'white',
                font: '700 9px/1 var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>{d.tag}</span>

              {/* check or heart top-right (mirrors trip-card .heart) */}
              <div style={{
                position: 'absolute', top: 10, right: 10,
                width: 26, height: 26, borderRadius: '50%',
                background: on ? 'hsl(var(--primary))' : 'rgba(0,0,0,0.45)',
                color: on ? 'hsl(var(--primary-foreground))' : 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: on ? '0 4px 12px -2px hsl(var(--primary) / 0.6)' : 'none',
                transition: 'background 220ms',
              }}>
                {on ? <Check size={12} /> : <Heart size={12} />}
              </div>

              {/* info — bottom */}
              <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, textAlign: 'left' }}>
                <div style={{ font: '600 9px/1 var(--font-body)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{d.state}</div>
                <div style={{ font: '700 17px/1.1 var(--font-display)', letterSpacing: '-0.02em', color: 'white', marginTop: 4 }}>{d.city}</div>
                <div style={{ font: '400 10px/1.3 var(--font-body)', color: 'rgba(255,255,255,0.62)', marginTop: 3 }}>{d.meta}</div>
              </div>
            </button>
          );
        })}
      </div>

      <OnbFooter
        primaryLabel={picked ? `Continue · ${picked}` : 'Pick a destination'}
        onPrimary={() => go(3)}
        disabled={!picked}
        secondaryLabel="Skip"
        onSecondary={() => go(3)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 4 · Solo · Crew · Family — benefit-card vertical layout
// ─────────────────────────────────────────────────────────────
const MODES = [
  { id: 'solo',   title: 'Solo',   sub: "Plan and travel on my own.",                              glyph: 'solo',   tone: 'secondary' },
  { id: 'crew',   title: 'Crew',   sub: 'Plan with friends. Polls, shared favorites, group chat.', glyph: 'crew',   tone: 'primary',   badge: 'Most popular' },
  { id: 'family', title: 'Family', sub: 'Adults + kids on one timeline. Roles per traveler.',      glyph: 'family', tone: 'accent' },
];

function CrewStep({ go, back, total, mode, setMode }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={3} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Step 04 · Travel mode"
          title={<>Solo or <span className="onb-accent">crew</span>?</>}
          sub="Sets how we lay out itineraries and permissions. Change it any time from settings."
          delay={1}
        />
      </div>

      <div style={{ flex: 1, padding: '22px 24px 150px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        {MODES.map((m, i) => {
          const on = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`onb-anim onb-anim-${Math.min(i + 2, 4)}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 18,
                background: on ? 'hsl(var(--primary) / 0.10)' : 'rgba(255,255,255,0.03)',
                border: '1px solid ' + (on ? 'hsl(var(--primary) / 0.85)' : 'rgba(255,255,255,0.08)'),
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 220ms var(--ease-out-expo)',
                boxShadow: on ? '0 12px 30px -12px hsl(var(--primary) / 0.4)' : 'none',
              }}
            >
              <span style={{
                width: 44, height: 44, borderRadius: 12,
                background: on ? 'hsl(var(--primary))' : `hsl(var(--${m.tone}) / 0.18)`,
                color: on ? 'hsl(var(--primary-foreground))' : `hsl(var(--${m.tone === 'primary' ? 'primary-light' : m.tone === 'secondary' ? 'co-blue-light' : 'accent'}))`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 220ms, color 220ms',
              }}>
                <Glyph name={m.glyph} size={22} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ font: '700 17px/1 var(--font-display)', letterSpacing: '-0.01em', color: 'white' }}>{m.title}</span>
                  {m.badge && (
                    <span style={{
                      padding: '3px 8px', borderRadius: 999,
                      background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))',
                      font: '700 9px/1 var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                    }}>{m.badge}</span>
                  )}
                </div>
                <div style={{ font: '400 12px/1.4 var(--font-body)', color: 'rgba(255,255,255,0.62)', marginTop: 5 }}>{m.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: on ? 'hsl(var(--primary))' : 'transparent',
                border: '2px solid ' + (on ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.22)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'hsl(var(--primary-foreground))', flexShrink: 0,
                transition: 'background 220ms, border-color 220ms',
              }}>
                {on && <Check size={11} />}
              </div>
            </button>
          );
        })}
      </div>

      <OnbFooter
        primaryLabel="Continue"
        onPrimary={() => go(4)}
        disabled={!mode}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 5 · Notifications — joy-card central + status-pill rows
// ─────────────────────────────────────────────────────────────
const NOTIFY_ROWS = [
  { title: 'Crew polls',            sub: 'Vote, lock in, daily 6pm summary',           tone: 'Live' },
  { title: 'Booking confirmations', sub: 'Receipts, calendar invites, .ics files',     tone: 'Always' },
  { title: 'Schedule changes',      sub: 'Weather, capacity, time shifts from providers', tone: 'Smart' },
];

function NotifyStep({ go, back, total }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={4} total={total} onBack={back} />

      <div style={{ flex: 1, padding: '24px 24px 150px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflowY: 'auto' }}>

        {/* hero bell icon with primary→accent gradient (matches landing accent gradient) */}
        <div className="onb-anim" style={{
          position: 'relative', width: 96, height: 96, borderRadius: 28,
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(var(--primary-foreground))',
          boxShadow: '0 24px 50px -12px hsl(var(--primary) / 0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
          marginBottom: 22,
        }}>
          <Bell size={42} />
          <span style={{
            position: 'absolute', top: -4, right: -4,
            width: 20, height: 20, borderRadius: '50%',
            background: 'hsl(var(--accent))', color: 'white',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            font: '700 11px/1 var(--font-body)',
            border: '2px solid hsl(var(--background))',
            boxShadow: '0 0 12px hsl(var(--accent) / 0.6)',
          }}>3</span>
        </div>

        <div className="onb-anim onb-anim-1" style={{
          font: '600 10px/1 var(--font-body)', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'hsl(var(--primary))', marginBottom: 10,
        }}>Step 05 · Notifications</div>

        <h2 className="onb-anim onb-anim-2" style={{ margin: 0, font: '700 26px/1.08 var(--font-display)', letterSpacing: '-0.03em', color: 'white', maxWidth: '15ch', textWrap: 'balance' }}>
          <span className="onb-accent">Live</span> updates from your trip.
        </h2>
        <p className="onb-anim onb-anim-3" style={{ margin: '12px 0 0', font: '400 13px/1.55 var(--font-body)', color: 'rgba(255,255,255,0.7)', maxWidth: '32ch' }}>
          Crew polls, schedule changes, on-the-ground notes from your guide. Always silenced overnight.
        </p>

        {/* joy-card with rows */}
        <div className="onb-anim onb-anim-3" style={{
          marginTop: 22, width: '100%',
          padding: '14px 16px', borderRadius: 16,
          background: 'hsl(215 50% 11% / 0.85)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid hsl(var(--co-stroke))',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left',
        }}>
          {NOTIFY_ROWS.map(r => (
            <div key={r.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 2,
              }}><Check size={10} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                  <div style={{ font: '600 13px/1.2 var(--font-body)', color: 'white' }}>{r.title}</div>
                  <span className="onb-status-pill" style={{ padding: '3px 8px', fontSize: 8 }}>
                    <span className="dot" />
                    {r.tone}
                  </span>
                </div>
                <div style={{ font: '400 11.5px/1.4 var(--font-body)', color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OnbFooter
        primaryLabel="Turn on notifications"
        onPrimary={() => go(5)}
        secondaryLabel="Not now"
        onSecondary={() => go(5)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 6 · You're in — bookend marquee + first-trip preview
// ─────────────────────────────────────────────────────────────
function DoneStep({ go, total, picks, picked, mode }) {
  const modeLabel = (mode || 'crew')[0].toUpperCase() + (mode || 'crew').slice(1);
  const picksShort = picks.length
    ? picks.slice(0, 3).join(' · ') + (picks.length > 3 ? `  +${picks.length - 3}` : '')
    : '4 picked';

  return (
    <OnbChrome radialGlow>
      <OnbHeader step={5} total={total} />

      {/* TOP bookend marquee (mirrors Welcome) */}
      <div className="onb-anim" style={{ marginTop: 8 }}>
        <OnbMarquee photos={HERO_LOOP_TOP} row="top" />
      </div>

      <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <span className="onb-hero-badge onb-anim onb-anim-1" style={{ marginBottom: 14 }}>
          <span className="pill" style={{ background: 'hsl(var(--accent))', color: 'white' }}>Done</span>
          <span className="note">You're in.</span>
        </span>

        <h2 className="onb-anim onb-anim-2" style={{
          margin: 0, font: '700 28px/1.02 var(--font-display)',
          letterSpacing: '-0.03em', color: 'white', maxWidth: '15ch', textWrap: 'balance',
        }}>
          Drafting your <span className="onb-accent">first</span> trip…
        </h2>

        {/* loading bar matching landing-page primary→accent gradient */}
        <div className="onb-anim onb-anim-3" style={{ marginTop: 16, width: 200, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.18)', overflow: 'hidden' }}>
          <div style={{
            width: '62%', height: '100%',
            background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
            borderRadius: 2,
            boxShadow: '0 0 12px hsl(var(--primary) / 0.7)',
          }} />
        </div>

        {/* summary chips — landing partner-strip rhythm */}
        <div className="onb-anim onb-anim-3" style={{ marginTop: 22, width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { lbl: 'Destination', val: picked || 'Aspen' },
            { lbl: 'Interests',   val: picksShort },
            { lbl: 'Travel mode', val: modeLabel },
          ].map(r => (
            <div key={r.lbl} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '9px 14px', borderRadius: 12,
              background: 'hsl(215 60% 6% / 0.55)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}>
              <span style={{ font: '500 10px/1 var(--font-body)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', flexShrink: 0 }}>{r.lbl}</span>
              <span style={{ font: '600 13px/1 var(--font-body)', color: 'white', textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: 12 }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM bookend marquee */}
      <div className="onb-anim onb-anim-1" style={{ marginBottom: 132 }}>
        <OnbMarquee photos={HERO_LOOP_BOT} row="bot" />
      </div>

      <OnbFooter
        primaryLabel="Open the app"
        onPrimary={() => go(0)}
        secondaryLabel="Edit my picks"
        onSecondary={() => go(1)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// Flow controller
// ─────────────────────────────────────────────────────────────
function OnboardingFlow() {
  const [step, setStep] = React.useState(0);
  const [picks, setPicks] = React.useState(['Hiking', 'Camping', 'Hot springs']);
  const [picked, setPicked] = React.useState('Aspen');
  const [mode, setMode] = React.useState('crew');

  const go = (s) => setStep(s);
  const back = () => setStep(Math.max(0, step - 1));
  const total = STEPS.length;

  const screens = [
    <WelcomeStep go={go} total={total} />,
    <InterestsStep go={go} back={back} total={total} picks={picks} setPicks={setPicks} />,
    <WhereStep go={go} back={back} total={total} picked={picked} setPicked={setPicked} />,
    <CrewStep go={go} back={back} total={total} mode={mode} setMode={setMode} />,
    <NotifyStep go={go} back={back} total={total} />,
    <DoneStep go={go} back={back} total={total} picks={picks} picked={picked} mode={mode} />,
  ];

  return screens[step];
}

Object.assign(window, {
  OnboardingFlow, STEPS,
  WelcomeStep, InterestsStep, WhereStep, CrewStep, NotifyStep, DoneStep,
  OnbChrome, OnbHeader, OnbFooter, StepTitle, OnbMarquee,
});
