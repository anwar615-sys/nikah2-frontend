/*
 * Nikha2 frontend: decompiled from the production bundle (assets/index-Bood7CQ5.js)
 * on 2026-10-03. Component, hook and helper names were restored by hand; local
 * variable names (e, t, n…) are still minified. React, React-DOM and React Router
 * come before this point in the original bundle and are omitted here.
 * `React` = the react module, `jsxRuntime` = react/jsx-runtime.
 * See BLUEPRINT.md for the full spec.
 */
var AuthContext = (0, React.createContext)(null);
function useAuth() {
  let e = (0, React.useContext)(AuthContext);
  if (!e) throw Error(`useAuth must be used within an AuthProvider`);
  return e;
}
var Rt = o((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);
    function r(e, n, r) {
      var i = null;
      if (
        (r !== void 0 && (i = `` + r),
        n.key !== void 0 && (i = `` + n.key),
        `key` in n)
      )
        for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
      else r = n;
      return (
        (n = r.ref),
        { $$typeof: t, type: e, key: i, ref: n === void 0 ? null : n, props: r }
      );
    }
    ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
  }),
  jsxRuntime = o((e, t) => {
    t.exports = Rt();
  })();
function Navbar() {
  let e = useLocation(),
    t = useNavigate(),
    [n, r] = (0, React.useState)(!1),
    [i, a] = (0, React.useState)(!1),
    o = (0, React.useRef)(null),
    { isAuthenticated: s, user: c, logout: l } = useAuth(),
    u = (t) => e.pathname === t,
    d = async () => {
      (await l(), t(`/`));
    };
  (0, React.useEffect)(() => {
    function e(e) {
      o.current && !o.current.contains(e.target) && a(!1);
    }
    return (
      document.addEventListener(`mousedown`, e),
      () => document.removeEventListener(`mousedown`, e)
    );
  }, []);
  let f = [
      { name: `How It Works`, path: `/how-it-works` },
      { name: `Features`, path: `/features` },
      { name: `Explore`, path: `/explore` },
      { name: `Messages`, path: `/messaging` },
    ],
    p = () => r((e) => !e),
    m = () => r(!1);
  return (
    <>
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');\n.Nikha-nav-link {\n          position: relative;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          color: #3D6B55;\n          text-decoration: none;\n          transition: color 0.2s, transform 0.2s;\n          font-weight: 500;\n          padding: 6px 0;\n        }\n        .Nikha-nav-link::after {\n          content: '';\n          position: absolute;\n          left: 0;\n          right: 0;\n          bottom: -2px;\n          height: 2px;\n          border-radius: 2px;\n          background: linear-gradient(90deg, #2D6A4F, #74C69D);\n          transform: scaleX(0);\n          transform-origin: left;\n          transition: transform 0.28s ease;\n          opacity: 0.95;\n        }\n        .Nikha-nav-link:hover {\n          color: #2D6A4F;\n          transform: translateY(-1px);\n          text-shadow: 0 0 18px rgba(116,198,157,0.35);\n        }\n        .Nikha-nav-link:hover::after {\n          transform: scaleX(1);\n          box-shadow: 0 0 14px rgba(116,198,157,0.55);\n        }\n        .Nikha-nav-link.active {\n          color: #2D6A4F;\n          font-weight: 600;\n        }\n        .Nikha-nav-link.active::after {\n          transform: scaleX(1);\n          box-shadow: 0 0 14px rgba(116,198,157,0.55);\n        }\n\n        /* Green shiny glow (logo only) */\n        .Nikha-logo-shiny {\n          position: relative;\n          transition: filter 0.25s ease, transform 0.25s ease;\n        }\n        .Nikha-logo-shiny::after {\n          content: '';\n          position: absolute;\n          inset: -8px -14px;\n          border-radius: 18px;\n          background: radial-gradient(circle at 30% 20%, rgba(116,198,157,0.35), transparent 45%),\n                      radial-gradient(circle at 70% 80%, rgba(45,106,79,0.25), transparent 48%);\n          opacity: 0;\n          transition: opacity 0.22s ease;\n          pointer-events: none;\n        }\n        .Nikha-logo-shiny:hover {\n          transform: translateY(-1px);\n          filter: drop-shadow(0 0 16px rgba(116,198,157,0.35));\n        }\n        .Nikha-logo-shiny:hover::after {\n          opacity: 1;\n        }\n        .join-btn {\n          background: linear-gradient(135deg, #2D6A4F 0%, #40916C 100%);\n          color: #fff !important;\n          padding: 9px 22px;\n          border-radius: 24px;\n          font-weight: 600;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          text-decoration: none;\n          transition: all 0.22s;\n          box-shadow: 0 4px 14px rgba(45,106,79,0.28);\n          letter-spacing: 0.02em;\n        }\n        .join-btn:hover {\n          transform: translateY(-1px);\n          box-shadow: 0 6px 20px rgba(45,106,79,0.38);\n        }\n        .signin-link {\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          color: #3D6B55;\n          text-decoration: none;\n          padding: 8px 16px;\n          border-radius: 20px;\n          transition: all 0.2s;\n          font-weight: 500;\n        }\n        .signin-link:hover {\n          background: rgba(116,198,157,0.15);\n          color: #2D6A4F;\n        }\n        .account-trigger {\n          display: flex;\n          align-items: center;\n          gap: 8px;\n          background: none;\n          border: none;\n          cursor: pointer;\n          padding: 6px 10px 6px 6px;\n          border-radius: 24px;\n          transition: background 0.2s;\n          font-family: 'DM Sans', sans-serif;\n        }\n        .account-trigger:hover {\n          background: rgba(116,198,157,0.15);\n        }\n        .account-avatar {\n          width: 30px;\n          height: 30px;\n          border-radius: 50%;\n          object-fit: cover;\n          background: linear-gradient(135deg, #2D6A4F, #74C69D);\n          color: #fff;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          font-weight: 700;\n          font-size: 13px;\n          flex-shrink: 0;\n        }\n        .account-dropdown {\n          position: absolute;\n          top: calc(100% + 10px);\n          right: 0;\n          background: #fff;\n          border-radius: 16px;\n          border: 1.5px solid #D4EDDA;\n          box-shadow: 0 12px 40px rgba(27,58,75,0.16);\n          min-width: 190px;\n          overflow: hidden;\n          z-index: 110;\n        }\n        .account-dropdown-item {\n          display: flex;\n          align-items: center;\n          gap: 10px;\n          width: 100%;\n          padding: 12px 16px;\n          border: none;\n          background: none;\n          text-align: left;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13.5px;\n          font-weight: 500;\n          color: #1B3A4B;\n          text-decoration: none;\n          cursor: pointer;\n          transition: background 0.15s;\n        }\n        .account-dropdown-item:hover {\n          background: #F0FAF4;\n        }\n        .account-dropdown-item.danger {\n          color: #C0392B;\n        }\n        .ham-line {\n          display: block;\n          width: 22px;\n          height: 2px;\n          background: #2D6A4F;\n          border-radius: 2px;\n          transition: all 0.3s;\n        }\n      "
        }
      </style>
      <nav
        style={{
          position: `fixed`,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          padding: `0 40px`,
          height: 68,
          background: `rgba(248, 252, 248, 0.96)`,
          backdropFilter: `blur(20px)`,
          WebkitBackdropFilter: `blur(20px)`,
          borderBottom: `1px solid rgba(116,198,157,0.2)`,
          boxShadow: `0 2px 20px rgba(45,106,79,0.06)`,
        }}
      >
        <Link
          to="/"
          onClick={m}
          className="Nikha-logo-shiny"
          style={{
            textDecoration: `none`,
            display: `flex`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            gap: 8,
            padding: `4px 10px`,
            borderRadius: 16,
            whiteSpace: `nowrap`,
          }}
        >
          <span style={{ display: `flex`, alignItems: `center`, gap: 6 }}>
            <span
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontWeight: 700,
                fontSize: 26,
                color: `#1B3A4B`,
                letterSpacing: `-0.02em`,
                lineHeight: 1,
              }}
            >
              Nikha<span style={{ color: `#40916C` }}>2</span>
            </span>
            <span
              style={{
                color: `#74C69D`,
                fontSize: 20,
                lineHeight: 1,
                marginTop: 2,
              }}
            >
              ♡
            </span>
            <span
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 10,
                color: `#40916C`,
                border: `1px solid #B7E4C7`,
                borderRadius: 10,
                padding: `1px 6px`,
                marginLeft: 2,
                letterSpacing: `0.06em`,
              }}
            >
              ™
            </span>
          </span>
          <span
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 10.5,
              fontWeight: 500,
              color: `#74C69D`,
              letterSpacing: `0.05em`,
              lineHeight: 1,
            }}
          >
            The Second Chance
          </span>
        </Link>
        <div
          className="hidden md:flex"
          style={{ alignItems: `center`, gap: 32 }}
        >
          {f.map((e) => (
            <Link
              key={e.name}
              to={e.path}
              className={`Nikha-nav-link${u(e.path) ? ` active` : ``}`}
            >
              {e.name}
            </Link>
          ))}
        </div>
        <div style={{ display: `flex`, alignItems: `center`, gap: 8 }}>
          <div
            className="hidden md:flex"
            style={{ alignItems: `center`, gap: 8 }}
          >
            {s ? (
              <div style={{ position: `relative` }} ref={o}>
                <button
                  onClick={() => a((e) => !e)}
                  className="account-trigger"
                >
                  {c?.profile?.avatarUrl ? (
                    <img
                      src={c.profile.avatarUrl}
                      alt=""
                      className="account-avatar"
                    />
                  ) : (
                    <span className="account-avatar">
                      {(c?.name || `?`).trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 13,
                      color: `#2D6A4F`,
                      fontWeight: 600,
                    }}
                  >
                    {"Hi, "}
                    {c?.name?.split(` `)[0]}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `#40916C`,
                      transform: i ? `rotate(180deg)` : `none`,
                      transition: `transform 0.2s`,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {i && (
                  <div className="account-dropdown">
                    <Link
                      to="/account"
                      onClick={() => a(!1)}
                      className="account-dropdown-item"
                    >
                      <span>👤</span>
                      {" My Account"}
                    </Link>
                    <button
                      onClick={() => {
                        (a(!1), d());
                      }}
                      className="account-dropdown-item danger"
                    >
                      <span>🚪</span>
                      {" Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="signin-link">
                  Sign In
                </Link>
                <Link to="/signup" className="join-btn">
                  Join Free
                </Link>
              </>
            )}
          </div>
          <button
            onClick={p}
            className="flex md:hidden"
            style={{
              flexDirection: `column`,
              justifyContent: `center`,
              alignItems: `center`,
              gap: 5,
              width: 40,
              height: 40,
              background: `none`,
              border: `none`,
              cursor: `pointer`,
              borderRadius: 8,
            }}
            aria-label="Toggle menu"
          >
            <span
              className="ham-line"
              style={{
                transform: n ? `rotate(45deg) translate(3px,3px)` : `none`,
              }}
            />
            <span className="ham-line" style={{ opacity: +!n }} />
            <span
              className="ham-line"
              style={{
                transform: n ? `rotate(-45deg) translate(3px,-3px)` : `none`,
              }}
            />
          </button>
        </div>
      </nav>
      {n && (
        <div
          onClick={m}
          style={{
            position: `fixed`,
            inset: 0,
            zIndex: 98,
            background: `rgba(27,58,75,0.25)`,
          }}
        />
      )}
      <div
        style={{
          position: `fixed`,
          top: 68,
          left: 0,
          right: 0,
          zIndex: 99,
          background: `rgba(248,252,248,0.99)`,
          backdropFilter: `blur(20px)`,
          borderBottom: `1px solid rgba(116,198,157,0.2)`,
          padding: n ? `24px 32px 28px` : `0 32px`,
          maxHeight: n ? 400 : 0,
          overflow: `hidden`,
          transition: `all 0.3s ease`,
          opacity: +!!n,
        }}
      >
        <div style={{ display: `flex`, flexDirection: `column`, gap: 18 }}>
          {f.map((e) => (
            <Link
              key={e.name}
              to={e.path}
              onClick={m}
              className={`Nikha-nav-link${u(e.path) ? ` active` : ``}`}
              style={{ fontSize: 16 }}
            >
              {e.name}
            </Link>
          ))}
          <div
            style={{
              borderTop: `1px solid rgba(116,198,157,0.2)`,
              paddingTop: 16,
              display: `flex`,
              flexDirection: `column`,
              gap: 12,
            }}
          >
            {s ? (
              <>
                <Link
                  to="/account"
                  onClick={m}
                  className="signin-link"
                  style={{ paddingLeft: 0 }}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    (m(), d());
                  }}
                  className="signin-link"
                  style={{
                    paddingLeft: 0,
                    border: `none`,
                    background: `none`,
                    cursor: `pointer`,
                    textAlign: `left`,
                  }}
                >
                  Sign Out ({c?.name?.split(` `)[0]})
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={m}
                  className="signin-link"
                  style={{ paddingLeft: 0 }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={m}
                  className="join-btn"
                  style={{ textAlign: `center` }}
                >
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
var Bt = `/assets/1-BhKNAtC1.png`,
  API_BASE = `https://nikah2-backend.onrender.com/api`,
  TOKENS_KEY = `nikha2_tokens`;
function getTokens() {
  try {
    return JSON.parse(localStorage.getItem(TOKENS_KEY)) || null;
  } catch {
    return null;
  }
}
function setTokens(e) {
  e
    ? localStorage.setItem(TOKENS_KEY, JSON.stringify(e))
    : localStorage.removeItem(TOKENS_KEY);
}
var ApiError = class extends Error {
    constructor(e, t, n, r) {
      (super(n), (this.status = e), (this.code = t), (this.details = r));
    }
  },
  refreshPromise = null;
async function refreshTokens() {
  let e = getTokens();
  if (!e?.refreshToken)
    throw new ApiError(401, `AUTH_REQUIRED`, `Not signed in.`);
  return (
    (refreshPromise ||= fetch(`${API_BASE}/auth/refresh`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ refreshToken: e.refreshToken }),
    })
      .then(async (e) => {
        let t = await e.json().catch(() => ({}));
        if (!e.ok)
          throw new ApiError(e.status, t?.error?.code, t?.error?.message);
        return (setTokens(t.data), t.data);
      })
      .finally(() => {
        refreshPromise = null;
      })),
    refreshPromise
  );
}
async function apiRequest(
  e,
  { method: t = `GET`, body: n, isForm: r = !1, retry: i = !0 } = {},
) {
  let a = getTokens(),
    o = {};
  (r || (o[`Content-Type`] = `application/json`),
    a?.accessToken && (o.Authorization = `Bearer ${a.accessToken}`));
  let s = await fetch(`${API_BASE}${e}`, {
    method: t,
    headers: o,
    body: n === void 0 ? void 0 : r ? n : JSON.stringify(n),
  });
  if (s.status === 204) return null;
  let c = await s.json().catch(() => ({}));
  if (!s.ok) {
    let o = c?.error?.code;
    if (i && s.status === 401 && o === `TOKEN_EXPIRED` && a?.refreshToken)
      return (
        await refreshTokens(),
        apiRequest(e, { method: t, body: n, isForm: r, retry: !1 })
      );
    throw new ApiError(
      s.status,
      o,
      c?.error?.message || `Request failed.`,
      c?.error?.details,
    );
  }
  return c.data;
}
var api = {
    get: (e) => apiRequest(e),
    post: (e, t) => apiRequest(e, { method: `POST`, body: t }),
    patch: (e, t) => apiRequest(e, { method: `PATCH`, body: t }),
    delete: (e) => apiRequest(e, { method: `DELETE` }),
    upload: (e, t) => apiRequest(e, { method: `POST`, body: t, isForm: !0 }),
  },
  GENDER_EMOJI = { woman: `👩`, man: `🧔`, other: `🧑` };
function seekingLabel(e) {
  return e === `man` ? `Woman` : e === `woman` ? `Man` : `Anyone`;
}
function toPersonCard(e) {
  return {
    id: e.id,
    name: e.displayName,
    age: e.age,
    city: e.city,
    country: e.nationality,
    kids: e.hasKids || `—`,
    seeking: seekingLabel(e.gender),
    avatar: e.avatarUrl,
    gender: e.gender,
  };
}
var FEATURED_COUNTRIES = [
    `UAE`,
    `Qatar`,
    `Egypt`,
    `Oman`,
    `Saudi Arabia`,
    `Bangladesh`,
  ],
  COUNTRIES =
    `Afghanistan.Albania.Algeria.Argentina.Australia.Austria.Bahrain.Bangladesh.Belgium.Brazil.Canada.China.Denmark.Egypt.Finland.France.Germany.India.Indonesia.Iraq.Ireland.Italy.Japan.Jordan.Kuwait.Lebanon.Malaysia.Morocco.Netherlands.New Zealand.Nigeria.Norway.Oman.Pakistan.Philippines.Poland.Portugal.Qatar.Russia.Saudi Arabia.Singapore.South Africa.South Korea.Spain.Sri Lanka.Sweden.Switzerland.Syria.Thailand.Turkey.UAE.UK.US.Yemen`
      .split(`.`)
      .sort((e, t) => e.localeCompare(t)),
  menuItemStyle = {
    width: `100%`,
    textAlign: `left`,
    padding: `11px 14px`,
    border: `none`,
    background: `transparent`,
    cursor: `pointer`,
    fontSize: 13,
    color: `#1B3A4B`,
    borderBottom: `1px solid #F1F5F2`,
    fontFamily: `'DM Sans', sans-serif`,
  };
function SupportChatWidget() {
  let [e, t] = (0, React.useState)(!1),
    [n, r] = (0, React.useState)([
      {
        from: `bot`,
        text: `As-salamu alaykum! 👋 Welcome to Nikha2. How can we help you today?`,
      },
    ]),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(1),
    [c, l] = (0, React.useState)(!1),
    u = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    e &&
      setTimeout(() => {
        (s(0), u.current?.scrollIntoView({ behavior: `smooth` }));
      }, 0);
  }, [e]);
  let d = () => {
    let e = i.trim();
    e &&
      (r((t) => [...t, { from: `user`, text: e }]),
      a(``),
      l(!0),
      setTimeout(() => {
        (l(!1),
          r((e) => [
            ...e,
            {
              from: `bot`,
              text: `Thank you for reaching out! Our team will get back to you shortly. JazakAllah Khair 🌿`,
            },
          ]));
      }, 1200));
  };
  return (
    <div style={{ position: `fixed`, bottom: 28, right: 28, zIndex: 200 }}>
      {e && (
        <div
          style={{
            position: `absolute`,
            bottom: 74,
            right: 0,
            width: `min(340px, calc(100vw - 40px))`,
            borderRadius: 24,
            background: `#fff`,
            boxShadow: `0 16px 56px rgba(27,58,75,0.22)`,
            overflow: `hidden`,
            animation: `slideUpFade 0.25s ease`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 60%, #40916C 100%)`,
              padding: `16px 18px`,
              display: `flex`,
              alignItems: `center`,
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: `50%`,
                background: `rgba(255,255,255,0.15)`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                fontSize: 20,
                border: `1.5px solid rgba(255,255,255,0.25)`,
                flexShrink: 0,
              }}
            >
              🌿
            </div>
            <div>
              <div
                style={{
                  color: `#fff`,
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: `'DM Sans', sans-serif`,
                }}
              >
                Nikha2 Support
              </div>
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: `50%`,
                    background: `#86efac`,
                    display: `inline-block`,
                    boxShadow: `0 0 6px #86efac`,
                  }}
                />
                <span
                  style={{
                    color: `rgba(255,255,255,0.8)`,
                    fontSize: 11.5,
                    fontFamily: `'DM Sans', sans-serif`,
                  }}
                >
                  Online now
                </span>
              </div>
            </div>
            <button
              onClick={() => t(!1)}
              style={{
                marginLeft: `auto`,
                background: `rgba(255,255,255,0.12)`,
                border: `1px solid rgba(255,255,255,0.2)`,
                color: `#fff`,
                width: 30,
                height: 30,
                borderRadius: `50%`,
                cursor: `pointer`,
                fontSize: 13,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              padding: `14px 14px 10px`,
              maxHeight: 260,
              overflowY: `auto`,
              display: `flex`,
              flexDirection: `column`,
              gap: 10,
              background: `#F8FAF5`,
            }}
          >
            {n.map((e, t) => (
              <div
                key={t}
                style={{
                  display: `flex`,
                  justifyContent: e.from === `user` ? `flex-end` : `flex-start`,
                  alignItems: `flex-end`,
                  gap: 6,
                }}
              >
                {e.from === `bot` && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: `50%`,
                      background: `#D4EDDA`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    🌿
                  </div>
                )}
                <div
                  style={{
                    maxWidth: `75%`,
                    background:
                      e.from === `user`
                        ? `linear-gradient(135deg, #1B3A4B, #2D6A4F)`
                        : `#fff`,
                    color: e.from === `user` ? `#fff` : `#1B3A4B`,
                    padding: `10px 16px`,
                    borderRadius:
                      e.from === `user`
                        ? `20px 20px 6px 20px`
                        : `20px 20px 20px 6px`,
                    fontSize: 13,
                    fontFamily: `'DM Sans', sans-serif`,
                    lineHeight: 1.55,
                    boxShadow:
                      e.from === `user`
                        ? `0 3px 12px rgba(27,58,75,0.25)`
                        : `0 2px 8px rgba(0,0,0,0.07)`,
                  }}
                >
                  {e.text}
                </div>
              </div>
            ))}
            {c && (
              <div style={{ display: `flex`, alignItems: `center`, gap: 6 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: `50%`,
                    background: `#D4EDDA`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    fontSize: 13,
                  }}
                >
                  🌿
                </div>
                <div
                  style={{
                    background: `#fff`,
                    padding: `10px 16px`,
                    borderRadius: `20px 20px 20px 6px`,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.07)`,
                  }}
                >
                  <span
                    style={{
                      display: `flex`,
                      gap: 4,
                      alignItems: `center`,
                    }}
                  >
                    {[0, 1, 2].map((e) => (
                      <span
                        key={e}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: `50%`,
                          background: `#74C69D`,
                          display: `inline-block`,
                          animation: `typingDot 1.2s ${e * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={u} />
          </div>
          <div
            style={{
              display: `flex`,
              gap: 8,
              padding: `10px 12px`,
              background: `#fff`,
              borderTop: `1px solid #E8F5EE`,
            }}
          >
            <input
              value={i}
              onChange={(e) => a(e.target.value)}
              onKeyDown={(e) => e.key === `Enter` && d()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: `1.5px solid #B7E4C7`,
                borderRadius: 20,
                padding: `9px 14px`,
                fontSize: 13,
                fontFamily: `'DM Sans', sans-serif`,
                outline: `none`,
                background: `#F8FAF5`,
                color: `#1B3A4B`,
                transition: `border-color 0.2s`,
                minWidth: 0,
              }}
              onFocus={(e) => (e.target.style.borderColor = `#40916C`)}
              onBlur={(e) => (e.target.style.borderColor = `#B7E4C7`)}
            />
            <button
              onClick={d}
              style={{
                background: `linear-gradient(135deg, #1B3A4B, #2D6A4F)`,
                border: `none`,
                borderRadius: `50%`,
                width: 38,
                height: 38,
                cursor: `pointer`,
                color: `#fff`,
                fontSize: 15,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                boxShadow: `0 3px 10px rgba(45,106,79,0.35)`,
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => t((e) => !e)}
        style={{
          width: 60,
          height: 60,
          borderRadius: `50%`,
          background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #52B788 100%)`,
          border: `none`,
          cursor: `pointer`,
          boxShadow: `0 6px 28px rgba(45,106,79,0.5)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 24,
          transition: `transform 0.2s`,
          position: `relative`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = `scale(1.08)`)}
        onMouseLeave={(e) => (e.currentTarget.style.transform = `scale(1)`)}
      >
        <span>{e ? `✕` : `💬`}</span>
        {!e && o > 0 && (
          <span
            style={{
              position: `absolute`,
              top: -3,
              right: -3,
              background: `#e63946`,
              color: `#fff`,
              width: 20,
              height: 20,
              borderRadius: `50%`,
              fontSize: 11,
              fontWeight: 700,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              border: `2px solid #F8FAF5`,
            }}
          >
            {o}
          </span>
        )}
      </button>
      {!e && (
        <div
          style={{
            position: `absolute`,
            bottom: 16,
            right: 70,
            background: `#1B3A4B`,
            color: `#fff`,
            padding: `6px 13px`,
            borderRadius: 20,
            fontSize: 12,
            fontFamily: `'DM Sans', sans-serif`,
            whiteSpace: `nowrap`,
            boxShadow: `0 4px 14px rgba(0,0,0,0.2)`,
            pointerEvents: `none`,
          }}
        >
          Chat with us 💚
        </div>
      )}
      <style>
        {
          "\n        @keyframes slideUpFade {\n          from { opacity: 0; transform: translateY(16px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes typingDot {\n          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }\n          30% { transform: translateY(-4px); opacity: 1; }\n        }\n      "
        }
      </style>
    </div>
  );
}
function OnlineNowPanel({ member: e }) {
  let [t, n] = (0, React.useState)(!1),
    r = useNavigate();
  return (
    <div
      className="card-hover"
      style={{
        background: `#fff`,
        borderRadius: 18,
        overflow: `hidden`,
        border: `1px solid #E8F5EE`,
        boxShadow: `0 4px 20px rgba(27,58,75,0.07)`,
        transition: `transform 0.22s, box-shadow 0.22s`,
        cursor: `pointer`,
        display: `flex`,
        flexDirection: `column`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.transform = `translateY(-4px)`),
          (e.currentTarget.style.boxShadow = `0 12px 36px rgba(45,106,79,0.16)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `0 4px 20px rgba(27,58,75,0.07)`));
      }}
    >
      <div
        style={{
          background: `linear-gradient(160deg, #D4EDDA 0%, #B7E4C7 100%)`,
          padding: `22px 0 14px`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 6,
          position: `relative`,
        }}
      >
        {e.avatar ? (
          <img
            src={e.avatar}
            alt={e.name}
            style={{
              width: 68,
              height: 68,
              borderRadius: `50%`,
              border: `3px solid #fff`,
              boxShadow: `0 4px 14px rgba(45,106,79,0.22)`,
              objectFit: `cover`,
            }}
          />
        ) : (
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: `50%`,
              border: `3px solid #fff`,
              boxShadow: `0 4px 14px rgba(45,106,79,0.22)`,
              background: `#F8FAF5`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              fontSize: 32,
            }}
          >
            {GENDER_EMOJI[e.gender] || `🙂`}
          </div>
        )}
        <span
          style={{
            position: `absolute`,
            bottom: 16,
            right: `calc(50% - 26px)`,
            width: 10,
            height: 10,
            borderRadius: `50%`,
            background: `#22C55E`,
            border: `2px solid #fff`,
            boxShadow: `0 0 8px rgba(34,197,94,0.6)`,
          }}
        />
        <button
          onClick={(e) => {
            (e.stopPropagation(), n((e) => !e));
          }}
          style={{
            position: `absolute`,
            top: 10,
            right: 10,
            background: t ? `rgba(230,57,70,0.1)` : `rgba(255,255,255,0.75)`,
            border: `1.5px solid ${t ? `#e63946` : `rgba(255,255,255,0.6)`}`,
            borderRadius: `50%`,
            width: 30,
            height: 30,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            cursor: `pointer`,
            fontSize: 14,
            transition: `all 0.2s`,
          }}
        >
          {t ? `❤️` : `🤍`}
        </button>
      </div>
      <div
        style={{
          padding: `12px 14px 16px`,
          display: `flex`,
          flexDirection: `column`,
          flex: 1,
        }}
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `space-between`,
            marginBottom: 2,
          }}
        >
          <span
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontWeight: 700,
              fontSize: 14.5,
              color: `#1B3A4B`,
            }}
          >
            {e.name}
          </span>
          <span style={{ fontSize: 11.5, color: `#3D6B55`, fontWeight: 600 }}>
            {e.age}
            {" yrs"}
          </span>
        </div>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: 4,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: `50%`,
              background: `#22C55E`,
              display: `inline-block`,
              boxShadow: `0 0 6px rgba(34,197,94,0.6)`,
            }}
          />
          <span
            style={{
              fontSize: 11.5,
              color: `#22C55E`,
              fontWeight: 500,
              fontFamily: `'DM Sans', sans-serif`,
            }}
          >
            Online now
          </span>
        </div>
        <div
          style={{
            background: `#F0FAF4`,
            border: `1px solid #D4EDDA`,
            borderRadius: 10,
            padding: `8px 10px`,
            marginBottom: 12,
            display: `flex`,
            flexDirection: `column`,
            gap: 4,
          }}
        >
          {[
            { label: `City`, value: e.city },
            { label: `Country`, value: e.country },
            { label: `Kids`, value: e.kids },
            { label: `Seeking`, value: e.seeking },
          ].map(({ label: e, value: t }) => (
            <div
              key={e}
              style={{
                fontSize: 11.5,
                display: `flex`,
                justifyContent: `space-between`,
              }}
            >
              <span style={{ color: `#3D6B55`, fontWeight: 600 }}>{e}</span>
              <span style={{ color: `#2D6A4F`, fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => r(`/messaging`, { state: { selectedContact: e } })}
          style={{
            marginTop: `auto`,
            width: `100%`,
            background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
            color: `#fff`,
            border: `none`,
            borderRadius: 28,
            padding: `12px 0`,
            fontSize: 13.5,
            fontWeight: 700,
            fontFamily: `'DM Sans', sans-serif`,
            cursor: `pointer`,
            letterSpacing: `0.03em`,
            transition: `all 0.22s`,
            boxShadow: `0 4px 16px rgba(27,58,75,0.28)`,
          }}
          onMouseEnter={(e) => {
            ((e.currentTarget.style.opacity = `0.88`),
              (e.currentTarget.style.transform = `translateY(-1px)`));
          }}
          onMouseLeave={(e) => {
            ((e.currentTarget.style.opacity = `1`),
              (e.currentTarget.style.transform = `none`));
          }}
        >
          💬 Chat Now
        </button>
      </div>
    </div>
  );
}
function useInView(e = 0.15) {
  let t = (0, React.useRef)(null),
    [n, r] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let n = new IntersectionObserver(
        ([e]) => {
          e.isIntersecting && r(!0);
        },
        { threshold: e },
      );
      return (t.current && n.observe(t.current), () => n.disconnect());
    }, []),
    [t, n]
  );
}
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
                      padding: `14px 28px`,
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
              <a
                key={e}
                href="#"
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
              </a>
            ))}
          </div>
        </footer>
        <SupportChatWidget />
      </div>
    )
  );
}
function Toast({ message: e, tone: t = `info`, onDismiss: n }) {
  if (
    ((0, React.useEffect)(() => {
      let e = setTimeout(n, 4e3);
      return () => clearTimeout(e);
    }, [n]),
    !e)
  )
    return null;
  let r =
    t === `error`
      ? { bg: `#fff5f5`, border: `#f5c6c6`, text: `#C0392B` }
      : { bg: `#F0FAF4`, border: `#D4EDDA`, text: `#2D6A4F` };
  return (
    <div
      style={{
        position: `fixed`,
        top: 80,
        left: `50%`,
        transform: `translateX(-50%)`,
        zIndex: 400,
        background: r.bg,
        border: `1.5px solid ${r.border}`,
        color: r.text,
        padding: `12px 20px`,
        borderRadius: 16,
        fontFamily: `'DM Sans', sans-serif`,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: `0 8px 24px rgba(27,58,75,0.15)`,
        maxWidth: `90vw`,
        textAlign: `center`,
        display: `flex`,
        alignItems: `center`,
        gap: 12,
      }}
    >
      <span>{e}</span>
      <button
        onClick={n}
        style={{
          border: `none`,
          background: `none`,
          cursor: `pointer`,
          color: r.text,
          fontSize: 14,
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
}
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
  ],
  cn = [
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
  ],
  ln = [
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
  ],
  un = [
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
    <span style={{ color: `#40916C` }} className="text-sm font-bold">
      ✓
    </span>
  ) : e === !1 ? (
    <span
      style={{ color: `#e63946`, opacity: 0.55 }}
      className="text-sm font-bold"
    >
      ✕
    </span>
  ) : (
    <span className="text-xs" style={{ color: `#3D6B55` }}>
      {e}
    </span>
  );
}
var Footer = () => (
  <div
    style={{
      background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
      padding: `14px 40px`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      gap: 10,
    }}
  >
    <span
      style={{
        color: `#B7E4C7`,
        fontSize: 12,
        letterSpacing: `0.18em`,
        fontFamily: `'DM Sans', sans-serif`,
        fontWeight: 600,
        textTransform: `uppercase`,
        textAlign: `center`,
      }}
    >
      Because everyone deserves a second chance at happiness.
    </span>
    <span style={{ color: `#74C69D`, fontSize: 15, flexShrink: 0 }}>♥</span>
  </div>
);
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
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        color: `#1B3A4B`,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');\n        * { scroll-behavior: smooth; box-sizing: border-box; }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.7); }\n          50%       { box-shadow: 0 0 16px rgba(34,197,94,0.35); }\n        }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        .card-hover { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease; }\n        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(45,106,79,0.13); }\n\n        .btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 12px 32px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 14px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: all 0.22s;\n          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;\n        }\n        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }\n\n        .btn-outline {\n          background: rgba(255,255,255,0.92); color: #2D6A4F;\n          border: 2px solid #74C69D; padding: 11px 28px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 14px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s; backdrop-filter: blur(6px);\n        }\n        .btn-outline:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,106,79,0.2); }\n\n        .tab-btn {\n          padding: 10px 24px; border-radius: 32px;\n          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;\n          border: none; cursor: pointer; transition: all 0.22s;\n          color: #3D6B55; background: transparent;\n        }\n        .tab-btn.active {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; box-shadow: 0 4px 16px rgba(27,58,75,0.3);\n        }\n        .tab-btn:not(.active):hover { background: #F0FAF4; color: #1B3A4B; }\n\n        .popular-badge {\n          background: linear-gradient(135deg, #1B3A4B, #2D6A4F, #40916C, #2D6A4F, #1B3A4B);\n          background-size: 200% auto;\n          animation: shimmer-green 3s linear infinite;\n        }\n\n        .step-icon-even {\n          background: linear-gradient(135deg, #F0FAF4, #D4EDDA);\n          border: 2px solid rgba(64,145,108,0.3);\n          box-shadow: 0 8px 28px rgba(45,106,79,0.13);\n        }\n        .step-icon-odd {\n          background: linear-gradient(135deg, #E8F5EE, #F0FAF4);\n          border: 2px solid rgba(116,198,157,0.3);\n          box-shadow: 0 8px 28px rgba(45,106,79,0.08);\n        }\n\n        .comparison-table { width: 100%; border-collapse: collapse; font-family: 'DM Sans', sans-serif; font-size: 13px; }\n        .comparison-table th, .comparison-table td { padding: 14px 20px; text-align: center; }\n        .comparison-table th:first-child, .comparison-table td:first-child { text-align: left; }\n        .comparison-table thead th {\n          background: linear-gradient(135deg, #F0FAF4 0%, #E8F5EE 100%);\n          border-bottom: 2px solid rgba(64,145,108,0.2);\n          color: #1B3A4B; font-weight: 700;\n        }\n        .comparison-table thead th:last-child { color: #40916C; }\n        .comparison-table tbody tr:nth-child(even) { background: rgba(212,237,218,0.25); }\n        .comparison-table tbody tr { transition: background 0.2s ease; }\n        .comparison-table tbody tr:hover { background: rgba(183,228,199,0.3); }\n\n        .trust-grid {\n          display: grid;\n          grid-template-columns: repeat(3, 1fr);\n          gap: 20px;\n        }\n        .trust-card {\n          background: rgba(255,255,255,0.7);\n          border: 1px solid rgba(116,198,157,0.25);\n          backdrop-filter: blur(10px);\n          transition: all 0.3s ease;\n        }\n        .trust-card:hover {\n          background: rgba(255,255,255,0.95);\n          border-color: rgba(45,106,79,0.4);\n        }\n\n        .divider-line {\n          height: 1px;\n          background: linear-gradient(90deg, transparent, rgba(64,145,108,0.35), transparent);\n        }\n\n        .pricing-grid {\n          display: grid;\n          grid-template-columns: repeat(3, 1fr);\n          gap: 20px;\n          align-items: stretch;\n          max-width: 1180px;\n          margin: 0 auto;\n        }\n        .pricing-card {\n          background: #fff;\n          border: 1px solid rgba(116,198,157,0.3);\n          transition: all 0.3s ease;\n          display: flex;\n          flex-direction: column;\n        }\n        .pricing-card:hover {\n          border-color: rgba(45,106,79,0.5);\n          box-shadow: 0 16px 44px rgba(45,106,79,0.15);\n        }\n        .pricing-card.popular {\n          border: 2px solid rgba(45,106,79,0.55);\n          box-shadow: 0 16px 44px rgba(45,106,79,0.18);\n        }\n        .pricing-feature-row { display: flex; align-items: flex-start; gap: 6px; }\n        .pricing-feature-row + .pricing-feature-row { margin-top: 3px; }\n\n        @media (max-width: 1024px) {\n          .pricing-grid { grid-template-columns: 1fr; max-width: 480px; }\n        }\n\n        /* ── HOW section viewport fit ── */\n        .how-section {\n          display: flex;\n          flex-direction: column;\n          height: calc(100vh - 128px);\n        }\n        .how-content {\n          flex: 1;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          padding: 16px 32px;\n          max-width: 1100px;\n          width: 100%;\n          margin: 0 auto;\n          gap: 12px;\n          min-height: 0;\n          overflow: hidden;\n        }\n        .steps-grid {\n          display: grid;\n          grid-template-columns: repeat(5, 1fr);\n          gap: 12px;\n          flex: 1;\n        }\n        .step-col {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          min-height: 0;\n        }\n        .step-card {\n          background: rgba(255,255,255,0.8);\n          border-radius: 14px;\n          padding: 14px 12px;\n          border: 1px solid #E8F5EE;\n          box-shadow: 0 4px 18px rgba(45,106,79,0.07);\n          text-align: center;\n          width: 100%;\n          flex: 1;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: flex-start;\n          min-height: 0;\n          overflow: hidden;\n        }\n\n        @media (max-width: 1024px) {\n            .how-section {\n              height: auto;\n              min-height: unset;\n            }\n          }\n\n        /* ── MOBILE ── */\n        @media (max-width: 768px) {\n          .how-section { min-height: unset; }\n          .how-content { padding: 16px; gap: 14px; justify-content: flex-start; }\n          .steps-grid {\n            grid-template-columns: 1fr 1fr;\n            gap: 10px;\n          }\n          .step-col:last-child { grid-column: span 2; max-width: 50%; margin: 0 auto; width: 100%; }\n          .trust-grid { grid-template-columns: 1fr !important; }\n          .comparison-table th, .comparison-table td { padding: 10px 12px; font-size: 12px; }\n          .tab-btn { padding: 9px 16px; font-size: 12px; }\n        }\n\n        @media (max-width: 480px) {\n          .steps-grid { grid-template-columns: 1fr; }\n          .step-col:last-child { grid-column: unset; max-width: 100%; }\n          .how-content { padding: 12px; }\n        }\n\n        @media (min-width: 769px) and (max-width: 1024px) {\n          .steps-grid { grid-template-columns: repeat(3, 1fr); }\n          .step-col:nth-child(4), .step-col:nth-child(5) { grid-column: span 1; }\n        }\n      "
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
            background: `rgba(184,228,199,0.25)`,
            border: `1.5px solid rgba(116,198,157,0.3)`,
          }}
        >
          <button
            onClick={() => r(`how`)}
            className={`tab-btn${n === `how` ? ` active` : ``}`}
          >
            How It Works
          </button>
          <button
            onClick={() => r(`membership`)}
            className={`tab-btn${n === `membership` ? ` active` : ``}`}
          >
            Membership Plans
          </button>
        </div>
      </div>
      {n === `how` ? (
        <div className="how-section">
          <div className="how-content">
            <div style={{ textAlign: `center` }}>
              <p
                style={{
                  color: `#40916C`,
                  fontSize: 11,
                  letterSpacing: `0.3em`,
                  textTransform: `uppercase`,
                  marginBottom: 6,
                  fontFamily: `'DM Sans', sans-serif`,
                  fontWeight: 600,
                }}
              >
                Your Journey to Love
              </p>
              <h1
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: `clamp(26px, 3.5vw, 42px)`,
                  fontWeight: 700,
                  color: `#1B3A4B`,
                  letterSpacing: `-0.025em`,
                  marginBottom: 8,
                }}
              >
                {"How "}
                <span className="green-text">Nikha2</span>
                {" Works"}
              </h1>
              <p
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 13,
                  color: `#3D6B55`,
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
            <div className="steps-grid">
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
                        background: `linear-gradient(135deg, #1B3A4B, #2D6A4F)`,
                        color: `#fff`,
                        fontSize: 11,
                        fontWeight: 700,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        marginBottom: 8,
                        fontFamily: `'DM Sans', sans-serif`,
                        flexShrink: 0,
                      }}
                    >
                      {t + 1}
                    </div>
                    <h3
                      style={{
                        fontFamily: `'Playfair Display', serif`,
                        fontSize: 13,
                        fontWeight: 700,
                        color: `#1B3A4B`,
                        marginBottom: 6,
                        flexShrink: 0,
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 11.5,
                        color: `#3D6B55`,
                        lineHeight: 1.5,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: `center` }}>
              <button onClick={() => r(`membership`)} className="btn-primary">
                Get Started →
              </button>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <section style={{ textAlign: `center`, padding: `24px 24px 8px` }}>
            <p
              style={{
                color: `#40916C`,
                fontSize: 11,
                letterSpacing: `0.3em`,
                textTransform: `uppercase`,
                marginBottom: 8,
                fontFamily: `'DM Sans', sans-serif`,
                fontWeight: 600,
              }}
            >
              Membership Plans
            </p>
            <h1
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(24px, 3.5vw, 38px)`,
                fontWeight: 700,
                color: `#1B3A4B`,
                letterSpacing: `-0.025em`,
                marginBottom: 8,
              }}
            >
              {"Choose the Right Plan for Your "}
              <span className="green-text">Journey</span>
            </h1>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 13,
                color: `#3D6B55`,
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
                <div
                  key={t}
                  className={`pricing-card rounded-2xl p-4 relative card-hover ${e.popular ? `popular` : ``}`}
                  style={{
                    borderRadius: 16,
                    padding: 16,
                    position: `relative`,
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
                        fontFamily: `'DM Sans', sans-serif`,
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
                        color: `#1B3A4B`,
                        marginBottom: 2,
                        fontFamily: `'Playfair Display', serif`,
                      }}
                    >
                      {e.icon ? `${e.icon} ` : ``}
                      {e.name}
                    </h3>
                    {e.bestFor && (
                      <p
                        style={{
                          fontSize: 10,
                          color: `#3D6B55`,
                          marginBottom: 4,
                          lineHeight: 1.4,
                          fontFamily: `'DM Sans', sans-serif`,
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
                        className="green-text"
                        style={{ fontSize: 26, fontWeight: 700 }}
                      >
                        {e.price}
                      </span>
                      {e.period && (
                        <span
                          style={{
                            fontSize: 12,
                            color: `#3D6B55`,
                            fontFamily: `'DM Sans', sans-serif`,
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
                          color: `#8AA79C`,
                          fontFamily: `'DM Sans', sans-serif`,
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
                            color: `#40916C`,
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
                            color: `#1B3A4B`,
                            lineHeight: 1.4,
                            fontFamily: `'DM Sans', sans-serif`,
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
                            color: `#e63946`,
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
                            color: `#8AA79C`,
                            lineHeight: 1.4,
                            fontFamily: `'DM Sans', sans-serif`,
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
                      className="btn-primary"
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
                    <button
                      onClick={() => u(e.id)}
                      disabled={o === e.id}
                      style={{
                        width: `100%`,
                        padding: `10px 0`,
                        borderRadius: 32,
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 12,
                        fontWeight: 700,
                        border: `2px solid #2D6A4F`,
                        color: `#2D6A4F`,
                        background: `transparent`,
                        cursor: `pointer`,
                        transition: `all 0.22s`,
                      }}
                      onMouseEnter={(e) => {
                        ((e.currentTarget.style.background = `#2D6A4F`),
                          (e.currentTarget.style.color = `#fff`));
                      }}
                      onMouseLeave={(e) => {
                        ((e.currentTarget.style.background = `transparent`),
                          (e.currentTarget.style.color = `#2D6A4F`));
                      }}
                    >
                      {o === e.id ? `Processing…` : e.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
          <div className="divider-line" style={{ margin: `0 32px` }} />
          <section style={{ padding: `48px 24px` }}>
            <div style={{ maxWidth: 900, margin: `0 auto` }}>
              <div style={{ textAlign: `center`, marginBottom: 32 }}>
                <p
                  style={{
                    color: `#40916C`,
                    fontSize: 12,
                    letterSpacing: `0.3em`,
                    textTransform: `uppercase`,
                    marginBottom: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontWeight: 600,
                  }}
                >
                  Compare Plans
                </p>
                <h2
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                  }}
                >
                  {"Feature "}
                  <span className="green-text">Comparison</span>
                </h2>
              </div>
              <div
                style={{
                  overflowX: `auto`,
                  borderRadius: 16,
                  border: `1px solid rgba(116,198,157,0.3)`,
                  boxShadow: `0 2px 12px rgba(45,106,79,0.06)`,
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
                            color: `#1B3A4B`,
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
                    color: `#40916C`,
                    fontSize: 12,
                    letterSpacing: `0.3em`,
                    textTransform: `uppercase`,
                    marginBottom: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontWeight: 600,
                  }}
                >
                  Trust & Safety
                </p>
                <h2
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                  }}
                >
                  {"Your Safety, Our "}
                  <span className="green-text">Priority</span>
                </h2>
              </div>
              <div className="trust-grid">
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
                        color: `#1B3A4B`,
                        marginBottom: 8,
                        fontFamily: `'Playfair Display', serif`,
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: `#3D6B55`,
                        lineHeight: 1.6,
                        fontFamily: `'DM Sans', sans-serif`,
                      }}
                    >
                      {e.desc}
                    </p>
                  </div>
                ))}
              </div>
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
                background: `linear-gradient(135deg, #F0FAF4 0%, #E8F5EE 50%, #D4EDDA 100%)`,
                border: `1px solid rgba(64,145,108,0.25)`,
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
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: `clamp(22px, 3vw, 32px)`,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                    marginBottom: 12,
                  }}
                >
                  {"Start Your Journey "}
                  <span className="green-text">Today</span>
                </h2>
                <p
                  style={{
                    color: `#3D6B55`,
                    marginBottom: 24,
                    maxWidth: 460,
                    margin: `0 auto 24px`,
                    fontFamily: `'DM Sans', sans-serif`,
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
                    className="btn-primary"
                    style={{ fontSize: 14, padding: `14px 36px` }}
                  >
                    {o === `premium` ? `Processing…` : `Get Premium →`}
                  </button>
                  <button
                    onClick={() => u(`free`)}
                    style={{
                      border: `2px solid #2D6A4F`,
                      color: `#2D6A4F`,
                      background: `transparent`,
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 14,
                      fontWeight: 700,
                      padding: `13px 36px`,
                      borderRadius: 32,
                      cursor: `pointer`,
                      transition: `all 0.22s`,
                    }}
                    onMouseEnter={(e) => {
                      ((e.currentTarget.style.background = `#2D6A4F`),
                        (e.currentTarget.style.color = `#fff`));
                    }}
                    onMouseLeave={(e) => {
                      ((e.currentTarget.style.background = `transparent`),
                        (e.currentTarget.style.color = `#2D6A4F`));
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
          background: `#1B3A4B`,
          color: `#74C69D`,
          padding: `28px 24px`,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontWeight: 700,
            fontSize: 20,
            color: `#fff`,
            letterSpacing: `-0.02em`,
            marginBottom: 8,
          }}
        >
          Nikha<span style={{ color: `#74C69D` }}>2</span>{" "}
          <span style={{ color: `#40916C` }}>♡</span>
        </div>
        <p
          style={{
            margin: `0 0 12px`,
            fontSize: 12,
            opacity: 0.5,
            fontFamily: `'DM Sans', sans-serif`,
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
            <a
              key={e}
              href="#"
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
            </a>
          ))}
        </div>
      </footer>
      {c && (
        <Toast message={c.message} tone={c.tone} onDismiss={() => l(null)} />
      )}
    </div>
  );
}
var mn = [
  {
    icon: `🛡️`,
    title: `Trusted Profiles`,
    desc: `Every member is verified, helping you connect with greater confidence. Trust Badges make it easier to identify genuine people with sincere intentions.`,
    accent: `#40916C`,
    tag: `Trusted`,
  },
  {
    icon: `💚`,
    title: `Compatible Matches`,
    desc: `Find meaningful matches based on your values, traditions, and relationship goals. We focus on true compatibility not just proximity.`,
    accent: `#52B788`,
    tag: `Compatible`,
  },
  {
    icon: `🔒`,
    title: `Privacy Assured`,
    desc: `Your privacy comes first. Your conversations and profile details are protected by design, so you can connect with confidence knowing your information stays yours.`,
    accent: `#74C69D`,
    tag: `Privacy`,
  },
  {
    icon: `🤝`,
    title: `Respect & Support`,
    desc: `A respectful, supportive community where your boundaries are valued. Connect comfortably with mindful interactions and thoughtful moderation designed to create a safe, welcoming experience.`,
    accent: `#2D6A4F`,
    tag: `Support`,
  },
  {
    icon: `✨`,
    title: `Quality Connections`,
    desc: `Spend less time searching and more time building meaningful connections. Find people who align with your values and intentions, and let conversations develop naturally at a pace that feels right.`,
    accent: `#52B788`,
    tag: `Quality`,
  },
];
function WayDifferentSection() {
  let [e, t] = (0, React.useState)(null);
  return (
    <section
      style={{
        background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
        borderTop: `1px solid #D4EDDA`,
        padding: `40px 40px`,
        minHeight: `100vh`,
        display: `flex`,
        alignItems: `center`,
      }}
    >
      <style>
        {
          "\n        .zebra-container {\n          border-radius: 20px;\n          overflow: hidden;\n          border: 1px solid #D4EDDA;\n          box-shadow: 0 8px 32px rgba(45,106,79,0.08);\n          width: 100%;\n        }\n        .zebra-row {\n          display: flex;\n          align-items: center;\n          gap: 24px;\n          padding: 22px 36px;\n          transition: background 0.25s ease;\n          cursor: default;\n        }\n        .zebra-row:not(:last-child) { border-bottom: 1px solid #E8F5EE; }\n        .zebra-icon {\n          width: 44px; height: 44px; border-radius: 12px;\n          display: flex; align-items: center; justify-content: center;\n          font-size: 20px; flex-shrink: 0;\n          transition: all 0.25s ease;\n        }\n        .zebra-title { width: 180px; flex-shrink: 0; }\n        .zebra-divider {\n          width: 1.5px; align-self: stretch;\n          flex-shrink: 0; transition: background 0.25s ease;\n        }\n        .zebra-desc {\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13px; color: #3D6B55;\n          line-height: 1.65; margin: 0; flex: 1;\n        }\n\n        @media (max-width: 900px) {\n          .zebra-section { padding: 32px 24px !important; }\n          .zebra-row { padding: 18px 24px !important; gap: 16px !important; }\n          .zebra-title { width: 140px !important; }\n        }\n\n        @media (max-width: 600px) {\n          .zebra-section { padding: 24px 16px !important; min-height: unset !important; }\n          .zebra-container { border-radius: 14px !important; }\n          .zebra-row {\n            flex-direction: column !important;\n            align-items: flex-start !important;\n            padding: 18px 16px !important;\n            gap: 10px !important;\n          }\n          .zebra-top-row {\n            display: flex !important;\n            align-items: center !important;\n            gap: 12px !important;\n            width: 100% !important;\n          }\n          .zebra-divider { display: none !important; }\n          .zebra-title { width: auto !important; flex: 1 !important; }\n          .zebra-icon { width: 38px !important; height: 38px !important; font-size: 18px !important; }\n          .zebra-desc { font-size: 12.5px !important; width: 100% !important; }\n        }\n      "
        }
      </style>
      <div
        style={{ maxWidth: 1100, margin: `0 auto`, width: `100%` }}
        className="zebra-section"
      >
        <div style={{ textAlign: `center`, marginBottom: 32 }}>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 11,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 8,
              opacity: 0.8,
            }}
          >
            The Nikha2 Way
          </p>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(20px, 2.5vw, 30px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"What Makes Us "}
            <span className="green-text">Different</span>
          </h2>
        </div>
        <div className="zebra-container">
          {mn.map((n, r) => (
            <div
              key={r}
              className="zebra-row"
              onMouseEnter={() => t(r)}
              onMouseLeave={() => t(null)}
              style={{
                background:
                  e === r
                    ? `linear-gradient(90deg, ${n.accent}14, ${n.accent}06)`
                    : r % 2 == 0
                      ? `#fff`
                      : `#F8FAF5`,
              }}
            >
              <div className="zebra-top-row" style={{ display: `contents` }}>
                <div
                  className="zebra-icon"
                  style={{
                    background:
                      e === r
                        ? `linear-gradient(135deg, ${n.accent}28, ${n.accent}48)`
                        : r % 2 == 0
                          ? `#F0FAF4`
                          : `#fff`,
                    border: `1.5px solid ${e === r ? n.accent + `60` : `#D4EDDA`}`,
                  }}
                >
                  {n.icon}
                </div>
                <div className="zebra-title">
                  <span
                    style={{
                      fontFamily: `'DM Sans', sans-serif`,
                      fontSize: 9,
                      fontWeight: 700,
                      color: e === r ? n.accent : `#74C69D`,
                      letterSpacing: `0.18em`,
                      textTransform: `uppercase`,
                      display: `block`,
                      marginBottom: 4,
                      transition: `color 0.25s ease`,
                    }}
                  >
                    {n.tag}
                  </span>
                  <h4
                    style={{
                      fontFamily: `'Playfair Display', serif`,
                      fontSize: `clamp(13px, 1.3vw, 16px)`,
                      fontWeight: 700,
                      color: `#1B3A4B`,
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {n.title}
                  </h4>
                </div>
              </div>
              <div
                className="zebra-divider"
                style={{
                  background: e === r ? n.accent + `50` : `#E8F5EE`,
                }}
              />
              <p className="zebra-desc">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function FeaturesPage() {
  let e = useNavigate();
  return (
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
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-14px); }\n        }\n\n        @keyframes pulse {\n          0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.7); }\n          50%       { box-shadow: 0 0 16px rgba(34,197,94,0.35); }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: all 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n\n        .hero-btn-outline {\n          background: rgba(255,255,255,0.92); color: #2D6A4F;\n          border: 2px solid #74C69D; padding: 13px 32px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em; transition: all 0.22s;\n          backdrop-filter: blur(6px);\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n        }\n        .hero-btn-outline:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,106,79,0.2); }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n      "
        }
      </style>
      <section
        style={{
          position: `relative`,
          padding: `88px 40px 96px`,
          textAlign: `center`,
          overflow: `hidden`,
        }}
      >
        <div
          style={{
            position: `absolute`,
            top: 40,
            left: `8%`,
            width: 280,
            height: 280,
            borderRadius: `50%`,
            background: `rgba(183,228,199,0.35)`,
            filter: `blur(60px)`,
            animation: `float 6s ease-in-out infinite`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `absolute`,
            bottom: 20,
            right: `6%`,
            width: 320,
            height: 320,
            borderRadius: `50%`,
            background: `rgba(116,198,157,0.2)`,
            filter: `blur(70px)`,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `1s`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `relative`,
            zIndex: 1,
            maxWidth: 760,
            margin: `0 auto`,
          }}
        >
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 12,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            ✦ Platform Features
          </p>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 5vw, 54px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Built for <span className="green-text">Meaningful</span>
            {" Connections"}
          </h1>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: `0 auto 40px`,
            }}
          >
            Every feature is thoughtfully designed to help you connect with
            someone who truly shares your values, respects your culture, and
            envisions a future aligned with yours.
          </p>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <button className="hero-btn-primary" onClick={() => e(`/explore`)}>
              🔍 Explore People Online
            </button>
            <button className="hero-btn-outline" onClick={() => e(`/signup`)}>
              Log In / Sign Up
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `#fff`,
          borderTop: `1px solid #E8F5EE`,
          borderBottom: `1px solid #E8F5EE`,
          padding: `36px 40px`,
        }}
      >
        <p
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: `clamp(15px, 2vw, 19px)`,
            color: `#3D6B55`,
            fontStyle: `italic`,
            textAlign: `center`,
            maxWidth: 860,
            margin: `0 auto`,
            lineHeight: 1.7,
            textWrap: `pretty`,
          }}
        >
          "Shared beliefs and culture create meaningful connections. Discover
          communities that reflect your identity and connect with people who
          share your values, traditions, and{" "}vision."
        </p>
      </div>
      <WayDifferentSection />
      <section
        style={{
          padding: `80px 40px`,
          textAlign: `center`,
          background: `#fff`,
        }}
      >
        <div style={{ maxWidth: 780, margin: `0 auto` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 14,
              opacity: 0.6,
            }}
          >
            ⊡ ☯ ⊡
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(22px, 3.5vw, 38px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
              marginBottom: 16,
            }}
          >
            Every Feature, Designed for{" "}
            <span className="green-text">Your Journey</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 15,
              color: `#3D6B55`,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: `0 auto 52px`,
            }}
          >
            Whether you're just starting out or ready to take the next step —
            our tools adapt to where you are, not the other way around.
          </p>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
              gap: 20,
              maxWidth: 720,
              margin: `0 auto`,
            }}
          >
            {[
              {
                icon: `🔒`,
                label: `End-to-End Privacy`,
                sub: `Your data stays yours, always.`,
              },
              {
                icon: `⚡`,
                label: `Smart Matching`,
                sub: `Relevant profiles, not just nearby ones.`,
              },
              {
                icon: `🤝`,
                label: `Real Connections`,
                sub: `Built on shared values, not swipes.`,
              },
            ].map((e) => (
              <div
                key={e.label}
                style={{
                  background: `linear-gradient(160deg, #F0FAF4, #E8F5EE)`,
                  border: `1px solid #D4EDDA`,
                  borderRadius: 20,
                  padding: `28px 24px`,
                  textAlign: `center`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{e.icon}</div>
                <div
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: 15,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                    marginBottom: 6,
                  }}
                >
                  {e.label}
                </div>
                <div
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                    color: `#3D6B55`,
                    lineHeight: 1.6,
                  }}
                >
                  {e.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          padding: `80px 40px 88px`,
          borderTop: `1px solid #D4EDDA`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto`, textAlign: `center` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⊡ ☯ ⊡
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(26px, 4vw, 42px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              marginBottom: 12,
              color: `#1B3A4B`,
            }}
          >
            Ready to Find <span className="green-text">Your Person?</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              marginBottom: 40,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: `0 auto 40px`,
            }}
          >
            Thousands of verified members are already using these features to
            build real, lasting relationships. Your story starts here.
          </p>
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 8,
                background: `#fff`,
                border: `1px solid #B7E4C7`,
                borderRadius: 24,
                padding: `9px 22px`,
                boxShadow: `0 3px 12px rgba(45,106,79,0.1)`,
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
                  color: `#2D6A4F`,
                }}
              >
                12 Online Members Right Now
              </span>
            </div>
          </div>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <button
              className="hero-btn-primary"
              onClick={() => e(`/how-it-works`)}
            >
              Get Started →
            </button>
            <button className="hero-btn-outline" onClick={() => e(`/explore`)}>
              🔍 Browse Members
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
          padding: `18px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
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
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `#74C69D`, fontSize: 16 }}>♥</span>
      </div>
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
          <span style={{ color: `#40916C` }}>♥</span>
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
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[`Terms`, `Privacy`, `Cookies`].map((e) => (
            <a
              key={e}
              href="#"
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
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
var _n = [
    {
      names: `Aisha & Rahman`,
      image: `/images/success/couple1.jpg`,
      quote: `We started with a simple chat and quickly realized how much we had in common. The private chat rooms helped us open up comfortably, and our first video call made everything feel real. Today, we're happily engaged.`,
      location: `Mumbai × Delhi`,
    },
    {
      names: `Priya & Arjun`,
      image: `/images/success/couple2.jpg`,
      quote: `What we loved most was the quality of matches. No endless swiping — just genuine people. The platform made it easy to connect and build something meaningful.`,
      location: `Bengaluru × Chennai`,
    },
    {
      names: `Simran & Harpreet`,
      image: `/images/success/couple3.jpg`,
      quote: `Having a space where we could connect within our community made all the difference. From chats to video calls, everything felt safe and natural.`,
      location: `Toronto × Vancouver`,
    },
    {
      names: `Fatima & Omar`,
      image: `/images/success/couple4.jpg`,
      quote: `The Trust Badge gave us confidence from the start. We knew we were talking to genuine people. Six months later, we're planning our wedding!`,
      location: `London × Birmingham`,
    },
    {
      names: `Anjali & Vikram`,
      image: `/images/success/couple5.jpg`,
      quote: `Video calling before meeting in person was a game-changer. It helped us feel connected even before our first date. Now we're married.`,
      location: `Dubai × Abu Dhabi`,
    },
    {
      names: `Meera & Karthik`,
      image: `/images/success/couple6.jpg`,
      quote: `The community-based matching introduced us to someone who truly shared our values and outlook on life. We're grateful for this platform.`,
      location: `Singapore × Chennai`,
    },
  ],
  vn = [
    {
      quote: `I found someone who truly understands me.`,
      avatar: `/images/success/user1.jpg`,
    },
    {
      quote: `Safe, simple, and meaningful.`,
      avatar: `/images/success/user2.jpg`,
    },
    {
      quote: `This platform changed my life.`,
      avatar: `/images/success/user3.jpg`,
    },
  ],
  yn = [
    {
      icon: `✅`,
      title: `Verified Profiles`,
      desc: `Trust Badge ensures authentic connections`,
    },
    {
      icon: `💬`,
      title: `Private Chat Rooms`,
      desc: `Safe spaces for real conversations`,
    },
    {
      icon: `📹`,
      title: `Video Calling`,
      desc: `Connect beyond text with face-to-face`,
    },
    {
      icon: `🏘️`,
      title: `Community Matching`,
      desc: `Find matches who share your values`,
    },
  ];
function StoryCard({ story: e }) {
  return (
    <div
      style={{
        background: `#fff`,
        border: `1px solid #E8F5EE`,
        borderRadius: 24,
        overflow: `hidden`,
        flexShrink: 0,
        width: 384,
        scrollSnapAlign: `start`,
        transition: `all 0.4s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.borderColor = `#74C69D`),
          (e.currentTarget.style.boxShadow = `0 20px 56px rgba(45,106,79,0.14)`),
          (e.currentTarget.style.transform = `translateY(-6px)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.borderColor = `#E8F5EE`),
          (e.currentTarget.style.boxShadow = `none`),
          (e.currentTarget.style.transform = `none`));
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, #D4EDDA 0%, #B7E4C7 100%)`,
          height: 220,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          flexDirection: `column`,
          gap: 6,
        }}
      >
        <div style={{ fontSize: 48 }}>📸</div>
        <p
          style={{
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 11,
            color: `#52B788`,
          }}
        >
          {e.image}
        </p>
      </div>
      <div style={{ padding: `20px 22px 24px` }}>
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 23,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 6,
          }}
        >
          {e.names}
        </div>
        <div
          style={{
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 14,
            color: `#74C69D`,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {e.location}
        </div>
        <p
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 17,
            color: `#3D6B55`,
            fontStyle: `italic`,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          "{e.quote}"
        </p>
      </div>
    </div>
  );
}
function FeatureCard({ icon: e, title: t, desc: n }) {
  return (
    <div
      style={{
        background: `rgba(255,255,255,0.65)`,
        border: `1px solid #E8F5EE`,
        borderRadius: 20,
        padding: `28px 20px`,
        textAlign: `center`,
        backdropFilter: `blur(10px)`,
        transition: `all 0.3s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.background = `rgba(255,255,255,0.95)`),
          (e.currentTarget.style.borderColor = `#74C69D`),
          (e.currentTarget.style.transform = `translateY(-4px)`),
          (e.currentTarget.style.boxShadow = `0 12px 36px rgba(45,106,79,0.12)`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.background = `rgba(255,255,255,0.65)`),
          (e.currentTarget.style.borderColor = `#E8F5EE`),
          (e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `none`));
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{e}</div>
      <div
        style={{
          fontFamily: `'Playfair Display', serif`,
          fontSize: 14,
          fontWeight: 700,
          color: `#1B3A4B`,
          marginBottom: 6,
        }}
      >
        {t}
      </div>
      <div
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          fontSize: 12,
          color: `#74C69D`,
          lineHeight: 1.55,
        }}
      >
        {n}
      </div>
    </div>
  );
}
function TestimonialCard({ testimonial: e }) {
  return (
    <div
      style={{
        background: `rgba(255,255,255,0.65)`,
        border: `1px solid #E8F5EE`,
        borderRadius: 20,
        padding: `28px 22px`,
        textAlign: `center`,
        backdropFilter: `blur(10px)`,
        transition: `all 0.35s ease`,
        cursor: `default`,
      }}
      onMouseEnter={(e) => {
        ((e.currentTarget.style.transform = `translateY(-6px)`),
          (e.currentTarget.style.boxShadow = `0 20px 48px rgba(45,106,79,0.12)`),
          (e.currentTarget.style.borderColor = `#74C69D`));
      }}
      onMouseLeave={(e) => {
        ((e.currentTarget.style.transform = `none`),
          (e.currentTarget.style.boxShadow = `none`),
          (e.currentTarget.style.borderColor = `#E8F5EE`));
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: `50%`,
          background: `linear-gradient(160deg, #D4EDDA, #B7E4C7)`,
          margin: `0 auto 16px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 24,
          border: `3px solid #fff`,
          boxShadow: `0 4px 14px rgba(45,106,79,0.15)`,
        }}
      >
        👤
      </div>
      <p
        style={{
          fontFamily: `'Playfair Display', serif`,
          fontSize: 15,
          color: `#1B3A4B`,
          fontStyle: `italic`,
          lineHeight: 1.65,
          margin: `0 0 12px`,
        }}
      >
        "{e.quote}"
      </p>
      <p
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          fontSize: 10,
          color: `#74C69D`,
          opacity: 0.7,
        }}
      >
        {e.avatar}
      </p>
    </div>
  );
}
function SuccessStoriesPage() {
  let e = (0, React.useRef)(null),
    t = useNavigate(),
    n = (t) => {
      e.current && e.current.scrollBy({ left: t * 400, behavior: `smooth` });
    };
  return (
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
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        @keyframes float {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-14px); }\n        }\n\n        @keyframes heroBtnFloat {\n          0%, 100% { transform: translateY(0); }\n          50%       { transform: translateY(-6px); }\n        }\n\n        .hero-btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none; padding: 14px 36px;\n          border-radius: 32px; font-family: 'DM Sans', sans-serif;\n          font-size: 15px; font-weight: 700; cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.35);\n          transition: box-shadow 0.22s;\n          animation: heroBtnFloat 2.8s ease-in-out infinite;\n          text-decoration: none; display: inline-block;\n        }\n        .hero-btn-primary:hover { box-shadow: 0 10px 32px rgba(27,58,75,0.45); }\n\n        .story-scroll {\n          display: flex;\n          gap: 20px;\n          overflow-x: auto;\n          padding: 8px 8px 20px;\n          scroll-snap-type: x mandatory;\n        }\n        .story-scroll::-webkit-scrollbar { height: 4px; }\n        .story-scroll::-webkit-scrollbar-track { background: #E8F5EE; border-radius: 10px; }\n        .story-scroll::-webkit-scrollbar-thumb { background: linear-gradient(90deg, #40916C, #74C69D); border-radius: 10px; }\n\n        .features-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n          gap: 18px;\n        }\n\n        .testimonials-grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n          gap: 20px;\n        }\n\n        @media (max-width: 768px) {\n          .features-grid    { grid-template-columns: repeat(2, 1fr); }\n          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }\n        }\n        @media (max-width: 480px) {\n          .features-grid    { grid-template-columns: 1fr; }\n          .testimonials-grid { grid-template-columns: 1fr; }\n        }\n      "
        }
      </style>
      <section
        style={{
          position: `relative`,
          padding: `72px 40px 80px`,
          textAlign: `center`,
          overflow: `hidden`,
        }}
      >
        <div
          style={{
            position: `absolute`,
            top: 40,
            left: `8%`,
            width: 280,
            height: 280,
            borderRadius: `50%`,
            background: `rgba(183,228,199,0.35)`,
            filter: `blur(60px)`,
            animation: `float 6s ease-in-out infinite`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `absolute`,
            bottom: 20,
            right: `6%`,
            width: 320,
            height: 320,
            borderRadius: `50%`,
            background: `rgba(116,198,157,0.2)`,
            filter: `blur(70px)`,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `1s`,
            pointerEvents: `none`,
          }}
        />
        <div
          style={{
            position: `relative`,
            zIndex: 1,
            maxWidth: 760,
            margin: `0 auto`,
          }}
        >
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 12,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 16,
              opacity: 0.8,
            }}
          >
            💖 Success Stories
          </p>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 5vw, 54px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              lineHeight: 1.15,
              marginBottom: 18,
            }}
          >
            Real Stories. Real Connections.
            <br />
            <span className="green-text">Real Love.</span>
          </h1>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: `0 auto 40px`,
            }}
          >
            Thousands have found meaningful relationships on our platform. Here
            are some of their journeys.
          </p>
          <Link to="/how-it-works" className="hero-btn-primary">
            Get Started
          </Link>
        </div>
      </section>
      <section
        style={{ padding: `52px 40px`, maxWidth: 1200, margin: `0 auto` }}
      >
        <div style={{ textAlign: `center`, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 17,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 14,
              opacity: 0.8,
              fontWeight: 700,
            }}
          >
            💬 Testimonials
          </p>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(30px, 4.5vw, 50px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"Love "}
            <span className="green-text">Stories</span>
            {" That Inspire"}
          </h2>
        </div>
        <div style={{ position: `relative` }}>
          <button
            onClick={() => n(-1)}
            style={{
              position: `absolute`,
              left: -20,
              top: `50%`,
              transform: `translateY(-50%)`,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: `50%`,
              background: `#fff`,
              border: `1.5px solid #B7E4C7`,
              color: `#2D6A4F`,
              fontSize: 16,
              cursor: `pointer`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              boxShadow: `0 4px 16px rgba(45,106,79,0.15)`,
              transition: `all 0.2s`,
            }}
            onMouseEnter={(e) => {
              ((e.currentTarget.style.background = `#F0FAF4`),
                (e.currentTarget.style.borderColor = `#40916C`));
            }}
            onMouseLeave={(e) => {
              ((e.currentTarget.style.background = `#fff`),
                (e.currentTarget.style.borderColor = `#B7E4C7`));
            }}
          >
            ←
          </button>
          <button
            onClick={() => n(1)}
            style={{
              position: `absolute`,
              right: -20,
              top: `50%`,
              transform: `translateY(-50%)`,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: `50%`,
              background: `#fff`,
              border: `1.5px solid #B7E4C7`,
              color: `#2D6A4F`,
              fontSize: 16,
              cursor: `pointer`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              boxShadow: `0 4px 16px rgba(45,106,79,0.15)`,
              transition: `all 0.2s`,
            }}
            onMouseEnter={(e) => {
              ((e.currentTarget.style.background = `#F0FAF4`),
                (e.currentTarget.style.borderColor = `#40916C`));
            }}
            onMouseLeave={(e) => {
              ((e.currentTarget.style.background = `#fff`),
                (e.currentTarget.style.borderColor = `#B7E4C7`));
            }}
          >
            →
          </button>
          <div ref={e} className="story-scroll">
            {_n.map((e, t) => (
              <StoryCard key={t} story={e} />
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderTop: `1px solid #D4EDDA`,
          padding: `60px 40px`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: `0 auto` }}>
          <div style={{ textAlign: `center`, marginBottom: 40 }}>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 12,
                color: `#40916C`,
                letterSpacing: `0.3em`,
                textTransform: `uppercase`,
                marginBottom: 10,
                opacity: 0.8,
              }}
            >
              🌟 Why These Stories Matter
            </p>
            <h2
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(22px, 3vw, 34px)`,
                fontWeight: 700,
                color: `#1B3A4B`,
                letterSpacing: `-0.02em`,
              }}
            >
              {"What Makes "}
              <span className="green-text">Connections</span>
              {" Real"}
            </h2>
          </div>
          <div className="features-grid">
            {yn.map((e, t) => (
              <FeatureCard
                key={t}
                icon={e.icon}
                title={e.title}
                desc={e.desc}
              />
            ))}
          </div>
        </div>
      </section>
      <section
        style={{ padding: `60px 40px`, maxWidth: 1100, margin: `0 auto` }}
      >
        <div style={{ textAlign: `center`, marginBottom: 40 }}>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 12,
              color: `#40916C`,
              letterSpacing: `0.3em`,
              textTransform: `uppercase`,
              marginBottom: 10,
              opacity: 0.8,
            }}
          >
            💬 User Testimonials
          </p>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(22px, 3vw, 34px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.02em`,
            }}
          >
            {"What Our "}
            <span className="green-text">Members</span>
            {" Say"}
          </h2>
        </div>
        <div className="testimonials-grid">
          {vn.map((e, t) => (
            <TestimonialCard key={t} testimonial={e} />
          ))}
        </div>
      </section>
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          padding: `64px 40px 72px`,
          borderTop: `1px solid #D4EDDA`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto`, textAlign: `center` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⌒ ☽ ⌒
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(26px, 4vw, 42px)`,
              fontWeight: 700,
              letterSpacing: `-0.025em`,
              color: `#1B3A4B`,
              marginBottom: 8,
            }}
          >
            Your Story Could Be <span className="green-text">Next</span>
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `#3D6B55`,
              marginBottom: 36,
              fontStyle: `italic`,
            }}
          >
            Join today and start your journey toward a meaningful connection.
          </p>
          <div
            style={{
              display: `flex`,
              gap: 14,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <Link to="/how-it-works" className="hero-btn-primary">
              Get Started →
            </Link>
            <button
              onClick={() => t(`/explore`)}
              style={{
                background: `rgba(255,255,255,0.92)`,
                color: `#2D6A4F`,
                border: `2px solid #74C69D`,
                padding: `13px 32px`,
                borderRadius: 32,
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 15,
                fontWeight: 700,
                cursor: `pointer`,
                letterSpacing: `0.04em`,
                transition: `all 0.22s`,
                backdropFilter: `blur(6px)`,
              }}
              onMouseEnter={(e) => {
                ((e.currentTarget.style.background = `#fff`),
                  (e.currentTarget.style.boxShadow = `0 6px 20px rgba(45,106,79,0.2)`));
              }}
              onMouseLeave={(e) => {
                ((e.currentTarget.style.background = `rgba(255,255,255,0.92)`),
                  (e.currentTarget.style.boxShadow = `none`));
              }}
            >
              🔍 Browse Members
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
          padding: `18px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
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
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `#74C69D`, fontSize: 16 }}>♥</span>
      </div>
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
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[`Terms`, `Privacy`, `Cookies`].map((e) => (
            <a
              key={e}
              href="#"
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
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
var wn = `420155966557-ku317ls22tq2cgnh28uidj4q1gcsgqe5.apps.googleusercontent.com`;
function GoogleSignInButton({ redirectTo: e = `/explore`, onError: t }) {
  let n = (0, React.useRef)(null),
    [r, i] = (0, React.useState)(!1),
    { loginWithGoogle: a } = useAuth(),
    o = useNavigate();
  return (
    (0, React.useEffect)(() => {
      let n = !1,
        r = () => {
          if (!n) {
            if (!window.google?.accounts?.id) {
              setTimeout(r, 150);
              return;
            }
            (window.google.accounts.id.initialize({
              client_id: wn,
              callback: async ({ credential: n }) => {
                try {
                  o(
                    (await a(n)).me?.profileComplete === !1
                      ? `/complete-profile`
                      : e,
                    { state: { from: e } },
                  );
                } catch (e) {
                  t?.(e.message || `Google sign-in failed. Please try again.`);
                }
              },
            }),
              i(!0));
          }
        };
      return (
        r(),
        () => {
          n = !0;
        }
      );
    }, [a, o, e, t]),
    (0, React.useEffect)(() => {
      !r ||
        !n.current ||
        window.google.accounts.id.renderButton(n.current, {
          theme: `outline`,
          size: `large`,
          shape: `pill`,
          text: `continue_with`,
          logo_alignment: `center`,
          width: 360,
        });
    }, [r]),
    (
      <div
        ref={n}
        style={{ display: `flex`, justifyContent: `center`, width: `100%` }}
      />
    )
  );
}
function LoginPasswordToggle({ shown: e, onClick: t }) {
  return (
    <button
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
        color: `#74C69D`,
        display: `flex`,
        alignItems: `center`,
      }}
    >
      {e ? (
        <svg
          width="16"
          height="16"
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
          width="16"
          height="16"
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
function LoginPage() {
  let [e, t] = (0, React.useState)(``),
    [n, r] = (0, React.useState)(``),
    [i, a] = (0, React.useState)(!1),
    [o, s] = (0, React.useState)(``),
    [c, l] = (0, React.useState)(!1),
    { login: u } = useAuth(),
    d = useNavigate(),
    f = useLocation();
  return (
    <div style={{ height: `100vh`, display: `flex`, overflow: `hidden` }}>
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .login-input {\n          width: 100%;\n          padding: 12px 16px;\n          border-radius: 14px;\n          background: rgba(255,255,255,0.65);\n          border: 1.5px solid #D4EDDA;\n          color: #1B3A4B;\n          font-size: 13px;\n          font-family: 'DM Sans', sans-serif;\n          outline: none;\n          transition: border-color 0.2s, box-shadow 0.2s;\n        }\n        .login-input::placeholder { color: #9DC4B0; }\n        .login-input:focus {\n          border-color: #40916C;\n          box-shadow: 0 0 0 3px rgba(64,145,108,0.12);\n        }\n\n        .login-label {\n          display: block;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 10.5px;\n          font-weight: 700;\n          color: #3D6B55;\n          letter-spacing: 0.1em;\n          text-transform: uppercase;\n          margin-bottom: 6px;\n        }\n\n        .btn-submit {\n          width: 100%;\n          padding: 14px 0;\n          border-radius: 32px;\n          border: none;\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.3);\n          transition: all 0.22s;\n        }\n        .btn-submit:hover {\n          transform: translateY(-2px);\n          box-shadow: 0 10px 32px rgba(27,58,75,0.4);\n        }\n        .btn-submit:active { transform: scale(0.98); }\n\n        @media (max-width: 1024px) {\n          .left-panel { display: none !important; }\n          .right-panel { width: 100% !important; }\n        }\n      "
        }
      </style>
      <div
        className="left-panel"
        style={{
          width: `50%`,
          position: `relative`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          overflow: `hidden`,
          background: `linear-gradient(135deg, #1B3A4B 0%, #0d2418 100%)`,
        }}
      >
        <img
          src="/src/assets/hero.png"
          alt="Couple"
          style={{
            position: `absolute`,
            inset: 0,
            width: `100%`,
            height: `100%`,
            objectFit: `cover`,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: `absolute`,
            inset: 0,
            background: `linear-gradient(135deg, rgba(45,106,79,0.4) 0%, transparent 50%, rgba(27,58,75,0.3) 100%)`,
          }}
        />
        <div
          style={{
            position: `relative`,
            zIndex: 1,
            textAlign: `center`,
            padding: `0 48px`,
            maxWidth: 440,
          }}
        >
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 38,
              fontWeight: 700,
              color: `#fff`,
              marginBottom: 16,
              letterSpacing: `-0.02em`,
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 16,
              color: `rgba(255,255,255,0.7)`,
              lineHeight: 1.7,
            }}
          >
            Sign in to continue your journey toward finding a meaningful,
            lifelong connection.
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
          background: `#F8FAF5`,
          overflowY: `auto`,
        }}
      >
        <div style={{ width: `100%`, maxWidth: 420, padding: `20px 0` }}>
          <div style={{ textAlign: `center`, marginBottom: 36 }}>
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
                className="green-text"
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: `-0.02em`,
                }}
              >
                Nikha2
              </span>
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 10,
                  padding: `2px 8px`,
                  borderRadius: 20,
                  color: `#40916C`,
                  border: `1px solid #74C69D`,
                }}
              >
                ™
              </span>
            </Link>
            <p
              style={{
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 13,
                color: `#74C69D`,
                marginTop: 6,
              }}
            >
              The Second Chance — Global Matchmaking Platform
            </p>
          </div>
          <div
            style={{
              background: `rgba(255,255,255,0.75)`,
              backdropFilter: `blur(20px)`,
              border: `1px solid rgba(64,145,108,0.18)`,
              borderRadius: 28,
              padding: 32,
              boxShadow: `0 12px 48px rgba(27,58,75,0.1)`,
            }}
          >
            <div style={{ display: `flex`, flexDirection: `column`, gap: 18 }}>
              <div>
                <label className="login-label">Email</label>
                <input
                  type="email"
                  required={!0}
                  value={e}
                  onChange={(e) => t(e.target.value)}
                  placeholder="you@example.com"
                  className="login-input"
                />
              </div>
              <div>
                <label className="login-label">Password</label>
                <div style={{ position: `relative` }}>
                  <input
                    type={i ? `text` : `password`}
                    required={!0}
                    value={n}
                    onChange={(e) => r(e.target.value)}
                    placeholder="••••••••"
                    className="login-input"
                    style={{ paddingRight: 40 }}
                  />
                  <LoginPasswordToggle shown={i} onClick={() => a((e) => !e)} />
                </div>
              </div>
              <div style={{ display: `flex`, justifyContent: `flex-end` }}>
                <Link
                  to="#"
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12,
                    color: `#40916C`,
                    textDecoration: `none`,
                    transition: `color 0.2s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = `#74C69D`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = `#40916C`)
                  }
                >
                  Forgot Password?
                </Link>
              </div>
              {o && (
                <p
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12.5,
                    color: `#C0392B`,
                    background: `rgba(192,57,43,0.08)`,
                    padding: `8px 12px`,
                    borderRadius: 10,
                  }}
                >
                  {o}
                </p>
              )}
              <button
                onClick={async (t) => {
                  (t.preventDefault(), s(``), l(!0));
                  try {
                    (await u(e, n), d(f.state?.from || `/explore`));
                  } catch (e) {
                    s(e.message || `Could not sign in. Please try again.`);
                  } finally {
                    l(!1);
                  }
                }}
                className="btn-submit"
                disabled={c}
                style={{ opacity: c ? 0.7 : 1 }}
              >
                {c ? `Signing In…` : `Sign In`}
              </button>
            </div>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                gap: 12,
                margin: `22px 0`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(to right, transparent, #D4EDDA)`,
                }}
              />
              <span
                style={{
                  fontFamily: `'DM Sans', sans-serif`,
                  fontSize: 10,
                  color: `#9DC4B0`,
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
                  background: `linear-gradient(to left, transparent, #D4EDDA)`,
                }}
              />
            </div>
            <GoogleSignInButton
              redirectTo={f.state?.from || `/explore`}
              onError={s}
            />
          </div>
          <p
            style={{
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 13,
              color: `#74C69D`,
              textAlign: `center`,
              marginTop: 28,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: `#2D6A4F`,
                fontWeight: 700,
                textDecoration: `none`,
                transition: `color 0.2s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = `#40916C`)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `#2D6A4F`)}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
var COUNTRIES_ISO_URL = `https://countriesnow.space/api/v0.1/countries/iso`,
  STATES_URL = `https://countriesnow.space/api/v0.1/countries/states/q`,
  An = null;
function jn(e) {
  try {
    let t = sessionStorage.getItem(e);
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function Mn(e, t) {
  try {
    sessionStorage.setItem(e, JSON.stringify(t));
  } catch {}
}
function Nn(e) {
  return !e || e.length !== 2
    ? ``
    : String.fromCodePoint(
        ...[...e.toUpperCase()].map((e) => 127462 + (e.charCodeAt(0) - 65)),
      );
}
function Pn() {
  if (An) return An;
  let e = jn(`nikha2_countries_v2`);
  return e
    ? ((An = Promise.resolve(e)), An)
    : ((An = fetch(COUNTRIES_ISO_URL)
        .then((e) => {
          if (!e.ok) throw Error(`Failed to load country list.`);
          return e.json();
        })
        .then((e) => {
          if (e?.error || !Array.isArray(e?.data))
            throw Error(`Unexpected country list response.`);
          let t = e.data
            .map((e) => ({ name: e.name, code: e.Iso2, flag: Nn(e.Iso2) }))
            .filter((e) => e.name && e.code)
            .sort((e, t) => e.name.localeCompare(t.name));
          return (Mn(`nikha2_countries_v2`, t), t);
        })
        .catch((e) => {
          throw ((An = null), e);
        })),
      An);
}
async function Fn(e) {
  if (!e) return [];
  let t = `nikha2_states_v2_${e}`,
    n = jn(t);
  if (n) return n;
  try {
    let n = await fetch(`${STATES_URL}?country=${encodeURIComponent(e)}`);
    if (!n.ok) return [];
    let r = await n.json();
    if (r?.error) return [];
    let i = (r?.data?.states || [])
      .map((e) => e.name)
      .sort((e, t) => e.localeCompare(t));
    return (Mn(t, i), i);
  } catch {
    return [];
  }
}
var In = {
  width: `100%`,
  padding: `11px 14px`,
  borderRadius: 12,
  border: `1.5px solid #D4EDDA`,
  background: `#F8FAF5`,
  color: `#1B3A4B`,
  fontSize: 13.5,
  fontFamily: `'DM Sans', sans-serif`,
  outline: `none`,
};
function SearchableSelect({
  value: e,
  onChange: t,
  options: n,
  placeholder: r,
  loading: i,
  disabled: a,
  inputStyle: o,
  emptyLabel: s,
}) {
  let [c, l] = (0, React.useState)(!1),
    [u, d] = (0, React.useState)(``),
    f = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    function e(e) {
      f.current && !f.current.contains(e.target) && l(!1);
    }
    return (
      document.addEventListener(`mousedown`, e),
      () => document.removeEventListener(`mousedown`, e)
    );
  }, []);
  let p = n.filter((e) => e.toLowerCase().includes(u.trim().toLowerCase()));
  return (
    <div style={{ position: `relative` }} ref={f}>
      <button
        type="button"
        disabled={a}
        onClick={() => {
          a || (l((e) => !e), d(``));
        }}
        style={{
          ...o,
          textAlign: `left`,
          cursor: a ? `not-allowed` : `pointer`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          gap: 10,
          color: e ? `#1B3A4B` : `#74C69D`,
          opacity: a ? 0.6 : 1,
        }}
      >
        <span>{i ? `Loading…` : e || r}</span>
        <span
          style={{
            fontSize: 10,
            color: `#40916C`,
            transform: c ? `rotate(180deg)` : `rotate(0deg)`,
            transition: `transform 0.2s`,
            flexShrink: 0,
          }}
        >
          ▼
        </span>
      </button>
      {c && !a && (
        <div
          style={{
            position: `absolute`,
            top: `110%`,
            left: 0,
            right: 0,
            zIndex: 60,
            background: `#fff`,
            borderRadius: 14,
            border: `1.5px solid #D4EDDA`,
            boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
            overflow: `hidden`,
          }}
        >
          <div style={{ padding: 8, borderBottom: `1px solid #E8F5EE` }}>
            <input
              type="text"
              autoFocus={!0}
              placeholder="Search..."
              value={u}
              onChange={(e) => d(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ ...o, padding: `7px 10px`, fontSize: 12.5 }}
            />
          </div>
          <div
            style={{ maxHeight: 220, overflowY: `auto`, padding: `6px 8px` }}
          >
            {p.length === 0 && (
              <div
                style={{
                  padding: `10px 8px`,
                  fontSize: 12.5,
                  color: `#74C69D`,
                }}
              >
                {s || `No matches`}
              </div>
            )}
            {p.map((n) => {
              let r = e === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    (t(n), l(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    padding: `7px 10px`,
                    border: `none`,
                    background: r ? `#F0FAF4` : `transparent`,
                    color: r ? `#2D6A4F` : `#1B3A4B`,
                    fontWeight: r ? 700 : 400,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12.5,
                    cursor: `pointer`,
                    borderRadius: 8,
                    transition: `background 0.15s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `#F0FAF4`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = r
                      ? `#F0FAF4`
                      : `transparent`)
                  }
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
function CountryStateSelect({
  country: e,
  state: t,
  onCountryChange: n,
  onStateChange: r,
  inputStyle: i = In,
  countryLabel: a = `Country`,
  stateLabel: o = `Location (State/Region)`,
  labelStyle: s,
  required: c = !1,
}) {
  let [l, u] = (0, React.useState)([]),
    [d, f] = (0, React.useState)(!0),
    [p, m] = (0, React.useState)([]),
    [h, g] = (0, React.useState)(!1),
    [_, y] = (0, React.useState)(!1);
  (0, React.useEffect)(() => {
    let e = !1;
    return (
      Pn()
        .then((t) => {
          e || u(t);
        })
        .catch(() => {
          e || u([]);
        })
        .finally(() => {
          e || f(!1);
        }),
      () => {
        e = !0;
      }
    );
  }, []);
  let b = (0, React.useCallback)((e) => {
    if (!e) {
      (m([]), y(!1));
      return;
    }
    (g(!0),
      y(!1),
      Fn(e)
        .then((e) => {
          (m(e), y(e.length === 0));
        })
        .finally(() => g(!1)));
  }, []);
  (0, React.useEffect)(() => {
    b(e);
  }, [e]);
  let x = (e) => {
      (n(e), r(``));
    },
    S = l.map((e) => e.name);
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {s && <label style={s}>{a}</label>}
        <SearchableSelect
          value={e}
          onChange={x}
          options={S}
          placeholder={`Select ${c ? `your ` : ``}country`}
          loading={d}
          inputStyle={i}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        {s && <label style={s}>{o}</label>}
        {_ && e ? (
          <input
            type="text"
            value={t}
            onChange={(e) => r(e.target.value)}
            placeholder="Enter state/region"
            style={i}
          />
        ) : (
          <SearchableSelect
            value={t}
            onChange={r}
            options={p}
            placeholder={e ? `Select state/region` : `Select a country first`}
            loading={h}
            disabled={!e}
            inputStyle={i}
            emptyLabel={h ? `Loading…` : `No states/regions found`}
          />
        )}
      </div>
    </>
  );
}
var zn = {
  width: `100%`,
  padding: `11px 14px`,
  borderRadius: 12,
  border: `1.5px solid #D4EDDA`,
  background: `#F8FAF5`,
  color: `#1B3A4B`,
  fontSize: 13.5,
  fontFamily: `'DM Sans', sans-serif`,
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
              color: `#3D6B55`,
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
            background: `#F0FAF4`,
            border: `1.5px solid #D4EDDA`,
            borderRadius: 20,
            padding: `8px 16px`,
            fontFamily: `monospace`,
            fontSize: 13,
            color: `#2D6A4F`,
            fontWeight: 700,
          }}
        >
          @{e}
        </div>
        <p style={{ fontSize: 11, color: `#9DC4B0`, marginTop: 6 }}>
          This is permanent and can't be changed.
        </p>
      </div>
    );
  let f =
    s === `taken` || s === `invalid`
      ? `#C0392B`
      : s === `available`
        ? `#2D6A4F`
        : null;
  return (
    <div>
      {i && (
        <label
          style={{
            display: `block`,
            fontSize: 10.5,
            fontWeight: 700,
            color: `#3D6B55`,
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
        <p style={{ fontSize: 11.5, color: `#9DC4B0`, marginTop: 5 }}>
          Checking availability…
        </p>
      )}
      {s === `available` && (
        <p
          style={{
            fontSize: 11.5,
            color: `#2D6A4F`,
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
            color: `#C0392B`,
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
            color: `#C0392B`,
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
        <p style={{ fontSize: 11, color: `#9DC4B0`, marginTop: 5 }}>{a}</p>
      )}
    </div>
  );
}
var Vn = {
    width: `100%`,
    fontSize: 12,
    padding: `9px 12px`,
    borderRadius: 14,
    background: `rgba(255,255,255,0.65)`,
    border: `1.5px solid #D4EDDA`,
    color: `#1B3A4B`,
    fontFamily: `'DM Sans', sans-serif`,
    outline: `none`,
  },
  Hn = {
    display: `block`,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 9.5,
    fontWeight: 700,
    color: `#3D6B55`,
    letterSpacing: `0.1em`,
    textTransform: `uppercase`,
    marginBottom: 5,
  },
  Un = [
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
    <button
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
        color: `#74C69D`,
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
            "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .signup-input {\n          width: 100%;\n          padding: 11px 16px;\n          border-radius: 14px;\n          background: rgba(255,255,255,0.65);\n          border: 1.5px solid #D4EDDA;\n          color: #1B3A4B;\n          font-size: 13px;\n          font-family: 'DM Sans', sans-serif;\n          outline: none;\n          transition: border-color 0.2s, box-shadow 0.2s;\n          appearance: none;\n        }\n        .signup-input::placeholder { color: #9DC4B0; }\n        .signup-input:focus {\n          border-color: #40916C;\n          box-shadow: 0 0 0 3px rgba(64,145,108,0.12);\n        }\n\n        .signup-label {\n          display: block;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 10px;\n          font-weight: 700;\n          color: #3D6B55;\n          letter-spacing: 0.1em;\n          text-transform: uppercase;\n          margin-bottom: 5px;\n        }\n\n        .btn-submit {\n          width: 100%;\n          padding: 13px 0;\n          border-radius: 32px;\n          border: none;\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px rgba(27,58,75,0.3);\n          transition: all 0.22s;\n        }\n        .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(27,58,75,0.4); }\n        .btn-submit:active { transform: scale(0.98); }\n        .btn-submit:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }\n\n        .btn-back {\n          flex: 1;\n          padding: 13px 0;\n          border-radius: 32px;\n          border: 2px solid #40916C;\n          background: transparent;\n          color: #2D6A4F;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          transition: all 0.22s;\n        }\n        .btn-back:hover { background: rgba(64,145,108,0.08); }\n\n        /* Step indicator dot */\n        .step-dot {\n          width: 38px; height: 38px; border-radius: 50%;\n          display: flex; align-items: center; justify-content: center;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 14px; font-weight: 700;\n          transition: all 0.3s;\n        }\n        .step-dot.active {\n          background: linear-gradient(135deg, #1B3A4B, #2D6A4F);\n          color: #fff;\n          box-shadow: 0 4px 14px rgba(27,58,75,0.35);\n        }\n        .step-dot.inactive {\n          background: #D4EDDA;\n          color: #74C69D;\n        }\n\n        /* Modal scrollbar */\n        .terms-scroll::-webkit-scrollbar { width: 4px; }\n        .terms-scroll::-webkit-scrollbar-track { background: #F8FAF5; }\n        .terms-scroll::-webkit-scrollbar-thumb { background: #74C69D; border-radius: 4px; }\n\n        @media (max-width: 1024px) {\n          .left-panel { display: none !important; }\n          .right-panel { width: 100% !important; }\n        }\n      "
          }
        </style>
        <div
          className="left-panel"
          style={{
            width: `50%`,
            position: `relative`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            overflow: `hidden`,
            background: `linear-gradient(135deg, #1B3A4B 0%, #0d2418 100%)`,
            flexDirection: `column`,
            padding: `40px`,
          }}
        >
          <img
            src="/src/assets/hero.png"
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
              background: `linear-gradient(135deg, rgba(45,106,79,0.5) 0%, transparent 50%, rgba(27,58,75,0.4) 100%)`,
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
                  className="green-text"
                  style={{
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: 48,
                    fontWeight: 700,
                    letterSpacing: `-0.02em`,
                  }}
                >
                  Nikha2
                </span>
                <span
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12,
                    padding: `4px 12px`,
                    borderRadius: 20,
                    color: `#40916C`,
                    border: `1.5px solid #74C69D`,
                  }}
                >
                  ™
                </span>
              </Link>
            </div>
            <h2
              style={{
                fontFamily: `'Playfair Display', serif`,
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
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 14,
                color: `#B7E4C7`,
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
                fontFamily: `'DM Sans', sans-serif`,
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
            background: `#F8FAF5`,
            overflowY: `auto`,
          }}
        >
          <div style={{ width: `100%`, maxWidth: 380, padding: `24px 0` }}>
            <div
              style={{
                background: `rgba(255,255,255,0.75)`,
                backdropFilter: `blur(20px)`,
                border: `1px solid rgba(64,145,108,0.18)`,
                borderRadius: 24,
                padding: `24px 22px 28px`,
                boxShadow: `0 12px 48px rgba(27,58,75,0.1)`,
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
                        ? `linear-gradient(90deg, #1B3A4B, #2D6A4F)`
                        : `#D4EDDA`,
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
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: 18,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                  }}
                >
                  {e === 1 ? `Create Your Account` : `Complete Your Profile`}
                </h2>
                <p
                  style={{
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 11,
                    color: `#74C69D`,
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
                        className="signup-input"
                        style={{
                          width: 100,
                          fontSize: 12,
                          padding: `9px 10px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: `#1B3A4B`,
                        }}
                      >
                        <span>
                          {Un.find((e) => e.code === O)?.flag} {O}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `#74C69D`,
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
                            background: `#fff`,
                            borderRadius: 14,
                            border: `1.5px solid #D4EDDA`,
                            boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
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
                              <button
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
                                    O === e ? `#F0FAF4` : `transparent`,
                                  color: O === e ? `#2D6A4F` : `#1B3A4B`,
                                  fontWeight: O === e ? 700 : 400,
                                  fontFamily: `'DM Sans', sans-serif`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `#F0FAF4`)
                                }
                                onMouseLeave={(t) =>
                                  (t.currentTarget.style.background =
                                    O === e ? `#F0FAF4` : `transparent`)
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
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 12,
                        color: `#C0392B`,
                        background: `rgba(192,57,43,0.08)`,
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
                    className="btn-submit"
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
                        background: `linear-gradient(to right, transparent, #D4EDDA)`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 10,
                        color: `#9DC4B0`,
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
                        background: `linear-gradient(to left, transparent, #D4EDDA)`,
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
                        className="signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: m ? `#1B3A4B` : `#9DC4B0`,
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
                            color: `#74C69D`,
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
                            background: `#fff`,
                            borderRadius: 14,
                            border: `1.5px solid #D4EDDA`,
                            boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
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
                              <button
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
                                    m === e ? `#F0FAF4` : `transparent`,
                                  color: m === e ? `#2D6A4F` : `#1B3A4B`,
                                  fontWeight: m === e ? 700 : 400,
                                  fontFamily: `'DM Sans', sans-serif`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `#F0FAF4`)
                                }
                                onMouseLeave={(t) =>
                                  (t.currentTarget.style.background =
                                    m === e ? `#F0FAF4` : `transparent`)
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
                        className="signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: T ? `#1B3A4B` : `#9DC4B0`,
                        }}
                      >
                        <span>{T || `Select religion`}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `#74C69D`,
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
                            background: `#fff`,
                            borderRadius: 14,
                            border: `1.5px solid #D4EDDA`,
                            boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
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
                              <button
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
                                    T === t ? `#F0FAF4` : `transparent`,
                                  color: T === t ? `#2D6A4F` : `#1B3A4B`,
                                  fontWeight: T === t ? 700 : 400,
                                  fontFamily: `'DM Sans', sans-serif`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `#F0FAF4`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.background =
                                    T === t ? `#F0FAF4` : `transparent`)
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
                        className="signup-input"
                        style={{
                          fontSize: 12,
                          padding: `9px 12px`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `space-between`,
                          cursor: `pointer`,
                          textAlign: `left`,
                          color: ne ? `#1B3A4B` : `#9DC4B0`,
                        }}
                      >
                        <span>{ne || `Select age range`}</span>
                        <span
                          style={{
                            fontSize: 10,
                            color: `#74C69D`,
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
                            background: `#fff`,
                            borderRadius: 14,
                            border: `1.5px solid #D4EDDA`,
                            boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
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
                              <button
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
                                    ne === t ? `#F0FAF4` : `transparent`,
                                  color: ne === t ? `#2D6A4F` : `#1B3A4B`,
                                  fontWeight: ne === t ? 700 : 400,
                                  fontFamily: `'DM Sans', sans-serif`,
                                  fontSize: 12.5,
                                  cursor: `pointer`,
                                  borderRadius: 8,
                                  transition: `background 0.15s`,
                                  display: `flex`,
                                  alignItems: `center`,
                                  gap: 8,
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.background = `#F0FAF4`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.background =
                                    ne === t ? `#F0FAF4` : `transparent`)
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
                      className="signup-input"
                      style={{
                        fontSize: 12,
                        padding: `9px 12px`,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `space-between`,
                        cursor: `pointer`,
                        textAlign: `left`,
                        color: A ? `#1B3A4B` : `#9DC4B0`,
                      }}
                    >
                      <span>{A || `Select your option`}</span>
                      <span
                        style={{
                          fontSize: 10,
                          color: `#74C69D`,
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
                          background: `#fff`,
                          borderRadius: 14,
                          border: `1.5px solid #D4EDDA`,
                          boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
                          overflow: `hidden`,
                        }}
                      >
                        <div style={{ padding: `6px 8px` }}>
                          {[
                            { icon: ``, name: `Yes` },
                            { icon: ``, name: `No` },
                            { icon: ``, name: `Prefer not to say` },
                          ].map(({ icon: e, name: t }) => (
                            <button
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
                                background: A === t ? `#F0FAF4` : `transparent`,
                                color: A === t ? `#2D6A4F` : `#1B3A4B`,
                                fontWeight: A === t ? 700 : 400,
                                fontFamily: `'DM Sans', sans-serif`,
                                fontSize: 12.5,
                                cursor: `pointer`,
                                borderRadius: 8,
                                transition: `background 0.15s`,
                                display: `flex`,
                                alignItems: `center`,
                                gap: 8,
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = `#F0FAF4`)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  A === t ? `#F0FAF4` : `transparent`)
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
                        accentColor: `#40916C`,
                        cursor: `pointer`,
                        flexShrink: 0,
                      }}
                    />
                    <label
                      htmlFor="terms"
                      style={{
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 11,
                        color: `#3D6B55`,
                        lineHeight: 1.4,
                      }}
                    >
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => ae(!0)}
                        style={{
                          background: `none`,
                          border: `none`,
                          color: `#40916C`,
                          cursor: `pointer`,
                          fontFamily: `'DM Sans', sans-serif`,
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
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 12,
                        color: `#C0392B`,
                        background: `rgba(192,57,43,0.08)`,
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
                      className="btn-back"
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
                      className="btn-submit"
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
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 13,
                color: `#74C69D`,
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
                      color: `#2D6A4F`,
                      fontWeight: 700,
                      textDecoration: `none`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = `#40916C`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = `#2D6A4F`)
                    }
                  >
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  By creating an account, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => ae(!0)}
                    style={{
                      background: `none`,
                      border: `none`,
                      color: `#2D6A4F`,
                      fontWeight: 700,
                      cursor: `pointer`,
                      fontFamily: `'DM Sans', sans-serif`,
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
              background: `rgba(27,58,75,0.55)`,
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
                background: `#fff`,
                borderRadius: 24,
                maxWidth: 620,
                width: `100%`,
                maxHeight: `82vh`,
                overflowY: `auto`,
                padding: `36px 32px`,
                boxShadow: `0 24px 80px rgba(27,58,75,0.25)`,
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
                    fontFamily: `'Playfair Display', serif`,
                    fontSize: 22,
                    fontWeight: 700,
                    color: `#1B3A4B`,
                  }}
                >
                  Terms and Conditions
                </h2>
                <button
                  onClick={() => ae(!1)}
                  style={{
                    background: `#F0FAF4`,
                    border: `none`,
                    width: 34,
                    height: 34,
                    borderRadius: `50%`,
                    cursor: `pointer`,
                    fontSize: 14,
                    color: `#2D6A4F`,
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
                {[
                  [
                    `1. Acceptance of Terms`,
                    `By creating an account and using Nikha2's platform, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.`,
                  ],
                  [
                    `2. User Eligibility`,
                    `You must be at least 18 years old to use Nikha2. You represent and warrant that all information provided is accurate, current, and complete.`,
                  ],
                  [
                    `3. User Conduct`,
                    `You agree not to use Nikha2 for any unlawful purposes, harassment, or harmful activities. You will respect the privacy and dignity of other users.`,
                  ],
                  [
                    `4. Privacy and Data Protection`,
                    `Your personal information will be protected in accordance with our Privacy Policy. We implement industry-standard security measures to safeguard your data. You have control over what information you share and who can see your profile.`,
                  ],
                  [
                    `5. Profile Information`,
                    `You are responsible for maintaining the confidentiality of your account credentials. Any profile information must be truthful and not misleading. We reserve the right to remove profiles that violate these terms.`,
                  ],
                  [
                    `6. Communication`,
                    `Nikha2 facilitates communication between users. We are not responsible for the content of user-generated messages. Users are responsible for their interactions and any outcomes arising from them.`,
                  ],
                  [
                    `7. Membership and Payments`,
                    `Membership features and pricing may vary. Payments are processed securely. Refund policies are subject to the terms specified at the time of purchase.`,
                  ],
                  [
                    `8. Disclaimer of Warranties`,
                    `Nikha2 is provided on an "as-is" basis. We make no warranties regarding the accuracy of user profiles or the compatibility between users.`,
                  ],
                  [
                    `9. Limitation of Liability`,
                    `To the fullest extent permitted by law, Nikha2 shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.`,
                  ],
                  [
                    `10. Modification of Terms`,
                    `We reserve the right to modify these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of updated terms.`,
                  ],
                  [
                    `11. Termination`,
                    `We reserve the right to terminate or suspend your account if you violate these terms or engage in harmful behavior.`,
                  ],
                  [
                    `12. Governing Law`,
                    `These Terms and Conditions are governed by the laws of India. Any disputes shall be resolved in accordance with Indian law.`,
                  ],
                ].map(([e, t]) => (
                  <div key={e}>
                    <h3
                      style={{
                        fontFamily: `'Playfair Display', serif`,
                        fontSize: 14,
                        fontWeight: 700,
                        color: `#1B3A4B`,
                        marginBottom: 6,
                      }}
                    >
                      {e}
                    </h3>
                    <p
                      style={{
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 13,
                        color: `#3D6B55`,
                        lineHeight: 1.65,
                      }}
                    >
                      {t}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ display: `flex`, gap: 12, marginTop: 28 }}>
                <button
                  onClick={() => ae(!1)}
                  style={{
                    flex: 1,
                    padding: `13px 0`,
                    borderRadius: 32,
                    border: `2px solid #40916C`,
                    background: `transparent`,
                    color: `#2D6A4F`,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: `pointer`,
                    transition: `all 0.2s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `rgba(64,145,108,0.07)`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = `transparent`)
                  }
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    (j(!0), ae(!1));
                  }}
                  style={{
                    flex: 1,
                    padding: `13px 0`,
                    borderRadius: 32,
                    border: `none`,
                    background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                    color: `#fff`,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: `pointer`,
                    boxShadow: `0 6px 20px rgba(27,58,75,0.3)`,
                    transition: `all 0.2s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = `translateY(-2px)`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = `none`)
                  }
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
var Kn = [
  { value: `harassment`, label: `Harassment or abuse` },
  { value: `fake_profile`, label: `Fake profile` },
  { value: `inappropriate_content`, label: `Inappropriate content` },
  { value: `spam`, label: `Spam` },
  { value: `safety_concern`, label: `Safety concern` },
  { value: `other`, label: `Other` },
];
function ReportBlockModal({ target: e, onClose: t, onBlocked: n }) {
  let [r, i] = (0, React.useState)(`menu`),
    [a, o] = (0, React.useState)(``),
    [s, c] = (0, React.useState)(``),
    [l, u] = (0, React.useState)(!1),
    [d, f] = (0, React.useState)(``);
  return (
    <div
      onClick={t}
      style={{
        position: `fixed`,
        inset: 0,
        background: `rgba(27,58,75,0.5)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        zIndex: 200,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `#fff`,
          borderRadius: 20,
          maxWidth: 380,
          width: `100%`,
          padding: 24,
          fontFamily: `'DM Sans', sans-serif`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.25)`,
        }}
      >
        {r === `menu` && (
          <>
            <h3
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: 18,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 4,
              }}
            >
              {e.name || `This user`}
            </h3>
            <p style={{ fontSize: 12.5, color: `#74C69D`, marginBottom: 18 }}>
              Choose an action
            </p>
            {d && (
              <p style={{ fontSize: 12, color: `#C0392B`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
              {e.type === `user` && (
                <button
                  onClick={async () => {
                    if (e.type === `user`) {
                      (u(!0), f(``));
                      try {
                        (await api.post(`/users/${e.id}/block`, {}), n?.());
                      } catch (e) {
                        f(e.message || `Could not block this user.`);
                      } finally {
                        u(!1);
                      }
                    }
                  }}
                  disabled={l}
                  style={{
                    padding: `11px 0`,
                    borderRadius: 24,
                    border: `1.5px solid #C0392B`,
                    background: `transparent`,
                    color: `#C0392B`,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: `pointer`,
                  }}
                >
                  {"🚫 Block "}
                  {l ? `…` : ``}
                </button>
              )}
              <button
                onClick={() => i(`report`)}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid #40916C`,
                  background: `transparent`,
                  color: `#2D6A4F`,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                🚩 Report
              </button>
              <button
                onClick={t}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `none`,
                  background: `#F0FAF4`,
                  color: `#3D6B55`,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {r === `report` && (
          <>
            <h3
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: 18,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 4,
              }}
            >
              {"Report "}
              {e.name || `this`}
            </h3>
            <p style={{ fontSize: 12.5, color: `#74C69D`, marginBottom: 16 }}>
              Our team reviews every report — nothing is ignored.
            </p>
            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                gap: 8,
                marginBottom: 12,
              }}
            >
              {Kn.map((e) => (
                <label
                  key={e.value}
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 8,
                    fontSize: 13,
                    color: `#1B3A4B`,
                    cursor: `pointer`,
                  }}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={e.value}
                    checked={a === e.value}
                    onChange={() => o(e.value)}
                  />
                  {e.label}
                </label>
              ))}
            </div>
            <textarea
              value={s}
              onChange={(e) => c(e.target.value)}
              placeholder="Additional details (optional)"
              rows={3}
              style={{
                width: `100%`,
                borderRadius: 12,
                border: `1.5px solid #D4EDDA`,
                padding: 10,
                fontSize: 12.5,
                fontFamily: `'DM Sans', sans-serif`,
                resize: `vertical`,
                marginBottom: 12,
              }}
            />
            {d && (
              <p style={{ fontSize: 12, color: `#C0392B`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, gap: 10 }}>
              <button
                onClick={() => i(`menu`)}
                style={{
                  flex: 1,
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid #D4EDDA`,
                  background: `transparent`,
                  color: `#3D6B55`,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                Back
              </button>
              <button
                onClick={async () => {
                  if (!a) {
                    f(`Please choose a reason.`);
                    return;
                  }
                  (u(!0), f(``));
                  try {
                    (await api.post(`/reports`, {
                      targetType: e.type,
                      targetId: e.id,
                      reason: a,
                      details: s || void 0,
                    }),
                      i(`done`));
                  } catch (e) {
                    f(e.message || `Could not submit this report.`);
                  } finally {
                    u(!1);
                  }
                }}
                disabled={l}
                style={{
                  flex: 1,
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `none`,
                  background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                  color: `#fff`,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                {l ? `Submitting…` : `Submit Report`}
              </button>
            </div>
          </>
        )}
        {r === `done` && (
          <div style={{ textAlign: `center`, padding: `12px 0` }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <h3
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: 17,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 6,
              }}
            >
              Report submitted
            </h3>
            <p style={{ fontSize: 12.5, color: `#3D6B55`, marginBottom: 18 }}>
              Thank you — our team will review this.
            </p>
            <button
              onClick={t}
              className="btn-primary"
              style={{ padding: `10px 0` }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
var Jn = {
  premium: {
    icon: `👑`,
    label: `Premium`,
    color: `#9A6B00`,
    bg: `rgba(212,160,23,0.15)`,
  },
  basic: {
    icon: `⭐`,
    label: `Basic`,
    color: `#2D6A4F`,
    bg: `rgba(45,106,79,0.12)`,
  },
};
function PlanBadge({ plan: e, size: t = `sm` }) {
  let n = Jn[e];
  return n ? (
    <span
      title={`${n.label} member`}
      style={{
        display: `inline-flex`,
        alignItems: `center`,
        gap: 3,
        fontFamily: `'DM Sans', sans-serif`,
        fontSize: t === `sm` ? 10.5 : 12,
        fontWeight: 700,
        color: n.color,
        background: n.bg,
        borderRadius: 20,
        padding: t === `sm` ? `2px 7px` : `3px 10px`,
        letterSpacing: `0.02em`,
        whiteSpace: `nowrap`,
        verticalAlign: `middle`,
      }}
    >
      {n.icon} {n.label}
    </span>
  ) : null;
}
var Xn = { woman: `👩`, man: `🧔`, other: `🧑` };
function ProfileModal({ personId: e, onClose: t }) {
  let { isAuthenticated: n } = useAuth(),
    r = useNavigate(),
    [i, a] = (0, React.useState)(null),
    [o, s] = (0, React.useState)(!0),
    [c, l] = (0, React.useState)(``),
    [u, d] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let t = !1;
      return (
        s(!0),
        l(``),
        api
          .get(`/people/${e}`)
          .then((e) => {
            t || a(e);
          })
          .catch((e) => {
            t || l(e.message || `Could not load this profile.`);
          })
          .finally(() => {
            t || s(!1);
          }),
        () => {
          t = !0;
        }
      );
    }, [e]),
    (
      <div
        onClick={t}
        style={{
          position: `fixed`,
          inset: 0,
          zIndex: 250,
          background: `rgba(27,58,75,0.5)`,
          backdropFilter: `blur(8px)`,
          WebkitBackdropFilter: `blur(8px)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          padding: 16,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `#fff`,
            borderRadius: 24,
            maxWidth: 420,
            width: `100%`,
            maxHeight: `88vh`,
            overflowY: `auto`,
            position: `relative`,
            boxShadow: `0 28px 72px rgba(27,58,75,0.32)`,
            fontFamily: `'DM Sans', sans-serif`,
          }}
        >
          <button
            onClick={t}
            aria-label="Close"
            style={{
              position: `absolute`,
              top: 14,
              right: 14,
              zIndex: 2,
              background: `rgba(27,58,75,0.35)`,
              border: `none`,
              borderRadius: `50%`,
              width: 30,
              height: 30,
              cursor: `pointer`,
              color: `#fff`,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {o ? (
            <div
              style={{
                padding: `60px 24px`,
                textAlign: `center`,
                color: `#74C69D`,
                fontSize: 13.5,
              }}
            >
              Loading profile…
            </div>
          ) : c || !i ? (
            <div
              style={{
                padding: `60px 24px`,
                textAlign: `center`,
                color: `#C0392B`,
                fontSize: 13.5,
              }}
            >
              {c || `Profile not found.`}
            </div>
          ) : (
            <>
              <div
                style={{
                  background: `linear-gradient(160deg, #D4EDDA 0%, #B7E4C7 100%)`,
                  padding: `40px 24px 20px`,
                  display: `flex`,
                  flexDirection: `column`,
                  alignItems: `center`,
                  gap: 8,
                }}
              >
                {i.avatarUrl ? (
                  <img
                    src={i.avatarUrl}
                    alt={i.displayName}
                    style={{
                      width: 92,
                      height: 92,
                      borderRadius: `50%`,
                      objectFit: `cover`,
                      border: `3px solid #fff`,
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 72, lineHeight: 1 }}>
                    {Xn[i.gender] || `🙂`}
                  </div>
                )}
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: `'Playfair Display', serif`,
                      fontWeight: 700,
                      fontSize: 20,
                      color: `#1B3A4B`,
                    }}
                  >
                    {i.displayName}{" "}
                    {i.verified && <span title="Verified">✅</span>}
                  </span>
                  <PlanBadge plan={i.plan} size="md" />
                </div>
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 5,
                  }}
                >
                  <span
                    className="status-dot-modal"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: `50%`,
                      background:
                        i.onlineStatus === `online` ? `#22C55E` : `#B7E4C7`,
                      display: `inline-block`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color:
                        i.onlineStatus === `online` ? `#22C55E` : `#3D6B55`,
                      fontWeight: 600,
                    }}
                  >
                    {i.onlineStatus === `online` ? `Online now` : `Offline`}
                  </span>
                </div>
              </div>
              <div style={{ padding: `20px 24px 24px` }}>
                {i.bio && (
                  <p
                    style={{
                      fontSize: 13,
                      color: `#3D6B55`,
                      lineHeight: 1.6,
                      marginBottom: 16,
                      fontStyle: `italic`,
                    }}
                  >
                    “{i.bio}”
                  </p>
                )}
                <div
                  style={{
                    background: `#F0FAF4`,
                    border: `1px solid #D4EDDA`,
                    borderRadius: 14,
                    padding: `12px 14px`,
                    marginBottom: 16,
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 7,
                  }}
                >
                  {[
                    [`Age`, i.age ? `${i.age} yrs` : null],
                    [`Religion`, i.religion],
                    [`Country`, i.nationality],
                    [`Location`, i.location || i.city],
                    [`Has Kids`, i.hasKids],
                  ]
                    .filter(([, e]) => e)
                    .map(([e, t]) => (
                      <div
                        key={e}
                        style={{
                          fontSize: 12.5,
                          display: `flex`,
                          justifyContent: `space-between`,
                        }}
                      >
                        <span
                          style={{
                            color: `#3D6B55`,
                            fontWeight: 600,
                          }}
                        >
                          {e}
                        </span>
                        <span
                          style={{
                            color: `#2D6A4F`,
                            fontWeight: 500,
                          }}
                        >
                          {t}
                        </span>
                      </div>
                    ))}
                </div>
                {i.hobbies?.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: `#2D6A4F`,
                        letterSpacing: `0.06em`,
                        textTransform: `uppercase`,
                        marginBottom: 6,
                      }}
                    >
                      Hobbies & Interests
                    </div>
                    <div
                      style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        gap: 6,
                      }}
                    >
                      {i.hobbies.map((e) => (
                        <span
                          key={e}
                          style={{
                            fontSize: 11.5,
                            background: `#F0FAF4`,
                            border: `1px solid #D4EDDA`,
                            color: `#2D6A4F`,
                            borderRadius: 20,
                            padding: `4px 10px`,
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    borderTop: `1px dashed #D4EDDA`,
                    paddingTop: 14,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: `#2D6A4F`,
                      letterSpacing: `0.06em`,
                      textTransform: `uppercase`,
                      marginBottom: 8,
                    }}
                  >
                    Contact Details
                  </div>
                  {i.contact?.username && (
                    <div
                      style={{
                        fontSize: 12.5,
                        display: `flex`,
                        justifyContent: `space-between`,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          color: `#3D6B55`,
                          fontWeight: 600,
                        }}
                      >
                        Username
                      </span>
                      <span
                        style={{
                          color: `#2D6A4F`,
                          fontWeight: 500,
                          fontFamily: `monospace`,
                          fontSize: 11,
                        }}
                      >
                        @{i.contact.username}
                      </span>
                    </div>
                  )}
                  {i.contact?.isPrivate ? (
                    <div
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 8,
                        background: `#FDF6EC`,
                        border: `1px solid #F0E0BE`,
                        borderRadius: 10,
                        padding: `9px 12px`,
                        color: `#9A6B00`,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      🔒 Private Account
                    </div>
                  ) : (
                    <>
                      {i.contact?.phoneNumber && (
                        <div
                          style={{
                            fontSize: 12.5,
                            display: `flex`,
                            justifyContent: `space-between`,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              color: `#3D6B55`,
                              fontWeight: 600,
                            }}
                          >
                            Phone
                          </span>
                          <span
                            style={{
                              color: `#2D6A4F`,
                              fontWeight: 500,
                            }}
                          >
                            {i.contact.phoneNumber}
                          </span>
                        </div>
                      )}
                      {i.contact?.email && (
                        <div
                          style={{
                            fontSize: 12.5,
                            display: `flex`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <span
                            style={{
                              color: `#3D6B55`,
                              fontWeight: 600,
                            }}
                          >
                            Email
                          </span>
                          <span
                            style={{
                              color: `#2D6A4F`,
                              fontWeight: 500,
                            }}
                          >
                            {i.contact.email}
                          </span>
                        </div>
                      )}
                      {!i.contact?.phoneNumber &&
                        !i.contact?.email &&
                        !i.contact?.username && (
                          <div
                            style={{
                              fontSize: 12,
                              color: `#9DC4B0`,
                            }}
                          >
                            Not visible on your current plan.
                          </div>
                        )}
                    </>
                  )}
                </div>
                <button
                  onClick={async () => {
                    if (!n) {
                      (t(), r(`/login`, { state: { from: `/explore` } }));
                      return;
                    }
                    d(!0);
                    try {
                      let n = await api.post(`/messaging/conversations`, {
                        targetUserId: e,
                      });
                      (t(), r(`/messaging?conversation=${n.conversationId}`));
                    } catch (e) {
                      l(e.message || `Could not start this conversation.`);
                    } finally {
                      d(!1);
                    }
                  }}
                  disabled={u}
                  style={{
                    width: `100%`,
                    padding: `12px 0`,
                    borderRadius: 28,
                    border: `none`,
                    background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                    color: `#fff`,
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: u ? `not-allowed` : `pointer`,
                    letterSpacing: `0.03em`,
                  }}
                >
                  {u ? `Starting…` : `💬 Chat Now`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}
function UpgradeModal({
  title: e = `Upgrade to unlock this`,
  message: t,
  onClose: n,
}) {
  return (
    <div
      onClick={n}
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 300,
        background: `rgba(27,58,75,0.45)`,
        backdropFilter: `blur(6px)`,
        WebkitBackdropFilter: `blur(6px)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `#fff`,
          borderRadius: 22,
          maxWidth: 380,
          width: `100%`,
          padding: `32px 28px 28px`,
          position: `relative`,
          textAlign: `center`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.28)`,
          fontFamily: `'DM Sans', sans-serif`,
        }}
      >
        <button
          onClick={n}
          aria-label="Close"
          style={{
            position: `absolute`,
            top: 14,
            right: 14,
            background: `#F0FAF4`,
            border: `none`,
            borderRadius: `50%`,
            width: 30,
            height: 30,
            cursor: `pointer`,
            color: `#3D6B55`,
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
        <div style={{ fontSize: 42, marginBottom: 12 }}>👑</div>
        <h3
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 8,
          }}
        >
          {e}
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: `#3D6B55`,
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {t}
        </p>
        <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
          <Link
            to="/how-it-works?tab=membership"
            onClick={n}
            style={{
              display: `block`,
              padding: `12px 0`,
              borderRadius: 28,
              border: `none`,
              background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
              color: `#fff`,
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: `none`,
              letterSpacing: `0.03em`,
            }}
          >
            👑 View Plans & Upgrade
          </Link>
          <button
            onClick={n}
            style={{
              padding: `11px 0`,
              borderRadius: 28,
              border: `none`,
              background: `#F0FAF4`,
              color: `#3D6B55`,
              fontWeight: 600,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
var $n = { woman: `👩`, man: `🧔`, other: `🧑` };
function ExplorePage() {
  let [e, t] = useSearchParams(),
    { user: n, isAuthenticated: r, refreshUser: i } = useAuth(),
    [a, o] = (0, React.useState)(``),
    [s, c] = (0, React.useState)(``),
    [l, u] = (0, React.useState)(``),
    [d, f] = (0, React.useState)(``),
    [p, m] = (0, React.useState)(``),
    h = e.get(`gender`) || ``,
    [g, _] = (0, React.useState)([]),
    [y, b] = (0, React.useState)(!0),
    [x, S] = (0, React.useState)(``),
    [C, w] = (0, React.useState)(null),
    [T, E] = (0, React.useState)(null),
    [ee, D] = (0, React.useState)(null),
    [O, k] = (0, React.useState)(null),
    [A, te] = (0, React.useState)(null),
    [ne, re] = (0, React.useState)(!1),
    [ie, j] = (0, React.useState)(!1),
    [M, ae] = (0, React.useState)([]);
  (0, React.useEffect)(() => {
    let e = !1;
    return (
      Pn()
        .then((t) => {
          e || ae(t.map((e) => e.name));
        })
        .catch(() => {
          e || ae([]);
        }),
      () => {
        e = !0;
      }
    );
  }, []);
  let [oe, se] = (0, React.useState)(!1),
    [ce, N] = (0, React.useState)(!1),
    [P, F] = (0, React.useState)(!1),
    [le, ue] = (0, React.useState)(!1),
    [de, fe] = (0, React.useState)(``),
    [pe, me] = (0, React.useState)(``),
    he = (0, React.useRef)(null),
    ge = (0, React.useRef)(null),
    _e = (0, React.useRef)(null),
    ve = (0, React.useRef)(null),
    ye = (e, t) => e.toLowerCase().startsWith(t.trim().toLowerCase()),
    I = useNavigate();
  ((0, React.useEffect)(() => {
    function e(e) {
      (he.current && !he.current.contains(e.target) && se(!1),
        ge.current && !ge.current.contains(e.target) && N(!1),
        _e.current && !_e.current.contains(e.target) && F(!1),
        ve.current && !ve.current.contains(e.target) && ue(!1));
    }
    return (
      document.addEventListener(`mousedown`, e),
      () => document.removeEventListener(`mousedown`, e)
    );
  }, []),
    (0, React.useEffect)(() => {
      if (e.get(`checkout`) !== `success`) return;
      (i(),
        D({
          message: `Payment successful — your plan has been upgraded!`,
          tone: `success`,
        }));
      let n = new URLSearchParams(e);
      (n.delete(`checkout`), t(n, { replace: !0 }));
    }, []));
  let be = (n) => {
      ue(!1);
      let r = new URLSearchParams(e);
      (n ? r.set(`gender`, n) : r.delete(`gender`), t(r, { replace: !0 }));
    },
    xe = (0, React.useCallback)(async () => {
      (re(!1), b(!0), S(``));
      try {
        let e = new URLSearchParams();
        (a && e.set(`q`, a),
          s && e.set(`ageRange`, s),
          l && e.set(`religion`, l),
          d && e.set(`nationality`, d),
          p && e.set(`location`, p),
          h && e.set(`gender`, h),
          e.set(`online`, `true`),
          e.set(`verified`, `false`),
          e.set(`limit`, `50`),
          _((await api.get(`/people?${e.toString()}`)).items));
      } catch (e) {
        S(e.message || `Could not load profiles right now.`);
      } finally {
        b(!1);
      }
    }, [a, s, l, d, p, h]);
  (0, React.useEffect)(() => {
    let e = setTimeout(xe, 250);
    return () => clearTimeout(e);
  }, [xe]);
  let Se = g,
    Ce = async (e) => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      w(e.id);
      try {
        I(
          `/messaging?conversation=${(await api.post(`/messaging/conversations`, { targetUserId: e.id })).conversationId}`,
        );
      } catch (e) {
        e.code === `CHAT_LIMIT_REACHED`
          ? D({
              message: `You've reached your Free plan's conversation limit. Upgrade to Basic or Premium for unlimited conversations.`,
              tone: `error`,
            })
          : D({
              message: e.message || `Could not start this conversation.`,
              tone: `error`,
            });
      } finally {
        w(null);
      }
    },
    we = (e) => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      k(e.id);
    },
    Te = async () => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      if (n?.membership?.plan !== `premium`) {
        te(
          `AI-Based Match is a Premium feature — it finds people who share your preferences and hobbies.`,
        );
        return;
      }
      (j(!0), re(!0));
      try {
        _((await api.get(`/people/ai-match`)).items);
      } catch (e) {
        (D({
          message: e.message || `Could not run AI-Based Match right now.`,
          tone: `error`,
        }),
          re(!1));
      } finally {
        j(!1);
      }
    },
    Ee = () => {
      (re(!1), xe());
    },
    De = [
      `Muslim`,
      `Hindu`,
      `Sikh`,
      `Christian`,
      `Buddhist`,
      `Jain`,
      `Jewish`,
      `Other`,
    ];
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');\n        * { box-sizing: border-box; }\n\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .card-hover { transition: transform 0.22s, box-shadow 0.22s; cursor: pointer; }\n        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(45,106,79,0.16); }\n\n        .btn-primary {\n          background: linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%);\n          color: #fff; border: none;\n          padding: 12px 0; border-radius: 28px;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13.5px; font-weight: 700;\n          cursor: pointer; letter-spacing: 0.03em;\n          box-shadow: 0 4px 16px rgba(27,58,75,0.28);\n          transition: all 0.22s; width: 100%;\n        }\n        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }\n        .btn-primary:disabled { background: #ccc; box-shadow: none; cursor: not-allowed; transform: none; opacity: 1; }\n\n        .btn-outline {\n          background: transparent;\n          border: 1.5px solid #40916C;\n          color: #2D6A4F;\n          padding: 9px 0; border-radius: 28px;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13px; font-weight: 600;\n          cursor: pointer; width: 100%;\n          transition: all 0.2s; display: block; text-align: center;\n          text-decoration: none;\n        }\n        .btn-outline:hover { background: #1B3A4B; color: #fff; border-color: #1B3A4B; }\n\n        .filter-input {\n          background: #F8FAF5;\n          border: 1.5px solid #B7E4C7;\n          color: #1B3A4B;\n          border-radius: 12px;\n          padding: 10px 16px;\n          font-family: 'DM Sans', sans-serif;\n          font-size: 13px;\n          width: 100%;\n          outline: none;\n          transition: border-color 0.2s;\n          appearance: none;\n        }\n        .filter-input:focus { border-color: #40916C; background: #fff; }\n\n        .status-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n        .status-dot.online  { background: #22C55E; box-shadow: 0 0 8px rgba(34,197,94,0.6); }\n        .status-dot.offline { background: #B7E4C7; }\n\n        @keyframes pulse { 0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.7); } 50% { box-shadow: 0 0 16px rgba(34,197,94,0.3); } }\n        .pulse { animation: pulse 2s infinite; }\n\n        ::-webkit-scrollbar { width: 4px; }\n        ::-webkit-scrollbar-track { background: transparent; }\n        ::-webkit-scrollbar-thumb { background: #B7E4C7; border-radius: 4px; }\n        ::-webkit-scrollbar-thumb:hover { background: #74C69D; }\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: 40,
          paddingRight: 40,
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderBottom: `1px solid #D4EDDA`,
        }}
      >
        <div style={{ maxWidth: 1060, margin: `0 auto` }}>
          <div style={{ textAlign: `center`, marginBottom: 40 }}>
            <h1
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(28px, 4vw, 46px)`,
                fontWeight: 700,
                color: `#1B3A4B`,
                letterSpacing: `-0.025em`,
                marginBottom: 10,
              }}
            >
              {"Explore "}
              <span className="green-text">Verified People</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: `#3D6B55`,
                maxWidth: 520,
                margin: `0 auto`,
              }}
            >
              Browse verified profiles and discover people who align with your
              preferences, values, and relationship goals.
            </p>
            <p
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: `clamp(20px, 2.6vw, 28px)`,
                fontWeight: 700,
                color: `#2D6A4F`,
                margin: `16px auto 0`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                gap: 10,
              }}
            >
              <span className="status-dot online pulse" />
              {Se.length}
              {" people online now"}
            </p>
          </div>
          <div
            style={{
              maxWidth: 600,
              margin: `0 auto 28px`,
              display: `flex`,
              gap: 10,
              alignItems: `center`,
            }}
          >
            <div style={{ position: `relative`, flex: 1 }}>
              <input
                type="text"
                placeholder="Search by name or username..."
                value={a}
                onChange={(e) => o(e.target.value)}
                className="filter-input"
                style={{
                  borderRadius: 32,
                  padding: `13px 48px 13px 22px`,
                  fontSize: 14,
                }}
              />
              <span
                style={{
                  position: `absolute`,
                  right: 18,
                  top: `50%`,
                  transform: `translateY(-50%)`,
                  fontSize: 17,
                  pointerEvents: `none`,
                }}
              >
                🔍
              </span>
            </div>
            <button
              type="button"
              onClick={ne ? Ee : Te}
              disabled={ie}
              title={
                n?.membership?.plan === `premium`
                  ? `AI-Based Match`
                  : `Premium feature — matches by shared preferences/hobbies`
              }
              style={{
                flexShrink: 0,
                display: `flex`,
                alignItems: `center`,
                gap: 6,
                padding: `12px 18px`,
                borderRadius: 32,
                background: ne
                  ? `#F0FAF4`
                  : `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                color: ne ? `#2D6A4F` : `#fff`,
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 13,
                fontWeight: 700,
                cursor: ie ? `not-allowed` : `pointer`,
                boxShadow: ne ? `none` : `0 4px 16px rgba(27,58,75,0.28)`,
                border: ne ? `1.5px solid #40916C` : `none`,
              }}
            >
              {ie
                ? `Matching…`
                : ne
                  ? `✕ Clear AI Match`
                  : n?.membership?.plan === `premium`
                    ? `✨ AI Match`
                    : `✨ AI Match 🔒`}
            </button>
          </div>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Age Range
              </label>
              <div style={{ position: `relative` }} ref={he}>
                <button
                  type="button"
                  onClick={() => {
                    (se((e) => !e), N(!1), F(!1), ue(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `#F8FAF5`,
                    border: `1.5px solid #B7E4C7`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: s ? `#1B3A4B` : `#74C69D`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                  }}
                >
                  <span>{s || `Select age`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `#40916C`,
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
                      right: 0,
                      zIndex: 50,
                      background: `#fff`,
                      borderRadius: 14,
                      border: `1.5px solid #D4EDDA`,
                      boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        maxHeight: 220,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {[`18-25`, `26-35`, `36-45`, `46-55`].map((e) => {
                        let t = e,
                          n = s === e;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              (c(e), se(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `#F0FAF4` : `transparent`,
                              color: n ? `#2D6A4F` : `#1B3A4B`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `'DM Sans', sans-serif`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `#F0FAF4`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `#F0FAF4`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Looking For
              </label>
              <div style={{ position: `relative` }} ref={ve}>
                <button
                  type="button"
                  onClick={() => {
                    (ue((e) => !e), se(!1), N(!1), F(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `#F8FAF5`,
                    border: `1.5px solid #B7E4C7`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: h ? `#1B3A4B` : `#74C69D`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                  }}
                >
                  <span>
                    {h === `woman` ? `Women` : h === `man` ? `Men` : `Everyone`}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `#40916C`,
                      transform: le ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {le && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `#fff`,
                      borderRadius: 14,
                      border: `1.5px solid #D4EDDA`,
                      boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div style={{ padding: `6px 8px` }}>
                      {[
                        { value: `woman`, label: `Women` },
                        { value: `man`, label: `Men` },
                      ].map(({ value: e, label: t }) => {
                        let n = h === e;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => be(e)}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `#F0FAF4` : `transparent`,
                              color: n ? `#2D6A4F` : `#1B3A4B`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `'DM Sans', sans-serif`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `#F0FAF4`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `#F0FAF4`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Religion
              </label>
              <div style={{ position: `relative` }} ref={ge}>
                <button
                  type="button"
                  onClick={() => {
                    (N((e) => !e), fe(``), se(!1), ue(!1), F(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `#F8FAF5`,
                    border: `1.5px solid #B7E4C7`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: l ? `#1B3A4B` : `#74C69D`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                  }}
                >
                  <span>{l || `Select religion`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `#40916C`,
                      transform: ce ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {ce && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `#fff`,
                      borderRadius: 14,
                      border: `1.5px solid #D4EDDA`,
                      boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        padding: 8,
                        borderBottom: `1px solid #E8F5EE`,
                      }}
                    >
                      <input
                        type="text"
                        autoFocus={!0}
                        placeholder="Search..."
                        value={de}
                        onChange={(e) => fe(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="filter-input"
                        style={{
                          padding: `7px 10px`,
                          fontSize: 12.5,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        maxHeight: 240,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {De.filter((e) => ye(e, de)).length === 0 && (
                        <div
                          style={{
                            padding: `10px 8px`,
                            fontSize: 12.5,
                            color: `#74C69D`,
                          }}
                        >
                          No matches
                        </div>
                      )}
                      {De.filter((e) => ye(e, de)).map((e) => {
                        let t = e,
                          n = l === e;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              (u(e), N(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `#F0FAF4` : `transparent`,
                              color: n ? `#2D6A4F` : `#1B3A4B`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `'DM Sans', sans-serif`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                              display: `flex`,
                              alignItems: `center`,
                              gap: 8,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `#F0FAF4`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `#F0FAF4`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Country/Nationality
              </label>
              <div style={{ position: `relative` }} ref={_e}>
                <button
                  type="button"
                  onClick={() => {
                    (F((e) => !e), me(``), se(!1), N(!1), ue(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `#F8FAF5`,
                    border: `1.5px solid #B7E4C7`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: d ? `#1B3A4B` : `#74C69D`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                  }}
                >
                  <span>{d || `Select Country`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `#40916C`,
                      transform: P ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {P && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `#fff`,
                      borderRadius: 14,
                      border: `1.5px solid #D4EDDA`,
                      boxShadow: `0 12px 40px rgba(27,58,75,0.14)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        padding: 8,
                        borderBottom: `1px solid #E8F5EE`,
                      }}
                    >
                      <input
                        type="text"
                        autoFocus={!0}
                        placeholder="Search..."
                        value={pe}
                        onChange={(e) => me(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="filter-input"
                        style={{
                          padding: `7px 10px`,
                          fontSize: 12.5,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        maxHeight: 220,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {M.filter((e) => ye(e, pe)).length === 0 && (
                        <div
                          style={{
                            padding: `10px 8px`,
                            fontSize: 12.5,
                            color: `#74C69D`,
                          }}
                        >
                          No matches
                        </div>
                      )}
                      {M.filter((e) => ye(e, pe)).map((e) => {
                        let t = e,
                          n = d === e;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              (f(e), F(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `#F0FAF4` : `transparent`,
                              color: n ? `#2D6A4F` : `#1B3A4B`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `'DM Sans', sans-serif`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `#F0FAF4`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `#F0FAF4`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `#2D6A4F`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Location
              </label>
              <input
                type="text"
                placeholder="City name..."
                value={p}
                onChange={(e) => m(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `#F0FAF4`,
          borderBottom: `1px solid #D4EDDA`,
          padding: `10px 40px`,
        }}
      >
        <div style={{ maxWidth: 1060, margin: `0 auto` }}>
          <p style={{ fontSize: 13, color: `#3D6B55` }}>
            {r ? (
              n?.membership?.plan === `free` ? (
                <>
                  <strong>Free Account:</strong>
                  {
                    " up to 3 new contacts per calendar month, with unlimited messaging once you've connected."
                  }{" "}
                  <Link
                    to="/how-it-works?tab=membership"
                    style={{
                      color: `#2D6A4F`,
                      fontWeight: 700,
                      textDecoration: `none`,
                    }}
                  >
                    Upgrade for more →
                  </Link>
                </>
              ) : (
                <>
                  <strong>
                    {n?.membership?.plan === `premium` ? `Premium` : `Basic`}
                    {" Account:"}
                  </strong>
                  {" Enjoy your expanded messaging limits!"}
                </>
              )
            ) : (
              <>
                <strong>Browsing as a guest:</strong>
                {" anyone can explore who's online."}{" "}
                <Link
                  to="/login"
                  state={{ from: `/explore` }}
                  style={{
                    color: `#2D6A4F`,
                    fontWeight: 700,
                    textDecoration: `none`,
                  }}
                >
                  Sign in
                </Link>{" "}
                to start chatting.
              </>
            )}
          </p>
        </div>
      </div>
      <section
        style={{ padding: `44px 40px`, maxWidth: 1100, margin: `0 auto` }}
      >
        {x ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `#C0392B`,
            }}
          >
            <p style={{ fontSize: 14 }}>{x}</p>
          </div>
        ) : y ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `#74C69D`,
            }}
          >
            <p style={{ fontSize: 14 }}>Loading profiles…</p>
          </div>
        ) : Se.length === 0 ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `#74C69D`,
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🌿</div>
            <h3
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: 22,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 6,
              }}
            >
              No matches found
            </h3>
            <p style={{ fontSize: 14, color: `#3D6B55` }}>
              Try adjusting your filters to see more people.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fill, minmax(210px, 1fr))`,
              gap: 20,
            }}
          >
            {Se.map((e) => (
              <div
                key={e.id}
                className="card-hover"
                onClick={() => we(e)}
                style={{
                  background: `#fff`,
                  borderRadius: 18,
                  overflow: `hidden`,
                  border: `1px solid #E8F5EE`,
                  boxShadow: `0 4px 20px rgba(27,58,75,0.07)`,
                  position: `relative`,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(160deg, #D4EDDA 0%, #B7E4C7 100%)`,
                    padding: `22px 0 14px`,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 6,
                    position: `relative`,
                  }}
                >
                  {e.avatarUrl ? (
                    <img
                      src={e.avatarUrl}
                      alt={e.displayName}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: `50%`,
                        objectFit: `cover`,
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 52, lineHeight: 1 }}>
                      {$n[e.gender] || `🙂`}
                    </div>
                  )}
                  <span
                    className={`status-dot ${e.onlineStatus}${e.onlineStatus === `online` ? ` pulse` : ``}`}
                    style={{
                      position: `absolute`,
                      bottom: 16,
                      right: `calc(50% - 26px)`,
                      border: `2px solid #fff`,
                    }}
                  />
                  <button
                    onClick={(t) => {
                      (t.stopPropagation(),
                        E({
                          type: `user`,
                          id: e.id,
                          name: e.displayName,
                        }));
                    }}
                    title="Block or report"
                    style={{
                      position: `absolute`,
                      top: 8,
                      right: 8,
                      background: `rgba(27,58,75,0.35)`,
                      border: `none`,
                      borderRadius: `50%`,
                      width: 26,
                      height: 26,
                      color: `#fff`,
                      cursor: `pointer`,
                      fontSize: 13,
                      lineHeight: 1,
                    }}
                  >
                    ⋮
                  </button>
                </div>
                <div style={{ padding: `12px 14px 16px` }}>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                      marginBottom: 2,
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 5,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: `'Playfair Display', serif`,
                          fontWeight: 700,
                          fontSize: 14.5,
                          color: `#1B3A4B`,
                          overflow: `hidden`,
                          textOverflow: `ellipsis`,
                          whiteSpace: `nowrap`,
                        }}
                      >
                        {e.displayName}{" "}
                        {e.verified && <span title="Verified">✅</span>}
                      </span>
                      <PlanBadge plan={e.plan} />
                    </span>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: `#3D6B55`,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {e.age ? `${e.age} yrs` : ``}
                    </span>
                  </div>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      gap: 4,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      className={`status-dot ${e.onlineStatus}`}
                      style={{ width: 7, height: 7 }}
                    />
                    <span
                      style={{
                        fontSize: 11.5,
                        color:
                          e.onlineStatus === `online` ? `#22C55E` : `#74C69D`,
                        fontWeight: 500,
                      }}
                    >
                      {e.onlineStatus === `online` ? `Online now` : `Offline`}
                    </span>
                  </div>
                  <div
                    style={{
                      background: `#F0FAF4`,
                      border: `1px solid #D4EDDA`,
                      borderRadius: 10,
                      padding: `8px 10px`,
                      marginBottom: 12,
                      display: `flex`,
                      flexDirection: `column`,
                      gap: 4,
                    }}
                  >
                    {[
                      { label: `Religion`, value: e.religion },
                      {
                        label: `Nationality`,
                        value: e.nationality,
                      },
                      {
                        label: `Location`,
                        value: e.location || e.city,
                      },
                    ].map(({ label: e, value: t }) => (
                      <div
                        key={e}
                        style={{
                          fontSize: 11.5,
                          display: `flex`,
                          justifyContent: `space-between`,
                        }}
                      >
                        <span
                          style={{
                            color: `#3D6B55`,
                            fontWeight: 600,
                          }}
                        >
                          {e}
                        </span>
                        <span
                          style={{
                            color: `#2D6A4F`,
                            fontWeight: 500,
                          }}
                        >
                          {t || `—`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(t) => {
                      (t.stopPropagation(), Ce(e));
                    }}
                    disabled={C === e.id}
                    className="btn-primary"
                  >
                    {C === e.id ? `Starting…` : `💬 Chat Now`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {T && (
        <ReportBlockModal
          target={T}
          onClose={() => E(null)}
          onBlocked={() => {
            (E(null), xe(), i());
          }}
        />
      )}
      {ee && (
        <Toast message={ee.message} tone={ee.tone} onDismiss={() => D(null)} />
      )}
      {O && <ProfileModal personId={O} onClose={() => k(null)} />}
      {A && <UpgradeModal message={A} onClose={() => te(null)} />}
      <section
        style={{
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderTop: `1px solid #D4EDDA`,
          padding: `64px 40px 72px`,
          textAlign: `center`,
        }}
      >
        <div style={{ maxWidth: 620, margin: `0 auto` }}>
          <div
            style={{
              fontSize: 13,
              color: `#40916C`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⌒ ☽ ⌒
          </div>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(26px, 4vw, 40px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              letterSpacing: `-0.025em`,
              marginBottom: 10,
            }}
          >
            {"Ready to find your "}
            <span className="green-text">match?</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: `#3D6B55`,
              marginBottom: 34,
              fontStyle: `italic`,
            }}
          >
            Create a verified profile and unlock unlimited chats with all these
            amazing people.
          </p>
          <Link
            to="/signup"
            style={{
              display: `inline-block`,
              background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
              color: `#fff`,
              textDecoration: `none`,
              padding: `14px 44px`,
              borderRadius: 32,
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: `0.04em`,
              boxShadow: `0 6px 24px rgba(27,58,75,0.35)`,
            }}
          >
            Create Free Profile
          </Link>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
          padding: `16px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
        }}
      >
        <span
          style={{
            color: `#B7E4C7`,
            fontSize: 13,
            letterSpacing: `0.18em`,
            fontWeight: 600,
            textTransform: `uppercase`,
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `#74C69D`, fontSize: 16 }}>♥</span>
      </div>
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
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[
            [`Privacy Policy`, `#`],
            [`Terms & Conditions`, `#`],
          ].map(([e, t]) => (
            <Link
              key={e}
              to={t}
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
    </div>
  );
}
function ConfirmDialog({
  message: e,
  confirmLabel: t = `Confirm`,
  danger: n = !1,
  onConfirm: r,
  onCancel: i,
}) {
  return (
    <div
      onClick={i}
      style={{
        position: `fixed`,
        inset: 0,
        background: `rgba(27,58,75,0.5)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        zIndex: 300,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `#fff`,
          borderRadius: 20,
          maxWidth: 340,
          width: `100%`,
          padding: 24,
          fontFamily: `'DM Sans', sans-serif`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.25)`,
          textAlign: `center`,
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: `#1B3A4B`,
            marginBottom: 20,
            lineHeight: 1.5,
          }}
        >
          {e}
        </p>
        <div style={{ display: `flex`, gap: 10 }}>
          <button
            onClick={i}
            style={{
              flex: 1,
              padding: `10px 0`,
              borderRadius: 20,
              border: `1.5px solid #D4EDDA`,
              background: `transparent`,
              color: `#3D6B55`,
              fontWeight: 600,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={r}
            style={{
              flex: 1,
              padding: `10px 0`,
              borderRadius: 20,
              border: `none`,
              background: n
                ? `#C0392B`
                : `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
              color: `#fff`,
              fontWeight: 700,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            {t}
          </button>
        </div>
      </div>
    </div>
  );
}
var nr = [
    { value: `man`, label: `Male` },
    { value: `woman`, label: `Female` },
    { value: `other`, label: `Other` },
    { value: `prefer_not_to_say`, label: `Prefer not to say` },
  ],
  rr = [
    `Muslim`,
    `Hindu`,
    `Christian`,
    `Sikh`,
    `Buddhist`,
    `Jain`,
    `Jewish`,
    `Other`,
    `Prefer not to say`,
  ],
  ir = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`],
  ar = [`Yes`, `No`, `Prefer not to say`],
  or = [
    {
      value: `hidden`,
      label: `Hidden / Private`,
      desc: `Everyone sees "Private Account" instead of your ID/phone/email. Premium viewers can still see your ID (never your phone or email).`,
    },
    {
      value: `premium_only`,
      label: `Premium members only`,
      desc: `Only Premium members can see your ID, phone, and email. Everyone else sees "Private Account".`,
    },
    {
      value: `everyone`,
      label: `Everyone`,
      desc: `Any viewer, on any plan, can see your ID, phone, and email.`,
    },
  ],
  sr = {
    background: `rgba(255,255,255,0.85)`,
    border: `1px solid rgba(64,145,108,0.15)`,
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
  },
  cr = {
    display: `block`,
    fontSize: 10.5,
    fontWeight: 700,
    color: `#3D6B55`,
    letterSpacing: `0.08em`,
    textTransform: `uppercase`,
    marginBottom: 6,
  },
  lr = {
    width: `100%`,
    padding: `11px 14px`,
    borderRadius: 12,
    border: `1.5px solid #D4EDDA`,
    background: `#F8FAF5`,
    color: `#1B3A4B`,
    fontSize: 13.5,
    fontFamily: `'DM Sans', sans-serif`,
    outline: `none`,
  },
  ur = { marginBottom: 16 },
  dr = (e) => ({
    padding: `11px 28px`,
    borderRadius: 32,
    border: `none`,
    background: e
      ? `#B7E4C7`
      : `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
    color: `#fff`,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 13.5,
    fontWeight: 700,
    cursor: e ? `not-allowed` : `pointer`,
    letterSpacing: `0.03em`,
  });
function AccountField({ label: e, children: t }) {
  return (
    <div style={ur}>
      <label style={cr}>{e}</label>
      {t}
    </div>
  );
}
function AccountPasswordToggle({ shown: e, onClick: t }) {
  return (
    <button
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
        color: `#74C69D`,
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
function AccountPage() {
  let { user: e, refreshUser: t, deleteAccount: n } = useAuth(),
    r = useNavigate(),
    i = (0, React.useRef)(null),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(!1),
    [l, u] = (0, React.useState)(null),
    [d, f] = (0, React.useState)(!1),
    p = (e, t = `success`) => o({ message: e, tone: t }),
    m = (e, t, n = {}) => {
      u({
        message: e,
        ...n,
        onConfirm: () => {
          (u(null), t());
        },
      });
    },
    h = async (e) => {
      let n = e.target.files?.[0];
      if (((e.target.value = ``), n)) {
        c(!0);
        try {
          let e = new FormData();
          (e.append(`file`, n), e.append(`purpose`, `avatar`));
          let r = await api.upload(`/media/upload`, e);
          (await api.patch(`/me/profile`, { avatarUrl: r.mediaUrl }),
            await t(),
            p(`Profile photo updated.`));
        } catch (e) {
          p(e.message || `Could not upload photo.`, `error`);
        } finally {
          c(!1);
        }
      }
    },
    [g, _] = (0, React.useState)([]),
    [y, b] = (0, React.useState)(!1),
    x = (e) => {
      _(Array.from(e.target.files || []).slice(0, 2));
    },
    S = async () => {
      if (!g.length) {
        p(`Choose at least one photo (ID and/or selfie) first.`, `error`);
        return;
      }
      b(!0);
      try {
        let e = new FormData();
        for (let t of g) e.append(`photos`, t);
        (await api.upload(`/me/verification/request`, e),
          _([]),
          await t(),
          p(
            `Verification request submitted — an admin will review your photo(s) shortly.`,
          ));
      } catch (e) {
        p(e.message || `Could not submit verification request.`, `error`);
      } finally {
        b(!1);
      }
    },
    [C, w] = (0, React.useState)(e?.name || ``),
    [T, E] = (0, React.useState)(e?.email || ``),
    [ee, D] = (0, React.useState)(e?.phoneNumber || ``),
    [O, k] = (0, React.useState)(!1),
    A = async (e) => {
      (e.preventDefault(), k(!0));
      try {
        (await api.patch(`/me`, { name: C, email: T, phoneNumber: ee }),
          await t(),
          p(`Account details saved.`));
      } catch (e) {
        p(e.message || `Could not save account details.`, `error`);
      } finally {
        k(!1);
      }
    },
    [te, ne] = (0, React.useState)(e?.username || ``),
    [re, ie] = (0, React.useState)(e?.username ? !0 : null),
    [j, M] = (0, React.useState)(!1),
    ae = !!e?.username,
    oe = async (e) => {
      if ((e.preventDefault(), !te || re !== !0)) {
        p(
          re === !1
            ? `Please choose a different, available username.`
            : `Please choose a username first.`,
          `error`,
        );
        return;
      }
      M(!0);
      try {
        (await api.patch(`/me`, { username: te }),
          await t(),
          p(`Your username has been set.`));
      } catch (e) {
        p(e.message || `Could not save your username.`, `error`);
      } finally {
        M(!1);
      }
    },
    [se, ce] = (0, React.useState)(e?.profile?.gender || nr[0].value),
    [N, P] = (0, React.useState)(e?.profile?.nationality || ``),
    [F, le] = (0, React.useState)(e?.profile?.religion || rr[0]),
    [ue, de] = (0, React.useState)(e?.profile?.ageRange || ir[0]),
    [fe, pe] = (0, React.useState)(e?.profile?.location || ``),
    [me, he] = (0, React.useState)(e?.profile?.hasKids || ar[0]),
    [ge, _e] = (0, React.useState)(e?.profile?.bio || ``),
    [ve, ye] = (0, React.useState)(e?.profile?.hobbies || []),
    [I, be] = (0, React.useState)(``),
    [xe, Se] = (0, React.useState)(!1),
    Ce = async (e) => {
      (e.preventDefault(), Se(!0));
      try {
        let e = {
          gender: se,
          nationality: N,
          religion: F,
          ageRange: ue,
          location: fe,
          hasKids: me,
          bio: ge,
          hobbies: ve,
        };
        for (let t of Object.keys(e)) e[t] === `` && delete e[t];
        (await api.patch(`/me/profile`, e), await t(), p(`Profile saved.`));
      } catch (e) {
        p(e.message || `Could not save profile.`, `error`);
      } finally {
        Se(!1);
      }
    },
    we = () => {
      let e = I.trim();
      if (!e || ve.includes(e) || ve.length >= 20) {
        be(``);
        return;
      }
      (ye([...ve, e]), be(``));
    },
    Te = (e) => ye(ve.filter((t) => t !== e)),
    [Ee, De] = (0, React.useState)(e?.profile?.contactVisibility || `hidden`),
    [Oe, ke] = (0, React.useState)(!1),
    Ae = async (e) => {
      (De(e), ke(!0));
      try {
        (await api.patch(`/me/profile`, { contactVisibility: e }),
          await t(),
          p(`Privacy setting saved.`));
      } catch (e) {
        p(e.message || `Could not save this setting.`, `error`);
      } finally {
        ke(!1);
      }
    },
    [je, Me] = (0, React.useState)(``),
    [L, Ne] = (0, React.useState)(``),
    [Pe, Fe] = (0, React.useState)(``),
    [Ie, Le] = (0, React.useState)(!1),
    [R, Re] = (0, React.useState)(!1),
    [Be, Ve] = (0, React.useState)(!1),
    [He, Ue] = (0, React.useState)(!1),
    We = async (n) => {
      if ((n.preventDefault(), L !== Pe)) {
        p(`New password and confirmation don't match.`, `error`);
        return;
      }
      Ue(!0);
      try {
        (await api.post(`/me/password`, {
          currentPassword: e?.hasPassword ? je : void 0,
          newPassword: L,
        }),
          await t(),
          Me(``),
          Ne(``),
          Fe(``),
          p(
            e?.hasPassword
              ? `Password changed.`
              : `Password set — you can now sign in with email too.`,
          ));
      } catch (e) {
        p(e.message || `Could not update password.`, `error`);
      } finally {
        Ue(!1);
      }
    },
    Ge = () => {
      m(
        `Delete your account? This permanently erases your profile, matches, messages, and photos — there's no way to undo this.`,
        async () => {
          f(!0);
          try {
            (await n(), r(`/`));
          } catch (e) {
            (p(e.message || `Could not delete your account.`, `error`), f(!1));
          }
        },
        { confirmLabel: `Delete Account`, danger: !0 },
      );
    };
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
        paddingTop: 96,
        paddingBottom: 64,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');\n        .acct-input:focus, .acct-select:focus, .acct-textarea:focus { border-color: #40916C !important; box-shadow: 0 0 0 3px rgba(64,145,108,0.12); }\n      "
        }
      </style>
      <Navbar />
      <div style={{ maxWidth: 640, margin: `0 auto`, padding: `0 24px` }}>
        <h1
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 30,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 6,
          }}
        >
          My Account
        </h1>
        <p style={{ fontSize: 13, color: `#3D6B55`, marginBottom: 32 }}>
          Manage your profile, contact details, and password.
        </p>
        <div style={{ ...sr, display: `flex`, alignItems: `center`, gap: 20 }}>
          {e?.profile?.avatarUrl ? (
            <img
              src={e.profile.avatarUrl}
              alt=""
              style={{
                width: 84,
                height: 84,
                borderRadius: `50%`,
                objectFit: `cover`,
              }}
            />
          ) : (
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: `50%`,
                background: `linear-gradient(135deg, #2D6A4F, #74C69D)`,
                color: `#fff`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                fontFamily: `'Playfair Display', serif`,
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              {(e?.name || `?`).trim().charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span style={{ fontWeight: 700, color: `#1B3A4B` }}>
                {e?.name}
              </span>
              <PlanBadge plan={e?.membership?.plan} size="md" />
              {(!e?.membership?.plan || e.membership.plan === `free`) && (
                <Link
                  to="/how-it-works?tab=membership"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: `#40916C`,
                  }}
                >
                  Upgrade
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => i.current?.click()}
              disabled={s}
              style={{
                border: `1.5px solid #40916C`,
                color: `#2D6A4F`,
                background: `none`,
                borderRadius: 20,
                padding: `7px 16px`,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: s ? `not-allowed` : `pointer`,
              }}
            >
              {s ? `Uploading…` : `Change Photo`}
            </button>
            <input
              ref={i}
              type="file"
              accept="image/*"
              onChange={h}
              style={{ display: `none` }}
            />
          </div>
        </div>
        <form style={sr} onSubmit={A}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 18,
            }}
          >
            Basic Info
          </h2>
          <AccountField label="Full Name">
            <input
              className="acct-input"
              style={lr}
              value={C}
              onChange={(e) => w(e.target.value)}
            />
          </AccountField>
          <AccountField label="Email">
            <input
              className="acct-input"
              style={lr}
              type="email"
              value={T}
              onChange={(e) => E(e.target.value)}
            />
          </AccountField>
          <AccountField label="Phone Number">
            <input
              className="acct-input"
              style={lr}
              value={ee}
              onChange={(e) => D(e.target.value)}
              placeholder="10-digit number"
            />
          </AccountField>
          <button type="submit" disabled={O} style={dr(O)}>
            {O ? `Saving…` : `Save`}
          </button>
        </form>
        <form style={sr} onSubmit={oe}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 4,
            }}
          >
            Username
          </h2>
          <p style={{ fontSize: 12, color: `#74C69D`, marginBottom: 16 }}>
            {ae
              ? `This is your permanent username — other members use it to find and identify you (subject to your privacy setting below).`
              : `Choose a username for your account. Once set, it can't be changed.`}
          </p>
          <UsernameField
            value={te}
            onChange={ne}
            onAvailabilityChange={ie}
            inputStyle={lr}
            disabled={ae}
            label={null}
          />
          {!ae && (
            <button
              type="submit"
              disabled={j}
              style={{ ...dr(j), marginTop: 14 }}
            >
              {j ? `Saving…` : `Save Username`}
            </button>
          )}
        </form>
        <div style={sr}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 4,
            }}
          >
            Verification
          </h2>
          {e?.verificationStatus === `verified` && (
            <p style={{ fontSize: 13, color: `#2D6A4F`, fontWeight: 700 }}>
              ✓ Your account is verified.
            </p>
          )}
          {e?.verificationStatus === `pending` && (
            <p style={{ fontSize: 13, color: `#9A6B00` }}>
              Your verification request is under review.
            </p>
          )}
          {(e?.verificationStatus === `none` || !e?.verificationStatus) && (
            <>
              <p
                style={{
                  fontSize: 12,
                  color: `#74C69D`,
                  marginBottom: 16,
                }}
              >
                Upload a photo of your ID and/or a selfie to get the verified
                badge. Photos are only ever seen by admins reviewing your
                request — never shown to other members.
              </p>
              <input
                type="file"
                accept="image/*"
                multiple={!0}
                onChange={x}
                style={{
                  fontSize: 12.5,
                  marginBottom: 14,
                  display: `block`,
                }}
              />
              <button
                type="button"
                onClick={S}
                disabled={y || !g.length}
                style={dr(y || !g.length)}
              >
                {y ? `Submitting…` : `Submit for Verification`}
              </button>
            </>
          )}
        </div>
        <form style={sr} onSubmit={Ce}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 18,
            }}
          >
            Dating Profile
          </h2>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: 16,
            }}
          >
            <AccountField label="Gender">
              <select
                className="acct-select"
                style={lr}
                value={se}
                onChange={(e) => ce(e.target.value)}
              >
                {nr.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </AccountField>
            <AccountField label="Age Range">
              <select
                className="acct-select"
                style={lr}
                value={ue}
                onChange={(e) => de(e.target.value)}
              >
                {ir.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </AccountField>
            <AccountField label="Religion">
              <select
                className="acct-select"
                style={lr}
                value={F}
                onChange={(e) => le(e.target.value)}
              >
                {rr.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </AccountField>
            <AccountField label="Have Kids?">
              <select
                className="acct-select"
                style={lr}
                value={me}
                onChange={(e) => he(e.target.value)}
              >
                {ar.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </AccountField>
          </div>
          <CountryStateSelect
            country={N}
            state={fe}
            onCountryChange={P}
            onStateChange={pe}
            inputStyle={lr}
            labelStyle={cr}
            countryLabel="Country/Nationality"
            stateLabel="Location (State/Region)"
          />
          <AccountField label="Bio">
            <textarea
              className="acct-textarea"
              style={{
                ...lr,
                resize: `vertical`,
                minHeight: 80,
                fontFamily: `'DM Sans', sans-serif`,
              }}
              value={ge}
              onChange={(e) => _e(e.target.value)}
              maxLength={2e3}
            />
          </AccountField>
          <AccountField label="Hobbies & Interests (used by AI-Based Match)">
            <div
              style={{
                display: `flex`,
                gap: 8,
                marginBottom: ve.length ? 8 : 0,
              }}
            >
              <input
                className="acct-input"
                style={lr}
                value={I}
                onChange={(e) => be(e.target.value)}
                onKeyDown={(e) => {
                  e.key === `Enter` && (e.preventDefault(), we());
                }}
                placeholder="e.g. hiking, cooking, reading"
              />
              <button
                type="button"
                onClick={we}
                style={{
                  ...dr(!1),
                  width: `auto`,
                  padding: `0 18px`,
                  flexShrink: 0,
                }}
              >
                Add
              </button>
            </div>
            {ve.length > 0 && (
              <div style={{ display: `flex`, flexWrap: `wrap`, gap: 6 }}>
                {ve.map((e) => (
                  <span
                    key={e}
                    style={{
                      display: `inline-flex`,
                      alignItems: `center`,
                      gap: 6,
                      fontSize: 11.5,
                      background: `#F0FAF4`,
                      border: `1px solid #D4EDDA`,
                      color: `#2D6A4F`,
                      borderRadius: 20,
                      padding: `4px 6px 4px 10px`,
                    }}
                  >
                    {e}
                    <button
                      type="button"
                      onClick={() => Te(e)}
                      style={{
                        background: `none`,
                        border: `none`,
                        cursor: `pointer`,
                        color: `#74C69D`,
                        fontSize: 12,
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </AccountField>
          <button type="submit" disabled={xe} style={dr(xe)}>
            {xe ? `Saving…` : `Save`}
          </button>
        </form>
        <div style={sr}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 4,
            }}
          >
            Privacy
          </h2>
          <p style={{ fontSize: 12, color: `#74C69D`, marginBottom: 16 }}>
            Control who can see your User ID, phone number, and email on your
            profile card. Premium viewers can always see the baseline of
            ID/phone — this setting narrows or widens that further.
          </p>
          <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
            {or.map((e) => (
              <label
                key={e.value}
                style={{
                  display: `flex`,
                  gap: 10,
                  alignItems: `flex-start`,
                  cursor: Oe ? `not-allowed` : `pointer`,
                  padding: 12,
                  borderRadius: 14,
                  border: `1.5px solid ${Ee === e.value ? `#40916C` : `#D4EDDA`}`,
                  background: Ee === e.value ? `#F0FAF4` : `transparent`,
                }}
              >
                <input
                  type="radio"
                  name="contactVisibility"
                  checked={Ee === e.value}
                  disabled={Oe}
                  onChange={() => Ae(e.value)}
                  style={{ marginTop: 3 }}
                />
                <span>
                  <span
                    style={{
                      display: `block`,
                      fontSize: 13,
                      fontWeight: 700,
                      color: `#1B3A4B`,
                    }}
                  >
                    {e.label}
                  </span>
                  <span
                    style={{
                      display: `block`,
                      fontSize: 11.5,
                      color: `#3D6B55`,
                      marginTop: 2,
                      lineHeight: 1.4,
                    }}
                  >
                    {e.desc}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
        <form style={sr} onSubmit={We}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 6,
            }}
          >
            {e?.hasPassword ? `Change Password` : `Set a Password`}
          </h2>
          <p style={{ fontSize: 12, color: `#74C69D`, marginBottom: 18 }}>
            {e?.hasPassword
              ? `Update the password you use to sign in.`
              : `This account was created with Google Sign-In. Set a password to also sign in with your email.`}
          </p>
          {e?.hasPassword && (
            <AccountField label="Current Password">
              <div style={{ position: `relative` }}>
                <input
                  className="acct-input"
                  style={{ ...lr, paddingRight: 38 }}
                  type={Ie ? `text` : `password`}
                  value={je}
                  onChange={(e) => Me(e.target.value)}
                />
                <AccountPasswordToggle
                  shown={Ie}
                  onClick={() => Le((e) => !e)}
                />
              </div>
            </AccountField>
          )}
          <AccountField label="New Password">
            <div style={{ position: `relative` }}>
              <input
                className="acct-input"
                style={{ ...lr, paddingRight: 38 }}
                type={R ? `text` : `password`}
                value={L}
                onChange={(e) => Ne(e.target.value)}
                minLength={8}
              />
              <AccountPasswordToggle shown={R} onClick={() => Re((e) => !e)} />
            </div>
          </AccountField>
          <AccountField label="Confirm New Password">
            <div style={{ position: `relative` }}>
              <input
                className="acct-input"
                style={{ ...lr, paddingRight: 38 }}
                type={Be ? `text` : `password`}
                value={Pe}
                onChange={(e) => Fe(e.target.value)}
                minLength={8}
              />
              <AccountPasswordToggle shown={Be} onClick={() => Ve((e) => !e)} />
            </div>
          </AccountField>
          <button type="submit" disabled={He} style={dr(He)}>
            {He
              ? `Saving…`
              : e?.hasPassword
                ? `Change Password`
                : `Set Password`}
          </button>
        </form>
        <div style={{ ...sr, border: `1px solid rgba(192,57,43,0.25)` }}>
          <h2
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 18,
              fontWeight: 700,
              color: `#C0392B`,
              marginBottom: 6,
            }}
          >
            Delete Account
          </h2>
          <p
            style={{
              fontSize: 12,
              color: `#8a4a42`,
              marginBottom: 18,
              lineHeight: 1.5,
            }}
          >
            This permanently deletes your profile, matches, conversations, and
            photos. This action cannot be undone.
          </p>
          <button
            type="button"
            onClick={Ge}
            disabled={d}
            style={{
              padding: `11px 28px`,
              borderRadius: 32,
              border: `1.5px solid #C0392B`,
              background: `transparent`,
              color: `#C0392B`,
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 13.5,
              fontWeight: 700,
              cursor: d ? `not-allowed` : `pointer`,
              letterSpacing: `0.03em`,
            }}
          >
            {d ? `Deleting…` : `Delete My Account`}
          </button>
        </div>
      </div>
      {a && (
        <Toast message={a.message} tone={a.tone} onDismiss={() => o(null)} />
      )}
      {l && (
        <ConfirmDialog
          message={l.message}
          confirmLabel={l.confirmLabel}
          danger={l.danger}
          onConfirm={l.onConfirm}
          onCancel={() => u(null)}
        />
      )}
    </div>
  );
}
var hr = [
    { value: `man`, label: `Man` },
    { value: `woman`, label: `Woman` },
    { value: `other`, label: `Other` },
  ],
  gr = [
    `Muslim`,
    `Hindu`,
    `Christian`,
    `Sikh`,
    `Buddhist`,
    `Jain`,
    `Jewish`,
    `Other`,
  ],
  _r = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`],
  vr = [`Yes`, `No`, `Prefer not to say`],
  yr = {
    background: `rgba(255,255,255,0.85)`,
    border: `1px solid rgba(64,145,108,0.15)`,
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
  },
  br = {
    display: `block`,
    fontSize: 10.5,
    fontWeight: 700,
    color: `#3D6B55`,
    letterSpacing: `0.08em`,
    textTransform: `uppercase`,
    marginBottom: 6,
  },
  xr = {
    width: `100%`,
    padding: `11px 14px`,
    borderRadius: 12,
    border: `1.5px solid #D4EDDA`,
    background: `#F8FAF5`,
    color: `#1B3A4B`,
    fontSize: 13.5,
    fontFamily: `'DM Sans', sans-serif`,
    outline: `none`,
  },
  Sr = { marginBottom: 16 },
  Cr = (e) => ({
    padding: `12px 28px`,
    borderRadius: 32,
    border: `none`,
    background: e
      ? `#B7E4C7`
      : `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
    color: `#fff`,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 14,
    fontWeight: 700,
    cursor: e ? `not-allowed` : `pointer`,
    letterSpacing: `0.03em`,
    width: `100%`,
  });
function ProfileField({ label: e, children: t }) {
  return (
    <div style={Sr}>
      <label style={br}>{e}</label>
      {t}
    </div>
  );
}
function CompleteProfilePage() {
  let { user: e, refreshUser: t, logout: n } = useAuth(),
    r = useNavigate(),
    i = useLocation(),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(!1),
    [l, u] = (0, React.useState)(e?.phoneNumber || ``),
    [d, f] = (0, React.useState)(e?.countryCode || ``),
    [p, m] = (0, React.useState)(e?.profile?.gender || ``),
    [h, g] = (0, React.useState)(e?.profile?.nationality || ``),
    [_, y] = (0, React.useState)(e?.profile?.religion || ``),
    [b, x] = (0, React.useState)(e?.profile?.ageRange || ``),
    [S, C] = (0, React.useState)(e?.profile?.hasKids || ``),
    [w, T] = (0, React.useState)(e?.profile?.location || ``),
    [E, ee] = (0, React.useState)(e?.username || ``),
    [D, O] = (0, React.useState)(e?.username ? !0 : null),
    k = !!e?.username,
    A = (e, t = `error`) => o({ message: e, tone: t });
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
        paddingTop: 96,
        paddingBottom: 64,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');\n        .cp-input:focus, .cp-select:focus { border-color: #40916C !important; box-shadow: 0 0 0 3px rgba(64,145,108,0.12); }\n      "
        }
      </style>
      <Navbar />
      <div style={{ maxWidth: 560, margin: `0 auto`, padding: `0 24px` }}>
        <h1
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 28,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 6,
          }}
        >
          Complete Your Profile
        </h1>
        <p style={{ fontSize: 13, color: `#3D6B55`, marginBottom: 28 }}>
          You signed in with Google, which only gave us your name and email. We
          need a few more details before you can start matching.
        </p>
        <form
          style={yr}
          onSubmit={async (e) => {
            if (
              (e.preventDefault(),
              !l.trim() || !p || !h.trim() || !_ || !b || !S || !w.trim())
            ) {
              A(`Please fill in every field to continue.`);
              return;
            }
            if (!k && (!E || D !== !0)) {
              A(
                D === !1
                  ? `Please choose a different, available username.`
                  : `Please choose a username.`,
              );
              return;
            }
            c(!0);
            try {
              let e = { phoneNumber: l.trim() };
              (d.trim() && (e.countryCode = d.trim()),
                k || (e.username = E),
                await api.patch(`/me`, e),
                await api.patch(`/me/profile`, {
                  gender: p,
                  nationality: h.trim(),
                  religion: _,
                  ageRange: b,
                  hasKids: S,
                  location: w.trim(),
                }),
                await t(),
                r(i.state?.from || `/explore`, { replace: !0 }));
            } catch (e) {
              A(e.message || `Could not save your profile. Please try again.`);
            } finally {
              c(!1);
            }
          }}
        >
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `auto 1fr`,
              gap: 16,
              marginBottom: 0,
            }}
          >
            <ProfileField label="Country Code">
              <input
                className="cp-input"
                style={{ ...xr, width: 90 }}
                value={d}
                onChange={(e) => f(e.target.value)}
                placeholder="+1"
              />
            </ProfileField>
            <ProfileField label="Phone Number">
              <input
                className="cp-input"
                style={xr}
                value={l}
                onChange={(e) => u(e.target.value)}
                placeholder="10-digit number"
                required={!0}
              />
            </ProfileField>
          </div>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `1fr 1fr`,
              gap: 16,
            }}
          >
            <ProfileField label="Gender">
              <select
                className="cp-select"
                style={xr}
                value={p}
                onChange={(e) => m(e.target.value)}
                required={!0}
              >
                <option value="">Select</option>
                {hr.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </ProfileField>
            <ProfileField label="Age Range">
              <select
                className="cp-select"
                style={xr}
                value={b}
                onChange={(e) => x(e.target.value)}
                required={!0}
              >
                <option value="">Select</option>
                {_r.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </ProfileField>
            <ProfileField label="Religion">
              <select
                className="cp-select"
                style={xr}
                value={_}
                onChange={(e) => y(e.target.value)}
                required={!0}
              >
                <option value="">Select</option>
                {gr.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </ProfileField>
            <ProfileField label="Have Kids?">
              <select
                className="cp-select"
                style={xr}
                value={S}
                onChange={(e) => C(e.target.value)}
                required={!0}
              >
                <option value="">Select</option>
                {vr.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </ProfileField>
          </div>
          <CountryStateSelect
            country={h}
            state={w}
            onCountryChange={g}
            onStateChange={T}
            inputStyle={xr}
            labelStyle={br}
            countryLabel="Country/Nationality"
            stateLabel="Location (State/Region)"
            required={!0}
          />
          <div style={Sr}>
            <UsernameField
              value={E}
              onChange={ee}
              onAvailabilityChange={O}
              inputStyle={xr}
              disabled={k}
            />
          </div>
          <button type="submit" disabled={s} style={Cr(s)}>
            {s ? `Saving…` : `Continue`}
          </button>
        </form>
        <button
          type="button"
          onClick={n}
          style={{
            display: `block`,
            margin: `0 auto`,
            background: `none`,
            border: `none`,
            color: `#74C69D`,
            fontSize: 12.5,
            fontWeight: 600,
            cursor: `pointer`,
          }}
        >
          Sign out
        </button>
      </div>
      {a && (
        <Toast message={a.message} tone={a.tone} onDismiss={() => o(null)} />
      )}
    </div>
  );
}
var CallContext = (0, React.createContext)(null);
function useCall() {
  let e = (0, React.useContext)(CallContext);
  if (!e) throw Error(`useCall must be used within a CallProvider`);
  return e;
}
// ===================== BEGIN socket.io-client v4 library (vendor code, not app code) =====================
// In the new project replace this whole block with:  import { io } from "socket.io-client";
var Or = Object.create(null);
((Or.open = `0`),
  (Or.close = `1`),
  (Or.ping = `2`),
  (Or.pong = `3`),
  (Or.message = `4`),
  (Or.upgrade = `5`),
  (Or.noop = `6`));
var kr = Object.create(null);
Object.keys(Or).forEach((e) => {
  kr[Or[e]] = e;
});
var Ar = { type: `error`, data: `parser error` },
  jr =
    typeof Blob == `function` ||
    (typeof Blob < `u` &&
      Object.prototype.toString.call(Blob) === `[object BlobConstructor]`),
  Mr = typeof ArrayBuffer == `function`,
  Nr = (e) =>
    typeof ArrayBuffer.isView == `function`
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  Pr = ({ type: e, data: t }, n, r) =>
    jr && t instanceof Blob
      ? n
        ? r(t)
        : Fr(t, r)
      : Mr && (t instanceof ArrayBuffer || Nr(t))
        ? n
          ? r(t)
          : Fr(new Blob([t]), r)
        : r(Or[e] + (t || ``)),
  Fr = (e, t) => {
    let n = new FileReader();
    return (
      (n.onload = function () {
        let e = n.result.split(`,`)[1];
        t(`b` + (e || ``));
      }),
      n.readAsDataURL(e)
    );
  };
function Ir(e) {
  return e instanceof Uint8Array
    ? e
    : e instanceof ArrayBuffer
      ? new Uint8Array(e)
      : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
var Lr;
function Rr(e, t) {
  if (jr && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ir).then(t);
  if (Mr && (e.data instanceof ArrayBuffer || Nr(e.data))) return t(Ir(e.data));
  Pr(e, !1, (e) => {
    ((Lr ||= new TextEncoder()), t(Lr.encode(e)));
  });
}
var zr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
  Br = typeof Uint8Array > `u` ? [] : new Uint8Array(256);
for (let e = 0; e < 64; e++) Br[zr.charCodeAt(e)] = e;
var Vr = (e) => {
    let t = e.length * 0.75,
      n = e.length,
      r,
      i = 0,
      a,
      o,
      s,
      c;
    e[e.length - 1] === `=` && (t--, e[e.length - 2] === `=` && t--);
    let l = new ArrayBuffer(t),
      u = new Uint8Array(l);
    for (r = 0; r < n; r += 4)
      ((a = Br[e.charCodeAt(r)]),
        (o = Br[e.charCodeAt(r + 1)]),
        (s = Br[e.charCodeAt(r + 2)]),
        (c = Br[e.charCodeAt(r + 3)]),
        (u[i++] = (a << 2) | (o >> 4)),
        (u[i++] = ((o & 15) << 4) | (s >> 2)),
        (u[i++] = ((s & 3) << 6) | (c & 63)));
    return l;
  },
  Hr = typeof ArrayBuffer == `function`,
  Ur = (e, t) => {
    if (typeof e != `string`) return { type: `message`, data: Gr(e, t) };
    let n = e.charAt(0);
    return n === `b`
      ? { type: `message`, data: Wr(e.substring(1), t) }
      : kr[n]
        ? e.length > 1
          ? { type: kr[n], data: e.substring(1) }
          : { type: kr[n] }
        : Ar;
  },
  Wr = (e, t) => (Hr ? Gr(Vr(e), t) : { base64: !0, data: e }),
  Gr = (e, t) => {
    switch (t) {
      case `blob`:
        return e instanceof Blob ? e : new Blob([e]);
      default:
        return e instanceof ArrayBuffer ? e : e.buffer;
    }
  },
  Kr = ``,
  qr = (e, t) => {
    let n = e.length,
      r = Array(n),
      i = 0;
    e.forEach((e, a) => {
      Pr(e, !1, (e) => {
        ((r[a] = e), ++i === n && t(r.join(Kr)));
      });
    });
  },
  Jr = (e, t) => {
    let n = e.split(Kr),
      r = [];
    for (let e = 0; e < n.length; e++) {
      let i = Ur(n[e], t);
      if ((r.push(i), i.type === `error`)) break;
    }
    return r;
  };
function Yr() {
  return new TransformStream({
    transform(e, t) {
      Rr(e, (n) => {
        let r = n.length,
          i;
        if (r < 126)
          ((i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, r));
        else if (r < 65536) {
          i = new Uint8Array(3);
          let e = new DataView(i.buffer);
          (e.setUint8(0, 126), e.setUint16(1, r));
        } else {
          i = new Uint8Array(9);
          let e = new DataView(i.buffer);
          (e.setUint8(0, 127), e.setBigUint64(1, BigInt(r)));
        }
        (e.data && typeof e.data != `string` && (i[0] |= 128),
          t.enqueue(i),
          t.enqueue(n));
      });
    },
  });
}
var Xr;
function Zr(e) {
  return e.reduce((e, t) => e + t.length, 0);
}
function Qr(e, t) {
  if (e[0].length === t) return e.shift();
  let n = new Uint8Array(t),
    r = 0;
  for (let i = 0; i < t; i++)
    ((n[i] = e[0][r++]), r === e[0].length && (e.shift(), (r = 0)));
  return (e.length && r < e[0].length && (e[0] = e[0].slice(r)), n);
}
function $r(e, t) {
  Xr ||= new TextDecoder();
  let n = [],
    r = 0,
    i = -1,
    a = !1;
  return new TransformStream({
    transform(o, s) {
      for (n.push(o); ; ) {
        if (r === 0) {
          if (Zr(n) < 1) break;
          let e = Qr(n, 1);
          ((a = (e[0] & 128) == 128),
            (i = e[0] & 127),
            (r = i < 126 ? 3 : i === 126 ? 1 : 2));
        } else if (r === 1) {
          if (Zr(n) < 2) break;
          let e = Qr(n, 2);
          ((i = new DataView(e.buffer, e.byteOffset, e.length).getUint16(0)),
            (r = 3));
        } else if (r === 2) {
          if (Zr(n) < 8) break;
          let e = Qr(n, 8),
            t = new DataView(e.buffer, e.byteOffset, e.length),
            a = t.getUint32(0);
          if (a > 2 ** 21 - 1) {
            s.enqueue(Ar);
            break;
          }
          ((i = a * 2 ** 32 + t.getUint32(4)), (r = 3));
        } else {
          if (Zr(n) < i) break;
          let e = Qr(n, i);
          (s.enqueue(Ur(a ? e : Xr.decode(e), t)), (r = 0));
        }
        if (i === 0 || i > e) {
          s.enqueue(Ar);
          break;
        }
      }
    },
  });
}
function ei(e) {
  if (e) return ti(e);
}
function ti(e) {
  for (var t in ei.prototype) e[t] = ei.prototype[t];
  return e;
}
((ei.prototype.on = ei.prototype.addEventListener =
  function (e, t) {
    return (
      (this._callbacks = this._callbacks || {}),
      (this._callbacks[`$` + e] = this._callbacks[`$` + e] || []).push(t),
      this
    );
  }),
  (ei.prototype.once = function (e, t) {
    function n() {
      (this.off(e, n), t.apply(this, arguments));
    }
    return ((n.fn = t), this.on(e, n), this);
  }),
  (ei.prototype.off =
    ei.prototype.removeListener =
    ei.prototype.removeAllListeners =
    ei.prototype.removeEventListener =
      function (e, t) {
        if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
          return ((this._callbacks = {}), this);
        var n = this._callbacks[`$` + e];
        if (!n) return this;
        if (arguments.length == 1)
          return (delete this._callbacks[`$` + e], this);
        for (var r, i = 0; i < n.length; i++)
          if (((r = n[i]), r === t || r.fn === t)) {
            n.splice(i, 1);
            break;
          }
        return (n.length === 0 && delete this._callbacks[`$` + e], this);
      }),
  (ei.prototype.emit = function (e) {
    this._callbacks = this._callbacks || {};
    for (
      var t = Array(arguments.length - 1), n = this._callbacks[`$` + e], r = 1;
      r < arguments.length;
      r++
    )
      t[r - 1] = arguments[r];
    if (n) {
      n = n.slice(0);
      for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t);
    }
    return this;
  }),
  (ei.prototype.emitReserved = ei.prototype.emit),
  (ei.prototype.listeners = function (e) {
    return (
      (this._callbacks = this._callbacks || {}),
      this._callbacks[`$` + e] || []
    );
  }),
  (ei.prototype.hasListeners = function (e) {
    return !!this.listeners(e).length;
  }));
var ni =
    typeof Promise == `function` && typeof Promise.resolve == `function`
      ? (e) => Promise.resolve().then(e)
      : (e, t) => t(e, 0),
  ri =
    typeof self < `u`
      ? self
      : typeof window < `u`
        ? window
        : Function(`return this`)(),
  ii = `arraybuffer`;
function ai(e, ...t) {
  return t.reduce((t, n) => (e.hasOwnProperty(n) && (t[n] = e[n]), t), {});
}
var oi = ri.setTimeout,
  si = ri.clearTimeout;
function ci(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = oi.bind(ri)), (e.clearTimeoutFn = si.bind(ri)))
    : ((e.setTimeoutFn = ri.setTimeout.bind(ri)),
      (e.clearTimeoutFn = ri.clearTimeout.bind(ri)));
}
var li = 1.33;
function ui(e) {
  return typeof e == `string`
    ? di(e)
    : Math.ceil((e.byteLength || e.size) * li);
}
function di(e) {
  let t = 0,
    n = 0;
  for (let r = 0, i = e.length; r < i; r++)
    ((t = e.charCodeAt(r)),
      t < 128
        ? (n += 1)
        : t < 2048
          ? (n += 2)
          : t < 55296 || t >= 57344
            ? (n += 3)
            : (r++, (n += 4)));
  return n;
}
function fi() {
  return (
    Date.now().toString(36).substring(3) +
    Math.random().toString(36).substring(2, 5)
  );
}
function pi(e) {
  let t = ``;
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += `&`),
      (t += encodeURIComponent(n) + `=` + encodeURIComponent(e[n])));
  return t;
}
function mi(e) {
  let t = {},
    n = e.split(`&`);
  for (let e = 0, r = n.length; e < r; e++) {
    let r = n[e].split(`=`);
    t[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return t;
}
var hi = class extends Error {
    constructor(e, t, n) {
      (super(e),
        (this.description = t),
        (this.context = n),
        (this.type = `TransportError`));
    }
  },
  gi = class extends ei {
    constructor(e) {
      (super(),
        (this.writable = !1),
        ci(this, e),
        (this.opts = e),
        (this.query = e.query),
        (this.socket = e.socket),
        (this.supportsBinary = !e.forceBase64));
    }
    onError(e, t, n) {
      return (super.emitReserved(`error`, new hi(e, t, n)), this);
    }
    open() {
      return ((this.readyState = `opening`), this.doOpen(), this);
    }
    close() {
      return (
        (this.readyState === `opening` || this.readyState === `open`) &&
          (this.doClose(), this.onClose()),
        this
      );
    }
    send(e) {
      this.readyState === `open` && this.write(e);
    }
    onOpen() {
      ((this.readyState = `open`),
        (this.writable = !0),
        super.emitReserved(`open`));
    }
    onData(e) {
      let t = Ur(e, this.socket.binaryType);
      this.onPacket(t);
    }
    onPacket(e) {
      super.emitReserved(`packet`, e);
    }
    onClose(e) {
      ((this.readyState = `closed`), super.emitReserved(`close`, e));
    }
    pause(e) {}
    createUri(e, t = {}) {
      return (
        e +
        `://` +
        this._hostname() +
        this._port() +
        this.opts.path +
        this._query(t)
      );
    }
    _hostname() {
      let e = this.opts.hostname;
      return e.indexOf(`:`) === -1 ? e : `[` + e + `]`;
    }
    _port() {
      return this.opts.port &&
        ((this.opts.secure && Number(this.opts.port) !== 443) ||
          (!this.opts.secure && Number(this.opts.port) !== 80))
        ? `:` + this.opts.port
        : ``;
    }
    _query(e) {
      let t = pi(e);
      return t.length ? `?` + t : ``;
    }
  },
  _i = class extends gi {
    constructor() {
      (super(...arguments), (this._polling = !1));
    }
    get name() {
      return `polling`;
    }
    doOpen() {
      this._poll();
    }
    pause(e) {
      this.readyState = `pausing`;
      let t = () => {
        ((this.readyState = `paused`), e());
      };
      if (this._polling || !this.writable) {
        let e = 0;
        (this._polling &&
          (e++,
          this.once(`pollComplete`, function () {
            --e || t();
          })),
          this.writable ||
            (e++,
            this.once(`drain`, function () {
              --e || t();
            })));
      } else t();
    }
    _poll() {
      ((this._polling = !0), this.doPoll(), this.emitReserved(`poll`));
    }
    onData(e) {
      (Jr(e, this.socket.binaryType).forEach((e) => {
        if (
          (this.readyState === `opening` && e.type === `open` && this.onOpen(),
          e.type === `close`)
        )
          return (
            this.onClose({ description: `transport closed by the server` }),
            !1
          );
        this.onPacket(e);
      }),
        this.readyState !== `closed` &&
          ((this._polling = !1),
          this.emitReserved(`pollComplete`),
          this.readyState === `open` && this._poll()));
    }
    doClose() {
      let e = () => {
        this.write([{ type: `close` }]);
      };
      this.readyState === `open` ? e() : this.once(`open`, e);
    }
    write(e) {
      ((this.writable = !1),
        qr(e, (e) => {
          this.doWrite(e, () => {
            ((this.writable = !0), this.emitReserved(`drain`));
          });
        }));
    }
    uri() {
      let e = this.opts.secure ? `https` : `http`,
        t = this.query || {};
      return (
        !1 !== this.opts.timestampRequests &&
          (t[this.opts.timestampParam] = fi()),
        !this.supportsBinary && !t.sid && (t.b64 = 1),
        this.createUri(e, t)
      );
    }
  },
  vi = !1;
try {
  vi = typeof XMLHttpRequest < `u` && `withCredentials` in new XMLHttpRequest();
} catch {}
var yi = vi;
function bi() {}
var xi = class extends _i {
    constructor(e) {
      if ((super(e), typeof location < `u`)) {
        let t = location.protocol === `https:`,
          n = location.port;
        ((n ||= t ? `443` : `80`),
          (this.xd =
            (typeof location < `u` && e.hostname !== location.hostname) ||
            n !== e.port));
      }
    }
    doWrite(e, t) {
      let n = this.request({ method: `POST`, data: e });
      (n.on(`success`, t),
        n.on(`error`, (e, t) => {
          this.onError(`xhr post error`, e, t);
        }));
    }
    doPoll() {
      let e = this.request();
      (e.on(`data`, this.onData.bind(this)),
        e.on(`error`, (e, t) => {
          this.onError(`xhr poll error`, e, t);
        }),
        (this.pollXhr = e));
    }
  },
  Si = class e extends ei {
    constructor(e, t, n) {
      (super(),
        (this.createRequest = e),
        ci(this, n),
        (this._opts = n),
        (this._method = n.method || `GET`),
        (this._uri = t),
        (this._data = n.data === void 0 ? null : n.data),
        this._create());
    }
    _create() {
      var t;
      let n = ai(
        this._opts,
        `agent`,
        `pfx`,
        `key`,
        `passphrase`,
        `cert`,
        `ca`,
        `ciphers`,
        `rejectUnauthorized`,
        `autoUnref`,
      );
      n.xdomain = !!this._opts.xd;
      let r = (this._xhr = this.createRequest(n));
      try {
        r.open(this._method, this._uri, !0);
        try {
          if (this._opts.extraHeaders) {
            r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
            for (let e in this._opts.extraHeaders)
              this._opts.extraHeaders.hasOwnProperty(e) &&
                r.setRequestHeader(e, this._opts.extraHeaders[e]);
          }
        } catch {}
        if (this._method === `POST`)
          try {
            r.setRequestHeader(`Content-type`, `text/plain;charset=UTF-8`);
          } catch {}
        try {
          r.setRequestHeader(`Accept`, `*/*`);
        } catch {}
        ((t = this._opts.cookieJar) == null || t.addCookies(r),
          `withCredentials` in r &&
            (r.withCredentials = this._opts.withCredentials),
          this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout),
          (r.onreadystatechange = () => {
            var e;
            (r.readyState === 3 &&
              ((e = this._opts.cookieJar) == null ||
                e.parseCookies(r.getResponseHeader(`set-cookie`))),
              r.readyState === 4 &&
                (r.status === 200 || r.status === 1223
                  ? this._onLoad()
                  : this.setTimeoutFn(() => {
                      this._onError(typeof r.status == `number` ? r.status : 0);
                    }, 0)));
          }),
          r.send(this._data));
      } catch (e) {
        this.setTimeoutFn(() => {
          this._onError(e);
        }, 0);
        return;
      }
      typeof document < `u` &&
        ((this._index = e.requestsCount++), (e.requests[this._index] = this));
    }
    _onError(e) {
      (this.emitReserved(`error`, e, this._xhr), this._cleanup(!0));
    }
    _cleanup(t) {
      if (!(this._xhr === void 0 || this._xhr === null)) {
        if (((this._xhr.onreadystatechange = bi), t))
          try {
            this._xhr.abort();
          } catch {}
        (typeof document < `u` && delete e.requests[this._index],
          (this._xhr = null));
      }
    }
    _onLoad() {
      let e = this._xhr.responseText;
      e !== null &&
        (this.emitReserved(`data`, e),
        this.emitReserved(`success`),
        this._cleanup());
    }
    abort() {
      this._cleanup();
    }
  };
if (((Si.requestsCount = 0), (Si.requests = {}), typeof document < `u`)) {
  if (typeof attachEvent == `function`) attachEvent(`onunload`, Ci);
  else if (typeof addEventListener == `function`) {
    let e = `onpagehide` in ri ? `pagehide` : `unload`;
    addEventListener(e, Ci, !1);
  }
}
function Ci() {
  for (let e in Si.requests)
    Si.requests.hasOwnProperty(e) && Si.requests[e].abort();
}
var wi = (function () {
    let e = Ei({ xdomain: !1 });
    return e && e.responseType !== null;
  })(),
  Ti = class extends xi {
    constructor(e) {
      super(e);
      let t = e && e.forceBase64;
      this.supportsBinary = wi && !t;
    }
    request(e = {}) {
      return (
        Object.assign(e, { xd: this.xd }, this.opts),
        new Si(Ei, this.uri(), e)
      );
    }
  };
function Ei(e) {
  let t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < `u` && (!t || yi)) return new XMLHttpRequest();
  } catch {}
  if (!t)
    try {
      return new ri[[`Active`, `Object`].join(`X`)](`Microsoft.XMLHTTP`);
    } catch {}
}
var Di =
    typeof navigator < `u` &&
    typeof navigator.product == `string` &&
    navigator.product.toLowerCase() === `reactnative`,
  Oi = class extends gi {
    get name() {
      return `websocket`;
    }
    doOpen() {
      let e = this.uri(),
        t = this.opts.protocols,
        n = Di
          ? {}
          : ai(
              this.opts,
              `agent`,
              `perMessageDeflate`,
              `pfx`,
              `key`,
              `passphrase`,
              `cert`,
              `ca`,
              `ciphers`,
              `rejectUnauthorized`,
              `localAddress`,
              `protocolVersion`,
              `origin`,
              `maxPayload`,
              `family`,
              `checkServerIdentity`,
            );
      this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
      try {
        this.ws = this.createSocket(e, t, n);
      } catch (e) {
        return this.emitReserved(`error`, e);
      }
      ((this.ws.binaryType = this.socket.binaryType), this.addEventListeners());
    }
    addEventListeners() {
      ((this.ws.onopen = () => {
        (this.opts.autoUnref && this.ws._socket.unref(), this.onOpen());
      }),
        (this.ws.onclose = (e) =>
          this.onClose({
            description: `websocket connection closed`,
            context: e,
          })),
        (this.ws.onmessage = (e) => this.onData(e.data)),
        (this.ws.onerror = (e) => this.onError(`websocket error`, e)));
    }
    write(e) {
      this.writable = !1;
      for (let t = 0; t < e.length; t++) {
        let n = e[t],
          r = t === e.length - 1;
        Pr(n, this.supportsBinary, (e) => {
          try {
            this.doWrite(n, e);
          } catch {}
          r &&
            ni(() => {
              ((this.writable = !0), this.emitReserved(`drain`));
            }, this.setTimeoutFn);
        });
      }
    }
    doClose() {
      this.ws !== void 0 &&
        ((this.ws.onerror = () => {}), this.ws.close(), (this.ws = null));
    }
    uri() {
      let e = this.opts.secure ? `wss` : `ws`,
        t = this.query || {};
      return (
        this.opts.timestampRequests && (t[this.opts.timestampParam] = fi()),
        this.supportsBinary || (t.b64 = 1),
        this.createUri(e, t)
      );
    }
  },
  ki = ri.WebSocket || ri.MozWebSocket,
  Ai = {
    websocket: class extends Oi {
      createSocket(e, t, n) {
        return Di ? new ki(e, t, n) : t ? new ki(e, t) : new ki(e);
      }
      doWrite(e, t) {
        this.ws.send(t);
      }
    },
    webtransport: class extends gi {
      get name() {
        return `webtransport`;
      }
      doOpen() {
        try {
          this._transport = new WebTransport(
            this.createUri(`https`),
            this.opts.transportOptions[this.name],
          );
        } catch (e) {
          return this.emitReserved(`error`, e);
        }
        (this._transport.closed
          .then(() => {
            this.onClose();
          })
          .catch((e) => {
            this.onError(`webtransport error`, e);
          }),
          this._transport.ready.then(() => {
            this._transport.createBidirectionalStream().then((e) => {
              let t = $r(2 ** 53 - 1, this.socket.binaryType),
                n = e.readable.pipeThrough(t).getReader(),
                r = Yr();
              (r.readable.pipeTo(e.writable),
                (this._writer = r.writable.getWriter()));
              let i = () => {
                n.read()
                  .then(({ done: e, value: t }) => {
                    e || (this.onPacket(t), i());
                  })
                  .catch((e) => {});
              };
              i();
              let a = { type: `open` };
              (this.query.sid && (a.data = `{"sid":"${this.query.sid}"}`),
                this._writer.write(a).then(() => this.onOpen()));
            });
          }));
      }
      write(e) {
        this.writable = !1;
        for (let t = 0; t < e.length; t++) {
          let n = e[t],
            r = t === e.length - 1;
          this._writer.write(n).then(() => {
            r &&
              ni(() => {
                ((this.writable = !0), this.emitReserved(`drain`));
              }, this.setTimeoutFn);
          });
        }
      }
      doClose() {
        var e;
        (e = this._transport) == null || e.close();
      }
    },
    polling: Ti,
  },
  ji =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  Mi = [
    `source`,
    `protocol`,
    `authority`,
    `userInfo`,
    `user`,
    `password`,
    `host`,
    `port`,
    `relative`,
    `path`,
    `directory`,
    `file`,
    `query`,
    `anchor`,
  ];
function V(e) {
  if (e.length > 8e3) throw `URI too long`;
  let t = e,
    n = e.indexOf(`[`),
    r = e.indexOf(`]`);
  n != -1 &&
    r != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, r).replace(/:/g, `;`) +
      e.substring(r, e.length));
  let i = ji.exec(e || ``),
    a = {},
    o = 14;
  for (; o--; ) a[Mi[o]] = i[o] || ``;
  return (
    n != -1 &&
      r != -1 &&
      ((a.source = t),
      (a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, `:`)),
      (a.authority = a.authority
        .replace(`[`, ``)
        .replace(`]`, ``)
        .replace(/;/g, `:`)),
      (a.ipv6uri = !0)),
    (a.pathNames = Ni(a, a.path)),
    (a.queryKey = Pi(a, a.query)),
    a
  );
}
function Ni(e, t) {
  let n = t.replace(/\/{2,9}/g, `/`).split(`/`);
  return (
    (t.slice(0, 1) == `/` || t.length === 0) && n.splice(0, 1),
    t.slice(-1) == `/` && n.splice(n.length - 1, 1),
    n
  );
}
function Pi(e, t) {
  let n = {};
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (e, t, r) {
      t && (n[t] = r);
    }),
    n
  );
}
var Fi =
    typeof addEventListener == `function` &&
    typeof removeEventListener == `function`,
  Ii = [];
Fi &&
  addEventListener(
    `offline`,
    () => {
      Ii.forEach((e) => e());
    },
    !1,
  );
var Li = class e extends ei {
  constructor(e, t) {
    if (
      (super(),
      (this.binaryType = ii),
      (this.writeBuffer = []),
      (this._prevBufferLen = 0),
      (this._pingInterval = -1),
      (this._pingTimeout = -1),
      (this._maxPayload = -1),
      (this._pingTimeoutTime = 1 / 0),
      e && typeof e == `object` && ((t = e), (e = null)),
      e)
    ) {
      let n = V(e);
      ((t.hostname = n.host),
        (t.secure = n.protocol === `https` || n.protocol === `wss`),
        (t.port = n.port),
        n.query && (t.query = n.query));
    } else t.host && (t.hostname = V(t.host).host);
    (ci(this, t),
      (this.secure =
        t.secure == null
          ? typeof location < `u` && location.protocol === `https:`
          : t.secure),
      t.hostname && !t.port && (t.port = this.secure ? `443` : `80`),
      (this.hostname =
        t.hostname ||
        (typeof location < `u` ? location.hostname : `localhost`)),
      (this.port =
        t.port ||
        (typeof location < `u` && location.port
          ? location.port
          : this.secure
            ? `443`
            : `80`)),
      (this.transports = []),
      (this._transportsByName = {}),
      t.transports.forEach((e) => {
        let t = e.prototype.name;
        (this.transports.push(t), (this._transportsByName[t] = e));
      }),
      (this.opts = Object.assign(
        {
          path: `/engine.io`,
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: `t`,
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        t,
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, ``) +
        (this.opts.addTrailingSlash ? `/` : ``)),
      typeof this.opts.query == `string` &&
        (this.opts.query = mi(this.opts.query)),
      Fi &&
        (this.opts.closeOnBeforeunload &&
          ((this._beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener(
            `beforeunload`,
            this._beforeunloadEventListener,
            !1,
          )),
        this.hostname !== `localhost` &&
          ((this._offlineEventListener = () => {
            this._onClose(`transport close`, {
              description: `network connection lost`,
            });
          }),
          Ii.push(this._offlineEventListener))),
      this.opts.withCredentials && (this._cookieJar = void 0),
      this._open());
  }
  createTransport(e) {
    let t = Object.assign({}, this.opts.query);
    ((t.EIO = 4), (t.transport = e), this.id && (t.sid = this.id));
    let n = Object.assign(
      {},
      this.opts,
      {
        query: t,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port,
      },
      this.opts.transportOptions[e],
    );
    return new this._transportsByName[e](n);
  }
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved(`error`, `No transports available`);
      }, 0);
      return;
    }
    let t =
      this.opts.rememberUpgrade &&
      e.priorWebsocketSuccess &&
      this.transports.indexOf(`websocket`) !== -1
        ? `websocket`
        : this.transports[0];
    this.readyState = `opening`;
    let n = this.createTransport(t);
    (n.open(), this.setTransport(n));
  }
  setTransport(e) {
    (this.transport && this.transport.removeAllListeners(),
      (this.transport = e),
      e
        .on(`drain`, this._onDrain.bind(this))
        .on(`packet`, this._onPacket.bind(this))
        .on(`error`, this._onError.bind(this))
        .on(`close`, (e) => this._onClose(`transport close`, e)));
  }
  onOpen() {
    ((this.readyState = `open`),
      (e.priorWebsocketSuccess = this.transport.name === `websocket`),
      this.emitReserved(`open`),
      this.flush());
  }
  _onPacket(e) {
    if (
      this.readyState === `opening` ||
      this.readyState === `open` ||
      this.readyState === `closing`
    )
      switch (
        (this.emitReserved(`packet`, e), this.emitReserved(`heartbeat`), e.type)
      ) {
        case `open`:
          this.onHandshake(JSON.parse(e.data));
          break;
        case `ping`:
          (this._sendPacket(`pong`),
            this.emitReserved(`ping`),
            this.emitReserved(`pong`),
            this._resetPingTimeout());
          break;
        case `error`:
          let t = Error(`server error`);
          ((t.code = e.data), this._onError(t));
          break;
        case `message`:
          (this.emitReserved(`data`, e.data),
            this.emitReserved(`message`, e.data));
          break;
      }
  }
  onHandshake(e) {
    (this.emitReserved(`handshake`, e),
      (this.id = e.sid),
      (this.transport.query.sid = e.sid),
      (this._pingInterval = e.pingInterval),
      (this._pingTimeout = e.pingTimeout),
      (this._maxPayload = e.maxPayload),
      this.onOpen(),
      this.readyState !== `closed` && this._resetPingTimeout());
  }
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    let e = this._pingInterval + this._pingTimeout;
    ((this._pingTimeoutTime = Date.now() + e),
      (this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose(`ping timeout`);
      }, e)),
      this.opts.autoUnref && this._pingTimeoutTimer.unref());
  }
  _onDrain() {
    (this.writeBuffer.splice(0, this._prevBufferLen),
      (this._prevBufferLen = 0),
      this.writeBuffer.length === 0
        ? this.emitReserved(`drain`)
        : this.flush());
  }
  flush() {
    if (
      this.readyState !== `closed` &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      let e = this._getWritablePackets();
      (this.transport.send(e),
        (this._prevBufferLen = e.length),
        this.emitReserved(`flush`));
    }
  }
  _getWritablePackets() {
    if (
      !(
        this._maxPayload &&
        this.transport.name === `polling` &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer;
    let e = 1;
    for (let t = 0; t < this.writeBuffer.length; t++) {
      let n = this.writeBuffer[t].data;
      if ((n && (e += ui(n)), t > 0 && e > this._maxPayload))
        return this.writeBuffer.slice(0, t);
      e += 2;
    }
    return this.writeBuffer;
  }
  _hasPingExpired() {
    if (!this._pingTimeoutTime) return !0;
    let e = Date.now() > this._pingTimeoutTime;
    return (
      e &&
        ((this._pingTimeoutTime = 0),
        ni(() => {
          this._onClose(`ping timeout`);
        }, this.setTimeoutFn)),
      e
    );
  }
  write(e, t, n) {
    return (this._sendPacket(`message`, e, t, n), this);
  }
  send(e, t, n) {
    return (this._sendPacket(`message`, e, t, n), this);
  }
  _sendPacket(e, t, n, r) {
    if (
      (typeof t == `function` && ((r = t), (t = void 0)),
      typeof n == `function` && ((r = n), (n = null)),
      this.readyState === `closing` || this.readyState === `closed`)
    )
      return;
    ((n ||= {}), (n.compress = !1 !== n.compress));
    let i = { type: e, data: t, options: n };
    (this.emitReserved(`packetCreate`, i),
      this.writeBuffer.push(i),
      r && this.once(`flush`, r),
      this.flush());
  }
  close() {
    let e = () => {
        (this._onClose(`forced close`), this.transport.close());
      },
      t = () => {
        (this.off(`upgrade`, t), this.off(`upgradeError`, t), e());
      },
      n = () => {
        (this.once(`upgrade`, t), this.once(`upgradeError`, t));
      };
    return (
      (this.readyState === `opening` || this.readyState === `open`) &&
        ((this.readyState = `closing`),
        this.writeBuffer.length
          ? this.once(`drain`, () => {
              this.upgrading ? n() : e();
            })
          : this.upgrading
            ? n()
            : e()),
      this
    );
  }
  _onError(t) {
    if (
      ((e.priorWebsocketSuccess = !1),
      this.opts.tryAllTransports &&
        this.transports.length > 1 &&
        this.readyState === `opening`)
    )
      return (this.transports.shift(), this._open());
    (this.emitReserved(`error`, t), this._onClose(`transport error`, t));
  }
  _onClose(e, t) {
    if (
      this.readyState === `opening` ||
      this.readyState === `open` ||
      this.readyState === `closing`
    ) {
      if (
        (this.clearTimeoutFn(this._pingTimeoutTimer),
        this.transport.removeAllListeners(`close`),
        this.transport.close(),
        this.transport.removeAllListeners(),
        Fi &&
          (this._beforeunloadEventListener &&
            removeEventListener(
              `beforeunload`,
              this._beforeunloadEventListener,
              !1,
            ),
          this._offlineEventListener))
      ) {
        let e = Ii.indexOf(this._offlineEventListener);
        e !== -1 && Ii.splice(e, 1);
      }
      ((this.readyState = `closed`),
        (this.id = null),
        this.emitReserved(`close`, e, t),
        (this.writeBuffer = []),
        (this._prevBufferLen = 0));
    }
  }
};
Li.protocol = 4;
var Ri = class extends Li {
    constructor() {
      (super(...arguments), (this._upgrades = []));
    }
    onOpen() {
      if ((super.onOpen(), this.readyState === `open` && this.opts.upgrade))
        for (let e = 0; e < this._upgrades.length; e++)
          this._probe(this._upgrades[e]);
    }
    _probe(e) {
      let t = this.createTransport(e),
        n = !1;
      Li.priorWebsocketSuccess = !1;
      let r = () => {
        n ||
          (t.send([{ type: `ping`, data: `probe` }]),
          t.once(`packet`, (e) => {
            if (!n)
              if (e.type === `pong` && e.data === `probe`) {
                if (
                  ((this.upgrading = !0), this.emitReserved(`upgrading`, t), !t)
                )
                  return;
                ((Li.priorWebsocketSuccess = t.name === `websocket`),
                  this.transport.pause(() => {
                    n ||
                      (this.readyState !== `closed` &&
                        (l(),
                        this.setTransport(t),
                        t.send([{ type: `upgrade` }]),
                        this.emitReserved(`upgrade`, t),
                        (t = null),
                        (this.upgrading = !1),
                        this.flush()));
                  }));
              } else {
                let e = Error(`probe error`);
                ((e.transport = t.name), this.emitReserved(`upgradeError`, e));
              }
          }));
      };
      function i() {
        n || ((n = !0), l(), t.close(), (t = null));
      }
      let a = (e) => {
        let n = Error(`probe error: ` + e);
        ((n.transport = t.name), i(), this.emitReserved(`upgradeError`, n));
      };
      function o() {
        a(`transport closed`);
      }
      function s() {
        a(`socket closed`);
      }
      function c(e) {
        t && e.name !== t.name && i();
      }
      let l = () => {
        (t.removeListener(`open`, r),
          t.removeListener(`error`, a),
          t.removeListener(`close`, o),
          this.off(`close`, s),
          this.off(`upgrading`, c));
      };
      (t.once(`open`, r),
        t.once(`error`, a),
        t.once(`close`, o),
        this.once(`close`, s),
        this.once(`upgrading`, c),
        this._upgrades.indexOf(`webtransport`) !== -1 && e !== `webtransport`
          ? this.setTimeoutFn(() => {
              n || t.open();
            }, 200)
          : t.open());
    }
    onHandshake(e) {
      ((this._upgrades = this._filterUpgrades(e.upgrades)),
        super.onHandshake(e));
    }
    _filterUpgrades(e) {
      let t = [];
      for (let n = 0; n < e.length; n++)
        ~this.transports.indexOf(e[n]) && t.push(e[n]);
      return t;
    }
  },
  zi = class extends Ri {
    constructor(e, t = {}) {
      let n = typeof e == `object`,
        r = n ? { ...e } : { ...t };
      ((!r.transports ||
        (r.transports && typeof r.transports[0] == `string`)) &&
        (r.transports = (
          r.transports || [`polling`, `websocket`, `webtransport`]
        )
          .map((e) => Ai[e])
          .filter((e) => !!e)),
        super(n ? r : e, r));
    }
  };
zi.protocol;
function Bi(e, t = ``, n) {
  let r = e;
  ((n ||= typeof location < `u` && location),
    (e ??= n.protocol + `//` + n.host),
    typeof e == `string` &&
      (e.charAt(0) === `/` &&
        (e = e.charAt(1) === `/` ? n.protocol + e : n.host + e),
      /^(https?|wss?):\/\//.test(e) ||
        (e = n === void 0 ? `https://` + e : n.protocol + `//` + e),
      (r = V(e))),
    r.port ||
      (/^(http|ws)$/.test(r.protocol)
        ? (r.port = `80`)
        : /^(http|ws)s$/.test(r.protocol) && (r.port = `443`)),
    (r.path = r.path || `/`));
  let i = r.host.indexOf(`:`) === -1 ? r.host : `[` + r.host + `]`;
  return (
    (r.id = r.protocol + `://` + i + `:` + r.port + t),
    (r.href =
      r.protocol + `://` + i + (n && n.port === r.port ? `` : `:` + r.port)),
    r
  );
}
var Vi = typeof ArrayBuffer == `function`,
  Hi = (e) =>
    typeof ArrayBuffer.isView == `function`
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  Ui = Object.prototype.toString,
  Wi =
    typeof Blob == `function` ||
    (typeof Blob < `u` && Ui.call(Blob) === `[object BlobConstructor]`),
  Gi =
    typeof File == `function` ||
    (typeof File < `u` && Ui.call(File) === `[object FileConstructor]`);
function Ki(e) {
  return (
    (Vi && (e instanceof ArrayBuffer || Hi(e))) ||
    (Wi && e instanceof Blob) ||
    (Gi && e instanceof File)
  );
}
function qi(e, t) {
  if (!e || typeof e != `object`) return !1;
  if (Array.isArray(e)) {
    for (let t = 0, n = e.length; t < n; t++) if (qi(e[t])) return !0;
    return !1;
  }
  if (Ki(e)) return !0;
  if (e.toJSON && typeof e.toJSON == `function` && arguments.length === 1)
    return qi(e.toJSON(), !0);
  for (let t in e)
    if (Object.prototype.hasOwnProperty.call(e, t) && qi(e[t])) return !0;
  return !1;
}
function Ji(e) {
  let t = [],
    n = e.data,
    r = e;
  return (
    (r.data = Yi(n, t)),
    (r.attachments = t.length),
    { packet: r, buffers: t }
  );
}
function Yi(e, t, n) {
  if (!e) return e;
  if (Ki(e)) {
    let n = { _placeholder: !0, num: t.length };
    return (t.push(e), n);
  } else if (Array.isArray(e)) {
    let n = Array(e.length);
    for (let r = 0; r < e.length; r++) n[r] = Yi(e[r], t);
    return n;
  } else if (typeof e == `object` && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == `function` && !n)
      return Yi(e.toJSON(), t, !0);
    let r = {};
    for (let n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (r[n] = Yi(e[n], t));
    return r;
  }
  return e;
}
function Xi(e, t) {
  return ((e.data = Zi(e.data, t)), delete e.attachments, e);
}
function Zi(e, t) {
  if (!e) return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == `number` && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw Error(`illegal attachments`);
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++) e[n] = Zi(e[n], t);
  else if (typeof e == `object`)
    for (let n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Zi(e[n], t));
  return e;
}
var Qi = s({
    Decoder: () => ta,
    Encoder: () => ea,
    PacketType: () => H,
    isPacketValid: () => ca,
    protocol: () => 5,
  }),
  $i = [
    `connect`,
    `connect_error`,
    `disconnect`,
    `disconnecting`,
    `newListener`,
    `removeListener`,
  ],
  H;
(function (e) {
  ((e[(e.CONNECT = 0)] = `CONNECT`),
    (e[(e.DISCONNECT = 1)] = `DISCONNECT`),
    (e[(e.EVENT = 2)] = `EVENT`),
    (e[(e.ACK = 3)] = `ACK`),
    (e[(e.CONNECT_ERROR = 4)] = `CONNECT_ERROR`),
    (e[(e.BINARY_EVENT = 5)] = `BINARY_EVENT`),
    (e[(e.BINARY_ACK = 6)] = `BINARY_ACK`));
})((H ||= {}));
var ea = class {
    constructor(e) {
      this.replacer = e;
    }
    encode(e) {
      return (e.type === H.EVENT || e.type === H.ACK) && qi(e)
        ? this.encodeAsBinary({
            type: e.type === H.EVENT ? H.BINARY_EVENT : H.BINARY_ACK,
            nsp: e.nsp,
            data: e.data,
            id: e.id,
          })
        : [this.encodeAsString(e)];
    }
    encodeAsString(e) {
      let t = `` + e.type;
      return (
        (e.type === H.BINARY_EVENT || e.type === H.BINARY_ACK) &&
          (t += e.attachments + `-`),
        e.nsp && e.nsp !== `/` && (t += e.nsp + `,`),
        e.id != null && (t += e.id),
        e.data != null && (t += JSON.stringify(e.data, this.replacer)),
        t
      );
    }
    encodeAsBinary(e) {
      let t = Ji(e),
        n = this.encodeAsString(t.packet),
        r = t.buffers;
      return (r.unshift(n), r);
    }
  },
  ta = class e extends ei {
    constructor(e) {
      (super(),
        (this.opts = Object.assign(
          { reviver: void 0, maxAttachments: 10 },
          typeof e == `function` ? { reviver: e } : e,
        )));
    }
    add(e) {
      let t;
      if (typeof e == `string`) {
        if (this.reconstructor)
          throw Error(`got plaintext data when reconstructing a packet`);
        t = this.decodeString(e);
        let n = t.type === H.BINARY_EVENT;
        n || t.type === H.BINARY_ACK
          ? ((t.type = n ? H.EVENT : H.ACK), (this.reconstructor = new na(t)))
          : super.emitReserved(`decoded`, t);
      } else if (Ki(e) || e.base64)
        if (this.reconstructor)
          ((t = this.reconstructor.takeBinaryData(e)),
            t &&
              ((this.reconstructor = null), super.emitReserved(`decoded`, t)));
        else throw Error(`got binary data when not reconstructing a packet`);
      else throw Error(`Unknown type: ` + e);
    }
    decodeString(t) {
      let n = 0,
        r = { type: Number(t.charAt(0)) };
      if (H[r.type] === void 0) throw Error(`unknown packet type ` + r.type);
      if (r.type === H.BINARY_EVENT || r.type === H.BINARY_ACK) {
        let e = n + 1;
        for (; t.charAt(++n) !== `-` && n != t.length; );
        let i = t.substring(e, n);
        if (i != Number(i) || t.charAt(n) !== `-`)
          throw Error(`Illegal attachments`);
        let a = Number(i);
        if (!ia(a) || a < 1) throw Error(`Illegal attachments`);
        if (a > this.opts.maxAttachments) throw Error(`too many attachments`);
        r.attachments = a;
      }
      if (t.charAt(n + 1) === `/`) {
        let e = n + 1;
        for (; ++n && !(t.charAt(n) === `,` || n === t.length); );
        r.nsp = t.substring(e, n);
      } else r.nsp = `/`;
      let i = t.charAt(n + 1);
      if (i !== `` && Number(i) == i) {
        let e = n + 1;
        for (; ++n; ) {
          let e = t.charAt(n);
          if (e == null || Number(e) != e) {
            --n;
            break;
          }
          if (n === t.length) break;
        }
        r.id = Number(t.substring(e, n + 1));
      }
      if (t.charAt(++n)) {
        let i = this.tryParse(t.substr(n));
        if (e.isPayloadValid(r.type, i)) r.data = i;
        else throw Error(`invalid payload`);
      }
      return r;
    }
    tryParse(e) {
      try {
        return JSON.parse(e, this.opts.reviver);
      } catch {
        return !1;
      }
    }
    static isPayloadValid(e, t) {
      switch (e) {
        case H.CONNECT:
          return oa(t);
        case H.DISCONNECT:
          return t === void 0;
        case H.CONNECT_ERROR:
          return typeof t == `string` || oa(t);
        case H.EVENT:
        case H.BINARY_EVENT:
          return (
            Array.isArray(t) &&
            (typeof t[0] == `number` ||
              (typeof t[0] == `string` && $i.indexOf(t[0]) === -1))
          );
        case H.ACK:
        case H.BINARY_ACK:
          return Array.isArray(t);
      }
    }
    destroy() {
      this.reconstructor &&=
        (this.reconstructor.finishedReconstruction(), null);
    }
  },
  na = class {
    constructor(e) {
      ((this.packet = e), (this.buffers = []), (this.reconPack = e));
    }
    takeBinaryData(e) {
      if (
        (this.buffers.push(e),
        this.buffers.length === this.reconPack.attachments)
      ) {
        let e = Xi(this.reconPack, this.buffers);
        return (this.finishedReconstruction(), e);
      }
      return null;
    }
    finishedReconstruction() {
      ((this.reconPack = null), (this.buffers = []));
    }
  };
function ra(e) {
  return typeof e == `string`;
}
var ia =
  Number.isInteger ||
  function (e) {
    return typeof e == `number` && isFinite(e) && Math.floor(e) === e;
  };
function aa(e) {
  return e === void 0 || ia(e);
}
function oa(e) {
  return Object.prototype.toString.call(e) === `[object Object]`;
}
function sa(e, t) {
  switch (e) {
    case H.CONNECT:
      return t === void 0 || oa(t);
    case H.DISCONNECT:
      return t === void 0;
    case H.EVENT:
      return (
        Array.isArray(t) &&
        (typeof t[0] == `number` ||
          (typeof t[0] == `string` && $i.indexOf(t[0]) === -1))
      );
    case H.ACK:
      return Array.isArray(t);
    case H.CONNECT_ERROR:
      return typeof t == `string` || oa(t);
    default:
      return !1;
  }
}
function ca(e) {
  return ra(e.nsp) && aa(e.id) && sa(e.type, e.data);
}
function la(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n);
    }
  );
}
var ua = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1,
  }),
  da = class extends ei {
    constructor(e, t, n) {
      (super(),
        (this.connected = !1),
        (this.recovered = !1),
        (this.receiveBuffer = []),
        (this.sendBuffer = []),
        (this._queue = []),
        (this._queueSeq = 0),
        (this.ids = 0),
        (this.acks = {}),
        (this.flags = {}),
        (this.io = e),
        (this.nsp = t),
        n && n.auth && (this.auth = n.auth),
        (this._opts = Object.assign({}, n)),
        this.io._autoConnect && this.open());
    }
    get disconnected() {
      return !this.connected;
    }
    subEvents() {
      if (this.subs) return;
      let e = this.io;
      this.subs = [
        la(e, `open`, this.onopen.bind(this)),
        la(e, `packet`, this.onpacket.bind(this)),
        la(e, `error`, this.onerror.bind(this)),
        la(e, `close`, this.onclose.bind(this)),
      ];
    }
    get active() {
      return !!this.subs;
    }
    connect() {
      return this.connected
        ? this
        : (this.subEvents(),
          this.io._reconnecting || this.io.open(),
          this.io._readyState === `open` && this.onopen(),
          this);
    }
    open() {
      return this.connect();
    }
    send(...e) {
      return (e.unshift(`message`), this.emit.apply(this, e), this);
    }
    emit(e, ...t) {
      if (ua.hasOwnProperty(e))
        throw Error(`"` + e.toString() + `" is a reserved event name`);
      if (
        (t.unshift(e),
        this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      )
        return (this._addToQueue(t), this);
      let n = { type: H.EVENT, data: t };
      if (
        ((n.options = {}),
        (n.options.compress = this.flags.compress !== !1),
        typeof t[t.length - 1] == `function`)
      ) {
        let e = this.ids++,
          r = t.pop();
        (this._registerAckCallback(e, r), (n.id = e));
      }
      let r = this.io.engine?.transport?.writable,
        i = this.connected && !this.io.engine?._hasPingExpired();
      return (
        (this.flags.volatile && !r) ||
          (i
            ? (this.notifyOutgoingListeners(n), this.packet(n))
            : this.sendBuffer.push(n)),
        (this.flags = {}),
        this
      );
    }
    _registerAckCallback(e, t) {
      let n = this.flags.timeout ?? this._opts.ackTimeout;
      if (n === void 0) {
        this.acks[e] = t;
        return;
      }
      let r = this.io.setTimeoutFn(() => {
          delete this.acks[e];
          for (let t = 0; t < this.sendBuffer.length; t++)
            this.sendBuffer[t].id === e && this.sendBuffer.splice(t, 1);
          t.call(this, Error(`operation has timed out`));
        }, n),
        i = (...e) => {
          (this.io.clearTimeoutFn(r), t.apply(this, e));
        };
      ((i.withError = !0), (this.acks[e] = i));
    }
    emitWithAck(e, ...t) {
      return new Promise((n, r) => {
        let i = (e, t) => (e ? r(e) : n(t));
        ((i.withError = !0), t.push(i), this.emit(e, ...t));
      });
    }
    _addToQueue(e) {
      let t;
      typeof e[e.length - 1] == `function` && (t = e.pop());
      let n = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: !1,
        args: e,
        flags: Object.assign({ fromQueue: !0 }, this.flags),
      };
      (e.push(
        (e, ...r) => (
          this._queue[0],
          e === null
            ? (this._queue.shift(), t && t(null, ...r))
            : n.tryCount > this._opts.retries &&
              (this._queue.shift(), t && t(e)),
          (n.pending = !1),
          this._drainQueue()
        ),
      ),
        this._queue.push(n),
        this._drainQueue());
    }
    _drainQueue(e = !1) {
      if (!this.connected || this._queue.length === 0) return;
      let t = this._queue[0];
      (t.pending && !e) ||
        ((t.pending = !0),
        t.tryCount++,
        (this.flags = t.flags),
        this.emit.apply(this, t.args));
    }
    packet(e) {
      ((e.nsp = this.nsp), this.io._packet(e));
    }
    onopen() {
      typeof this.auth == `function`
        ? this.auth((e) => {
            this._sendConnectPacket(e);
          })
        : this._sendConnectPacket(this.auth);
    }
    _sendConnectPacket(e) {
      this.packet({
        type: H.CONNECT,
        data: this._pid
          ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e)
          : e,
      });
    }
    onerror(e) {
      this.connected || this.emitReserved(`connect_error`, e);
    }
    onclose(e, t) {
      ((this.connected = !1),
        delete this.id,
        this.emitReserved(`disconnect`, e, t),
        this._clearAcks());
    }
    _clearAcks() {
      Object.keys(this.acks).forEach((e) => {
        if (!this.sendBuffer.some((t) => String(t.id) === e)) {
          let t = this.acks[e];
          (delete this.acks[e],
            t.withError && t.call(this, Error(`socket has been disconnected`)));
        }
      });
    }
    onpacket(e) {
      if (e.nsp === this.nsp)
        switch (e.type) {
          case H.CONNECT:
            e.data && e.data.sid
              ? this.onconnect(e.data.sid, e.data.pid)
              : this.emitReserved(
                  `connect_error`,
                  Error(
                    `It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)`,
                  ),
                );
            break;
          case H.EVENT:
          case H.BINARY_EVENT:
            this.onevent(e);
            break;
          case H.ACK:
          case H.BINARY_ACK:
            this.onack(e);
            break;
          case H.DISCONNECT:
            this.ondisconnect();
            break;
          case H.CONNECT_ERROR:
            this.destroy();
            let t = Error(e.data.message);
            ((t.data = e.data.data), this.emitReserved(`connect_error`, t));
            break;
        }
    }
    onevent(e) {
      let t = e.data || [];
      (e.id != null && t.push(this.ack(e.id)),
        this.connected
          ? this.emitEvent(t)
          : this.receiveBuffer.push(Object.freeze(t)));
    }
    emitEvent(e) {
      if (this._anyListeners && this._anyListeners.length) {
        let t = this._anyListeners.slice();
        for (let n of t) n.apply(this, e);
      }
      (super.emit.apply(this, e),
        this._pid &&
          e.length &&
          typeof e[e.length - 1] == `string` &&
          (this._lastOffset = e[e.length - 1]));
    }
    ack(e) {
      let t = this,
        n = !1;
      return function (...r) {
        n || ((n = !0), t.packet({ type: H.ACK, id: e, data: r }));
      };
    }
    onack(e) {
      let t = this.acks[e.id];
      typeof t == `function` &&
        (delete this.acks[e.id],
        t.withError && e.data.unshift(null),
        t.apply(this, e.data));
    }
    onconnect(e, t) {
      ((this.id = e),
        (this.recovered = t && this._pid === t),
        (this._pid = t),
        (this.connected = !0),
        this.emitBuffered(),
        this._drainQueue(!0),
        this.emitReserved(`connect`));
    }
    emitBuffered() {
      (this.receiveBuffer.forEach((e) => this.emitEvent(e)),
        (this.receiveBuffer = []),
        this.sendBuffer.forEach((e) => {
          (this.notifyOutgoingListeners(e), this.packet(e));
        }),
        (this.sendBuffer = []));
    }
    ondisconnect() {
      (this.destroy(), this.onclose(`io server disconnect`));
    }
    destroy() {
      ((this.subs &&= (this.subs.forEach((e) => e()), void 0)),
        this.io._destroy(this));
    }
    disconnect() {
      return (
        this.connected && this.packet({ type: H.DISCONNECT }),
        this.destroy(),
        this.connected && this.onclose(`io client disconnect`),
        this
      );
    }
    close() {
      return this.disconnect();
    }
    compress(e) {
      return ((this.flags.compress = e), this);
    }
    get volatile() {
      return ((this.flags.volatile = !0), this);
    }
    timeout(e) {
      return ((this.flags.timeout = e), this);
    }
    onAny(e) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.push(e),
        this
      );
    }
    prependAny(e) {
      return (
        (this._anyListeners = this._anyListeners || []),
        this._anyListeners.unshift(e),
        this
      );
    }
    offAny(e) {
      if (!this._anyListeners) return this;
      if (e) {
        let t = this._anyListeners;
        for (let n = 0; n < t.length; n++)
          if (e === t[n]) return (t.splice(n, 1), this);
      } else this._anyListeners = [];
      return this;
    }
    listenersAny() {
      return this._anyListeners || [];
    }
    onAnyOutgoing(e) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.push(e),
        this
      );
    }
    prependAnyOutgoing(e) {
      return (
        (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
        this._anyOutgoingListeners.unshift(e),
        this
      );
    }
    offAnyOutgoing(e) {
      if (!this._anyOutgoingListeners) return this;
      if (e) {
        let t = this._anyOutgoingListeners;
        for (let n = 0; n < t.length; n++)
          if (e === t[n]) return (t.splice(n, 1), this);
      } else this._anyOutgoingListeners = [];
      return this;
    }
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    notifyOutgoingListeners(e) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        let t = this._anyOutgoingListeners.slice();
        for (let n of t) n.apply(this, e.data);
      }
    }
  };
function fa(e) {
  ((e ||= {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0));
}
((fa.prototype.duration = function () {
  var e = this.ms * this.factor ** +this.attempts++;
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e);
    e = Math.floor(t * 10) & 1 ? e + n : e - n;
  }
  return Math.min(e, this.max) | 0;
}),
  (fa.prototype.reset = function () {
    this.attempts = 0;
  }),
  (fa.prototype.setMin = function (e) {
    this.ms = e;
  }),
  (fa.prototype.setMax = function (e) {
    this.max = e;
  }),
  (fa.prototype.setJitter = function (e) {
    this.jitter = e;
  }));
var pa = class extends ei {
    constructor(e, t) {
      (super(),
        (this.nsps = {}),
        (this.subs = []),
        e && typeof e == `object` && ((t = e), (e = void 0)),
        (t ||= {}),
        (t.path = t.path || `/socket.io`),
        (this.opts = t),
        ci(this, t),
        this.reconnection(t.reconnection !== !1),
        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(t.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
        this.randomizationFactor(t.randomizationFactor ?? 0.5),
        (this.backoff = new fa({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor(),
        })),
        this.timeout(t.timeout == null ? 2e4 : t.timeout),
        (this._readyState = `closed`),
        (this.uri = e));
      let n = t.parser || Qi;
      ((this.encoder = new n.Encoder()),
        (this.decoder = new n.Decoder()),
        (this._autoConnect = t.autoConnect !== !1),
        this._autoConnect && this.open());
    }
    reconnection(e) {
      return arguments.length
        ? ((this._reconnection = !!e), e || (this.skipReconnect = !0), this)
        : this._reconnection;
    }
    reconnectionAttempts(e) {
      return e === void 0
        ? this._reconnectionAttempts
        : ((this._reconnectionAttempts = e), this);
    }
    reconnectionDelay(e) {
      var t;
      return e === void 0
        ? this._reconnectionDelay
        : ((this._reconnectionDelay = e),
          (t = this.backoff) == null || t.setMin(e),
          this);
    }
    randomizationFactor(e) {
      var t;
      return e === void 0
        ? this._randomizationFactor
        : ((this._randomizationFactor = e),
          (t = this.backoff) == null || t.setJitter(e),
          this);
    }
    reconnectionDelayMax(e) {
      var t;
      return e === void 0
        ? this._reconnectionDelayMax
        : ((this._reconnectionDelayMax = e),
          (t = this.backoff) == null || t.setMax(e),
          this);
    }
    timeout(e) {
      return arguments.length ? ((this._timeout = e), this) : this._timeout;
    }
    maybeReconnectOnOpen() {
      !this._reconnecting &&
        this._reconnection &&
        this.backoff.attempts === 0 &&
        this.reconnect();
    }
    open(e) {
      if (~this._readyState.indexOf(`open`)) return this;
      this.engine = new zi(this.uri, this.opts);
      let t = this.engine,
        n = this;
      ((this._readyState = `opening`), (this.skipReconnect = !1));
      let r = la(t, `open`, function () {
          (n.onopen(), e && e());
        }),
        i = (t) => {
          (this.cleanup(),
            (this._readyState = `closed`),
            this.emitReserved(`error`, t),
            e ? e(t) : this.maybeReconnectOnOpen());
        },
        a = la(t, `error`, i);
      if (!1 !== this._timeout) {
        let e = this._timeout,
          n = this.setTimeoutFn(() => {
            (r(), i(Error(`timeout`)), t.close());
          }, e);
        (this.opts.autoUnref && n.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(n);
          }));
      }
      return (this.subs.push(r), this.subs.push(a), this);
    }
    connect(e) {
      return this.open(e);
    }
    onopen() {
      (this.cleanup(), (this._readyState = `open`), this.emitReserved(`open`));
      let e = this.engine;
      this.subs.push(
        la(e, `ping`, this.onping.bind(this)),
        la(e, `data`, this.ondata.bind(this)),
        la(e, `error`, this.onerror.bind(this)),
        la(e, `close`, this.onclose.bind(this)),
        la(this.decoder, `decoded`, this.ondecoded.bind(this)),
      );
    }
    onping() {
      this.emitReserved(`ping`);
    }
    ondata(e) {
      try {
        this.decoder.add(e);
      } catch (e) {
        this.onclose(`parse error`, e);
      }
    }
    ondecoded(e) {
      ni(() => {
        this.emitReserved(`packet`, e);
      }, this.setTimeoutFn);
    }
    onerror(e) {
      this.emitReserved(`error`, e);
    }
    socket(e, t) {
      let n = this.nsps[e];
      return (
        n
          ? this._autoConnect && !n.active && n.connect()
          : ((n = new da(this, e, t)), (this.nsps[e] = n)),
        n
      );
    }
    _destroy(e) {
      let t = Object.keys(this.nsps);
      for (let e of t) if (this.nsps[e].active) return;
      this._close();
    }
    _packet(e) {
      let t = this.encoder.encode(e);
      for (let n = 0; n < t.length; n++) this.engine.write(t[n], e.options);
    }
    cleanup() {
      (this.subs.forEach((e) => e()),
        (this.subs.length = 0),
        this.decoder.destroy());
    }
    _close() {
      ((this.skipReconnect = !0),
        (this._reconnecting = !1),
        this.onclose(`forced close`));
    }
    disconnect() {
      return this._close();
    }
    onclose(e, t) {
      var n;
      (this.cleanup(),
        (n = this.engine) == null || n.close(),
        this.backoff.reset(),
        (this._readyState = `closed`),
        this.emitReserved(`close`, e, t),
        this._reconnection && !this.skipReconnect && this.reconnect());
    }
    reconnect() {
      if (this._reconnecting || this.skipReconnect) return this;
      let e = this;
      if (this.backoff.attempts >= this._reconnectionAttempts)
        (this.backoff.reset(),
          this.emitReserved(`reconnect_failed`),
          (this._reconnecting = !1));
      else {
        let t = this.backoff.duration();
        this._reconnecting = !0;
        let n = this.setTimeoutFn(() => {
          e.skipReconnect ||
            (this.emitReserved(`reconnect_attempt`, e.backoff.attempts),
            !e.skipReconnect &&
              e.open((t) => {
                t
                  ? ((e._reconnecting = !1),
                    e.reconnect(),
                    this.emitReserved(`reconnect_error`, t))
                  : e.onreconnect();
              }));
        }, t);
        (this.opts.autoUnref && n.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(n);
          }));
      }
    }
    onreconnect() {
      let e = this.backoff.attempts;
      ((this._reconnecting = !1),
        this.backoff.reset(),
        this.emitReserved(`reconnect`, e));
    }
  },
  ma = {};
function ha(e, t) {
  (typeof e == `object` && ((t = e), (e = void 0)), (t ||= {}));
  let n = Bi(e, t.path || `/socket.io`),
    r = n.source,
    i = n.id,
    a = n.path,
    o = ma[i] && a in ma[i].nsps,
    s = t.forceNew || t[`force new connection`] || !1 === t.multiplex || o,
    c;
  return (
    s ? (c = new pa(r, t)) : (ma[i] || (ma[i] = new pa(r, t)), (c = ma[i])),
    n.query && !t.query && (t.query = n.queryKey),
    c.socket(n.path, t)
  );
}
Object.assign(ha, { Manager: pa, Socket: da, io: ha, connect: ha });
// ===================== END socket.io-client library =====================
// `ha` above is socket.io-client's `io()` function.
var SOCKET_URL = API_BASE.replace(/\/api\/?$/, ``),
  _a = null;
function getSocket() {
  let e = getTokens();
  return e?.accessToken
    ? (_a
        ? _a.disconnected &&
          ((_a.auth = { token: e.accessToken }), _a.connect())
        : (_a = ha(SOCKET_URL, {
            path: `/socket.io`,
            auth: { token: e.accessToken },
            autoConnect: !0,
            reconnection: !0,
          })),
      _a)
    : null;
}
function disconnectSocket() {
  _a &&= (_a.disconnect(), null);
}
function useScreenshotGuard(e) {
  (0, React.useEffect)(() => {
    let t = (t) => {
        if (
          t.key === `PrintScreen` ||
          (t.metaKey && t.shiftKey && [`3`, `4`, `5`].includes(t.key))
        ) {
          try {
            navigator.clipboard.writeText(``);
          } catch {}
          e();
        }
      },
      n = () => {
        document.visibilityState === `hidden` && e();
      };
    return (
      document.addEventListener(`keyup`, t),
      document.addEventListener(`visibilitychange`, n),
      () => {
        (document.removeEventListener(`keyup`, t),
          document.removeEventListener(`visibilitychange`, n));
      }
    );
  }, [e]);
}
function TimedImageMessage({ messageId: e, duration: t, noScreenshot: n }) {
  let [r, i] = (0, React.useState)(`idle`),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(t),
    [l, u] = (0, React.useState)(!1),
    [d, f] = (0, React.useState)(``),
    p = (0, React.useRef)(null),
    m = (0, React.useCallback)(() => {
      (clearInterval(p.current), i(`expired`));
    }, []),
    h = (0, React.useCallback)(() => {
      r === `viewing` && (u(!0), m(), setTimeout(() => u(!1), 3e3));
    }, [r, m]);
  useScreenshotGuard(n ? h : () => {});
  let g = async () => {
      if (r === `idle`) {
        i(`loading`);
        try {
          let n = await api.post(`/media/timed-images/${e}/view`, {});
          (o(n.signedUrl),
            c(n.durationSecondsRemaining ?? t),
            i(`viewing`),
            (p.current = setInterval(() => {
              c((e) => {
                let t = +(e - 0.1).toFixed(1);
                return t <= 0 ? (clearInterval(p.current), i(`expired`), 0) : t;
              });
            }, 100)));
        } catch (e) {
          (f(
            e.code === `TIMED_IMAGE_NOT_ACCESSIBLE`
              ? `Already viewed`
              : e.message || `Could not open`,
          ),
            i(`error`));
        }
      }
    },
    _ = (0, React.useCallback)(() => {
      r === `viewing` && m();
    }, [r, m]);
  ((0, React.useEffect)(() => {
    let e = () => {
      r === `viewing` && _();
    };
    return (
      window.addEventListener(`blur`, e),
      () => window.removeEventListener(`blur`, e)
    );
  }, [r, _]),
    (0, React.useEffect)(() => () => clearInterval(p.current), []));
  let y = 2 * Math.PI * 13,
    b = (s / t) * y;
  return r === `expired` || r === `error` ? (
    <div className="timed-expired">
      <span style={{ fontSize: 22 }}>🔥</span>
      <span className="timed-expired-text">
        {r === `error` ? d : `Photo expired`}
      </span>
      {l && <span className="screenshot-warn">⚠️ Screenshot detected</span>}
    </div>
  ) : r === `loading` ? (
    <div className="timed-idle" style={{ cursor: `default` }}>
      <div className="timed-idle-label">Opening…</div>
    </div>
  ) : r === `viewing` ? (
    <div
      className="timed-viewing"
      onMouseUp={_}
      onTouchEnd={_}
      style={{ userSelect: `none`, WebkitUserSelect: `none` }}
    >
      <img
        src={a}
        alt="timed"
        className="timed-photo"
        draggable={!1}
        onContextMenu={(e) => e.preventDefault()}
        style={{ pointerEvents: `none` }}
      />
      {n && <div className="no-ss-overlay" />}
      <svg className="progress-ring" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2.5"
        />
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeDasharray={`${b} ${y}`}
          strokeLinecap="round"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: `50% 50%`,
            transition: `stroke-dasharray 0.1s linear`,
          }}
        />
      </svg>
      <div className="timed-timer">{s.toFixed(1)}s</div>
      {n && <div className="timed-lock-badge">🔒</div>}
    </div>
  ) : (
    <div className="timed-idle" onMouseDown={g} onTouchStart={g}>
      <div style={{ fontSize: 28 }}>📷</div>
      <div className="timed-idle-label">
        {"Hold to view · "}
        {t}s
      </div>
      <div className="timed-idle-sub">
        {n ? `🔒 No screenshot` : `📸 Screenshot OK`}
      </div>
    </div>
  );
}
function ChatImage({ imageUrl: e, sender: t }) {
  let [n, r] = (0, React.useState)(!1);
  return (
    <>
      <img
        src={e}
        alt="sent"
        className={`chat-img ${t === `user` ? `chat-img-user` : `chat-img-other`}`}
        onClick={() => r(!0)}
        onContextMenu={(e) => e.preventDefault()}
        draggable={!1}
      />
      {n && (
        <div className="lightbox" onClick={() => r(!1)}>
          <button className="lightbox-close" onClick={() => r(!1)}>
            ✕
          </button>
          <img
            src={e}
            alt="full"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            draggable={!1}
          />
        </div>
      )}
    </>
  );
}
function SendImageModal({
  imageUrl: e,
  onSend: t,
  onCancel: n,
  sending: r,
  isPremium: i,
  onRequirePremium: a,
}) {
  let [o, s] = (0, React.useState)(`regular`),
    [c, l] = (0, React.useState)(5),
    [u, d] = (0, React.useState)(!1);
  return (
    <div className="modal-bg" onClick={n}>
      <div className="img-modal" onClick={(e) => e.stopPropagation()}>
        <div className="img-modal-head">
          <span className="img-modal-title">Send Image</span>
          <button className="modal-x" onClick={n}>
            ✕
          </button>
        </div>
        <div className="img-preview-wrap">
          <img src={e} alt="preview" className="img-preview" draggable={!1} />
        </div>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${o === `regular` ? `active` : ``}`}
            onClick={() => s(`regular`)}
          >
            🖼️ Regular
          </button>
          <button
            className={`mode-btn ${o === `timed` ? `active` : ``}`}
            onClick={() => {
              if (!i) {
                a?.();
                return;
              }
              s(`timed`);
            }}
            title={i ? void 0 : `Sending view-once photos requires Premium`}
            style={i ? void 0 : { opacity: 0.65 }}
          >
            {"⏳ Timed "}
            {!i && `🔒`}
          </button>
        </div>
        {o === `timed` && i && (
          <div className="timed-opts">
            <div className="opt-label">View duration</div>
            <div className="duration-row">
              {[3, 5, 10].map((e) => (
                <button
                  key={e}
                  className={`dur-pill ${c === e ? `active` : ``}`}
                  onClick={() => l(e)}
                >
                  {e}s
                </button>
              ))}
            </div>
            <button
              className={`ss-toggle ${u ? `active` : ``}`}
              onClick={() => d((e) => !e)}
            >
              <span
                className="ss-track"
                style={{
                  background: u
                    ? `linear-gradient(135deg,#1B3A4B,#2D6A4F)`
                    : `#e5e7eb`,
                }}
              >
                <span className="ss-thumb" style={{ left: u ? 22 : 3 }} />
              </span>
              <span>{u ? `🔒 No screenshot` : `📸 Screenshot allowed`}</span>
            </button>
          </div>
        )}
        <div className="img-modal-btns">
          <button className="img-cancel" onClick={n}>
            Cancel
          </button>
          <button
            className="img-send"
            disabled={r}
            onClick={() => t({ mode: o, duration: c, noScreenshot: u })}
          >
            {r ? `Sending…` : `Send →`}
          </button>
        </div>
      </div>
    </div>
  );
}
function wa(e) {
  let [t, n, r] = (e || ``).split(`:`),
    i = t === `video` ? `📹` : `📞`,
    a = t === `video` ? `Video call` : `Voice call`;
  if (n === `answered`) {
    let e = Number(r) || 0,
      t = Math.floor(e / 60),
      n = e % 60;
    return `${i} ${a} · ${t}:${String(n).padStart(2, `0`)}`;
  }
  return `${i} ${a} · No answer`;
}
function MessageRow({
  messages: e,
  meId: t,
  avatarEmoji: n,
  isGroup: r,
  senderInfo: i,
  settings: a,
  isTyping: o,
  messagesContainerRef: s,
}) {
  return (
    <div ref={s} className="msgs-scroll">
      <div className="date-row">
        <span className="date-chip">Today</span>
      </div>
      {e.map((e) => {
        let o = e.senderId === t,
          s = new Date(e.createdAt).toLocaleTimeString([], {
            hour: `2-digit`,
            minute: `2-digit`,
          }),
          c = r ? i?.get(e.senderId) : null;
        return (
          <div key={e.id} className={`msg-row ${o ? `msg-right` : `msg-left`}`}>
            {!o &&
              (c?.avatarUrl ? (
                <img
                  src={c.avatarUrl}
                  alt=""
                  className="msg-avatar"
                  style={{ objectFit: `cover` }}
                />
              ) : (
                <div className="msg-avatar">
                  {r ? (c?.name || `?`).trim().charAt(0).toUpperCase() : n}
                </div>
              ))}
            <div className="msg-col">
              {!o && r && c?.name && (
                <div className="msg-sender-name">{c.name}</div>
              )}
              {e.type === `text` && (
                <div className={`bubble ${o ? `bubble-user` : `bubble-other`}`}>
                  {e.text}
                </div>
              )}
              {e.type === `call` && (
                <div className={`bubble ${o ? `bubble-user` : `bubble-other`}`}>
                  {wa(e.text)}
                </div>
              )}
              {e.type === `image` && e.media?.mediaUrl && (
                <ChatImage
                  imageUrl={e.media.mediaUrl}
                  sender={o ? `user` : `other`}
                />
              )}
              {e.type === `timed_image` && (
                <TimedImageMessage
                  messageId={e.id}
                  duration={e.timed?.durationSeconds || 5}
                  noScreenshot={e.timed?.noScreenshot}
                />
              )}
              <div className={`msg-meta ${o ? `meta-right` : `meta-left`}`}>
                {s}
                {o && a.readReceipts && <span className="read-tick">✓✓</span>}
              </div>
            </div>
          </div>
        );
      })}
      {o && (
        <div className="msg-row msg-left">
          <div className="msg-avatar">{n}</div>
          <div className="bubble bubble-other typing-bubble">
            <span className="dot" style={{ animationDelay: `0ms` }} />
            <span className="dot" style={{ animationDelay: `150ms` }} />
            <span className="dot" style={{ animationDelay: `300ms` }} />
          </div>
        </div>
      )}
    </div>
  );
}
function MessageComposer({
  newMessage: e,
  setNewMessage: t,
  handleSendMessage: n,
  handleImageSelect: r,
  settings: i,
  placeholderName: a,
  inputRef: o,
  onTyping: s,
}) {
  let c = (0, React.useRef)(null);
  return (
    <div className="input-bar">
      <input
        ref={c}
        type="file"
        accept="image/*"
        style={{ display: `none` }}
        onChange={r}
      />
      <button className="input-icon" title="Emoji">
        😊
      </button>
      <button
        className="input-icon"
        title="Send image"
        onClick={() => c.current?.click()}
        disabled={i.blocked}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </button>
      <input
        ref={o}
        type="text"
        placeholder={i.blocked ? `You can't message here.` : `Message ${a}...`}
        value={e}
        onChange={(e) => {
          (t(e.target.value), s?.());
        }}
        onKeyDown={(e) => {
          e.key === `Enter` && !e.shiftKey && (e.preventDefault(), n());
        }}
        disabled={i.blocked}
        className="text-input"
      />
      <button
        onClick={n}
        disabled={!e.trim() || i.blocked}
        className="send-btn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}
function ConversationListItem({
  title: e,
  subtitle: t,
  avatarEmoji: n,
  avatarUrl: r,
  presence: i,
  plan: a,
  backBtn: o,
  onCall: s,
  onSettings: c,
  hideCallButtons: l,
  activeCallHere: u,
  onEndCall: d,
  onViewProfile: f,
}) {
  return (
    <div className="chat-header">
      <div className="ch-left">
        {o && (
          <span
            onClick={(e) => e.stopPropagation()}
            style={{ display: `flex` }}
          >
            {o}
          </span>
        )}
        <div
          onClick={f}
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: `inherit`,
            cursor: f ? `pointer` : void 0,
          }}
          title={f ? `View profile` : void 0}
        >
          <div style={{ position: `relative`, flexShrink: 0 }}>
            <div className="ch-avatar">
              {r ? (
                <img
                  src={r}
                  alt=""
                  style={{
                    width: `100%`,
                    height: `100%`,
                    borderRadius: `50%`,
                    objectFit: `cover`,
                  }}
                />
              ) : (
                n
              )}
            </div>
            {i && <span className={`status-dot ${i}`} />}
          </div>
          <div>
            <div
              className="ch-name-row"
              style={{ display: `flex`, alignItems: `center`, gap: 6 }}
            >
              <span className="ch-name">{e}</span>
              <PlanBadge plan={a} />
              {i === `online` && <span className="online-label">● Online</span>}
              {i === `offline` && (
                <span className="offline-label">Offline</span>
              )}
            </div>
            <span className="ch-meta">{t}</span>
          </div>
        </div>
      </div>
      <div className="ch-actions">
        {u ? (
          <button
            onClick={d}
            className="hdr-btn"
            style={{ background: `#C0392B` }}
            title="End call"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 01-.6.92c-.86.37-1.65.85-2.35 1.4a1 1 0 01-1.33-.08l-1.9-1.9a1 1 0 01.02-1.44C3.85 9.4 7.72 8 12 8s8.15 1.4 10.76 3.72a1 1 0 01.02 1.44l-1.9 1.9a1 1 0 01-1.33.08 12.6 12.6 0 00-2.35-1.4 1 1 0 01-.6-.92v-3.1A15 15 0 0012 9z" />
            </svg>
          </button>
        ) : (
          !l && (
            <>
              <button
                onClick={() => s(`voice`)}
                className="hdr-btn gold"
                title="Voice Call"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
              <button
                onClick={() => s(`video`)}
                className="hdr-btn gold"
                title="Video Call"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </button>
            </>
          )
        )}
        <button onClick={c} className="hdr-btn subtle" title="Settings">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
function CreateGroupModal({ onClose: e, onCreated: t }) {
  let [n, r] = (0, React.useState)(``),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)([]),
    [c, l] = (0, React.useState)([]),
    [u, d] = (0, React.useState)(!1),
    [f, p] = (0, React.useState)(``);
  (0, React.useEffect)(() => {
    let e = setTimeout(async () => {
      if (!i.trim()) {
        s([]);
        return;
      }
      try {
        s(
          (
            await api.get(
              `/people?q=${encodeURIComponent(i)}&online=false&verified=false&limit=10`,
            )
          ).items.filter((e) => !c.some((t) => t.id === e.id)),
        );
      } catch {}
    }, 250);
    return () => clearTimeout(e);
  }, [i]);
  let m = (e) => {
      (l((t) => [...t, e]), s((t) => t.filter((t) => t.id !== e.id)));
    },
    h = (e) => l((t) => t.filter((t) => t.id !== e));
  return (
    <div className="chat-area" style={{ padding: 24, overflowY: `auto` }}>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            color: `#1B3A4B`,
          }}
        >
          Create Group
        </h2>
        <button onClick={e} className="modal-x">
          ✕
        </button>
      </div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `#2D6A4F`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Group name
      </label>
      <input
        value={n}
        onChange={(e) => r(e.target.value)}
        placeholder="e.g. Second Chances Support"
        className="text-input"
        style={{ flex: `none`, margin: `6px 0 18px`, background: `#F8FAF5` }}
      />
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `#2D6A4F`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Add members
      </label>
      <input
        value={i}
        onChange={(e) => a(e.target.value)}
        placeholder="Search by name..."
        className="text-input"
        style={{ flex: `none`, margin: `6px 0 10px`, background: `#F8FAF5` }}
      />
      {o.length > 0 && (
        <div
          style={{
            border: `1px solid #E8F5EE`,
            borderRadius: 12,
            marginBottom: 14,
            overflow: `hidden`,
          }}
        >
          {o.map((e) => (
            <button
              key={e.id}
              onClick={() => m(e)}
              style={{
                width: `100%`,
                textAlign: `left`,
                padding: `10px 12px`,
                border: `none`,
                background: `#fff`,
                borderBottom: `1px solid #F0FAF4`,
                cursor: `pointer`,
                fontFamily: `'DM Sans', sans-serif`,
                fontSize: 13,
                color: `#1B3A4B`,
              }}
            >
              {"+ "}
              {e.displayName}
            </button>
          ))}
        </div>
      )}
      {c.length > 0 && (
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: 8,
            marginBottom: 18,
          }}
        >
          {c.map((e) => (
            <span
              key={e.id}
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 6,
                background: `#F0FAF4`,
                border: `1px solid #D4EDDA`,
                borderRadius: 20,
                padding: `5px 6px 5px 12px`,
                fontSize: 12.5,
                fontFamily: `'DM Sans', sans-serif`,
                color: `#2D6A4F`,
              }}
            >
              {e.displayName}
              <button
                onClick={() => h(e.id)}
                style={{
                  border: `none`,
                  background: `none`,
                  cursor: `pointer`,
                  color: `#74C69D`,
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
      {f && (
        <p style={{ fontSize: 12.5, color: `#C0392B`, marginBottom: 14 }}>
          {f}
        </p>
      )}
      <div style={{ display: `flex`, gap: 10 }}>
        <button onClick={e} className="img-cancel" style={{ flex: 1 }}>
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!n.trim() || c.length === 0) {
              p(`Give the group a name and add at least one member.`);
              return;
            }
            (d(!0), p(``));
            try {
              t(
                await api.post(`/groups`, {
                  name: n.trim(),
                  memberIds: c.map((e) => e.id),
                }),
              );
            } catch (e) {
              p(e.message || `Could not create the group.`);
            } finally {
              d(!1);
            }
          }}
          disabled={u}
          className="img-send"
          style={{ flex: 1 }}
        >
          {u ? `Creating…` : `Create Group`}
        </button>
      </div>
    </div>
  );
}
function GroupSettingsModal({
  groupId: e,
  meId: t,
  onClose: n,
  onLeft: r,
  onDeleted: i,
  onUpdated: a,
  requestConfirm: o,
}) {
  let [s, c] = (0, React.useState)(null),
    [l, u] = (0, React.useState)(``),
    [d, f] = (0, React.useState)(``),
    [p, m] = (0, React.useState)([]),
    [h, g] = (0, React.useState)(``),
    _ = (0, React.useCallback)(async () => {
      try {
        let t = await api.get(`/groups/${e}`);
        (c(t), u(t.name));
      } catch (e) {
        g(e.message);
      }
    }, [e]);
  if (
    ((0, React.useEffect)(() => {
      _();
    }, [_]),
    (0, React.useEffect)(() => {
      let e = setTimeout(async () => {
        if (!d.trim()) {
          m([]);
          return;
        }
        try {
          m(
            (
              await api.get(
                `/people?q=${encodeURIComponent(d)}&online=false&verified=false&limit=10`,
              )
            ).items.filter((e) => !s?.members.some((t) => t.id === e.id)),
          );
        } catch {}
      }, 250);
      return () => clearTimeout(e);
    }, [d, s]),
    !s)
  )
    return (
      <div className="chat-area" style={{ padding: 24 }}>
        Loading…
      </div>
    );
  let y = s.myRole === `admin`,
    b = async () => {
      try {
        let t = await api.patch(`/groups/${e}`, { name: l });
        (c(t), a?.(t));
      } catch (e) {
        g(e.message);
      }
    },
    x = async (t) => {
      try {
        (c(await api.post(`/groups/${e}/members`, { userId: t })), f(``));
      } catch (e) {
        g(e.message);
      }
    },
    S = async (n) => {
      try {
        (await api.delete(`/groups/${e}/members/${n}`), n === t ? r?.() : _());
      } catch (e) {
        g(e.message);
      }
    };
  return (
    <div className="chat-area" style={{ padding: 24, overflowY: `auto` }}>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            color: `#1B3A4B`,
          }}
        >
          Group Settings
        </h2>
        <button onClick={n} className="modal-x">
          ✕
        </button>
      </div>
      {h && (
        <p style={{ fontSize: 12.5, color: `#C0392B`, marginBottom: 14 }}>
          {h}
        </p>
      )}
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `#2D6A4F`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Group name
      </label>
      <div style={{ display: `flex`, gap: 8, margin: `6px 0 20px` }}>
        <input
          value={l}
          onChange={(e) => u(e.target.value)}
          disabled={!y}
          className="text-input"
          style={{ background: `#F8FAF5` }}
        />
        {y && (
          <button
            onClick={b}
            className="img-send"
            style={{ padding: `0 18px` }}
          >
            Save
          </button>
        )}
      </div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `#2D6A4F`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Members ({s.members.length})
      </label>
      <div
        style={{
          border: `1px solid #E8F5EE`,
          borderRadius: 12,
          margin: `6px 0 20px`,
          overflow: `hidden`,
        }}
      >
        {s.members.map((e) => (
          <div
            key={e.id}
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              padding: `10px 12px`,
              borderBottom: `1px solid #F0FAF4`,
              fontFamily: `'DM Sans', sans-serif`,
              fontSize: 13,
            }}
          >
            <span>
              {e.displayName}{" "}
              {e.role === `admin` && (
                <span
                  style={{
                    fontSize: 10,
                    color: `#40916C`,
                    fontWeight: 700,
                  }}
                >
                  ADMIN
                </span>
              )}
            </span>
            {(y && e.id !== t) || e.id === t ? (
              <button
                onClick={() => S(e.id)}
                style={{
                  border: `none`,
                  background: `none`,
                  color: e.id === t ? `#2D6A4F` : `#C0392B`,
                  cursor: `pointer`,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {e.id === t ? `Leave` : `Remove`}
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {y && (
        <>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: `#2D6A4F`,
              textTransform: `uppercase`,
              letterSpacing: `0.06em`,
            }}
          >
            Add member
          </label>
          <input
            value={d}
            onChange={(e) => f(e.target.value)}
            placeholder="Search by name..."
            className="text-input"
            style={{
              flex: `none`,
              margin: `6px 0 10px`,
              background: `#F8FAF5`,
            }}
          />
          {p.length > 0 && (
            <div
              style={{
                border: `1px solid #E8F5EE`,
                borderRadius: 12,
                marginBottom: 20,
                overflow: `hidden`,
              }}
            >
              {p.map((e) => (
                <button
                  key={e.id}
                  onClick={() => x(e.id)}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    padding: `10px 12px`,
                    border: `none`,
                    background: `#fff`,
                    borderBottom: `1px solid #F0FAF4`,
                    cursor: `pointer`,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 13,
                    color: `#1B3A4B`,
                  }}
                >
                  {"+ "}
                  {e.displayName}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              o(
                `Delete this group for everyone? This can't be undone.`,
                async () => {
                  try {
                    (await api.delete(`/groups/${e}`), i?.());
                  } catch (e) {
                    g(e.message);
                  }
                },
                { confirmLabel: `Delete Group`, danger: !0 },
              );
            }}
            style={{
              width: `100%`,
              padding: `12px 0`,
              borderRadius: 14,
              border: `1.5px solid #C0392B`,
              background: `#fff5f5`,
              color: `#C0392B`,
              fontWeight: 700,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Delete Group
          </button>
        </>
      )}
    </div>
  );
}
var Aa = { woman: `👩`, man: `🧔`, other: `🧑` };
function MessagingPage() {
  let { user: e } = useAuth(),
    {
      startCall: t,
      startGroupCall: n,
      activeCall: r,
      groupCall: i,
      callStatus: a,
      endCall: o,
      leaveGroupCall: s,
    } = useCall(),
    [c] = useSearchParams(),
    [l, u] = (0, React.useState)([]),
    [d, f] = (0, React.useState)(c.get(`conversation`) || null),
    [p, m] = (0, React.useState)(null),
    [h, g] = (0, React.useState)([]),
    [_, y] = (0, React.useState)(!1),
    [b, x] = (0, React.useState)(``),
    [S, C] = (0, React.useState)(!1),
    [w, T] = (0, React.useState)(``),
    [E, ee] = (0, React.useState)({
      ignoreCalls: !1,
      ignoreVideoCalls: !1,
      readReceipts: !0,
      blocked: !1,
    }),
    [D, O] = (0, React.useState)(!1),
    [k, A] = (0, React.useState)(null),
    [te, ne] = (0, React.useState)(!1),
    [re, ie] = (0, React.useState)(!1),
    [j, M] = (0, React.useState)(!1),
    [ae, oe] = (0, React.useState)(null),
    [se, ce] = (0, React.useState)(null),
    [N, P] = (0, React.useState)(null),
    [F, le] = (0, React.useState)(null),
    [ue, de] = (0, React.useState)(null),
    [fe, pe] = (0, React.useState)(null),
    me = (e, t = `info`) => P({ message: e, tone: t }),
    he = (e) => de(e),
    ge = (e, t, n = {}) => {
      le({
        message: e,
        ...n,
        onConfirm: () => {
          (le(null), t());
        },
      });
    },
    _e = (0, React.useRef)(null),
    ve = (0, React.useRef)(null),
    ye = (0, React.useRef)(null),
    I = l.find((e) => e.conversationId === d) || null,
    be = (0, React.useCallback)(async () => {
      try {
        u((await api.get(`/messaging/conversations/summary`)).items);
      } catch {}
    }, []);
  ((0, React.useEffect)(() => {
    be();
  }, [be]),
    (0, React.useEffect)(() => {
      let e = getSocket();
      if (!e) return;
      let t = (e) => {
          (e.conversationId === d &&
            (g((t) => [...t, e.message]),
            api
              .patch(`/messaging/conversations/${e.conversationId}/read`, {
                messageIds: [e.message.id],
              })
              .catch(() => {})),
            be());
        },
        n = (e) => {
          e.conversationId === d && O(e.isTyping);
        };
      return (
        e.on(`message:new`, t),
        e.on(`typing:update`, n),
        () => {
          (e.off(`message:new`, t), e.off(`typing:update`, n));
        }
      );
    }, [d]),
    (0, React.useEffect)(() => {
      d &&
        (oe(null),
        O(!1),
        (async () => {
          try {
            let t = await api.get(
              `/messaging/conversations/${d}/messages?limit=50`,
            );
            g([...t.items].reverse());
            let n = t.items.filter((t) => t.senderId !== e.id).map((e) => e.id);
            n.length &&
              api
                .patch(`/messaging/conversations/${d}/read`, {
                  messageIds: n,
                })
                .catch(() => {});
          } catch {
            g([]);
          }
        })());
    }, [d]),
    (0, React.useEffect)(() => {
      !d ||
        !I ||
        (I.isGroup
          ? (api
              .get(`/groups/${d}`)
              .then(m)
              .catch(() => m(null)),
            ee({
              ignoreCalls: !1,
              ignoreVideoCalls: !1,
              readReceipts: !0,
              blocked: !1,
            }))
          : (m(null),
            api
              .get(`/messaging/conversations/${d}/settings`)
              .then(ee)
              .catch(() => {})));
    }, [d, I?.isGroup]),
    (0, React.useEffect)(() => {
      _e.current && (_e.current.scrollTop = _e.current.scrollHeight);
    }, [h, D]));
  let xe = (0, React.useCallback)(
      (e) => {
        let t = getSocket();
        !t ||
          !d ||
          !I ||
          I.isGroup ||
          t.emit(e ? `typing:start` : `typing:stop`, {
            conversationId: d,
            targetUserId: I.other?.id,
          });
      },
      [d, I],
    ),
    Se = () => {
      (xe(!0),
        clearTimeout(ye.current),
        (ye.current = setTimeout(() => xe(!1), 2e3)));
    },
    Ce = (e) => {
      (f(e), y(!0), oe(null));
    },
    we = async () => {
      let e = b.trim();
      if (!(!e || E.blocked || !d)) {
        x(``);
        try {
          let t = await api.post(`/messaging/conversations/${d}/messages`, {
            type: `text`,
            text: e,
          });
          (g((e) => [...e, t.message]), be());
        } catch (e) {
          me(e.message || `Could not send that message.`, `error`);
        }
        ve.current?.focus();
      }
    },
    Te = (e) => {
      let t = e.target.files?.[0];
      t &&
        (A({ file: t, url: URL.createObjectURL(t) }),
        ne(!0),
        (e.target.value = ``));
    },
    Ee = async ({ mode: e, duration: t, noScreenshot: n }) => {
      if (!(!k || !d)) {
        ie(!0);
        try {
          let r = new FormData();
          (r.append(`file`, k.file),
            r.append(`purpose`, e === `timed` ? `timed_image` : `chat_image`));
          let i = await api.upload(`/media/upload`, r),
            a =
              e === `timed`
                ? {
                    type: `timed_image`,
                    mediaId: i.mediaId,
                    durationSeconds: t,
                    noScreenshot: n,
                  }
                : { type: `image`, mediaId: i.mediaId },
            o = await api.post(`/messaging/conversations/${d}/messages`, a);
          (g((e) => [...e, o.message]), be(), ne(!1), A(null));
        } catch (e) {
          me(e.message || `Could not send that image.`, `error`);
        } finally {
          ie(!1);
        }
      }
    },
    De = async (e) => {
      let t = { ...E, [e]: !E[e] };
      ee(t);
      try {
        await api.patch(`/messaging/conversations/${d}/settings`, {
          [e]: t[e],
        });
      } catch {
        ee(E);
      }
    },
    Oe = () => {
      ge(
        `Unmatch? They won't be able to contact you again.`,
        async () => {
          try {
            (await api.post(`/messaging/conversations/${d}/unmatch`, {}),
              C(!1),
              f(null),
              be());
          } catch (e) {
            me(e.message || `Could not unmatch.`, `error`);
          }
        },
        { confirmLabel: `Unmatch`, danger: !0 },
      );
    },
    ke = (r) => {
      if (I) {
        if (e?.membership?.plan === `free`) {
          he(`Voice and video calling require a Basic or Premium plan.`);
          return;
        }
        if (I.isGroup) {
          n(d, L.title, r);
          return;
        }
        I.other?.id &&
          t(d, I.other.id, r, {
            peerName: L.title,
            peerAvatarEmoji: L.avatarEmoji,
          });
      }
    },
    Ae = I?.isGroup
      ? i?.conversationId === d
        ? i
        : null
      : r?.conversationId === d && a !== `idle`
        ? r
        : null,
    je = () => {
      I?.isGroup ? s() : o();
    },
    Me = l.filter((e) =>
      ((e.isGroup ? e.group?.name : e.other?.displayName) || ``)
        .toLowerCase()
        .includes(w.toLowerCase()),
    ),
    L = I?.isGroup
      ? {
          title: p?.name || I.group?.name,
          subtitle: `${I.memberCount} members`,
          avatarEmoji: `👥`,
          avatarUrl: I.group?.avatarUrl,
          presence: null,
          plan: null,
          placeholderName: `the group`,
        }
      : {
          title: I?.other?.displayName,
          subtitle: [I?.other?.age, I?.other?.city, I?.other?.religion]
            .filter(Boolean)
            .join(` · `),
          avatarEmoji: Aa.woman,
          avatarUrl: I?.other?.avatarUrl,
          presence: I?.presence,
          plan: I?.other?.plan,
          placeholderName: I?.other?.displayName,
        },
    Ne =
      I?.isGroup && p?.members
        ? new Map(
            p.members.map((e) => [
              e.id,
              { name: e.displayName, avatarUrl: e.avatarUrl },
            ]),
          )
        : null,
    Pe = d && (
      <>
        <MessageRow
          messages={h}
          meId={e?.id}
          avatarEmoji={L.avatarEmoji}
          isGroup={!!I?.isGroup}
          senderInfo={Ne}
          settings={E}
          isTyping={D}
          messagesContainerRef={_e}
        />
        <MessageComposer
          newMessage={b}
          setNewMessage={x}
          handleSendMessage={we}
          handleImageSelect={Te}
          settings={E}
          placeholderName={L.placeholderName}
          inputRef={ve}
          onTyping={Se}
        />
      </>
    );
  return (
    <>
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');\n        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .msg-root { font-family: 'Playfair Display', Georgia, serif; height: 100vh; width: 100vw; background: #F8FAF5; color: #2D2D2D; overflow: hidden; display: flex; flex-direction: column; }\n        ::-webkit-scrollbar { width: 4px; }\n        ::-webkit-scrollbar-thumb { background: #2D6A4F; border-radius: 10px; }\n\n        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }\n        @keyframes fadeIn { from{opacity:0} to{opacity:1} }\n        @keyframes popIn { from{transform:scale(0.9);opacity:0} to{transform:scale(1);opacity:1} }\n        @keyframes slideUp { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }\n        @keyframes bounceDot { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }\n        @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.45)} 70%{box-shadow:0 0 0 5px rgba(16,185,129,0)} }\n\n        .shimmer-text { background:linear-gradient(135deg,#40916C,#74C69D,#40916C); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; }\n\n        .desktop-layout { display:none; }\n        @media (min-width:768px) {\n          .desktop-layout { display:flex; flex:1; overflow:hidden; min-height:0; }\n          .mobile-layout { display:none !important; }\n        }\n\n        .sidebar { width:290px; flex-shrink:0; display:flex; flex-direction:column; background:white; border-right:1px solid #E8F5EE; }\n        .sidebar-head { padding:20px 20px 14px; border-bottom:1px solid #E8F5EE; flex-shrink:0; }\n        .sidebar-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; position: relative; }\n        .sidebar-title { font-weight:700; font-size:18px; display:block; }\n        .sidebar-menu-btn { background: #F0FAF4; border: 1px solid #D4EDDA; border-radius: 8px; width: 28px; height: 28px; cursor: pointer; color: #2D6A4F; font-size: 16px; }\n        .sidebar-menu-dropdown { position: absolute; top: 34px; right: 0; background: #fff; border: 1px solid #E8F5EE; border-radius: 12px; box-shadow: 0 8px 24px rgba(27,58,75,0.15); z-index: 50; min-width: 160px; overflow: hidden; }\n        .sidebar-menu-dropdown button { width: 100%; text-align: left; padding: 10px 14px; border: none; background: #fff; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1B3A4B; }\n        .sidebar-menu-dropdown button:hover { background: #F0FAF4; }\n        .search-wrap { position:relative; }\n        .search-inp { width:100%; padding:8px 12px 8px 30px; border-radius:12px; background:#F8FAF5; border:1px solid #E8F5EE; font-size:11px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }\n        .search-inp:focus { border-color:#2D6A4F; }\n        .search-ico { position:absolute; left:9px; top:50%; transform:translateY(-50%); color:#CCC; width:13px; height:13px; }\n        .contacts-list { flex:1; overflow-y:auto; }\n\n        .c-row { width:100%; padding:12px 16px; border-bottom:1px solid #F0FAF4; display:flex; align-items:center; gap:12px; background:none; border-left:3px solid transparent; cursor:pointer; text-align:left; transition:background 0.15s,border-color 0.15s; }\n        .c-row:hover { background:rgba(45,106,79,0.07); }\n        .c-row.active { background:linear-gradient(90deg,rgba(45,106,79,0.13),rgba(82,183,136,0.07)); border-left-color:#2D6A4F; }\n        .c-avwrap { position:relative; flex-shrink:0; }\n        .c-av { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#F8FAF5,#D4EDDA); border:1px solid #E8F5EE; display:flex; align-items:center; justify-content:center; font-size:20px; }\n        .c-av.lg { width:48px; height:48px; font-size:24px; }\n        .status-dot { position:absolute; bottom:-1px; right:-1px; width:10px; height:10px; border-radius:50%; border:2px solid white; }\n        .status-dot.online { background:#10b981; animation:pulseDot 2.2s infinite; }\n        .status-dot.offline { background:#d1d5db; }\n        .c-inf { flex:1; min-width:0; }\n        .c-nr { display:flex; align-items:center; justify-content:space-between; margin-bottom:2px; }\n        .c-name { font-weight:600; font-size:13px; color:#2D2D2D; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n        .c-ts { font-size:10px; color:#CCC; font-family:'DM Sans',sans-serif; flex-shrink:0; margin-left:4px; }\n        .c-mr { display:flex; align-items:center; justify-content:space-between; }\n        .c-msg { font-size:11px; color:#AAA; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; font-family:'DM Sans',sans-serif; }\n        .unread { background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; font-size:9px; font-weight:700; min-width:17px; height:17px; border-radius:9px; display:flex; align-items:center; justify-content:center; padding:0 4px; margin-left:6px; flex-shrink:0; }\n\n        .chat-area { flex:1; display:flex; flex-direction:column; min-width:0; }\n        .chat-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; color: #9DC4B0; font-family: 'DM Sans', sans-serif; font-size: 14px; }\n\n        .chat-header { flex-shrink:0; background:white; border-bottom:1px solid #E8F5EE; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; gap:8px; min-width:0; }\n        .ch-left { display:flex; align-items:center; gap:8px; min-width:0; flex:1; overflow:hidden; }\n        .ch-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,#F8FAF5,#D4EDDA); border:1px solid #E8F5EE; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }\n        .ch-name-row { display:flex; align-items:center; gap:8px; }\n        .ch-name { font-weight:700; font-size:15px; color:#2D2D2D; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:130px; }\n        .online-label { font-size:11px; color:#10b981; font-family:'DM Sans',sans-serif; font-weight:500; }\n        .offline-label { font-size:11px; color:#BBB; font-family:'DM Sans',sans-serif; }\n        .ch-meta { font-size:11px; color:#AAA; font-family:'DM Sans',sans-serif; }\n        .ch-actions { display:flex; align-items:center; gap:6px; flex-shrink:0; }\n        .hdr-btn { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; transition:transform 0.15s; }\n        .hdr-btn:hover { transform:scale(1.1); }\n        .hdr-btn:active { transform:scale(0.92); }\n        .hdr-btn.gold { background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; box-shadow:0 2px 8px rgba(45,106,79,0.25); }\n        .hdr-btn.subtle { background:#FAFAFA; border:1px solid #E8F5EE; color:#888; }\n        .hdr-btn.subtle:hover { border-color:#2D6A4F; color:#2D6A4F; }\n\n        .back-btn { display:flex; align-items:center; gap:2px; background:none; border:none; cursor:pointer; color:#2D6A4F; font-weight:700; font-size:14px; padding:4px 8px 4px 0; flex-shrink:0; min-width:32px; }\n\n        .msgs-scroll { flex:1; overflow-y:auto; padding:20px 16px; background:linear-gradient(180deg,#F8FAF5 0%,#fff 100%); display:flex; flex-direction:column; gap:10px; }\n        .date-row { display:flex; justify-content:center; margin-bottom:8px; }\n        .date-chip { font-size:10px; color:#CCC; background:white; border:1px solid #E8F5EE; padding:3px 12px; border-radius:20px; font-family:'DM Sans',sans-serif; }\n        .msg-row { display:flex; align-items:flex-end; gap:8px; animation:slideUp 0.22s ease; }\n        .msg-right { justify-content:flex-end; }\n        .msg-left { justify-content:flex-start; }\n        .msg-avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#F8FAF5,#D4EDDA); border:1px solid #E8F5EE; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; color:#2D6A4F; font-weight:700; }\n        .msg-col { max-width:70%; display:flex; flex-direction:column; }\n        .msg-sender-name { font-size:11px; font-weight:700; color:#2D6A4F; margin:0 0 3px 2px; font-family:'DM Sans',sans-serif; }\n        .bubble { padding:10px 14px; border-radius:18px; font-size:13px; line-height:1.5; font-family:'DM Sans',sans-serif; word-break:break-word; }\n        .bubble-user { background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; border-bottom-right-radius:4px; }\n        .bubble-other { background:white; color:#2D2D2D; border:1px solid #E8F5EE; border-bottom-left-radius:4px; }\n        .typing-bubble { display:flex; align-items:center; gap:5px; padding:12px 16px; }\n        .dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:#CCC; animation:bounceDot 1.2s infinite; }\n        .msg-meta { font-size:10px; color:#CCC; margin-top:3px; font-family:'DM Sans',sans-serif; }\n        .meta-right { text-align:right; padding-right:2px; }\n        .meta-left { text-align:left; padding-left:2px; }\n        .read-tick { color:#2D6A4F; margin-left:3px; }\n\n        .chat-img { max-width:200px; border-radius:14px; cursor:pointer; display:block; object-fit:cover; transition:opacity 0.2s; }\n        .chat-img:hover { opacity:0.9; }\n        .chat-img-user { border-bottom-right-radius:4px; }\n        .chat-img-other { border-bottom-left-radius:4px; border:1px solid #E8F5EE; }\n\n        .lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.88); display:flex; align-items:center; justify-content:center; z-index:200; animation:fadeIn 0.2s ease; cursor:pointer; }\n        .lightbox-close { position:absolute; top:18px; right:22px; background:none; border:none; color:white; font-size:22px; cursor:pointer; opacity:0.7; }\n        .lightbox-close:hover { opacity:1; }\n        .lightbox-img { max-width:90vw; max-height:85vh; border-radius:12px; object-fit:contain; cursor:default; box-shadow:0 8px 48px rgba(0,0,0,0.5); }\n\n        .timed-idle { width:180px; height:110px; border-radius:14px; background:linear-gradient(135deg,rgba(45,106,79,0.08),rgba(82,183,136,0.08)); border:1.5px dashed rgba(45,106,79,0.35); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; user-select:none; gap:5px; transition:transform 0.1s; }\n        .timed-idle:active { transform:scale(0.97); }\n        .timed-idle-label { font-size:12px; font-weight:600; color:#2D6A4F; font-family:'DM Sans',sans-serif; }\n        .timed-idle-sub { font-size:10px; color:#AAA; font-family:'DM Sans',sans-serif; }\n        .timed-viewing { position:relative; width:210px; height:210px; border-radius:14px; overflow:hidden; user-select:none; cursor:pointer; }\n        .timed-photo { width:100%; height:100%; object-fit:cover; }\n        .no-ss-overlay { position:absolute; inset:0; background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(0,0,0,0.035) 8px,rgba(0,0,0,0.035) 9px); pointer-events:none; }\n        .progress-ring { position:absolute; top:8px; right:8px; width:32px; height:32px; filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4)); }\n        .timed-timer { position:absolute; bottom:8px; right:10px; font-size:11px; color:white; font-family:'DM Sans',sans-serif; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5); }\n        .timed-lock-badge { position:absolute; top:8px; left:10px; font-size:14px; }\n        .timed-expired { width:140px; height:58px; border-radius:14px; background:#F5F5F5; border:1px solid #E8F5EE; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; }\n        .timed-expired-text { font-size:11px; color:#AAA; font-family:'DM Sans',sans-serif; }\n        .screenshot-warn { font-size:10px; color:#ef4444; font-family:'DM Sans',sans-serif; }\n\n        .input-bar { flex-shrink:0; background:white; border-top:1px solid #E8F5EE; padding:14px 16px; display:flex; align-items:center; gap:10px; }\n        .input-icon { flex-shrink:0; width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:none; border:none; cursor:pointer; color:#2D6A4F; font-size:20px; transition:background 0.15s; }\n        .input-icon:hover { background:#F8FAF5; }\n        .input-icon:disabled { opacity:0.4; cursor:not-allowed; }\n        .text-input { flex:1; padding:10px 14px; border-radius:12px; background:#F8FAF5; border:1px solid #E8F5EE; font-size:13px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }\n        .text-input:focus { border-color:#2D6A4F; }\n        .text-input:disabled { opacity:0.4; cursor:not-allowed; }\n        .send-btn { flex-shrink:0; width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.15s; box-shadow:0 2px 8px rgba(45,106,79,0.3); }\n        .send-btn:hover { transform:scale(1.07); }\n        .send-btn:active { transform:scale(0.92); }\n        .send-btn:disabled { opacity:0.35; cursor:not-allowed; transform:none; }\n\n        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:16px; animation:fadeIn 0.2s ease; }\n        .img-modal { background:white; border-radius:22px; width:100%; max-width:360px; overflow:hidden; animation:popIn 0.28s cubic-bezier(0.34,1.56,0.64,1); border:1px solid rgba(45,106,79,0.15); }\n        .img-modal-head { display:flex; align-items:center; justify-content:space-between; padding:16px 20px 12px; border-bottom:1px solid #E8F5EE; }\n        .img-modal-title { font-weight:700; font-size:16px; }\n        .modal-x { background:none; border:none; font-size:18px; color:#AAA; cursor:pointer; }\n        .modal-x:hover { color:#2D2D2D; }\n        .img-preview-wrap { padding:16px 20px; background:#F8FAF5; display:flex; justify-content:center; }\n        .img-preview { max-height:180px; max-width:100%; border-radius:12px; object-fit:contain; box-shadow:0 4px 20px rgba(0,0,0,0.1); }\n        .mode-toggle { display:flex; gap:8px; padding:14px 20px 0; }\n        .mode-btn { flex:1; padding:8px 0; border-radius:10px; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:500; border:1.5px solid #E8F5EE; background:#FAFAFA; color:#888; cursor:pointer; transition:all 0.2s; }\n        .mode-btn.active { background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; border-color:transparent; }\n        .timed-opts { padding:14px 20px 0; }\n        .opt-label { font-size:11px; font-weight:600; color:#AAA; text-transform:uppercase; letter-spacing:0.06em; font-family:'DM Sans',sans-serif; margin-bottom:8px; }\n        .duration-row { display:flex; gap:8px; margin-bottom:12px; }\n        .dur-pill { flex:1; padding:7px 0; border-radius:8px; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:600; border:1.5px solid #E8F5EE; background:#FAFAFA; color:#888; cursor:pointer; transition:all 0.18s; }\n        .dur-pill.active { background:rgba(212,175,55,0.1); border-color:#2D6A4F; color:#2D6A4F; }\n        .ss-toggle { display:flex; align-items:center; gap:10px; background:#F8FAF5; border:1.5px solid #E8F5EE; border-radius:10px; padding:10px 14px; cursor:pointer; width:100%; font-size:13px; font-family:'DM Sans',sans-serif; color:#555; transition:border-color 0.2s; }\n        .ss-toggle.active { border-color:#2D6A4F; color:#2D6A4F; }\n        .ss-track { position:relative; display:inline-block; width:42px; height:23px; border-radius:12px; flex-shrink:0; transition:background 0.25s; }\n        .ss-thumb { position:absolute; top:2.5px; width:18px; height:18px; border-radius:50%; background:white; box-shadow:0 1px 3px rgba(0,0,0,0.2); transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); }\n        .img-modal-btns { display:flex; gap:10px; padding:14px 20px 20px; }\n        .img-cancel { flex:1; padding:12px 0; border-radius:14px; border:1.5px solid #E8F5EE; background:white; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:500; color:#888; cursor:pointer; }\n        .img-cancel:hover { border-color:#52B788; color:#52B788; }\n        .img-send { flex:1; padding:12px 0; border-radius:14px; background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:600; border:none; cursor:pointer; box-shadow:0 4px 14px rgba(45,106,79,0.25); }\n        .img-send:hover { transform:scale(1.02); }\n        .img-send:disabled, .img-cancel:disabled { opacity: 0.6; cursor: not-allowed; }\n\n        .settings-bg { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:100; animation:fadeIn 0.2s ease; }\n        .settings-box { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:420px; background:white; border-radius:24px 24px 0 0; z-index:101; animation:popIn 0.28s cubic-bezier(0.34,1.56,0.64,1); max-height:92vh; display:flex; flex-direction:column; overflow:hidden; }\n        @media (min-width:640px) { .settings-box { bottom:auto; border-radius:24px; top:50%; transform:translate(-50%,-50%); } }\n        .settings-bar { height:5px; background:linear-gradient(90deg,#1B3A4B,#2D6A4F,#1B3A4B); flex-shrink:0; }\n        .settings-scroll { overflow-y:auto; padding:20px; }\n        .settings-prof { text-align:center; padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid #E8F5EE; }\n        .settings-av { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,#F8FAF5,#D4EDDA); border:2px solid rgba(45,106,79,0.25); font-size:48px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; position:relative; }\n        .settings-name { font-weight:700; font-size:18px; color:#2D2D2D; margin-bottom:3px; }\n        .settings-sub { font-size:13px; color:#AAA; font-family:'DM Sans',sans-serif; margin-bottom:12px; }\n        .t-row { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-radius:14px; border:1px solid #E8F5EE; background:#F8FAF5; margin-bottom:10px; }\n        .t-row.danger { background:#fff5f5; border-color:#fee2e2; }\n        .t-label { font-size:13px; font-weight:600; color:#2D2D2D; }\n        .t-label.danger { color:#ef4444; }\n        .t-desc { font-size:11px; color:#BBB; font-family:'DM Sans',sans-serif; margin-top:2px; }\n        .toggle-track { position:relative; display:inline-block; width:44px; height:24px; border-radius:12px; cursor:pointer; background:#e5e7eb; transition:background 0.25s; flex-shrink:0; border:none; }\n        .toggle-track.on { background:linear-gradient(135deg,#1B3A4B,#2D6A4F); }\n        .toggle-thumb { position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:50%; background:white; box-shadow:0 1px 4px rgba(0,0,0,0.2); transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); }\n        .toggle-track.on .toggle-thumb { left:23px; }\n        .settings-done { width:100%; padding:13px 0; border-radius:14px; background:linear-gradient(135deg,#1B3A4B,#2D6A4F); color:white; font-size:14px; font-family:'DM Sans',sans-serif; font-weight:600; border:none; cursor:pointer; margin-top:4px; box-shadow:0 4px 14px rgba(45,106,79,0.25); }\n        .settings-danger-btn { width:100%; padding:12px 0; border-radius:14px; border:1.5px solid #C0392B; background:#fff5f5; color:#C0392B; font-weight:700; font-size:13px; cursor:pointer; margin-bottom:10px; font-family:'DM Sans',sans-serif; }\n\n\n        .mobile-layout { display:flex; flex-direction:column; flex:1; background:white; overflow:hidden; min-height:0; }\n        .mobile-contacts { flex:1; overflow-y:auto; }\n        .mobile-chat-panel { position:fixed; top:68px; left:0; right:0; bottom:0; background:#F8FAF5; z-index:60; display:flex; flex-direction:column; transform:translateX(100%); transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); }\n        .mobile-chat-panel.open { transform:translateX(0); }\n        .chevron { width:14px; height:14px; color:#DDD; flex-shrink:0; }\n\n        @media (max-width:480px) {\n          .ch-meta { display:none; }\n          .ch-name { max-width:100px; }\n          .chat-header { padding:10px 12px; }\n          .hdr-btn { width:32px; height:32px; }\n          .ch-name-row { flex-wrap:nowrap; gap:5px; }\n          .online-label, .offline-label { font-size:10px; white-space:nowrap; }\n        }\n      "
        }
      </style>
      <Navbar />
      <div className="msg-root" style={{ paddingTop: 68 }}>
        <div className="desktop-layout">
          <div className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title-row">
                <span className="sidebar-title shimmer-text">Messages</span>
                <button
                  className="sidebar-menu-btn"
                  onClick={() => M((e) => !e)}
                >
                  ⋮
                </button>
                {j && (
                  <div className="sidebar-menu-dropdown">
                    <button
                      onClick={() => {
                        if ((M(!1), e?.membership?.plan === `free`)) {
                          he(
                            `Creating groups requires a Basic or Premium plan.`,
                          );
                          return;
                        }
                        (f(null), oe(`create-group`), y(!0));
                      }}
                    >
                      ➕ Create Group
                    </button>
                    <Link
                      to="/safety"
                      style={{
                        display: `block`,
                        padding: `10px 14px`,
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 13,
                        color: `#1B3A4B`,
                        textDecoration: `none`,
                      }}
                    >
                      🛡️ Safety Center
                    </Link>
                  </div>
                )}
              </div>
              <div className="search-wrap">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={w}
                  onChange={(e) => T(e.target.value)}
                  className="search-inp"
                />
                <svg
                  className="search-ico"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="contacts-list">
              {Me.map((e) => {
                let t = e.isGroup ? e.group?.name : e.other?.displayName,
                  n = e.isGroup ? `👥` : Aa.woman,
                  r = e.isGroup ? e.group?.avatarUrl : e.other?.avatarUrl;
                return (
                  <button
                    key={e.conversationId}
                    onClick={() => Ce(e.conversationId)}
                    className={`c-row ${d === e.conversationId ? `active` : ``}`}
                  >
                    <div className="c-avwrap">
                      <div className="c-av">
                        {r ? (
                          <img
                            src={r}
                            alt=""
                            style={{
                              width: `100%`,
                              height: `100%`,
                              borderRadius: `50%`,
                              objectFit: `cover`,
                            }}
                          />
                        ) : (
                          n
                        )}
                      </div>
                      {!e.isGroup && (
                        <span className={`status-dot ${e.presence}`} />
                      )}
                    </div>
                    <div className="c-inf">
                      <div
                        className="c-nr"
                        style={{
                          display: `flex`,
                          alignItems: `center`,
                          gap: 5,
                        }}
                      >
                        <span className="c-name">{t}</span>
                        {!e.isGroup && <PlanBadge plan={e.other?.plan} />}
                      </div>
                      <div className="c-mr">
                        <span className="c-msg">
                          {e.lastMessage?.preview || `No messages yet`}
                        </span>
                        {e.unreadCount > 0 && (
                          <span className="unread">{e.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              {Me.length === 0 && (
                <p
                  style={{
                    padding: 20,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12.5,
                    color: `#9DC4B0`,
                    textAlign: `center`,
                  }}
                >
                  No conversations yet. Head to Explore to start one!
                </p>
              )}
            </div>
          </div>
          <div className="chat-area">
            {ae === `create-group` ? (
              <CreateGroupModal
                onClose={() => oe(null)}
                onCreated={(e) => {
                  (oe(null), be(), f(e.id));
                }}
              />
            ) : ae === `manage-group` ? (
              <GroupSettingsModal
                groupId={d}
                meId={e?.id}
                onClose={() => oe(null)}
                onLeft={() => {
                  (oe(null), f(null), be());
                }}
                onDeleted={() => {
                  (oe(null), f(null), be());
                }}
                onUpdated={be}
                requestConfirm={ge}
              />
            ) : d ? (
              <>
                <ConversationListItem
                  title={L.title}
                  subtitle={L.subtitle}
                  avatarEmoji={L.avatarEmoji}
                  avatarUrl={L.avatarUrl}
                  presence={L.presence}
                  plan={L.plan}
                  onCall={ke}
                  activeCallHere={Ae}
                  onEndCall={je}
                  onSettings={() => (I?.isGroup ? oe(`manage-group`) : C(!0))}
                  onViewProfile={
                    !I?.isGroup && I?.other?.id ? () => pe(I.other.id) : void 0
                  }
                />
                {Pe}
              </>
            ) : (
              <div className="chat-placeholder">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
        <div className="mobile-layout">
          <div
            style={{
              padding: `16px 16px 12px`,
              borderBottom: `1px solid #E8F5EE`,
              background: `white`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                marginBottom: 10,
              }}
            >
              <span
                className="sidebar-title shimmer-text"
                style={{ fontSize: 18 }}
              >
                Messages
              </span>
              <button
                className="sidebar-menu-btn"
                onClick={() => {
                  if (e?.membership?.plan === `free`) {
                    he(`Creating groups requires a Basic or Premium plan.`);
                    return;
                  }
                  (f(null), oe(`create-group`), y(!0));
                }}
              >
                ➕
              </button>
            </div>
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search..."
                value={w}
                onChange={(e) => T(e.target.value)}
                className="search-inp"
              />
              <svg
                className="search-ico"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mobile-contacts">
            {Me.map((e) => {
              let t = e.isGroup ? e.group?.name : e.other?.displayName,
                n = e.isGroup ? `👥` : Aa.woman,
                r = e.isGroup ? e.group?.avatarUrl : e.other?.avatarUrl;
              return (
                <button
                  key={e.conversationId}
                  onClick={() => Ce(e.conversationId)}
                  className="c-row"
                  style={{ borderLeft: `none`, padding: `14px 16px` }}
                >
                  <div className="c-avwrap">
                    <div className="c-av lg">
                      {r ? (
                        <img
                          src={r}
                          alt=""
                          style={{
                            width: `100%`,
                            height: `100%`,
                            borderRadius: `50%`,
                            objectFit: `cover`,
                          }}
                        />
                      ) : (
                        n
                      )}
                    </div>
                    {!e.isGroup && (
                      <span className={`status-dot ${e.presence}`} />
                    )}
                  </div>
                  <div className="c-inf">
                    <div
                      className="c-nr"
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 5,
                      }}
                    >
                      <span className="c-name">{t}</span>
                      {!e.isGroup && <PlanBadge plan={e.other?.plan} />}
                    </div>
                    <div className="c-mr">
                      <span className="c-msg">
                        {e.lastMessage?.preview || `No messages yet`}
                      </span>
                      {e.unreadCount > 0 && (
                        <span className="unread">{e.unreadCount}</span>
                      )}
                    </div>
                  </div>
                  <svg
                    className="chevron"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className={`mobile-chat-panel ${_ ? `open` : ``}`}>
            {ae === `create-group` ? (
              <CreateGroupModal
                onClose={() => {
                  (oe(null), y(!1));
                }}
                onCreated={(e) => {
                  (oe(null), be(), f(e.id));
                }}
              />
            ) : ae === `manage-group` ? (
              <GroupSettingsModal
                groupId={d}
                meId={e?.id}
                onClose={() => oe(null)}
                onLeft={() => {
                  (oe(null), f(null), y(!1), be());
                }}
                onDeleted={() => {
                  (oe(null), f(null), y(!1), be());
                }}
                onUpdated={be}
                requestConfirm={ge}
              />
            ) : (
              d && (
                <>
                  <ConversationListItem
                    title={L.title}
                    subtitle={L.subtitle}
                    avatarEmoji={L.avatarEmoji}
                    avatarUrl={L.avatarUrl}
                    presence={L.presence}
                    plan={L.plan}
                    onCall={ke}
                    activeCallHere={Ae}
                    onEndCall={je}
                    onSettings={() => (I?.isGroup ? oe(`manage-group`) : C(!0))}
                    onViewProfile={
                      !I?.isGroup && I?.other?.id
                        ? () => pe(I.other.id)
                        : void 0
                    }
                    backBtn={
                      <button onClick={() => y(!1)} className="back-btn">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    }
                  />
                  {Pe}
                </>
              )
            )}
          </div>
        </div>
        {te && k && (
          <SendImageModal
            imageUrl={k.url}
            onSend={Ee}
            onCancel={() => {
              (ne(!1), A(null));
            }}
            sending={re}
            isPremium={e?.membership?.plan === `premium`}
            onRequirePremium={() =>
              he(`Sending view-once photos requires a Premium plan.`)
            }
          />
        )}
        {S && I && !I.isGroup && (
          <>
            <div className="settings-bg" onClick={() => C(!1)} />
            <div className="settings-box">
              <div className="settings-bar" />
              <div className="settings-scroll">
                <div className="settings-prof">
                  <div
                    style={{
                      position: `relative`,
                      display: `inline-block`,
                    }}
                  >
                    <div className="settings-av">{L.avatarEmoji}</div>
                  </div>
                  <div className="settings-name">{L.title}</div>
                  <div className="settings-sub">{L.subtitle}</div>
                </div>
                {[
                  {
                    key: `ignoreCalls`,
                    label: `Ignore Calls`,
                    desc: `Block incoming voice calls`,
                  },
                  {
                    key: `ignoreVideoCalls`,
                    label: `Ignore Video Calls`,
                    desc: `Block incoming video calls`,
                  },
                  {
                    key: `readReceipts`,
                    label: `Read Receipts`,
                    desc: `Show when messages are read`,
                  },
                ].map(({ key: e, label: t, desc: n }) => (
                  <div key={e} className="t-row">
                    <div>
                      <div className="t-label">{t}</div>
                      <div className="t-desc">{n}</div>
                    </div>
                    <button
                      onClick={() => De(e)}
                      className={`toggle-track ${E[e] ? `on` : ``}`}
                    >
                      <span className="toggle-thumb" />
                    </button>
                  </div>
                ))}
                <button
                  className="settings-danger-btn"
                  onClick={() => {
                    (C(!1),
                      ce({
                        type: `user`,
                        id: I.other?.id,
                        name: I.other?.displayName,
                      }));
                  }}
                >
                  🚩 Block or Report
                </button>
                <button className="settings-danger-btn" onClick={Oe}>
                  💔 Unmatch
                </button>
                <button className="settings-done" onClick={() => C(!1)}>
                  Done
                </button>
              </div>
            </div>
          </>
        )}
        {se && (
          <ReportBlockModal
            target={se}
            onClose={() => ce(null)}
            onBlocked={() => {
              (ce(null), f(null), be());
            }}
          />
        )}
        {F && (
          <ConfirmDialog
            message={F.message}
            confirmLabel={F.confirmLabel}
            danger={F.danger}
            onConfirm={F.onConfirm}
            onCancel={() => le(null)}
          />
        )}
        {N && (
          <Toast message={N.message} tone={N.tone} onDismiss={() => P(null)} />
        )}
        {ue && <UpgradeModal message={ue} onClose={() => de(null)} />}
        {fe && <ProfileModal personId={fe} onClose={() => pe(null)} />}
      </div>
    </>
  );
}
var Ma = [
  {
    icon: `🔍`,
    title: `Verify before you trust`,
    desc: `Look for the verified badge, video-call before meeting, and be cautious of profiles that avoid a live conversation.`,
  },
  {
    icon: `🚫`,
    title: `Block and report freely`,
    desc: `Use Block or Report on any profile, conversation, or message from the ⋮ menu. Reports are reviewed by our team, never ignored.`,
  },
  {
    icon: `💬`,
    title: `Keep it on-platform at first`,
    desc: `Avoid sharing your phone number, home address, or financial details until you've built real trust. Calls happen through Nikha2, not your personal number.`,
  },
  {
    icon: `🤝`,
    title: `Meeting in person`,
    desc: `Choose a public place for early meetings, tell a friend or family member your plans, and arrange your own transport.`,
  },
  {
    icon: `💰`,
    title: `Never send money`,
    desc: `No genuine match will ever ask you for money, gift cards, or investment help. Report and block immediately if this happens.`,
  },
  {
    icon: `🔒`,
    title: `Control your privacy`,
    desc: `In Settings, you decide who can see your profile, your online status, and whether you appear in search at all.`,
  },
];
function SafetyPage() {
  return (
    <div
      style={{
        fontFamily: `'DM Sans', sans-serif`,
        background: `#F8FAF5`,
        minHeight: `100vh`,
      }}
    >
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');\n        .green-text {\n          background: linear-gradient(135deg, #40916C, #74C69D, #52B788, #B7E4C7, #40916C);\n          background-size: 200% auto;\n          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;\n        }\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: 40,
          paddingRight: 40,
          background: `linear-gradient(160deg, #F0FAF4 0%, #E8F5EE 100%)`,
          borderBottom: `1px solid #D4EDDA`,
          textAlign: `center`,
        }}
      >
        <div style={{ maxWidth: 720, margin: `0 auto` }}>
          <h1
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: `clamp(28px, 4vw, 44px)`,
              fontWeight: 700,
              color: `#1B3A4B`,
              marginBottom: 12,
            }}
          >
            {"Safety "}
            <span className="green-text">Center</span>
          </h1>
          <p style={{ fontSize: 15, color: `#3D6B55` }}>
            Nikha2 connects people who haven't met before. Here's how we — and
            you — keep that safe.
          </p>
        </div>
      </section>
      <section
        style={{ padding: `48px 40px`, maxWidth: 1e3, margin: `0 auto` }}
      >
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(260px, 1fr))`,
            gap: 20,
          }}
        >
          {Ma.map((e) => (
            <div
              key={e.title}
              style={{
                background: `#fff`,
                borderRadius: 16,
                border: `1px solid #E8F5EE`,
                padding: `22px 20px`,
                boxShadow: `0 4px 20px rgba(27,58,75,0.06)`,
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{e.icon}</div>
              <h3
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontWeight: 700,
                  fontSize: 16,
                  color: `#1B3A4B`,
                  marginBottom: 6,
                }}
              >
                {e.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: `#3D6B55`,
                  lineHeight: 1.6,
                }}
              >
                {e.desc}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 32,
            padding: `22px 24px`,
            background: `#F0FAF4`,
            border: `1px solid #D4EDDA`,
            borderRadius: 16,
            textAlign: `center`,
          }}
        >
          <p style={{ fontSize: 13.5, color: `#2D6A4F`, fontWeight: 600 }}>
            If you're in immediate danger, contact your local emergency services
            first — Nikha2's reporting tools are for platform safety, not
            emergency response.
          </p>
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
          }}
        >
          Nikha<span style={{ color: `#74C69D` }}>2</span>{" "}
          <span style={{ color: `#40916C` }}>♡</span>
        </div>
      </footer>
    </div>
  );
}
var Pa = `420155966557-ku317ls22tq2cgnh28uidj4q1gcsgqe5.apps.googleusercontent.com`;
function GoogleButton({ onCredential: e, disabled: t }) {
  let n = (0, React.useRef)(null),
    [r, i] = (0, React.useState)(!1),
    a = (0, React.useRef)(e);
  return (
    (a.current = e),
    (0, React.useEffect)(() => {
      let e = !1,
        t = () => {
          if (!e) {
            if (!window.google?.accounts?.id) {
              setTimeout(t, 150);
              return;
            }
            (window.google.accounts.id.initialize({
              client_id: Pa,
              callback: ({ credential: e }) => a.current?.(e),
            }),
              i(!0));
          }
        };
      return (
        t(),
        () => {
          e = !0;
        }
      );
    }, []),
    (0, React.useEffect)(() => {
      !r ||
        !n.current ||
        window.google.accounts.id.renderButton(n.current, {
          theme: `outline`,
          size: `large`,
          shape: `pill`,
          text: `continue_with`,
          logo_alignment: `center`,
          width: 340,
        });
    }, [r]),
    (
      <div
        ref={n}
        style={{
          display: `flex`,
          justifyContent: `center`,
          width: `100%`,
          opacity: t ? 0.5 : 1,
          pointerEvents: t ? `none` : `auto`,
        }}
      />
    )
  );
}
var ADMIN_THEME = {
    navy: `#1B3A4B`,
    green: `#2D6A4F`,
    greenLight: `#40916C`,
    mint: `#74C69D`,
    paleBg: `#F8FAF5`,
    paleBg2: `#F0FAF4`,
    border: `#D4EDDA`,
    borderSoft: `rgba(116,198,157,0.2)`,
    danger: `#C0392B`,
    dangerBg: `#fff5f5`,
    dangerBorder: `#f5c6c6`,
    gold: `#9A6B00`,
    goldBg: `rgba(212,160,23,0.15)`,
    textMuted: `#5C7A6D`,
  },
  Ia = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');`;
(ADMIN_THEME.paleBg, ADMIN_THEME.navy);
var W = {
    background: `rgba(255,255,255,0.9)`,
    border: `1px solid rgba(64,145,108,0.15)`,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  La = {
    fontFamily: `'Playfair Display', serif`,
    fontWeight: 700,
    color: ADMIN_THEME.navy,
    margin: 0,
  },
  Ra = {
    display: `block`,
    fontSize: 10.5,
    fontWeight: 700,
    color: `#3D6B55`,
    letterSpacing: `0.08em`,
    textTransform: `uppercase`,
    marginBottom: 6,
  },
  za = {
    width: `100%`,
    padding: `10px 13px`,
    borderRadius: 12,
    border: `1.5px solid ${ADMIN_THEME.border}`,
    background: ADMIN_THEME.paleBg,
    color: ADMIN_THEME.navy,
    fontSize: 13.5,
    fontFamily: `'DM Sans', sans-serif`,
    outline: `none`,
    boxSizing: `border-box`,
  },
  Ba = (e) => ({
    padding: `10px 22px`,
    borderRadius: 32,
    border: `none`,
    background: e
      ? `#B7E4C7`
      : `linear-gradient(135deg, ${ADMIN_THEME.navy} 0%, ${ADMIN_THEME.green} 100%)`,
    color: `#fff`,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 13,
    fontWeight: 700,
    cursor: e ? `not-allowed` : `pointer`,
    letterSpacing: `0.02em`,
  }),
  Va = {
    padding: `9px 20px`,
    borderRadius: 32,
    border: `1.5px solid ${ADMIN_THEME.border}`,
    background: `#fff`,
    color: ADMIN_THEME.green,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 13,
    fontWeight: 700,
    cursor: `pointer`,
  },
  Ha = {
    padding: `9px 20px`,
    borderRadius: 32,
    border: `none`,
    background: ADMIN_THEME.danger,
    color: `#fff`,
    fontFamily: `'DM Sans', sans-serif`,
    fontSize: 13,
    fontWeight: 700,
    cursor: `pointer`,
  },
  Ua = { width: `100%`, borderCollapse: `collapse`, fontSize: 13.5 },
  G = {
    textAlign: `left`,
    padding: `10px 12px`,
    fontSize: 10.5,
    fontWeight: 700,
    color: `#3D6B55`,
    letterSpacing: `0.06em`,
    textTransform: `uppercase`,
    borderBottom: `2px solid ${ADMIN_THEME.border}`,
  },
  K = {
    padding: `12px 12px`,
    borderBottom: `1px solid ${ADMIN_THEME.borderSoft}`,
    verticalAlign: `middle`,
  };
function Wa(e) {
  let t = {
      verified: { bg: `rgba(45,106,79,0.12)`, color: ADMIN_THEME.green },
      pending: { bg: `rgba(212,160,23,0.15)`, color: ADMIN_THEME.gold },
      none: { bg: `rgba(92,122,109,0.12)`, color: ADMIN_THEME.textMuted },
      blocked: { bg: ADMIN_THEME.dangerBg, color: ADMIN_THEME.danger },
      open: { bg: `rgba(212,160,23,0.15)`, color: ADMIN_THEME.gold },
      reviewed: { bg: `rgba(45,106,79,0.12)`, color: ADMIN_THEME.green },
      dismissed: { bg: `rgba(92,122,109,0.12)`, color: ADMIN_THEME.textMuted },
      actioned: { bg: `rgba(45,106,79,0.12)`, color: ADMIN_THEME.green },
    },
    n = t[e] || t.none;
  return {
    display: `inline-block`,
    padding: `3px 11px`,
    borderRadius: 20,
    fontSize: 11.5,
    fontWeight: 700,
    background: n.bg,
    color: n.color,
    textTransform: `capitalize`,
  };
}
var Ga = {
  INVALID_CREDENTIALS: `Incorrect admin password.`,
  ACCESS_DENIED: `This Google account is not authorized for admin access.`,
  INVALID_GOOGLE_TOKEN: `Google sign-in could not be verified. Please try again.`,
  ADMIN_PANEL_NOT_CONFIGURED: `The admin panel hasn't been configured on this server yet.`,
};
function AdminLoginPage() {
  let {
      user: e,
      isAuthenticated: t,
      loading: n,
      loginAdminWithGoogle: r,
    } = useAuth(),
    i = useLocation(),
    [a, o] = (0, React.useState)(``),
    [s, c] = (0, React.useState)(!1),
    [l, u] = (0, React.useState)(``);
  if (!n && t && e?.role === `admin`)
    return <Navigate to={i.state?.from || `/admin`} replace={!0} />;
  async function d(e) {
    if (!a) {
      u(`Enter the admin password first.`);
      return;
    }
    (c(!0), u(``));
    try {
      await r(e, a);
    } catch (e) {
      (u(
        e instanceof ApiError
          ? Ga[e.code] || e.message
          : `Sign-in failed. Please try again.`,
      ),
        c(!1));
    }
  }
  return (
    <div
      style={{
        minHeight: `100vh`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        background: `linear-gradient(160deg, ${ADMIN_THEME.paleBg} 0%, ${ADMIN_THEME.paleBg2} 100%)`,
        fontFamily: `'DM Sans', sans-serif`,
        padding: 20,
      }}
    >
      <style>{Ia}</style>
      <div
        style={{
          width: `100%`,
          maxWidth: 380,
          background: `#fff`,
          borderRadius: 24,
          border: `1px solid rgba(64,145,108,0.15)`,
          boxShadow: `0 20px 60px rgba(27,58,75,0.12)`,
          padding: `36px 32px`,
        }}
      >
        <div style={{ textAlign: `center`, marginBottom: 26 }}>
          <div
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontWeight: 700,
              fontSize: 24,
              color: ADMIN_THEME.navy,
            }}
          >
            Nikha2 Admin
          </div>
          <div
            style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginTop: 6 }}
          >
            Restricted access — admin Google account + shared password required.
          </div>
        </div>
        <label
          style={{
            display: `block`,
            fontSize: 10.5,
            fontWeight: 700,
            color: `#3D6B55`,
            letterSpacing: `0.08em`,
            textTransform: `uppercase`,
            marginBottom: 6,
          }}
        >
          Admin Password
        </label>
        <input
          type="password"
          value={a}
          onChange={(e) => {
            (o(e.target.value), u(``));
          }}
          placeholder="Shared admin password"
          autoComplete="current-password"
          disabled={s}
          style={{
            width: `100%`,
            padding: `11px 14px`,
            borderRadius: 12,
            border: `1.5px solid ${ADMIN_THEME.border}`,
            background: ADMIN_THEME.paleBg,
            color: ADMIN_THEME.navy,
            fontSize: 13.5,
            fontFamily: `'DM Sans', sans-serif`,
            outline: `none`,
            boxSizing: `border-box`,
            marginBottom: 20,
          }}
        />
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: 10,
            margin: `4px 0 20px`,
          }}
        >
          <div style={{ flex: 1, height: 1, background: ADMIN_THEME.border }} />
          <span style={{ fontSize: 11, color: ADMIN_THEME.textMuted }}>
            then sign in with Google
          </span>
          <div style={{ flex: 1, height: 1, background: ADMIN_THEME.border }} />
        </div>
        <GoogleButton onCredential={d} disabled={s} />
        {l && (
          <div
            style={{
              marginTop: 18,
              padding: `10px 14px`,
              borderRadius: 12,
              background: `#fff5f5`,
              border: `1px solid #f5c6c6`,
              color: ADMIN_THEME.danger,
              fontSize: 12.5,
              textAlign: `center`,
            }}
          >
            {l}
          </div>
        )}
      </div>
    </div>
  );
}
var qa = [
  { key: `totalUsers`, label: `Total Users` },
  { key: `verifiedUsers`, label: `Verified Users` },
  { key: `activePremiumUsers`, label: `Active Premium` },
  { key: `totalConversations`, label: `Conversations` },
  { key: `totalMessages`, label: `Total Messages` },
  { key: `messagesLast7Days`, label: `Messages (7d)` },
];
function AdminDashboard() {
  let [e, t] = (0, React.useState)(null),
    [n, r] = (0, React.useState)(``);
  return (
    (0, React.useEffect)(() => {
      api
        .get(`/admin/analytics`)
        .then(t)
        .catch((e) => r(e.message));
    }, []),
    (
      <div>
        <h1 style={{ ...La, fontSize: 26, marginBottom: 24 }}>Dashboard</h1>
        {n && <div style={{ ...W, color: ADMIN_THEME.danger }}>{n}</div>}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
            gap: 16,
          }}
        >
          {qa.map((t) => (
            <div key={t.key} style={W}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: ADMIN_THEME.textMuted,
                  textTransform: `uppercase`,
                  letterSpacing: `0.06em`,
                  marginBottom: 8,
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: 30,
                  fontWeight: 700,
                  color: ADMIN_THEME.navy,
                }}
              >
                {e ? (e[t.key] ?? 0).toLocaleString() : `—`}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
var Ya = 20,
  Xa = [
    `Muslim`,
    `Hindu`,
    `Christian`,
    `Sikh`,
    `Buddhist`,
    `Jain`,
    `Jewish`,
    `Other`,
    `Prefer not to say`,
  ],
  Za = [`man`, `woman`, `other`, `prefer_not_to_say`];
function Qa(e) {
  let t = new URLSearchParams();
  for (let [n, r] of Object.entries(e))
    r !== void 0 && r !== `` && r !== null && t.set(n, r);
  return t.toString();
}
function $a(e, t, n) {
  let r = (e) => `"${String(e ?? ``).replace(/"/g, `""`)}"`,
    i = n.map((e) => r(e.label)).join(`,`),
    a = t.map((e) => n.map((t) => r(t.get(e))).join(`,`)).join(`
`),
    o = new Blob(
      [
        i +
          `
` +
          a,
      ],
      { type: `text/csv;charset=utf-8;` },
    ),
    s = URL.createObjectURL(o),
    c = document.createElement(`a`);
  ((c.href = s), (c.download = e), c.click(), URL.revokeObjectURL(s));
}
var eo = [
  { label: `Account ID`, get: (e) => e.accountNumber },
  { label: `Name`, get: (e) => e.name },
  { label: `Username`, get: (e) => e.username },
  { label: `Email`, get: (e) => e.email },
  { label: `Verification`, get: (e) => e.verificationStatus },
  { label: `Blocked`, get: (e) => e.blockedGlobal },
  { label: `Plan`, get: (e) => e.plan },
  { label: `Signed Up`, get: (e) => e.createdAt },
];
function AdminUsersTable() {
  let e = useNavigate(),
    [t, n] = (0, React.useState)([]),
    [r, i] = (0, React.useState)(0),
    [a, o] = (0, React.useState)(1),
    [s, c] = (0, React.useState)({
      verificationStatus: ``,
      blocked: ``,
      nationality: ``,
      religion: ``,
      gender: ``,
      city: ``,
      signupMethod: ``,
      online: ``,
      q: ``,
    }),
    [l, u] = (0, React.useState)(new Set()),
    [d, f] = (0, React.useState)(!0),
    [p, m] = (0, React.useState)(``),
    [h, g] = (0, React.useState)(!1),
    _ = (0, React.useCallback)(async () => {
      (f(!0), m(``));
      try {
        let e = Qa({ ...s, page: a, limit: Ya }),
          t = await api.get(`/admin/users?${e}`);
        (n(t.items), i(t.total), u(new Set()));
      } catch (e) {
        m(e.message);
      } finally {
        f(!1);
      }
    }, [s, a]);
  (0, React.useEffect)(() => {
    _();
  }, [_]);
  function y(e, t) {
    (o(1), c((n) => ({ ...n, [e]: t })));
  }
  async function b(e, t, n) {
    e.stopPropagation();
    try {
      (await api.patch(`/admin/users/${t}/block`, { blocked: !n }), _());
    } catch (e) {
      alert(e.message);
    }
  }
  function x(e) {
    u((t) => {
      let n = new Set(t);
      return (n.has(e) ? n.delete(e) : n.add(e), n);
    });
  }
  async function S(e) {
    if (
      l.size &&
      !(
        e === `delete` &&
        !confirm(
          `Permanently delete ${l.size} account(s)? This cannot be undone.`,
        )
      )
    ) {
      g(!0);
      try {
        (await api.post(`/admin/users/bulk`, { ids: [...l], action: e }),
          await _());
      } catch (e) {
        alert(e.message);
      } finally {
        g(!1);
      }
    }
  }
  let C = Math.max(1, Math.ceil(r / Ya));
  return (
    <div>
      <div
        style={{
          ...W,
          display: `flex`,
          gap: 12,
          alignItems: `flex-end`,
          flexWrap: `wrap`,
        }}
      >
        <AdminCheckbox
          label="Search"
          value={s.q}
          onChange={(e) => y(`q`, e)}
          placeholder="Name, username, email, account ID…"
          width={200}
        />
        <AdminSelect
          label="Verification"
          value={s.verificationStatus}
          onChange={(e) => y(`verificationStatus`, e)}
          options={[
            [``, `Any`],
            [`none`, `None`],
            [`pending`, `Pending`],
            [`verified`, `Verified`],
          ]}
        />
        <AdminSelect
          label="Blocked"
          value={s.blocked}
          onChange={(e) => y(`blocked`, e)}
          options={[
            [``, `Any`],
            [`true`, `Blocked`],
            [`false`, `Not blocked`],
          ]}
        />
        <AdminCheckbox
          label="Nationality"
          value={s.nationality}
          onChange={(e) => y(`nationality`, e)}
          width={130}
        />
        <AdminSelect
          label="Religion"
          value={s.religion}
          onChange={(e) => y(`religion`, e)}
          options={[[``, `Any`], ...Xa.map((e) => [e, e])]}
        />
        <AdminSelect
          label="Gender"
          value={s.gender}
          onChange={(e) => y(`gender`, e)}
          options={[[``, `Any`], ...Za.map((e) => [e, e])]}
        />
        <AdminCheckbox
          label="City"
          value={s.city}
          onChange={(e) => y(`city`, e)}
          width={120}
        />
        <AdminSelect
          label="Signup"
          value={s.signupMethod}
          onChange={(e) => y(`signupMethod`, e)}
          options={[
            [``, `Any`],
            [`google`, `Google`],
            [`local`, `Email`],
          ]}
        />
        <AdminSelect
          label="Online"
          value={s.online}
          onChange={(e) => y(`online`, e)}
          options={[
            [``, `Any`],
            [`true`, `Online`],
            [`false`, `Offline`],
          ]}
        />
        <button style={Va} onClick={() => $a(`users.csv`, t, eo)}>
          Export CSV
        </button>
        <div
          style={{
            fontSize: 12.5,
            color: ADMIN_THEME.textMuted,
            marginLeft: `auto`,
          }}
        >
          {r}
          {" user"}
          {r === 1 ? `` : `s`}
        </div>
      </div>
      {l.size > 0 && (
        <div style={{ ...W, display: `flex`, gap: 8, alignItems: `center` }}>
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>
            {l.size}
            {" selected"}
          </span>
          <button disabled={h} style={Va} onClick={() => S(`verify`)}>
            Verify
          </button>
          <button
            disabled={h}
            style={Va}
            onClick={() => S(`reject_verification`)}
          >
            Reject verification
          </button>
          <button disabled={h} style={Va} onClick={() => S(`block`)}>
            Block
          </button>
          <button disabled={h} style={Va} onClick={() => S(`unblock`)}>
            Unblock
          </button>
          <button disabled={h} style={Ha} onClick={() => S(`delete`)}>
            Delete
          </button>
        </div>
      )}
      {p && <div style={{ ...W, color: ADMIN_THEME.danger }}>{p}</div>}
      <div style={{ ...W, padding: 0, overflowX: `auto` }}>
        <table style={Ua}>
          <thead>
            <tr>
              <th style={G} />
              <th style={G}>Account ID</th>
              <th style={G}>Name</th>
              <th style={G}>Username</th>
              <th style={G}>Email</th>
              <th style={G}>Verification</th>
              <th style={G}>Blocked</th>
              <th style={G}>Plan</th>
              <th style={G}>Signed Up</th>
              <th style={G} />
            </tr>
          </thead>
          <tbody>
            {d && (
              <tr>
                <td style={K} colSpan={10}>
                  Loading…
                </td>
              </tr>
            )}
            {!d && t.length === 0 && (
              <tr>
                <td style={K} colSpan={10}>
                  No users match these filters.
                </td>
              </tr>
            )}
            {!d &&
              t.map((t) => (
                <tr key={t.id} style={{ cursor: `pointer` }}>
                  <td style={K} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={l.has(t.id)}
                      onChange={() => x(t.id)}
                    />
                  </td>
                  <td
                    style={{
                      ...K,
                      fontFamily: `monospace`,
                      fontSize: 11.5,
                      color: ADMIN_THEME.textMuted,
                    }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.accountNumber}
                  </td>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    {t.name}
                  </td>
                  <td
                    style={{
                      ...K,
                      fontFamily: `monospace`,
                      fontSize: 12,
                    }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.username ? `@${t.username}` : `—`}
                  </td>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    {t.email}
                  </td>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    <span style={Wa(t.verificationStatus)}>
                      {t.verificationStatus}
                    </span>
                  </td>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    {t.blockedGlobal ? (
                      <span style={Wa(`blocked`)}>Blocked</span>
                    ) : (
                      `—`
                    )}
                  </td>
                  <td
                    style={{ ...K, textTransform: `capitalize` }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.plan}
                  </td>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td style={K}>
                    <button
                      onClick={(e) => b(e, t.id, t.blockedGlobal)}
                      style={Va}
                    >
                      {t.blockedGlobal ? `Unblock` : `Block`}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: `flex`,
          gap: 10,
          alignItems: `center`,
          justifyContent: `center`,
          marginTop: 16,
        }}
      >
        <button style={Va} disabled={a <= 1} onClick={() => o((e) => e - 1)}>
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {a}
          {" of "}
          {C}
        </span>
        <button style={Va} disabled={a >= C} onClick={() => o((e) => e + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
function AdminCheckbox({
  label: e,
  value: t,
  onChange: n,
  placeholder: r,
  width: i = 140,
}) {
  return (
    <div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: ADMIN_THEME.textMuted,
          display: `block`,
          marginBottom: 4,
        }}
      >
        {e}
      </label>
      <input
        value={t}
        onChange={(e) => n(e.target.value)}
        placeholder={r}
        style={{ ...za, width: i }}
      />
    </div>
  );
}
function AdminSelect({ label: e, value: t, onChange: n, options: r }) {
  return (
    <div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: ADMIN_THEME.textMuted,
          display: `block`,
          marginBottom: 4,
        }}
      >
        {e}
      </label>
      <select
        value={t}
        onChange={(e) => n(e.target.value)}
        style={{ ...za, width: 130 }}
      >
        {r.map(([e, t]) => (
          <option key={e} value={e}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
function AdminFlaggedUsers() {
  let e = useNavigate(),
    [t, n] = (0, React.useState)([]),
    [r, i] = (0, React.useState)(!0),
    [a, o] = (0, React.useState)(``),
    s = (0, React.useCallback)(async () => {
      (i(!0), o(``));
      try {
        n((await api.get(`/admin/users/flagged?limit=100`)).items);
      } catch (e) {
        o(e.message);
      } finally {
        i(!1);
      }
    }, []);
  (0, React.useEffect)(() => {
    s();
  }, [s]);
  async function c(e, t) {
    if (confirm(`Permanently delete ${t}'s account? This cannot be undone.`))
      try {
        (await api.delete(`/admin/users/${e}`), await s());
      } catch (e) {
        alert(e.message);
      }
  }
  return (
    <div>
      <div
        style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginBottom: 16 }}
      >
        Flagged automatically: throwaway email domains, duplicate names within
        the same nationality, or accounts created within minutes of each other.
      </div>
      {a && <div style={{ ...W, color: ADMIN_THEME.danger }}>{a}</div>}
      {!r && t.length === 0 && <div style={W}>Nothing flagged right now.</div>}
      <div style={{ ...W, padding: 0, overflowX: `auto` }}>
        {t.length > 0 && (
          <table style={Ua}>
            <thead>
              <tr>
                <th style={G}>Name</th>
                <th style={G}>Email</th>
                <th style={G}>Reasons</th>
                <th style={G}>Signed Up</th>
                <th style={G} />
              </tr>
            </thead>
            <tbody>
              {t.map((t) => (
                <tr key={t.id}>
                  <td style={K} onClick={() => e(`/admin/users/${t.id}`)}>
                    {t.name}
                  </td>
                  <td style={K}>{t.email}</td>
                  <td
                    style={{
                      ...K,
                      display: `flex`,
                      gap: 6,
                      flexWrap: `wrap`,
                    }}
                  >
                    {t.reasons.map((e) => (
                      <span
                        key={e}
                        style={{
                          ...Wa(`pending`),
                          textTransform: `none`,
                        }}
                      >
                        {e.replace(/_/g, ` `)}
                      </span>
                    ))}
                  </td>
                  <td style={K}>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td style={K}>
                    <button style={Ha} onClick={() => c(t.id, t.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
function AdminUsersPage() {
  let [e, t] = (0, React.useState)(`all`);
  return (
    <div>
      <h1 style={{ ...La, fontSize: 26, marginBottom: 20 }}>Users</h1>
      <div style={{ display: `flex`, gap: 6, marginBottom: 18 }}>
        {[
          [`all`, `All Users`],
          [`flagged`, `Flagged Accounts`],
        ].map(([n, r]) => (
          <button
            key={n}
            onClick={() => t(n)}
            style={{
              padding: `8px 18px`,
              borderRadius: 20,
              border: `1.5px solid ${e === n ? ADMIN_THEME.green : ADMIN_THEME.border}`,
              background: e === n ? ADMIN_THEME.green : `#fff`,
              color: e === n ? `#fff` : ADMIN_THEME.green,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: `pointer`,
              fontFamily: `'DM Sans', sans-serif`,
            }}
          >
            {r}
          </button>
        ))}
      </div>
      {e === `all` ? <AdminUsersTable /> : <AdminFlaggedUsers />}
    </div>
  );
}
var q = [
    `Muslim`,
    `Hindu`,
    `Christian`,
    `Sikh`,
    `Buddhist`,
    `Jain`,
    `Jewish`,
    `Other`,
    `Prefer not to say`,
  ],
  J = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`],
  oo = [`man`, `woman`, `other`, `prefer_not_to_say`],
  so = [`Yes`, `No`, `Prefer not to say`],
  co = [
    { value: `24h`, label: `24 hours` },
    { value: `7d`, label: `7 days` },
    { value: `30d`, label: `30 days` },
  ];
function AdminDefRow({ term: e, children: t }) {
  return (
    <div
      style={{
        display: `flex`,
        padding: `8px 0`,
        borderBottom: `1px solid ${ADMIN_THEME.borderSoft}`,
      }}
    >
      <div
        style={{
          width: 160,
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 700,
          color: ADMIN_THEME.textMuted,
        }}
      >
        {e}
      </div>
      <div style={{ fontSize: 13.5 }}>{t ?? `—`}</div>
    </div>
  );
}
function AdminUserTabs({ tab: e, setTab: t }) {
  return (
    <div style={{ display: `flex`, gap: 6, marginBottom: 16 }}>
      {[
        [`overview`, `Overview`],
        [`edit`, `Edit Profile`],
        [`calls`, `Call History`],
      ].map(([n, r]) => (
        <button
          key={n}
          onClick={() => t(n)}
          style={{
            padding: `8px 16px`,
            borderRadius: 20,
            border: `1.5px solid ${e === n ? ADMIN_THEME.green : ADMIN_THEME.border}`,
            background: e === n ? ADMIN_THEME.green : `#fff`,
            color: e === n ? `#fff` : ADMIN_THEME.green,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: `pointer`,
            fontFamily: `'DM Sans', sans-serif`,
          }}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
function AdminEditProfile({ user: e, onSaved: t }) {
  let [n, r] = (0, React.useState)({
      nationality: e.profile.nationality || ``,
      religion: e.profile.religion || ``,
      ageRange: e.profile.ageRange || ``,
      gender: e.profile.gender || ``,
      hasKids: e.profile.hasKids || ``,
      location: e.profile.location || ``,
      city: e.profile.city || ``,
    }),
    [i, a] = (0, React.useState)(!1);
  async function o() {
    a(!0);
    try {
      let r = Object.fromEntries(Object.entries(n).filter(([, e]) => e !== ``));
      (await api.patch(`/admin/users/${e.id}/profile`, r), await t());
    } catch (e) {
      alert(e.message);
    } finally {
      a(!1);
    }
  }
  function s(e, t) {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={Ra}>{e}</label>
        <select
          value={n[e]}
          onChange={(t) => r((n) => ({ ...n, [e]: t.target.value }))}
          style={za}
        >
          <option value="">—</option>
          {t.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div style={W}>
      <div style={{ ...Ra, marginBottom: 14 }}>
        Edit Profile (admin correction)
      </div>
      {s(`gender`, oo)}
      {s(`religion`, q)}
      {s(`ageRange`, J)}
      {s(`hasKids`, so)}
      <div style={{ marginBottom: 14 }}>
        <label style={Ra}>nationality</label>
        <input
          value={n.nationality}
          onChange={(e) => r((t) => ({ ...t, nationality: e.target.value }))}
          style={za}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={Ra}>location</label>
        <input
          value={n.location}
          onChange={(e) => r((t) => ({ ...t, location: e.target.value }))}
          style={za}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={Ra}>city</label>
        <input
          value={n.city}
          onChange={(e) => r((t) => ({ ...t, city: e.target.value }))}
          style={za}
        />
      </div>
      <button disabled={i} onClick={o} style={Ba(i)}>
        Save changes
      </button>
    </div>
  );
}
function AdminUserCalls({ userId: e }) {
  let [t, n] = (0, React.useState)(null),
    [r, i] = (0, React.useState)(``);
  return (
    (0, React.useEffect)(() => {
      api
        .get(`/admin/users/${e}/calls`)
        .then((e) => n(e.items))
        .catch((e) => i(e.message));
    }, [e]),
    r ? (
      <div style={{ ...W, color: ADMIN_THEME.danger }}>{r}</div>
    ) : t ? (
      t.length ? (
        <div style={{ ...W, padding: 0 }}>
          {t.map((e) => (
            <div
              key={e.id}
              style={{
                padding: `12px 20px`,
                borderBottom: `1px solid ${ADMIN_THEME.borderSoft}`,
                display: `flex`,
                justifyContent: `space-between`,
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: 700,
                    textTransform: `capitalize`,
                  }}
                >
                  {e.type}
                </span>{" "}
                <span style={{ color: ADMIN_THEME.textMuted, fontSize: 12.5 }}>
                  {"with "}
                  {(e.otherParticipants || []).join(`, `) || `—`}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: ADMIN_THEME.textMuted,
                  textAlign: `right`,
                }}
              >
                <div>{new Date(e.createdAt).toLocaleString()}</div>
                <div>
                  {e.durationSeconds == null
                    ? `not answered`
                    : `${e.durationSeconds}s`}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={W}>No call history for this user.</div>
      )
    ) : (
      <div>Loading…</div>
    )
  );
}
function AdminUserDetail() {
  let { id: e } = useParams(),
    t = useNavigate(),
    [n, r] = (0, React.useState)(null),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(!1),
    [c, l] = (0, React.useState)(`overview`),
    [u, d] = (0, React.useState)(`24h`),
    [f, p] = (0, React.useState)(``),
    m = (0, React.useCallback)(async () => {
      try {
        r(await api.get(`/admin/users/${e}`));
      } catch (e) {
        a(e.message);
      }
    }, [e]);
  (0, React.useEffect)(() => {
    m();
  }, [m]);
  async function h(t) {
    s(!0);
    try {
      (await api.post(`/admin/users/${e}/verification`, { decision: t }),
        await m());
    } catch (e) {
      alert(e.message);
    } finally {
      s(!1);
    }
  }
  async function g() {
    s(!0);
    try {
      (await api.patch(`/admin/users/${e}/block`, {
        blocked: !n.blockedGlobal,
      }),
        await m());
    } catch (e) {
      alert(e.message);
    } finally {
      s(!1);
    }
  }
  async function _() {
    if (!f.trim()) {
      alert(`A reason is required to suspend an account.`);
      return;
    }
    s(!0);
    try {
      (await api.post(`/admin/users/${e}/suspend`, {
        duration: u,
        reason: f.trim(),
      }),
        p(``),
        await m());
    } catch (e) {
      alert(e.message);
    } finally {
      s(!1);
    }
  }
  async function y() {
    s(!0);
    try {
      (await api.delete(`/admin/users/${e}/suspend`), await m());
    } catch (e) {
      alert(e.message);
    } finally {
      s(!1);
    }
  }
  async function b() {
    if (
      confirm(`Permanently delete ${n.name}'s account? This cannot be undone.`)
    ) {
      s(!0);
      try {
        (await api.delete(`/admin/users/${e}`), t(`/admin/users`));
      } catch (e) {
        (alert(e.message), s(!1));
      }
    }
  }
  if (i) return <div style={{ ...W, color: ADMIN_THEME.danger }}>{i}</div>;
  if (!n) return <div>Loading…</div>;
  let x = n.suspendedUntil && new Date(n.suspendedUntil) > new Date();
  return (
    <div>
      <button onClick={() => t(-1)} style={{ ...Va, marginBottom: 16 }}>
        ← Back
      </button>
      <div
        style={{
          display: `flex`,
          alignItems: `baseline`,
          gap: 10,
          flexWrap: `wrap`,
        }}
      >
        <h1 style={{ ...La, fontSize: 24, margin: 0 }}>{n.name}</h1>
        {n.username && (
          <span
            style={{
              fontSize: 13.5,
              color: ADMIN_THEME.green,
              fontFamily: `monospace`,
            }}
          >
            @{n.username}
          </span>
        )}
        <span
          style={{
            fontSize: 11.5,
            fontFamily: `monospace`,
            color: ADMIN_THEME.textMuted,
            background: ADMIN_THEME.paleBg2,
            border: `1px solid ${ADMIN_THEME.border}`,
            borderRadius: 20,
            padding: `2px 10px`,
          }}
        >
          {"ID "}
          {n.accountNumber}
        </span>
      </div>
      <div
        style={{
          fontSize: 13,
          color: ADMIN_THEME.textMuted,
          marginBottom: 20,
          marginTop: 4,
        }}
      >
        {n.email}
      </div>
      <AdminUserTabs tab={c} setTab={l} />
      {c === `overview` && (
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `2fr 1fr`,
            gap: 20,
            alignItems: `start`,
          }}
        >
          <div style={W}>
            <div style={{ ...Ra, marginBottom: 14 }}>Account</div>
            <AdminDefRow term="Role">{n.role}</AdminDefRow>
            <AdminDefRow term="Verification">
              <span style={Wa(n.verificationStatus)}>
                {n.verificationStatus}
              </span>
            </AdminDefRow>
            <AdminDefRow term="Blocked">
              {n.blockedGlobal ? (
                <span style={Wa(`blocked`)}>Blocked</span>
              ) : (
                `No`
              )}
            </AdminDefRow>
            <AdminDefRow term="Suspended">
              {x ? (
                <span>
                  <span style={Wa(`blocked`)}>
                    {"Until "}
                    {new Date(n.suspendedUntil).toLocaleString()}
                  </span>
                  {n.suspensionReason && (
                    <div
                      style={{
                        marginTop: 4,
                        color: ADMIN_THEME.textMuted,
                        fontSize: 12,
                      }}
                    >
                      {n.suspensionReason}
                    </div>
                  )}
                </span>
              ) : (
                `No`
              )}
            </AdminDefRow>
            <AdminDefRow term="Plan">
              {n.membership.plan}
              {" ("}
              {n.membership.status})
            </AdminDefRow>
            <AdminDefRow term="Phone">{n.phoneNumber}</AdminDefRow>
            <AdminDefRow term="Signed up">
              {new Date(n.createdAt).toLocaleString()}
            </AdminDefRow>
            <AdminDefRow term="Sign-in method">{n.oauthProvider}</AdminDefRow>
            <AdminDefRow term="Account ID">{n.accountNumber}</AdminDefRow>
            <AdminDefRow term="Username">{n.username}</AdminDefRow>
            <div style={{ ...Ra, margin: `20px 0 14px` }}>Profile</div>
            <AdminDefRow term="Gender">{n.profile.gender}</AdminDefRow>
            <AdminDefRow term="Nationality">
              {n.profile.nationality}
            </AdminDefRow>
            <AdminDefRow term="Religion">{n.profile.religion}</AdminDefRow>
            <AdminDefRow term="Age range">{n.profile.ageRange}</AdminDefRow>
            <AdminDefRow term="Location">{n.profile.location}</AdminDefRow>
            <AdminDefRow term="City">{n.profile.city}</AdminDefRow>
            <AdminDefRow term="Has kids">{n.profile.hasKids}</AdminDefRow>
            <AdminDefRow term="Bio">{n.profile.bio}</AdminDefRow>
          </div>
          <div>
            <div style={{ ...W }}>
              <div style={{ ...Ra, marginBottom: 14 }}>Actions</div>
              <div
                style={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: 10,
                }}
              >
                {n.verificationStatus === `pending` && (
                  <>
                    <button
                      disabled={o}
                      onClick={() => h(`approve`)}
                      style={Ba(o)}
                    >
                      Approve verification
                    </button>
                    <button disabled={o} onClick={() => h(`reject`)} style={Ha}>
                      Reject verification
                    </button>
                  </>
                )}
                <button
                  disabled={o}
                  onClick={g}
                  style={n.blockedGlobal ? Va : Ha}
                >
                  {n.blockedGlobal ? `Unblock account` : `Block account`}
                </button>
                <button disabled={o} onClick={b} style={Ha}>
                  Delete account
                </button>
              </div>
            </div>
            <div style={W}>
              <div style={{ ...Ra, marginBottom: 14 }}>
                Temporary Suspension
              </div>
              {x ? (
                <button disabled={o} onClick={y} style={Va}>
                  Lift suspension
                </button>
              ) : (
                <>
                  <select
                    value={u}
                    onChange={(e) => d(e.target.value)}
                    style={{ ...za, marginBottom: 10 }}
                  >
                    {co.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                  <textarea
                    value={f}
                    onChange={(e) => p(e.target.value)}
                    placeholder="Reason (required)"
                    rows={3}
                    style={{
                      ...za,
                      marginBottom: 10,
                      resize: `vertical`,
                    }}
                  />
                  <button disabled={o} onClick={_} style={Ba(o)}>
                    Suspend
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {c === `edit` && <AdminEditProfile user={n} onSaved={m} />}
      {c === `calls` && <AdminUserCalls userId={e} />}
    </div>
  );
}
function AdminVerificationPhoto({ mediaId: e, alt: t, style: n }) {
  let [r, i] = (0, React.useState)(null),
    [a, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let t,
        n = !1;
      return (
        (async () => {
          let r = getTokens();
          try {
            let a = await fetch(`${API_BASE}/admin/verifications/${e}/photo`, {
              headers: r?.accessToken
                ? { Authorization: `Bearer ${r.accessToken}` }
                : {},
            });
            if (!a.ok) throw Error(`fetch failed`);
            let o = await a.blob();
            if (n) return;
            ((t = URL.createObjectURL(o)), i(t));
          } catch {
            n || o(!0);
          }
        })(),
        () => {
          ((n = !0), t && URL.revokeObjectURL(t));
        }
      );
    }, [e]),
    a ? (
      <div
        style={{
          ...n,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `#fff5f5`,
          color: `#C0392B`,
          fontSize: 12,
        }}
      >
        Failed to load
      </div>
    ) : r ? (
      <img src={r} alt={t} style={n} />
    ) : (
      <div
        style={{
          ...n,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `#F0FAF4`,
          color: `#5C7A6D`,
          fontSize: 12,
        }}
      >
        Loading…
      </div>
    )
  );
}
function AdminVerificationsPage() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(!0),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(null),
    c = (0, React.useCallback)(async () => {
      (r(!0), a(``));
      try {
        t((await api.get(`/admin/verifications?limit=50`)).items);
      } catch (e) {
        a(e.message);
      } finally {
        r(!1);
      }
    }, []);
  (0, React.useEffect)(() => {
    c();
  }, [c]);
  async function l(e, n) {
    s(e);
    try {
      (await api.post(`/admin/users/${e}/verification`, { decision: n }),
        t((t) => t.filter((t) => t.id !== e)));
    } catch (e) {
      alert(e.message);
    } finally {
      s(null);
    }
  }
  return (
    <div>
      <h1 style={{ ...La, fontSize: 26, marginBottom: 20 }}>Verifications</h1>
      <div
        style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginBottom: 20 }}
      >
        Pending requests with submitted ID/selfie evidence — review the photo(s)
        before approving.
      </div>
      {i && <div style={{ ...W, color: ADMIN_THEME.danger }}>{i}</div>}
      {!n && e.length === 0 && (
        <div style={W}>No pending verification requests.</div>
      )}
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
          gap: 18,
        }}
      >
        {e.map((e) => (
          <div key={e.id} style={W}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{e.name}</div>
            <div
              style={{
                fontSize: 12.5,
                color: ADMIN_THEME.textMuted,
                marginBottom: 12,
              }}
            >
              {e.email}
            </div>
            {e.mediaIds.length === 0 ? (
              <div
                style={{
                  fontSize: 12.5,
                  color: ADMIN_THEME.danger,
                  marginBottom: 12,
                }}
              >
                No photo was submitted with this request.
              </div>
            ) : (
              <div style={{ display: `flex`, gap: 10, marginBottom: 12 }}>
                {e.mediaIds.map((e) => (
                  <AdminVerificationPhoto
                    key={e}
                    mediaId={e}
                    alt="Verification evidence"
                    style={{
                      width: 130,
                      height: 130,
                      objectFit: `cover`,
                      borderRadius: 12,
                      border: `1px solid ${ADMIN_THEME.border}`,
                    }}
                  />
                ))}
              </div>
            )}
            <div style={{ display: `flex`, gap: 8 }}>
              <button
                disabled={o === e.id}
                style={Ba(o === e.id)}
                onClick={() => l(e.id, `approve`)}
              >
                Approve
              </button>
              <button
                disabled={o === e.id}
                style={Ha}
                onClick={() => l(e.id, `reject`)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
var _o = 20,
  vo = [`open`, `reviewed`, `dismissed`, `actioned`];
function yo(e, t, n) {
  let r = (e) => `"${String(e ?? ``).replace(/"/g, `""`)}"`,
    i = n.map((e) => r(e.label)).join(`,`),
    a = t.map((e) => n.map((t) => r(t.get(e))).join(`,`)).join(`
`),
    o = new Blob(
      [
        i +
          `
` +
          a,
      ],
      { type: `text/csv;charset=utf-8;` },
    ),
    s = URL.createObjectURL(o),
    c = document.createElement(`a`);
  ((c.href = s), (c.download = e), c.click(), URL.revokeObjectURL(s));
}
var bo = [
  { label: `Reporter`, get: (e) => e.reporter.displayName },
  { label: `Target Type`, get: (e) => e.targetType },
  { label: `Reason`, get: (e) => e.reason },
  { label: `Details`, get: (e) => e.details },
  { label: `Status`, get: (e) => e.status },
  { label: `Filed`, get: (e) => e.createdAt },
];
function AdminReportContext({ reportId: e, onClose: t }) {
  let [n, r] = (0, React.useState)(null),
    [i, a] = (0, React.useState)(``);
  return (
    (0, React.useEffect)(() => {
      api
        .get(`/admin/reports/${e}/context`)
        .then(r)
        .catch((e) => a(e.message));
    }, [e]),
    (
      <div
        onClick={t}
        style={{
          position: `fixed`,
          inset: 0,
          background: `rgba(27,58,75,0.5)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          zIndex: 100,
          padding: 20,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `#fff`,
            borderRadius: 20,
            padding: 24,
            maxWidth: 560,
            width: `100%`,
            maxHeight: `80vh`,
            overflow: `auto`,
          }}
        >
          <div
            style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              marginBottom: 16,
            }}
          >
            <div
              style={{ fontWeight: 700, fontSize: 16, color: ADMIN_THEME.navy }}
            >
              Reported Content
            </div>
            <button onClick={t} style={Va}>
              Close
            </button>
          </div>
          {i && <div style={{ color: ADMIN_THEME.danger }}>{i}</div>}
          {!n && !i && <div>Loading…</div>}
          {n && !n.found && <div>The reported content no longer exists.</div>}
          {n?.found && n.targetType === `user` && (
            <div style={{ fontSize: 13.5 }}>
              <div style={{ fontWeight: 700 }}>{n.user.name}</div>
              <div style={{ color: ADMIN_THEME.textMuted, marginBottom: 10 }}>
                {n.user.email}
              </div>
              <div>
                <span style={Wa(n.user.verificationStatus)}>
                  {n.user.verificationStatus}
                </span>
              </div>
              <div style={{ marginTop: 10 }}>{n.user.profile.bio}</div>
            </div>
          )}
          {n?.found && n.targetType === `message` && (
            <div>
              {n.messages.map((e) => (
                <div
                  key={e.id}
                  style={{
                    padding: `8px 12px`,
                    marginBottom: 6,
                    borderRadius: 10,
                    background: e.isFlagged ? `#fff5f5` : ADMIN_THEME.paleBg,
                    border: e.isFlagged
                      ? `1.5px solid ${ADMIN_THEME.dangerBorder}`
                      : `1px solid ${ADMIN_THEME.borderSoft}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: e.isFlagged
                        ? ADMIN_THEME.danger
                        : ADMIN_THEME.textMuted,
                    }}
                  >
                    {e.senderName} {e.isFlagged && `— flagged message`}
                  </div>
                  <div style={{ fontSize: 13.5 }}>
                    {e.type === `text` ? e.text : `[${e.type}]`}
                  </div>
                  <div style={{ fontSize: 10.5, color: ADMIN_THEME.textMuted }}>
                    {new Date(e.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          {n?.found && n.targetType === `conversation` && (
            <div>
              <div
                style={{
                  fontSize: 12.5,
                  color: ADMIN_THEME.textMuted,
                  marginBottom: 10,
                }}
              >
                {"Members: "}
                {n.members.map((e) => e.name).join(`, `)}
              </div>
              {n.recentMessages.map((e) => (
                <div
                  key={e.id}
                  style={{
                    padding: `8px 12px`,
                    marginBottom: 6,
                    borderRadius: 10,
                    background: ADMIN_THEME.paleBg,
                    border: `1px solid ${ADMIN_THEME.borderSoft}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: ADMIN_THEME.textMuted,
                    }}
                  >
                    {e.senderName}
                  </div>
                  <div style={{ fontSize: 13.5 }}>
                    {e.type === `text` ? e.text : `[${e.type}]`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}
function AdminReportsPage() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(0),
    [i, a] = (0, React.useState)(1),
    [o, s] = (0, React.useState)(`open`),
    [c, l] = (0, React.useState)(!0),
    [u, d] = (0, React.useState)(``),
    [f, p] = (0, React.useState)(null),
    m = (0, React.useCallback)(async () => {
      (l(!0), d(``));
      try {
        let e = new URLSearchParams({ page: i, limit: _o });
        o && e.set(`status`, o);
        let n = await api.get(`/admin/reports?${e}`);
        (t(n.items), r(n.total));
      } catch (e) {
        d(e.message);
      } finally {
        l(!1);
      }
    }, [o, i]);
  (0, React.useEffect)(() => {
    m();
  }, [m]);
  async function h(e, t) {
    try {
      (await api.patch(`/admin/reports/${e}`, { status: t }), m());
    } catch (e) {
      alert(e.message);
    }
  }
  let g = Math.max(1, Math.ceil(n / _o));
  return (
    <div>
      <h1 style={{ ...La, fontSize: 26, marginBottom: 20 }}>Reports</h1>
      <div style={{ ...W, display: `flex`, gap: 14, alignItems: `flex-end` }}>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: ADMIN_THEME.textMuted,
              display: `block`,
              marginBottom: 4,
            }}
          >
            Status
          </label>
          <select
            value={o}
            onChange={(e) => {
              (a(1), s(e.target.value));
            }}
            style={{ ...za, width: 160 }}
          >
            <option value="">Any</option>
            {vo.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <button style={Va} onClick={() => yo(`reports.csv`, e, bo)}>
          Export CSV
        </button>
        <div
          style={{
            fontSize: 12.5,
            color: ADMIN_THEME.textMuted,
            marginLeft: `auto`,
          }}
        >
          {n}
          {" report"}
          {n === 1 ? `` : `s`}
        </div>
      </div>
      {u && <div style={{ ...W, color: ADMIN_THEME.danger }}>{u}</div>}
      <div style={{ ...W, padding: 0, overflowX: `auto` }}>
        <table style={Ua}>
          <thead>
            <tr>
              <th style={G}>Reporter</th>
              <th style={G}>Target</th>
              <th style={G}>Reason</th>
              <th style={G}>Details</th>
              <th style={G}>Status</th>
              <th style={G}>Filed</th>
              <th style={G} />
            </tr>
          </thead>
          <tbody>
            {c && (
              <tr>
                <td style={K} colSpan={7}>
                  Loading…
                </td>
              </tr>
            )}
            {!c && e.length === 0 && (
              <tr>
                <td style={K} colSpan={7}>
                  No reports match this filter.
                </td>
              </tr>
            )}
            {!c &&
              e.map((e) => (
                <tr key={e.id}>
                  <td style={K}>{e.reporter.displayName}</td>
                  <td style={{ ...K, textTransform: `capitalize` }}>
                    {e.targetType}
                  </td>
                  <td style={{ ...K, textTransform: `capitalize` }}>
                    {e.reason.replace(/_/g, ` `)}
                  </td>
                  <td
                    style={{
                      ...K,
                      maxWidth: 240,
                      whiteSpace: `pre-wrap`,
                    }}
                  >
                    {e.details || `—`}
                  </td>
                  <td style={K}>
                    <span style={Wa(e.status)}>{e.status}</span>
                  </td>
                  <td style={K}>
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      ...K,
                      display: `flex`,
                      gap: 6,
                      flexWrap: `wrap`,
                    }}
                  >
                    <button style={Va} onClick={() => p(e.id)}>
                      View content
                    </button>
                    {e.status !== `reviewed` && (
                      <button style={Va} onClick={() => h(e.id, `reviewed`)}>
                        Reviewed
                      </button>
                    )}
                    {e.status !== `actioned` && (
                      <button style={Va} onClick={() => h(e.id, `actioned`)}>
                        Actioned
                      </button>
                    )}
                    {e.status !== `dismissed` && (
                      <button style={Va} onClick={() => h(e.id, `dismissed`)}>
                        Dismiss
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: `flex`,
          gap: 10,
          alignItems: `center`,
          justifyContent: `center`,
          marginTop: 16,
        }}
      >
        <button style={Va} disabled={i <= 1} onClick={() => a((e) => e - 1)}>
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {i}
          {" of "}
          {g}
        </span>
        <button style={Va} disabled={i >= g} onClick={() => a((e) => e + 1)}>
          Next
        </button>
      </div>
      {f && <AdminReportContext reportId={f} onClose={() => p(null)} />}
    </div>
  );
}
var Co = 50;
function AdminAuditLogPage() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(0),
    [i, a] = (0, React.useState)(1),
    [o, s] = (0, React.useState)(!0),
    [c, l] = (0, React.useState)(``),
    u = (0, React.useCallback)(async () => {
      (s(!0), l(``));
      try {
        let e = await api.get(`/admin/audit-log?page=${i}&limit=${Co}`);
        (t(e.items), r(e.total));
      } catch (e) {
        l(e.message);
      } finally {
        s(!1);
      }
    }, [i]);
  (0, React.useEffect)(() => {
    u();
  }, [u]);
  let d = Math.max(1, Math.ceil(n / Co));
  return (
    <div>
      <h1 style={{ ...La, fontSize: 26, marginBottom: 20 }}>Audit Log</h1>
      <div
        style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginBottom: 20 }}
      >
        Every admin action — who did what, to whom, and when.
      </div>
      {c && <div style={{ ...W, color: ADMIN_THEME.danger }}>{c}</div>}
      <div style={{ ...W, padding: 0, overflowX: `auto` }}>
        <table style={Ua}>
          <thead>
            <tr>
              <th style={G}>Admin</th>
              <th style={G}>Action</th>
              <th style={G}>Target</th>
              <th style={G}>Details</th>
              <th style={G}>When</th>
            </tr>
          </thead>
          <tbody>
            {o && (
              <tr>
                <td style={K} colSpan={5}>
                  Loading…
                </td>
              </tr>
            )}
            {!o && e.length === 0 && (
              <tr>
                <td style={K} colSpan={5}>
                  No admin actions recorded yet.
                </td>
              </tr>
            )}
            {!o &&
              e.map((e) => (
                <tr key={e.id}>
                  <td style={K}>{e.actorEmail}</td>
                  <td
                    style={{ ...K, fontWeight: 700, color: ADMIN_THEME.green }}
                  >
                    {e.action}
                  </td>
                  <td style={K}>
                    {e.targetType}
                    {e.targetId ? ` · ${e.targetId.slice(0, 8)}…` : ``}
                  </td>
                  <td
                    style={{
                      ...K,
                      maxWidth: 320,
                      fontSize: 12,
                      color: ADMIN_THEME.textMuted,
                      whiteSpace: `pre-wrap`,
                    }}
                  >
                    {e.details ? JSON.stringify(e.details) : `—`}
                  </td>
                  <td style={K}>{new Date(e.createdAt).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: `flex`,
          gap: 10,
          alignItems: `center`,
          justifyContent: `center`,
          marginTop: 16,
        }}
      >
        <button style={Va} disabled={i <= 1} onClick={() => a((e) => e - 1)}>
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {i}
          {" of "}
          {d}
        </span>
        <button style={Va} disabled={i >= d} onClick={() => a((e) => e + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
var To = { free: `Free`, basic: `Basic`, premium: `Premium` };
function Eo(e, t) {
  return new Intl.NumberFormat(void 0, {
    style: `currency`,
    currency: t || `INR`,
  }).format((e ?? 0) / 100);
}
function AdminBillingPage() {
  let [e, t] = (0, React.useState)(null),
    [n, r] = (0, React.useState)([]),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(!0),
    c = (0, React.useCallback)(async () => {
      (s(!0), a(``));
      try {
        let [e, n] = await Promise.all([
          api.get(`/admin/subscriptions`),
          api.get(`/admin/payments?limit=30`),
        ]);
        (t(e), r(n.items));
      } catch (e) {
        a(e.message);
      } finally {
        s(!1);
      }
    }, []);
  return (
    (0, React.useEffect)(() => {
      c();
    }, [c]),
    (
      <div>
        <h1 style={{ ...La, fontSize: 26, marginBottom: 20 }}>Billing</h1>
        {i && <div style={{ ...W, color: ADMIN_THEME.danger }}>{i}</div>}
        {e && !e.stripeConfigured && (
          <div
            style={{
              ...W,
              color: ADMIN_THEME.gold,
              background: ADMIN_THEME.goldBg,
            }}
          >
            Stripe is not configured on this server — plan counts below come
            from the local database, but payment activity will be empty.
          </div>
        )}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, 1fr)`,
            gap: 16,
            marginBottom: 8,
          }}
        >
          {[`free`, `basic`, `premium`].map((t) => (
            <div key={t} style={W}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: ADMIN_THEME.textMuted,
                  textTransform: `uppercase`,
                  letterSpacing: `0.06em`,
                  marginBottom: 8,
                }}
              >
                {To[t]}
              </div>
              <div
                style={{
                  fontFamily: `'Playfair Display', serif`,
                  fontSize: 28,
                  fontWeight: 700,
                  color: ADMIN_THEME.navy,
                }}
              >
                {o ? `—` : (e?.byPlan[t] ?? 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ ...La, fontSize: 18, margin: `24px 0 14px` }}>
          Recent Payments
        </h2>
        <div style={{ ...W, padding: 0, overflowX: `auto` }}>
          <table style={Ua}>
            <thead>
              <tr>
                <th style={G}>User</th>
                <th style={G}>Plan</th>
                <th style={G}>Amount</th>
                <th style={G}>Status</th>
                <th style={G}>Provider</th>
                <th style={G}>Date</th>
              </tr>
            </thead>
            <tbody>
              {o && (
                <tr>
                  <td style={K} colSpan={6}>
                    Loading…
                  </td>
                </tr>
              )}
              {!o && n.length === 0 && (
                <tr>
                  <td style={K} colSpan={6}>
                    No payment activity yet.
                  </td>
                </tr>
              )}
              {!o &&
                n.map((e) => (
                  <tr key={e.id}>
                    <td style={K}>
                      {e.user.name}{" "}
                      <span
                        style={{ color: ADMIN_THEME.textMuted, fontSize: 11.5 }}
                      >
                        ({e.user.email})
                      </span>
                    </td>
                    <td style={{ ...K, textTransform: `capitalize` }}>
                      {e.plan}
                    </td>
                    <td style={K}>{Eo(e.amountCents, e.currency)}</td>
                    <td style={K}>
                      <span
                        style={Wa(
                          e.status === `succeeded`
                            ? `verified`
                            : e.status === `failed`
                              ? `blocked`
                              : `pending`,
                        )}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td style={K}>{e.provider}</td>
                    <td style={K}>
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}
var Oo = [
  { to: `/admin`, label: `Dashboard`, end: !0 },
  { to: `/admin/users`, label: `Users` },
  { to: `/admin/verifications`, label: `Verifications` },
  { to: `/admin/reports`, label: `Reports` },
  { to: `/admin/audit-log`, label: `Audit Log` },
  { to: `/admin/billing`, label: `Billing` },
];
function AdminLayout() {
  let { user: e, logout: t } = useAuth(),
    n = useNavigate();
  async function r() {
    (await t(), n(`/admin/login`, { replace: !0 }));
  }
  return (
    <div
      style={{
        minHeight: `100vh`,
        display: `flex`,
        background: ADMIN_THEME.paleBg,
        fontFamily: `'DM Sans', sans-serif`,
      }}
    >
      <style>{`
        ${Ia}
        .admin-nav-link {
          display: block;
          padding: 10px 16px;
          border-radius: 12px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 4px;
          transition: background 0.15s, color 0.15s;
        }
        .admin-nav-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
        .admin-nav-link.active { background: rgba(255,255,255,0.14); color: #fff; }
      `}</style>
      <aside
        style={{
          width: 220,
          background: ADMIN_THEME.navy,
          padding: `24px 14px`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: `0 10px 24px`,
            fontFamily: `'Playfair Display', serif`,
            fontWeight: 700,
            fontSize: 19,
            color: `#fff`,
          }}
        >
          {"Nikha2 "}
          <span style={{ color: ADMIN_THEME.mint }}>Admin</span>
        </div>
        <nav>
          {Oo.map((e) =>
            /* dynamic tag */ React.createElement(
              kt,
              {
                to: e.to,
                end: e.end,
                className: ({ isActive: e }) =>
                  `admin-nav-link` + (e ? ` active` : ``),
                children: e.label,
              },
              e.to,
            ),
          )}
        </nav>
      </aside>
      <div
        style={{
          flex: 1,
          display: `flex`,
          flexDirection: `column`,
          minWidth: 0,
        }}
      >
        <header
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `flex-end`,
            gap: 14,
            padding: `14px 28px`,
            background: `#fff`,
            borderBottom: `1px solid ${ADMIN_THEME.border}`,
          }}
        >
          <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
            {e?.email}
          </span>
          <button
            onClick={r}
            style={{
              padding: `7px 16px`,
              borderRadius: 32,
              border: `1.5px solid ${ADMIN_THEME.border}`,
              background: `#fff`,
              color: ADMIN_THEME.green,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: `pointer`,
              fontFamily: `'DM Sans', sans-serif`,
            }}
          >
            Log out
          </button>
        </header>
        <main style={{ flex: 1, padding: `28px 32px`, overflow: `auto` }}>
          <Routes>
            <Route index={!0} element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUserDetail />} />
            <Route path="verifications" element={<AdminVerificationsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="audit-log" element={<AdminAuditLogPage />} />
            <Route path="billing" element={<AdminBillingPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
function AuthProvider({ children: e }) {
  let [t, n] = (0, React.useState)(null),
    [r, i] = (0, React.useState)(!0),
    a = (0, React.useCallback)(async () => {
      try {
        let e = await api.get(`/me`);
        return (n(e), e);
      } catch {
        return (setTokens(null), n(null), null);
      }
    }, []);
  (0, React.useEffect)(() => {
    (async () => {
      (getTokens()?.accessToken && (await a()), i(!1));
    })();
  }, [a]);
  let o = (0, React.useCallback)(
      async (e) => {
        let t = await api.post(`/auth/signup`, e);
        return (setTokens(t.auth), await a(), t);
      },
      [a],
    ),
    s = (0, React.useCallback)(
      async (e, t) => {
        let n = await api.post(`/auth/login`, { email: e, password: t });
        return (setTokens(n.auth), await a(), n);
      },
      [a],
    ),
    c = (0, React.useCallback)(
      async (e) => {
        let t = await api.post(`/auth/google`, { idToken: e });
        setTokens(t.auth);
        let n = await a();
        return { ...t, me: n };
      },
      [a],
    ),
    l = (0, React.useCallback)(
      async (e, t) => {
        let n = await api.post(`/admin/auth/login`, {
          idToken: e,
          password: t,
        });
        setTokens(n.auth);
        let r = await a();
        return { ...n, me: r };
      },
      [a],
    ),
    u = (0, React.useCallback)(async () => {
      let e = getTokens();
      try {
        e?.refreshToken &&
          (await api.post(`/auth/logout`, { refreshToken: e.refreshToken }));
      } catch {}
      (setTokens(null), n(null), disconnectSocket());
    }, []),
    d = (0, React.useCallback)(async () => {
      (await api.delete(`/me`), setTokens(null), n(null), disconnectSocket());
    }, []),
    f = (0, React.useCallback)(() => a(), [a]);
  return (
    <AuthContext.Provider
      value={{
        user: t,
        loading: r,
        isAuthenticated: !!t,
        signup: o,
        login: s,
        loginWithGoogle: c,
        loginAdminWithGoogle: l,
        logout: u,
        deleteAccount: d,
        refreshUser: f,
      }}
    >
      {e}
    </AuthContext.Provider>
  );
}
var jo = null;
function getAudioContext() {
  let e = window.AudioContext || window.webkitAudioContext;
  return e
    ? ((jo ||= new e()),
      jo.state === `suspended` && jo.resume().catch(() => {}),
      jo)
    : null;
}
function No(e, t) {
  let n = null,
    r = !1;
  function i(a) {
    if (!r) return;
    let o = e[a % e.length],
      s = getAudioContext();
    if (s && o.freqs.length) {
      let e = s.createGain();
      ((e.gain.value = t), e.connect(s.destination));
      let n = s.currentTime,
        r = n + o.duration / 1e3;
      for (let t of o.freqs) {
        let i = s.createOscillator();
        ((i.type = `sine`),
          (i.frequency.value = t),
          i.connect(e),
          i.start(n),
          i.stop(r));
      }
    }
    n = setTimeout(() => i(a + 1), o.duration);
  }
  return {
    start() {
      r || ((r = !0), i(0));
    },
    stop() {
      ((r = !1), (n &&= (clearTimeout(n), null)));
    },
  };
}
var Po = No(
    [
      { freqs: [440, 480], duration: 1e3 },
      { freqs: [], duration: 3e3 },
    ],
    0.08,
  ),
  Fo = No(
    [
      { freqs: [950], duration: 350 },
      { freqs: [], duration: 150 },
      { freqs: [950], duration: 350 },
      { freqs: [], duration: 1400 },
    ],
    0.12,
  ),
  Io = 4500,
  Lo = 45e3,
  Ro = {
    audio: { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 },
    video: !1,
  },
  zo = {
    audio: { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 },
    video: {
      facingMode: `user`,
      width: { ideal: 640 },
      height: { ideal: 480 },
    },
  };
async function Bo(e) {
  let t =
      e === `video`
        ? [
            zo,
            {
              audio: {
                echoCancellation: !0,
                noiseSuppression: !0,
                autoGainControl: !0,
              },
              video: !0,
            },
            { audio: !0, video: !0 },
          ]
        : [Ro, { audio: !0, video: !1 }],
    n;
  for (let e of t)
    try {
      return await navigator.mediaDevices.getUserMedia(e);
    } catch (e) {
      n = e;
    }
  throw n;
}
function CallProvider({ children: e }) {
  let { isAuthenticated: t, user: n } = useAuth(),
    [r, i] = (0, React.useState)(`idle`),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(null),
    [l, u] = (0, React.useState)(null),
    [d, f] = (0, React.useState)(!1),
    [p, m] = (0, React.useState)(!1),
    [h, g] = (0, React.useState)(null),
    [_, y] = (0, React.useState)(0),
    [b, x] = (0, React.useState)(null),
    [S, C] = (0, React.useState)(null),
    [w, T] = (0, React.useState)(new Map()),
    E = (0, React.useRef)(null),
    ee = (0, React.useRef)([]),
    D = (0, React.useRef)(null),
    O = (0, React.useRef)(null),
    k = (0, React.useRef)(null),
    A = (0, React.useRef)(null),
    te = (0, React.useRef)(null),
    ne = (0, React.useRef)(null),
    re = (0, React.useRef)(null),
    ie = (0, React.useRef)(`idle`),
    j = (0, React.useRef)(new Map()),
    M = (0, React.useRef)(null),
    ae = (0, React.useRef)(null),
    oe = (0, React.useRef)(null);
  ((0, React.useEffect)(() => {
    re.current = a;
  }, [a]),
    (0, React.useEffect)(() => {
      ie.current = r;
    }, [r]),
    (0, React.useEffect)(() => {
      M.current = S;
    }, [S]),
    (0, React.useEffect)(() => {
      oe.current = s;
    }, [s]));
  let se = () => {
      k.current &&= (clearTimeout(k.current), null);
    },
    ce = () => {
      A.current &&= (clearTimeout(A.current), null);
    },
    N = () => {
      te.current &&= (clearInterval(te.current), null);
    },
    P = () => {
      ae.current &&= (clearTimeout(ae.current), null);
    },
    F = (0, React.useCallback)(() => {
      if ((se(), ce(), N(), E.current)) {
        try {
          E.current.close();
        } catch {}
        E.current = null;
      }
      (c((e) => (e?.getTracks().forEach((e) => e.stop()), null)),
        u(null),
        (ee.current = []),
        (D.current = null),
        (O.current = null),
        i(`idle`),
        o(null),
        f(!1),
        m(!1),
        y(0));
    }, []),
    le = (0, React.useCallback)(() => {
      P();
      for (let { pc: e } of j.current.values())
        try {
          e.close();
        } catch {}
      (j.current.clear(),
        T(new Map()),
        c((e) => (e?.getTracks().forEach((e) => e.stop()), null)),
        C(null));
    }, []),
    ue = (0, React.useCallback)(async () => {
      if (ne.current) return ne.current;
      let e = await api.get(`/calls/ice-servers`);
      return ((ne.current = e.iceServers), e.iceServers);
    }, []),
    de = (0, React.useCallback)(
      async (e, t) => {
        let n = await ue(),
          r = new RTCPeerConnection({ iceServers: n });
        return (
          (E.current = r),
          t.getTracks().forEach((e) => r.addTrack(e, t)),
          (r.onicecandidate = (t) => {
            t.candidate &&
              getSocket()?.emit(`call:ice-candidate`, {
                sessionId: e,
                candidate: t.candidate.toJSON(),
              });
          }),
          (r.ontrack = (e) => u(e.streams[0])),
          (r.onconnectionstatechange = () => {
            if (r.connectionState === `connected`)
              (se(),
                i(`connected`),
                (te.current ||= setInterval(() => y((e) => e + 1), 1e3)));
            else if (r.connectionState === `failed`) {
              g(`Connection failed. Please try again.`);
              let e = re.current?.sessionId;
              (e &&
                getSocket()?.emit(`call:reject`, {
                  sessionId: e,
                  reason: `error`,
                }),
                F());
            }
          }),
          r
        );
      },
      [ue, F],
    ),
    fe = (0, React.useCallback)(async () => {
      let e = E.current;
      if (e) {
        for (let t of ee.current)
          try {
            await e.addIceCandidate(t);
          } catch {}
        ee.current = [];
      }
    }, []),
    pe = (0, React.useCallback)(
      async (e, t, n) => {
        let r = await ue(),
          i = new RTCPeerConnection({ iceServers: r });
        return (
          n.getTracks().forEach((e) => i.addTrack(e, n)),
          (i.onicecandidate = (n) => {
            n.candidate &&
              getSocket()?.emit(`call:group-ice-candidate`, {
                sessionId: e,
                targetUserId: t,
                candidate: n.candidate.toJSON(),
              });
          }),
          (i.ontrack = (e) => {
            T((n) => {
              let r = n.get(t);
              if (!r) return n;
              let i = new Map(n);
              return (i.set(t, { ...r, stream: e.streams[0] }), i);
            });
          }),
          (i.onconnectionstatechange = () => {
            T((e) => {
              let n = e.get(t);
              if (!n) return e;
              let r = new Map(e);
              return (
                r.set(t, { ...n, connectionState: i.connectionState }),
                r
              );
            });
          }),
          j.current.set(t, { pc: i, pendingCandidates: [] }),
          i
        );
      },
      [ue],
    ),
    me = (0, React.useCallback)(
      async (e, t, r, i, a) => {
        let o;
        try {
          o = await Bo(t);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            C(null));
          return;
        }
        (c(o),
          C({
            sessionId: e,
            conversationId: r,
            type: t,
            groupName: i,
            status: `connecting`,
            direction: a,
          }));
        let s;
        try {
          s = await api.post(`/calls/sessions/${e}/join`);
        } catch (e) {
          (g(e.message || `Could not join the call.`),
            o.getTracks().forEach((e) => e.stop()),
            c(null),
            C(null));
          return;
        }
        let l = n?.id;
        for (let t of s.participants) {
          T((e) => {
            let n = new Map(e);
            return (
              n.set(t.userId, {
                name: t.name,
                avatarUrl: t.avatarUrl,
                stream: null,
                connectionState: `new`,
              }),
              n
            );
          });
          let n = await pe(e, t.userId, o);
          if (l && l < t.userId)
            try {
              let r = await n.createOffer();
              (await n.setLocalDescription(r),
                getSocket()?.emit(`call:group-offer`, {
                  sessionId: e,
                  targetUserId: t.userId,
                  sdp: { type: r.type, sdp: r.sdp },
                }));
            } catch {}
        }
        C((t) => (t && t.sessionId === e ? { ...t, status: `active` } : t));
      },
      [pe, n],
    ),
    he = (0, React.useCallback)(
      async (e, t, n) => {
        if (ie.current !== `idle` || M.current) return;
        g(null);
        let r;
        try {
          r = await api.post(`/calls/sessions`, { conversationId: e, type: n });
        } catch (e) {
          g(e.message || `Could not start the call.`);
          return;
        }
        if (r.reused) {
          await me(r.sessionId, r.type, e, t, `outgoing`);
          return;
        }
        let i;
        try {
          i = await Bo(n);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            api.post(`/calls/sessions/${r.sessionId}/leave`).catch(() => {}));
          return;
        }
        (c(i),
          C({
            sessionId: r.sessionId,
            conversationId: e,
            type: n,
            groupName: t,
            status: `active`,
            direction: `outgoing`,
          }));
      },
      [me],
    ),
    ge = (0, React.useCallback)(async () => {
      let e = M.current;
      !e ||
        e.status !== `incoming` ||
        (P(),
        await me(
          e.sessionId,
          e.type,
          e.conversationId,
          e.groupName,
          `incoming`,
        ));
    }, [me]),
    _e = (0, React.useCallback)(() => {
      (P(), C(null));
    }, []),
    ve = (0, React.useCallback)(() => {
      let e = M.current;
      e &&
        (api.post(`/calls/sessions/${e.sessionId}/leave`).catch(() => {}),
        le());
    }, [le]),
    ye = (0, React.useCallback)(
      async (e, t, n, r = {}) => {
        if (ie.current !== `idle` || M.current) return;
        g(null);
        let a;
        try {
          a = await api.post(`/calls/sessions`, { conversationId: e, type: n });
        } catch (e) {
          g(e.message || `Could not start the call.`);
          return;
        }
        (o({
          sessionId: a.sessionId,
          conversationId: e,
          type: n,
          peerUserId: t,
          peerName: r.peerName,
          peerAvatarEmoji: r.peerAvatarEmoji,
          direction: `outgoing`,
          calleeMaybeUnavailable: a.calleeOnline === !1,
        }),
          i(`outgoing-ringing`));
        let s = () =>
            getSocket()?.emit(`call:reject`, {
              sessionId: a.sessionId,
              reason: `error`,
            }),
          l;
        try {
          l = await Bo(n);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            s(),
            F());
          return;
        }
        c(l);
        let u = await de(a.sessionId, l);
        try {
          let e = await u.createOffer();
          (await u.setLocalDescription(e),
            getSocket()?.emit(
              `call:offer`,
              { sessionId: a.sessionId, sdp: { type: e.type, sdp: e.sdp } },
              (e) => {
                e?.ok || (g(`Could not reach the other person.`), s(), F());
              },
            ));
        } catch {
          (g(`Could not start the call.`), s(), F());
          return;
        }
        k.current = setTimeout(() => {
          let e = re.current?.peerName;
          (x({
            reason: `no-answer`,
            title: `No Answer`,
            subtitle: e ? `${e} didn't pick up.` : void 0,
          }),
            api.post(`/calls/sessions/${a.sessionId}/end`).catch(() => {}),
            F());
        }, Lo);
      },
      [de, F],
    ),
    I = (0, React.useCallback)(async () => {
      let e = re.current;
      if (ie.current !== `incoming-ringing` || !e) return;
      ce();
      let t;
      try {
        t = await Bo(e.type);
      } catch {
        (g(`Could not access camera/microphone. Check your permissions.`),
          getSocket()?.emit(`call:reject`, {
            sessionId: e.sessionId,
            reason: `no-media-permission`,
          }),
          F());
        return;
      }
      (c(t), i(`connecting`));
      let n = await de(e.sessionId, t),
        r = async (t) => {
          (await n.setRemoteDescription(t), await fe());
          let r = await n.createAnswer();
          (await n.setLocalDescription(r),
            getSocket()?.emit(`call:answer`, {
              sessionId: e.sessionId,
              sdp: { type: r.type, sdp: r.sdp },
            }));
        };
      if (D.current?.sessionId === e.sessionId) {
        let { sdp: e } = D.current;
        ((D.current = null), await r(e));
      } else O.current = r;
    }, [de, fe, F]),
    be = (0, React.useCallback)(
      (e = `declined`) => {
        let t = re.current;
        (t &&
          getSocket()?.emit(`call:reject`, {
            sessionId: t.sessionId,
            reason: e,
          }),
          F());
      },
      [F],
    ),
    xe = (0, React.useCallback)(() => {
      let e = re.current;
      ie.current === `idle` ||
        !e ||
        (api.post(`/calls/sessions/${e.sessionId}/end`).catch(() => {}), F());
    }, [F]),
    Se = (0, React.useCallback)(() => {
      f((e) => {
        let t = !e;
        return (
          s?.getAudioTracks().forEach((e) => {
            e.enabled = !t;
          }),
          t
        );
      });
    }, [s]),
    Ce = (0, React.useCallback)(() => {
      m((e) => {
        let t = !e;
        return (
          s?.getVideoTracks().forEach((e) => {
            e.enabled = !t;
          }),
          t
        );
      });
    }, [s]),
    we = (0, React.useCallback)(() => g(null), []);
  ((0, React.useEffect)(() => {
    r === `outgoing-ringing` ? Po.start() : Po.stop();
  }, [r]),
    (0, React.useEffect)(() => {
      r === `incoming-ringing` || S?.status === `incoming`
        ? Fo.start()
        : Fo.stop();
    }, [r, S?.status]));
  let Te = (0, React.useRef)(!1);
  (0, React.useEffect)(() => {
    if (!b) return;
    (window.history.pushState({ callEndNoticeOpen: !0 }, ``),
      (Te.current = !0));
    let e = () => {
      ((Te.current = !1), x(null));
    };
    window.addEventListener(`popstate`, e);
    let t = setTimeout(() => {
      Te.current ? window.history.back() : x(null);
    }, Io);
    return () => {
      (window.removeEventListener(`popstate`, e), clearTimeout(t));
    };
  }, [b]);
  let Ee = (0, React.useCallback)(() => {
    Te.current ? window.history.back() : x(null);
  }, []);
  ((0, React.useEffect)(() => {
    if (!t) return;
    let e = getSocket();
    if (!e) return;
    let r = async (t) => {
        if (ie.current !== `idle` || M.current) {
          e.emit(`call:reject`, { sessionId: t.sessionId, reason: `busy` });
          return;
        }
        let n = `Someone`;
        try {
          let e = (
            await api.get(`/messaging/conversations/summary`)
          ).items.find((e) => e.conversationId === t.conversationId);
          e?.other?.displayName && (n = e.other.displayName);
        } catch {}
        (o({
          sessionId: t.sessionId,
          conversationId: t.conversationId,
          type: t.type,
          peerUserId: t.from,
          peerName: n,
          peerAvatarEmoji: `🙂`,
          direction: `incoming`,
        }),
          i(`incoming-ringing`),
          (A.current = setTimeout(() => {
            (e.emit(`call:reject`, {
              sessionId: t.sessionId,
              reason: `timeout`,
            }),
              F());
          }, Lo)));
      },
      a = async (e) => {
        let t = re.current;
        if (!(!t || t.sessionId !== e.sessionId))
          if (O.current) {
            let t = O.current;
            ((O.current = null), await t(e.sdp));
          } else D.current = { sessionId: e.sessionId, sdp: e.sdp };
      },
      s = async (e) => {
        let t = re.current;
        if (!(!t || t.sessionId !== e.sessionId || !E.current)) {
          se();
          try {
            (await E.current.setRemoteDescription(e.sdp),
              await fe(),
              i(`connecting`));
          } catch {}
        }
      },
      c = async (e) => {
        let t = re.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = E.current;
        if (n?.remoteDescription)
          try {
            await n.addIceCandidate(e.candidate);
          } catch {}
        else ee.current.push(e.candidate);
      },
      l = (e) => {
        let t = re.current;
        !t ||
          t.sessionId !== e.sessionId ||
          (e.reason === `busy`
            ? x({
                reason: `busy`,
                title: `Unavailable`,
                subtitle: `They're on another call.`,
              })
            : e.reason === `declined`
              ? x({
                  reason: `declined`,
                  title: `Call Declined`,
                  subtitle: t.peerName
                    ? `${t.peerName} declined your call.`
                    : void 0,
                })
              : e.reason === `timeout`
                ? x({
                    reason: `no-answer`,
                    title: `No Answer`,
                    subtitle: t.peerName
                      ? `${t.peerName} didn't pick up.`
                      : void 0,
                  })
                : g(`Call ended.`),
          F());
      },
      u = (e) => {
        let t = re.current;
        !t || t.sessionId !== e.sessionId || F();
      },
      d = (e) => {
        ie.current !== `idle` ||
          M.current ||
          (C({
            sessionId: e.sessionId,
            conversationId: e.conversationId,
            type: e.type,
            groupName: e.groupName,
            status: `incoming`,
            direction: `incoming`,
          }),
          (ae.current = setTimeout(() => {
            C((t) =>
              t?.sessionId === e.sessionId && t.status === `incoming`
                ? null
                : t,
            );
          }, Lo)));
      },
      f = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let r = oe.current;
        if (!r) return;
        T((t) => {
          let n = new Map(t);
          return (
            n.set(e.userId, {
              name: e.name,
              avatarUrl: e.avatarUrl,
              stream: null,
              connectionState: `new`,
            }),
            n
          );
        });
        let i = await pe(e.sessionId, e.userId, r),
          a = n?.id;
        if (a && a < e.userId)
          try {
            let t = await i.createOffer();
            (await i.setLocalDescription(t),
              getSocket()?.emit(`call:group-offer`, {
                sessionId: e.sessionId,
                targetUserId: e.userId,
                sdp: { type: t.type, sdp: t.sdp },
              }));
          } catch {}
      },
      p = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (!n) {
          let t = oe.current;
          if (!t) return;
          (await pe(e.sessionId, e.from, t), (n = j.current.get(e.from)));
        }
        let { pc: r } = n;
        try {
          await r.setRemoteDescription(e.sdp);
          for (let e of n.pendingCandidates)
            try {
              await r.addIceCandidate(e);
            } catch {}
          n.pendingCandidates = [];
          let t = await r.createAnswer();
          (await r.setLocalDescription(t),
            getSocket()?.emit(`call:group-answer`, {
              sessionId: e.sessionId,
              targetUserId: e.from,
              sdp: { type: t.type, sdp: t.sdp },
            }));
        } catch {}
      },
      m = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (n)
          try {
            await n.pc.setRemoteDescription(e.sdp);
            for (let e of n.pendingCandidates)
              try {
                await n.pc.addIceCandidate(e);
              } catch {}
            n.pendingCandidates = [];
          } catch {}
      },
      h = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (n)
          if (n.pc.remoteDescription)
            try {
              await n.pc.addIceCandidate(e.candidate);
            } catch {}
          else n.pendingCandidates.push(e.candidate);
      },
      _ = (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.userId);
        if (n) {
          try {
            n.pc.close();
          } catch {}
          j.current.delete(e.userId);
        }
        T((t) => {
          let n = new Map(t);
          return (n.delete(e.userId), n);
        });
      };
    return (
      e.on(`call:incoming`, r),
      e.on(`call:offer`, a),
      e.on(`call:answer`, s),
      e.on(`call:ice-candidate`, c),
      e.on(`call:rejected`, l),
      e.on(`call:ended`, u),
      e.on(`call:group-incoming`, d),
      e.on(`call:group-participant-joined`, f),
      e.on(`call:group-offer`, p),
      e.on(`call:group-answer`, m),
      e.on(`call:group-ice-candidate`, h),
      e.on(`call:group-participant-left`, _),
      () => {
        (e.off(`call:incoming`, r),
          e.off(`call:offer`, a),
          e.off(`call:answer`, s),
          e.off(`call:ice-candidate`, c),
          e.off(`call:rejected`, l),
          e.off(`call:ended`, u),
          e.off(`call:group-incoming`, d),
          e.off(`call:group-participant-joined`, f),
          e.off(`call:group-offer`, p),
          e.off(`call:group-answer`, m),
          e.off(`call:group-ice-candidate`, h),
          e.off(`call:group-participant-left`, _));
      }
    );
  }, [t, fe, F, pe, n]),
    (0, React.useEffect)(() => {
      t || (F(), le());
    }, [t]),
    (0, React.useEffect)(() => {
      if (!t) return;
      let e = () => {
        if (document.visibilityState !== `visible`) return;
        let e = getSocket();
        e && !e.connected && e.connect();
      };
      return (
        document.addEventListener(`visibilitychange`, e),
        window.addEventListener(`focus`, e),
        () => {
          (document.removeEventListener(`visibilitychange`, e),
            window.removeEventListener(`focus`, e));
        }
      );
    }, [t]));
  let De = {
    callStatus: r,
    activeCall: a,
    localStream: s,
    remoteStream: l,
    isMuted: d,
    isCameraOff: p,
    callError: h,
    callDurationSec: _,
    startCall: ye,
    acceptCall: I,
    declineCall: be,
    endCall: xe,
    toggleMute: Se,
    toggleCamera: Ce,
    clearCallError: we,
    groupCall: S,
    groupParticipants: w,
    startGroupCall: he,
    acceptGroupCall: ge,
    declineGroupCall: _e,
    leaveGroupCall: ve,
    callEndNotice: b,
    dismissCallEndNotice: Ee,
  };
  return <CallContext.Provider value={De}>{e}</CallContext.Provider>;
}
function Ho(e) {
  return `${Math.floor(e / 60)
    .toString()
    .padStart(2, `0`)}:${Math.floor(e % 60)
    .toString()
    .padStart(2, `0`)}`;
}
var Uo = { width: 20, height: 20 };
function MicIcon({ muted: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M19 11a7 7 0 01-.34 2.16l-1.5-1.5A5 5 0 0017 11V5a2 2 0 00-4 0v1.34L3.41 1.77 2 3.18l18.82 18.82 1.41-1.41-4.24-4.24A6.98 6.98 0 0019 11h-2zM12 17a5 5 0 004.24-2.34l-1.46-1.46A3 3 0 019 12v-.17L7.06 9.9A5 5 0 0012 17zm-1-11.83V5a1 1 0 012 0v.17l-2-2z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.93V21h2v-2.07A7 7 0 0019 12h-2z" />
    </svg>
  );
}
function CameraIcon({ off: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M2 3.18L3.41 1.77 22 20.36l-1.41 1.41-3.02-3.02a1 1 0 01-.57.19H4a1 1 0 01-1-1V8a1 1 0 011-1h1.18L2 3.18zM17 10.5V7a1 1 0 00-1-1H8.83l9.99 9.99L17 14.5v-4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  );
}
function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 01-.6.92c-.86.37-1.65.85-2.35 1.4a1 1 0 01-1.33-.08l-1.9-1.9a1 1 0 01.02-1.44C3.85 9.4 7.72 8 12 8s8.15 1.4 10.76 3.72a1 1 0 01.02 1.44l-1.9 1.9a1 1 0 01-1.33.08 12.6 12.6 0 00-2.35-1.4 1 1 0 01-.6-.92v-3.1A15 15 0 0012 9z" />
    </svg>
  );
}
function SpeakerToggleIcon({ on: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4.03v8.05A4.5 4.5 0 0016.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.59 2l2.7-2.7-1.41-1.41L15.17 10l-2.7-2.7-1.41 1.41L13.76 11l-2.7 2.7 1.41 1.41 2.7-2.7 2.7 2.7 1.41-1.41L16.59 11z" />
    </svg>
  );
}
function useAudioOutputs() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(``),
    i =
      typeof window < `u` &&
      window.HTMLMediaElement &&
      typeof HTMLMediaElement.prototype.setSinkId == `function`;
  (0, React.useEffect)(() => {
    i &&
      navigator.mediaDevices
        .enumerateDevices()
        .then((e) => t(e.filter((e) => e.kind === `audiooutput`)))
        .catch(() => {});
  }, [i]);
  let a = e.find((e) => /speaker/i.test(e.label)),
    o = i && !!a;
  return {
    speakerAvailable: o,
    isSpeakerOn: o && n === a.deviceId,
    toggleSpeaker: () => {
      a && r((e) => (e === a.deviceId ? `` : a.deviceId));
    },
    sinkId: n,
  };
}
async function Yo(e, t) {
  if (e && typeof e.setSinkId == `function`)
    try {
      await e.setSinkId(t);
    } catch {}
}
var Xo = (e, t = `#fff`) => ({
  width: 52,
  height: 52,
  borderRadius: `50%`,
  border: `none`,
  cursor: `pointer`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  background: e,
  color: t,
  boxShadow: `0 6px 20px rgba(0,0,0,0.25)`,
  transition: `transform 0.15s`,
});
function CallAvatar({ name: e, size: t = 96 }) {
  let n = (e || `?`).trim().charAt(0).toUpperCase() || `?`;
  return (
    <div
      style={{
        width: t,
        height: t,
        borderRadius: `50%`,
        background: `linear-gradient(135deg, #2D6A4F, #74C69D)`,
        color: `#fff`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        fontFamily: `'Playfair Display', serif`,
        fontSize: t * 0.4,
        fontWeight: 700,
        boxShadow: `0 8px 28px rgba(27,58,75,0.3)`,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}
var Qo = {
    position: `fixed`,
    inset: 0,
    zIndex: 600,
    background: `linear-gradient(160deg, #0d2418 0%, #1B3A4B 100%)`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `stretch`,
    fontFamily: `'DM Sans', sans-serif`,
    color: `#fff`,
    overflowY: `auto`,
    boxSizing: `border-box`,
    paddingTop: `max(20px, env(safe-area-inset-top))`,
    paddingBottom: `max(20px, env(safe-area-inset-bottom))`,
    paddingLeft: `max(16px, env(safe-area-inset-left))`,
    paddingRight: `max(16px, env(safe-area-inset-right))`,
  },
  $o = {
    position: `relative`,
    zIndex: 2,
    flex: 1,
    minHeight: 0,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: 14,
  },
  es = {
    position: `relative`,
    zIndex: 2,
    flexShrink: 0,
    display: `flex`,
    justifyContent: `center`,
    gap: 20,
    paddingTop: 24,
  },
  ts = {
    background: `rgba(192,57,43,0.85)`,
    padding: `6px 16px`,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  };
function VideoTile({
  name: e,
  stream: t,
  isVideoCall: n,
  isLocal: r,
  sinkId: i,
}) {
  let a = (0, React.useRef)(null),
    o = (0, React.useRef)(null),
    s = n && !!t;
  return (
    (0, React.useEffect)(() => {
      a.current && (a.current.srcObject = t || null);
    }, [t]),
    (0, React.useEffect)(() => {
      o.current && (o.current.srcObject = t || null);
    }, [t]),
    (0, React.useEffect)(() => {
      (Yo(a.current, i), Yo(o.current, i));
    }, [i]),
    (
      <div
        style={{
          position: `relative`,
          borderRadius: 14,
          overflow: `hidden`,
          background: `#12291d`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          aspectRatio: `4/3`,
        }}
      >
        {s ? (
          <video
            ref={a}
            autoPlay={!0}
            playsInline={!0}
            muted={!0}
            style={{ width: `100%`, height: `100%`, objectFit: `cover` }}
          />
        ) : (
          <CallAvatar name={e} size={56} />
        )}
        {!r && <audio ref={o} autoPlay={!0} style={{ display: `none` }} />}
        <div
          style={{
            position: `absolute`,
            bottom: 6,
            left: 8,
            fontSize: 11,
            fontWeight: 600,
            textShadow: `0 1px 4px rgba(0,0,0,0.6)`,
          }}
        >
          {r ? `You` : e || `Someone`}
        </div>
      </div>
    )
  );
}
function CallScreen({
  groupCall: e,
  groupParticipants: t,
  localStream: n,
  isMuted: r,
  isCameraOff: i,
  errorBanner: a,
  acceptGroupCall: o,
  declineGroupCall: s,
  leaveGroupCall: c,
  toggleMute: l,
  toggleCamera: u,
  speakerAvailable: d,
  isSpeakerOn: f,
  toggleSpeaker: p,
  sinkId: m,
}) {
  let h = e.type === `video`,
    g = e.status === `incoming`,
    _ = Array.from(t.entries()),
    v = _.length + 1;
  if (g)
    return (
      <div style={Qo}>
        <div style={$o}>
          <CallAvatar name={e.groupName} />
          <div
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 24,
              fontWeight: 700,
              textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
            }}
          >
            {e.groupName || `Group`}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, letterSpacing: `0.04em` }}>
            {"Incoming group "}
            {h ? `video` : `voice`}
            {" call…"}
          </div>
          {a && <div style={ts}>{a}</div>}
        </div>
        <div style={es}>
          <button style={Xo(`#C0392B`)} onClick={s} title="Decline">
            <SpeakerIcon />
          </button>
          <button style={Xo(`#2D6A4F`)} onClick={o} title="Accept">
            <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
        </div>
      </div>
    );
  let y = v <= 1 ? 1 : v <= 4 ? 2 : 3;
  return (
    <div style={Qo}>
      <div
        style={{
          position: `relative`,
          zIndex: 2,
          flex: 1,
          minHeight: 0,
          overflowY: `auto`,
          width: `100%`,
          maxWidth: 720,
          margin: `0 auto`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {e.groupName || `Group call`}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: `0.04em` }}>
          {e.status === `connecting` ? `Connecting…` : `${v} in call`}
        </div>
        {a && <div style={ts}>{a}</div>}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(${y}, 1fr)`,
            gap: 10,
            width: `100%`,
          }}
        >
          <VideoTile
            name="You"
            stream={n}
            isVideoCall={h}
            isLocal={!0}
            sinkId={m}
          />
          {_.map(([e, t]) => (
            <VideoTile
              key={e}
              name={t.name}
              stream={t.stream}
              isVideoCall={h}
              isLocal={!1}
              sinkId={m}
            />
          ))}
        </div>
      </div>
      <div style={es}>
        <button
          style={Xo(
            r ? `#fff` : `rgba(255,255,255,0.18)`,
            r ? `#1B3A4B` : `#fff`,
          )}
          onClick={l}
          title={r ? `Unmute` : `Mute`}
        >
          <MicIcon muted={r} />
        </button>
        {h && (
          <button
            style={Xo(
              i ? `#fff` : `rgba(255,255,255,0.18)`,
              i ? `#1B3A4B` : `#fff`,
            )}
            onClick={u}
            title={i ? `Turn camera on` : `Turn camera off`}
          >
            <CameraIcon off={i} />
          </button>
        )}
        {d && (
          <button
            style={Xo(
              f ? `#fff` : `rgba(255,255,255,0.18)`,
              f ? `#1B3A4B` : `#fff`,
            )}
            onClick={p}
            title={f ? `Switch to earpiece` : `Switch to speaker`}
          >
            <SpeakerToggleIcon on={f} />
          </button>
        )}
        <button style={Xo(`#C0392B`)} onClick={c} title="Leave call">
          <SpeakerIcon />
        </button>
      </div>
    </div>
  );
}
var is = { declined: `🚫`, "no-answer": `📵`, busy: `📵` };
function CallNotice({ notice: e, onDismiss: t }) {
  return (
    <div style={Qo}>
      <button
        onClick={t}
        aria-label="Close"
        style={{
          position: `absolute`,
          top: 20,
          right: 20,
          zIndex: 2,
          background: `rgba(255,255,255,0.14)`,
          border: `none`,
          borderRadius: `50%`,
          width: 36,
          height: 36,
          color: `#fff`,
          fontSize: 16,
          cursor: `pointer`,
        }}
      >
        ✕
      </button>
      <div style={{ ...$o, textAlign: `center` }}>
        <div style={{ fontSize: 46, marginBottom: 6 }}>
          {is[e.reason] || `📵`}
        </div>
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 26,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {e.title}
        </div>
        {e.subtitle && (
          <div style={{ fontSize: 13.5, opacity: 0.75, maxWidth: 280 }}>
            {e.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
function CallOverlay() {
  let {
      callStatus: e,
      activeCall: t,
      localStream: n,
      remoteStream: r,
      isMuted: i,
      isCameraOff: a,
      callError: o,
      callDurationSec: s,
      acceptCall: c,
      declineCall: l,
      endCall: u,
      toggleMute: d,
      toggleCamera: f,
      clearCallError: p,
      groupCall: m,
      groupParticipants: h,
      acceptGroupCall: g,
      declineGroupCall: _,
      leaveGroupCall: y,
      callEndNotice: b,
      dismissCallEndNotice: x,
    } = useCall(),
    S = (0, React.useRef)(null),
    C = (0, React.useRef)(null),
    w = (0, React.useRef)(null),
    [T, E] = (0, React.useState)(null),
    {
      speakerAvailable: ee,
      isSpeakerOn: D,
      toggleSpeaker: O,
      sinkId: k,
    } = useAudioOutputs();
  if (
    ((0, React.useEffect)(() => {
      S.current && (S.current.srcObject = n || null);
    }, [n]),
    (0, React.useEffect)(() => {
      (C.current && (C.current.srcObject = r || null),
        w.current && (w.current.srcObject = r || null));
    }, [r]),
    (0, React.useEffect)(() => {
      (Yo(C.current, k), Yo(w.current, k));
    }, [k]),
    (0, React.useEffect)(() => {
      if (!o) return;
      E(o);
      let e = setTimeout(() => {
        (E(null), p());
      }, 3500);
      return () => clearTimeout(e);
    }, [o]),
    b)
  )
    return <CallNotice notice={b} onDismiss={x} />;
  if (e === `idle` && !m)
    return T ? (
      <div
        style={{
          position: `fixed`,
          top: 80,
          left: `50%`,
          transform: `translateX(-50%)`,
          zIndex: 500,
        }}
      >
        <div
          style={{
            background: `#fff5f5`,
            border: `1.5px solid #f5c6c6`,
            color: `#C0392B`,
            padding: `12px 20px`,
            borderRadius: 16,
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: `0 8px 24px rgba(27,58,75,0.15)`,
          }}
        >
          {T}
        </div>
      </div>
    ) : null;
  if (m)
    return (
      <CallScreen
        groupCall={m}
        groupParticipants={h}
        localStream={n}
        isMuted={i}
        isCameraOff={a}
        errorBanner={T}
        acceptGroupCall={g}
        declineGroupCall={_}
        leaveGroupCall={y}
        toggleMute={d}
        toggleCamera={f}
        speakerAvailable={ee}
        isSpeakerOn={D}
        toggleSpeaker={O}
        sinkId={k}
      />
    );
  if (!t) return null;
  let A = t.type === `video`,
    te = () => {
      (c(),
        w.current?.play?.().catch(() => {}),
        C.current?.play?.().catch(() => {}));
    };
  return (
    <div style={Qo}>
      {A && (
        <video
          ref={C}
          autoPlay={!0}
          playsInline={!0}
          muted={!0}
          style={{
            position: `absolute`,
            inset: 0,
            width: `100%`,
            height: `100%`,
            objectFit: `cover`,
            background: `#0d2418`,
          }}
        />
      )}
      <audio ref={w} autoPlay={!0} style={{ display: `none` }} />
      {A &&
        n &&
        (e === `outgoing-ringing` ||
          e === `connecting` ||
          e === `connected`) && (
          <video
            ref={S}
            autoPlay={!0}
            playsInline={!0}
            muted={!0}
            style={{
              position: `absolute`,
              ...(e === `connected`
                ? {
                    bottom: 110,
                    right: 20,
                    width: 110,
                    height: 150,
                    borderRadius: 16,
                    border: `2px solid rgba(255,255,255,0.3)`,
                  }
                : { inset: 0, width: `100%`, height: `100%`, borderRadius: 0 }),
              objectFit: `cover`,
              zIndex: 1,
            }}
          />
        )}
      <div style={$o}>
        {!(A && e === `connected`) && <CallAvatar name={t.peerName} />}
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 24,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {t.peerName || `Unknown`}
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, letterSpacing: `0.04em` }}>
          {e === `incoming-ringing` &&
            `Incoming ${A ? `video` : `voice`} call…`}
          {e === `outgoing-ringing` && `Calling…`}
          {e === `connecting` && `Connecting…`}
          {e === `connected` && Ho(s)}
        </div>
        {e === `outgoing-ringing` && t.calleeMaybeUnavailable && (
          <div
            style={{
              fontSize: 11.5,
              opacity: 0.65,
              maxWidth: 260,
              textAlign: `center`,
            }}
          >
            They may not be online right now — this might not reach them.
          </div>
        )}
        {T && (
          <div
            style={{
              background: `rgba(192,57,43,0.85)`,
              padding: `6px 16px`,
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {T}
          </div>
        )}
      </div>
      <div style={es}>
        {e === `incoming-ringing` ? (
          <>
            <button
              style={Xo(`#C0392B`)}
              onClick={() => l(`declined`)}
              title="Decline"
            >
              <SpeakerIcon />
            </button>
            <button style={Xo(`#2D6A4F`)} onClick={te} title="Accept">
              <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {(e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  i ? `#fff` : `rgba(255,255,255,0.18)`,
                  i ? `#1B3A4B` : `#fff`,
                )}
                onClick={d}
                title={i ? `Unmute` : `Mute`}
              >
                <MicIcon muted={i} />
              </button>
            )}
            {A && (e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  a ? `#fff` : `rgba(255,255,255,0.18)`,
                  a ? `#1B3A4B` : `#fff`,
                )}
                onClick={f}
                title={a ? `Turn camera on` : `Turn camera off`}
              >
                <CameraIcon off={a} />
              </button>
            )}
            {ee && (e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  D ? `#fff` : `rgba(255,255,255,0.18)`,
                  D ? `#1B3A4B` : `#fff`,
                )}
                onClick={O}
                title={D ? `Switch to earpiece` : `Switch to speaker`}
              >
                <SpeakerToggleIcon on={D} />
              </button>
            )}
            <button style={Xo(`#C0392B`)} onClick={u} title="Hang up">
              <SpeakerIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
function RequireAuth({ children: e }) {
  let { user: t, isAuthenticated: n, loading: r } = useAuth(),
    i = useLocation();
  return r ? null : n ? (
    t && !t.profileComplete && i.pathname !== `/complete-profile` ? (
      <Navigate
        to="/complete-profile"
        state={{ from: i.pathname + i.search }}
        replace={!0}
      />
    ) : (
      e
    )
  ) : (
    <Navigate
      to="/login"
      state={{ from: i.pathname + i.search }}
      replace={!0}
    />
  );
}
function RequireAdmin({ children: e }) {
  let { user: t, isAuthenticated: n, loading: r } = useAuth(),
    i = useLocation();
  return r ? null : !n || t?.role !== `admin` ? (
    <Navigate to="/admin/login" state={{ from: i.pathname }} replace={!0} />
  ) : (
    e
  );
}
function ScrollToTop() {
  return (
    (0, React.useEffect)(() => {
      window.scrollTo({ top: 0, left: 0, behavior: `auto` });
    }, [useLocation().pathname]),
    null
  );
}
function ProfileCompletionGate() {
  let { user: e, isAuthenticated: t, loading: n } = useAuth(),
    r = useLocation(),
    i = useNavigate();
  return (
    (0, React.useEffect)(() => {
      n ||
        !t ||
        !e ||
        r.pathname.startsWith(`/admin`) ||
        (e.profileComplete === !1 &&
          r.pathname !== `/complete-profile` &&
          i(`/complete-profile`, {
            state: { from: r.pathname + r.search },
            replace: !0,
          }));
    }, [n, t, e, r, i]),
    null
  );
}
function App() {
  return (
    <AuthProvider>
      <CallProvider>
        <ScrollToTop />
        <ProfileCompletionGate />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/complete-profile"
            element={
              <RequireAuth>
                <CompleteProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route
            path="/messaging"
            element={
              <RequireAuth>
                <MessagingPage />
              </RequireAuth>
            }
          />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/*"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          />
        </Routes>
        <CallOverlay />
      </CallProvider>
    </AuthProvider>
  );
}
(0, ReactDOMClient.createRoot)(document.getElementById(`root`)).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
