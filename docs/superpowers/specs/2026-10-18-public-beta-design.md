# Nikha2 public beta: design

Date: 2026-10-18
Status: draft for review
Builds on: `2026-10-04-backend-phase1-design.md` (the full backend). This beta is a lighter first step that the full backend later replaces without losing member data.

## 1. Goal

The client will share the site with real visitors for launch and marketing. Real visitors must be able to:
- sign up and log in;
- build a profile;
- find each other in Explore;
- send interests and chat in real time;
- choose a plan.

The client's admin dashboard must show all of it.

Constraints:
- No backend server.
- No new email accounts.
- Payments simulated.
- Clearly labelled as a beta.
- Privacy Policy, Terms and a cookie consent banner in place before public sharing.

## 2. Architecture

```
Browser (React site on Vercel)
  └─ src/lib/api.js ──(beta mode)──► src/beta/backend.js ──► Supabase (project "nikha2-beta", AWS Mumbai)
                                                            ├─ Auth (email + password)
                                                            ├─ Postgres + row-level security + RPC functions
                                                            ├─ Realtime (chat, typing, read receipts)
                                                            └─ Storage (photos, private)
  └─ src/lib/socket.js ──(beta mode)──► src/beta/socket.js (Supabase Realtime, same events as Socket.IO)
```

- **Beta mode** is on when `VITE_BETA=true` (set in `vercel.json` and optionally in `.env.local`). Normal builds contain none of the beta code; `npm run check:admin-preview` is extended to prove it.
- **Public settings only in the browser:** the Supabase URL and the public "anon" key. These are safe to publish by design: access is controlled by row-level security, not by hiding the key. No service keys exist anywhere in the frontend or on Vercel.
- **Same contract:** `src/beta/backend.js` answers the same paths and response shapes as `BLUEPRINT.md` §6–7. Pages keep calling `api.get('/people')`, `api.post('/messaging/...')` and so on, so later switching to the full backend is a configuration change.
- **The sample-data admin preview is removed.** In beta mode the admin pages use the same beta connector, with real beta data, behind an admin login.

## 3. Data and security rules (Supabase)

Tables (all with row-level security on):

| Table | Holds | Who can read / write |
|---|---|---|
| `profiles` | one row per member: name, username, gender, religion, nationality, location, age range, has kids, bio, hobbies, avatar, verification status, plan, blocked/suspended flags, last seen | Everyone signed in reads **public columns** of non-blocked members (through a `public_profiles` view). Members update their own editable columns. Plan, verification, blocked and suspended can only be changed by admins or trusted functions. |
| `conversations`, `conversation_members` | 1-to-1 and group chats, per-member settings | Members of the conversation only |
| `messages` | text, image, view-once image, system/call entries | Members of the conversation only; sender inserts |
| `message_reads` | read receipts | Members of the conversation |
| `interests` | sent/accepted/declined interests | Sender and receiver |
| `blocks` | who blocked whom | The blocker |
| `reports` | reports with reason and details | Reporter inserts; admins read/update |
| `verification_requests` | selfie photo paths, status | Owner inserts; admins review |
| `plans` | Free / Basic / Premium, prices, limits | Everyone reads |
| `payments` | simulated beta payments | Owner reads own; admins read all |
| `audit_log` | every admin action | Admins read; append-only (no update/delete) |
| `admins` | which accounts are admins | Nobody through the API; set by the developer in SQL |
| `consents` | Terms/Privacy acceptance with version and time | Owner inserts; admins read |

**Trusted functions** (database functions that run with checked permissions) handle anything a member must not do directly:
- `beta_checkout(plan, outcome)`: records a simulated payment and, if successful, sets the plan. A member can never set their own plan directly.
- `start_conversation(target)`: enforces the Free plan's limit of 3 new contacts per month, and blocks.
- The admin actions: block, suspend, verify, delete, update report, analytics. These check `is_admin()` and write to the audit log.

**Storage buckets:**
- `avatars`: public-read, so profile photos show in Explore.
- `chat-media`: private, members of the conversation only, via signed links. View-once images are deleted after viewing.
- `verification`: private; owner and admins only.

Uploads are limited to images under 5 MB.

**Admin access:** a normal beta account marked in `admins` by the developer. The admin login page uses email + password. Passkeys come with the full backend.

## 4. Features in the beta

