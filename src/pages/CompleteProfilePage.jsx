import { useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import { CountryStateSelect } from "../components/CountryStateSelect";
import { Navbar } from "../components/Navbar";
import { Toast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { UsernameField } from "./SignupPage";

var hr = [
  { value: `man`, label: `Man` },
  { value: `woman`, label: `Woman` },
  { value: `other`, label: `Other` },
];

var gr = [
  `Muslim`,
  `Hindu`,
  `Christian`,
  `Sikh`,
  `Buddhist`,
  `Jain`,
  `Jewish`,
  `Other`,
];

var _r = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`];

var vr = [`Yes`, `No`, `Prefer not to say`];

var yr = {
  background: `rgba(255,255,255,0.85)`,
  border: `1px solid rgba(64,145,108,0.15)`,
  borderRadius: 20,
  padding: 28,
  marginBottom: 24,
};

var br = {
  display: `block`,
  fontSize: 10.5,
  fontWeight: 700,
  color: `#3D6B55`,
  letterSpacing: `0.08em`,
  textTransform: `uppercase`,
  marginBottom: 6,
};

var xr = {
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

var Sr = { marginBottom: 16 };

var Cr = (e) => ({
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

export { CompleteProfilePage };
