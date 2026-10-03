import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { OnlineNowPanel } from "../components/OnlineNowPanel";
import { SupportChatWidget } from "../components/SupportChatWidget";
import { useInView } from "../hooks/useInView";
import { api } from "../lib/api";
import {
  COUNTRIES,
  FEATURED_COUNTRIES,
  GENDER_EMOJI,
  menuItemStyle,
  toPersonCard,
} from "../lib/people";

var Bt = `/assets/1-BhKNAtC1.png`;

function HomePage() {
  let [e, t] = (0, React.useState)(`Woman`),
    [n, r] = (0, React.useState)(`All`),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(!1),
    [c, l] = useInView(),
    u = useNavigate(),
    [d, f] = (0, React.useState)([]),
    [p, m] = (0, React.useState)(!0),
    [h, g] = (0, React.useState)(``),
    _ = (0, React.useCallback)(async () => {
      (m(!0), g(``));
      try {
        f(
          (
            await api.get(`/people?online=true&verified=false&limit=50`)
          ).items.map(toPersonCard),
        );
      } catch (e) {
        g(e.message || `Could not load online members right now.`);
      } finally {
        m(!1);
      }
    }, []);
  (0, React.useEffect)(() => {
    _();
  }, [_]);
  let y = COUNTRIES.filter((e) => e.toLowerCase().includes(i.toLowerCase())),
    b = n === `All` ? d : d.filter((e) => e.country === n);
  return (
    (0, React.useEffect)(() => {
      let e = (e) => {
        e.target.closest(`.country-search-wrapper`) || s(!1);
      };
      return (
        document.addEventListener(`mousedown`, e),
        () => document.removeEventListener(`mousedown`, e)
      );
    }, []),
    (
      <div
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          background: `#F8FAF5`,
          minHeight: `100vh`,
          paddingTop: 68,
        }}
      >
        <Navbar />
        <style>
          {
            "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: all 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n\n        .hero-btn-outline {\n          background: rgba(255,255,255,0.08); color: #74C69D;\n          border: 2px solid #74C69D; padding: 13px 32px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s;\n          backdrop-filter: blur(6px);\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-outline:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n        @keyframes stripRiseIn {\n          from { opacity: 0; transform: translateY(40px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n\n        .seek-btn {\n          flex: 1; padding: 15px 0;\n          background: rgba(255,255,255,0.08);\n          color: rgba(255,255,255,0.75);\n          border: none; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 600;\n          cursor: pointer; transition: all 0.2s;\n        }\n        .seek-btn.active {\n          background: linear-gradient(135deg, #1B3A4B, #2D6A4F);\n          color: #fff;\n        }\n        .seek-btn:first-child { border-radius: 10px 0 0 10px; }\n        .seek-btn:last-child  { border-radius: 0 10px 10px 0; }\n\n        .country-chip {\n          padding: 7px 16px; border-radius: 12px;\n          border: 1.5px solid #B7E4C7; background: #fff;\n          color: #2D6A4F; font-family: 'DM Sans', sans-serif;\n          font-size: 12.5px; font-weight: 600; cursor: pointer;\n          transition: all 0.18s; white-space: nowrap;\n          width: 100%; text-align: left;\n        }\n        .country-chip:hover { background: #F0FAF4; border-color: #40916C; }\n        .country-chip.active {\n          background: linear-gradient(135deg, #1B3A4B, #2D6A4F);\n          color: #fff; border-color: transparent;\n          box-shadow: 0 3px 12px rgba(45,106,79,0.3);\n        }\n\n        /* card hover */\n        .card-hover {\n          transition: transform 0.22s, box-shadow 0.22s;\n          cursor: pointer;\n        }\n        .card-hover:hover {\n          transform: translateY(-4px);\n          box-shadow: 0 12px 36px rgba(45,106,79,0.16) !important;\n        }\n\n        /* member grid — fluid, no fixed columns */\n        .member-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n          gap: 20px;\n          width: 100%;\n        }\n\n        /* scroll area — desktop only */\n        .members-scroll-area {\n          overflow-y: auto;\n          padding-right: 4px;\n        }\n        .members-scroll-area::-webkit-scrollbar { width: 4px; }\n        .members-scroll-area::-webkit-scrollbar-track { background: transparent; }\n        .members-scroll-area::-webkit-scrollbar-thumb { background: #B7E4C7; border-radius: 4px; }\n        .members-scroll-area::-webkit-scrollbar-thumb:hover { background: #74C69D; }\n\n        .filter-scroll { overflow-y: auto; }\n        .filter-scroll::-webkit-scrollbar { width: 3px; }\n        .filter-scroll::-webkit-scrollbar-track { background: transparent; }\n        .filter-scroll::-webkit-scrollbar-thumb { background: #B7E4C7; border-radius: 3px; }\n\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.7); }\n          50%       { box-shadow: 0 0 16px rgba(34,197,94,0.35); }\n        }\n        @keyframes orbFloat {\n          0%, 100% { transform: translateY(0) scale(1); }\n          50% { transform: translateY(-30px) scale(1.05); }\n        }\n        @keyframes fadeSlideUp {\n          from { opacity: 0; transform: translateY(32px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes avatarPop {\n          from { opacity: 0; transform: scale(0.7); }\n          to   { opacity: 1; transform: scale(1); }\n        }\n\n        .cta-hidden { opacity: 0; transform: translateY(32px); }\n        .cta-hidden-avatar { opacity: 0; transform: scale(0.7); }\n        .cta-visible-1 { animation: fadeSlideUp 0.6s 0.1s both ease-out; }\n        .cta-visible-2 { animation: fadeSlideUp 0.6s 0.2s both ease-out; }\n        .cta-visible-3 { animation: fadeSlideUp 0.6s 0.3s both ease-out; }\n        .cta-visible-4 { animation: fadeSlideUp 0.6s 0.4s both ease-out; }\n        .cta-visible-5 { animation: fadeSlideUp 0.6s 0.5s both ease-out; }\n        .cta-visible-6 { animation: fadeSlideUp 0.6s 0.6s both ease-out; }\n        .cta-avatar-0 { animation: avatarPop 0.5s 0.4s both ease-out; }\n        .cta-avatar-1 { animation: avatarPop 0.5s 0.25s both ease-out; }\n        .cta-avatar-2 { animation: avatarPop 0.5s 0.15s both ease-out; }\n        .cta-avatar-3 { animation: avatarPop 0.5s 0s both ease-out; }\n        .cta-avatar-4 { animation: avatarPop 0.5s 0.15s both ease-out; }\n        .cta-avatar-5 { animation: avatarPop 0.5s 0.25s both ease-out; }\n        .cta-avatar-6 { animation: avatarPop 0.5s 0.4s both ease-out; }\n\n        /* ── TABLET: 600–900px ── */\n        @media (max-width: 900px) {\n          .hero-section {\n            flex-direction: column !important;\n            height: auto !important;\n            min-height: calc(100vh - 68px) !important;\n          }\n          .hero-left {\n            flex: none !important;\n            width: 100% !important;\n            padding: 48px 32px 24px !important;\n            align-items: center !important;\n            text-align: center !important;\n          }\n          .hero-left .live-pill { align-self: center !important; }\n          .seek-toggle { max-width: 100% !important; }\n          .hero-buttons { justify-content: center !important; }\n\n          .features-strip-inner { flex-direction: column !important; gap: 0 !important; }\n          .features-strip-divider { display: none !important; }\n          .features-badges-row { justify-content: center !important; padding: 12px 0 !important; }\n\n          .members-layout { flex-direction: column !important; gap: 24px !important; }\n          .members-sidebar { width: 100% !important; flex: none !important; position: static !important; height: auto !important; }\n          .priority-chips { flex-direction: row !important; flex-wrap: wrap !important; gap: 8px !important; }\n          .country-chip { width: auto !important; }\n\n          /* grid: 2 cols on tablet */\n          .member-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; width: 100% !important; }\n          .members-scroll-area { height: auto !important; max-height: none !important; overflow-y: visible !important; width: 100% !important; }\n\n          .cta-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .cta-buttons { flex-direction: column !important; align-items: center !important; }\n          .cta-buttons button { width: 100% !important; max-width: 360px; }\n        }\n\n        /* ── MOBILE: ≤600px ── */\n        @media (max-width: 600px) {\n          .hero-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .hero-left { padding: 36px 20px 20px !important; gap: 12px !important; }\n          .hero-buttons { flex-direction: column !important; width: 100% !important; }\n          .hero-btn-primary, .hero-btn-outline { width: 100% !important; text-align: center !important; }\n          .seek-btn { font-size: 13px !important; padding: 12px 6px !important; }\n\n          .online-section { padding: 28px 16px !important; }\n          .online-header { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }\n\n          .members-layout { display: flex !important; flex-direction: column !important; gap: 24px !important; width: 100% !important; }\n          .members-sidebar { width: 100% !important; flex: none !important; position: static !important; height: auto !important; top: auto !important; }\n\n          /* grid: 1 full-width col on mobile — NO gaps, NO white space */\n          .member-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 16px !important; width: 100% !important; }\n          .members-scroll-area { height: auto !important; max-height: none !important; overflow-y: visible !important; width: 100% !important; padding-right: 0 !important; }\n\n          .cta-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .cta-section > div:first-of-type { padding: 24px 20px 0 !important; }\n          .cta-headline { font-size: 36px !important; line-height: 1.1 !important; }\n          .cta-subtext { font-size: 14px !important; margin-bottom: 20px !important; }\n          .cta-buttons { flex-direction: column !important; align-items: center !important; margin-bottom: 16px !important; }\n          .cta-buttons button { width: 100% !important; max-width: 340px !important; padding: 14px 24px !important; }\n          .cta-stat-number { font-size: 22px !important; }\n          .tagline-bar { padding: 14px 20px !important; }\n          .tagline-bar span:first-child { font-size: 11px !important; letter-spacing: 0.08em !important; }\n          .features-strip { padding: 0 !important; }\n          .features-strip-inner { padding: 8px 0 !important; }\n          footer { padding: 28px 20px !important; }\n        }\n\n        /* ── VERY SMALL: ≤380px ── */\n        @media (max-width: 380px) {\n          .member-grid { grid-template-columns: 1fr !important; gap: 12px !important; }\n          .seek-btn { font-size: 12px !important; }\n          .cta-headline { font-size: 28px !important; }\n          .cta-stat-number { font-size: 18px !important; }\n          .cta-buttons button { padding: 12px 16px !important; font-size: 14px !important; }\n        }\n      "
          }
        </style>
        <section
          className="hero-section"
          style={{
            position: `relative`,
            width: `100%`,
            height: `calc(100vh - 68px)`,
            overflow: `hidden`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            background: `#0D1F2D`,
          }}
        >
          <img
            src={Bt}
            alt="Nikha2"
            style={{
              position: `absolute`,
              inset: 0,
              width: `100%`,
              height: `100%`,
              objectFit: `cover`,
              objectPosition: `center center`,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: `absolute`,
              inset: 0,
              background: `linear-gradient(to bottom, rgba(13,31,45,0.55) 0%, rgba(13,31,45,0.80) 70%, rgba(13,31,45,0.97) 100%)`,
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: `absolute`,
              inset: 0,
              background: `radial-gradient(ellipse at center, transparent 40%, rgba(13,31,45,0.5) 100%)`,
              zIndex: 1,
            }}
          />
          <div
            className="hero-left"
            style={{
              position: `relative`,
              zIndex: 2,
              width: `100%`,
              maxWidth: 700,
              padding: `40px 40px 24px`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              textAlign: `center`,
              gap: 14,
              flex: 1,
              justifyContent: `center`,
            }}
          >
            <h1
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(32px, 4.5vw, 60px)`,
                fontWeight: 700,
                color: `#fff`,
                letterSpacing: `-0.025em`,
                lineHeight: 1.18,
                margin: 0,
              }}
            >
              Start Your
              <span className="green-text" style={{ display: `block` }}>
                New Beginning
              </span>
            </h1>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 17,
                color: `rgba(255,255,255,0.75)`,
                fontStyle: `italic`,
                margin: 0,
              }}
            >
              Give yourself a Second Chance
            </p>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 14.5,
                color: `rgba(255,255,255,0.55)`,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 420,
              }}
            >
              The world's first platform bringing together single moms, single
              dads and divorcee.
            </p>
            <div
              className="live-pill"
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `rgba(255,255,255,0.08)`,
                border: `1px solid rgba(116,198,157,0.45)`,
                borderRadius: 24,
                padding: `9px 22px`,
                backdropFilter: `blur(10px)`,
                boxShadow: `0 3px 12px rgba(45,106,79,0.15)`,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: `50%`,
                  background: `#22C55E`,
                  display: `inline-block`,
                  boxShadow: `0 0 7px rgba(34,197,94,0.65)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `#74C69D`,
                }}
              >
                {d.length}
                {" Members Online Right Now"}
              </span>
            </div>
            <div
              className="seek-toggle"
              style={{
                display: `flex`,
                border: `2px solid #40916C`,
                borderRadius: 12,
                overflow: `hidden`,
                maxWidth: 460,
                width: `100%`,
                boxShadow: `0 4px 20px rgba(45,106,79,0.25)`,
              }}
            >
              <button
                className={`seek-btn${e === `Woman` ? ` active` : ``}`}
                onClick={() => {
                  (t(`Woman`), u(`/explore?gender=woman`));
                }}
              >
                {e === `Woman` ? `✓ ` : ``}Looking for my Woman
              </button>
              <div style={{ width: 1, background: `#40916C`, flexShrink: 0 }} />
              <button
                className={`seek-btn${e === `Man` ? ` active` : ``}`}
                onClick={() => {
                  (t(`Man`), u(`/explore?gender=man`));
                }}
              >
                {e === `Man` ? `✓ ` : ``}Looking for my Man
              </button>
            </div>
            <div
              className="hero-buttons"
              style={{
                display: `flex`,
                gap: 14,
                flexWrap: `wrap`,
                justifyContent: `center`,
              }}
            >
              <button
                className="hero-btn-primary"
                onClick={() => {
                  let e = document.getElementById(`people-online`);
                  if (!e) return;
                  let t = e.getBoundingClientRect().top + window.scrollY - 68;
                  window.scrollTo({ top: t, behavior: `smooth` });
                }}
              >
                🔍 Explore People Online
              </button>
              <button className="hero-btn-outline" onClick={() => u(`/signup`)}>
                Log In / Sign Up
              </button>
            </div>
          </div>
          <div
            className="features-strip"
            style={{
              position: `relative`,
              zIndex: 3,
              width: `100%`,
              animation: `stripRiseIn 1.1s 0.5s both ease-out`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: `100%`,
                height: 1,
                background: `linear-gradient(to right, transparent, rgba(116,198,157,0.25), transparent)`,
              }}
            />
            <div
              style={{
                background: `rgba(13,31,45,0.72)`,
                backdropFilter: `blur(20px)`,
                WebkitBackdropFilter: `blur(20px)`,
                borderTop: `1px solid rgba(116,198,157,0.12)`,
              }}
            >
              <div
                className="features-strip-inner"
                style={{
                  maxWidth: 1060,
                  margin: `0 auto`,
                  padding: `0 40px`,
                  display: `flex`,
                  alignItems: `center`,
                  flexWrap: `wrap`,
                }}
              >
                <div
                  className="features-strip-divider"
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 12,
                    padding: `12px 28px 12px 0`,
                    borderRight: `1px solid rgba(116,198,157,0.15)`,
                    marginRight: 28,
                    flex: `0 0 auto`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 26,
                      filter: `drop-shadow(0 0 8px rgba(116,198,157,0.4))`,
                    }}
                  >
                    🌐
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12.5,
                      lineHeight: 1.55,
                      color: `rgba(255,255,255,0.5)`,
                      maxWidth: 190,
                    }}
                  >
                    <strong
                      style={{
                        color: `#74C69D`,
                        fontFamily: `'DM Sans', sans-serif`,
                        fontWeight: 700,
                      }}
                    >
                      The very first global platform
                    </strong>
                    <br />
                    for single moms & single dads
                  </p>
                </div>
                <div
                  className="features-badges-row"
                  style={{
                    display: `flex`,
                    flex: 1,
                    justifyContent: `space-around`,
                    flexWrap: `wrap`,
                  }}
                >
                  {[
                    {
                      icon: `🛡️`,
                      label: `Verified
Profiles`,
                    },
                    {
                      icon: `💚`,
                      label: `Compatible
Matches`,
                    },
                    {
                      icon: `🔒`,
                      label: `End-End
Encrypted`,
                    },
                    {
                      icon: `🤝`,
                      label: `Respect
& Support`,
                    },
                  ].map(({ icon: e, label: t }, n) => (
                    <div
                      key={n}
                      style={{
                        display: `flex`,
                        flexDirection: `column`,
                        alignItems: `center`,
                        gap: 5,
                        padding: `10px 18px`,
                        cursor: `default`,
                        transition: `transform 0.2s`,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = `translateY(-3px)`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = `none`)
                      }
                    >
                      <span
                        style={{
                          fontSize: 20,
                          filter: `drop-shadow(0 0 6px rgba(116,198,157,0.35))`,
                        }}
                      >
                        {e}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: `'DM Sans', sans-serif`,
                          color: `rgba(255,255,255,0.55)`,
                          textAlign: `center`,
                          letterSpacing: `0.07em`,
                          lineHeight: 1.35,
                          textTransform: `uppercase`,
                          whiteSpace: `pre-line`,
                        }}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="people-online"
          className="online-section"
          style={{ padding: `52px 40px`, maxWidth: 1100, margin: `0 auto` }}
        >
          <div
            className="online-header"
            style={{
              display: `flex`,
              alignItems: `flex-start`,
              justifyContent: `space-between`,
              marginBottom: 28,
              flexWrap: `wrap`,
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: `clamp(22px, 3vw, 32px)`,
                  fontWeight: 700,
                  color: `#1B3A4B`,
                  letterSpacing: `-0.02em`,
                  marginBottom: 4,
                }}
              >
                {"People "}
                <span className="green-text">Online Now</span>
              </h2>
              <p
                style={{
                  color: `#74C69D`,
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 14,
                }}
              >
                Real people, real stories — looking for a second chance
              </p>
            </div>
            <div
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `#F0FAF4`,
                border: `1px solid #B7E4C7`,
                borderRadius: 24,
                padding: `8px 18px`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: `50%`,
                  background: `#22C55E`,
                  display: `inline-block`,
                  boxShadow: `0 0 8px rgba(34,197,94,0.7)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                }}
              >
                {d.length}
                {" Members Online"}
              </span>
            </div>
          </div>
          <div
            className="members-layout"
            style={{
              display: `flex`,
              gap: 24,
              alignItems: `flex-start`,
              width: `100%`,
            }}
          >
            <aside
              className="members-sidebar"
              style={{
                width: 220,
                flex: `0 0 220px`,
                background: `rgba(255,255,255,0.85)`,
                border: `1px solid #E8F5EE`,
                borderRadius: 20,
                padding: 18,
                boxShadow: `0 6px 24px rgba(45,106,79,0.06)`,
                position: `sticky`,
                top: 88,
                height: `fit-content`,
              }}
            >
              <div
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: `#1B3A4B`,
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: `1px solid #E8F5EE`,
                }}
              >
                🌍 Filter by Country
              </div>
              <button
                className={`country-chip${n === `All` ? ` active` : ``}`}
                onClick={() => {
                  (r(`All`), s(!1));
                }}
                style={{ marginBottom: 10 }}
              >
                🌍 All Countries
              </button>
              <div
                className="priority-chips"
                style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: 7,
                  marginBottom: 14,
                }}
              >
                {FEATURED_COUNTRIES.map((e) => (
                  <button
                    key={e}
                    className={`country-chip${n === e ? ` active` : ``}`}
                    onClick={() => {
                      (r(e), s(!1));
                    }}
                  >
                    {"📍 "}
                    {e}
                  </button>
                ))}
              </div>
              <div
                className="country-search-wrapper"
                style={{ position: `relative` }}
              >
                <input
                  type="text"
                  placeholder="Search all countries..."
                  value={i}
                  onChange={(e) => {
                    (a(e.target.value), s(!0));
                  }}
                  onFocus={(e) => {
                    ((e.target.style.borderColor = `#40916C`), s(!0));
                  }}
                  onBlur={(e) => (e.target.style.borderColor = `#B7E4C7`)}
                  style={{
                    width: `100%`,
                    padding: `10px 14px`,
                    borderRadius: 12,
                    border: `1.5px solid #B7E4C7`,
                    background: `#F8FAF5`,
                    color: `#1B3A4B`,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                    outline: `none`,
                    transition: `border-color 0.2s`,
                  }}
                />
                {o && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      background: `#fff`,
                      border: `1px solid #D4EDDA`,
                      borderRadius: 14,
                      maxHeight: 240,
                      overflowY: `auto`,
                      zIndex: 20,
                      boxShadow: `0 10px 30px rgba(0,0,0,0.08)`,
                    }}
                  >
                    {y.map((e) => (
                      <button
                        key={e}
                        onClick={() => {
                          (r(e), s(!1), a(``));
                        }}
                        style={{
                          ...menuItemStyle,
                          background: n === e ? `#F0FAF4` : `transparent`,
                          color: n === e ? `#2D6A4F` : `#1B3A4B`,
                          fontWeight: n === e ? 700 : 400,
                        }}
                      >
                        {"📍 "}
                        {e}
                      </button>
                    ))}
                    {y.length === 0 && (
                      <div
                        style={{
                          padding: `14px`,
                          fontSize: 13,
                          color: `#74C69D`,
                          fontFamily: `'DM Sans', sans-serif`,
                        }}
                      >
                        No countries found
                      </div>
                    )}
                  </div>
                )}
              </div>
              {n !== `All` && !FEATURED_COUNTRIES.includes(n) && (
                <div
                  style={{
                    marginTop: 12,
                    display: `flex`,
                    alignItems: `center`,
                    gap: 6,
                    background: `#F0FAF4`,
                    border: `1px solid #B7E4C7`,
                    borderRadius: 10,
                    padding: `6px 10px`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: `#2D6A4F`,
                      fontWeight: 600,
                      fontFamily: `'DM Sans', sans-serif`,
                      flex: 1,
                    }}
                  >
                    {"📍 "}
                    {n}
                  </span>
                  <button
                    onClick={() => r(`All`)}
                    style={{
                      background: `none`,
                      border: `none`,
                      cursor: `pointer`,
                      fontSize: 13,
                      color: `#74C69D`,
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </aside>
            <div style={{ flex: 1, minWidth: 0, width: `100%` }}>
              <div className="members-scroll-area" style={{ width: `100%` }}>
                {p ? (
                  <div
                    style={{
                      textAlign: `center`,
                      padding: `60px 24px`,
                      color: `#74C69D`,
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 15,
                    }}
                  >
                    Loading members…
                  </div>
                ) : h ? (
                  <div
                    style={{
                      textAlign: `center`,
                      padding: `60px 24px`,
                      color: `#C0392B`,
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 15,
                    }}
                  >
                    {h}
                  </div>
                ) : b.length > 0 ? (
                  <div className="member-grid">
                    {b.map((e) => (
                      <OnlineNowPanel key={e.id} member={e} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: `center`,
                      padding: `60px 24px`,
                      color: `#74C69D`,
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 15,
                    }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
                    {"No members online from "}
                    <strong>{n}</strong>
                    {" right now. Check back soon!"}
                  </div>
                )}
              </div>
              <div style={{ textAlign: `center`, marginTop: 28 }}>
                <button
                  onClick={() => u(`/explore`)}
                  style={{
                    background: `transparent`,
                    border: `2px solid #40916C`,
                    color: `#2D6A4F`,
                    padding: `12px 42px`,
                    borderRadius: 28,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: `pointer`,
                    letterSpacing: `0.03em`,
                    transition: `all 0.2s`,
                  }}
                  onMouseEnter={(e) => {
                    ((e.currentTarget.style.background = `#1B3A4B`),
                      (e.currentTarget.style.color = `#fff`),
                      (e.currentTarget.style.borderColor = `#1B3A4B`));
                  }}
                  onMouseLeave={(e) => {
                    ((e.currentTarget.style.background = `transparent`),
                      (e.currentTarget.style.color = `#2D6A4F`),
                      (e.currentTarget.style.borderColor = `#40916C`));
                  }}
                >
                  View All Members →
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={c}
          className="cta-section"
          style={{
            position: `relative`,
            overflow: `hidden`,
            background: `#0D1F2D`,
            height: `calc(100vh - 68px)`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <div
            style={{
              position: `absolute`,
              top: -120,
              left: `10%`,
              width: 500,
              height: 500,
              borderRadius: `50%`,
              background: `radial-gradient(circle, rgba(64,145,108,0.25) 0%, transparent 70%)`,
              pointerEvents: `none`,
              animation: `orbFloat 8s ease-in-out infinite`,
            }}
          />
          <div
            style={{
              position: `absolute`,
              bottom: -100,
              right: `5%`,
              width: 400,
              height: 400,
              borderRadius: `50%`,
              background: `radial-gradient(circle, rgba(116,198,157,0.18) 0%, transparent 70%)`,
              pointerEvents: `none`,
              animation: `orbFloat 6s ease-in-out infinite reverse`,
            }}
          />
          <div
            style={{
              position: `absolute`,
              top: `40%`,
              right: `20%`,
              width: 200,
              height: 200,
              borderRadius: `50%`,
              background: `radial-gradient(circle, rgba(45,106,79,0.3) 0%, transparent 70%)`,
              pointerEvents: `none`,
              animation: `orbFloat 10s ease-in-out infinite`,
            }}
          />
          <div
            style={{
              maxWidth: 900,
              width: `100%`,
              margin: `0 auto`,
              position: `relative`,
              zIndex: 1,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              gap: 0,
              flex: 1,
              justifyContent: `center`,
              padding: `32px 40px 0`,
            }}
          >
            <div
              style={{
                display: `flex`,
                alignItems: `flex-end`,
                justifyContent: `center`,
                gap: 0,
                marginBottom: 24,
                height: 80,
              }}
            >
              {d.slice(0, 7).map((e, t) => {
                let n = [18, 8, 2, 0, 2, 8, 18],
                  r = [44, 50, 56, 64, 56, 50, 44];
                return (
                  <div
                    key={e.id}
                    className={l ? `cta-avatar-${t}` : `cta-hidden-avatar`}
                    style={{
                      marginBottom: n[t],
                      marginLeft: t === 0 ? 0 : -10,
                      zIndex: t === 3 ? 10 : 10 - Math.abs(t - 3),
                    }}
                  >
                    {e.avatar ? (
                      <img
                        src={e.avatar}
                        alt={e.name}
                        style={{
                          width: r[t],
                          height: r[t],
                          borderRadius: `50%`,
                          border: `${t === 3 ? 3 : 2}px solid ${t === 3 ? `#74C69D` : `rgba(255,255,255,0.2)`}`,
                          boxShadow:
                            t === 3
                              ? `0 0 0 6px rgba(116,198,157,0.2), 0 8px 24px rgba(0,0,0,0.4)`
                              : `0 4px 14px rgba(0,0,0,0.35)`,
                          display: `block`,
                          objectFit: `cover`,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: r[t],
                          height: r[t],
                          borderRadius: `50%`,
                          border: `${t === 3 ? 3 : 2}px solid ${t === 3 ? `#74C69D` : `rgba(255,255,255,0.2)`}`,
                          boxShadow:
                            t === 3
                              ? `0 0 0 6px rgba(116,198,157,0.2), 0 8px 24px rgba(0,0,0,0.4)`
                              : `0 4px 14px rgba(0,0,0,0.35)`,
                          background: `#1B3A4B`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `center`,
                          fontSize: r[t] * 0.45,
                        }}
                      >
                        {GENDER_EMOJI[e.gender] || `🙂`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className={l ? `cta-visible-1` : `cta-hidden`}
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `rgba(116,198,157,0.12)`,
                border: `1px solid rgba(116,198,157,0.3)`,
                borderRadius: 24,
                padding: `6px 18px`,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: `50%`,
                  background: `#22C55E`,
                  display: `inline-block`,
                  boxShadow: `0 0 8px #22C55E`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: `#74C69D`,
                  letterSpacing: `0.1em`,
                  textTransform: `uppercase`,
                }}
              >
                {d.length}
                {" people waiting to meet you"}
              </span>
            </div>
            <h2
              className={`cta-headline ${l ? `cta-visible-2` : `cta-hidden`}`}
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(36px, 6vw, 72px)`,
                fontWeight: 700,
                color: `#fff`,
                letterSpacing: `-0.03em`,
                lineHeight: 1.08,
                textAlign: `center`,
                marginBottom: 0,
              }}
            >
              Start Your
            </h2>
            <h2
              className={l ? `cta-visible-3` : `cta-hidden`}
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(36px, 6vw, 72px)`,
                fontWeight: 700,
                letterSpacing: `-0.03em`,
                lineHeight: 1.15,
                paddingBottom: `0.12em`,
                display: `inline-block`,
                textAlign: `center`,
                marginBottom: 16,
                background: `linear-gradient(135deg, #52B788, #74C69D, #B7E4C7)`,
                backgroundSize: `200% auto`,
                WebkitBackgroundClip: `text`,
                WebkitTextFillColor: `transparent`,
                backgroundClip: `text`,
                animation: l
                  ? `fadeSlideUp 0.6s 0.3s both ease-out, shimmer-green 4s linear infinite`
                  : `none`,
              }}
            >
              New Beginning
            </h2>
            <p
              className={`cta-subtext ${l ? `cta-visible-4` : `cta-hidden`}`}
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: `clamp(14px, 2vw, 17px)`,
                color: `rgba(255,255,255,0.5)`,
                lineHeight: 1.75,
                textAlign: `center`,
                maxWidth: 540,
                marginBottom: 32,
              }}
            >
              Give yourself a second chance
            </p>
            <div
              className="cta-buttons"
              style={{
                display: `flex`,
                gap: 14,
                justifyContent: `center`,
                flexWrap: `wrap`,
                animation: `fadeSlideUp 0.6s 0.5s both`,
                marginBottom: 24,
                width: `100%`,
              }}
            >
              <button
                onClick={() => u(`/signup`)}
                style={{
                  background: `linear-gradient(135deg, #40916C 0%, #74C69D 100%)`,
                  border: `none`,
                  borderRadius: 16,
                  padding: `17px 42px`,
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 16,
                  fontWeight: 800,
                  color: `#fff`,
                  cursor: `pointer`,
                  letterSpacing: `0.02em`,
                  boxShadow: `0 8px 32px rgba(64,145,108,0.5)`,
                  transition: `all 0.22s`,
                }}
                onMouseEnter={(e) => {
                  ((e.currentTarget.style.transform = `translateY(-3px) scale(1.02)`),
                    (e.currentTarget.style.boxShadow = `0 16px 48px rgba(64,145,108,0.6)`));
                }}
                onMouseLeave={(e) => {
                  ((e.currentTarget.style.transform = `none`),
                    (e.currentTarget.style.boxShadow = `0 8px 32px rgba(64,145,108,0.5)`));
                }}
              >
                Sign Up Free
              </button>
              <button
                onClick={() => u(`/explore`)}
                style={{
                  background: `transparent`,
                  border: `2px solid rgba(255,255,255,0.18)`,
                  borderRadius: 16,
                  padding: `17px 42px`,
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: `rgba(255,255,255,0.75)`,
                  cursor: `pointer`,
                  letterSpacing: `0.02em`,
                  transition: `all 0.22s`,
                  backdropFilter: `blur(8px)`,
                }}
                onMouseEnter={(e) => {
                  ((e.currentTarget.style.borderColor = `#74C69D`),
                    (e.currentTarget.style.color = `#74C69D`));
                }}
                onMouseLeave={(e) => {
                  ((e.currentTarget.style.borderColor = `rgba(255,255,255,0.18)`),
                    (e.currentTarget.style.color = `rgba(255,255,255,0.75)`));
                }}
              >
                Explore Members
              </button>
            </div>
            <div
              style={{
                width: `100%`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                animation: `fadeSlideUp 0.6s 0.6s both`,
                marginTop: 0,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: `flex`,
                  gap: 0,
                  background: `rgba(116,198,157,0.07)`,
                  border: `1px solid rgba(116,198,157,0.15)`,
                  borderRadius: 16,
                  backdropFilter: `blur(12px)`,
                  WebkitBackdropFilter: `blur(12px)`,
                  overflow: `hidden`,
                  maxWidth: `100%`,
                }}
              >
                {[
                  { number: `100%`, label: `Free to Browse` },
                  { number: `40+`, label: `Countries` },
                  { number: `0`, label: `Judgment` },
                ].map((e, t) => (
                  <div
                    key={t}
                    style={{
                      textAlign: `center`,
                      padding: `14px clamp(10px, 4vw, 28px)`,
                      flex: `1 1 0`,
                      minWidth: 0,
                      borderRight:
                        t < 2 ? `1px solid rgba(116,198,157,0.12)` : `none`,
                    }}
                  >
                    <div
                      className="cta-stat-number"
                      style={{
                        fontFamily: `'Playfair Display', serif`,
                        fontSize: 28,
                        fontWeight: 700,
                        color: `#74C69D`,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {e.number}
                    </div>
                    <div
                      style={{
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 11,
                        fontWeight: 600,
                        color: `rgba(255,255,255,0.35)`,
                        textTransform: `uppercase`,
                        letterSpacing: `0.1em`,
                      }}
                    >
                      {e.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="tagline-bar"
            style={{
              position: `relative`,
              zIndex: 2,
              width: `100%`,
              flexShrink: 0,
              background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
              padding: `18px 40px`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              gap: 10,
              flexWrap: `wrap`,
            }}
          >
            <span
              style={{
                color: `#B7E4C7`,
                fontSize: 13,
                letterSpacing: `0.18em`,
                fontFamily: `'DM Sans', sans-serif`,
                fontWeight: 600,
                textTransform: `uppercase`,
                textAlign: `center`,
              }}
            >
              Because everyone deserves a second chance at happiness.
            </span>
            <span style={{ color: `#74C69D`, fontSize: 16 }}>♥</span>
          </div>
        </section>
        <footer
          style={{
            background: `#1B3A4B`,
            color: `#74C69D`,
            padding: `32px 40px`,
            textAlign: `center`,
          }}
        >
          <div
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontWeight: 700,
              fontSize: 22,
              color: `#fff`,
              letterSpacing: `-0.02em`,
              marginBottom: 10,
            }}
          >
            Nikha<span style={{ color: `#74C69D` }}>2</span>{" "}
            <span style={{ color: `#40916C` }}>♡</span>
          </div>
          <p
            style={{
              margin: `0 0 14px`,
              fontSize: 13,
              opacity: 0.5,
              fontFamily: `'DM Sans', sans-serif`,
            }}
          >
            © 2026 Nikha2 — The Second Chance. All rights reserved.
          </p>
          <div
            className="footer-links"
            style={{
              display: `flex`,
              justifyContent: `center`,
              gap: 24,
              flexWrap: `wrap`,
            }}
          >
            {[`Terms`, `Privacy`, `Cookies`].map((e) => (
              <Link
                key={e}
                to={`/${e.toLowerCase()}`}
                style={{
                  fontSize: 12,
                  color: `#74C69D`,
                  opacity: 0.6,
                  textDecoration: `none`,
                  fontFamily: `'DM Sans', sans-serif`,
                  transition: `opacity 0.2s`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = `1`)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = `0.6`)}
              >
                {e}
              </Link>
            ))}
          </div>
        </footer>
        <SupportChatWidget />
      </div>
    )
  );
}

export { HomePage };
