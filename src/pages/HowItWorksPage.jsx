import { useNavigate, useSearchParams, Link } from "react-router-dom";
import * as React from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Toast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { Aurora, GoldBorder, Reveal, ShinyText, SpotlightCard } from "../components/motion";

var sn = [
  {
    icon: `✨`,
    title: `Create Profile`,
    desc: `Build your profile with your photos, preferences, and values. Tell your story authentically.`,
  },
  {
    icon: `🔍`,
    title: `Discover Matches`,
    desc: `Browse curated matches based on compatibility, shared values, and lifestyle preferences.`,
  },
  {
    icon: `💬`,
    title: `Private Chat Rooms`,
    desc: `Connect in a safe, secure environment. Start conversations with those who resonate with you.`,
  },
  {
    icon: `📹`,
    title: `Video Calling`,
    desc: `Take your connection deeper with face-to-face video calls. See the real person behind the profile.`,
  },
  {
    icon: `❤️`,
    title: `Build Connections`,
    desc: `Nurture meaningful relationships. Our support team is here to help you every step of the way.`,
  },
];

var cn = [
  {
    id: `free`,
    name: `Free`,
    badge: null,
    price: `Free`,
    period: ``,
    priceNote: null,
    bestFor: null,
    features: [
      `Unlimited Explore / browse contacts`,
      `Text messaging — up to 3 new contacts per calendar month`,
      `View and receive photos`,
      `No profile badge`,
    ],
    limitations: [
      `Voice calling`,
      `Video calling`,
      `AI-Based Match`,
      `Send view-once photos`,
      `See other users' ID / phone number`,
      `Basic or Premium badge`,
    ],
    cta: `Get Started Free`,
    popular: !1,
  },
  {
    id: `basic`,
    name: `Basic`,
    icon: `⭐`,
    badge: `Recommended`,
    price: `$30`,
    period: `/month`,
    priceNote: `Just $1/day`,
    bestFor: `Users ready to take the next step`,
    features: [
      `Unlimited Explore / browse contacts`,
      `Unlimited text messaging`,
      `Voice calling — 2 calls per contact, resets monthly`,
      `Video calling — 2 calls per contact, resets monthly`,
      `View and receive photos`,
      `"Basic" badge on your profile`,
    ],
    limitations: [
      `AI-Based Match`,
      `Send view-once photos`,
      `See other users' ID / phone number`,
    ],
    cta: `Upgrade to Basic`,
    popular: !0,
  },
  {
    id: `premium`,
    name: `Premium`,
    icon: `👑`,
    badge: null,
    price: `$100`,
    period: `/month`,
    priceNote: null,
    bestFor: `Serious users ready to find their match`,
    features: [
      `Unlimited Explore / browse contacts`,
      `Unlimited text messaging`,
      `Unlimited voice calling`,
      `Unlimited video calling`,
      `AI-Based Match — matched by shared preferences/hobbies`,
      `Send view-once photos`,
      `See other users' ID and phone number (subject to their privacy setting)`,
      `"Premium" badge on your profile`,
    ],
    limitations: [],
    cta: `Get Premium`,
    popular: !1,
  },
];

var ln = [
  {
    feature: `Explore / Browse`,
    free: `Unlimited`,
    basic: `Unlimited`,
    premium: `Unlimited`,
  },
  {
    feature: `Text Messaging`,
    free: `3 new contacts/month`,
    basic: `Unlimited`,
    premium: `Unlimited`,
  },
  {
    feature: `Voice Calling`,
    free: !1,
    basic: `2/contact/month`,
    premium: `Unlimited`,
  },
  {
    feature: `Video Calling`,
    free: !1,
    basic: `2/contact/month`,
    premium: `Unlimited`,
  },
  { feature: `AI-Based Match`, free: !1, basic: !1, premium: !0 },
  { feature: `Send View-Once Photos`, free: !1, basic: !1, premium: !0 },
  { feature: `View/Receive Photos`, free: !0, basic: !0, premium: !0 },
  { feature: `See Others' ID / Phone`, free: !1, basic: !1, premium: !0 },
  {
    feature: `Profile Badge`,
    free: `None`,
    basic: `Basic`,
    premium: `Premium`,
  },
];

