// Cookie and storage consent.
//
// Nikha2 sets no cookies of its own and allows no tracking. It uses browser storage:
//   essential   – sign-in session and the consent choice itself (always on)
//   preferences – theme, animation setting, paused homepage animation
//   analytics   – none in use today (kept so the choice exists if it is ever added)
// The choice is stored with the policy version; a new version asks again.

export const CONSENT_KEY = "nikha2-consent";
export const CONSENT_VERSION = "2026-10-beta-1";
export const PREFERENCE_KEYS = ["nikha2-theme", "nikha2-motion", "nikha2-hero-paused"];
export const CONSENT_EVENT = "nikha2-consent-change";
export const OPEN_SETTINGS_EVENT = "nikha2-open-cookie-settings";

function store() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

export function getConsent() {
  try {
    const raw = store()?.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (!c || c.version !== CONSENT_VERSION) return null;
    return c;
  } catch {
    return null;
  }
}

export function setConsent(choice, { preferences = false, analytics = false } = {}) {
  const all = choice === "all";
  const custom = choice === "custom";
  const c = {
    version: CONSENT_VERSION,
    choice: all || custom ? choice : "essential",
    preferences: all || (custom && !!preferences),
    analytics: all || (custom && !!analytics),
    at: new Date().toISOString(),
  };
  const s = store();
  try {
    s?.setItem(CONSENT_KEY, JSON.stringify(c));
    if (!c.preferences) PREFERENCE_KEYS.forEach((k) => s?.removeItem(k));
  } catch {
    /* storage blocked: the choice applies for this visit only */
  }
  try {
    globalThis.dispatchEvent?.(new Event(CONSENT_EVENT));
  } catch {
    /* no window (tests) */
  }
  return c;
}

export function canStore(category) {
  const c = getConsent();
  return !!c && c[category] === true;
}

export function openCookieSettings() {
  globalThis.dispatchEvent?.(new Event(OPEN_SETTINGS_EVENT));
}
