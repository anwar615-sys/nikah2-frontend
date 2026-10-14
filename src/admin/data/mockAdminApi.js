// Sample-data backend for the admin dashboard (preview mode only).
//
// It answers the same requests, with the same response shapes, as the real
// admin API (BLUEPRINT.md section 6, "Admin"), but from an in-memory dataset.
// Nothing here makes a network request. Data resets when the page reloads.
//
// This file is only reachable when ADMIN_PREVIEW is true, which can only
// happen in `npm run dev` (see ./preview.js). Production builds drop it.

const LATENCY_MS = 120;

const FIRST = ["Aisha", "Fatima", "Zainab", "Mariam", "Sana", "Noor", "Hina", "Amina", "Sara", "Rukhsar",
  "Imran", "Faisal", "Ayaan", "Bilal", "Hamza", "Omar", "Yusuf", "Arif", "Kabir", "Rehan",
  "Priya", "Anjali", "Rahul", "Vikram", "Meera", "Joseph", "Grace", "Harpreet", "Simran", "Daniel"];
const LAST = ["Khan", "Shaikh", "Siddiqui", "Ansari", "Qureshi", "Syed", "Mirza", "Patel", "Reddy", "Sharma",
  "Iyer", "Thomas", "Singh", "Kapoor", "Ali", "Hussain", "Rahman", "Malik", "Chaudhary", "Fernandes"];
const CITIES = [["India", "Telangana", "Hyderabad"], ["India", "Maharashtra", "Mumbai"], ["India", "Karnataka", "Bengaluru"],
  ["India", "Delhi", "New Delhi"], ["India", "Uttar Pradesh", "Lucknow"], ["United Arab Emirates", "Dubai", "Dubai"],
  ["Qatar", "Doha", "Doha"], ["Saudi Arabia", "Riyadh", "Riyadh"], ["Oman", "Muscat", "Muscat"], ["Bangladesh", "Dhaka", "Dhaka"],
  ["United Kingdom", "England", "London"]];
