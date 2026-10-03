import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { AdminAuditLogPage } from "./pages/AdminAuditLogPage";
import { AdminBillingPage } from "./pages/AdminBillingPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminReportsPage } from "./pages/AdminReportsPage";
import { AdminUserDetail } from "./pages/AdminUserDetail";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminVerificationsPage } from "./pages/AdminVerificationsPage";
import { ADMIN_FONT_IMPORT } from "./styles";
import { ADMIN_THEME } from "./theme";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";

var Oo = [
  { to: `/admin`, label: `Dashboard`, end: !0 },
  { to: `/admin/users`, label: `Users` },
  { to: `/admin/verifications`, label: `Verifications` },
  { to: `/admin/reports`, label: `Reports` },
  { to: `/admin/audit-log`, label: `Audit Log` },
  { to: `/admin/billing`, label: `Billing` },
];

function AdminLayout() {
  let { user: e, logout: t } = useAuth(),
    n = useNavigate();
  async function r() {
    (await t(), n(`/admin/login`, { replace: !0 }));
  }
  return (
    <div
      style={{
        minHeight: `100vh`,
        display: `flex`,
        background: ADMIN_THEME.paleBg,
        fontFamily: `var(--font-ui)`,
      }}
    >
      <style>{`
        ${ADMIN_FONT_IMPORT}
        .admin-nav-link {
          display: block;
          padding: 10px 16px;
          border-radius: 12px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          margin-bottom: 4px;
          transition: background 0.15s, color 0.15s;
        }
        .admin-nav-link:hover { background: color-mix(in srgb, var(--surface) 8%, transparent); color: #fff; }
        .admin-nav-link.active { background: color-mix(in srgb, var(--surface) 14%, transparent); color: #fff; }
      `}</style>
      <aside
        style={{
          width: 220,
          background: ADMIN_THEME.navy,
          padding: `24px 14px`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: `0 10px 24px`,
            fontFamily: `var(--font-display)`,
            fontWeight: 700,
            fontSize: 19,
            color: `#fff`,
          }}
        >
          {"Nikha2 "}
          <span style={{ color: ADMIN_THEME.mint }}>Admin</span>
        </div>
        <nav>
          {Oo.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              end={e.end}
              className={({ isActive: e }) =>
                `admin-nav-link` + (e ? ` active` : ``)
              }
            >
              {e.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div
        style={{
          flex: 1,
          display: `flex`,
          flexDirection: `column`,
          minWidth: 0,
        }}
      >
        <header
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `flex-end`,
            gap: 14,
            padding: `14px 28px`,
            background: `var(--surface)`,
            borderBottom: `1px solid ${ADMIN_THEME.border}`,
          }}
        >
          <ThemeToggle size="sm" />
          <span style={{ fontSize: 13, color: ADMIN_THEME.textMuted }}>
            {e?.email}
          </span>
          <button className="nk-btn"
            onClick={r}
            style={{
              padding: `7px 16px`,
              borderRadius: 32,
              border: `1.5px solid ${ADMIN_THEME.border}`,
              background: `var(--surface)`,
              color: ADMIN_THEME.green,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: `pointer`,
              fontFamily: `var(--font-ui)`,
            }}
          >
            Log out
          </button>
        </header>
        <main style={{ flex: 1, padding: `28px 32px`, overflow: `auto` }}>
          <Routes>
            <Route index={!0} element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="users/:id" element={<AdminUserDetail />} />
            <Route path="verifications" element={<AdminVerificationsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="audit-log" element={<AdminAuditLogPage />} />
            <Route path="billing" element={<AdminBillingPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export { AdminLayout };
