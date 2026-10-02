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
        background: `rgba(27,58,75,0.45)`,
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
          background: `#fff`,
          borderRadius: 22,
          maxWidth: 380,
          width: `100%`,
          padding: `32px 28px 28px`,
          position: `relative`,
          textAlign: `center`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.28)`,
          fontFamily: `'DM Sans', sans-serif`,
        }}
      >
        <button
          onClick={n}
          aria-label="Close"
          style={{
            position: `absolute`,
            top: 14,
            right: 14,
            background: `#F0FAF4`,
            border: `none`,
            borderRadius: `50%`,
            width: 30,
            height: 30,
            cursor: `pointer`,
            color: `#3D6B55`,
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
        <div style={{ fontSize: 42, marginBottom: 12 }}>👑</div>
        <h3
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            color: `#1B3A4B`,
            marginBottom: 8,
          }}
        >
          {e}
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: `#3D6B55`,
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          {t}
        </p>
        <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
          <Link
            to="/how-it-works?tab=membership"
            onClick={n}
            style={{
              display: `block`,
              padding: `12px 0`,
              borderRadius: 28,
              border: `none`,
              background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
              color: `#fff`,
              fontWeight: 700,
              fontSize: 13.5,
              textDecoration: `none`,
              letterSpacing: `0.03em`,
            }}
          >
            👑 View Plans & Upgrade
          </Link>
          <button
            onClick={n}
            style={{
              padding: `11px 0`,
              borderRadius: 28,
              border: `none`,
              background: `#F0FAF4`,
              color: `#3D6B55`,
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
