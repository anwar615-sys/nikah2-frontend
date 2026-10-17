# Nikha2 Public Beta Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Real visitors can sign up, build profiles, find and chat with each other, and choose a plan through a "Beta – no charge" checkout. The admin dashboard shows it all. Everything is backed by the Supabase project `nikha2-beta`, with no server of our own. The site also gets a Privacy Policy, Terms, a Cookie Policy, a Beta Notice and a cookie banner.

**Architecture:**
- When `VITE_BETA=true`, `src/lib/api.js` and `src/lib/socket.js` hand every request to `src/beta/`.
- `src/beta/` answers the existing REST paths (`BLUEPRINT.md` §6) by calling Postgres RPC functions, Supabase Auth and Supabase Storage. It turns Realtime events into the existing Socket.IO event names.
- All permissions are enforced in Postgres: row-level security plus `security definer` functions that check `auth.uid()` and `is_admin()`.

**Tech stack:** React 19 / Vite 7, `@supabase/supabase-js` v2, Supabase (Postgres 17, Auth, Realtime, Storage), Vercel, `@fontsource/cormorant-garamond` and `@fontsource/manrope`.

**Spec:** `docs/superpowers/specs/2026-10-18-public-beta-design.md`

**Response-shape references** (from mapping the frontend; each task must match these exactly): the "Messaging adapter contract" and "Auth/people/account contract" notes in §Contracts below.

## Global constraints

- Supabase project `myniyprtyewhogrjkwcj` (`nikha2-beta`, `ap-south-1`). Only the URL and the publishable/anon key appear in frontend code. No service key anywhere.
- Beta code loads only when `import.meta.env.VITE_BETA === "true"`. `npm run build` without it must contain no beta code; `scripts/check-admin-preview.mjs` (renamed `check-beta.mjs`) proves this.
- Response envelope stays `{data}` / `{error:{code,message,details}}`. `ApiError` codes used: `AUTH_REQUIRED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_FAILED`, `CHAT_LIMIT_REACHED`, `TIMED_IMAGE_NOT_ACCESSIBLE`, `PLAN_REQUIRED`, `CONFIRM_EMAIL_ON`.
- Ids are uuid strings. Timestamps are ISO strings.
- Copy that must appear verbatim:
  - Banner: "Early access beta – features may change. No real payments."
  - Checkout title: "Beta checkout – no charge"
  - Calls note: "Voice and video calls arrive after the beta."
- Cookie choices: `all`, `essential`, `custom` with `{preferences:boolean, analytics:boolean}`. localStorage key `nikha2-consent`, value `{version, choice, preferences, analytics, at}`. Policy version `2026-10-beta-1`.
- Legal placeholders all live in `src/lib/legalConfig.js`. An unfilled value renders as "[to be completed]".

## Review focus

1. **Email confirmation still on in Supabase:** `signUp` returns no session. Signup must show the clear message "Sign-up is temporarily unavailable (email confirmation pending setup)" with code `CONFIRM_EMAIL_ON`, not a blank failure. Tested in Task 2.
2. **Sender sees their own message twice:** the Realtime shim must not emit `message:new` for messages whose `senderId` is the current user. Tested in Task 3.
3. **Explore always sends `online=true`:** treat it as "online first", not a filter, or a small beta looks empty. Tested in Task 1 (`people_search` returns offline members too).
4. **A member edits their own plan or verification through the table API:** the trigger must reject it. Tested in Task 1.
5. **Essential-only cookie choice:** theme and motion keys must not be persisted. Tested in Task 6 (`storage.js` refuses preference keys when consent is essential).

---

### Task 1: Database functions, storage and security tests

**Files:**
- Create: `supabase/migrations/20261018000002_beta_functions.sql` (applied with Supabase `apply_migration`)
- Create: `supabase/tests/beta_security.sql` (run with `execute_sql`; every check `raise`s on failure)

