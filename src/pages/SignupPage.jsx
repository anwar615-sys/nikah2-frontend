import * as React from "react";
import { TERMS_SECTIONS } from "../lib/legal";
import { Link, useNavigate } from "react-router-dom";
import { CountryStateSelect } from "../components/CountryStateSelect";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { ThemeToggle } from "../components/ThemeToggle";

var zn = {
  width: `100%`,
  padding: `11px 14px`,
  borderRadius: 12,
  border: `1.5px solid var(--line)`,
  background: `var(--bg)`,
  color: `var(--fg)`,
  fontSize: 13.5,
  fontFamily: `var(--font-ui)`,
  outline: `none`,
};

function UsernameField({
  value: e,
  onChange: t,
  onAvailabilityChange: n,
  inputStyle: r = zn,
  label: i = `Choose Your Username`,
  helpText:
    a = `3-20 characters: lowercase letters, numbers, and underscores. This can't be changed once set.`,
  disabled: o = !1,
}) {
  let [s, c] = (0, React.useState)(`idle`),
    l = (0, React.useRef)(null),
    u = (0, React.useRef)(0);
  (0, React.useEffect)(() => {
    if (o) return;
    if ((clearTimeout(l.current), !e)) {
      (c(`idle`), n?.(null));
      return;
    }
    if (e.length < 3) {
      (c(`invalid`), n?.(!1));
      return;
    }
    c(`checking`);
    let t = ++u.current;
    return (
      (l.current = setTimeout(async () => {
        try {
          let r = await api.get(
            `/auth/check-username/${encodeURIComponent(e)}`,
          );
          if (u.current !== t) return;
          r.available
            ? (c(`available`), n?.(!0))
            : (c(r.reason === `invalid_format` ? `invalid` : `taken`), n?.(!1));
        } catch {
          if (u.current !== t) return;
          (c(`idle`), n?.(null));
        }
      }, 400)),
      () => clearTimeout(l.current)
    );
  }, [e, o]);
  let d = (e) => {
    t(
      e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, ``)
        .slice(0, 20),
    );
  };
  if (o && e)
    return (
      <div>
        {i && (
          <label
            style={{
              display: `block`,
              fontSize: 10.5,
              fontWeight: 700,
              color: `var(--muted)`,
              letterSpacing: `0.08em`,
              textTransform: `uppercase`,
              marginBottom: 6,
            }}
          >
            Your Username
          </label>
        )}
        <div
          style={{
            display: `inline-flex`,
            alignItems: `center`,
            gap: 8,
            background: `var(--surface-2)`,
            border: `1.5px solid var(--line)`,
            borderRadius: 20,
            padding: `8px 16px`,
            fontFamily: `monospace`,
            fontSize: 13,
            color: `var(--emerald-700)`,
            fontWeight: 700,
          }}
        >
          @{e}
        </div>
        <p style={{ fontSize: 11, color: `var(--muted)`, marginTop: 6 }}>
          This is permanent and can't be changed.
        </p>
      </div>
    );
  let f =
    s === `taken` || s === `invalid`
      ? `var(--danger)`
      : s === `available`
        ? `var(--emerald-700)`
        : null;
  return (
    <div>
      {i && (
        <label
          style={{
            display: `block`,
            fontSize: 10.5,
            fontWeight: 700,
            color: `var(--muted)`,
            letterSpacing: `0.08em`,
            textTransform: `uppercase`,
            marginBottom: 6,
          }}
        >
          {i}
        </label>
      )}
      <input
        type="text"
        value={e}
        onChange={d}
        placeholder="e.g. jane_doe23"
        autoCapitalize="none"
        autoCorrect="off"
        style={f ? { ...r, border: `1.5px solid ${f}` } : r}
      />
      {s === `checking` && (
        <p style={{ fontSize: 11.5, color: `var(--muted)`, marginTop: 5 }}>
          Checking availability…
        </p>
      )}
      {s === `available` && (
        <p
          style={{
            fontSize: 11.5,
            color: `var(--emerald-700)`,
            fontWeight: 600,
            marginTop: 5,
          }}
        >
          ✓ Username available
        </p>
      )}
      {s === `taken` && (
        <p
          style={{
            fontSize: 11.5,
            color: `var(--danger)`,
            fontWeight: 600,
            marginTop: 5,
          }}
        >
          This username has already been taken.
        </p>
      )}
      {s === `invalid` && (
        <p
          style={{
            fontSize: 11.5,
            color: `var(--danger)`,
            fontWeight: 600,
            marginTop: 5,
          }}
        >
          {e.length > 0 && e.length < 3
            ? `Username must be at least 3 characters.`
            : `Only lowercase letters, numbers, and underscores allowed.`}
        </p>
      )}
      {s === `idle` && a && (
        <p style={{ fontSize: 11, color: `var(--muted)`, marginTop: 5 }}>{a}</p>
      )}
    </div>
  );
}

var Vn = {
  width: `100%`,
  fontSize: 12,
  padding: `9px 12px`,
  borderRadius: 14,
  background: `color-mix(in srgb, var(--surface) 65%, transparent)`,
  border: `1.5px solid var(--line)`,
  color: `var(--fg)`,
  fontFamily: `var(--font-ui)`,
  outline: `none`,
};

