# Nikha2 backend, Phase 1: design

Date: 2026-10-04
Status: draft for review
Scope: the new backend (replacing the lost one on Render), plus the frontend and admin screens Phase 1 needs.

## 1. Purpose and agreed decisions

Nikha2 is a second-marriage matrimony platform. The old backend's source and hosting account are lost; the old server still runs at `nikah2-backend.onrender.com` and keeps the live site working until this backend replaces it.

The product's full module list lives in the owner's private requirements documents. **Those documents are confidential and must never be added to this repository.** This spec names features only.

| Decision | Choice |
|---|---|
| Shape | Our own Node server; the website and admin talk only to it |
| Data, files | Supabase (Postgres + Storage), AWS Mumbai region (`ap-south-1`) |
| Hosting | Render web service to start; portable to AWS (Docker, env-only config) |
| CMS | The existing admin panel gains a Content section; no separate CMS product |
| Admin login | Per-admin email + password + passkey (WebAuthn), all three every time |
| Messages | Private 1-to-1 chats end-to-end encrypted (libsodium). Group chats, and later rooms, forums and feed, are not E2EE; they are moderated |
| Payments | Razorpay (India) and Stripe (overseas), chosen by member country; each switchable |
| Email, SMS | Built behind modules but **switched off** until the owner's domain (email, via Resend) and an SMS provider (with DLT registration) are set up |
| Horoscope | Optional per member; astrology counts in matching only when both members opted in |
| Stack vs. the requirements documents | One Postgres instead of MongoDB + PostgreSQL; Redis added only when we run more than one server; matching v1 is a rules-based scoring engine, while an AI/ML service (FastAPI) comes in Phase 2 behind the same interface; keep the current React (Vite) site, pre-render public pages for SEO |

Phases (each gets its own spec → plan → build):
- **Phase 1** (this spec): everything the live site does today, plus the "must have" modules. At the end, the live site switches to the new backend.
- **Phase 2**: AI matchmaking v2, communities, forums, feed, events, notifications (including push), success-story submissions, help tickets, advanced analytics.
- **Phase 3**: speed dating, group video meetups, AI moderation, fraud detection, family/parent access, mobile app.

## 2. Architecture

```
Browser (React site + /admin)
   │  HTTPS (REST, JSON envelope)      WSS (Socket.IO)
   ▼
Node server (TypeScript, Express, Socket.IO)  ── Docker image, env config
   │  SQL (pg driver)            │ S3 API (signed URLs)       │ HTTPS
   ▼                             ▼                            ▼
Supabase Postgres         Supabase Storage (S3-compatible)   Razorpay · Stripe · Google · Resend* · SMS* · TURN
(*off until configured)
```

- **Repository layout:** the backend lives in `server/` inside this same repository. Render deploys that folder. Shared types live in `server/src/contracts/`.
- **Language and libraries:** Node 22 and TypeScript.

  | Purpose | Library |
  |---|---|
  | Web server | Express |
  | Real-time | Socket.IO |
  | Database driver | `pg` |
  | Migrations | `node-pg-migrate` (plain SQL) |
  | Input validation | `zod` |
  | Password hashing | `argon2` |
  | Tokens | `jose` |
  | Passkeys | `@simplewebauthn/server` |
  | Google sign-in | `google-auth-library` |
  | Security headers | `helmet` |
  | Image processing (resize, strip EXIF and GPS) | `sharp` |
  | Storage | `@aws-sdk/client-s3` |
  | Payments | official Razorpay and Stripe SDKs |
- **Portability rule:**
  - No Supabase-only SDK calls on the server. The database is reached by connection string; storage through the S3 API.
  - Moving to AWS means changing environment variables: RDS for the database, S3 for storage, App Runner/ECS/EC2 for the server.
  - Code never reads from the host machine's disk for state.
- **Modules** (folders under `server/src/modules/`): `auth`, `admin-auth`, `users`, `profiles`, `media`, `masterdata`, `search`, `matching`, `interests`, `messaging`, `e2ee`, `groups`, `calls`, `billing`, `moderation`, `cms`, `admin`, `audit`, `notify` (email/SMS adapters).
  - Each module exposes routes plus a service with a typed interface. Modules call each other's services, never each other's tables directly.
