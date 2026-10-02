import { Link, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import { useAuth } from "../context/AuthContext";

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

export { Navbar };
