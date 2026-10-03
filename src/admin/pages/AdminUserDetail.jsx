import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminBadgeStyle,
  adminCardStyle,
  adminDangerButton,
  adminInputStyle,
  adminPrimaryButton,
  adminSecondaryButton,
  adminTitleStyle,
} from "../styles";
import { ADMIN_THEME } from "../theme";
import { api } from "../../lib/api";

var Ra = {
  display: `block`,
  fontSize: 10.5,
  fontWeight: 700,
  color: `var(--muted)`,
  letterSpacing: `0.08em`,
  textTransform: `uppercase`,
  marginBottom: 6,
};

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
];

var J = [`18-25`, `26-35`, `36-45`, `46-55`, `56-65`, `65+`];

var oo = [`man`, `woman`, `other`, `prefer_not_to_say`];

var so = [`Yes`, `No`, `Prefer not to say`];

var co = [
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
        <button className="nk-btn"
          key={n}
          onClick={() => t(n)}
          style={{
            padding: `8px 16px`,
            borderRadius: 20,
            border: `1.5px solid ${e === n ? ADMIN_THEME.green : ADMIN_THEME.border}`,
            background: e === n ? ADMIN_THEME.green : `var(--surface)`,
            color: e === n ? `#fff` : ADMIN_THEME.green,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: `pointer`,
            fontFamily: `var(--font-ui)`,
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
          style={adminInputStyle}
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
    <div style={adminCardStyle}>
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
          style={adminInputStyle}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={Ra}>location</label>
        <input
          value={n.location}
          onChange={(e) => r((t) => ({ ...t, location: e.target.value }))}
          style={adminInputStyle}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={Ra}>city</label>
        <input
          value={n.city}
          onChange={(e) => r((t) => ({ ...t, city: e.target.value }))}
          style={adminInputStyle}
        />
      </div>
      <button className="nk-btn" disabled={i} onClick={o} style={adminPrimaryButton(i)}>
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
      <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{r}</div>
    ) : t ? (
      t.length ? (
        <div style={{ ...adminCardStyle, padding: 0 }}>
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
        <div style={adminCardStyle}>No call history for this user.</div>
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
  if (i)
    return (
      <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{i}</div>
    );
  if (!n) return <div>Loading…</div>;
  let x = n.suspendedUntil && new Date(n.suspendedUntil) > new Date();
  return (
    <div>
      <button className="nk-btn"
        onClick={() => t(-1)}
        style={{ ...adminSecondaryButton, marginBottom: 16 }}
      >
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
        <h1 style={{ ...adminTitleStyle, fontSize: 24, margin: 0 }}>
          {n.name}
        </h1>
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
          <div style={adminCardStyle}>
            <div style={{ ...Ra, marginBottom: 14 }}>Account</div>
            <AdminDefRow term="Role">{n.role}</AdminDefRow>
            <AdminDefRow term="Verification">
              <span style={adminBadgeStyle(n.verificationStatus)}>
                {n.verificationStatus}
              </span>
            </AdminDefRow>
            <AdminDefRow term="Blocked">
              {n.blockedGlobal ? (
                <span style={adminBadgeStyle(`blocked`)}>Blocked</span>
              ) : (
                `No`
              )}
            </AdminDefRow>
            <AdminDefRow term="Suspended">
              {x ? (
                <span>
                  <span style={adminBadgeStyle(`blocked`)}>
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
            <div style={{ ...adminCardStyle }}>
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
                    <button className="nk-btn"
                      disabled={o}
                      onClick={() => h(`approve`)}
                      style={adminPrimaryButton(o)}
                    >
                      Approve verification
                    </button>
                    <button className="nk-btn"
                      disabled={o}
                      onClick={() => h(`reject`)}
                      style={adminDangerButton}
                    >
                      Reject verification
                    </button>
                  </>
                )}
                <button className="nk-btn"
                  disabled={o}
                  onClick={g}
                  style={
                    n.blockedGlobal ? adminSecondaryButton : adminDangerButton
                  }
                >
                  {n.blockedGlobal ? `Unblock account` : `Block account`}
                </button>
                <button className="nk-btn" disabled={o} onClick={b} style={adminDangerButton}>
                  Delete account
                </button>
              </div>
            </div>
            <div style={adminCardStyle}>
              <div style={{ ...Ra, marginBottom: 14 }}>
                Temporary Suspension
              </div>
              {x ? (
                <button className="nk-btn" disabled={o} onClick={y} style={adminSecondaryButton}>
                  Lift suspension
                </button>
              ) : (
                <>
                  <select
                    value={u}
                    onChange={(e) => d(e.target.value)}
                    style={{ ...adminInputStyle, marginBottom: 10 }}
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
                      ...adminInputStyle,
                      marginBottom: 10,
                      resize: `vertical`,
                    }}
                  />
                  <button className="nk-btn"
                    disabled={o}
                    onClick={_}
                    style={adminPrimaryButton(o)}
                  >
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

export { AdminUserDetail };