- **Interfaces kept swappable:**

  | Interface | Phase 1 implementation | Later |
  |---|---|---|
  | `MatchScorer` | rules engine | AI service |
  | `PaymentProvider` | Razorpay, Stripe | |
  | `MailSender` | disabled | Resend, SES |
  | `SmsSender` | disabled | provider |
  | `ObjectStore` | S3 API | |
  | `RateLimitStore` | in-memory | Redis |
  | `SocketAdapter` | single node | Redis adapter |

- **API contract:**
  - Every endpoint in `BLUEPRINT.md` §6 and every Socket.IO event in §7 is kept with the same paths, payloads and the `{ data }` / `{ error: { code, message, details } }` envelope, so the existing site works unchanged.
  - Exceptions: admin login (§4.3), message payloads for 1-to-1 chats (§5), and the checkout response (§7). The frontend is updated for each.
  - New endpoints follow the same conventions.

## 3. Environments

- Two Supabase projects (free tier): **`nikha2-dev`** (test data only) and **`nikha2-prod`** (real members, touched only after a stage passes review). Both in `ap-south-1`.
- In both projects, row-level security is enabled on every table with **no** policies, so the public `anon` key can read nothing. Only the server's connection string and service credentials have access, and they live only in environment variables.
- Storage buckets:
  - `profile-photos`: private.
  - `chat-media`: private; holds encrypted blobs only for 1-to-1 chats.
  - `verification`: private; admin-only.
  - `cms-public`: public, for images on public pages.
- Local development runs against `nikha2-dev`. Automated tests run against a throwaway local Postgres.

## 4. Security design

### 4.1 Baseline (all endpoints)
- **Transport and headers:**
  - HTTPS only.
  - `helmet` with a strict Content-Security-Policy (no inline scripts except the theme no-flash script by hash).
  - HSTS; `X-Content-Type-Options`; `Referrer-Policy: same-origin`.
- **CORS:** allows only the configured frontend origin(s).
- **Input:**
  - Every request body, query and param is validated by a `zod` schema. Unknown fields are rejected.
  - Queries use parameters only; no string-built SQL.
- **Rate limits:**
  - Per IP and per account on login, signup, OTP, passkey, the PIN-recovery endpoint, reports and messaging.
  - 10 failed logins lock the account for 15 minutes and are written to the security log.
- **Errors** never leak stack traces or SQL. Logs never contain passwords, tokens, message content, PINs or payment data.
- **Secrets** exist only in environment variables. `.env` is gitignored, and a checked-in `.env.example` lists names only.
- **Dependencies:** `npm audit` runs in CI and fails on high-severity issues. Lockfile committed.

### 4.2 Member authentication
- **Passwords:** argon2id (memory ≥ 19 MiB, t ≥ 2); minimum 8 characters, checked against a common-password list.
- **Access tokens:** JWT (EdDSA), 15 minutes, carrying `sub`, `role` and `sid`. Expiry returns `401 TOKEN_EXPIRED`, the code the site already handles.
- **Refresh tokens:**
  - Random 256-bit, stored only as SHA-256 hashes, 30-day lifetime.
  - **Rotated on every use.** Reusing an old refresh token revokes the whole session family.
  - Logout revokes the session. A password change revokes all sessions.
- **Google sign-in:** the ID token is verified server-side (audience, issuer, expiry, `email_verified`).
- **Token storage:** while the site and API are on different `onrender.com` hosts, tokens stay where the site keeps them today, protected by the strict CSP. Once both are on the owner's domain (`nikha2.com` and `api.nikha2.com`), the refresh token moves to an `HttpOnly; Secure; SameSite=Lax` cookie and the access token is held in memory only. This is a planned follow-up switch, done with the domain setup.
- **Mobile OTP and email verification:**
  - Implemented: 6-digit codes, stored hashed, expire in 10 minutes, 5 attempts.
  - Disabled while `SmsSender`/`MailSender` are off. While email is off, "forgot password" shows "Contact support" instead of failing silently.

### 4.3 Admin authentication and roles
- **Separate admin accounts:** a `users` row with `role='admin'` plus an `admin_accounts` row holding the admin role(s). There is no public admin signup.
- **First Super Admin:** created by a one-time server command (`npm run admin:create`) that prompts for email and password on the server console and prints a one-time passkey-enrolment link valid for 15 minutes.
- **Login steps:**
  1. Email + password (minimum 12 characters, argon2id).
  2. Passkey assertion (WebAuthn, user verification required).
  3. The server then issues an admin session.

  Each admin can register up to 5 passkeys. If an admin loses all passkeys, another Super Admin issues a new enrolment link; there is no email-based reset for admins.
