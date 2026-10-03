import * as React from "react";
import {
  adminBadgeStyle,
  adminCardStyle,
  adminInputStyle,
  adminSecondaryButton,
  adminTableStyle,
  adminTdStyle,
  adminThStyle,
  adminTitleStyle,
} from "./styles";
import { ADMIN_THEME } from "./theme";
import { api } from "../lib/api";

var _o = 20;

var vo = [`open`, `reviewed`, `dismissed`, `actioned`];

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
          background: `color-mix(in srgb, var(--overlay) 50%, transparent)`,
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
            background: `var(--surface)`,
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
            <button className="nk-btn" onClick={t} style={adminSecondaryButton}>
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
                <span style={adminBadgeStyle(n.user.verificationStatus)}>
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
                    background: e.isFlagged ? `var(--danger-bg)` : ADMIN_THEME.paleBg,
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
      <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 20 }}>
        Reports
      </h1>
      <div
        style={{
          ...adminCardStyle,
          display: `flex`,
          gap: 14,
          alignItems: `flex-end`,
        }}
      >
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
            style={{ ...adminInputStyle, width: 160 }}
          >
            <option value="">Any</option>
            {vo.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <button className="nk-btn"
          style={adminSecondaryButton}
          onClick={() => yo(`reports.csv`, e, bo)}
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
          {n}
          {" report"}
          {n === 1 ? `` : `s`}
        </div>
      </div>
      {u && (
        <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{u}</div>
      )}
      <div style={{ ...adminCardStyle, padding: 0, overflowX: `auto` }}>
        <table style={adminTableStyle}>
          <thead>
            <tr>
              <th style={adminThStyle}>Reporter</th>
              <th style={adminThStyle}>Target</th>
              <th style={adminThStyle}>Reason</th>
              <th style={adminThStyle}>Details</th>
              <th style={adminThStyle}>Status</th>
              <th style={adminThStyle}>Filed</th>
              <th style={adminThStyle} />
            </tr>
          </thead>
          <tbody>
            {c && (
              <tr>
                <td style={adminTdStyle} colSpan={7}>
                  Loading…
                </td>
              </tr>
            )}
            {!c && e.length === 0 && (
              <tr>
                <td style={adminTdStyle} colSpan={7}>
                  No reports match this filter.
                </td>
              </tr>
            )}
            {!c &&
              e.map((e) => (
                <tr key={e.id}>
                  <td style={adminTdStyle}>{e.reporter.displayName}</td>
                  <td style={{ ...adminTdStyle, textTransform: `capitalize` }}>
                    {e.targetType}
                  </td>
                  <td style={{ ...adminTdStyle, textTransform: `capitalize` }}>
                    {e.reason.replace(/_/g, ` `)}
                  </td>
                  <td
                    style={{
                      ...adminTdStyle,
                      maxWidth: 240,
                      whiteSpace: `pre-wrap`,
                    }}
                  >
                    {e.details || `—`}
                  </td>
                  <td style={adminTdStyle}>
                    <span style={adminBadgeStyle(e.status)}>{e.status}</span>
                  </td>
                  <td style={adminTdStyle}>
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      ...adminTdStyle,
                      display: `flex`,
                      gap: 6,
                      flexWrap: `wrap`,
                    }}
                  >
                    <button className="nk-btn"
                      style={adminSecondaryButton}
                      onClick={() => p(e.id)}
                    >
                      View content
                    </button>
                    {e.status !== `reviewed` && (
                      <button className="nk-btn"
                        style={adminSecondaryButton}
                        onClick={() => h(e.id, `reviewed`)}
                      >
                        Reviewed
                      </button>
                    )}
                    {e.status !== `actioned` && (
                      <button className="nk-btn"
                        style={adminSecondaryButton}
                        onClick={() => h(e.id, `actioned`)}
                      >
                        Actioned
                      </button>
                    )}
                    {e.status !== `dismissed` && (
                      <button className="nk-btn"
                        style={adminSecondaryButton}
                        onClick={() => h(e.id, `dismissed`)}
                      >
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
        <button className="nk-btn"
          style={adminSecondaryButton}
          disabled={i <= 1}
          onClick={() => a((e) => e - 1)}
        >
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {i}
          {" of "}
          {g}
        </span>
        <button className="nk-btn"
          style={adminSecondaryButton}
          disabled={i >= g}
          onClick={() => a((e) => e + 1)}
        >
          Next
        </button>
      </div>
      {f && <AdminReportContext reportId={f} onClose={() => p(null)} />}
    </div>
  );
}

export { AdminReportsPage };