**Interfaces (all `security definer`, `set search_path = public`; all return `jsonb` in the exact contract shapes):**
- **Account:**
  - `me_get()`
  - `me_update(patch jsonb)`: keys `name`, `phoneNumber`, `countryCode`, `username`.
  - `me_profile_update(patch jsonb)`: keys `gender`, `nationality`, `religion`, `ageRange`, `hasKids`, `location`, `bio`, `hobbies`, `avatarUrl`, `contactVisibility`.
  - `me_delete()`
  - `check_username(u text)`: callable by anon.
  - `touch()`: updates `last_seen_at`.
- **People:**
  - `people_search(f jsonb)`: callable by anon. Anon gets the limited card: first name only, avatar and contact hidden.
  - `person_get(pid uuid)`
  - `people_ai_match()`: raises `PLAN_REQUIRED` unless the plan is premium.
- **Conversations:**
  - `start_conversation(target uuid)`: raises `CHAT_LIMIT_REACHED` once a free member has 3 new contacts this calendar month.
  - `conversations_summary()`
  - `messages_list(conv uuid, lim int)`: newest first.
  - `send_message(conv uuid, kind text, body text, media text, dur int, noshot bool)`
  - `mark_read(conv uuid, ids uuid[])`
  - `conv_settings_get(conv uuid)`, `conv_settings_update(conv uuid, patch jsonb)`
  - `unmatch(conv uuid)`
  - `timed_image_view(mid uuid)`: returns `{path, durationSeconds}`. A second view raises `TIMED_IMAGE_NOT_ACCESSIBLE`.
- **Groups:** `group_create(name text, member_ids uuid[])`, `group_get(gid uuid)`, `group_update(gid uuid, name text)`, `group_delete(gid uuid)`, `group_add_member(gid uuid, uid uuid)`, `group_remove_member(gid uuid, uid uuid)`.
- **Safety and billing:**
  - `block_user(uid uuid)`
  - `report_create(t_type text, t_id uuid, reason text, details text)`
  - `beta_checkout(plan text, outcome text)`: `outcome` is `success` or `failed`; returns `{status}`.
  - `verification_request(paths text[])`
- **Admin** (each raises `FORBIDDEN` unless `is_admin()`, and writes `audit_log`):
  - `admin_analytics()`
  - `admin_users(f jsonb)`, `admin_users_flagged()`, `admin_users_bulk(ids uuid[], action text)`
  - `admin_user_get(uid uuid)`, `admin_user_delete(uid uuid)`, `admin_user_profile_update(uid uuid, patch jsonb)`
  - `admin_user_block(uid uuid, blocked bool)`
  - `admin_user_suspend(uid uuid, duration text, reason text)`, `admin_user_unsuspend(uid uuid)`
  - `admin_user_verification(uid uuid, decision text)`
  - `admin_verifications()`
  - `admin_reports(f jsonb)`, `admin_report_update(rid uuid, status text)`, `admin_report_context(rid uuid)`
  - `admin_audit_log(page int, lim int)`
  - `admin_subscriptions()`, `admin_payments(lim int)`
- **Storage buckets:**
  - `avatars`: public read; owner write under `<uid>/`.
  - `chat-media`: read if `is_member(first folder)`, except `timed/` paths, which need a view recorded in the last 60 s or the reader to be the sender. Write if member.
  - `verification`: owner write under `<uid>/`; owner or admin read.
  - All buckets: images only, 5 MB limit.

- [ ] Write `beta_security.sql`. It creates two test users through `auth.users` inserts, then acts as each one with `set local role authenticated; set local request.jwt.claims`. It asserts:
  - user A cannot select B's private profile columns;
  - A's `update profiles set plan='premium'` raises;
  - a free user's 4th `start_conversation` in a month raises `CHAT_LIMIT_REACHED`;
  - `people_search('{"online":"true"}')` returns offline members;
  - a non-admin calling `admin_analytics()` raises `FORBIDDEN`;
  - `update audit_log` raises;
  - a non-member cannot select a conversation's messages;
  - a second `timed_image_view` raises.

  It cleans up its test users at the end.