- **Admin sessions:** 30-minute idle timeout and 8-hour maximum. Admin tokens carry `aud=admin` and are rejected by member endpoints, and vice versa.
- **Admin login screen:** `/admin/login` in the frontend is rewritten to email → password → "Use your passkey". The old Google + shared-password admin login is removed.
- **Role-based access:** nine roles, enforced on every admin endpoint by a permission check. The frontend hides sections an admin can't use, but the server is the authority.

  | Role | Permissions |
  |---|---|
  | Super Admin | everything, including managing admins and roles |
  | Operations | users, profiles, verification, master data |
  | Moderator | photo/profile moderation, reports, group-chat moderation, warnings |
  | Community | group chats now; communities, forums and events in Phase 2 |
  | Support | user lookup with limited profile fields (no income, no verification photos, no payment details) |
  | Finance | subscriptions, payments, refunds, coupons, invoices |
  | Marketing | CMS, banners, success stories, coupons (create only) |
  | Analytics | dashboards and reports, read-only, aggregated |
  | Technical | configuration, plan limits, matching weights, integrations status, security log |

- **Audit and monitoring:**
  - Every admin write is recorded in `audit_log`: actor, action, target, before/after diff of changed fields, IP, user agent and time.
  - The audit log is append-only: no update or delete route exists, and a database trigger blocks both.
  - Admin sign-ins, failures and passkey changes go to `security_events`.
  - Super Admin can see and end active admin sessions.

### 4.4 Data protection and privacy
- **Photos:**
  - Re-encoded by `sharp` with EXIF and GPS removed.
  - Served only through signed URLs that expire after 5 minutes.
  - Private photos are visible only to members the owner approved via a photo request.
- **Field privacy:**
  - Income, phone and email are hidden by default.
  - Contact visibility follows the member's setting and plan rules.
  - Logged-out visitors see a limited card: first name, age, city, a blurred photo if the photo is private, and never any contact details.
