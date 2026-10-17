import { route } from "../registry.js";
import { getSupabase, rpc } from "../client.js";
import { apiError } from "../errors.js";
import { currentSession, currentUserId, newPath, uploadImage, checkImage } from "../media.js";
import { TERMS_VERSION, CALLS_NOTE } from "../config.js";

const PROFILE_FIELDS = ["name", "gender", "nationality", "location", "religion", "phoneNumber", "countryCode", "hasKids", "ageRange"];

function tokens(session) {
  return { accessToken: session.access_token, refreshToken: session.refresh_token };
}

// Keeps "online now" accurate while the site is open.
let heartbeat = null;
function startHeartbeat() {
  if (heartbeat || typeof setInterval === "undefined") return;
  heartbeat = setInterval(() => rpc("touch").catch(() => {}), 60_000);
  heartbeat.unref?.();
}
function stopHeartbeat() {
  if (heartbeat) clearInterval(heartbeat);
  heartbeat = null;
}

async function signOutLocal() {
  stopHeartbeat();
  await getSupabase().auth.signOut({ scope: "local" }).catch(() => {});
}

async function signIn(email, password) {
  if (!email || !password) throw apiError("VALIDATION_FAILED", "Enter your email and password.");
  const { data, error } = await getSupabase().auth.signInWithPassword({ email: String(email).trim(), password });
  if (error) throw error;
  return data.session;
}

// ---- auth

route("POST", "/auth/signup", async ({ body = {} }) => {
  if (body.acceptTerms !== true) throw apiError("VALIDATION_FAILED", "Please accept the Terms and Privacy Policy to continue.");
  if (!body.email || !body.password) throw apiError("VALIDATION_FAILED", "Enter your email and a password.");
  const meta = {};
  for (const k of PROFILE_FIELDS) if (body[k] !== undefined && body[k] !== null && body[k] !== "") meta[k] = String(body[k]);
  if (body.username) meta.username = String(body.username).toLowerCase();
  meta.acceptTerms = "true";
  meta.sensitiveConsent = body.sensitiveConsent === true ? "true" : "false";
  meta.termsVersion = TERMS_VERSION;
  const { data, error } = await getSupabase().auth.signUp({
    email: String(body.email).trim(),
    password: body.password,
    options: { data: meta },
  });
  if (error) throw error;
  if (!data?.session)
    throw apiError("CONFIRM_EMAIL_ON", "Sign-up is temporarily unavailable (email confirmation pending setup).");
  startHeartbeat();
  return { auth: tokens(data.session) };
});

route("POST", "/auth/login", async ({ body = {} }) => {
  const session = await signIn(body.email, body.password);
  try {
    await rpc("me_get"); // blocked or suspended accounts are told why, and not left half signed in
  } catch (e) {
    await signOutLocal();
    throw e;
  }
  startHeartbeat();
  return { auth: tokens(session) };
});

route("POST", "/auth/google", async () => {
  throw apiError("VALIDATION_FAILED", "Google sign-in isn't available during the beta. Please use email and password.");
});

route("POST", "/auth/logout", async () => {
  await signOutLocal();
  return null;
});

route("GET", "/auth/check-username/:u", async ({ params }) => rpc("check_username", { u: params.u.toLowerCase() }));

route("POST", "/admin/auth/login", async ({ body = {} }) => {
  const session = await signIn(body.email, body.password);
  const isAdmin = await rpc("is_admin").catch(() => false);
  if (isAdmin !== true) {
    await signOutLocal();
    throw apiError("FORBIDDEN", "This account is not an admin.");
  }
  return { auth: tokens(session) };
});

// ---- me

route("GET", "/me", async () => {
  const [me] = await Promise.all([rpc("me_get"), rpc("touch").catch(() => {})]);
  startHeartbeat();
  return me;
});

route("PATCH", "/me", async ({ body = {} }) => rpc("me_update", { patch: body }));
route("PATCH", "/me/profile", async ({ body = {} }) => rpc("me_profile_update", { patch: body }));

// Removes everything stored under the member's own folder in a bucket.
async function removeOwnFiles(bucket, uid) {
  const store = getSupabase().storage.from(bucket);
  const { data } = await store.list(uid, { limit: 1000 });
  const paths = (data || []).filter((f) => f.name).map((f) => `${uid}/${f.name}`);
  if (paths.length) await store.remove(paths);
}