const RELIGIONS = ["Muslim", "Muslim", "Muslim", "Hindu", "Christian", "Sikh", "Prefer not to say"];
const AGES = ["26-35", "26-35", "36-45", "36-45", "46-55", "18-25", "56-65"];
const KIDS = ["Yes", "No", "No", "Prefer not to say"];
const BIOS = [
  "Divorced, looking for a kind and patient partner to start again with.",
  "Widowed two years ago. Family-oriented and calm; I value honesty above all.",
  "Single parent of one, working in healthcare. Seeking someone who loves children.",
  "Teacher who enjoys reading and travel. Ready for a second chance at companionship.",
  "Software engineer, practising faith, looking for a respectful and caring spouse.",
];
const REPORT_REASONS = ["harassment", "fake_profile", "inappropriate_content", "spam", "safety_concern", "other"];
const FLAG_REASONS = ["many_reports", "duplicate_photos", "rapid_messaging", "new_account_mass_contacts"];
const DAY = 86400000;

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seed() {
  const r = rng(20261013);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const now = Date.now();
  const users = [];
  for (let i = 0; i < 36; i++) {
    const first = FIRST[i % FIRST.length], last = pick(LAST);
    const woman = i < 10 || (i >= 20 && i < 22) || i === 24 || i === 26 || i === 27 || i === 28;
    const [nationality, location, city] = pick(CITIES);
    const plan = r() < 0.55 ? "free" : r() < 0.6 ? "basic" : "premium";
    const v = r();
    const google = r() < 0.4;
    users.push({
      id: `u-${String(i + 1).padStart(3, "0")}`,
      accountNumber: `NK2-${10001 + i}`,
      name: `${first} ${last}`,
      username: r() < 0.85 ? `${first}.${last}${i}`.toLowerCase() : null,
      email: `${first}.${last}${i}@example.com`.toLowerCase(),
      phoneNumber: `+91 9${String(Math.floor(r() * 1e9)).padStart(9, "0")}`,
      role: "user",
      oauthProvider: google ? "google" : null,
      signupMethod: google ? "google" : "local",
      verificationStatus: v < 0.45 ? "verified" : v < 0.7 ? "pending" : "none",
      blockedGlobal: r() < 0.08,
      suspendedUntil: null,
      suspensionReason: null,
      online: r() < 0.3,
      plan,
      membership: { plan, status: plan === "free" ? "none" : "active" },
      createdAt: new Date(now - Math.floor(r() * 150) * DAY - Math.floor(r() * DAY)).toISOString(),
      profile: {
        gender: woman ? "woman" : "man",
        ageRange: pick(AGES),
        nationality, location, city,
        religion: pick(RELIGIONS),
        hasKids: pick(KIDS),
        bio: pick(BIOS),
      },
    });
  }
  users.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const calls = {};
  for (const u of users) {
    calls[u.id] = Array.from({ length: Math.floor(r() * 4) }, (_, k) => ({
      id: `c-${u.id}-${k}`,
      type: r() < 0.5 ? "video" : "voice",
      otherParticipants: [pick(users).name],
      durationSeconds: r() < 0.25 ? null : 30 + Math.floor(r() * 1500),
      createdAt: new Date(now - Math.floor(r() * 40) * DAY).toISOString(),
    }));
  }

  const reports = Array.from({ length: 14 }, (_, i) => {
    const reporter = pick(users), target = pick(users);
    const targetType = i % 3 === 0 ? "message" : i % 3 === 1 ? "user" : "conversation";
    return {
      id: `r-${100 + i}`,
      reporter: { id: reporter.id, displayName: reporter.name },
      targetType,
      targetId: targetType === "user" ? target.id : `${targetType}-${i}`,
      targetUserId: target.id,
      reason: pick(REPORT_REASONS),
      details: i % 2 ? "Kept messaging after I said I was not interested." : "",
      status: i < 8 ? "open" : pick(["reviewed", "dismissed", "actioned"]),
      createdAt: new Date(now - i * 2.3 * DAY).toISOString(),
    };
  });

  const payments = users.filter((u) => u.plan !== "free").flatMap((u, i) =>
    Array.from({ length: 1 + (i % 3) }, (_, k) => ({
      id: `p-${u.id}-${k}`,
      user: { id: u.id, name: u.name, email: u.email },
      plan: u.plan,
      amountCents: u.plan === "premium" ? 10000 : 3000,
      currency: "USD",
      status: r() < 0.9 ? "succeeded" : "failed",
      provider: u.profile.nationality === "India" ? "razorpay" : "stripe",
      createdAt: new Date(now - (k * 30 + Math.floor(r() * 25)) * DAY).toISOString(),
    })),
  ).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const flagged = users.slice(3, 8).map((u, i) => ({ userId: u.id, reasons: [FLAG_REASONS[i % 4], ...(i % 2 ? [] : [FLAG_REASONS[(i + 1) % 4]])] }));

  const audit = [
    ["user.verification.approve", users[1]],
    ["user.block", users[4]],
    ["report.status.dismissed", null],
    ["user.suspend", users[6]],
    ["user.profile.update", users[9]],
  ].map(([action, u], i) => ({
    id: `a-${i + 1}`,
    action,
    actorEmail: "admin@nikha2.com",
    targetType: u ? "user" : "report",
    targetId: u ? u.id : "r-109",
    details: action === "user.suspend" ? { duration: "7d", reason: "Spam messages" } : null,
    createdAt: new Date(now - (i + 1) * 0.8 * DAY).toISOString(),
  }));

  return { users, calls, reports, payments, flagged, audit, nextAudit: audit.length + 1 };
}

let db = null;
const getDb = () => (db ??= seed());

// Test helper: start again from the original sample data.
export function resetMockDb() {
  db = null;
}

function fail(status, code, message) {
  const e = new Error(message);
  e.status = status;
  e.code = code;
  return e;
}

function findUser(id) {
  const u = getDb().users.find((x) => x.id === id);
  if (!u) throw fail(404, "NOT_FOUND", "User not found.");
  return u;
}

function audit(action, targetType, targetId, details = null) {
  const d = getDb();
  d.audit.unshift({ id: `a-${d.nextAudit++}`, action, actorEmail: "preview-admin@nikha2.local", targetType, targetId, details, createdAt: new Date().toISOString() });
}

const listUser = (u) => ({
  id: u.id, accountNumber: u.accountNumber, name: u.name, username: u.username, email: u.email,
  verificationStatus: u.verificationStatus, blockedGlobal: u.blockedGlobal, plan: u.plan, createdAt: u.createdAt,
});