- [ ] Run it: expect it to fail (functions missing).
- [ ] Write and apply the functions migration.
- [ ] Run the security tests: all pass.
- [ ] Run `get_advisors` (security): no errors.
- [ ] Commit.

### Task 2: Beta client core (auth, account, people, plans) and wiring

**Files:**
- Create:
  - `src/beta/config.js`: `BETA` flag, Supabase URL and publishable key.
  - `src/beta/client.js`: `supabase` singleton.
  - `src/beta/errors.js`: `toApiError(err) -> ApiError`.
  - `src/beta/router.js`: `routes` table, `match(method, path) -> {handler, params, query}`.
  - `src/beta/handlers/account.js`, `src/beta/handlers/people.js`, `src/beta/media.js`.
  - `src/beta/index.js`: `betaRequest(path, {method, body, isForm}) -> Promise<data>`.
- Modify:
  - `src/lib/api.js`: if `BETA`, `apiRequest` returns `betaRequest(...)`.
  - `package.json`: add `@supabase/supabase-js`.
  - `src/components/GoogleSignInButton.jsx` and `GoogleButton.jsx`: render nothing in beta.
  - `index.html`: remove the global GSI script; GoogleSignInButton loads it on demand.
- Test: `tests/beta-router.test.mjs`. It stubs `supabase` through `__setClient(fake)`.

**Interfaces:**
- **Produces:**
  - `betaRequest`
  - `getSupabase()`
  - `signedUrl(bucket, path, seconds=300) -> Promise<string>`
  - `uploadImage(bucket, path, file) -> Promise<{path, publicUrl?}>`
  - `currentUserId() -> Promise<string|null>`
- **Auth handlers:**
  - `/auth/signup` → `signUp` with metadata (all signup fields plus `acceptTerms`, `sensitiveConsent`, `termsVersion`). It returns `{auth:{accessToken, refreshToken}}`. A null session throws `CONFIRM_EMAIL_ON`.
  - `/auth/login` → `signInWithPassword`.
  - `/auth/logout` → `signOut`.
  - `/admin/auth/login {email,password}` → `signInWithPassword`, then `is_admin`. If not admin: `signOut` and throw `FORBIDDEN` "This account is not an admin."
- **Media and password:**
  - `/media/upload` uses `purpose`:
    - `avatar` → bucket `avatars`, returns `{mediaId: path, mediaUrl: publicUrl}`;
    - `chat_image` or `timed_image` → bucket `chat-media` under `<conversationId>/…`. The handler takes the conversation id from FormData `conversationId`; MessagingPage is modified to send it.
  - `/me/password` re-authenticates with `currentPassword`, then calls `updateUser`.

- [ ] Write the router tests:
  - `match('GET','/people/abc?x=1')` gives `params.id === 'abc'` and `query.x === '1'`;
  - signup with a null session rejects with `code === 'CONFIRM_EMAIL_ON'`;
  - an RPC error message starting `CHAT_LIMIT_REACHED:` maps to `ApiError.code === 'CHAT_LIMIT_REACHED'`;
  - unknown routes reject with `NOT_FOUND`.
- [ ] Run them: they fail.
- [ ] Implement.
- [ ] Run them: they pass.
- [ ] Install dependencies on the device VM and run `npm run build` with `VITE_BETA=true`: it succeeds.
- [ ] Commit.

### Task 3: Messaging, groups and Realtime

**Files:**
- Create: `src/beta/handlers/messaging.js`, `src/beta/handlers/groups.js`, `src/beta/socket.js`.
- Modify:
  - `src/lib/socket.js`: in beta, `getSocket()` returns the beta shim.
  - `src/pages/messaging/MessagingPage.jsx`: send `conversationId` with uploads; hide the call buttons in beta and show the calls note.
  - `src/pages/messaging/calls/CallProvider.jsx`: inert in beta.
- Test: `tests/beta-socket.test.mjs`.

