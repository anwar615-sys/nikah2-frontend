import { Link } from "react-router-dom";

function UpgradeModal({
  title: e = `Upgrade to unlock this`,
  message: t,
  onClose: n,
}) {
  return (
    <div
      onClick={n}
      style={{
        position: `fixed`,
        inset: 0,
        zIndex: 300,
        background: `color-mix(in srgb, var(--overlay) 45%, transparent)`,
        backdropFilter: `blur(6px)`,
        WebkitBackdropFilter: `blur(6px)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `var(--surface)`,
          borderRadius: 22,
          maxWidth: 380,
          width: `100%`,
          padding: `32px 28px 28px`,
          position: `relative`,
          textAlign: `center`,
          boxShadow: `0 24px 64px color-mix(in srgb, var(--shadow) 28%, transparent)`,
          fontFamily: `var(--font-ui)`,
        }}
      >
        <button className="nk-btn"
          onClick={n}
          aria-label="Close"
          style={{
            position: `absolute`,
            top: 14,
            right: 14,
            background: `var(--surface-2)`,
            border: `none`,
            borderRadius: `50%`,
            width: 30,
            height: 30,
            cursor: `pointer`,
            color: `var(--muted)`,
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
        <div style={{ fontSize: 42, marginBottom: 12 }}>👑</div>
        <h3
          style={{
            fontFamily: `var(--font-display)`,
            fontSize: 20,
            fontWeight: 700,
            color: `var(--fg)`,
            marginBottom: 8,
          }}
        >
          {e}
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: `var(--muted)`,
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {t}
        </p>
        <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
          <Link className="nk-btn nk-btn-primary"
            to="/how-it-works?tab=membership"
            onClick={n}
            style={{
              display: `block`,
              padding: `12px 0`,
              borderRadius: 28,
              border: `none`,
              background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
              color: `#fff`,
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: `none`,
              letterSpacing: `0.03em`,
            }}
          >
            👑 View Plans & Upgrade
          </Link>
          <button className="nk-btn"
            onClick={n}
            style={{
              padding: `11px 0`,
              borderRadius: 28,
              border: `none`,
              background: `var(--surface-2)`,
              color: `var(--muted)`,
              fontWeight: 600,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

export { UpgradeModal };
