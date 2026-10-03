import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { useAuth } from "../context/AuthContext";

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

// Password reset is not available on the current backend yet; explain the options.
function ForgotPasswordHint() {
  let [open, setOpen] = React.useState(false);
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `flex-end`,
        gap: 8,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: `'DM Sans', sans-serif`,
          fontSize: 12,
          color: `#40916C`,
          background: `none`,
          border: `none`,
          padding: 0,
          cursor: `pointer`,
        }}
      >
        Forgot Password?
      </button>
      {open && (
        <p
          style={{
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 12,
            lineHeight: 1.6,
            color: `#2D6A4F`,
            background: `#F0FAF4`,
            border: `1px solid #D4EDDA`,
            borderRadius: 10,
            padding: `10px 12px`,
            margin: 0,
            alignSelf: `stretch`,
          }}
        >
          Password reset by email is coming soon. If your account uses Google,
          use "Continue with Google" below. Otherwise, message our support team
          using the chat on the home page and we'll help you get back in.
        </p>
      )}
    </div>
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
          src="/assets/1-BhKNAtC1.png"
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
              <ForgotPasswordHint />
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

export { LoginPage };
