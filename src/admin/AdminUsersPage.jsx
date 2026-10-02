import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  adminBadgeStyle,
  adminCardStyle,
  adminDangerButton,
  adminInputStyle,
  adminSecondaryButton,
  adminTableStyle,
  adminTdStyle,
  adminThStyle,
  adminTitleStyle,
} from "./styles";
import { ADMIN_THEME } from "./theme";
import { api } from "../lib/api";

var Ya = 20;

var Xa = [
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

var Za = [`man`, `woman`, `other`, `prefer_not_to_say`];

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
          ...adminCardStyle,
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
        <button
          style={adminSecondaryButton}
          onClick={() => $a(`users.csv`, t, eo)}
        >
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
        <div
          style={{
            ...adminCardStyle,
            display: `flex`,
            gap: 8,
            alignItems: `center`,
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 700 }}>
            {l.size}
            {" selected"}
          </span>
          <button
            disabled={h}
            style={adminSecondaryButton}
            onClick={() => S(`verify`)}
          >
            Verify
          </button>
          <button
            disabled={h}
            style={adminSecondaryButton}
            onClick={() => S(`reject_verification`)}
          >
            Reject verification
          </button>
          <button
            disabled={h}
            style={adminSecondaryButton}
            onClick={() => S(`block`)}
          >
            Block
          </button>
          <button
            disabled={h}
            style={adminSecondaryButton}
            onClick={() => S(`unblock`)}
          >
            Unblock
          </button>
          <button
            disabled={h}
            style={adminDangerButton}
            onClick={() => S(`delete`)}
          >
            Delete
          </button>
        </div>
      )}
      {p && (
        <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{p}</div>
      )}
      <div style={{ ...adminCardStyle, padding: 0, overflowX: `auto` }}>
        <table style={adminTableStyle}>
          <thead>
            <tr>
              <th style={adminThStyle} />
              <th style={adminThStyle}>Account ID</th>
              <th style={adminThStyle}>Name</th>
              <th style={adminThStyle}>Username</th>
              <th style={adminThStyle}>Email</th>
              <th style={adminThStyle}>Verification</th>
              <th style={adminThStyle}>Blocked</th>
              <th style={adminThStyle}>Plan</th>
              <th style={adminThStyle}>Signed Up</th>
              <th style={adminThStyle} />
            </tr>
          </thead>
          <tbody>
            {d && (
              <tr>
                <td style={adminTdStyle} colSpan={10}>
                  Loading…
                </td>
              </tr>
            )}
            {!d && t.length === 0 && (
              <tr>
                <td style={adminTdStyle} colSpan={10}>
                  No users match these filters.
                </td>
              </tr>
            )}
            {!d &&
              t.map((t) => (
                <tr key={t.id} style={{ cursor: `pointer` }}>
                  <td style={adminTdStyle} onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={l.has(t.id)}
                      onChange={() => x(t.id)}
                    />
                  </td>
                  <td
                    style={{
                      ...adminTdStyle,
                      fontFamily: `monospace`,
                      fontSize: 11.5,
                      color: ADMIN_THEME.textMuted,
                    }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.accountNumber}
                  </td>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.name}
                  </td>
                  <td
                    style={{
                      ...adminTdStyle,
                      fontFamily: `monospace`,
                      fontSize: 12,
                    }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.username ? `@${t.username}` : `—`}
                  </td>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.email}
                  </td>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    <span style={adminBadgeStyle(t.verificationStatus)}>
                      {t.verificationStatus}
                    </span>
                  </td>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.blockedGlobal ? (
                      <span style={adminBadgeStyle(`blocked`)}>Blocked</span>
                    ) : (
                      `—`
                    )}
                  </td>
                  <td
                    style={{ ...adminTdStyle, textTransform: `capitalize` }}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.plan}
                  </td>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td style={adminTdStyle}>
                    <button
                      onClick={(e) => b(e, t.id, t.blockedGlobal)}
                      style={adminSecondaryButton}
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
        <button
          style={adminSecondaryButton}
          disabled={a <= 1}
          onClick={() => o((e) => e - 1)}
        >
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {a}
          {" of "}
          {C}
        </span>
        <button
          style={adminSecondaryButton}
          disabled={a >= C}
          onClick={() => o((e) => e + 1)}
        >
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
        style={{ ...adminInputStyle, width: i }}
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
        style={{ ...adminInputStyle, width: 130 }}
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
      {a && (
        <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{a}</div>
      )}
      {!r && t.length === 0 && (
        <div style={adminCardStyle}>Nothing flagged right now.</div>
      )}
      <div style={{ ...adminCardStyle, padding: 0, overflowX: `auto` }}>
        {t.length > 0 && (
          <table style={adminTableStyle}>
            <thead>
              <tr>
                <th style={adminThStyle}>Name</th>
                <th style={adminThStyle}>Email</th>
                <th style={adminThStyle}>Reasons</th>
                <th style={adminThStyle}>Signed Up</th>
                <th style={adminThStyle} />
              </tr>
            </thead>
            <tbody>
              {t.map((t) => (
                <tr key={t.id}>
                  <td
                    style={adminTdStyle}
                    onClick={() => e(`/admin/users/${t.id}`)}
                  >
                    {t.name}
                  </td>
                  <td style={adminTdStyle}>{t.email}</td>
                  <td
                    style={{
                      ...adminTdStyle,
                      display: `flex`,
                      gap: 6,
                      flexWrap: `wrap`,
                    }}
                  >
                    {t.reasons.map((e) => (
                      <span
                        key={e}
                        style={{
                          ...adminBadgeStyle(`pending`),
                          textTransform: `none`,
                        }}
                      >
                        {e.replace(/_/g, ` `)}
                      </span>
                    ))}
                  </td>
                  <td style={adminTdStyle}>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                  <td style={adminTdStyle}>
                    <button
                      style={adminDangerButton}
                      onClick={() => c(t.id, t.name)}
                    >
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
      <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 20 }}>
        Users
      </h1>
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

export { AdminUsersPage };
