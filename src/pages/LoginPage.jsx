import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";

function LoginPasswordToggle({ shown: e, onClick: t }) {
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
      <button className="nk-btn nk-btn-soft"
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          fontFamily: `var(--font-ui)`,
          fontSize: 12,
          color: `var(--emerald-700)`,
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
            fontFamily: `var(--font-ui)`,
            fontSize: 12,
            lineHeight: 1.6,
            color: `var(--emerald-700)`,
            background: `var(--surface-2)`,
            border: `1px solid var(--line)`,
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
          "\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .login-input {\n          width: 100%;\n          padding: 12px 16px;\n          border-radius: 14px;\n          background: color-mix(in srgb, var(--surface) 65%, transparent);\n          border: 1.5px solid var(--line);\n          color: var(--fg);\n          font-size: 13px;\n          font-family: var(--font-ui);\n          outline: none;\n          transition: border-color 0.2s, box-shadow 0.2s;\n        }\n        .login-input::placeholder { color: var(--muted); }\n        .login-input:focus {\n          border-color: var(--emerald-500);\n          box-shadow: 0 0 0 3px color-mix(in srgb, var(--emerald-500) 12%, transparent);\n        }\n\n        .login-label {\n          display: block;\n          font-family: var(--font-ui);\n          font-size: 10.5px;\n          font-weight: 700;\n          color: var(--muted);\n          letter-spacing: 0.1em;\n          text-transform: uppercase;\n          margin-bottom: 6px;\n        }\n\n        .btn-submit {\n          width: 100%;\n          padding: 14px 0;\n          border-radius: 32px;\n          border: none;\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff;\n          font-family: var(--font-ui);\n          font-size: 14px;\n          font-weight: 700;\n          cursor: pointer;\n          letter-spacing: 0.04em;\n          box-shadow: 0 6px 24px color-mix(in srgb, var(--shadow) 30%, transparent);\n          transition: all 0.22s;\n        }\n        .btn-submit:hover {\n          transform: translateY(-2px);\n          box-shadow: 0 10px 32px color-mix(in srgb, var(--shadow) 40%, transparent);\n        }\n        .btn-submit:active { transform: scale(0.98); }\n\n        @media (max-width: 1024px) {\n          .left-panel { display: none !important; }\n          .right-panel { width: 100% !important; }\n        }\n      "
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
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: `absolute`,
            inset: 0,
            background: `linear-gradient(135deg, color-mix(in srgb, var(--emerald-700) 40%, transparent) 0%, transparent 50%, color-mix(in srgb, var(--overlay) 30%, transparent) 100%)`,
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
              fontFamily: `var(--font-display)`,
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
              fontFamily: `var(--font-ui)`,
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
          background: `var(--bg)`,
          overflowY: `auto`,
        }}
      >
        <div className="nk-rise" style={{ width: `100%`, maxWidth: 420, padding: `20px 0` }}>
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
                className="nk-shiny"
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: `-0.02em`,
                }}
              >
                Nikha2
              </span>
              <span
                style={{
                  fontFamily: `var(--font-ui)`,
                  fontSize: 10,
                  padding: `2px 8px`,
                  borderRadius: 20,
                  color: `var(--emerald-700)`,
                  border: `1px solid var(--emerald-500)`,
                }}
              >
                ™
              </span>
            </Link>
            <p
              style={{
                fontFamily: `var(--font-ui)`,
                fontSize: 13,
                color: `var(--emerald-500)`,
                marginTop: 6,
              }}
            >
              The Second Chance — Global Matchmaking Platform
            </p>
          </div>
          <div
            style={{
              background: `color-mix(in srgb, var(--surface) 75%, transparent)`,
              backdropFilter: `blur(20px)`,
              border: `1px solid color-mix(in srgb, var(--emerald-500) 18%, transparent)`,
              borderRadius: 28,
              padding: 32,
              boxShadow: `0 12px 48px color-mix(in srgb, var(--shadow) 10%, transparent)`,
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
                    fontFamily: `var(--font-ui)`,
                    fontSize: 12.5,
                    color: `var(--danger)`,
                    background: `color-mix(in srgb, var(--danger) 8%, transparent)`,
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
                className="nk-btn nk-btn-primary btn-submit"
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
            <GoogleSignInButton
              redirectTo={f.state?.from || `/explore`}
              onError={s}
            />
          </div>
          <p
            style={{
              fontFamily: `var(--font-ui)`,
              fontSize: 13,
              color: `var(--emerald-500)`,
              textAlign: `center`,
              marginTop: 28,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: `var(--emerald-700)`,
                fontWeight: 700,
                textDecoration: `none`,
                transition: `color 0.2s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = `var(--emerald-700)`)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `var(--emerald-700)`)}
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