- **Blocking:** blocked members can't see, search, message or call each other in either direction.
- **Member data rights** (India's DPDP Act 2023 and GDPR):
  - "Download my data" produces a JSON export, emailed once email exists and offered as a direct download until then.
  - "Delete my account" erases the profile, photos and keys immediately, and removes or anonymises the rest within 30 days; payment records are kept as the law requires.
  - "Deactivate" hides the profile.
  - Consent to terms and privacy policy is recorded with version and time.
- **Encrypted 1-to-1 chats:** the server stores only ciphertext; see §5.

### 4.5 Required security tests (must pass in CI)
- A member token can't reach any `/admin/*` route; an admin token can't reach member-only routes.
- Each admin role can't reach the routes its role excludes (a table-driven test over the permission map).
- Refresh-token reuse revokes the session family.
- Lockout after 10 failed logins.
- Blocked users can't find, message or call each other.
- Private photos and contact fields never appear in responses to unauthorised viewers.
- The server never stores readable 1-to-1 message text (the test inspects the database rows after sending).
- The audit log can't be updated or deleted.
- Payment webhooks with a bad signature are rejected.
- CMS HTML containing scripts or event handlers is stripped.

## 5. End-to-end encrypted 1-to-1 chat

**Library:** `libsodium-wrappers-sumo` in the browser, no custom cryptography.

**Keys**
- Each member has an **identity key pair**: Ed25519 for signing and X25519 for encryption.
- Each browser or device has a **device key pair**: X25519 for encryption and Ed25519 for signing. Device public keys are signed by the identity key and published to the server (`/e2ee/devices`).
- Private keys live in the browser's IndexedDB and never leave the device unencrypted.

**Sending a message**
1. Generate a random message key.
2. Encrypt the message with XChaCha20-Poly1305.
3. Seal the message key separately to every device of the recipient **and** the sender's other devices (`crypto_box_seal`).
4. Sign the ciphertext with the sending device's key.
5. The server stores the ciphertext, the per-device sealed keys, the signature and the routing metadata (who, which conversation, when, type). Message text is never stored readable.

**Images and view-once photos**
- Encrypted in the browser with their own key before upload. The key travels inside the encrypted message.
- View-once blobs are deleted from storage when the recipient opens them, or after 7 days unopened.

**Key changes**
- When a contact's device keys change, the chat shows a notice.
- Each conversation offers a **security code** (derived from both identity keys) that the two members can compare to rule out interception.

**Recovery PIN**
1. A member sets a PIN of at least 6 digits (a longer passphrase is allowed).
2. The browser derives `k1 = argon2id(PIN, salt)`.
3. The server holds a secret pepper (an environment variable, never in the database). It stores a verifier, `HMAC(pepper, k1)`.
4. On recovery, the browser sends `k1`. If the verifier matches, the server returns `k2 = HMAC(pepper, "backup" ‖ userId)`.
5. The identity private key backup is encrypted with `HKDF(k1 ‖ k2)`.
6. After 10 wrong attempts the backup locks permanently.

A stolen database alone can't be brute-forced. Accepted limit: an attacker who controls the running server and the pepper could try PINs, which is why longer passphrases are offered and recommended. A new device restores the identity key, creates a new device key, and can then read history whose keys were sealed to the backup-restorable identity: every message key is additionally sealed to the recipient's and sender's **identity** X25519 key.

**Reports:** reporting a message from an encrypted chat attaches the readable text of the selected messages from the reporter's own device, plus their signatures, so moderators can confirm the messages are genuine.

**Not E2EE:** group chats. They are stored encrypted at rest by Supabase and moderated.

**Calls:** WebRTC media is already end-to-end encrypted (DTLS-SRTP). TURN relays can't read it.

## 6. Data model (Postgres)

Kept from `BLUEPRINT.md` §8, with these changes and additions. All ids are UUID v7. Every table has `created_at`, and `updated_at` where rows change.

- **Accounts:**
  - `users`: adds `status` (active/deactivated/deleted), `phone_verified`, `email_verified`, `marked_suspicious`, `warnings_count`, `country`.
  - `sessions` (replaces `refresh_tokens`): family id, hash, device label, ip, user agent, expires and revoked times.
  - `admin_accounts`, `admin_roles`, `webauthn_credentials`, `admin_enrolment_tokens`.
  - `otp_codes`, `consents`, `security_events`.
- **Profiles:**
  - `profiles` grows: date of birth (age derived), height, marital status (divorced/widowed/separated/annulled), children (count and living with), education, profession, income range plus visibility, city with latitude/longitude (city-level only), lifestyle (diet, smoking, drinking), religion, community/sect, mother tongue, about me, hobbies, completion %.
  - `family_details`, `horoscopes` (optional, owner-only unless shared), `partner_preferences` (each field marked *must* or *nice-to-have*).
  - `photos`: public/private, primary flag, moderation status. `photo_access` holds approved viewers.
- **Master data** (admin-editable): `countries`, `cities`, `education_levels`, `professions`, `religions`, `communities`, `languages`.
- **Discovery:** `saved_searches`, `profile_views`, `shortlists`, `interests` (status: pending/accepted/declined/withdrawn), `match_scores` (cached, recomputed on profile or preference change), `matching_config` (weights).
- **Messaging:**
  - `conversations` and `conversation_members` as before.
  - `messages` adds `ciphertext`, `nonce`, `signature`, `sender_device_id`, `e2ee bool`. `text` is null for E2EE messages.
  - `message_keys` (message_id, device_id, sealed_key), `e2ee_devices`, `e2ee_identities`, `e2ee_backups` (encrypted blob, salt, verifier, attempts, locked), `message_reactions`.
- **Moderation:** `reports` (adds the reporter-supplied plaintext, its signatures, status, assignee), `moderation_actions`, `warnings`, `verification_requests`.
- **Billing:**
  - `plans` (price per currency, period monthly/yearly, limits jsonb), `subscriptions` (provider, provider ids, status, period end), `payments`, `invoices`, `refunds`, `coupons`, `coupon_redemptions`, `usage_counters`.
  - `webhook_events`: provider event id unique, for idempotency.
- **CMS:** `cms_pages` (key, draft json, published json), `cms_versions` (page key, json, published_by, published_at), `cms_media`.
- **Audit:** `audit_log` (append-only).

Indexes are designed for search: profile filters, plus age, gender and city combinations.

## 7. Features and behaviour (Phase 1)

### Member features
- **Signup and login:**
  - The two existing signup steps stay.
  - New members then go through a guided multi-step profile builder with a completion meter. Members can't appear in search until the core sections are complete and the primary photo is approved.
- **Profile and photos:**
  - Up to 8 photos. Each new photo enters a moderation queue; members can choose public or private.
  - Video introductions are deferred to Phase 2 (storage and moderation cost).
- **Partner preferences:** each criterion is *must* (a hard filter) or *nice* (adds to the score).
- **Search:**
  - Basic filters: age, gender, location, community, education, profession.
  - Advanced filters: height, income, lifestyle, family type, marital status, children, diet, smoking/drinking, hobbies, horoscope (if opted in), distance.
  - Save search; recently viewed; recently active; reset.
  - Cursor pagination, 20 per page.
- **Matching v1 (`MatchScorer`):**
  - Hard filters remove: blocked, suspended or deactivated members; anyone outside either member's *must* preferences; anyone outside the member's own gender preference.
  - The score (0–100) is a weighted sum of: preference fit (both directions), lifestyle fit, location closeness, cultural/regional match and recent activity.
  - When **both** members opted in to horoscope, astrology takes a share of the weight; otherwise that share is spread across the others.
  - Weights live in `matching_config`, editable by Technical/Super Admin.
  - Lists: Recommended for you, Highly compatible (≥ 80), New, Nearby.
  - The existing `GET /people/ai-match` (premium) returns the top of this list.
- **Interests:**
  - Send with an optional note; accept, decline or withdraw.
  - Sent, received and pending tabs.
  - Accepting opens chat according to plan rules. Daily send limits per plan.
- **Shortlist:** add, remove and list.
- **Chat and calls:**
  - 1-to-1 chat as in §5, with read receipts (can be switched off), typing, online status, reactions, images, view-once, block, report and unmatch.
  - Groups and calls keep today's behaviour and plan rules, including mesh group calls.
- **Verification:** the member submits selfie photo(s), an admin approves or rejects, and approved members get a verified badge. Automated checks (face match, liveness) are deferred to Phase 3 fraud detection.
- **Plans:**
  - Free, basic and premium, monthly or yearly. Prices are set per currency (INR and USD) in admin.
  - Limits (new contacts/day, interests/day, calls, contact visibility, AI matches) come from `plans.limits`, not code.
  - Checkout:
    - India: Razorpay order or subscription.
    - Overseas: Stripe Checkout.
    - `POST /subscriptions/checkout` returns `{ provider, checkoutUrl }` for Stripe or `{ provider, orderId, keyId }` for Razorpay's in-page checkout.
  - Activation happens **only** from a signature-verified webhook, processed idempotently.
  - Invoices are generated as PDF.
  - Refunds are issued by Finance admins through the provider's API.
  - Coupons: percent or fixed amount, plan restriction, expiry, usage caps.
- **Account settings:** privacy (photo, contact, income visibility; read receipts; online status), password, deactivate, delete, download data.

### Admin features
- **Dashboard:**
  - User KPIs: total, new, active, verified, gender split, premium, suspended.
  - Matrimony KPIs: profiles completed, interests sent/accepted, conversations, calls.
  - Revenue KPIs: total, daily/monthly, renewals, refunds, coupon use.
  - Figures are computed by SQL views and cached for 5 minutes.
- **Users:**
  - The existing list, detail, bulk actions and CSV export.
  - New actions: warn, deactivate, reactivate, reset verification, mark suspicious.
- **Queues:** verification, photo moderation, reports (with assignee and status).
- **Moderation of group chats:** moderators can read reported group messages and remove them.
- **Billing:** plans and prices, limits, coupons, subscriptions, payments, refunds, invoices.
- **CMS:**
  - Editable pages: Home, About, How It Works, Success Stories, Membership Plans copy, FAQ, Contact, Terms, Privacy, Community Guidelines, plus footer and navbar text and banners.
  - Each page is a set of typed fields (text, rich text, image, list of items). Rich text is sanitised on the server.
  - Draft and publish. Preview renders the real page with draft content.
  - Every publish creates a version; one-click restore.
  - **Plan prices are not CMS content:** the pricing page reads prices from `plans`, so the advertised and charged prices can't differ.
  - Public pages fetch `GET /content/:pageKey` (cached, ETag) and fall back to the text built into the site if the request fails.
- **Master data:** add, edit and hide cities, professions, education, religions, communities and languages.
- **Admins and security:**
  - Manage admins and roles (Super Admin only).
  - Passkey enrolment links.
  - Active sessions.
  - Security events and audit log.

## 8. Frontend work in Phase 1

The current look and theme stay. New or changed screens:
- Admin login.
- Profile builder and profile sections.
- Preferences.
- Photo manager.
- Search and saved searches.
- Matches.
- Interests.
- Shortlist.
- Chat encryption layer: key setup, recovery-PIN screens, security code, key-change notice.
- Checkout (Razorpay and Stripe).
- Settings (privacy, data).
- Admin sections: roles, queues, moderation, coupons, refunds, CMS, master data, security.
- Public pages read CMS content.

## 9. Error handling and operations

- Errors use stable codes (`VALIDATION_FAILED`, `AUTH_REQUIRED`, `TOKEN_EXPIRED`, `FORBIDDEN`, `NOT_FOUND`, `RATE_LIMITED`, `PLAN_LIMIT`, `CONFLICT`, `PROVIDER_ERROR`, `INTERNAL`) and are logged with a request id that is returned to the client.
- `GET /health` reports database and storage reachability without revealing details.
- Structured JSON logs, with personal data redacted.
- Webhooks retry safely (idempotent on provider event id).
- Socket.IO authenticates with the access token on connect and on token refresh, and disconnects on logout or block.
- Backups: Supabase Pro daily backups are required before production launch. Until then, a nightly `pg_dump` to private storage, encrypted.

## 10. Testing

- **Test-first** for every module: unit tests (vitest) for services and pure logic (scoring, limits, coupon maths, crypto helpers).
- **Integration tests** (supertest) against a real local Postgres with migrations applied.
- The security suite from §4.5.
- **E2EE tests:** round-trip encryption across devices, recovery-PIN flow, the attempt lock, and a database inspection that confirms no readable text is stored.
- **Payments:** provider test modes and signed sample webhooks.
- **End-to-end:** Playwright runs signup → profile → search → interest → encrypted chat → upgrade (test mode) → admin approve, in both light and dark themes.
- The existing frontend tests (`node --test tests/*.test.mjs`) and the static check keep passing.

## 11. Build stages (each gets its own implementation plan)

1. **Foundation:**
   - server skeleton, config, logging, errors, migrations, security middleware;
   - member auth (email/password, Google, sessions);
   - admin auth (password + passkey) and roles, audit log;
   - `/me`, current `/people` endpoints, media upload.

   *Exit criterion:* the existing site logs in and shows Explore against the new server.
2. **Profiles:** full profile, family, horoscope, photos and privacy, partner preferences, master data, verification and photo moderation.
3. **Discovery:** search, saved searches, profile views, matching v1, interests, shortlist, plus their frontend pages.
4. **Messaging:** E2EE 1-to-1 (server and browser), groups, Socket.IO, reactions, view-once, reports, unmatch.
5. **Calls:** ICE/TURN configuration, 1-to-1 and group signalling, plan rules, call history.
6. **Billing:** plans and limits, Razorpay, Stripe, webhooks, invoices, refunds, coupons.
7. **Admin completion:** dashboard KPIs, all queues and actions, billing pages, admin management, security pages.
8. **CMS:** content model, editor with preview, versions, public pages wired to content.
9. **Cutover:**
   - deploy to Render with `nikha2-prod`;
   - owner acceptance testing;
   - import members from the old admin CSV export (passwords can't be carried over: members use Google sign-in or reset once email is on);
   - switch `VITE_API_URL`;
   - keep the old backend for about a week as a fallback.

   Old chat history isn't migrated.

Every stage ends with tests passing, an independent code review, and the owner trying it locally.

## 12. Out of scope for Phase 1
- Communities, forums, feed, events and notifications (including push).
- Help tickets, video introductions, AI matching v2, AI moderation, fraud detection.
- Speed dating, group video meetups, family access, mobile app.
- Live email/SMS sending: built, but off until the owner's domain and SMS registration are ready.