| Area | Behaviour |
|---|---|
| Sign up / log in / log out | Email + password. Email confirmation **off** (no domain email yet), so it's a dashboard setting the owner switches off once. Google sign-in hidden in beta. Password change; account deletion. |
| Profile | Existing complete-profile and account pages; avatar upload |
| Explore | Real members, existing filters, online status, profile modal |
| Interests and chat | Real-time 1-to-1 chat: text, images, view-once images, read receipts, typing indicator, per-chat settings, unmatch. Groups: create, rename, add/remove members. |
| Safety | Block, report (user/message/conversation) |
| Plans | Pricing as today. Checkout opens a **"Beta checkout – no charge"** screen with *Complete beta payment* / *Simulate failed payment*. Plan limits take effect. Privacy, Terms and Refund links sit under the payment button. |
| AI match (Premium) | Simple compatibility list from profile fields (no AI service in beta) |
| Verification | Selfie upload, then the admin approves or rejects |
| Calls | Hidden in beta, with a note "Voice and video calls arrive after the beta" |
| Admin | All existing pages on real beta data: dashboard, users, user detail, flagged users, verifications, reports with context, audit log, billing. Plus "Beta notice" in the header. |

**Not in the beta, stated in the Beta Notice:** real payments, end-to-end encrypted chats (messages are encrypted on the server but not end-to-end), calls, email notifications.

## 5. Privacy, terms and cookies

**Pages:**
- `/privacy`: a full Privacy Policy written for India's DPDP Act 2023, with GDPR basics for overseas members. It covers:
  - what is collected and why, and the legal basis;
  - sensitive information such as religion;
  - where data is stored (Supabase, AWS Mumbai) and the processors used (Supabase, Vercel);
  - how long data is kept;
  - members' rights (access, correction, erasure, withdraw consent, grievance, nominate);
  - the grievance officer;
  - 18+ only;
  - the beta status;
  - changes to the policy.
- `/terms`: the existing terms, plus beta terms (no charges, features may change, data may be reset with notice).
- `/cookies`: Cookie Policy with a table of every cookie/storage item, plus a "Change cookie settings" button.
- `/beta`: the Beta Notice.

**Placeholders** the client must fill before sharing (company legal name, address, grievance officer name and email, contact email) live in **one file**, `src/lib/legalConfig.js`. Until they're filled, the legal pages show a visible "[to be completed]" marker so nothing goes out silently incomplete. The client's lawyer should review the texts.

**Cookie banner** (first visit, every page, keyboard accessible):
- **Accept all**
- **Essential only** ("limited access")
- **Customise**, with toggles for Essential (always on), Preferences (remembers theme, motion and dismissed notices) and Analytics (none used today; off by default).

The choice is stored with a date and policy version. The banner comes back if the policy version changes, and the footer has a "Cookie settings" link.

- "Essential only" stores only login and security data and the cookie choice itself. Theme and motion still work for the visit but aren't remembered.
- Google Fonts are replaced with self-hosted fonts (`@fontsource`), so no third-party font requests are made at all.
- The Google sign-in script loads only on the login and signup pages, and never in beta.

**Where privacy links appear:**
- Footer (Privacy, Terms, Cookies, Cookie settings, Beta notice).
- Signup: required consent checkbox, "I agree to the Terms and Privacy Policy", plus a separate notice for sensitive details such as religion. The consent is recorded.
- Login.
- Complete-profile page.
- Checkout: under the payment button.
- Upgrade modal.
- Account settings: privacy section with "Download my data" (JSON) and "Delete account".
- Report/block dialog.
- Support chat widget.

## 6. Error handling

- Supabase errors map to the existing `ApiError` codes (`AUTH_REQUIRED`, `TOKEN_EXPIRED`, `FORBIDDEN`, `NOT_FOUND`, `CHAT_LIMIT_REACHED`, `VALIDATION_FAILED`), so existing messages keep working.
- If Supabase is unreachable, pages show their existing error states.
- Realtime reconnects automatically. Missed messages are fetched again when the connection comes back.

## 7. Testing

- **Unit tests** for the beta connector's request mapping and for the cookie consent logic.
- **Database checks** against the live beta project, using two test accounts:
  - a member can't read another member's chats or private columns;
  - a member can't change their own plan or verification;
  - the Free plan limit holds;
  - a non-admin can't call admin functions;
  - the audit log can't be edited.
- **Browser walkthrough** (Playwright, two separate browser sessions), done against the Vercel build:
  1. Two members sign up and find each other.
  2. They exchange interests and chat live, with read receipts.
  3. One upgrades through beta checkout.
  4. One reports the other.
  5. The admin logs in and sees the signups, the payment and the report, then blocks the user.
  6. The cookie banner's three choices behave as described.
- The existing tests and the safety check keep passing. Test accounts are deleted afterwards.

## 8. What the owner does once

1. In Supabase → Authentication → Sign In / Providers → Email: switch **"Confirm email" off** for the beta.
2. Fill in `src/lib/legalConfig.js`, or send the details and the developer fills them.
3. Choose the admin account's email and password: the developer marks that account as admin.

## 9. Later

When the full backend (Phase 1 spec) is ready:
- turn `VITE_BETA` off;
- migrate beta members and profiles;
- connect the full backend;
- move the Supabase project to the client's organisation.

The legal pages, cookie banner and consent records stay.
