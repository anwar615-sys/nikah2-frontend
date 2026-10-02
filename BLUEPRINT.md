# Nikha2 — "The Second Chance": Complete Blueprint

Reconstructed on 2026-10-03 from the live deployment, after the original frontend and backend source code was lost.

| | |
|---|---|
| Live frontend | https://nikah2-frontend.onrender.com |
| Live backend | https://nikah2-backend.onrender.com/api (still running) |
| Brand | **Nikha2**, tagline "The Second Chance — Global Matchmaking Platform" |
| Product | A matchmaking site for people looking for a second marriage: explore profiles, chat, voice and video calls, groups, paid plans, admin moderation |

## 0. What's in this folder

| Path | What it is |
|---|---|
| `BLUEPRINT.md` | This document: the full spec for rebuilding both apps |
| `_recovered/live-build/` | The exact production build that was downloaded (`index.html`, JS bundle, CSS, favicon) |
| `_recovered/decompiled/app.recovered.jsx` | **The old app's code decompiled back to readable JSX, with real component names.** It is the reference implementation: every page, its text, styles and logic. The socket.io-client library code sits in the middle of it (marked) and can be skipped. |
| `_recovered/decompiled/styles.css` | The production CSS, unminified (Tailwind v4.2.4 output) |
| `_recovered/tools/` | Scripts used to decompile (`unjsx.cjs`, `rename.cjs`) |

> Local variable names inside functions are still minified (`e`, `t`, `n`…), because a build never keeps those. Component, page, hook and helper names were restored by hand. All strings, styles, layout and logic are exactly as in production.

---

## 1. Tech stack (detected)

**Frontend**
- React 19 (`react.transitional.element`), built with **Vite**
- React Router DOM v6: `BrowserRouter` › `Routes` › `Route`, plus `Link`, `Navigate`, `useNavigate`, `useLocation`, `useSearchParams`, `useParams`
- Tailwind CSS **v4.2.4**. Most styling, though, is **inline `style={{…}}` objects** with a fixed palette (section 3)
- `socket.io-client` v4 (path `/socket.io`, `auth: { token: accessToken }`)
- WebRTC for 1:1 and group voice/video calls, with ICE servers from the backend
- Google Identity Services (`https://accounts.google.com/gsi/client`, loaded in `index.html`)
- `fetch` API wrapper (no axios); JWT access and refresh tokens in `localStorage`
- Country/state lists from `countriesnow.space`

**Backend (inferred from its API)**
- REST under `/api` + Socket.IO on the same origin
- IDs are **UUIDs** and lists use cursor pagination (`nextCursor`), which points to a **Postgres** database
- JWT auth (access + refresh), email/password plus Google sign-in, a separate admin login
- Stripe Checkout for subscriptions (`checkoutUrl` returned)
- Media uploads with signed URLs (timed / view-once images); verification photos
- Google avatars (`lh3.googleusercontent.com`)

## 2. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nikha - The second chance</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
  </head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
```

## 3. Design system

**Fonts** (Google Fonts): **Playfair Display** (headings, 400/600/700, italic) and **DM Sans** (body/UI, 300–700).

**Palette** (by frequency of use in the code):

| Token | Hex | Use |
|---|---|---|
| navy | `#1B3A4B` | Primary text, headings, dark overlays `rgba(27,58,75,.45–.5)` |
| green | `#2D6A4F` | Primary brand / buttons |
| mint | `#74C69D` | Accents, borders `rgba(116,198,157,.2)` |
| greenLight | `#40916C` | Secondary green, "yes" checks |
| paleBg2 | `#F0FAF4` | Light surfaces |
| border | `#D4EDDA` | Borders |
| borderLight | `#E8F5EE` | Card borders |
| sage | `#3D6B55` | Muted green text |
| mintLight | `#B7E4C7` | Soft fills |
| paleBg | `#F8FAF5` | Page background |
| danger | `#C0392B` (bg `#fff5f5`, border `#f5c6c6`) | Errors |
| green2 | `#52B788`, `#9DC4B0` | Extra accents |
| online | `#22C55E` | Online dot |
| gold | `#9A6B00` / `rgba(212,160,23,.15)` | Premium badge |
| textMuted | `#5C7A6D` | Muted text (admin) |

Admin theme object (verbatim): `{ navy:#1B3A4B, green:#2D6A4F, greenLight:#40916C, mint:#74C69D, paleBg:#F8FAF5, paleBg2:#F0FAF4, border:#D4EDDA, borderSoft:rgba(116,198,157,0.2), danger:#C0392B, dangerBg:#fff5f5, dangerBorder:#f5c6c6, gold:#9A6B00, goldBg:rgba(212,160,23,0.15), textMuted:#5C7A6D }`

