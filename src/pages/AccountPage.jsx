import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { CountryStateSelect } from "../components/CountryStateSelect";
import { Navbar } from "../components/Navbar";
import { PlanBadge } from "../components/PlanBadge";
import { Toast } from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { UsernameField } from "./SignupPage";

var nr = [
  { value: `man`, label: `Male` },
  { value: `woman`, label: `Female` },
  { value: `other`, label: `Other` },
  { value: `prefer_not_to_say`, label: `Prefer not to say` },
];

var rr = [
  `Muslim`,
  `Hindu`,
  `Christian`,
  `Sikh`,
  `Buddhist`,
  `Jain`,
  `Jewish`,
  `Other`,
  `Prefer not to say`,
];

var ir = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`];

var ar = [`Yes`, `No`, `Prefer not to say`];

var or = [
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
];

var sr = {
  background: `rgba(255,255,255,0.85)`,
  border: `1px solid rgba(64,145,108,0.15)`,
  borderRadius: 20,
  padding: 28,
  marginBottom: 24,
};

var cr = {
  display: `block`,
  fontSize: 10.5,
  fontWeight: 700,
  color: `#3D6B55`,
  letterSpacing: `0.08em`,
  textTransform: `uppercase`,
  marginBottom: 6,
};

var lr = {
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

var ur = { marginBottom: 16 };

var dr = (e) => ({
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

export { AccountPage };
