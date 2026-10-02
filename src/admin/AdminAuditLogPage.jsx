import * as React from "react";
import {
  adminCardStyle,
  adminSecondaryButton,
  adminTableStyle,
  adminTdStyle,
  adminThStyle,
  adminTitleStyle,
} from "./styles";
import { ADMIN_THEME } from "./theme";
import { api } from "../lib/api";

var Co = 50;

function AdminAuditLogPage() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(0),
    [i, a] = (0, React.useState)(1),
    [o, s] = (0, React.useState)(!0),
    [c, l] = (0, React.useState)(``),
    u = (0, React.useCallback)(async () => {
      (s(!0), l(``));
      try {
        let e = await api.get(`/admin/audit-log?page=${i}&limit=${Co}`);
        (t(e.items), r(e.total));
      } catch (e) {
        l(e.message);
      } finally {
        s(!1);
      }
    }, [i]);
  (0, React.useEffect)(() => {
    u();
  }, [u]);
  let d = Math.max(1, Math.ceil(n / Co));
  return (
    <div>
      <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 20 }}>
        Audit Log
      </h1>
      <div
        style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginBottom: 20 }}
      >
        Every admin action — who did what, to whom, and when.
      </div>
      {c && (
        <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{c}</div>
      )}
      <div style={{ ...adminCardStyle, padding: 0, overflowX: `auto` }}>
        <table style={adminTableStyle}>
          <thead>
            <tr>
              <th style={adminThStyle}>Admin</th>
              <th style={adminThStyle}>Action</th>
              <th style={adminThStyle}>Target</th>
              <th style={adminThStyle}>Details</th>
              <th style={adminThStyle}>When</th>
            </tr>
          </thead>
          <tbody>
            {o && (
              <tr>
                <td style={adminTdStyle} colSpan={5}>
                  Loading…
                </td>
              </tr>
            )}
            {!o && e.length === 0 && (
              <tr>
                <td style={adminTdStyle} colSpan={5}>
                  No admin actions recorded yet.
                </td>
              </tr>
            )}
            {!o &&
              e.map((e) => (
                <tr key={e.id}>
                  <td style={adminTdStyle}>{e.actorEmail}</td>
                  <td
                    style={{
                      ...adminTdStyle,
                      fontWeight: 700,
                      color: ADMIN_THEME.green,
                    }}
                  >
                    {e.action}
                  </td>
                  <td style={adminTdStyle}>
                    {e.targetType}
                    {e.targetId ? ` · ${e.targetId.slice(0, 8)}…` : ``}
                  </td>
                  <td
                    style={{
                      ...adminTdStyle,
                      maxWidth: 320,
                      fontSize: 12,
                      color: ADMIN_THEME.textMuted,
                      whiteSpace: `pre-wrap`,
                    }}
                  >
                    {e.details ? JSON.stringify(e.details) : `—`}
                  </td>
                  <td style={adminTdStyle}>
                    {new Date(e.createdAt).toLocaleString()}
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
          disabled={i <= 1}
          onClick={() => a((e) => e - 1)}
        >
          Prev
        </button>
        <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
          {"Page "}
          {i}
          {" of "}
          {d}
        </span>
        <button
          style={adminSecondaryButton}
          disabled={i >= d}
          onClick={() => a((e) => e + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export { AdminAuditLogPage };
