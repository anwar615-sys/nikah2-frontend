import test from "node:test";
import assert from "node:assert/strict";

// In-memory localStorage for Node.
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};

const { getConsent, setConsent, canStore, CONSENT_VERSION, CONSENT_KEY, PREFERENCE_KEYS } = await import("../src/lib/consent.js");

test.beforeEach(() => mem.clear());

test("no choice yet: nothing optional may be stored", () => {
  assert.equal(getConsent(), null);
  assert.equal(canStore("preferences"), false);
  assert.equal(canStore("analytics"), false);
});

test("essential only refuses preferences and clears any saved ones", () => {
  localStorage.setItem("nikha2-theme", "dark");
  localStorage.setItem("nikha2-motion", "off");
  setConsent("essential");
  assert.equal(canStore("preferences"), false);
  assert.equal(localStorage.getItem("nikha2-theme"), null);
  assert.equal(localStorage.getItem("nikha2-motion"), null);
});

test("accept all allows preferences and analytics", () => {
  setConsent("all");
  assert.equal(canStore("preferences"), true);
  assert.equal(canStore("analytics"), true);
});

test("custom choice stores exactly what was picked", () => {
  setConsent("custom", { preferences: true, analytics: false });
  assert.equal(canStore("preferences"), true);
  assert.equal(canStore("analytics"), false);
});

test("the stored choice has the agreed shape", () => {
  setConsent("custom", { preferences: true });
  const c = JSON.parse(localStorage.getItem(CONSENT_KEY));
  assert.equal(CONSENT_KEY, "nikha2-consent");
  assert.deepEqual(Object.keys(c).sort(), ["analytics", "at", "choice", "preferences", "version"]);
  assert.equal(c.version, "2026-10-beta-1");
  assert.ok(!Number.isNaN(Date.parse(c.at)));
});

test("a choice made under an older policy version counts as no choice", () => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: "old", choice: "all", preferences: true, analytics: true, at: new Date().toISOString() }));
  assert.equal(getConsent(), null);
  assert.equal(canStore("preferences"), false);
  assert.equal(CONSENT_VERSION, "2026-10-beta-1");
});

test("a damaged stored value counts as no choice", () => {
  localStorage.setItem(CONSENT_KEY, "{not json");
  assert.equal(getConsent(), null);
});

test("preference keys cover theme, motion and the paused hero", () => {
  assert.deepEqual([...PREFERENCE_KEYS].sort(), ["nikha2-hero-paused", "nikha2-motion", "nikha2-theme"]);
});