var Hn = {
  display: `block`,
  fontFamily: `var(--font-ui)`,
  fontSize: 9.5,
  fontWeight: 700,
  color: `var(--muted)`,
  letterSpacing: `0.1em`,
  textTransform: `uppercase`,
  marginBottom: 5,
};

var Un = [
  { code: `+93`, country: `Afghanistan`, flag: `🇦🇫` },
  { code: `+355`, country: `Albania`, flag: `🇦🇱` },
  { code: `+213`, country: `Algeria`, flag: `🇩🇿` },
  { code: `+54`, country: `Argentina`, flag: `🇦🇷` },
  { code: `+61`, country: `Australia`, flag: `🇦🇺` },
  { code: `+43`, country: `Austria`, flag: `🇦🇹` },
  { code: `+973`, country: `Bahrain`, flag: `🇧🇭` },
  { code: `+880`, country: `Bangladesh`, flag: `🇧🇩` },
  { code: `+32`, country: `Belgium`, flag: `🇧🇪` },
  { code: `+55`, country: `Brazil`, flag: `🇧🇷` },
  { code: `+1`, country: `Canada`, flag: `🇨🇦` },
  { code: `+86`, country: `China`, flag: `🇨🇳` },
  { code: `+45`, country: `Denmark`, flag: `🇩🇰` },
  { code: `+20`, country: `Egypt`, flag: `🇪🇬` },
  { code: `+358`, country: `Finland`, flag: `🇫🇮` },
  { code: `+33`, country: `France`, flag: `🇫🇷` },
  { code: `+49`, country: `Germany`, flag: `🇩🇪` },
  { code: `+91`, country: `India`, flag: `🇮🇳` },
  { code: `+62`, country: `Indonesia`, flag: `🇮🇩` },
  { code: `+964`, country: `Iraq`, flag: `🇮🇶` },
  { code: `+353`, country: `Ireland`, flag: `🇮🇪` },
  { code: `+39`, country: `Italy`, flag: `🇮🇹` },
  { code: `+81`, country: `Japan`, flag: `🇯🇵` },
  { code: `+962`, country: `Jordan`, flag: `🇯🇴` },
  { code: `+965`, country: `Kuwait`, flag: `🇰🇼` },
  { code: `+961`, country: `Lebanon`, flag: `🇱🇧` },
  { code: `+60`, country: `Malaysia`, flag: `🇲🇾` },
  { code: `+212`, country: `Morocco`, flag: `🇲🇦` },
  { code: `+31`, country: `Netherlands`, flag: `🇳🇱` },
  { code: `+64`, country: `New Zealand`, flag: `🇳🇿` },
  { code: `+234`, country: `Nigeria`, flag: `🇳🇬` },
  { code: `+47`, country: `Norway`, flag: `🇳🇴` },
  { code: `+968`, country: `Oman`, flag: `🇴🇲` },
  { code: `+92`, country: `Pakistan`, flag: `🇵🇰` },
  { code: `+63`, country: `Philippines`, flag: `🇵🇭` },
  { code: `+48`, country: `Poland`, flag: `🇵🇱` },
  { code: `+351`, country: `Portugal`, flag: `🇵🇹` },
  { code: `+974`, country: `Qatar`, flag: `🇶🇦` },
  { code: `+7`, country: `Russia`, flag: `🇷🇺` },
  { code: `+966`, country: `Saudi Arabia`, flag: `🇸🇦` },
  { code: `+65`, country: `Singapore`, flag: `🇸🇬` },
  { code: `+27`, country: `South Africa`, flag: `🇿🇦` },
  { code: `+82`, country: `South Korea`, flag: `🇰🇷` },
  { code: `+34`, country: `Spain`, flag: `🇪🇸` },
  { code: `+94`, country: `Sri Lanka`, flag: `🇱🇰` },
  { code: `+46`, country: `Sweden`, flag: `🇸🇪` },
  { code: `+41`, country: `Switzerland`, flag: `🇨🇭` },
  { code: `+963`, country: `Syria`, flag: `🇸🇾` },
  { code: `+66`, country: `Thailand`, flag: `🇹🇭` },
  { code: `+90`, country: `Turkey`, flag: `🇹🇷` },
  { code: `+971`, country: `UAE`, flag: `🇦🇪` },
  { code: `+44`, country: `UK`, flag: `🇬🇧` },
  { code: `+1`, country: `US`, flag: `🇺🇸` },
  { code: `+967`, country: `Yemen`, flag: `🇾🇪` },
];