var un = [
  {
    icon: `🔒`,
    title: `Secure platform`,
    desc: `End-to-end encryption and DPDP compliance.`,
  },
  {
    icon: `✅`,
    title: `Verified users`,
    desc: `Multi-layer verification including optional video KYC.`,
  },
  {
    icon: `🛡️`,
    title: `Privacy-first communication`,
    desc: `You control who sees what, always.`,
  },
];

function PlanFeatureCell({ value: e }) {
  return e === !0 ? (
    <span style={{ color: `var(--emerald-700)` }} className="text-sm font-bold">
      ✓
    </span>
  ) : e === !1 ? (
    <span
      style={{ color: `var(--danger)`, opacity: 0.55 }}
      className="text-sm font-bold"
    >
      ✕
    </span>
  ) : (
    <span className="text-xs" style={{ color: `var(--muted)` }}>
      {e}
    </span>
  );
}

// The Premium plan card gets the rotating champagne edge.
function GoldIf({ on, children }) {
  return on ? (
    <GoldBorder radius={17.5} style={{ height: `100%` }}>
      {children}
    </GoldBorder>
  ) : (
    children
  );
}

function HowItWorksPage() {
  let e = useNavigate(),
    [t] = useSearchParams(),
    [n, r] = (0, React.useState)(
      t.get(`tab`) === `membership` ? `membership` : `how`,
    ),
    { isAuthenticated: i, refreshUser: a } = useAuth(),
    [o, s] = (0, React.useState)(null),
    [c, l] = (0, React.useState)(null),
    u = async (t) => {
      if (!i) {
        e(`/signup`);
        return;
      }
      s(t);
      try {
        let n = await api.post(`/subscriptions/checkout`, { plan: t });
        if (n.checkoutUrl) {
          window.location.href = n.checkoutUrl;
          return;
        }
        (await a(), e(`/explore`));
      } catch (e) {
        (l({
          message: e.message || `Checkout failed. Please try again.`,
          tone: `error`,
        }),
          s(null));
      }
    };
  return (
    <div
      style={{
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        color: `var(--fg)`,
      }}
    >
      <style>
        {
          "\n        * { scroll-behavior: smooth; box-sizing: border-box; }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px color-mix(in srgb, var(--online) 70%, transparent); }\n          50%       { box-shadow: 0 0 16px color-mix(in srgb, var(--online) 35%, transparent); }\n        }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        .card-hover { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease; }\n        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 48px color-mix(in srgb, var(--emerald-700) 13%, transparent); }\n\n        .btn-primary {\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff; border: none; padding: 12px 32px;\n          border-radius: 32px; font-family: var(--font-ui);\n          font-size: 14px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px color-mix(in srgb, var(--shadow) 35%, transparent);\n          transition: all 0.22s;\n          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;\n        }\n        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow) 45%, transparent); }\n        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }\n\n        .btn-outline {\n          background: color-mix(in srgb, var(--surface) 92%, transparent); color: var(--emerald-700);\n          border: 2px solid var(--emerald-500); padding: 11px 28px;\n          border-radius: 32px; font-family: var(--font-ui);\n          font-size: 14px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s; backdrop-filter: blur(6px);\n        }\n        .btn-outline:hover { background: var(--surface); transform: translateY(-2px); box-shadow: 0 6px 20px color-mix(in srgb, var(--emerald-700) 20%, transparent); }\n\n        .tab-btn {\n          padding: 10px 24px; border-radius: 32px;\n          font-family: var(--font-ui); font-size: 13px; font-weight: 600;\n          border: none; cursor: pointer; transition: all 0.22s;\n          color: var(--muted); background: transparent;\n        }\n        .tab-btn.active {\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff; box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow) 30%, transparent);\n        }\n        .tab-btn:not(.active):hover { background: var(--surface-2); color: var(--fg); }\n\n        .popular-badge {\n          background: linear-gradient(135deg, var(--deep), var(--emerald-700), var(--emerald-700), var(--emerald-700), var(--deep));\n          background-size: 200% auto;\n          animation: shimmer-green 3s linear infinite;\n        }\n\n        .step-icon-even {\n          background: linear-gradient(135deg, var(--surface-2), var(--surface-2));\n          border: 2px solid color-mix(in srgb, var(--emerald-500) 30%, transparent);\n          box-shadow: 0 8px 28px color-mix(in srgb, var(--emerald-700) 13%, transparent);\n        }\n        .step-icon-odd {\n          background: linear-gradient(135deg, var(--surface-2), var(--surface-2));\n          border: 2px solid color-mix(in srgb, var(--emerald-500) 30%, transparent);\n          box-shadow: 0 8px 28px color-mix(in srgb, var(--emerald-700) 8%, transparent);\n        }\n\n        .comparison-table { width: 100%; border-collapse: collapse; font-family: var(--font-ui); font-size: 13px; }\n        .comparison-table th, .comparison-table td { padding: 14px 20px; text-align: center; }\n        .comparison-table th:first-child, .comparison-table td:first-child { text-align: left; }\n        .comparison-table thead th {\n          background: linear-gradient(135deg, var(--surface-2) 0%, var(--surface-2) 100%);\n          border-bottom: 2px solid color-mix(in srgb, var(--emerald-500) 20%, transparent);\n          color: var(--fg); font-weight: 700;\n        }\n        .comparison-table thead th:last-child { color: var(--emerald-700); }\n        .comparison-table tbody tr:nth-child(even) { background: color-mix(in srgb, var(--surface-2) 25%, transparent); }\n        .comparison-table tbody tr { transition: background 0.2s ease; }\n        .comparison-table tbody tr:hover { background: color-mix(in srgb, var(--mint) 30%, transparent); }\n\n        .trust-grid {\n          display: grid;\n          grid-template-columns: repeat(3, 1fr);\n          gap: 20px;\n        }\n        .trust-card {\n          background: color-mix(in srgb, var(--surface) 70%, transparent);\n          border: 1px solid color-mix(in srgb, var(--emerald-500) 25%, transparent);\n          backdrop-filter: blur(10px);\n          transition: all 0.3s ease;\n        }\n        .trust-card:hover {\n          background: color-mix(in srgb, var(--surface) 95%, transparent);\n          border-color: color-mix(in srgb, var(--emerald-700) 40%, transparent);\n        }\n\n        .divider-line {\n          height: 1px;\n          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--emerald-700) 35%, transparent), transparent);\n        }\n\n        .pricing-grid {\n          display: grid;\n          grid-template-columns: repeat(3, 1fr);\n          gap: 20px;\n          align-items: stretch;\n          max-width: 1180px;\n          margin: 0 auto;\n        }\n        .pricing-card {\n          background: var(--surface);\n          border: 1px solid color-mix(in srgb, var(--emerald-500) 30%, transparent);\n          transition: all 0.3s ease;\n          display: flex;\n          flex-direction: column;\n        }\n        .pricing-card:hover {\n          border-color: color-mix(in srgb, var(--emerald-700) 50%, transparent);\n          box-shadow: 0 16px 44px color-mix(in srgb, var(--emerald-700) 15%, transparent);\n        }\n        .pricing-card.popular {\n          border: 2px solid color-mix(in srgb, var(--emerald-700) 55%, transparent);\n          box-shadow: 0 16px 44px color-mix(in srgb, var(--emerald-700) 18%, transparent);\n        }\n        .pricing-feature-row { display: flex; align-items: flex-start; gap: 6px; }\n        .pricing-feature-row + .pricing-feature-row { margin-top: 3px; }\n\n        @media (max-width: 1024px) {\n          .pricing-grid { grid-template-columns: 1fr; max-width: 480px; }\n        }\n\n        /* ── HOW section viewport fit ── */\n        .how-section {\n          display: flex;\n          flex-direction: column;\n          height: calc(100vh - 128px);\n        }\n        .how-content {\n          flex: 1;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          padding: 16px 32px;\n          max-width: 1100px;\n          width: 100%;\n          margin: 0 auto;\n          gap: 12px;\n          min-height: 0;\n          overflow: hidden;\n        }\n        .steps-grid {\n          display: grid;\n          grid-template-columns: repeat(5, 1fr);\n          gap: 12px;\n          flex: 1;\n        }\n        .step-col {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          min-height: 0;\n        }\n        .step-card {\n          background: color-mix(in srgb, var(--surface) 80%, transparent);\n          border-radius: 14px;\n          padding: 14px 12px;\n          border: 1px solid var(--line);\n          box-shadow: 0 4px 18px color-mix(in srgb, var(--emerald-700) 7%, transparent);\n          text-align: center;\n          width: 100%;\n          flex: 1;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: flex-start;\n          min-height: 0;\n          overflow: hidden;\n        }\n\n        @media (max-width: 1024px) {\n            .how-section {\n              height: auto;\n              min-height: unset;\n            }\n          }\n\n        /* ── MOBILE ── */\n        @media (max-width: 768px) {\n          .how-section { min-height: unset; }\n          .how-content { padding: 16px; gap: 14px; justify-content: flex-start; }\n          .steps-grid {\n            grid-template-columns: 1fr 1fr;\n            gap: 10px;\n          }\n          .step-col:last-child { grid-column: span 2; max-width: 50%; margin: 0 auto; width: 100%; }\n          .trust-grid { grid-template-columns: 1fr !important; }\n          .comparison-table th, .comparison-table td { padding: 10px 12px; font-size: 12px; }\n          .tab-btn { padding: 9px 16px; font-size: 12px; }\n        }\n\n        @media (max-width: 480px) {\n          .steps-grid { grid-template-columns: 1fr; }\n          .step-col:last-child { grid-column: unset; max-width: 100%; }\n          .how-content { padding: 12px; }\n        }\n\n        @media (min-width: 769px) and (max-width: 1024px) {\n          .steps-grid { grid-template-columns: repeat(3, 1fr); }\n          .step-col:nth-child(4), .step-col:nth-child(5) { grid-column: span 1; }\n        }\n      "
        }
      </style>
      <Navbar />
      <div
        style={{
          display: `flex`,
          justifyContent: `center`,
          padding: `80px 24px 0`,
        }}
      >
        <div
          style={{
            display: `flex`,
            gap: 6,
            padding: 6,
            borderRadius: 40,
            background: `color-mix(in srgb, var(--mint) 25%, transparent)`,
            border: `1.5px solid color-mix(in srgb, var(--emerald-500) 30%, transparent)`,
          }}
        >
          <button
            onClick={() => r(`how`)}
            className={`nk-btn ${`tab-btn${n === `how` ? ` active` : ``}` ?? ""}`}
          >
            How It Works
          </button>
          <button
            onClick={() => r(`membership`)}
            className={`nk-btn ${`tab-btn${n === `membership` ? ` active` : ``}` ?? ""}`}
          >
            Membership Plans
          </button>
        </div>
      </div>
      {n === `how` ? (
        <div className="how-section">
          <div className="how-content">
            <div style={{ textAlign: `center`, position: `relative`, overflow: `hidden`, borderRadius: 24, padding: `28px 16px` }}>
              <Aurora intensity={0.4} />
              <p
                style={{
                  color: `var(--emerald-700)`,
                  fontSize: 11,
                  letterSpacing: `0.3em`,
                  textTransform: `uppercase`,
                  marginBottom: 6,
                  fontFamily: `var(--font-ui)`,
                  fontWeight: 600,
                }}
              >
                Your Journey to Love
              </p>
              <h1
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: `clamp(26px, 3.5vw, 42px)`,
                  fontWeight: 700,
                  color: `var(--fg)`,
                  letterSpacing: `-0.025em`,
                  marginBottom: 8,
                }}
              >
                {"How "}
                <ShinyText>Nikha2</ShinyText>
                {" Works"}
              </h1>
              <p
                style={{
                  fontFamily: `var(--font-ui)`,
                  fontSize: 13,
                  color: `var(--muted)`,
                  maxWidth: 560,
                  margin: `0 auto`,
                  lineHeight: 1.6,
                  textWrap: `pretty`,
                }}
              >
                Meet, connect, and discover meaningful relationships with ease.
                Our platform makes it easy to connect with someone who is a
                great fit for you.
              </p>
            </div>
            <Reveal stagger className="steps-grid">
              {sn.map((e, t) => (
                <div key={t} className="step-col">
                  <div
                    className={`card-hover ${t % 2 == 0 ? `step-icon-even` : `step-icon-odd`}`}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: `50%`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      fontSize: 22,
                      marginBottom: 10,
                      flexShrink: 0,
                    }}
                  >
                    {e.icon}
                  </div>
                  <div className="step-card card-hover">
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: `50%`,
                        background: `linear-gradient(135deg, var(--deep), var(--emerald-700))`,
                        color: `#fff`,
                        fontSize: 11,
                        fontWeight: 700,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        marginBottom: 8,
                        fontFamily: `var(--font-ui)`,
                        flexShrink: 0,
                      }}
                    >
                      {t + 1}
                    </div>
                    <h3
                      style={{
                        fontFamily: `var(--font-display)`,
                        fontSize: 13,
                        fontWeight: 700,
                        color: `var(--fg)`,
                        marginBottom: 6,
                        flexShrink: 0,
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 11.5,
                        color: `var(--muted)`,
                        lineHeight: 1.5,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
            <div style={{ textAlign: `center` }}>
              <button onClick={() => r(`membership`)} className="nk-btn nk-btn-primary btn-primary">
                Get Started →
              </button>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <section style={{ textAlign: `center`, padding: `24px 24px 8px`, position: `relative`, overflow: `hidden` }}>
            <Aurora intensity={0.4} />
            <p
              style={{
                color: `var(--emerald-700)`,
                fontSize: 11,
                letterSpacing: `0.3em`,
                textTransform: `uppercase`,
                marginBottom: 8,
                fontFamily: `var(--font-ui)`,
                fontWeight: 600,
              }}
            >
              Membership Plans
            </p>
            <h1
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: `clamp(24px, 3.5vw, 38px)`,
                fontWeight: 700,
                color: `var(--fg)`,
                letterSpacing: `-0.025em`,
                marginBottom: 8,
              }}
            >
              {"Choose the Right Plan for Your "}
              <ShinyText>Journey</ShinyText>
            </h1>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 13,
                color: `var(--muted)`,
                maxWidth: 500,
                margin: `0 auto`,
                lineHeight: 1.6,
              }}
            >
              Unlock powerful features designed to help you connect faster,
              safer, and more meaningfully.
            </p>
          </section>
          <section style={{ padding: `16px 24px 48px` }}>
            <div className="pricing-grid">
              {cn.map((e, t) => (
                <GoldIf key={t} on={e.name === `Premium`}>
                <SpotlightCard
                  className={`pricing-card rounded-2xl p-4 relative card-hover ${e.popular ? `popular` : ``}`}
                  style={{
                    borderRadius: 16,
                    padding: 16,
                    position: `relative`,
                    height: `100%`,
                  }}
                >
                  {e.badge && (
                    <div
                      className="popular-badge"
                      style={{
                        position: `absolute`,
                        top: -12,
                        left: `50%`,
                        transform: `translateX(-50%)`,
                        padding: `4px 16px`,
                        borderRadius: 20,
                        fontSize: 10,
                        fontWeight: 600,
                        color: `#fff`,
                        whiteSpace: `nowrap`,
                        fontFamily: `var(--font-ui)`,
                      }}
                    >
                      {e.badge}
                    </div>
                  )}
                  <div style={{ textAlign: `center`, marginBottom: 8 }}>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: `var(--fg)`,
                        marginBottom: 2,
                        fontFamily: `var(--font-display)`,
                      }}
                    >
                      {e.icon ? `${e.icon} ` : ``}
                      {e.name}
                    </h3>
                    {e.bestFor && (
                      <p
                        style={{
                          fontSize: 10,
                          color: `var(--muted)`,
                          marginBottom: 4,
                          lineHeight: 1.4,
                          fontFamily: `var(--font-ui)`,
                        }}
                      >
                        {"Best for: "}
                        {e.bestFor}
                      </p>
                    )}
                    <div
                      style={{
                        display: `flex`,
                        alignItems: `baseline`,
                        justifyContent: `center`,
                        gap: 4,
                      }}
                    >
                      <span
                        className="nk-shiny"
                        style={{ fontSize: 26, fontWeight: 700 }}
                      >
                        {e.price}
                      </span>
                      {e.period && (
                        <span
                          style={{
                            fontSize: 12,
                            color: `var(--muted)`,
                            fontFamily: `var(--font-ui)`,
                          }}
                        >
                          {e.period}
                        </span>
                      )}
                    </div>
                    {e.priceNote && (
                      <p
                        style={{
                          fontSize: 10,
                          color: `var(--muted)`,
                          fontFamily: `var(--font-ui)`,
                        }}
                      >
                        ({e.priceNote})
                      </p>
                    )}
                  </div>
                  <div style={{ marginBottom: 12, flex: 1 }}>
                    {e.features.map((e, t) => (
                      <div key={`f${t}`} className="pricing-feature-row">
                        <span
                          style={{
                            color: `var(--emerald-700)`,
                            fontSize: 12,
                            marginTop: 1,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: `var(--fg)`,
                            lineHeight: 1.4,
                            fontFamily: `var(--font-ui)`,
                          }}
                        >
                          {e}
                        </span>
                      </div>
                    ))}
                    {e.limitations.map((e, t) => (
                      <div key={`l${t}`} className="pricing-feature-row">
                        <span
                          style={{
                            color: `var(--danger)`,
                            opacity: 0.5,
                            fontSize: 12,
                            marginTop: 1,
                            flexShrink: 0,
                          }}
                        >
                          ✕
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: `var(--muted)`,
                            lineHeight: 1.4,
                            fontFamily: `var(--font-ui)`,
                          }}
                        >
                          {e}
                        </span>
                      </div>
                    ))}
                  </div>
                  {e.popular ? (
                    <button
                      onClick={() => u(e.id)}
                      disabled={o === e.id}
                      className="nk-btn nk-btn-primary btn-primary"
                      style={{
                        width: `100%`,
                        justifyContent: `center`,
                        fontSize: 12,
                        padding: `10px 0`,
                      }}
                    >
                      {o === e.id ? `Processing…` : e.cta}
                    </button>
                  ) : (
                    <button className="nk-btn nk-btn-ghost"
                      onClick={() => u(e.id)}
                      disabled={o === e.id}
                      style={{
                        width: `100%`,
                        padding: `10px 0`,
                        borderRadius: 32,
                        fontFamily: `var(--font-ui)`,
                        fontSize: 12,
                        fontWeight: 700,
                        border: `2px solid var(--emerald-700)`,
                        color: `var(--emerald-700)`,
                        background: `transparent`,
                        cursor: `pointer`,
                        transition: `all 0.22s`,
                      }}
                      onMouseEnter={(e) => {
                        ((e.currentTarget.style.background = `var(--emerald-700)`),
                          (e.currentTarget.style.color = `#fff`));
                      }}
                      onMouseLeave={(e) => {
                        ((e.currentTarget.style.background = `transparent`),
                          (e.currentTarget.style.color = `var(--emerald-700)`));
                      }}
                    >
                      {o === e.id ? `Processing…` : e.cta}
                    </button>
                  )}
                </SpotlightCard>
                </GoldIf>
              ))}
            </div>
          </section>
          <div className="divider-line" style={{ margin: `0 32px` }} />
          <section style={{ padding: `48px 24px` }}>
            <div style={{ maxWidth: 900, margin: `0 auto` }}>
              <div style={{ textAlign: `center`, marginBottom: 32 }}>
                <p
                  style={{
                    color: `var(--emerald-700)`,
                    fontSize: 12,
                    letterSpacing: `0.3em`,
                    textTransform: `uppercase`,
                    marginBottom: 10,
                    fontFamily: `var(--font-ui)`,
                    fontWeight: 600,
                  }}
                >
                  Compare Plans
                </p>
                <h2
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `var(--fg)`,
                  }}
                >
                  {"Feature "}
                  <ShinyText>Comparison</ShinyText>
                </h2>
              </div>
              <div
                style={{
                  overflowX: `auto`,
                  borderRadius: 16,
                  border: `1px solid color-mix(in srgb, var(--emerald-500) 30%, transparent)`,
                  boxShadow: `0 2px 12px color-mix(in srgb, var(--emerald-700) 6%, transparent)`,
                }}
              >
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Free</th>
                      <th>Basic</th>
                      <th>Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ln.map((e, t) => (
                      <tr key={t}>
                        <td
                          style={{
                            fontWeight: 600,
                            color: `var(--fg)`,
                          }}
                        >
                          {e.feature}
                        </td>
                        <td>
                          <PlanFeatureCell value={e.free} />
                        </td>
                        <td>
                          <PlanFeatureCell value={e.basic} />
                        </td>
                        <td>
                          <PlanFeatureCell value={e.premium} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <div className="divider-line" style={{ margin: `0 32px` }} />
          <section style={{ padding: `48px 24px` }}>
            <div style={{ maxWidth: 1080, margin: `0 auto` }}>
              <div style={{ textAlign: `center`, marginBottom: 32 }}>
                <p
                  style={{
                    color: `var(--emerald-700)`,
                    fontSize: 12,
                    letterSpacing: `0.3em`,
                    textTransform: `uppercase`,
                    marginBottom: 10,
                    fontFamily: `var(--font-ui)`,
                    fontWeight: 600,
                  }}
                >
                  Trust & Safety
                </p>
                <h2
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `var(--fg)`,
                  }}
                >
                  {"Your Safety, Our "}
                  <ShinyText>Priority</ShinyText>
                </h2>
              </div>
              <Reveal stagger className="trust-grid">
                {un.map((e, t) => (
                  <div
                    key={t}
                    className="trust-card card-hover"
                    style={{
                      borderRadius: 16,
                      padding: 28,
                      textAlign: `center`,
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>
                      {e.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: `var(--fg)`,
                        marginBottom: 8,
                        fontFamily: `var(--font-display)`,
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: `var(--muted)`,
                        lineHeight: 1.6,
                        fontFamily: `var(--font-ui)`,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
          <div className="divider-line" style={{ margin: `0 32px` }} />
          <section style={{ padding: `48px 24px 64px` }}>
            <div
              style={{
                maxWidth: 900,
                margin: `0 auto`,
                borderRadius: 24,
                overflow: `hidden`,
                position: `relative`,
                background: `linear-gradient(135deg, var(--surface-2) 0%, var(--surface-2) 50%, var(--surface-2) 100%)`,
                border: `1px solid color-mix(in srgb, var(--emerald-500) 25%, transparent)`,
              }}
            >
              <div
                style={{
                  position: `relative`,
                  zIndex: 1,
                  padding: `48px 32px`,
                  textAlign: `center`,
                }}
              >
                <h2
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `var(--fg)`,
                    marginBottom: 12,
                  }}
                >
                  {"Start Your Journey "}
                  <ShinyText>Today</ShinyText>
                </h2>
                <p
                  style={{
                    color: `var(--muted)`,
                    marginBottom: 24,
                    maxWidth: 460,
                    margin: `0 auto 24px`,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                  }}
                >
                  Upgrade your experience and find meaningful connections
                  faster.
                </p>
                <div
                  style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    gap: 14,
                  }}
                >
                  <button
                    onClick={() => u(`premium`)}
                    disabled={o === `premium`}
                    className="nk-btn nk-btn-primary btn-primary"
                    style={{ fontSize: 14, padding: `14px 36px` }}
                  >
                    {o === `premium` ? `Processing…` : `Get Premium →`}
                  </button>
                  <button className="nk-btn nk-btn-ghost"
                    onClick={() => u(`free`)}
                    style={{
                      border: `2px solid var(--emerald-700)`,
                      color: `var(--emerald-700)`,
                      background: `transparent`,
                      fontFamily: `var(--font-ui)`,
                      fontSize: 14,
                      fontWeight: 700,
                      padding: `13px 36px`,
                      borderRadius: 32,
                      cursor: `pointer`,
                      transition: `all 0.22s`,
                    }}
                    onMouseEnter={(e) => {
                      ((e.currentTarget.style.background = `var(--emerald-700)`),
                        (e.currentTarget.style.color = `#fff`));
                    }}
                    onMouseLeave={(e) => {
                      ((e.currentTarget.style.background = `transparent`),
                        (e.currentTarget.style.color = `var(--emerald-700)`));
                    }}
                  >
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
      <footer
        style={{
          background: `var(--deep)`,
          color: `var(--emerald-500)`,
          padding: `28px 24px`,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            fontFamily: `var(--font-display)`,
            fontWeight: 700,
            fontSize: 20,
            color: `#fff`,
            letterSpacing: `-0.02em`,
            marginBottom: 8,
          }}
        >
          Nikha<span style={{ color: `var(--emerald-500)` }}>2</span>{" "}
          <span style={{ color: `var(--emerald-700)` }}>♡</span>
        </div>
        <p
          style={{
            margin: `0 0 12px`,
            fontSize: 12,
            opacity: 0.5,
            fontFamily: `var(--font-ui)`,
          }}
        >
          © 2026 Nikha2 — The Second Chance. All rights reserved.
        </p>
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            gap: 20,
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
      {c && (
        <Toast message={c.message} tone={c.tone} onDismiss={() => l(null)} />
      )}
    </div>
  );
}

export { HowItWorksPage };
