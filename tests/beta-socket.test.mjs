import test from "node:test";
import assert from "node:assert/strict";
import { createBetaSocket } from "../src/beta/socket.js";

// Minimal stand-in for supabase.channel(): keeps listeners so the test can fire events.
function fakeSupabase() {
  const channels = new Map();
  const sent = [];
  return {
    sent,
    channels,
    channel(name) {
      const ch = {
        name,
        listeners: [],
        on(type, filter, cb) {
          this.listeners.push({ type, filter, cb });
          return this;
        },
        subscribe(cb) {
          cb?.("SUBSCRIBED");
          return this;
        },
        send(msg) {
          sent.push({ channel: name, ...msg });
          return Promise.resolve("ok");
        },
        fire(type, payload) {
          for (const l of this.listeners) if (l.type === type) l.cb(payload);
        },
      };
      channels.set(name, ch);
      return ch;
    },
    removeChannel(ch) {
      channels.delete(ch.name);
      return Promise.resolve();
    },
  };
}

const row = (over = {}) => ({
  id: "m1",
  conversation_id: "c1",
  sender_id: "other",
  type: "text",
  text: "Salaam",
  media_path: null,
  duration_seconds: null,
  no_screenshot: false,
  created_at: "2026-10-18T10:00:00Z",
  ...over,
});

async function setup() {
  const sb = fakeSupabase();
  const events = [];
  const sock = await createBetaSocket({
    supabase: sb,
    meId: "me",
    conversationIds: ["c1"],
    dispatch: (ev, p) => events.push([ev, p]),
    mapMessages: async (ms) => ms,
  });
  return { sb, events, sock };
}

test("a new message from someone else becomes message:new in the frontend's shape", async () => {
  const { sb, events } = await setup();
  sb.channels.get("messages:me").fire("postgres_changes", { new: row() });
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(events.length, 1);
  const [ev, p] = events[0];
  assert.equal(ev, "message:new");
  assert.equal(p.conversationId, "c1");
  assert.deepEqual(
    { id: p.message.id, senderId: p.message.senderId, type: p.message.type, text: p.message.text, createdAt: p.message.createdAt },
    { id: "m1", senderId: "other", type: "text", text: "Salaam", createdAt: "2026-10-18T10:00:00Z" },
  );
});

test("the sender's own messages are not echoed back (no duplicates)", async () => {
  const { sb, events } = await setup();
  sb.channels.get("messages:me").fire("postgres_changes", { new: row({ sender_id: "me" }) });
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(events.length, 0);
});

test("photos and view-once photos carry the fields the chat needs", async () => {
  const { sb, events } = await setup();
  const ch = sb.channels.get("messages:me");
  ch.fire("postgres_changes", { new: row({ id: "m2", type: "image", text: null, media_path: "c1/p.jpg" }) });
  ch.fire("postgres_changes", { new: row({ id: "m3", type: "timed_image", text: null, media_path: "c1/timed/q.jpg", duration_seconds: 8, no_screenshot: true }) });
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(events[0][1].message.mediaPath, "c1/p.jpg");
  assert.deepEqual(events[1][1].message.timed, { durationSeconds: 8, noScreenshot: true });
  assert.ok(!("mediaPath" in events[1][1].message), "view-once photo path is never handed to the page");
});

test("typing goes to the conversation channel and arrives as typing:update", async () => {
  const { sb, events, sock } = await setup();
  sock.send("typing:start", { conversationId: "c1", targetUserId: "other" });
  assert.deepEqual(sb.sent.at(-1), { channel: "typing:c1", type: "broadcast", event: "typing", payload: { conversationId: "c1", from: "me", isTyping: true } });
  sb.channels.get("typing:c1").fire("broadcast", { payload: { conversationId: "c1", from: "other", isTyping: true } });
  sb.channels.get("typing:c1").fire("broadcast", { payload: { conversationId: "c1", from: "me", isTyping: true } });
  assert.deepEqual(events, [["typing:update", { conversationId: "c1", isTyping: true }]]);
});

test("call events are ignored and stop() leaves no channels open", async () => {
  const { sb, sock } = await setup();
  sock.send("call:reject", { sessionId: "x" });
  assert.equal(sb.sent.length, 0);
  await sock.stop();
  assert.equal(sb.channels.size, 0);
});
