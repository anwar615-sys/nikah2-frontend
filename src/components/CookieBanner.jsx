import * as React from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, OPEN_SETTINGS_EVENT } from "../lib/consent";

function Toggle({ id, label, desc, checked, onChange, disabled }) {
  return (
  <label
    htmlFor={id}
    style={{
      display: `flex`,
      gap: 12,
      alignItems: `flex-start`,
      padding: `10px 12px`,
      border: `1px solid var(--line)`,
      borderRadius: 12,
      background: `var(--bg)`,
      cursor: disabled ? `default` : `pointer`,
    }}
  >
    <input
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      style={{ marginTop: 3, width: 16, height: 16, accentColor: `var(--emerald-700)` }}
    />
    <span>
      <span style={{ display: `block`, fontWeight: 700, fontSize: 13, color: `var(--fg)` }}>{label}</span>
      <span style={{ display: `block`, fontSize: 12, color: `var(--muted)`, lineHeight: 1.5 }}>{desc}</span>
    </span>
  </label>
);
}

// Shown on the first visit (and again if the policy version changes) on every page.
// Choices: Accept all · Essential only · Customise (Preferences / Analytics toggles).
// "Cookie settings" in the footer and the Cookie Policy page reopen it.
function CookieBanner() {
  const [open, setOpen] = React.useState(() => getConsent() === null);
  const [custom, setCustom] = React.useState(false);
  const [prefs, setPrefs] = React.useState(() => !!getConsent()?.preferences);
  const [analytics, setAnalytics] = React.useState(() => !!getConsent()?.analytics);
  const panel = React.useRef(null);

  React.useEffect(() => {
    const reopen = () => {
      const c = getConsent();
      setPrefs(!!c?.preferences);
      setAnalytics(!!c?.analytics);
      setCustom(true);
      setOpen(true);
      setTimeout(() => panel.current?.querySelector("input, button")?.focus(), 0);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice, opts) => {
    setConsent(choice, opts);
    setOpen(false);
    setCustom(false);
  };

  const btn = {
    padding: `10px 18px`,
    borderRadius: 24,
    fontWeight: 700,
    fontSize: 13,
    cursor: `pointer`,
    fontFamily: `var(--font-ui)`,
  };
  const secondary = { ...btn, border: `1.5px solid var(--line)`, background: `var(--surface-2)`, color: `var(--fg)` };
  const link = { color: `var(--emerald-700)`, fontWeight: 700 };


  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      style={{
        position: `fixed`,
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 1000,
        maxWidth: 720,
        margin: `0 auto`,
        background: `var(--surface)`,
        color: `var(--fg)`,
        border: `1px solid var(--line)`,
        borderRadius: 18,
        boxShadow: `0 18px 50px color-mix(in srgb, var(--shadow) 25%, transparent)`,
        padding: `18px 20px`,
        fontFamily: `var(--font-ui)`,
        maxHeight: `calc(100vh - 24px)`,
        overflowY: `auto`,
      }}
    >
      <h2 id="cookie-banner-title" style={{ fontFamily: `var(--font-display)`, fontSize: 19, fontWeight: 700, margin: `0 0 6px` }}>
        Your privacy choices
      </h2>
      <p style={{ fontSize: 13, color: `var(--muted)`, lineHeight: 1.6, margin: `0 0 12px` }}>
        Nikha2 uses only the browser storage it needs to sign you in and to remember this choice. With your permission we
        also remember settings like light or dark theme. We don't use advertising or tracking cookies. Read our{" "}
        <Link to="/cookies" style={link}>
          Cookie Policy
        </Link>{" "}
        and{" "}
        <Link to="/privacy" style={link}>
          Privacy Policy
        </Link>
        .
      </p>
      {custom && (
        <div style={{ display: `grid`, gap: 8, margin: `0 0 14px` }}>
          <Toggle id="ck-essential" label="Essential (always on)" desc="Signing in and remembering this choice. The site can't work without these." checked disabled />
          <Toggle id="ck-preferences" label="Preferences" desc="Remember your theme, animation setting and paused homepage animation." checked={prefs} onChange={setPrefs} />
          <Toggle id="ck-analytics" label="Analytics" desc="Not used today. If we ever add analytics, they stay off unless you turn this on." checked={analytics} onChange={setAnalytics} />
        </div>
      )}
      <div style={{ display: `flex`, flexWrap: `wrap`, gap: 8 }}>
        <button type="button" className="nk-btn nk-btn-primary" onClick={() => choose(`all`)} style={btn}>
          Accept all
        </button>
        <button type="button" className="nk-btn" onClick={() => choose(`essential`)} style={secondary}>
          Essential only
        </button>
        {custom ? (
          <button type="button" className="nk-btn" onClick={() => choose(`custom`, { preferences: prefs, analytics })} style={secondary}>
            Save my choices
          </button>
        ) : (
          <button type="button" className="nk-btn" onClick={() => setCustom(true)} style={secondary} aria-expanded={false}>
            Customise
          </button>
        )}
      </div>
    </div>
  );
}

export { CookieBanner };