**Interfaces:**
- `createBetaSocket({supabase, meId})` returns `{on, off, emit, disconnect, connected}`.
  - It subscribes to `postgres_changes` INSERT on `messages`. For each insert it emits `message:new {conversationId, message}`, but skips messages where `senderId === meId`.
  - It subscribes to the broadcast channel `user:<meId>`, event `typing`, and emits `typing:update {conversationId, isTyping}`.
  - `emit('typing:start'|'typing:stop', {conversationId, targetUserId})` broadcasts to `user:<targetUserId>`.
- Message shapes get a signed `media.mediaUrl` for `image`. A timed image carries `timed:{durationSeconds,noScreenshot}`.

- [ ] Write the socket tests, using a fake channel:
  - the member's own insert produces no `message:new`;
  - another member's insert produces one with a mapped message;
  - a typing broadcast becomes `typing:update`.
- [ ] Run them: they fail.
- [ ] Implement.
- [ ] Run them: they pass.
- [ ] Commit.

### Task 4: Beta checkout

**Files:**
- Create: `src/components/BetaCheckoutModal.jsx`.
- Modify: `src/pages/HowItWorksPage.jsx` (in beta the plan buttons open the modal) and `src/components/UpgradeModal.jsx` (legal links).
- Handler: `/subscriptions/checkout {plan, outcome}` → `beta_checkout`.

**The modal shows:**
- the plan name and price;
- the line "Beta checkout – no charge";
- the buttons "Complete beta payment" and "Simulate failed payment";
- below them, the links "Privacy Policy · Terms · Refund policy".

On success it calls `refreshUser()` and navigates to `/explore?checkout=success`.

- [ ] Test (`tests/beta-router.test.mjs`): checkout calls RPC `beta_checkout` with `{plan, outcome}`.
- [ ] Implement.
- [ ] Commit.

### Task 5: Admin on real beta data

**Files:**
- Delete: `src/admin/data/mockAdminApi.js`, `tests/admin-mock.test.mjs`.
- Modify:
  - `src/admin/data/preview.js` → `ADMIN_PREVIEW = false` is removed entirely; `index.js` always uses `httpAdminApi` and `useAuth`.
  - `httpAdminApi.loadPhoto`: in beta, `signedUrl('verification', path)`.
  - `AdminLayout` banner: the beta banner text.
  - `AdminLoginPage`: in beta, an email + password form that calls `loginAdmin(email,password)`.
  - `AuthContext`: add `loginAdmin(email, password)`.
- Create: `src/beta/handlers/admin.js`, which maps every `/admin/*` path in the admin contract to the `admin_*` RPCs.

- [ ] Test: router maps `GET /admin/users?verificationStatus=pending&page=2&limit=25` to `admin_users` with `f = {verificationStatus:'pending', page:'2', limit:'25'}`.
- [ ] Implement.
- [ ] Commit.

### Task 6: Legal pages, cookie consent, links, fonts, beta banner

**Files:**
- Create:
  - `src/lib/legalConfig.js`
  - `src/lib/legalContent.js` (Privacy, Cookie Policy, Beta Notice sections and the beta terms section)
  - `src/lib/consent.js` (`getConsent()`, `setConsent(choice, opts)`, `canStore(key)`, `CONSENT_VERSION`)
  - `src/components/CookieBanner.jsx`
  - `src/components/BetaBanner.jsx`
- Modify:
  - `src/pages/LegalPage.jsx`: add pages `privacy`, `cookies`, `beta`; show "Last updated"; the cookie page has a "Change cookie settings" button.
  - `src/App.jsx`: add the `/beta` route; mount CookieBanner and BetaBanner.
  - `src/components/Footer.jsx`: Privacy, Terms, Cookies, Cookie settings, Beta notice.
  - `SignupPage.jsx`: Terms and Privacy checkbox linked, plus a sensitive-data notice checkbox; send `sensitiveConsent`.
  - `LoginPage.jsx`, `CompleteProfilePage.jsx`, `ReportBlockModal.jsx`, `SupportChatWidget.jsx`: privacy line.
  - `AccountPage.jsx`: a privacy section with "Download my data" (JSON of `me_get` plus conversations and messages the member sent) and "Delete account".
  - `ThemeContext.jsx` and `MotionContext.jsx`: write storage only when `canStore('preferences')`.
  - Fonts: `@fontsource` imports in `main.jsx`; remove the Google Fonts `<link>` and the `@import` in `styles.js`/`theme.css`.
