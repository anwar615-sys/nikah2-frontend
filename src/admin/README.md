# Admin dashboard

Everything for the Nikha2 admin panel lives in this folder. The main app mounts it at `/admin/*` (see `src/App.jsx`) and loads it on demand, so people using the public site never download admin code.

| File | What it is |
|---|---|
| `AdminApp.jsx` | Entry point: `/admin/login`, plus every other `/admin/...` route behind the admin guard |
| `RequireAdmin.jsx` | Sends anyone who is not a signed-in admin (`user.role === "admin"`) to `/admin/login` |
| `AdminLayout.jsx` | Sidebar, theme toggle and the nested admin routes |
| `theme.js`, `styles.js` | Admin colours (theme variables, so dark mode works) and shared card, table and button styles |
| `pages/AdminLoginPage.jsx` | Google sign-in plus the shared admin password (`POST /admin/auth/login`) |
| `pages/AdminDashboard.jsx` | Totals from `GET /admin/analytics` |
| `pages/AdminUsersPage.jsx` | All users and flagged accounts: filters, bulk actions, CSV export |
| `pages/AdminUserDetail.jsx` | One user: overview, profile corrections, block, suspend, verify, delete, call history |
| `pages/AdminVerificationsPage.jsx` | Pending verification photos: approve or reject |
| `pages/AdminReportsPage.jsx` | User reports with the reported content, and status changes |
| `pages/AdminAuditLogPage.jsx` | Every admin action: who did what, to whom, and when |
| `pages/AdminBillingPage.jsx` | Subscriptions and recent payments |

## Routes

| URL | Page |
|---|---|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/users`, `/admin/users/:id` | Users, user detail |
| `/admin/verifications` | Verifications |
| `/admin/reports` | Reports |
| `/admin/audit-log` | Audit log |
| `/admin/billing` | Billing |

The full list of admin API endpoints is in `BLUEPRINT.md`, section 6, under "Admin".

Admin pages share the site's API client (`src/lib/api.js`), sign-in state (`src/context/AuthContext.jsx`) and theme. Everything else they need is in this folder.
