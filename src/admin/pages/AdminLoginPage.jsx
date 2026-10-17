import { Navigate, useLocation } from "react-router-dom";
import * as React from "react";
import { ADMIN_FONT_IMPORT } from "../styles";
import { ADMIN_THEME } from "../theme";
import { GoogleButton } from "../../components/GoogleButton";
import { useAuth } from "../../context/AuthContext";
import { ApiError } from "../../lib/api";
import { ThemeToggle } from "../../components/ThemeToggle";

var Ga = {
  INVALID_CREDENTIALS: `Incorrect admin password.`,
  ACCESS_DENIED: `This Google account is not authorized for admin access.`,
  INVALID_GOOGLE_TOKEN: `Google sign-in could not be verified. Please try again.`,
  ADMIN_PANEL_NOT_CONFIGURED: `The admin panel hasn't been configured on this server yet.`,
};

// Public beta: the admin signs in with the email and password of a beta account
// that the developer has marked as admin in the database.
function BetaAdminLogin() {
  let { user: e, isAuthenticated: t, loading: n, loginAdmin: r } = useAuth(),
    i = useLocation(),
    [email, setEmail] = React.useState(``),
    [password, setPassword] = React.useState(``),
    [busy, setBusy] = React.useState(!1),
    [err, setErr] = React.useState(``);
  if (!n && t && e?.role === `admin`)
    return <Navigate to={i.state?.from || `/admin`} replace={!0} />;
  async function submit(ev) {
    ev.preventDefault();
    if (!email || !password) {
      setErr(`Enter the admin email and password.`);
      return;
    }
    (setBusy(!0), setErr(``));
    try {
      await r(email, password);
    } catch (e) {
      (setErr(e instanceof ApiError ? e.message : `Sign-in failed. Please try again.`), setBusy(!1));
    }
  }
  const label = {
      display: `block`,
      fontSize: 10.5,
      fontWeight: 700,
      color: `var(--muted)`,
      letterSpacing: `0.08em`,
      textTransform: `uppercase`,
      marginBottom: 6,
    },
    input = {
      width: `100%`,
      padding: `11px 14px`,
      borderRadius: 12,
      border: `1.5px solid ${ADMIN_THEME.border}`,
      background: ADMIN_THEME.paleBg,
      color: ADMIN_THEME.navy,
      fontSize: 13.5,
      fontFamily: `var(--font-ui)`,
      outline: `none`,
      boxSizing: `border-box`,
      marginBottom: 16,
    };
  return (
    <div
      style={{
        minHeight: `100vh`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        background: `linear-gradient(160deg, ${ADMIN_THEME.paleBg} 0%, ${ADMIN_THEME.paleBg2} 100%)`,
        fontFamily: `var(--font-ui)`,
        padding: 20,
      }}
    >
      <ThemeToggle style={{ position: `fixed`, top: 16, right: 16, zIndex: 60 }} />
      <form
        onSubmit={submit}
        className="nk-rise"
        style={{
          width: `100%`,
          maxWidth: 380,
          background: `var(--surface)`,
          borderRadius: 24,
          border: `1px solid color-mix(in srgb, var(--emerald-500) 15%, transparent)`,
          boxShadow: `0 20px 60px color-mix(in srgb, var(--shadow) 12%, transparent)`,
          padding: `36px 32px`,
        }}
      >
        <div style={{ textAlign: `center`, marginBottom: 26 }}>
          <div style={{ fontFamily: `var(--font-display)`, fontWeight: 700, fontSize: 24, color: ADMIN_THEME.navy }}>
            Nikha2 Admin
          </div>
          <div style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginTop: 6 }}>
            Restricted access — admin accounts only.
          </div>
        </div>
        <label htmlFor="admin-email" style={label}>
          Admin email
        </label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => (setEmail(e.target.value), setErr(``))}
          autoComplete="username"
          disabled={busy}
          style={input}
        />
        <label htmlFor="admin-password" style={label}>
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => (setPassword(e.target.value), setErr(``))}
          autoComplete="current-password"
          disabled={busy}
          style={{ ...input, marginBottom: 22 }}
        />
        <button
          type="submit"
          className="nk-btn nk-btn-primary"
          disabled={busy}
          style={{ width: `100%`, padding: `12px 0`, borderRadius: 28, fontWeight: 700, fontSize: 14 }}
        >
          {busy ? `Signing in…` : `Sign in`}
        </button>
        {err && (
          <div
            role="alert"
            style={{
              marginTop: 18,
              padding: `10px 14px`,
              borderRadius: 12,
              background: `var(--danger-bg)`,
              border: `1px solid var(--danger-line)`,
              color: ADMIN_THEME.danger,
              fontSize: 12.5,
              textAlign: `center`,
            }}
          >
            {err}
          </div>
        )}
      </form>
    </div>
  );
}

function AdminLoginPage() {
  if (import.meta.env.VITE_BETA === "true") return <BetaAdminLogin />;
  return <GoogleAdminLogin />;
}

function GoogleAdminLogin() {
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
        fontFamily: `var(--font-ui)`,
        padding: 20,
      }}
    >
      <ThemeToggle style={{ position: `fixed`, top: 16, right: 16, zIndex: 60 }} />
      <style>{ADMIN_FONT_IMPORT}</style>
      <div
        className="nk-rise"
        style={{
          width: `100%`,
          maxWidth: 380,
          background: `var(--surface)`,
          borderRadius: 24,
          border: `1px solid color-mix(in srgb, var(--emerald-500) 15%, transparent)`,
          boxShadow: `0 20px 60px color-mix(in srgb, var(--shadow) 12%, transparent)`,
          padding: `36px 32px`,
        }}
      >
        <div style={{ textAlign: `center`, marginBottom: 26 }}>
          <div
            style={{
              fontFamily: `var(--font-display)`,
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
            color: `var(--muted)`,
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
            fontFamily: `var(--font-ui)`,
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
              background: `var(--danger-bg)`,
              border: `1px solid var(--danger-line)`,
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

export { AdminLoginPage };
