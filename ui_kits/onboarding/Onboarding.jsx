/* global React, IMG, ChevronLeft, Check, Glyph, Search, Home */
// ============================================================
// ACTZ Onboarding — 8-screen prototype
//   0 Welcome  1 Auth  2 Intent  3 Interests
//   4 Location  5 Planning  6 Social  7 Profile
//
// Layout tokens (locked):
//   screen H-padding:  24px
//   header bar:        42px (+ 54px top paddingTop in OnbChrome)
//   footer reserved:   ~150px (52px primary + 40px sec + 38px safe area + 20px gap)
//   marquee height:    112px
// ============================================================

const STEPS = ['welcome','auth','intent','interests','location','planning','social','profile'];

const HERO_LOOP_TOP = ['hero-01.webp','hero-04.webp','hero-08.webp','hero-03.webp','hero-06.webp','hero-02.webp'];
const HERO_LOOP_BOT = ['hero-05.webp','hero-07.webp','hero-02.webp','hero-06.webp','hero-01.webp','hero-04.webp'];

// ─────────────────────────────────────────────────────────────
// Shared primitives (unchanged from previous version)
// ─────────────────────────────────────────────────────────────
function OnbMarquee({ photos, row = 'top' }) {
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
          background: 'radial-gradient(60% 50% at 50% 35%, hsl(var(--primary) / 0.12) 0%, transparent 60%), radial-gradient(60% 50% at 80% 20%, hsl(var(--secondary) / 0.08) 0%, transparent 60%)',
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
  const counter  = light ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)';
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
        {String(step + 1).padStart(2,'0')}<span style={{ opacity: 0.5 }}>/{String(total).padStart(2,'0')}</span>
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
          background: 'transparent', color: 'rgba(255,255,255,0.6)',
          border: 0, cursor: 'pointer',
          font: '500 13px/1 var(--font-body)',
        }}>{secondaryLabel}</button>
      ) : <div style={{ height: 16 }} />}
    </div>
  );
}

