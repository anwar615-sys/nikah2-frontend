import * as React from "react";
import { Link, useLocation } from "react-router-dom";

// A small notice on public pages of the beta build. Closing it lasts for this visit only
// (kept in memory, nothing stored). Hidden in chat and admin, which are full-screen.
function BetaBanner() {
  const [closed, setClosed] = React.useState(false);
  const { pathname } = useLocation();
  if (closed || pathname.startsWith(`/messaging`) || pathname.startsWith(`/admin`)) return null;
  return (
    <div
      role="note"
      aria-label="Beta notice"
      style={{
        position: `fixed`,
        left: 12,
        bottom: 12,
        zIndex: 900,
        maxWidth: `min(360px, calc(100vw - 96px))`,
        display: `flex`,
        alignItems: `flex-start`,
        gap: 8,
        background: `var(--surface)`,
        color: `var(--fg)`,
        border: `1px solid var(--line)`,
        borderRadius: 14,
        boxShadow: `0 10px 30px color-mix(in srgb, var(--shadow) 18%, transparent)`,
        padding: `10px 12px`,
        fontFamily: `var(--font-ui)`,
        fontSize: 12.5,
        lineHeight: 1.45,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: `0.1em`,
          textTransform: `uppercase`,
          color: `#fff`,
          background: `var(--emerald-700)`,
          borderRadius: 6,
          padding: `3px 6px`,
          marginTop: 1,
        }}
      >
        Beta
      </span>
      <span>
        Early access beta – features may change. No real payments.{" "}
        <Link to="/beta" style={{ color: `var(--emerald-700)`, fontWeight: 700 }}>
          Learn more
        </Link>
      </span>
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Close beta notice"
        style={{ flexShrink: 0, background: `none`, border: `none`, color: `var(--muted)`, cursor: `pointer`, fontSize: 14, lineHeight: 1, padding: 2 }}
      >
        ✕
      </button>
    </div>
  );
}

export { BetaBanner };