function paginate(items, q, defLimit = 20) {
  const limit = Math.max(1, Number(q.get("limit")) || defLimit);
  const page = Math.max(1, Number(q.get("page")) || 1);
  return { items: items.slice((page - 1) * limit, page * limit), total: items.length };
}

const SUSPEND = { "24h": DAY, "7d": 7 * DAY, "30d": 30 * DAY };

function route(method, path, body = {}) {
  const d = getDb();
  const [p, qs = ""] = path.split("?");
  const q = new URLSearchParams(qs);
  const seg = p.replace(/^\/+|\/+$/g, "").split("/"); // ["admin", ...]
  const key = `${method} /${seg.slice(1).map((s, i) => (i === 1 && seg[1] !== "auth" && !["bulk", "flagged"].includes(s) ? ":id" : s)).join("/")}`;
  const id = seg[2];

  switch (key) {
    case "GET /analytics": {
      const n = d.users.length;
      return {
        totalUsers: n,
        verifiedUsers: d.users.filter((u) => u.verificationStatus === "verified").length,
        activePremiumUsers: d.users.filter((u) => u.plan === "premium").length,
        totalConversations: n * 3 + 7,
        totalMessages: n * 128 + 54,
        messagesLast7Days: n * 19 + 3,
      };
    }
    case "GET /users": {
      const f = Object.fromEntries(q);
      const term = (f.q || "").toLowerCase();
      const items = d.users.filter((u) =>
        (!f.verificationStatus || u.verificationStatus === f.verificationStatus) &&
        (!f.blocked || String(u.blockedGlobal) === f.blocked) &&
        (!f.nationality || u.profile.nationality === f.nationality) &&
        (!f.religion || u.profile.religion === f.religion) &&
        (!f.gender || u.profile.gender === f.gender) &&
        (!f.city || u.profile.city.toLowerCase().includes(f.city.toLowerCase())) &&
        (!f.signupMethod || u.signupMethod === f.signupMethod) &&
        (!f.online || String(u.online) === f.online) &&
        (!f.plan || u.plan === f.plan) &&
        (!term || [u.name, u.email, u.username, u.accountNumber].some((v) => v && v.toLowerCase().includes(term))));
      return paginate(items.map(listUser), q);
    }
    case "GET /users/flagged":
      return { items: d.flagged.filter((f) => d.users.some((u) => u.id === f.userId)).map((f) => {
        const u = findUser(f.userId);
        return { id: u.id, name: u.name, email: u.email, reasons: f.reasons, createdAt: u.createdAt };
      }) };
    case "POST /users/bulk": {
      const { ids = [], action } = body;
      for (const uid of ids) {
        const u = d.users.find((x) => x.id === uid);
        if (!u) continue;
        if (action === "block") u.blockedGlobal = true;
        else if (action === "unblock") u.blockedGlobal = false;
        else if (action === "verify") u.verificationStatus = "verified";
        else if (action === "reject_verification") u.verificationStatus = "none";
        else if (action === "delete") d.users = d.users.filter((x) => x.id !== uid);
        else throw fail(400, "VALIDATION_FAILED", "Unknown bulk action.");
      }
      audit(`users.bulk.${action}`, "user", ids.join(","), { count: ids.length });
      return { updated: ids.length };
    }
    case "GET /users/:id":
      return structuredClone(findUser(id));
    case "DELETE /users/:id":
      findUser(id);
      d.users = d.users.filter((u) => u.id !== id);
      audit("user.delete", "user", id);
      return null;
    case "PATCH /users/:id/profile": {
      const u = findUser(id);
      Object.assign(u.profile, body);
      audit("user.profile.update", "user", id, body);
      return structuredClone(u);
    }
    case "PATCH /users/:id/block": {
      const u = findUser(id);
      u.blockedGlobal = !!body.blocked;
      audit(body.blocked ? "user.block" : "user.unblock", "user", id);
      return { blocked: u.blockedGlobal };
    }
    case "POST /users/:id/suspend": {
      const u = findUser(id);
      if (!body.reason) throw fail(400, "VALIDATION_FAILED", "A reason is required to suspend an account.");
      u.suspendedUntil = new Date(Date.now() + (SUSPEND[body.duration] || DAY)).toISOString();
      u.suspensionReason = body.reason;
      audit("user.suspend", "user", id, { duration: body.duration, reason: body.reason });
      return { suspendedUntil: u.suspendedUntil };
    }
    case "DELETE /users/:id/suspend": {
      const u = findUser(id);
      u.suspendedUntil = null;
      u.suspensionReason = null;
      audit("user.unsuspend", "user", id);
      return null;
    }
    case "POST /users/:id/verification": {
      const u = findUser(id);
      u.verificationStatus = body.decision === "approve" ? "verified" : "none";
      audit(`user.verification.${body.decision}`, "user", id);
      return { verificationStatus: u.verificationStatus };
    }
    case "GET /users/:id/calls":
      findUser(id);
      return { items: d.calls[id] || [] };
    case "GET /verifications":
      return { items: d.users.filter((u) => u.verificationStatus === "pending").slice(0, Number(q.get("limit")) || 50)
        .map((u) => ({ id: u.id, name: u.name, email: u.email, mediaIds: [`m-${u.id}-1`, `m-${u.id}-2`].slice(0, 1 + (u.id.charCodeAt(4) % 2)) })) };
    case "GET /reports": {
      const status = q.get("status");
      return paginate(d.reports.filter((r) => !status || r.status === status), q);
    }
    case "PATCH /reports/:id": {
      const r = d.reports.find((x) => x.id === id);
      if (!r) throw fail(404, "NOT_FOUND", "Report not found.");
      r.status = body.status;
      audit(`report.status.${body.status}`, "report", id);
      return r;
    }
    case "GET /reports/:id/context": {
      const r = d.reports.find((x) => x.id === id);
      if (!r) throw fail(404, "NOT_FOUND", "Report not found.");
      const target = d.users.find((u) => u.id === r.targetUserId);
      if (!target) return { found: false, targetType: r.targetType };
      const msg = (k, who, text, flagged = false) => ({ id: `${r.id}-m${k}`, senderName: who.name, type: "text", text, isFlagged: flagged,
        createdAt: new Date(Date.parse(r.createdAt) - (5 - k) * 3600000).toISOString() });
      const reporter = d.users.find((u) => u.id === r.reporter.id) || target;
      if (r.targetType === "user") return { found: true, targetType: "user", user: { name: target.name, email: target.email, verificationStatus: target.verificationStatus, profile: { bio: target.profile.bio } } };
      if (r.targetType === "message") return { found: true, targetType: "message", messages: [
        msg(1, target, "Hi, I saw your profile."), msg(2, reporter, "Thank you, but I don't think we're a match."),
        msg(3, target, "Why not? Send me your number now.", true)] };
      return { found: true, targetType: "conversation", members: [{ name: reporter.name }, { name: target.name }], recentMessages: [
        msg(1, target, "Are you there?"), msg(2, target, "Answer me."), msg(3, reporter, "Please stop messaging me.")] };
    }
    case "GET /audit-log":
      return paginate(d.audit, q, 50);
    case "GET /subscriptions": {
      const byPlan = { free: 0, basic: 0, premium: 0 };
      for (const u of d.users) byPlan[u.plan]++;
      return { stripeConfigured: true, byPlan };
    }
    case "GET /payments":
      return { items: d.payments.slice(0, Number(q.get("limit")) || 30) };
    default:
      throw fail(404, "NOT_FOUND", `Preview has no sample data for ${method} ${p}.`);
  }
}

function call(method, path, body) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try { resolve(route(method, path, body)); } catch (e) { reject(e); }
    }, LATENCY_MS));
}

function photoSvg(mediaId) {
  const hue = [...mediaId].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
<rect width="300" height="300" fill="hsl(${hue},35%,88%)"/><circle cx="150" cy="118" r="54" fill="hsl(${hue},30%,62%)"/>
<rect x="66" y="188" width="168" height="112" rx="84" fill="hsl(${hue},30%,62%)"/>
<text x="150" y="286" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#334">Sample photo</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const mockAdminApi = {
  get: (path) => call("GET", path),
  post: (path, body) => call("POST", path, body),
  patch: (path, body) => call("PATCH", path, body),
  delete: (path) => call("DELETE", path),
  upload: () => Promise.reject(fail(400, "PREVIEW", "Uploads are not available in preview mode.")),
  // Returns an image URL for a verification photo.
  loadPhoto: (mediaId) => new Promise((res) => setTimeout(() => res(photoSvg(mediaId)), LATENCY_MS)),
  releasePhoto: () => {},
};
