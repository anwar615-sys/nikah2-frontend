import { Navigate, useLocation } from "react-router-dom";
import * as React from "react";
import { ADMIN_FONT_IMPORT } from "./styles";
import { ADMIN_THEME } from "./theme";
import { GoogleButton } from "../components/GoogleButton";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../lib/api";

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
      <style>{ADMIN_FONT_IMPORT}</style>
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

export { AdminLoginPage };
