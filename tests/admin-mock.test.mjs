import test from "node:test";
import assert from "node:assert/strict";
import { mockAdminApi, resetMockDb } from "../src/admin/data/mockAdminApi.js";

test.beforeEach(() => resetMockDb());

test("analytics returns every dashboard counter", async () => {
  const a = await mockAdminApi.get("/admin/analytics");
  for (const k of ["totalUsers", "verifiedUsers", "activePremiumUsers", "totalConversations", "totalMessages", "messagesLast7Days"]) {
    assert.equal(typeof a[k], "number", k);
  }
});

test("users list pages, filters and searches", async () => {
  const all = await mockAdminApi.get("/admin/users?page=1&limit=10");
  assert.equal(all.items.length, 10);
  assert.ok(all.total > 10);
  const u = all.items[0];
  for (const k of ["id", "accountNumber", "name", "email", "verificationStatus", "plan", "createdAt"]) assert.ok(k in u, k);
  assert.equal(typeof u.blockedGlobal, "boolean");

  const pending = await mockAdminApi.get("/admin/users?verificationStatus=pending&limit=100");
  assert.ok(pending.items.length > 0);
  assert.ok(pending.items.every((x) => x.verificationStatus === "pending"));

  const q = await mockAdminApi.get(`/admin/users?q=${encodeURIComponent(u.name.split(" ")[0])}&limit=100`);
  assert.ok(q.items.some((x) => x.id === u.id));
});

test("block, suspend, verify and delete change the data", async () => {
  const { items } = await mockAdminApi.get("/admin/users?limit=1");
  const id = items[0].id;
  await mockAdminApi.patch(`/admin/users/${id}/block`, { blocked: true });
  assert.equal((await mockAdminApi.get(`/admin/users/${id}`)).blockedGlobal, true);

  await mockAdminApi.post(`/admin/users/${id}/suspend`, { duration: "7d", reason: "Spam" });
  const s = await mockAdminApi.get(`/admin/users/${id}`);
  assert.ok(s.suspendedUntil);
  assert.equal(s.suspensionReason, "Spam");
  await mockAdminApi.delete(`/admin/users/${id}/suspend`);
  assert.equal((await mockAdminApi.get(`/admin/users/${id}`)).suspendedUntil, null);

  await mockAdminApi.post(`/admin/users/${id}/verification`, { decision: "approve" });
  assert.equal((await mockAdminApi.get(`/admin/users/${id}`)).verificationStatus, "verified");

  await mockAdminApi.delete(`/admin/users/${id}`);
  await assert.rejects(() => mockAdminApi.get(`/admin/users/${id}`), (e) => e.status === 404);
});

test("every admin action is written to the audit log", async () => {
  const before = (await mockAdminApi.get("/admin/audit-log?page=1&limit=50")).total;
  const { items } = await mockAdminApi.get("/admin/users?limit=2");
  await mockAdminApi.post("/admin/users/bulk", { ids: items.map((x) => x.id), action: "block" });
  const after = await mockAdminApi.get("/admin/audit-log?page=1&limit=50");
  assert.equal(after.total, before + 1);
  assert.equal(after.items[0].action, "users.bulk.block");
});

test("user detail has profile, membership and call history", async () => {
  const { items } = await mockAdminApi.get("/admin/users?limit=1");
  const d = await mockAdminApi.get(`/admin/users/${items[0].id}`);
  for (const k of ["gender", "ageRange", "nationality", "religion", "hasKids", "location", "city", "bio"]) assert.ok(k in d.profile, k);
  assert.ok(d.membership.plan);
  const calls = await mockAdminApi.get(`/admin/users/${items[0].id}/calls`);
  assert.ok(Array.isArray(calls.items));
  await mockAdminApi.patch(`/admin/users/${items[0].id}/profile`, { city: "Hyderabad" });
  assert.equal((await mockAdminApi.get(`/admin/users/${items[0].id}`)).profile.city, "Hyderabad");
});

test("verifications, flagged users, reports and context", async () => {
  const v = await mockAdminApi.get("/admin/verifications?limit=50");
  assert.ok(v.items.length > 0 && v.items[0].mediaIds.length > 0);
  assert.match(await mockAdminApi.loadPhoto(v.items[0].mediaIds[0]), /^data:image\/svg\+xml/);

  const f = await mockAdminApi.get("/admin/users/flagged?limit=100");
  assert.ok(f.items.length > 0 && Array.isArray(f.items[0].reasons));

  const r = await mockAdminApi.get("/admin/reports?page=1&limit=20&status=open");
  assert.ok(r.items.length > 0 && r.items.every((x) => x.status === "open"));
  const ctx = await mockAdminApi.get(`/admin/reports/${r.items[0].id}/context`);
  assert.equal(ctx.found, true);
  await mockAdminApi.patch(`/admin/reports/${r.items[0].id}`, { status: "actioned" });
  const open = await mockAdminApi.get("/admin/reports?page=1&limit=100&status=open");
  assert.ok(!open.items.some((x) => x.id === r.items[0].id));
});

test("billing: plan counts and payments", async () => {
  const s = await mockAdminApi.get("/admin/subscriptions");
  assert.equal(typeof s.byPlan.premium, "number");
  const p = await mockAdminApi.get("/admin/payments?limit=30");
  assert.ok(p.items.length > 0 && p.items[0].user.email && p.items[0].amountCents > 0);
});

test("unknown endpoints fail like a real server", async () => {
  await assert.rejects(() => mockAdminApi.get("/admin/nope"), (e) => e.status === 404);
});
