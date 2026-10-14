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

## Data and sign-in: `data/`

Admin pages never call a backend directly. They use `adminApi` and `useAdminSession` from `data/index.js`, which picks an adapter:

| File | What it is |
|---|---|
| `data/index.js` | The single doorway: chooses the adapter and the sign-in source |
| `data/httpAdminApi.js` | Real backend over HTTP (the REST contract in `BLUEPRINT.md`) |
| `data/mockAdminApi.js` | Sample data in memory, for preview mode. No network requests |
| `data/preview.js` | Decides whether preview mode is on |

To connect a different backend later (Supabase, a new server, AWS), add an adapter with the same methods (`get`, `post`, `patch`, `delete`, `upload`, `loadPhoto`, `releasePhoto`) and select it in `data/index.js`. The pages stay the same.

## Preview mode (no login, sample data)

1. Create `.env.local` in the project root with `VITE_ADMIN_PREVIEW=true`.
2. Run `npm run dev` and open http://localhost:5173/admin.

A yellow banner shows on every admin page while preview mode is on. Changes reset on reload. To turn it off, delete that line and restart `npm run dev`.

Preview mode only works with `npm run dev`. Any production build (`npm run build`, as used by Render or AWS) removes it completely, even if `VITE_ADMIN_PREVIEW` is set on the host. `npm run check:admin-preview` proves this by building with the flag on and searching the output.
