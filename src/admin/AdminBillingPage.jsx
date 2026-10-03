import * as React from "react";
import {
  adminBadgeStyle,
  adminCardStyle,
  adminTableStyle,
  adminTdStyle,
  adminThStyle,
  adminTitleStyle,
} from "./styles";
import { ADMIN_THEME } from "./theme";
import { api } from "../lib/api";

var To = { free: `Free`, basic: `Basic`, premium: `Premium` };

function Eo(e, t) {
  return new Intl.NumberFormat(void 0, {
    style: `currency`,
    currency: t || `INR`,
  }).format((e ?? 0) / 100);
}

function AdminBillingPage() {
  let [e, t] = (0, React.useState)(null),
    [n, r] = (0, React.useState)([]),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(!0),
    c = (0, React.useCallback)(async () => {
      (s(!0), a(``));
      try {
        let [e, n] = await Promise.all([
          api.get(`/admin/subscriptions`),
          api.get(`/admin/payments?limit=30`),
        ]);
        (t(e), r(n.items));
      } catch (e) {
        a(e.message);
      } finally {
        s(!1);
      }
    }, []);
  return (
    (0, React.useEffect)(() => {
      c();
    }, [c]),
    (
      <div>
        <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 20 }}>
          Billing
        </h1>
        {i && (
          <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>
            {i}
          </div>
        )}
        {e && !e.stripeConfigured && (
          <div
            style={{
              ...adminCardStyle,
              color: ADMIN_THEME.gold,
              background: ADMIN_THEME.goldBg,
            }}
          >
            Stripe is not configured on this server — plan counts below come
            from the local database, but payment activity will be empty.
          </div>
        )}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, 1fr)`,
            gap: 16,
            marginBottom: 8,
          }}
        >
          {[`free`, `basic`, `premium`].map((t) => (
            <div key={t} style={adminCardStyle}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: ADMIN_THEME.textMuted,
                  textTransform: `uppercase`,
                  letterSpacing: `0.06em`,
                  marginBottom: 8,
                }}
              >
                {To[t]}
              </div>
              <div
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: 28,
                  fontWeight: 700,
                  color: ADMIN_THEME.navy,
                }}
              >
                {o ? `—` : (e?.byPlan[t] ?? 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ ...adminTitleStyle, fontSize: 18, margin: `24px 0 14px` }}>
          Recent Payments
        </h2>
        <div style={{ ...adminCardStyle, padding: 0, overflowX: `auto` }}>
          <table style={adminTableStyle}>
            <thead>
              <tr>
                <th style={adminThStyle}>User</th>
                <th style={adminThStyle}>Plan</th>
                <th style={adminThStyle}>Amount</th>
                <th style={adminThStyle}>Status</th>
                <th style={adminThStyle}>Provider</th>
                <th style={adminThStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {o && (
                <tr>
                  <td style={adminTdStyle} colSpan={6}>
                    Loading…
                  </td>
                </tr>
              )}
              {!o && n.length === 0 && (
                <tr>
                  <td style={adminTdStyle} colSpan={6}>
                    No payment activity yet.
                  </td>
                </tr>
              )}
              {!o &&
                n.map((e) => (
                  <tr key={e.id}>
                    <td style={adminTdStyle}>
                      {e.user.name}{" "}
                      <span
                        style={{ color: ADMIN_THEME.textMuted, fontSize: 11.5 }}
                      >
                        ({e.user.email})
                      </span>
                    </td>
                    <td
                      style={{ ...adminTdStyle, textTransform: `capitalize` }}
                    >
                      {e.plan}
                    </td>
                    <td style={adminTdStyle}>
                      {Eo(e.amountCents, e.currency)}
                    </td>
                    <td style={adminTdStyle}>
                      <span
                        style={adminBadgeStyle(
                          e.status === `succeeded`
                            ? `verified`
                            : e.status === `failed`
                              ? `blocked`
                              : `pending`,
                        )}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td style={adminTdStyle}>{e.provider}</td>
                    <td style={adminTdStyle}>
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
}

export { AdminBillingPage };