Style signatures: glass cards (`rgba(255,255,255,.65)` + `backdrop-filter: blur(10px)`), rounded corners 10–20px, soft shadows `0 12px 40px rgba(27,58,75,.14)`, hover lift transitions of `.3–.4s ease`.

## 4. Routes and pages

| Route | Component | Guard | Notes |
|---|---|---|---|
| `/` | `HomePage` | public | Hero "Start Your New Beginning", "Give yourself a Second Chance", a live strip of online members (`GET /people?online=true…`), "Log In / Sign Up" |
| `/how-it-works` | `HowItWorksPage` | public | "Your Journey to Love", membership plans table (`PlanFeatureCell` ✓/✗), checkout button |
| `/features` | `FeaturesPage` | public | "Built for Meaningful…", `FeatureCard`s, `WayDifferentSection` ("The Nikha2 Way") |
| `/success-stories` | `SuccessStoriesPage` | public | "Real Stories. Real Connections. Real Love.", `StoryCard`, `TestimonialCard` |
| `/safety` | `SafetyPage` | public | Safety tips page |
| `/login` | `LoginPage` | public | "Welcome Back", email + password, Google button, "Forgot Password?" |
| `/signup` | `SignupPage` | public | 2-step form (below), Terms modal, Google sign-up |
| `/explore` | `ExplorePage` | public (actions need login) | Browse/filter people, AI match, profile modal, start a chat |
| `/complete-profile` | `CompleteProfilePage` | `RequireAuth` | Forced after Google signup when `profileComplete` is false |
| `/account` | `AccountPage` | `RequireAuth` | Profile, photo, verification, contact privacy, password, membership, delete account |
| `/messaging` | `MessagingPage` | `RequireAuth` | Conversations, groups, chat, images, timed images, calls. `?conversation=<id>` opens one |
| `/admin/login` | `AdminLoginPage` | public | "Nikha2 Admin": Google sign-in **plus** an admin password |
| `/admin/*` | `AdminLayout` | `RequireAdmin` | Children: index → `AdminDashboard`, `users` → `AdminUsersPage`, `users/:id` → `AdminUserDetail`, `verifications`, `reports`, `billing`, `audit-log` |

App shell (`App`):
```jsx
<AuthProvider>
  <CallProvider>
    <ScrollToTop />
    <ProfileCompletionGate />   {/* redirects logged-in users with profileComplete=false to /complete-profile */}
    <Routes>…</Routes>
    <CallOverlay />             {/* incoming/outgoing/active call UI, global */}
  </CallProvider>
</AuthProvider>
```
- `RequireAuth`: not logged in → `/login`; profile incomplete → `/complete-profile`.
- `RequireAdmin`: not admin → `/admin/login`.
- `Navbar`: logo "The Second Chance", links **How It Works · Features · Explore · Messages**, then "Sign In" / "Join Free" or "My Account".
- Global widgets: `SupportChatWidget` ("Nikha2 Support · Online now · Chat with us 💚"), `OnlineNowPanel`, `Toast`, `Footer` ("Because everyone deserves a second chance at happiness."; Terms · Privacy · Cookies).

### Signup (`SignupPage`): 2 steps
Step 1: Full Name, Email, Password (show/hide), Google button.
Step 2: Gender, Username (live availability check, "This is permanent and can't be changed."), Nationality (country), Location (State/Region via countriesnow), Religion, Phone (country code default `+91`), Has Kids, Age Range, **Accept Terms** (required).
Validation messages: "Please accept the Terms and Conditions to proceed", "Please complete all fields", "Please choose a different, available username." On success → `/explore`.

### Option lists (verbatim)
- **Gender**: `man` (Male) · `woman` (Female) · `other` · `prefer_not_to_say`. "Seeking" is derived: man→Woman, woman→Man, else Anyone. Emoji: woman 👩, man 🧔, other 🧑
- **Religion**: Muslim, Hindu, Christian, Sikh, Buddhist, Jain, Jewish, Other, Prefer not to say
- **Age range**: 18-25, 26-35, 36-45, 46-55, 56-65, 65+ (the Explore filter uses the first four)
- **Has kids**: Yes, No, Prefer not to say
- **Featured countries**: UAE, Qatar, Egypt, Oman, Saudi Arabia, Bangladesh, followed by an A–Z country list
- **Contact visibility**: `hidden` (Hidden / Private) · `premium_only` (Premium members only) · `everyone`
- **Report reasons**: harassment, fake_profile, inappropriate_content, spam, safety_concern, other
- **Report statuses**: open, reviewed, dismissed, actioned
- **Suspend durations**: 24h, 7d, 30d
- **Admin user filters**: verification none/pending/verified · blocked · provider google/local · online · plan free/basic/premium

