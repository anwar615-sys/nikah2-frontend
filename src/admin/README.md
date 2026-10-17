# Admin dashboard

Everything for the Nikha2 admin panel lives in this folder. The main app mounts it at `/admin/*` (see `src/App.jsx`) and loads it on demand, so people using the public site never download admin code.

| File | What it is |
|---|---|
| `AdminApp.jsx` | Entry point: `/admin/login`, plus every other `/admin/...` route behind the admin guard |
| `RequireAdmin.jsx` | Sends anyone who is not a signed-in admin (`user.role === "admin"`) to `/admin/login` |
| `AdminLayout.jsx` | Sidebar, theme toggle and the nested admin routes |
| `theme.js`, `styles.js` | Admin colours (theme variables, so dark mode works) and shared card, table and button styles |
| `pages/AdminLoginPage.jsx` | Beta: email + password of an admin account. Full backend: Google sign-in plus the shared admin password (`POST /admin/auth/login`) |
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

Admin pages never call a backend directly. They use `adminApi` and `useAdminSession` from `data/index.js`.

| File | What it is |
|---|---|
| `data/index.js` | The single doorway: the data adapter and the sign-in source |
| `data/httpAdminApi.js` | Requests through the shared API client, plus private verification photos |

Where the data comes from depends on the build:

- **Public beta** (`VITE_BETA=true`, used on Vercel): the Supabase connector in `src/beta/` answers every `/admin/*` path with database functions that check `is_admin()` and write the audit log. The admin signs in with the email and password of a beta account that the developer has added to the `admins` table. Verification photos are 5-minute signed links.
- **Full backend** (any other build): the REST contract in `BLUEPRINT.md`, with Google sign-in plus the shared admin password.

There is no sample-data mode any more: the dashboard always shows real data.

### Making someone an admin (beta)

1. They sign up on the site like any member.
2. The developer runs, in the Supabase SQL editor:
   `insert into public.admins (user_id) select id from auth.users where email = 'their@email';`
3. They sign in at `/admin/login`.
