import test from "node:test";
import assert from "node:assert/strict";
import { match } from "../src/beta/router.js";
import { betaRequest } from "../src/beta/index.js";
import { __setClient } from "../src/beta/client.js";
import { toApiError } from "../src/beta/errors.js";
import { ApiError } from "../src/lib/apiError.js";

// A small stand-in for the Supabase client: records calls, returns canned results.
function fakeClient({ rpc = {}, signUp, signIn } = {}) {
  const calls = [];
  return {
    calls,
    rpc: async (name, args) => {
      calls.push(["rpc", name, args]);
      const r = rpc[name];
      if (r instanceof Error) return { data: null, error: r };
      return { data: typeof r === "function" ? r(args) : r ?? null, error: null };
    },
    auth: {
      signUp: async (a) => (calls.push(["signUp", a]), signUp ?? { data: { session: null, user: { id: "u1" } }, error: null }),
      signInWithPassword: async (a) => (calls.push(["signIn", a]), signIn ?? { data: { session: { access_token: "a", refresh_token: "r" } }, error: null }),
      signOut: async () => (calls.push(["signOut"]), { error: null }),
      getSession: async () => ({ data: { session: { user: { id: "u1", email: "x@y.z" } } } }),
    },
    storage: { from: () => ({ createSignedUrls: async (paths) => ({ data: paths.map((p) => ({ path: p, signedUrl: "signed:" + p })), error: null }) }) },
  };
}

test("match extracts path params and query", () => {
  const m = match("GET", "/people/abc?x=1&online=true");
  assert.ok(m);
  assert.equal(m.params.id, "abc");
  assert.equal(m.query.x, "1");
  assert.equal(m.query.online, "true");
});

test("ai-match is not mistaken for a person id", () => {
  const m = match("GET", "/people/ai-match");
  assert.equal(m.params.id, undefined);
});

test("unknown routes reject with NOT_FOUND", async () => {
  __setClient(fakeClient());
  await assert.rejects(betaRequest("/nope", {}), (e) => e instanceof ApiError && e.code === "NOT_FOUND");
});

test("signup without a session (email confirmation on) rejects with CONFIRM_EMAIL_ON", async () => {
  __setClient(fakeClient());
  await assert.rejects(
    betaRequest("/auth/signup", { method: "POST", body: { email: "a@b.c", password: "longpassword", name: "A", acceptTerms: true } }),
    (e) => e.code === "CONFIRM_EMAIL_ON" && /email confirmation/i.test(e.message),
  );
});

test("signup sends profile fields and consent as metadata and returns tokens", async () => {
  const c = fakeClient({ signUp: { data: { session: { access_token: "a", refresh_token: "r" } }, error: null } });
  __setClient(c);
  const out = await betaRequest("/auth/signup", {
    method: "POST",
    body: { email: "a@b.c", password: "longpassword", name: "Aisha", username: "Aisha_1", gender: "woman", acceptTerms: true, sensitiveConsent: true },
  });
  assert.deepEqual(out.auth, { accessToken: "a", refreshToken: "r" });
  const meta = c.calls.find((x) => x[0] === "signUp")[1].options.data;
  assert.equal(meta.username, "aisha_1");
  assert.equal(meta.acceptTerms, "true");
  assert.equal(meta.sensitiveConsent, "true");
  assert.equal(meta.password, undefined);
});

test("signup without accepting the terms is refused before reaching Supabase", async () => {
  const c = fakeClient();
  __setClient(c);
  await assert.rejects(betaRequest("/auth/signup", { method: "POST", body: { email: "a@b.c", password: "x", acceptTerms: false } }), (e) => e.code === "VALIDATION_FAILED");
  assert.equal(c.calls.length, 0);
});

test("RPC error text maps to the ApiError code", () => {
  const e = toApiError({ message: "CHAT_LIMIT_REACHED: You've reached your Free plan's conversation limit.", code: "P0001" });
  assert.ok(e instanceof ApiError);
  assert.equal(e.code, "CHAT_LIMIT_REACHED");
  assert.equal(e.message, "You've reached your Free plan's conversation limit.");
});

test("permission errors map to FORBIDDEN and bad logins get a friendly message", () => {
  assert.equal(toApiError({ message: "permission denied for function _erase_user", code: "42501" }).code, "FORBIDDEN");
  const e = toApiError({ name: "AuthApiError", message: "Invalid login credentials", status: 400 });
  assert.equal(e.code, "INVALID_CREDENTIALS");
});

test("people search passes the query string to people_search", async () => {
  const c = fakeClient({ rpc: { people_search: { items: [] } } });
  __setClient(c);
  await betaRequest("/people?online=true&verified=false&limit=50&religion=Muslim", {});
  assert.deepEqual(c.calls[0], ["rpc", "people_search", { f: { online: "true", verified: "false", limit: "50", religion: "Muslim" } }]);
});

test("messages come back with signed photo links and no storage paths", async () => {
  const c = fakeClient({
    rpc: {
      messages_list: { items: [{ id: "m1", type: "image", mediaPath: "c1/p.jpg" }, { id: "m2", type: "text", text: "hi", mediaPath: null }] },
    },
  });
  __setClient(c);
  const out = await betaRequest("/messaging/conversations/c1/messages?limit=50", {});
  assert.equal(out.items[0].media.mediaUrl, "signed:c1/p.jpg");
  assert.ok(!("mediaPath" in out.items[0]));
  assert.ok(!("media" in out.items[1]));
  assert.deepEqual(c.calls[0], ["rpc", "messages_list", { conv: "c1", lim: 50 }]);
});

test("admin login signs a non-admin straight back out", async () => {
  const c = fakeClient({ rpc: { is_admin: false } });
  __setClient(c);
  await assert.rejects(betaRequest("/admin/auth/login", { method: "POST", body: { email: "a@b.c", password: "pw" } }), (e) => e.code === "FORBIDDEN");
  assert.ok(c.calls.some((x) => x[0] === "signOut"));
});

test("calls are unavailable in the beta", async () => {
  __setClient(fakeClient());
  await assert.rejects(betaRequest("/calls/ice-servers", {}), (e) => e.message === "Voice and video calls arrive after the beta.");
});
