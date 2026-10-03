import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { LivingHero } from "../components/hero/LivingHero";
import { CountUp, Reveal, ShinyText } from "../components/motion";
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
          fontFamily: `var(--font-ui)`,
          background: `var(--bg)`,
          minHeight: `100vh`,
          paddingTop: 68,
        }}
      >
        <Navbar />
        <style>
          {
            "\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: var(--font-ui);\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px color-mix(in srgb, var(--shadow) 35%, transparent);\n          transition: all 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow) 45%, transparent); }\n\n        .hero-btn-outline {\n          background: var(--hero-chip); color: var(--hero-accent);\n          border: 2px solid var(--hero-accent); padding: 13px 32px;\n          border-radius: 32px; font-family: var(--font-ui);\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s;\n          backdrop-filter: blur(6px);\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-outline:hover { background: color-mix(in srgb, var(--surface) 15%, transparent); transform: translateY(-2px); }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n        @keyframes stripRiseIn {\n          from { opacity: 0; transform: translateY(40px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n\n        .seek-btn {\n          flex: 1; padding: 15px 0;\n          background: color-mix(in srgb, var(--surface) 8%, transparent);\n          color: var(--hero-sub);\n          border: none; font-family: var(--font-ui);\n          font-size: 15px; font-weight: 600;\n          cursor: pointer; transition: all 0.2s;\n        }\n        .seek-btn.active {\n          background: linear-gradient(135deg, var(--deep), var(--emerald-700));\n          color: #fff;\n        }\n        .seek-btn:first-child { border-radius: 10px 0 0 10px; }\n        .seek-btn:last-child  { border-radius: 0 10px 10px 0; }\n\n        .country-chip {\n          padding: 7px 16px; border-radius: 12px;\n          border: 1.5px solid var(--mint); background: var(--surface);\n          color: var(--emerald-700); font-family: var(--font-ui);\n          font-size: 12.5px; font-weight: 600; cursor: pointer;\n          transition: all 0.18s; white-space: nowrap;\n          width: 100%; text-align: left;\n        }\n        .country-chip:hover { background: var(--surface-2); border-color: var(--emerald-500); }\n        .country-chip.active {\n          background: linear-gradient(135deg, var(--deep), var(--emerald-700));\n          color: #fff; border-color: transparent;\n          box-shadow: 0 3px 12px color-mix(in srgb, var(--emerald-700) 30%, transparent);\n        }\n\n        /* card hover */\n        .card-hover {\n          transition: transform 0.22s, box-shadow 0.22s;\n          cursor: pointer;\n        }\n        .card-hover:hover {\n          transform: translateY(-4px);\n          box-shadow: 0 12px 36px color-mix(in srgb, var(--emerald-700) 16%, transparent) !important;\n        }\n\n        /* member grid — fluid, no fixed columns */\n        .member-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n          gap: 20px;\n          width: 100%;\n        }\n\n        /* scroll area — desktop only */\n        .members-scroll-area {\n          overflow-y: auto;\n          padding-right: 4px;\n        }\n        .members-scroll-area::-webkit-scrollbar { width: 4px; }\n        .members-scroll-area::-webkit-scrollbar-track { background: transparent; }\n        .members-scroll-area::-webkit-scrollbar-thumb { background: var(--mint); border-radius: 4px; }\n        .members-scroll-area::-webkit-scrollbar-thumb:hover { background: var(--emerald-500); }\n\n        .filter-scroll { overflow-y: auto; }\n        .filter-scroll::-webkit-scrollbar { width: 3px; }\n        .filter-scroll::-webkit-scrollbar-track { background: transparent; }\n        .filter-scroll::-webkit-scrollbar-thumb { background: var(--mint); border-radius: 3px; }\n\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px color-mix(in srgb, var(--online) 70%, transparent); }\n          50%       { box-shadow: 0 0 16px color-mix(in srgb, var(--online) 35%, transparent); }\n        }\n        @keyframes orbFloat {\n          0%, 100% { transform: translateY(0) scale(1); }\n          50% { transform: translateY(-30px) scale(1.05); }\n        }\n        @keyframes fadeSlideUp {\n          from { opacity: 0; transform: translateY(32px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes avatarPop {\n          from { opacity: 0; transform: scale(0.7); }\n          to   { opacity: 1; transform: scale(1); }\n        }\n\n        .cta-hidden { opacity: 0; transform: translateY(32px); }\n        .cta-hidden-avatar { opacity: 0; transform: scale(0.7); }\n        .cta-visible-1 { animation: fadeSlideUp 0.6s 0.1s both ease-out; }\n        .cta-visible-2 { animation: fadeSlideUp 0.6s 0.2s both ease-out; }\n        .cta-visible-3 { animation: fadeSlideUp 0.6s 0.3s both ease-out; }\n        .cta-visible-4 { animation: fadeSlideUp 0.6s 0.4s both ease-out; }\n        .cta-visible-5 { animation: fadeSlideUp 0.6s 0.5s both ease-out; }\n        .cta-visible-6 { animation: fadeSlideUp 0.6s 0.6s both ease-out; }\n        .cta-avatar-0 { animation: avatarPop 0.5s 0.4s both ease-out; }\n        .cta-avatar-1 { animation: avatarPop 0.5s 0.25s both ease-out; }\n        .cta-avatar-2 { animation: avatarPop 0.5s 0.15s both ease-out; }\n        .cta-avatar-3 { animation: avatarPop 0.5s 0s both ease-out; }\n        .cta-avatar-4 { animation: avatarPop 0.5s 0.15s both ease-out; }\n        .cta-avatar-5 { animation: avatarPop 0.5s 0.25s both ease-out; }\n        .cta-avatar-6 { animation: avatarPop 0.5s 0.4s both ease-out; }\n\n        /* ── TABLET: 600–900px ── */\n        @media (max-width: 900px) {\n          .hero-section {\n            flex-direction: column !important;\n            height: auto !important;\n            min-height: calc(100vh - 68px) !important;\n          }\n          .hero-left {\n            flex: none !important;\n            width: 100% !important;\n            padding: 48px 32px 24px !important;\n            align-items: center !important;\n            text-align: center !important;\n          }\n          .hero-left .live-pill { align-self: center !important; }\n          .seek-toggle { max-width: 100% !important; }\n          .hero-buttons { justify-content: center !important; }\n\n          .features-strip-inner { flex-direction: column !important; gap: 0 !important; }\n          .features-strip-divider { display: none !important; }\n          .features-badges-row { justify-content: center !important; padding: 12px 0 !important; }\n\n          .members-layout { flex-direction: column !important; gap: 24px !important; }\n          .members-sidebar { width: 100% !important; flex: none !important; position: static !important; height: auto !important; }\n          .priority-chips { flex-direction: row !important; flex-wrap: wrap !important; gap: 8px !important; }\n          .country-chip { width: auto !important; }\n\n          /* grid: 2 cols on tablet */\n          .member-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; width: 100% !important; }\n          .members-scroll-area { height: auto !important; max-height: none !important; overflow-y: visible !important; width: 100% !important; }\n\n          .cta-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .cta-buttons { flex-direction: column !important; align-items: center !important; }\n          .cta-buttons button { width: 100% !important; max-width: 360px; }\n        }\n\n        /* ── MOBILE: ≤600px ── */\n        @media (max-width: 600px) {\n          .hero-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .hero-left { padding: 36px 20px 20px !important; gap: 12px !important; }\n          .hero-buttons { flex-direction: column !important; width: 100% !important; }\n          .hero-btn-primary, .hero-btn-outline { width: 100% !important; text-align: center !important; }\n          .seek-btn { font-size: 13px !important; padding: 12px 6px !important; }\n\n          .online-section { padding: 28px 16px !important; }\n          .online-header { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; }\n\n          .members-layout { display: flex !important; flex-direction: column !important; gap: 24px !important; width: 100% !important; }\n          .members-sidebar { width: 100% !important; flex: none !important; position: static !important; height: auto !important; top: auto !important; }\n\n          /* grid: 1 full-width col on mobile — NO gaps, NO white space */\n          .member-grid { display: grid !important; grid-template-columns: 1fr !important; gap: 16px !important; width: 100% !important; }\n          .members-scroll-area { height: auto !important; max-height: none !important; overflow-y: visible !important; width: 100% !important; padding-right: 0 !important; }\n\n          .cta-section { height: auto !important; min-height: calc(100vh - 68px) !important; }\n          .cta-section > div:first-of-type { padding: 24px 20px 0 !important; }\n          .cta-headline { font-size: 36px !important; line-height: 1.1 !important; }\n          .cta-subtext { font-size: 14px !important; margin-bottom: 20px !important; }\n          .cta-buttons { flex-direction: column !important; align-items: center !important; margin-bottom: 16px !important; }\n          .cta-buttons button { width: 100% !important; max-width: 340px !important; padding: 14px 24px !important; }\n          .cta-stat-number { font-size: 22px !important; }\n          .tagline-bar { padding: 14px 20px !important; }\n          .tagline-bar span:first-child { font-size: 11px !important; letter-spacing: 0.08em !important; }\n          .features-strip { padding: 0 !important; }\n          .features-strip-inner { padding: 8px 0 !important; }\n          footer { padding: 28px 20px !important; }\n        }\n\n        /* ── VERY SMALL: ≤380px ── */\n        @media (max-width: 380px) {\n          .member-grid { grid-template-columns: 1fr !important; gap: 12px !important; }\n          .seek-btn { font-size: 12px !important; }\n          .cta-headline { font-size: 28px !important; }\n          .cta-stat-number { font-size: 18px !important; }\n          .cta-buttons button { padding: 12px 16px !important; font-size: 14px !important; }\n        }\n      "
          }
        </style>
        <LivingHero
          headline={[`Start Your`, `New Beginning`]}
          alt="A couple looking out over a mountain lake at sunrise"
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
            background: `var(--deep)`,
          }}
          contentClassName="hero-left"
          contentStyle={{
            width: `100%`,
            maxWidth: 760,
            padding: `40px 40px 24px`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            textAlign: `center`,
            gap: 14,
            flex: 1,
            justifyContent: `center`,
          }}
          after={
            <>
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
                  background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--emerald-500) 25%, transparent), transparent)`,
                }}
              />
              <div
                style={{
                  background: `color-mix(in srgb, var(--overlay) 72%, transparent)`,
                  backdropFilter: `blur(20px)`,
                  WebkitBackdropFilter: `blur(20px)`,
                  borderTop: `1px solid color-mix(in srgb, var(--emerald-500) 12%, transparent)`,
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
                      borderRight: `1px solid color-mix(in srgb, var(--emerald-500) 15%, transparent)`,
                      marginRight: 28,
                      flex: `0 0 auto`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 26,
                        filter: `drop-shadow(0 0 8px color-mix(in srgb, var(--emerald-500) 40%, transparent))`,
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
                          color: `var(--emerald-500)`,
                          fontFamily: `var(--font-ui)`,
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
                            filter: `drop-shadow(0 0 6px color-mix(in srgb, var(--emerald-500) 35%, transparent))`,
                          }}
                        >
                          {e}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            fontFamily: `var(--font-ui)`,
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
            </>
          }
        >
            <p
              className="fade-late"
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 17,
                color: `var(--hero-sub)`,
                fontStyle: `italic`,
                margin: 0,
              }}
            >
              Give yourself a Second Chance
            </p>
            <p
              className="fade-late"
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 14.5,
                color: `var(--hero-lead)`,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 420,
              }}
            >
              The world's first platform bringing together single moms, single
              dads and divorcee.
            </p>
            <div
              className="live-pill fade-late"
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `var(--hero-chip)`,
                border: `1px solid color-mix(in srgb, var(--emerald-500) 45%, transparent)`,
                borderRadius: 24,
                padding: `9px 22px`,
                backdropFilter: `blur(10px)`,
                boxShadow: `0 3px 12px color-mix(in srgb, var(--emerald-700) 15%, transparent)`,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: `50%`,
                  background: `var(--online)`,
                  display: `inline-block`,
                  boxShadow: `0 0 7px color-mix(in srgb, var(--online) 65%, transparent)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `var(--font-ui)`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `var(--hero-accent)`,
                }}
              >
                {d.length}
                {" Members Online Right Now"}
              </span>
            </div>
            <div
              className="seek-toggle fade-late"
              style={{
                display: `flex`,
                border: `2px solid var(--emerald-500)`,
                borderRadius: 12,
                overflow: `hidden`,
                maxWidth: 460,
                width: `100%`,
                boxShadow: `0 4px 20px color-mix(in srgb, var(--emerald-700) 25%, transparent)`,
              }}
            >
              <button
                className={`nk-btn ${`seek-btn${e === `Woman` ? ` active` : ``}` ?? ""}`}
                onClick={() => {
                  (t(`Woman`), u(`/explore?gender=woman`));
                }}
              >
                {e === `Woman` ? `✓ ` : ``}Looking for my Woman
              </button>
              <div style={{ width: 1, background: `var(--emerald-700)`, flexShrink: 0 }} />
              <button
                className={`nk-btn ${`seek-btn${e === `Man` ? ` active` : ``}` ?? ""}`}
                onClick={() => {
                  (t(`Man`), u(`/explore?gender=man`));
                }}
              >
                {e === `Man` ? `✓ ` : ``}Looking for my Man
              </button>
            </div>
            <div
              className="hero-buttons fade-late"
              style={{
                display: `flex`,
                gap: 14,
                flexWrap: `wrap`,
                justifyContent: `center`,
              }}
            >
              <button
                className="nk-btn nk-btn-primary hero-btn-primary"
                onClick={() => {
                  let e = document.getElementById(`people-online`);
                  if (!e) return;
                  let t = e.getBoundingClientRect().top + window.scrollY - 68;
                  window.scrollTo({ top: t, behavior: `smooth` });
                }}
              >
                🔍 Explore People Online
              </button>
              <button className="nk-btn hero-btn-outline" onClick={() => u(`/signup`)}>
                Log In / Sign Up
              </button>
            </div>
        </LivingHero>
        <Reveal
          as="section"
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
                  fontFamily: `var(--font-display)`,
                  fontSize: `clamp(22px, 3vw, 32px)`,
                  fontWeight: 700,
                  color: `var(--fg)`,
                  letterSpacing: `-0.02em`,
                  marginBottom: 4,
                }}
              >
                {"People "}
                <ShinyText>Online Now</ShinyText>
              </h2>
              <p
                style={{
                  color: `var(--emerald-500)`,
                  fontFamily: `var(--font-ui)`,
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
                background: `var(--surface-2)`,
                border: `1px solid var(--mint)`,
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
                  background: `var(--online)`,
                  display: `inline-block`,
                  boxShadow: `0 0 8px color-mix(in srgb, var(--online) 70%, transparent)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `var(--font-ui)`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
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
                background: `color-mix(in srgb, var(--surface) 85%, transparent)`,
                border: `1px solid var(--line)`,
                borderRadius: 20,
                padding: 18,
                boxShadow: `0 6px 24px color-mix(in srgb, var(--emerald-700) 6%, transparent)`,
                position: `sticky`,
                top: 88,
                height: `fit-content`,
              }}
            >
              <div
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: `var(--fg)`,
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: `1px solid var(--line)`,
                }}
              >
                🌍 Filter by Country
              </div>
              <button
                className={`nk-btn ${`country-chip${n === `All` ? ` active` : ``}` ?? ""}`}
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
                    className={`nk-btn ${`country-chip${n === e ? ` active` : ``}` ?? ""}`}
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
                    ((e.target.style.borderColor = `var(--emerald-500)`), s(!0));
                  }}
                  onBlur={(e) => (e.target.style.borderColor = `var(--mint)`)}
                  style={{
                    width: `100%`,
                    padding: `10px 14px`,
                    borderRadius: 12,
                    border: `1.5px solid var(--mint)`,
                    background: `var(--bg)`,
                    color: `var(--fg)`,
                    fontFamily: `var(--font-ui)`,
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
                      background: `var(--surface)`,
                      border: `1px solid var(--line)`,
                      borderRadius: 14,
                      maxHeight: 240,
                      overflowY: `auto`,
                      zIndex: 20,
                      boxShadow: `0 10px 30px rgba(0,0,0,0.08)`,
                    }}
                  >
                    {y.map((e) => (
                      <button className="nk-btn"
                        key={e}
                        onClick={() => {
                          (r(e), s(!1), a(``));
                        }}
                        style={{
                          ...menuItemStyle,
                          background: n === e ? `var(--surface-2)` : `transparent`,
                          color: n === e ? `var(--emerald-700)` : `var(--fg)`,
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
                          color: `var(--emerald-500)`,
                          fontFamily: `var(--font-ui)`,
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
                    background: `var(--surface-2)`,
                    border: `1px solid var(--mint)`,
                    borderRadius: 10,
                    padding: `6px 10px`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: `var(--emerald-700)`,
                      fontWeight: 600,
                      fontFamily: `var(--font-ui)`,
                      flex: 1,
                    }}
                  >
                    {"📍 "}
                    {n}
                  </span>
                  <button className="nk-btn nk-btn-soft"
                    onClick={() => r(`All`)}
                    style={{
                      background: `none`,
                      border: `none`,
                      cursor: `pointer`,
                      fontSize: 13,
                      color: `var(--emerald-500)`,
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
                      color: `var(--emerald-500)`,
                      fontFamily: `var(--font-ui)`,
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
                      color: `var(--danger)`,
                      fontFamily: `var(--font-ui)`,
                      fontSize: 15,
                    }}
                  >
                    {h}
                  </div>
                ) : b.length > 0 ? (
                  <Reveal stagger className="member-grid">
                    {b.map((e) => (
                      <OnlineNowPanel key={e.id} member={e} />
                    ))}
                  </Reveal>
                ) : (
                  <div
                    style={{
                      textAlign: `center`,
                      padding: `60px 24px`,
                      color: `var(--emerald-500)`,
                      fontFamily: `var(--font-ui)`,
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
                <button className="nk-btn nk-btn-ghost"
                  onClick={() => u(`/explore`)}
                  style={{
                    background: `transparent`,
                    border: `2px solid var(--emerald-500)`,
                    color: `var(--emerald-700)`,
                    padding: `12px 42px`,
                    borderRadius: 28,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: `pointer`,
                    letterSpacing: `0.03em`,
                    transition: `all 0.2s`,
                  }}
                  onMouseEnter={(e) => {
                    ((e.currentTarget.style.background = `var(--deep)`),
                      (e.currentTarget.style.color = `#fff`),
                      (e.currentTarget.style.borderColor = `var(--fg)`));
                  }}
                  onMouseLeave={(e) => {
                    ((e.currentTarget.style.background = `transparent`),
                      (e.currentTarget.style.color = `var(--emerald-700)`),
                      (e.currentTarget.style.borderColor = `var(--emerald-500)`));
                  }}
                >
                  View All Members →
                </button>
              </div>
            </div>
          </div>
        </Reveal>
        <section
          ref={c}
          className="cta-section"
          style={{
            position: `relative`,
            overflow: `hidden`,
            background: `var(--deep)`,
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
              background: `radial-gradient(circle, color-mix(in srgb, var(--emerald-700) 25%, transparent) 0%, transparent 70%)`,
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
              background: `radial-gradient(circle, color-mix(in srgb, var(--emerald-500) 18%, transparent) 0%, transparent 70%)`,
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
              background: `radial-gradient(circle, color-mix(in srgb, var(--emerald-700) 30%, transparent) 0%, transparent 70%)`,
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
                          border: `${t === 3 ? 3 : 2}px solid ${t === 3 ? `var(--emerald-500)` : `rgba(255,255,255,0.2)`}`,
                          boxShadow:
                            t === 3
                              ? `0 0 0 6px color-mix(in srgb, var(--emerald-500) 20%, transparent), 0 8px 24px rgba(0,0,0,0.4)`
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
                          border: `${t === 3 ? 3 : 2}px solid ${t === 3 ? `var(--emerald-500)` : `rgba(255,255,255,0.2)`}`,
                          boxShadow:
                            t === 3
                              ? `0 0 0 6px color-mix(in srgb, var(--emerald-500) 20%, transparent), 0 8px 24px rgba(0,0,0,0.4)`
                              : `0 4px 14px rgba(0,0,0,0.35)`,
                          background: `var(--deep)`,
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
                background: `color-mix(in srgb, var(--emerald-500) 12%, transparent)`,
                border: `1px solid color-mix(in srgb, var(--emerald-500) 30%, transparent)`,
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
                  background: `var(--online)`,
                  display: `inline-block`,
                  boxShadow: `0 0 8px var(--online)`,
                  animation: `pulse 2s infinite`,
                }}
              />
              <span
                style={{
                  fontFamily: `var(--font-ui)`,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: `var(--emerald-500)`,
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
                fontFamily: `var(--font-display)`,
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
                fontFamily: `var(--font-display)`,
                fontSize: `clamp(36px, 6vw, 72px)`,
                fontWeight: 700,
                letterSpacing: `-0.03em`,
                lineHeight: 1.15,
                paddingBottom: `0.12em`,
                display: `inline-block`,
                textAlign: `center`,
                marginBottom: 16,
                background: `linear-gradient(135deg, var(--emerald-500), var(--emerald-500), var(--mint))`,
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
                fontFamily: `var(--font-ui)`,
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
              <button className="nk-btn nk-btn-primary"
                onClick={() => u(`/signup`)}
                style={{
                  background: `linear-gradient(135deg, var(--emerald-700) 0%, var(--emerald-500) 100%)`,
                  border: `none`,
                  borderRadius: 16,
                  padding: `17px 42px`,
                  fontFamily: `var(--font-ui)`,
                  fontSize: 16,
                  fontWeight: 800,
                  color: `#fff`,
                  cursor: `pointer`,
                  letterSpacing: `0.02em`,
                  boxShadow: `0 8px 32px color-mix(in srgb, var(--emerald-500) 50%, transparent)`,
                  transition: `all 0.22s`,
                }}
              >
                Sign Up Free
              </button>
              <button className="nk-btn nk-btn-ghost"
                onClick={() => u(`/explore`)}
                style={{
                  background: `transparent`,
                  border: `2px solid rgba(255,255,255,0.18)`,
                  borderRadius: 16,
                  padding: `17px 42px`,
                  fontFamily: `var(--font-ui)`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: `rgba(255,255,255,0.75)`,
                  cursor: `pointer`,
                  letterSpacing: `0.02em`,
                  transition: `all 0.22s`,
                  backdropFilter: `blur(8px)`,
                }}
                onMouseEnter={(e) => {
                  ((e.currentTarget.style.borderColor = `var(--emerald-500)`),
                    (e.currentTarget.style.color = `var(--emerald-500)`));
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
                  background: `color-mix(in srgb, var(--emerald-500) 7%, transparent)`,
                  border: `1px solid color-mix(in srgb, var(--emerald-500) 15%, transparent)`,
                  borderRadius: 16,
                  backdropFilter: `blur(12px)`,
                  WebkitBackdropFilter: `blur(12px)`,
                  overflow: `hidden`,
                  maxWidth: `100%`,
                }}
              >
                {[
                  { to: 100, suffix: `%`, label: `Free to Browse` },
                  { to: 40, suffix: `+`, label: `Countries` },
                  { to: 0, suffix: ``, label: `Judgment` },
                ].map((e, t) => (
                  <div
                    key={t}
                    style={{
                      textAlign: `center`,
                      padding: `14px clamp(10px, 4vw, 28px)`,
                      flex: `1 1 0`,
                      minWidth: 0,
                      borderRight:
                        t < 2 ? `1px solid color-mix(in srgb, var(--emerald-500) 12%, transparent)` : `none`,
                    }}
                  >
                    <div
                      className="cta-stat-number"
                      style={{
                        fontFamily: `var(--font-display)`,
                        fontSize: 28,
                        fontWeight: 700,
                        color: `var(--emerald-500)`,
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      <CountUp to={e.to} suffix={e.suffix} />
                    </div>
                    <div
                      style={{
                        fontFamily: `var(--font-ui)`,
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
              background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 50%, var(--emerald-700) 100%)`,
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
                color: `var(--mint)`,
                fontSize: 13,
                letterSpacing: `0.18em`,
                fontFamily: `var(--font-ui)`,
                fontWeight: 600,
                textTransform: `uppercase`,
                textAlign: `center`,
              }}
            >
              Because everyone deserves a second chance at happiness.
            </span>
            <span style={{ color: `var(--emerald-500)`, fontSize: 16 }}>♥</span>
          </div>
        </section>
        <footer
          style={{
            background: `var(--deep)`,
            color: `var(--emerald-500)`,
            padding: `32px 40px`,
            textAlign: `center`,
          }}
        >
          <div
            style={{
              fontFamily: `var(--font-display)`,
              fontWeight: 700,
              fontSize: 22,
              color: `#fff`,
              letterSpacing: `-0.02em`,
              marginBottom: 10,
            }}
          >
            Nikha<span style={{ color: `var(--emerald-500)` }}>2</span>{" "}
            <span style={{ color: `var(--emerald-700)` }}>♡</span>
          </div>
          <p
            style={{
              margin: `0 0 14px`,
              fontSize: 13,
              opacity: 0.5,
              fontFamily: `var(--font-ui)`,
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
                  color: `var(--emerald-500)`,
                  opacity: 0.6,
                  textDecoration: `none`,
                  fontFamily: `var(--font-ui)`,
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