function SignupPasswordToggle({ shown: e, onClick: t }) {
  return (
    <button className="nk-btn nk-btn-soft"
      type="button"
      onClick={t}
      tabIndex={-1}
      aria-label={e ? `Hide password` : `Show password`}
      style={{
        position: `absolute`,
        right: 12,
        top: `50%`,
        transform: `translateY(-50%)`,
        background: `none`,
        border: `none`,
        padding: 4,
        cursor: `pointer`,
        color: `var(--emerald-500)`,
        display: `flex`,
        alignItems: `center`,
      }}
    >
      {e ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.8 21.8 0 015.06-6.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a21.8 21.8 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}

function SignupPage() {
  let [e, t] = (0, React.useState)(1),
    [n, r] = (0, React.useState)(``),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(``),
    [c, l] = (0, React.useState)(``),
    [u, d] = (0, React.useState)(!1),
    [f, p] = (0, React.useState)(!1),
    [m, h] = (0, React.useState)(``),
    [g, _] = (0, React.useState)(``),
    [y, b] = (0, React.useState)(``),
    [x, S] = (0, React.useState)(``),
    [C, w] = (0, React.useState)(null),
    [T, E] = (0, React.useState)(``),
    [ee, D] = (0, React.useState)(``),
    [O, k] = (0, React.useState)(`+91`),
    [A, te] = (0, React.useState)(``),
    [ne, re] = (0, React.useState)(``),
    [ie, j] = (0, React.useState)(!1),
    [M, ae] = (0, React.useState)(!1),
    [oe, se] = (0, React.useState)(!1),
    ce = (0, React.useRef)(null),
    [N, P] = (0, React.useState)(!1),
    [F, le] = (0, React.useState)(!1),
    [ue, de] = (0, React.useState)(!1),
    [fe, pe] = (0, React.useState)(!1),
    me = (0, React.useRef)(null),
    he = (0, React.useRef)(null),
    ge = (0, React.useRef)(null),
    _e = (0, React.useRef)(null),
    [ve, ye] = (0, React.useState)(``),
    [I, be] = (0, React.useState)(!1),
    { signup: xe } = useAuth(),
    Se = useNavigate();
  return (
    (0, React.useEffect)(() => {
      function e(e) {
        (ce.current && !ce.current.contains(e.target) && se(!1),
          me.current && !me.current.contains(e.target) && P(!1),
          he.current && !he.current.contains(e.target) && le(!1),
          ge.current && !ge.current.contains(e.target) && de(!1),
          _e.current && !_e.current.contains(e.target) && pe(!1));
      }
      return (
        document.addEventListener(`mousedown`, e),
        () => document.removeEventListener(`mousedown`, e)
      );
    }, []),
    (
      <div style={{ height: `100vh`, display: `flex`, overflow: `hidden` }}>
        <style>
          {
            "\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .signup-input {\n          width: 100%;\n          padding: 11px 16px;\n          border-radius: 14px;\n          background: color-mix(in srgb, var(--surface) 65%, transparent);\n          border: 1.5px solid var(--line);\n          color: var(--fg);\n          font-size: 13px;\n          font-family: var(--font-ui);\n          outline: none;\n          transition: border-color 0.2s, box-shadow 0.2s;\n          appearance: none;\n        }\n        .signup-input::placeholder { color: var(--muted); }\n        .signup-input:focus {\n          border-color: var(--emerald-500);\n          box-shadow: 0 0 0 3px color-mix(in srgb, var(--emerald-500) 12%, transparent);\n        }\n\n        .signup-label {\n          display: block;\n          font-family: var(--font-ui);\n          font-size: 10px;\n          font-weight: 700;\n          color: var(--muted);\n          letter-spacing: 0.1em;\n          text-transform: uppercase;\n          margin-bottom: 5px;\n        }\n\n        .btn-submit {\n          width: 100%;\n          padding: 13px 0;\n          border-radius: 32px;\n          border: none;\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff;\n          font-family: var(--font-ui);\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px color-mix(in srgb, var(--shadow) 30%, transparent);\n          transition: all 0.22s;\n        }\n        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow) 40%, transparent); }\n        .btn-submit:active { transform: scale(0.98); }\n        .btn-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }\n\n        .btn-back {\n          flex: 1;\n          padding: 13px 0;\n          border-radius: 32px;\n          border: 2px solid var(--emerald-500);\n          background: transparent;\n          color: var(--emerald-700);\n          font-family: var(--font-ui);\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          transition: all 0.22s;\n        }\n        .btn-back:hover { background: color-mix(in srgb, var(--emerald-700) 8%, transparent); }\n\n        /* Step indicator dot */\n        .step-dot {\n          width: 38px; height: 38px; border-radius: 50%;\n          display: flex; align-items: center; justify-content: center;\n          font-family: var(--font-ui);\n          font-size: 14px; font-weight: 700;\n          transition: all 0.3s;\n        }\n        .step-dot.active {\n          background: linear-gradient(135deg, var(--deep), var(--emerald-700));\n          color: #fff;\n          box-shadow: 0 4px 14px color-mix(in srgb, var(--shadow) 35%, transparent);\n        }\n        .step-dot.inactive {\n          background: var(--surface-2);\n          color: var(--emerald-500);\n        }\n\n        /* Modal scrollbar */\n        .terms-scroll::-webkit-scrollbar { width: 4px; }\n        .terms-scroll::-webkit-scrollbar-track { background: var(--bg); }\n        .terms-scroll::-webkit-scrollbar-thumb { background: var(--emerald-500); border-radius: 4px; }\n\n        @media (max-width: 1024px) {\n          .left-panel { display: none !important; }\n          .right-panel { width: 100% !important; }\n        }\n      "
          }
        </style>
        <ThemeToggle style={{ position: `fixed`, top: 16, right: 16, zIndex: 60 }} />
        <div
          className="left-panel"
          style={{
            width: `50%`,
            position: `relative`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            overflow: `hidden`,
            background: `linear-gradient(135deg, var(--deep) 0%, var(--deep) 100%)`,
            flexDirection: `column`,
            padding: `40px`,
          }}
        >
          <img
            src="/assets/hero.webp"
            className="nk-kenburns"
            alt="Couple"
            style={{
              position: `absolute`,
              inset: 0,
              width: `100%`,
              height: `100%`,
              objectFit: `cover`,
              opacity: 0.35,
            }}
          />
          <div
            style={{
              position: `absolute`,
              inset: 0,
              background: `linear-gradient(135deg, color-mix(in srgb, var(--emerald-700) 50%, transparent) 0%, transparent 50%, color-mix(in srgb, var(--overlay) 40%, transparent) 100%)`,
            }}
          />
          <div
            style={{
              position: `relative`,
              zIndex: 1,
              textAlign: `center`,
              padding: `0 32px`,
              maxWidth: 380,
            }}
          >
            <div style={{ marginBottom: 40 }}>
              <Link
                to="/"
                style={{
                  display: `inline-flex`,
                  alignItems: `center`,
                  gap: 8,
                  textDecoration: `none`,
                }}
              >
                <span
                  className="nk-shiny"
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: 48,
                    fontWeight: 700,
                    letterSpacing: `-0.02em`,
                  }}
                >
                  Nikha2
                </span>
                <span
                  style={{
                    fontFamily: `var(--font-ui)`,
                    fontSize: 12,
                    padding: `4px 12px`,
                    borderRadius: 20,
                    color: `var(--emerald-700)`,
                    border: `1.5px solid var(--emerald-500)`,
                  }}
                >
                  ™
                </span>
              </Link>
            </div>
            <h2
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: 28,
                fontWeight: 700,
                color: `#fff`,
                marginBottom: 12,
                letterSpacing: `-0.02em`,
              }}
            >
              The Second Chance
            </h2>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 14,
                color: `var(--mint)`,
                marginBottom: 28,
                letterSpacing: `0.05em`,
                textTransform: `uppercase`,
                fontWeight: 600,
              }}
            >
              Global Matchmaking Platform
            </p>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 15,
                color: `rgba(255,255,255,0.75)`,
                lineHeight: 1.8,
              }}
            >
              Join thousands of single parents who trusted Nikha2 with their
              most important search.
            </p>
          </div>
        </div>
        <div
          className="right-panel"
          style={{
            width: `50%`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            padding: `0 24px`,
            background: `var(--bg)`,
            overflowY: `auto`,
          }}
        >
          <div className="nk-rise" style={{ width: `100%`, maxWidth: 380, padding: `24px 0` }}>
            <div
              style={{
                background: `color-mix(in srgb, var(--surface) 75%, transparent)`,
                backdropFilter: `blur(20px)`,
                border: `1px solid color-mix(in srgb, var(--emerald-500) 18%, transparent)`,
                borderRadius: 24,
                padding: `24px 22px 28px`,
                boxShadow: `0 12px 48px color-mix(in srgb, var(--shadow) 10%, transparent)`,
              }}
            >
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `center`,
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div className={`step-dot ${e === 1 ? `active` : `inactive`}`}>
                  1
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 4,
                    background:
                      e === 2
                        ? `linear-gradient(90deg, var(--deep), var(--emerald-700))`
                        : `var(--surface-2)`,
                    transition: `background 0.3s`,
                  }}
                />
                <div className={`step-dot ${e === 2 ? `active` : `inactive`}`}>
                  2
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <h2
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: 18,
                    fontWeight: 700,
                    color: `var(--fg)`,
                  }}
                >
                  {e === 1 ? `Create Your Account` : `Complete Your Profile`}
                </h2>
                <p
                  style={{
                    fontFamily: `var(--font-ui)`,
                    fontSize: 11,
                    color: `var(--emerald-500)`,
                    marginTop: 3,
                  }}
                >
                  {e === 1
                    ? `Step 1 of 2: Login Details`
                    : `Step 2 of 2: Profile Information`}
                </p>
              </div>
              {e === 1 && (
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 12,
                  }}
                >
                  <div>
                    <label className="signup-label">Full Name</label>
                    <input
                      type="text"
                      required={!0}
                      value={n}
                      onChange={(e) => r(e.target.value)}
                      placeholder="Enter your name"
                      className="signup-input"
                    />
                  </div>
                  <div>
                    <label className="signup-label">Email</label>
                    <input
                      type="email"
                      required={!0}
                      value={i}
                      onChange={(e) => a(e.target.value)}
                      placeholder="you@example.com"
                      className="signup-input"
                    />
                  </div>
                  <div style={{ display: `flex`, gap: 8 }}>
                    <div
                      style={{ position: `relative`, flexShrink: 0 }}
                      ref={ce}
                    >
                      <label className="signup-label" style={{ fontSize: 9.5 }}>
                        Phone
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          (se(!oe), le(!1), de(!1), pe(!1));
                        }}
                        className="nk-btn nk-btn-soft signup-input"
                        style={{
                          width: 100,
                          fontSize: 12,
                          padding: `9px 10px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: `var(--fg)`,
                        }}
                      >
                        <span>
                          {Un.find((e) => e.code === O)?.flag} {O}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `var(--emerald-500)`,
                            transform: oe ? `rotate(180deg)` : `rotate(0deg)`,
                            transition: `transform 0.2s`,
                            flexShrink: 0,
                          }}
                        >
                          ▼
                        </span>
                      </button>
                      {oe && (
                        <div
                          style={{
                            position: `absolute`,
                            top: `110%`,
                            left: 0,
                            zIndex: 50,
                            background: `var(--surface)`,
                            borderRadius: 14,
                            border: `1.5px solid var(--line)`,
                            boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                            overflow: `hidden`,
                            width: 200,
                          }}
                        >
                          <div
                            style={{
                              maxHeight: 220,
                              overflowY: `auto`,
                              padding: `6px 8px`,
                            }}
                          >
                            {Un.map(({ code: e, country: t, flag: n }) => (
                              <button className="nk-btn nk-btn-soft"
                                key={e}
                                type="button"
                                onClick={() => {
                                  (k(e), se(!1));
                                }}
                                style={{
                                  width: `100%`,
                                  textAlign: `left`,
                                  padding: `7px 10px`,
                                  border: `none`,
                                  background:
                                    O === e ? `var(--surface-2)` : `transparent`,
                                  color: O === e ? `var(--emerald-700)` : `var(--fg)`,
                                  fontWeight: O === e ? 700 : 400,
                                  fontFamily: `var(--font-ui)`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `var(--surface-2)`)
                                }
                                onMouseLeave={(t) =>
                                  (t.currentTarget.style.background =
                                    O === e ? `var(--surface-2)` : `transparent`)
                                }
                              >
                                <span style={{ fontSize: 15 }}>{n}</span>
                                <span>
                                  {n} {t}
                                  {" ("}
                                  {e})
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="signup-label" style={{ fontSize: 9.5 }}>
                        {" "}
                      </label>
                      <input
                        type="tel"
                        value={ee}
                        onChange={(e) => {
                          D(e.target.value.replace(/\D/g, ``).slice(0, 10));
                        }}
                        placeholder="10-digit number"
                        maxLength={10}
                        className="signup-input"
                        style={{ fontSize: 12, padding: `9px 12px` }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="signup-label">Password</label>
                    <div style={{ position: `relative` }}>
                      <input
                        type={u ? `text` : `password`}
                        required={!0}
                        value={o}
                        onChange={(e) => s(e.target.value)}
                        placeholder="••••••••"
                        className="signup-input"
                        style={{ paddingRight: 38 }}
                      />
                      <SignupPasswordToggle
                        shown={u}
                        onClick={() => d((e) => !e)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="signup-label">Confirm Password</label>
                    <div style={{ position: `relative` }}>
                      <input
                        type={f ? `text` : `password`}
                        required={!0}
                        value={c}
                        onChange={(e) => l(e.target.value)}
                        placeholder="••••••••"
                        className="signup-input"
                        style={{ paddingRight: 38 }}
                      />
                      <SignupPasswordToggle
                        shown={f}
                        onClick={() => p((e) => !e)}
                      />
                    </div>
                  </div>
                  {ve && (
                    <p
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 12,
                        color: `var(--danger)`,
                        background: `color-mix(in srgb, var(--danger) 8%, transparent)`,
                        padding: `8px 12px`,
                        borderRadius: 10,
                      }}
                    >
                      {ve}
                    </p>
                  )}
                  <button
                    onClick={(e) => {
                      (e.preventDefault(),
                        ye(``),
                        n && i && o && c
                          ? o === c
                            ? t(2)
                            : ye(`Passwords do not match`)
                          : ye(`Please fill in all required fields`));
                    }}
                    className="nk-btn nk-btn-primary btn-submit"
                    style={{ marginTop: 4 }}
                  >
                    Next →
                  </button>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      gap: 10,
                      margin: `2px 0`,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: `linear-gradient(to right, transparent, var(--surface-2))`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 10,
                        color: `var(--muted)`,
                        textTransform: `uppercase`,
                        letterSpacing: `0.15em`,
                      }}
                    >
                      or
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: `linear-gradient(to left, transparent, var(--surface-2))`,
                      }}
                    />
                  </div>
                  <GoogleSignInButton redirectTo="/explore" onError={ye} />
                </div>
              )}
              {e === 2 && (
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 11,
                  }}
                >
                  <div
                    style={{
                      display: `grid`,
                      gridTemplateColumns: `1fr 1fr`,
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        position: `relative`,
                        gridColumn: `1 / -1`,
                      }}
                      ref={me}
                    >
                      <label className="signup-label" style={{ fontSize: 9.5 }}>
                        I am a
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          (P(!N), se(!1), le(!1), de(!1), pe(!1));
                        }}
                        className="nk-btn nk-btn-soft signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: m ? `var(--fg)` : `var(--muted)`,
                        }}
                      >
                        <span>
                          {{
                            woman: `Female`,
                            man: `Male`,
                            other: `Other`,
                            prefer_not_to_say: `Prefer not to say`,
                          }[m] || `Select gender`}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `var(--emerald-500)`,
                            transform: N ? `rotate(180deg)` : `rotate(0deg)`,
                            transition: `transform 0.2s`,
                            flexShrink: 0,
                          }}
                        >
                          ▼
                        </span>
                      </button>
                      {N && (
                        <div
                          style={{
                            position: `absolute`,
                            top: `110%`,
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: `var(--surface)`,
                            borderRadius: 14,
                            border: `1.5px solid var(--line)`,
                            boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                            overflow: `hidden`,
                          }}
                        >
                          <div style={{ padding: `6px 8px` }}>
                            {[
                              { value: `woman`, label: `Female` },
                              { value: `man`, label: `Male` },
                              { value: `other`, label: `Other` },
                              {
                                value: `prefer_not_to_say`,
                                label: `Prefer not to say`,
                              },
                            ].map(({ value: e, label: t }) => (
                              <button className="nk-btn nk-btn-soft"
                                key={e}
                                type="button"
                                onClick={() => {
                                  (h(e), P(!1));
                                }}
                                style={{
                                  width: `100%`,
                                  textAlign: `left`,
                                  padding: `7px 10px`,
                                  border: `none`,
                                  background:
                                    m === e ? `var(--surface-2)` : `transparent`,
                                  color: m === e ? `var(--emerald-700)` : `var(--fg)`,
                                  fontWeight: m === e ? 700 : 400,
                                  fontFamily: `var(--font-ui)`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `var(--surface-2)`)
                                }
                                onMouseLeave={(t) =>
                                  (t.currentTarget.style.background =
                                    m === e ? `var(--surface-2)` : `transparent`)
                                }
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <UsernameField
                    value={x}
                    onChange={S}
                    onAvailabilityChange={w}
                    inputStyle={Vn}
                    label="Choose Your Username"
                  />
                  <CountryStateSelect
                    country={g}
                    state={y}
                    onCountryChange={_}
                    onStateChange={b}
                    inputStyle={Vn}
                    labelStyle={Hn}
                    countryLabel="Country/Nationality"
                    stateLabel="Location (State/Region)"
                    required={!0}
                  />
                  <div
                    style={{
                      display: `grid`,
                      gridTemplateColumns: `1fr 1fr`,
                      gap: 10,
                    }}
                  >
                    <div style={{ position: `relative` }} ref={he}>
                      <label className="signup-label" style={{ fontSize: 9.5 }}>
                        Religion
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          (le(!F), P(!1), de(!1), pe(!1), se(!1));
                        }}
                        className="nk-btn nk-btn-soft signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: T ? `var(--fg)` : `var(--muted)`,
                        }}
                      >
                        <span>{T || `Select religion`}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `var(--emerald-500)`,
                            transform: F ? `rotate(180deg)` : `rotate(0deg)`,
                            transition: `transform 0.2s`,
                            flexShrink: 0,
                          }}
                        >
                          ▼
                        </span>
                      </button>
                      {F && (
                        <div
                          style={{
                            position: `absolute`,
                            top: `110%`,
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: `var(--surface)`,
                            borderRadius: 14,
                            border: `1.5px solid var(--line)`,
                            boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                            overflow: `hidden`,
                          }}
                        >
                          <div style={{ padding: `6px 8px` }}>
                            {[
                              { icon: ``, name: `Muslim` },
                              { icon: ``, name: `Hindu` },
                              { icon: ``, name: `Christian` },
                              { icon: ``, name: `Sikh` },
                              { icon: ``, name: `Buddhist` },
                              { icon: ``, name: `Jain` },
                              { icon: ``, name: `Jewish` },
                              { icon: ``, name: `Other` },
                              { icon: ``, name: `Prefer not to say` },
                            ].map(({ icon: e, name: t }) => (
                              <button className="nk-btn nk-btn-soft"
                                key={t}
                                type="button"
                                onClick={() => {
                                  (E(t), le(!1));
                                }}
                                style={{
                                  width: `100%`,
                                  textAlign: `left`,
                                  padding: `7px 10px`,
                                  border: `none`,
                                  background:
                                    T === t ? `var(--surface-2)` : `transparent`,
                                  color: T === t ? `var(--emerald-700)` : `var(--fg)`,
                                  fontWeight: T === t ? 700 : 400,
                                  fontFamily: `var(--font-ui)`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `var(--surface-2)`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.background =
                                    T === t ? `var(--surface-2)` : `transparent`)
                                }
                              >
                                <span style={{ fontSize: 15 }}>{e}</span>
                                <span>{t}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ position: `relative` }} ref={ge}>
                      <label className="signup-label" style={{ fontSize: 9.5 }}>
                        Age Range
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          (de(!ue), P(!1), le(!1), pe(!1), se(!1));
                        }}
                        className="nk-btn nk-btn-soft signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: ne ? `var(--fg)` : `var(--muted)`,
                        }}
                      >
                        <span>{ne || `Select age range`}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `var(--emerald-500)`,
                            transform: ue ? `rotate(180deg)` : `rotate(0deg)`,
                            transition: `transform 0.2s`,
                            flexShrink: 0,
                          }}
                        >
                          ▼
                        </span>
                      </button>
                      {ue && (
                        <div
                          style={{
                            position: `absolute`,
                            top: `110%`,
                            left: 0,
                            right: 0,
                            zIndex: 50,
                            background: `var(--surface)`,
                            borderRadius: 14,
                            border: `1.5px solid var(--line)`,
                            boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                            overflow: `hidden`,
                          }}
                        >
                          <div style={{ padding: `6px 8px` }}>
                            {[
                              { icon: ``, name: `18-25` },
                              { icon: ``, name: `26-35` },
                              { icon: ``, name: `36-45` },
                              { icon: ``, name: `46-55` },
                              { icon: ``, name: `56-65` },
                              { icon: ``, name: `65+` },
                            ].map(({ icon: e, name: t }) => (
                              <button className="nk-btn nk-btn-soft"
                                key={t}
                                type="button"
                                onClick={() => {
                                  (re(t), de(!1));
                                }}
                                style={{
                                  width: `100%`,
                                  textAlign: `left`,
                                  padding: `7px 10px`,
                                  border: `none`,
                                  background:
                                    ne === t ? `var(--surface-2)` : `transparent`,
                                  color: ne === t ? `var(--emerald-700)` : `var(--fg)`,
                                  fontWeight: ne === t ? 700 : 400,
                                  fontFamily: `var(--font-ui)`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `var(--surface-2)`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.background =
                                    ne === t ? `var(--surface-2)` : `transparent`)
                                }
                              >
                                <span style={{ fontSize: 15 }}>{e}</span>
                                <span>{t}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ position: `relative` }} ref={_e}>
                    <label className="signup-label" style={{ fontSize: 9.5 }}>
                      Have Kids?
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        (pe(!fe), P(!1), le(!1), de(!1), se(!1));
                      }}
                      className="nk-btn nk-btn-soft signup-input"
                      style={{
                        fontSize: 12,
                        padding: `9px 12px`,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `space-between`,
                        cursor: `pointer`,
                        textAlign: `left`,
                        color: A ? `var(--fg)` : `var(--muted)`,
                      }}
                    >
                      <span>{A || `Select your option`}</span>
                      <span
                        style={{
                          fontSize: 10,
                          color: `var(--emerald-500)`,
                          transform: fe ? `rotate(180deg)` : `rotate(0deg)`,
                          transition: `transform 0.2s`,
                          flexShrink: 0,
                        }}
                      >
                        ▼
                      </span>
                    </button>
                    {fe && (
                      <div
                        style={{
                          position: `absolute`,
                          top: `110%`,
                          left: 0,
                          right: 0,
                          zIndex: 50,
                          background: `var(--surface)`,
                          borderRadius: 14,
                          border: `1.5px solid var(--line)`,
                          boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                          overflow: `hidden`,
                        }}
                      >
                        <div style={{ padding: `6px 8px` }}>
                          {[
                            { icon: ``, name: `Yes` },
                            { icon: ``, name: `No` },
                            { icon: ``, name: `Prefer not to say` },
                          ].map(({ icon: e, name: t }) => (
                            <button className="nk-btn nk-btn-soft"
                              key={t}
                              type="button"
                              onClick={() => {
                                (te(t), pe(!1));
                              }}
                              style={{
                                width: `100%`,
                                textAlign: `left`,
                                padding: `7px 10px`,
                                border: `none`,
                                background: A === t ? `var(--surface-2)` : `transparent`,
                                color: A === t ? `var(--emerald-700)` : `var(--fg)`,
                                fontWeight: A === t ? 700 : 400,
                                fontFamily: `var(--font-ui)`,
                                fontSize: 12.5,
                                cursor: `pointer`,
                                borderRadius: 8,
                                transition: `background 0.15s`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: 8,
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = `var(--surface-2)`)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  A === t ? `var(--surface-2)` : `transparent`)
                              }
                            >
                              <span style={{ fontSize: 15 }}>{e}</span>
                              <span>{t}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `flex-start`,
                      gap: 8,
                      marginTop: 3,
                    }}
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={ie}
                      onChange={(e) => j(e.target.checked)}
                      style={{
                        width: 14,
                        height: 14,
                        marginTop: 2,
                        accentColor: `var(--emerald-700)`,
                        cursor: `pointer`,
                        flexShrink: 0,
                      }}
                    />
                    <label
                      htmlFor="terms"
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 11,
                        color: `var(--muted)`,
                        lineHeight: 1.4,
                      }}
                    >
                      I agree to the{" "}
                      <button className="nk-btn nk-btn-soft"
                        type="button"
                        onClick={() => ae(!0)}
                        style={{
                          background: `none`,
                          border: `none`,
                          color: `var(--emerald-700)`,
                          cursor: `pointer`,
                          fontFamily: `var(--font-ui)`,
                          fontSize: 11,
                          textDecoration: `underline`,
                          padding: 0,
                        }}
                      >
                        Terms and Conditions
                      </button>
                    </label>
                  </div>
                  {ve && (
                    <p
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 12,
                        color: `var(--danger)`,
                        background: `color-mix(in srgb, var(--danger) 8%, transparent)`,
                        padding: `8px 12px`,
                        borderRadius: 10,
                      }}
                    >
                      {ve}
                    </p>
                  )}
                  <div style={{ display: `flex`, gap: 10, marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => t(1)}
                      className="nk-btn nk-btn-ghost btn-back"
                      style={{ padding: `11px 0`, fontSize: 13 }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={async (e) => {
                        if ((e.preventDefault(), !ie)) {
                          ye(
                            `Please accept the Terms and Conditions to proceed`,
                          );
                          return;
                        }
                        if (!m || !g || !T || !ne || !A) {
                          ye(`Please complete all fields`);
                          return;
                        }
                        if (!x || C !== !0) {
                          ye(
                            C === !1
                              ? `Please choose a different, available username.`
                              : `Please choose a username.`,
                          );
                          return;
                        }
                        (ye(``), be(!0));
                        try {
                          (await xe({
                            name: n,
                            email: i,
                            password: o,
                            gender: m,
                            username: x,
                            nationality: g,
                            location: y || void 0,
                            religion: T,
                            phoneNumber: ee,
                            countryCode: O,
                            hasKids: A,
                            ageRange: ne,
                            acceptTerms: ie,
                          }),
                            Se(`/explore`));
                        } catch (e) {
                          ye(
                            e.message ||
                              `Could not create your account. Please try again.`,
                          );
                        } finally {
                          be(!1);
                        }
                      }}
                      disabled={!ie || I}
                      className="nk-btn nk-btn-primary btn-submit"
                      style={{
                        flex: 1,
                        width: `auto`,
                        padding: `11px 0`,
                        fontSize: 13,
                        opacity: I ? 0.7 : 1,
                      }}
                    >
                      {I ? `Creating Account…` : `Create Account`}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 13,
                color: `var(--emerald-500)`,
                textAlign: `center`,
                marginTop: 24,
              }}
            >
              {e === 1 ? (
                <>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: `var(--emerald-700)`,
                      fontWeight: 700,
                      textDecoration: `none`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = `var(--emerald-700)`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = `var(--emerald-700)`)
                    }
                  >
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  By creating an account, you agree to our{" "}
                  <button className="nk-btn nk-btn-soft"
                    type="button"
                    onClick={() => ae(!0)}
                    style={{
                      background: `none`,
                      border: `none`,
                      color: `var(--emerald-700)`,
                      fontWeight: 700,
                      cursor: `pointer`,
                      fontFamily: `var(--font-ui)`,
                      fontSize: 13,
                      padding: 0,
                    }}
                  >
                    Terms and Conditions
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
        {M && (
          <div
            style={{
              position: `fixed`,
              inset: 0,
              background: `color-mix(in srgb, var(--overlay) 55%, transparent)`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              zIndex: 50,
              padding: 16,
            }}
          >
            <div
              className="terms-scroll"
              style={{
                background: `var(--surface)`,
                borderRadius: 24,
                maxWidth: 620,
                width: `100%`,
                maxHeight: `82vh`,
                overflowY: `auto`,
                padding: `36px 32px`,
                boxShadow: `0 24px 80px color-mix(in srgb, var(--shadow) 25%, transparent)`,
              }}
            >
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontFamily: `var(--font-display)`,
                    fontSize: 22,
                    fontWeight: 700,
                    color: `var(--fg)`,
                  }}
                >
                  Terms and Conditions
                </h2>
                <button className="nk-btn"
                  onClick={() => ae(!1)}
                  style={{
                    background: `var(--surface-2)`,
                    border: `none`,
                    width: 34,
                    height: 34,
                    borderRadius: `50%`,
                    cursor: `pointer`,
                    fontSize: 14,
                    color: `var(--emerald-700)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                  }}
                >
                  ✕
                </button>
              </div>
              <div
                style={{ display: `flex`, flexDirection: `column`, gap: 18 }}
              >
                {TERMS_SECTIONS.map(([e, t]) => (
                  <div key={e}>
                    <h3
                      style={{
                        fontFamily: `var(--font-display)`,
                        fontSize: 14,
                        fontWeight: 700,
                        color: `var(--fg)`,
                        marginBottom: 6,
                      }}
                    >
                      {e}
                    </h3>
                    <p
                      style={{
                        fontFamily: `var(--font-ui)`,
                        fontSize: 13,
                        color: `var(--muted)`,
                        lineHeight: 1.65,
                      }}
                    >
                      {t}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ display: `flex`, gap: 12, marginTop: 28 }}>
                <button className="nk-btn nk-btn-ghost"
                  onClick={() => ae(!1)}
                  style={{
                    flex: 1,
                    padding: `13px 0`,
                    borderRadius: 32,
                    border: `2px solid var(--emerald-500)`,
                    background: `transparent`,
                    color: `var(--emerald-700)`,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: `pointer`,
                    transition: `all 0.2s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `color-mix(in srgb, var(--emerald-700) 7%, transparent)`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = `transparent`)
                  }
                >
                  Close
                </button>
                <button className="nk-btn nk-btn-primary"
                  onClick={() => {
                    (j(!0), ae(!1));
                  }}
                  style={{
                    flex: 1,
                    padding: `13px 0`,
                    borderRadius: 32,
                    border: `none`,
                    background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
                    color: `#fff`,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: `pointer`,
                    boxShadow: `0 6px 20px color-mix(in srgb, var(--shadow) 30%, transparent)`,
                    transition: `all 0.2s`,
                  }}
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export { SignupPage, UsernameField };