function StepTitle({ eyebrow, title, sub, eyebrowColor = 'hsl(var(--primary))', delay = 1 }) {
  return (
    <div style={{ padding: '18px 24px 0' }}>
      {eyebrow && (
        <div className={`onb-anim onb-anim-${delay}`} style={{
          font: '600 10px/1 var(--font-body)', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: eyebrowColor, marginBottom: 10,
          display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
        }}>
          <span style={{ width: 14, height: 1, background: eyebrowColor, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap' }}>{eyebrow}</span>
        </div>
      )}
      <h2 className={`onb-anim onb-anim-${delay + 1}`} style={{
        margin: 0, font: '700 26px/1.05 var(--font-display)',
        letterSpacing: '-0.03em', color: 'white',
        textWrap: 'balance', maxWidth: '18ch',
      }}>{title}</h2>
      {sub && (
        <p className={`onb-anim onb-anim-${delay + 2}`} style={{ margin: '8px 0 0', font: '400 13px/1.5 var(--font-body)', color: 'rgba(255,255,255,0.62)', maxWidth: '34ch' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Inline brand icons for the auth step
// ─────────────────────────────────────────────────────────────
function AuthIconSVG({ name }) {
  if (name === 'apple') return (
    <svg width="14" height="16" viewBox="0 0 814 1000" fill="#000" aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164.8-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-99.8C82.6 697.5 26.4 583 26.4 479.1c0-166.1 108.2-254.1 214.1-254.1 60.3 0 110.6 37.9 149.5 37.9 37.3 0 95.8-40.1 164.1-40.1 26.4 0 108.2 2.6 168.1 80.6zm-80.6-125.7C673.5 79.8 619.2 32 568.4 32c-6.4 0-12.8.6-19.2 1.9-1.3 6.4-1.9 12.8-1.9 19.2 0 67.2 50.2 109.6 98.5 135.3 42.9 23.1 89.8 36.5 138.7 36.5 6.4 0 12.8-.6 19.2-1.9-7.1-67.2-56-128.6-98.3-168.4z"/>
    </svg>
  );
  if (name === 'google') return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
  if (name === 'email') return (
    <svg width="16" height="13" viewBox="0 0 24 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="15" rx="2"/>
      <polyline points="2,3 12,11 22,3"/>
    </svg>
  );
  return (
    <svg width="13" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.06 6.06l1.1-1.1a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 0 · Welcome
// ─────────────────────────────────────────────────────────────
function WelcomeStep({ go, total }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={0} total={total} />

      <div className="onb-anim" style={{ marginTop: 8 }}>
        <OnbMarquee photos={HERO_LOOP_TOP} row="top" />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', textAlign: 'center', alignItems: 'center' }}>
        <span className="onb-hero-badge onb-anim onb-anim-1" style={{ marginBottom: 16 }}>
          <span className="pill">New</span>
          <span className="note">Colorado-born. Nationwide.</span>
        </span>

        <h1 className="onb-anim onb-anim-2" style={{
          margin: 0, font: '700 22px/1.15 var(--font-display)',
          letterSpacing: '-0.03em', color: 'white',
          textWrap: 'balance', maxWidth: '18ch',
        }}>
          Find things to do, people to go with, and{' '}
          <span className="onb-accent">trips worth remembering.</span>
        </h1>

        <p className="onb-anim onb-anim-3" style={{
          margin: '12px 0 0', font: '400 13px/1.6 var(--font-body)',
          color: 'rgba(255,255,255,0.72)', maxWidth: '28ch',
        }}>
          Discover activities, plan trips, join events, save ideas, and connect with people who want to experience more.
        </p>
      </div>

      <div className="onb-anim onb-anim-1" style={{ marginBottom: 132 }}>
        <OnbMarquee photos={HERO_LOOP_BOT} row="bot" />
      </div>

      <OnbFooter
        primaryLabel="Get started"
        onPrimary={() => go(1)}
        secondaryLabel="Browse first"
        onSecondary={() => go(2)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 1 · Sign Up / Login
// ─────────────────────────────────────────────────────────────
const AUTH_BTNS = [
  { key: 'apple',  label: 'Continue with Apple',  bg: '#ffffff',                  color: '#000000', border: 'transparent',           shadow: '0 2px 10px rgba(0,0,0,0.35)' },
  { key: 'google', label: 'Continue with Google', bg: 'rgba(255,255,255,0.06)',   color: '#ffffff', border: 'rgba(255,255,255,0.14)', shadow: 'none' },
  { key: 'email',  label: 'Continue with email',  bg: 'rgba(255,255,255,0.05)',   color: '#ffffff', border: 'rgba(255,255,255,0.12)', shadow: 'none' },
  { key: 'phone',  label: 'Continue with phone',  bg: 'rgba(255,255,255,0.05)',   color: '#ffffff', border: 'rgba(255,255,255,0.12)', shadow: 'none' },
];

function AuthStep({ go, back, total }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={1} total={total} onBack={back} />

      <div style={{ flex: 1, padding: '6px 24px 160px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* badge */}
        <div className="onb-anim" style={{ textAlign: 'center', marginBottom: 22 }}>
          <span className="onb-hero-badge" style={{ display: 'inline-flex' }}>
            <span className="pill">ACTZ</span>
            <span className="note">Adventure awaits.</span>
          </span>
        </div>

        <h2 className="onb-anim onb-anim-1" style={{ margin: '0 0 10px', font: '700 25px/1.05 var(--font-display)', letterSpacing: '-0.03em', color: 'white', textWrap: 'balance' }}>
          Create your ACTZ account
        </h2>
        <p className="onb-anim onb-anim-2" style={{ margin: '0 0 24px', font: '400 13px/1.55 var(--font-body)', color: 'rgba(255,255,255,0.62)', maxWidth: '34ch' }}>
          Save your preferences, build itineraries, join events, and keep your plans in one place.
        </p>

        <div className="onb-anim onb-anim-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AUTH_BTNS.map(btn => (
            <button key={btn.key} onClick={() => go(2)} style={{
              width: '100%', height: 50, borderRadius: 999,
              background: btn.bg, color: btn.color,
              border: `1px solid ${btn.border}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              font: '600 14px/1 var(--font-body)', letterSpacing: '-0.005em',
              cursor: 'pointer', boxShadow: btn.shadow,
              transition: 'opacity 180ms, transform 180ms var(--ease-out-expo)',
            }}>
              <AuthIconSVG name={btn.key} />
              {btn.label}
            </button>
          ))}
        </div>

        {/* divider */}
        <div className="onb-anim onb-anim-3" style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ font: '500 11px/1 var(--font-body)', color: 'rgba(255,255,255,0.35)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div className="onb-anim onb-anim-3" style={{ textAlign: 'center', marginTop: 16 }}>
          <button onClick={() => go(2)} style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)',
            font: '500 13px/1 var(--font-body)', cursor: 'pointer', letterSpacing: '-0.005em',
          }}>
            Already have an account?{' '}
            <span style={{ color: 'hsl(var(--co-blue-light))' }}>Log in</span>
          </button>
        </div>
      </div>

      {/* browse-first escape */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 24px 38px',
        background: 'linear-gradient(180deg, transparent 0%, hsl(215 60% 5% / 0.96) 38%, hsl(215 60% 5%) 100%)',
        zIndex: 4,
      }}>
        <button onClick={() => go(2)} style={{
          width: '100%', height: 40, background: 'transparent',
          color: 'rgba(255,255,255,0.42)', border: 'none', cursor: 'pointer',
          font: '500 13px/1 var(--font-body)',
        }}>Browse first</button>
      </div>
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 · Intent
// ─────────────────────────────────────────────────────────────
const INTENT_OPTIONS = [
  { id: 'activities', label: 'Find activities nearby',   sub: 'Discover things to do around me',        glyph: 'compass'   },
  { id: 'plan',       label: 'Plan a trip',              sub: 'Build itineraries for upcoming travel',  glyph: 'calendar'  },
  { id: 'meet',       label: 'Meet people for events',   sub: 'Group activities, events, run clubs',    glyph: 'crew'      },
  { id: 'save',       label: 'Save places and ideas',    sub: 'Build a wishlist you can act on later',  glyph: 'bookmark'  },
  { id: 'host',       label: 'Host an event',            sub: 'Organize activities for others',         glyph: 'megaphone' },
  { id: 'business',   label: 'List my business',         sub: 'Offer activities, tours, or lodging',    glyph: 'briefcase' },
  { id: 'browse',     label: 'Just browsing',            sub: 'Show me what ACTZ is about',             glyph: 'eye'       },
];

function IntentStep({ go, back, total, intent, setIntent }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={2} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Intent"
          title={<>What brings you to <span className="onb-accent">ACTZ?</span></>}
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '12px 24px 150px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {INTENT_OPTIONS.map((opt, i) => {
          const on = intent === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setIntent(opt.id)}
              className={`onb-anim onb-anim-${Math.min(i + 1, 4)}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 14px', borderRadius: 16,
                background: on ? 'hsl(var(--primary) / 0.10)' : 'rgba(255,255,255,0.03)',
                border: '1px solid ' + (on ? 'hsl(var(--primary) / 0.85)' : 'rgba(255,255,255,0.08)'),
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 220ms var(--ease-out-expo)',
                boxShadow: on ? '0 8px 24px -10px hsl(var(--primary) / 0.4)' : 'none',
              }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: 11,
                background: on ? 'hsl(var(--primary))' : 'hsl(var(--secondary) / 0.14)',
                color: on ? 'hsl(var(--primary-foreground))' : 'hsl(var(--co-blue-light))',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 220ms, color 220ms',
              }}>
                <Glyph name={opt.glyph} size={19} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '600 13.5px/1.2 var(--font-display)', letterSpacing: '-0.01em', color: 'white' }}>{opt.label}</div>
                <div style={{ font: '400 11px/1.4 var(--font-body)', color: 'rgba(255,255,255,0.52)', marginTop: 3 }}>{opt.sub}</div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: on ? 'hsl(var(--primary))' : 'transparent',
                border: '2px solid ' + (on ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.22)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'hsl(var(--primary-foreground))',
                transition: 'background 220ms, border-color 220ms',
              }}>
                {on && <Check size={10} />}
              </div>
            </button>
          );
        })}
      </div>
      <OnbFooter
        primaryLabel={intent ? 'Continue' : 'Select one to continue'}
        onPrimary={() => go(3)}
        disabled={!intent}
        secondaryLabel="Skip"
        onSecondary={() => go(3)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 3 · Interests
// ─────────────────────────────────────────────────────────────
const INTEREST_CATS = [
  { label: 'Outdoor Adventure',   glyph: 'mountain'  },
  { label: 'Tours & Sightseeing', glyph: 'compass'   },
  { label: 'Food & Drink',        glyph: 'utensils'  },
  { label: 'Events & Concerts',   glyph: 'music'     },
  { label: 'Fitness / Run Clubs', glyph: 'running'   },
  { label: 'Sports',              glyph: 'activity'  },
  { label: 'Camping',             glyph: 'tent'      },
  { label: 'Ski / Winter Sports', glyph: 'snowflake' },
  { label: 'Water Sports',        glyph: 'waves'     },
  { label: 'Family Friendly',     glyph: 'family'    },
  { label: 'Hidden Gems',         glyph: 'sparkles'  },
  { label: 'Wellness',            glyph: 'droplet'   },
  { label: 'Nightlife',           glyph: 'moon'      },
  { label: 'Transportation',      glyph: 'car'       },
  { label: 'Lodging',             glyph: 'hotel'     },
];

function InterestsStep({ go, back, total, picks, setPicks }) {
  const toggle = l => setPicks(picks.includes(l) ? picks.filter(p => p !== l) : [...picks, l]);
  const MIN = 3;
  const enough = picks.length >= MIN;
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={3} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Interests"
          title={<>What are you <span className="onb-accent">into?</span></>}
          sub={`Pick at least ${MIN}. Your feed, map, and AI itineraries rank against what you like.`}
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '14px 24px 150px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {INTEREST_CATS.map(({ label, glyph }) => {
            const on = picks.includes(label);
            return (
              <button key={label} className="onb-genre-pill" data-on={on} onClick={() => toggle(label)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', color: on ? 'hsl(var(--primary-foreground))' : 'hsl(var(--co-blue-light))' }}>
                  <Glyph name={glyph} size={14} />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
        {picks.length > 0 && (
          <div style={{ marginTop: 14, font: '500 10px/1 var(--font-body)', letterSpacing: '0.16em', textTransform: 'uppercase', color: enough ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            {enough ? `${picks.length} selected · good to go` : `${picks.length} of ${MIN} required`}
          </div>
        )}
      </div>
      <OnbFooter
        primaryLabel={enough ? `Continue · ${picks.length} picked` : (picks.length ? `Pick ${MIN - picks.length} more` : `Pick at least ${MIN}`)}
        onPrimary={() => go(4)}
        disabled={!enough}
        secondaryLabel="Skip for now"
        onSecondary={() => go(4)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 4 · Location
// ─────────────────────────────────────────────────────────────
const LOCATION_OPTIONS = [
  { id: 'current',     label: 'Use current location',     sub: 'GPS · auto-updates as you move',         glyph: 'crosshair' },
  { id: 'home',        label: 'Choose home city',         sub: 'Set your base for recommendations',      glyph: 'home-pin'  },
  { id: 'destination', label: 'Add upcoming destination', sub: "Plan ahead for where you're headed",     glyph: 'plane'     },
  { id: 'skip',        label: 'Skip for now',             sub: 'Set this from your profile anytime',     glyph: 'eye-off'   },
];

function LocationStep({ go, back, total, locationChoice, setLocationChoice }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={4} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Location"
          title={<>Where should ACTZ <span className="onb-accent">personalize?</span></>}
          sub="Powers your feed, map, itinerary generator, and recommendations."
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '18px 24px 150px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        {LOCATION_OPTIONS.map((opt, i) => {
          const on = locationChoice === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setLocationChoice(opt.id)}
              className={`onb-anim onb-anim-${Math.min(i + 2, 4)}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '15px 17px', borderRadius: 18,
                background: on ? 'hsl(var(--secondary) / 0.10)' : 'rgba(255,255,255,0.03)',
                border: '1px solid ' + (on ? 'hsl(var(--secondary) / 0.8)' : 'rgba(255,255,255,0.08)'),
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 220ms var(--ease-out-expo)',
                boxShadow: on ? '0 12px 30px -12px hsl(var(--secondary) / 0.4)' : 'none',
              }}
            >
              <span style={{
                width: 44, height: 44, borderRadius: 13,
                background: on ? 'hsl(var(--secondary))' : 'hsl(var(--secondary) / 0.14)',
                color: on ? 'white' : 'hsl(var(--co-blue-light))',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 220ms, color 220ms',
              }}>
                <Glyph name={opt.glyph} size={22} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '700 15px/1.1 var(--font-display)', letterSpacing: '-0.01em', color: 'white' }}>{opt.label}</div>
                <div style={{ font: '400 11.5px/1.4 var(--font-body)', color: 'rgba(255,255,255,0.58)', marginTop: 4 }}>{opt.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: on ? 'hsl(var(--secondary))' : 'transparent',
                border: '2px solid ' + (on ? 'hsl(var(--secondary))' : 'rgba(255,255,255,0.22)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                transition: 'background 220ms, border-color 220ms',
              }}>
                {on && <Check size={11} />}
              </div>
            </button>
          );
        })}
      </div>
      <OnbFooter
        primaryLabel={locationChoice ? 'Continue' : 'Choose an option'}
        onPrimary={() => go(5)}
        disabled={!locationChoice}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 5 · Planning style  (multi-select — checkbox UX)
// ─────────────────────────────────────────────────────────────
const PLAN_OPTS = [
  { id: 'spontaneous', label: 'Spontaneous nearby ideas', glyph: 'zap'        },
  { id: 'planned',     label: 'Planned itineraries',      glyph: 'list-check' },
  { id: 'ai',          label: 'AI-generated trips',       glyph: 'bot'        },
  { id: 'group',       label: 'Group activities',         glyph: 'crew'       },
  { id: 'private',     label: 'Private experiences',      glyph: 'lock'       },
  { id: 'budget',      label: 'Budget-friendly',          glyph: 'wallet'     },
  { id: 'premium',     label: 'Premium / VIP',            glyph: 'crown'      },
];

function PlanStyleStep({ go, back, total, planStyles, setPlanStyles }) {
  const toggle = id => setPlanStyles(planStyles.includes(id) ? planStyles.filter(s => s !== id) : [...planStyles, id]);
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={5} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Planning style"
          title={<>How do you like to <span className="onb-accent">explore?</span></>}
          sub="Select all that apply — shapes your recommendations."
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '14px 24px 150px', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        {PLAN_OPTS.map((opt, i) => {
          const on = planStyles.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`onb-anim onb-anim-${Math.min(i + 1, 4)}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 13,
                padding: '13px 15px', borderRadius: 15,
                background: on ? 'hsl(var(--accent) / 0.10)' : 'rgba(255,255,255,0.03)',
                border: '1px solid ' + (on ? 'hsl(var(--accent) / 0.7)' : 'rgba(255,255,255,0.08)'),
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 220ms var(--ease-out-expo)',
                boxShadow: on ? '0 8px 20px -10px hsl(var(--accent) / 0.35)' : 'none',
              }}
            >
              <span style={{
                width: 38, height: 38, borderRadius: 11,
                background: on ? 'hsl(var(--accent))' : 'hsl(var(--accent) / 0.14)',
                color: on ? 'hsl(var(--accent-foreground))' : 'hsl(var(--co-red-light))',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, transition: 'background 220ms, color 220ms',
              }}>
                <Glyph name={opt.glyph} size={19} />
              </span>
              <div style={{ flex: 1, font: '600 14px/1 var(--font-display)', letterSpacing: '-0.01em', color: 'white' }}>
                {opt.label}
              </div>
              {/* square checkbox for multi-select */}
              <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: on ? 'hsl(var(--accent))' : 'transparent',
                border: '2px solid ' + (on ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.22)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'hsl(var(--accent-foreground))',
                transition: 'background 220ms, border-color 220ms',
              }}>
                {on && <Check size={10} />}
              </div>
            </button>
          );
        })}
      </div>
      <OnbFooter
        primaryLabel={planStyles.length ? `Continue · ${planStyles.length} picked` : 'Select your style'}
        onPrimary={() => go(6)}
        disabled={planStyles.length === 0}
        secondaryLabel="Skip"
        onSecondary={() => go(6)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 6 · Social preference
// ─────────────────────────────────────────────────────────────
const SOCIAL_OPTS = [
  { id: 'public',   label: 'Yes, show me public group activities',  sub: 'See who else is going, join open events',  tone: 'secondary' },
  { id: 'friends',  label: 'Friends / friends-of-friends only',     sub: 'Social discovery with guardrails',         tone: 'secondary' },
  { id: 'maybe',    label: 'Maybe later',                           sub: "I'll decide in app settings",              tone: 'accent'    },
  { id: 'no',       label: 'No, I prefer private planning',         sub: 'Keep my activity to myself',               tone: 'accent'    },
];

function SocialStep({ go, back, total, socialPref, setSocialPref }) {
  return (
    <OnbChrome radialGlow>
      <OnbHeader step={6} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Social preference"
          title={<>Show <span className="onb-accent">social</span> group experiences?</>}
          sub="Sets your default discovery mode. Change it anytime in settings."
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '18px 24px 150px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        {SOCIAL_OPTS.map((opt, i) => {
          const on = socialPref === opt.id;
          const isSec = opt.tone === 'secondary';
          const colorOn    = isSec ? 'hsl(var(--secondary))'          : 'hsl(var(--accent))';
          const bgOn       = isSec ? 'hsl(var(--secondary) / 0.10)'   : 'hsl(var(--accent) / 0.10)';
          const borderOn   = isSec ? 'hsl(var(--secondary) / 0.8)'    : 'hsl(var(--accent) / 0.75)';
          return (
            <button
              key={opt.id}
              onClick={() => setSocialPref(opt.id)}
              className={`onb-anim onb-anim-${Math.min(i + 2, 4)}`}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '15px 17px', borderRadius: 18,
                background: on ? bgOn : 'rgba(255,255,255,0.03)',
                border: '1px solid ' + (on ? borderOn : 'rgba(255,255,255,0.08)'),
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 220ms var(--ease-out-expo)',
                boxShadow: on ? '0 12px 30px -12px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '600 13.5px/1.25 var(--font-display)', letterSpacing: '-0.01em', color: 'white' }}>{opt.label}</div>
                <div style={{ font: '400 11.5px/1.45 var(--font-body)', color: 'rgba(255,255,255,0.55)', marginTop: 5 }}>{opt.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                background: on ? colorOn : 'transparent',
                border: '2px solid ' + (on ? colorOn : 'rgba(255,255,255,0.22)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                transition: 'background 220ms, border-color 220ms',
              }}>
                {on && <Check size={11} />}
              </div>
            </button>
          );
        })}
      </div>
      <OnbFooter
        primaryLabel={socialPref ? 'Continue' : 'Choose one'}
        onPrimary={() => go(7)}
        disabled={!socialPref}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 7 · Profile starter
// ─────────────────────────────────────────────────────────────
const TRAVEL_BADGES = ['Spontaneous Explorer', 'Detail Planner', 'Adventure Seeker', 'Culture Lover', 'Weekend Warrior'];
const LANG_OPTS     = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese'];

function ProfileStep({ go, back, total, displayName, setDisplayName }) {
  const [bio,      setBio]      = React.useState('');
  const [hometown, setHometown] = React.useState('');
  const [langs,    setLangs]    = React.useState(['English']);
  const [badge,    setBadge]    = React.useState(null);

  const toggleLang = l => setLangs(langs.includes(l) ? langs.filter(x => x !== l) : [...langs, l]);

  const input = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px', borderRadius: 13,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white', font: '400 14px/1 var(--font-body)',
    outline: 'none', WebkitAppearance: 'none',
  };
  const labelStyle = {
    font: '600 9px/1 var(--font-body)', letterSpacing: '0.2em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)',
    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7,
  };
  const fieldWrap = { display: 'flex', flexDirection: 'column' };

  return (
    <OnbChrome radialGlow>
      <OnbHeader step={7} total={total} onBack={back} />
      <div className="onb-anim onb-anim-1">
        <StepTitle
          eyebrow="Profile"
          title="Set up your ACTZ profile."
          sub="Only your display name is required — add everything else later."
          delay={1}
        />
      </div>
      <div style={{ flex: 1, padding: '16px 24px 162px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>

        {/* Avatar + name row */}
        <div className="onb-anim onb-anim-2" style={{ display: 'flex', alignItems: 'flex-end', gap: 14 }}>
          <button style={{
            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
            border: '2px dashed rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.4)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
            cursor: 'pointer',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            <span style={{ font: '500 8px/1 var(--font-body)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Photo</span>
          </button>
          <div style={{ ...fieldWrap, flex: 1 }}>
            <div style={labelStyle}>
              Display name
              <span style={{ background: 'hsl(var(--accent))', color: 'white', padding: '2px 6px', borderRadius: 999, font: '700 7px/1 var(--font-body)', letterSpacing: '0.1em' }}>Required</span>
            </div>
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="How should we address you?"
              style={input}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="onb-anim onb-anim-2" style={fieldWrap}>
          <div style={labelStyle}>Short bio <span style={{ fontWeight: 400, opacity: 0.7 }}>optional</span></div>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="What do you love to explore?"
            rows={2}
            style={{ ...input, resize: 'none', lineHeight: '1.5', paddingTop: 12 }}
          />
        </div>

        {/* Hometown */}
        <div className="onb-anim onb-anim-3" style={fieldWrap}>
          <div style={labelStyle}>Hometown <span style={{ fontWeight: 400, opacity: 0.7 }}>optional</span></div>
          <input
            value={hometown}
            onChange={e => setHometown(e.target.value)}
            placeholder="City, State"
            style={input}
          />
        </div>

        {/* Languages */}
        <div className="onb-anim onb-anim-3" style={fieldWrap}>
          <div style={labelStyle}>Languages <span style={{ fontWeight: 400, opacity: 0.7 }}>optional</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {LANG_OPTS.map(l => {
              const on = langs.includes(l);
              return (
                <button key={l} onClick={() => toggleLang(l)} style={{
                  padding: '7px 12px', borderRadius: 999,
                  background: on ? 'hsl(var(--secondary) / 0.14)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid ' + (on ? 'hsl(var(--secondary) / 0.6)' : 'rgba(255,255,255,0.10)'),
                  color: on ? 'hsl(var(--co-blue-light))' : 'rgba(255,255,255,0.62)',
                  font: '500 12px/1 var(--font-body)',
                  cursor: 'pointer', transition: 'all 200ms var(--ease-out-expo)',
                }}>{l}</button>
              );
            })}
          </div>
        </div>

        {/* Travel style badge */}
        <div className="onb-anim onb-anim-4" style={fieldWrap}>
          <div style={labelStyle}>Travel style badge <span style={{ fontWeight: 400, opacity: 0.7 }}>optional</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {TRAVEL_BADGES.map(b => {
              const on = badge === b;
              return (
                <button key={b} onClick={() => setBadge(on ? null : b)} style={{
                  padding: '10px 14px', borderRadius: 12, textAlign: 'left',
                  background: on ? 'hsl(var(--primary) / 0.10)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid ' + (on ? 'hsl(var(--primary) / 0.7)' : 'rgba(255,255,255,0.08)'),
                  color: on ? 'white' : 'rgba(255,255,255,0.62)',
                  font: '500 13px/1 var(--font-body)',
                  cursor: 'pointer', transition: 'all 200ms var(--ease-out-expo)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  {b}
                  {on && (
                    <span style={{
                      padding: '3px 8px', borderRadius: 999, flexShrink: 0,
                      background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))',
                      font: '700 8px/1 var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>Selected</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <OnbFooter
        primaryLabel={displayName.trim() ? 'Enter ACTZ →' : 'Add your name to continue'}
        onPrimary={() => go(0)}
        disabled={!displayName.trim()}
        secondaryLabel="Skip profile for now"
        onSecondary={() => go(0)}
      />
    </OnbChrome>
  );
}

// ─────────────────────────────────────────────────────────────
// Flow controller (standalone)
// ─────────────────────────────────────────────────────────────
function OnboardingFlow() {
  const [step,          setStep]         = React.useState(0);
  const [intent,        setIntent]       = React.useState(null);
  const [picks,         setPicks]        = React.useState([]);
  const [locationChoice,setLoc]          = React.useState(null);
  const [planStyles,    setPlanStyles]   = React.useState([]);
  const [socialPref,    setSocialPref]   = React.useState(null);
  const [displayName,   setDisplayName]  = React.useState('');

  const go   = s => setStep(s);
  const back = () => setStep(Math.max(0, step - 1));
  const total = STEPS.length;

  const screens = [
    <WelcomeStep   go={go}                                                          total={total} />,
    <AuthStep      go={go} back={back}                                              total={total} />,
    <IntentStep    go={go} back={back} intent={intent}   setIntent={setIntent}      total={total} />,
    <InterestsStep go={go} back={back} picks={picks}     setPicks={setPicks}        total={total} />,
    <LocationStep  go={go} back={back} locationChoice={locationChoice} setLocationChoice={setLoc} total={total} />,
    <PlanStyleStep go={go} back={back} planStyles={planStyles} setPlanStyles={setPlanStyles}       total={total} />,
    <SocialStep    go={go} back={back} socialPref={socialPref} setSocialPref={setSocialPref}       total={total} />,
    <ProfileStep   go={go} back={back} displayName={displayName} setDisplayName={setDisplayName}  total={total} />,
  ];

  return screens[Math.min(step, screens.length - 1)];
}

Object.assign(window, {
  OnboardingFlow, STEPS,
  WelcomeStep, AuthStep, IntentStep, InterestsStep,
  LocationStep, PlanStyleStep, SocialStep, ProfileStep,
  OnbChrome, OnbHeader, OnbFooter, StepTitle, OnbMarquee,
  AuthIconSVG,
  INTENT_OPTIONS, INTEREST_CATS, LOCATION_OPTIONS, PLAN_OPTS, SOCIAL_OPTS,
  TRAVEL_BADGES, LANG_OPTS,
});