- Test: `tests/consent.test.mjs`:
  - with no consent, `canStore('preferences')` is false;
  - `essential` → false;
  - `all` → true;
  - `custom {preferences:true}` → true;
  - a stored `version !== CONSENT_VERSION` means `getConsent()` returns null.

- [ ] Write the tests.
- [ ] Run them: they fail.
- [ ] Implement.
- [ ] Run them: they pass.
- [ ] Commit.

### Task 7: Build safety, deploy config, end-to-end walkthrough

**Files:**
- Rename and extend `scripts/check-admin-preview.mjs` → `scripts/check-beta.mjs` (npm script `check:beta`).
  - A plain build must contain neither the markers `Early access beta` / `beta_checkout` nor the Supabase URL.
  - A build with `VITE_BETA=true` must contain them.
- Modify `vercel.json`: `"buildCommand": "VITE_BETA=true npm run build"`.

- [ ] Run `npm test`, `npm run check:beta`, and the static check (`counts {}`).
- [ ] Playwright walkthrough against `vite preview` of the beta build, with two browser contexts:
  1. Two members sign up, then both appear in Explore.
  2. A sends B a message; B sees it live; read receipts work.
  3. A buys Basic through beta checkout; the badge updates.
  4. B reports A.
  5. The admin (a third account inserted into `admins` via SQL) sees the 3 users, the payment and the report, then blocks A.
  6. The cookie banner's three choices behave as tested.

  This needs Supabase "Confirm email" switched off. If it's still on, record it and continue with what can be tested.
- [ ] Delete the test accounts.
- [ ] Push to `premium-redesign` and `main`.
- [ ] Report the owner steps.

## Contracts

These are the frontend's exact expectations, captured from the source on 2026-10-18. Field names are verbatim.

**Session user (`me_get`):**
- `id`, `name`, `email`, `phoneNumber`, `countryCode`, `username`
- `hasPassword:true`
- `role` (`'admin'` if `is_admin()` else `'user'`)
- `profileComplete`: always a boolean; true when gender, nationality, religion, ageRange, hasKids and location are all set.
- `verificationStatus`
- `membership:{plan, status}`
- `profile:{gender, nationality, religion, ageRange, hasKids, location, bio, hobbies, avatarUrl, contactVisibility}`

**Person:**
- `id`, `displayName`, `age` (number derived from the age range midpoint, or null), `gender`
- `onlineStatus` (`online` if seen within the last 2 minutes, else `offline`)
- `verified`, `plan`, `religion`, `nationality`, `location`, `city`, `hasKids`, `avatarUrl`, `bio`, `hobbies`
- `contact:{username, email, phoneNumber, isPrivate}`, following contact-visibility and plan rules.

**Lists:** always `{items}`.

**Conversation summary item:**
- `conversationId`, `isGroup`
- `other:{id, displayName, avatarUrl, age, city, religion, plan}` (1-to-1 only)
- `group:{name, avatarUrl}` and `memberCount` (groups only)
- `presence`, `lastMessage:{preview}`, `unreadCount`

Sorted by last activity, newest first.

**Message:**
- `id`, `conversationId`, `senderId`, `type`, `text`, `createdAt`
- `media:{mediaUrl}` (image only)
- `timed:{durationSeconds, noScreenshot}` (timed_image only)
- Call messages use `text` in the format `"<voice|video>:<status>:<seconds>"`.

**Group:**
- `id` (equals the conversation id), `name`
- `myRole` (`admin` or `member`)
- `members:[{id, displayName, avatarUrl, role}]`

**Send-message response:** `{message}`.

**Admin shapes:** as in `src/admin/README.md` and the admin pages. The fields are listed in `tests/admin-mock.test.mjs` before its deletion.