### Plans (from live `GET /subscriptions/plans`)
| id | Name | Price | Features |
|---|---|---|---|
| `free` | Free | $0 | Unlimited Explore; text messaging up to **3 new contacts per calendar month**; no calls; view/receive photos; no username/phone search; no badge |
| `basic` | Basic | **$30/month** | Unlimited messaging; voice/video **2 calls per contact, resets monthly**; no AI match; "Basic" badge |
| `premium` | Premium | **$100/month** | Unlimited messaging and calls; **AI-Based Match**; send view-once photos; see any user's ID and phone (subject to their privacy); "Premium" badge |

Error code `CHAT_LIMIT_REACHED` → "You've reached your Free plan's conversation limit. Upgrade to Basic or Premium for unlimited conversations."

---

## 5. API client (frontend), exact behaviour

- `API_BASE = https://nikah2-backend.onrender.com/api` (move this to `VITE_API_URL`)
- Tokens are stored in `localStorage["nikha2_tokens"] = { accessToken, refreshToken }`
- Every request sends `Authorization: Bearer <accessToken>` and JSON (or `FormData` for uploads)
- **Success envelope**: `{ data: … }` → returns `data`. A `204` returns `null`
- **Error envelope**: `{ error: { code, message, details } }` → throws `ApiError(status, code, message, details)`
- On a `401` with `code === "TOKEN_EXPIRED"`: one shared `POST /auth/refresh { refreshToken }` → store the new tokens, then retry once
- Methods: `get`, `post`, `patch`, `delete`, `upload` (multipart)

`AuthProvider` exposes `{ user, loading, isAuthenticated, signup, login, loginWithGoogle, loginAdminWithGoogle, logout, deleteAccount, refreshUser }`. `user` comes from `GET /me`. Auth responses carry `auth` (the tokens).

## 6. Backend REST API contract (base `/api`)

Every response uses the envelope above. `🔒` = needs a Bearer token, `🛡` = admin only.

### Health and plans
| Method | Path | Notes |
|---|---|---|
| GET | `/health` | `{ status, timestamp }` |
| GET | `/subscriptions/plans` | `{ items: [{ id, name, priceCents, currency:"USD", period:"month"\|null, features:[string] }] }` |

