import * as React from "react";
import { adminCardStyle, adminTitleStyle } from "./styles";
import { ADMIN_THEME } from "./theme";
import { api } from "../lib/api";

var qa = [
  { key: `totalUsers`, label: `Total Users` },
  { key: `verifiedUsers`, label: `Verified Users` },
  { key: `activePremiumUsers`, label: `Active Premium` },
  { key: `totalConversations`, label: `Conversations` },
  { key: `totalMessages`, label: `Total Messages` },
  { key: `messagesLast7Days`, label: `Messages (7d)` },
];

function AdminDashboard() {
  let [e, t] = (0, React.useState)(null),
    [n, r] = (0, React.useState)(``);
  return (
    (0, React.useEffect)(() => {
      api
        .get(`/admin/analytics`)
        .then(t)
        .catch((e) => r(e.message));
    }, []),
    (
      <div>
        <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 24 }}>
          Dashboard
        </h1>
        {n && (
          <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>
            {n}
          </div>
        )}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
            gap: 16,
          }}
        >
          {qa.map((t) => (
            <div key={t.key} style={adminCardStyle}>
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
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: `var(--font-display)`,
                  fontSize: 30,
                  fontWeight: 700,
                  color: ADMIN_THEME.navy,
                }}
              >
                {e ? (e[t.key] ?? 0).toLocaleString() : `—`}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export { AdminDashboard };