route("DELETE", "/me", async () => {
  const uid = await currentUserId();
  if (!uid) throw apiError("AUTH_REQUIRED", "Please log in again.");
  // Profile and verification photos go first; failures here must not block closing the account.
  await Promise.all([removeOwnFiles("avatars", uid), removeOwnFiles("verification", uid)]).catch(() => {});
  await rpc("me_delete");
  await signOutLocal();
  return null;
});

// "Download my data": the member's account, profile, consents, plan payments,
// reports they made and messages they sent, as one JSON document.
route("GET", "/me/export", async () => {
  const uid = await currentUserId();
  if (!uid) throw apiError("AUTH_REQUIRED", "Please log in again.");
  const sb = getSupabase();
  const pick = async (q) => {
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  };
  const [account, consents, payments, reports, messages] = await Promise.all([
    rpc("me_get"),
    pick(sb.from("consents").select("kind, version, created_at").eq("user_id", uid).order("created_at")),
    pick(sb.from("payments").select("plan, amount_cents, currency, status, provider, created_at").eq("user_id", uid).order("created_at")),
    pick(sb.from("reports").select("target_type, target_id, reason, details, status, created_at").eq("reporter_id", uid).order("created_at")),
    pick(
      sb
        .from("messages")
        .select("conversation_id, type, text, created_at")
        .eq("sender_id", uid)
        .order("created_at")
        .limit(10000),
    ),
  ]);
  return { exportedAt: new Date().toISOString(), account, consents, payments, reports, messagesSent: messages };
});

route("POST", "/me/password", async ({ body = {} }) => {
  const session = await currentSession();
  if (!session) throw apiError("AUTH_REQUIRED", "Please log in again.");
  if (!body.newPassword || String(body.newPassword).length < 8)
    throw apiError("VALIDATION_FAILED", "Use at least 8 characters for your new password.");
  if (!body.currentPassword) throw apiError("VALIDATION_FAILED", "Enter your current password.");
  const check = await getSupabase().auth.signInWithPassword({ email: session.user.email, password: body.currentPassword });
  if (check.error) throw apiError("VALIDATION_FAILED", "Current password is incorrect.");
  const { error } = await getSupabase().auth.updateUser({ password: body.newPassword });
  if (error) throw error;
  return null;
});

route("POST", "/me/verification/request", async ({ body }) => {
  const uid = await currentUserId();
  if (!uid) throw apiError("AUTH_REQUIRED", "Please log in again.");
  const photos = (body?.getAll?.("photos") || []).slice(0, 2);
  if (!photos.length) throw apiError("VALIDATION_FAILED", "Choose at least one photo first.");
  photos.forEach(checkImage);
  const paths = [];
  for (const f of photos) paths.push((await uploadImage("verification", newPath(uid, f), f)).path);
  return rpc("verification_request", { paths });
});

// ---- photos

route("POST", "/media/upload", async ({ body }) => {
  const uid = await currentUserId();
  if (!uid) throw apiError("AUTH_REQUIRED", "Please log in again.");
  const file = body?.get?.("file");
  const purpose = body?.get?.("purpose");
  if (purpose === "avatar") {
    const r = await uploadImage("avatars", newPath(uid, file), file);
    return { mediaId: r.path, mediaUrl: r.publicUrl };
  }
  if (purpose === "chat_image" || purpose === "timed_image") {
    const conv = body.get("conversationId");
    if (!conv || !/^[0-9a-f-]{36}$/i.test(conv)) throw apiError("VALIDATION_FAILED", "Open a conversation first.");
    const r = await uploadImage("chat-media", newPath(purpose === "timed_image" ? `${conv}/timed` : conv, file), file);
    return { mediaId: r.path };
  }
  throw apiError("VALIDATION_FAILED", "Unknown upload type.");
});

// ---- plans (beta checkout: no real payment is taken)

route("POST", "/subscriptions/checkout", async ({ body = {} }) =>
  rpc("beta_checkout", { plan: body.plan, outcome: body.outcome === "failed" ? "failed" : "success" }),
);

// ---- calls are not part of the beta

for (const [m, p] of [
  ["GET", "/calls/ice-servers"],
  ["POST", "/calls/sessions"],
  ["POST", "/calls/sessions/:id/join"],
  ["POST", "/calls/sessions/:id/leave"],
  ["POST", "/calls/sessions/:id/end"],
]) {
  route(m, p, async () => {
    throw apiError("FORBIDDEN", CALLS_NOTE);
  });
}