### Auth
| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/auth/signup` | `{ name, email, password, gender, username, nationality, location?, religion, phoneNumber, countryCode, hasKids, ageRange, acceptTerms }` | `{ auth: { accessToken, refreshToken } }` |
| POST | `/auth/login` | `{ email, password }` | `{ auth }` |
| POST | `/auth/google` | `{ idToken }` | `{ auth, … }` (new users then go to `/complete-profile`) |
| POST | `/auth/refresh` | `{ refreshToken }` | `{ accessToken, refreshToken }` |
| POST | `/auth/logout` 🔒 | `{ refreshToken }` | — |
| GET | `/auth/check-username/:username` | — | `{ available, reason?: "invalid_format"\|"taken" }` |
| POST | `/admin/auth/login` | `{ idToken, password }` | `{ auth }` |

### Me
| Method | Path | Body |
|---|---|---|
| GET | `/me` 🔒 | Returns the user: `id, name, email, username, phoneNumber, countryCode, hasPassword, role, plan/membership, verificationStatus, profileComplete, profile{ gender, nationality, religion, ageRange, hasKids, location, bio, hobbies[], avatarUrl, contactVisibility }` |
| PATCH | `/me` 🔒 | `{ name?, email?, phoneNumber?, countryCode?, username? }` (username can be set only once) |
| PATCH | `/me/profile` 🔒 | any of `{ gender, nationality, religion, ageRange, hasKids, location, bio, hobbies, avatarUrl, contactVisibility }` |
| POST | `/me/password` 🔒 | `{ currentPassword?, newPassword }` (`currentPassword` only if `hasPassword`) |
| DELETE | `/me` 🔒 | Deletes the account |
| POST | `/me/verification/request` 🔒 | multipart: verification photo(s) |
| POST | `/media/upload` 🔒 | multipart `file` → `{ mediaId, mediaUrl }` |

### People
| Method | Path | Notes |
|---|---|---|
| GET | `/people?q=&online=&verified=&gender=&religion=&ageRange=&nationality=&cursor=&limit=` | Public. `{ items: Person[], nextCursor }` |
| GET | `/people/:id` | Full profile |
| GET | `/people/ai-match` 🔒 | Premium only. `{ items }` |
| POST | `/users/:id/block` 🔒 | `{}` |
| POST | `/reports` 🔒 | `{ targetType: "user"\|"message"…, targetId, reason, details? }` |

`Person` (live shape): `{ id(uuid), displayName, age, gender, city, location, nationality, religion, hasKids, avatarUrl, verified, onlineStatus, plan, contact: { username, email, phoneNumber, isPrivate } }`. Profile modal also shows `bio` and `hobbies`.

### Messaging
| Method | Path | Body / notes |
|---|---|---|
| GET | `/messaging/conversations/summary` 🔒 | List of conversations (1:1 + groups), with `lastMessage`, unread count, `other` user / group info, `isGroup` |
| POST | `/messaging/conversations` 🔒 | `{ targetUserId }` → `{ conversationId }` (enforces the Free plan limit) |
| GET | `/messaging/conversations/:id/messages?limit=50` 🔒 | Messages |
| POST | `/messaging/conversations/:id/messages` 🔒 | `{ type:"text", text }` · `{ type:"image", mediaId }` · `{ type:"timed_image", mediaId, durationSeconds, noScreenshot }` → `{ message }` |
| PATCH | `/messaging/conversations/:id/read` 🔒 | `{ messageIds: [] }` |
| GET/PATCH | `/messaging/conversations/:id/settings` 🔒 | `{ ignoreCalls, ignoreVideoCalls, readReceipts, blocked }` (PATCH one key at a time) |
| POST | `/messaging/conversations/:id/unmatch` 🔒 | "Unmatch? They won't be able to contact you again." |
| POST | `/media/timed-images/:id/view` 🔒 | `{ signedUrl, durationSecondsRemaining }`. Client counts down, then shows "expired" |

Message types: `text`, `image`, `timed_image`, `call` (call log entries). Screenshot guard: on PrintScreen or when the tab is hidden, a `noScreenshot` image is blurred.

### Groups
`POST /groups { name, memberIds[] }` · `GET /groups/:id` · `PATCH /groups/:id { name }` · `DELETE /groups/:id` · `POST /groups/:id/members { userId }` · `DELETE /groups/:id/members/:userId`

### Calls (WebRTC)
`GET /calls/ice-servers` 🔒 · `POST /calls/sessions { conversationId, type: "voice"|"video" }` → `{ sessionId, calleeOnline, … }` · `POST /calls/sessions/:id/join` · `POST /calls/sessions/:id/leave` · `POST /calls/sessions/:id/end`
Plan rules: Free has no calls, Basic gets 2 per contact per month, Premium is unlimited. Each conversation's settings can ignore calls or video calls.

### Subscriptions
`POST /subscriptions/checkout { plan: "basic"|"premium" }` → `{ checkoutUrl }` (Stripe), or upgrades directly and the user goes to `/explore`.

### Admin 🛡
| Method | Path | Body |
|---|---|---|
| GET | `/admin/analytics` | Dashboard stats |
| GET | `/admin/users?…filters` | Paginated users (filters in section 4) |
| GET | `/admin/users/flagged?limit=100` | Flagged accounts with `reasons` |
| POST | `/admin/users/bulk` | `{ ids[], action: "block"\|"unblock"\|"verify"\|"reject_verification"\|"delete" }` |
| GET/DELETE | `/admin/users/:id` | Detail / delete |
| PATCH | `/admin/users/:id/profile` | Admin correction of profile fields |
| PATCH | `/admin/users/:id/block` | `{ blocked }` |
| POST/DELETE | `/admin/users/:id/suspend` | `{ duration: "24h"\|"7d"\|"30d", reason }` (reason required) / lift |
| POST | `/admin/users/:id/verification` | `{ decision: "approve"\|"reject" }` |
| GET | `/admin/users/:id/calls` | Call history |
| GET | `/admin/verifications?limit=50` | Pending requests. Photo at `GET /admin/verifications/:mediaId/photo` (fetched with the Bearer token) |
| GET/PATCH | `/admin/reports?…` / `/admin/reports/:id` | `{ status }`. `GET /admin/reports/:id/context` shows the reported content |
| GET | `/admin/audit-log?page=&limit=` | "Every admin action — who did what, to whom, and when." |
| GET | `/admin/subscriptions`, `/admin/payments?limit=30` | Billing page |

Admin pages also have **Export CSV** on users and reports.

## 7. Socket.IO events

Connection: `io(<API origin>, { path: "/socket.io", auth: { token: accessToken } })`. Disconnect on logout.

| Direction | Event | Payload (observed) |
|---|---|---|
| server→client | `message:new` | `{ conversationId, message }` (client then PATCHes `/read`) |
| client→server | `typing:start` / `typing:stop` | `{ conversationId, targetUserId }` (1:1 only) |
| server→client | `typing:update` | `{ conversationId, isTyping }` |
| server→client | `call:incoming` | `{ sessionId, conversationId, type: "voice"\|"video" }`. Client replies `call:reject {reason:"busy"}` if already on a call |
| both | `call:offer` / `call:answer` | `{ sessionId, sdp: { type, sdp } }` |
| both | `call:ice-candidate` | `{ sessionId, candidate }` |
| client→server | `call:reject` | `{ sessionId, reason: "busy"\|"no-answer"\|"no-media-permission"\|"error" }` |
| server→client | `call:rejected`, `call:ended` | `{ sessionId, reason? }` |
| server→client | `call:group-incoming`, `call:group-participant-joined`, `call:group-participant-left` | group session events |
| both | `call:group-offer` / `call:group-answer` / `call:group-ice-candidate` | `{ sessionId, targetUserId, sdp \| candidate }` (mesh WebRTC) |

Call UI (`CallOverlay` / `CallScreen`): ringing, "They may not be online right now — this might not reach them.", mute/camera/speaker toggles, audio output device picker (`setSinkId`), video tiles, ringtone via `AudioContext`.

## 8. Data model (for the new backend, Postgres)

- **users**: id uuid, name, email unique, password_hash null, google_id null, provider (`local`\|`google`), username unique (set once), phone_number, country_code, role (`user`\|`admin`), plan (`free`\|`basic`\|`premium`), plan_renews_at, verification_status (`none`\|`pending`\|`verified`), blocked bool, suspended_until, suspend_reason, profile_complete bool, online_status, last_seen_at, created_at
- **profiles**: user_id, gender, nationality, religion, age_range, has_kids, location, city, bio, hobbies text[], avatar_url, contact_visibility (`hidden`\|`premium_only`\|`everyone`)
- **refresh_tokens**: id, user_id, token_hash, expires_at, revoked_at
- **conversations**: id, is_group, name, created_by, created_at · **conversation_members**: conversation_id, user_id, role, last_read_at, settings jsonb (`ignoreCalls`, `ignoreVideoCalls`, `readReceipts`, `blocked`), unmatched_at
- **messages**: id, conversation_id, sender_id, type (`text`\|`image`\|`timed_image`\|`call`), text, media_id, duration_seconds, no_screenshot, created_at · **message_reads**
- **media**: id, owner_id, storage_key, mime, kind, created_at · **timed_image_views**: media_id, viewer_id, first_viewed_at
- **blocks**: blocker_id, blocked_id · **reports**: id, reporter_id, target_type, target_id, reason, details, status, created_at
- **verification_requests**: id, user_id, media_ids[], status, reviewed_by, reviewed_at
- **call_sessions**: id, conversation_id, caller_id, is_video, is_group, status, started_at, ended_at · **call_participants**
- **subscriptions** / **payments**: Stripe customer/subscription ids, plan, status, amount_cents, provider, created_at
- **monthly_usage**: user_id, month, new_contacts_count; per-contact call counts
- **audit_log**: id, admin_id, action, target_user_id, details jsonb, created_at

## 9. Environment variables (new project)

Frontend: `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID` (old value: `420155966557-ku317ls22tq2cgnh28uidj4q1gcsgqe5.apps.googleusercontent.com`. You'll need access to that Google Cloud project, or create a new client ID)

Backend: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `GOOGLE_CLIENT_ID`, `ADMIN_PASSWORD` (or admin emails list), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_BASIC`, `STRIPE_PRICE_PREMIUM`, `FRONTEND_URL`, storage (S3/R2/Cloudinary) keys, TURN server credentials for ICE.

## 10. Rebuild plan

1. **Frontend**: a Vite + React 19 project. Split `app.recovered.jsx` into `src/` modules (api, auth, socket, calls, pages/, components/, admin/). Keep markup and styles 1:1 so the UI matches production pixel-for-pixel. Point it at the **still-running old backend** first; that proves the rebuild against real data.
2. **Backend**: Node + Express + Socket.IO + Postgres, implementing section 6 and section 7 exactly, so the rebuilt frontend works unchanged.
3. **Data**: the old database belongs to the Render account you lost. If you regain access, export it (`pg_dump`) and import it into the new backend. Otherwise the new backend starts empty.
4. Deploy both apps (Render, Vercel, etc.) under accounts you control, with the code in your GitHub repo.
