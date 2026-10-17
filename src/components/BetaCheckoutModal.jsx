import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

// Public beta checkout: no card details and no charge. "Complete" records a simulated
// successful payment and switches the plan; "Simulate failed" records a failed one.
function BetaCheckoutModal({ plan, onClose }) {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = React.useState(null);
  const [error, setError] = React.useState("");
  const firstButton = React.useRef(null);

  React.useEffect(() => {
    firstButton.current?.focus();
    const onKey = (e) => e.key === "Escape" && !busy && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const pay = async (outcome) => {
    setBusy(outcome);
    setError("");
    try {
      const r = await api.post(`/subscriptions/checkout`, { plan: plan.id, outcome });
      if (r?.status === "succeeded") {
        await refreshUser();
        navigate(`/explore?checkout=success`);
        return;
      }
      setError("Payment failed (simulated). No money was taken. You can try again.");
    } catch (e) {
      setError(e.message || "Checkout failed. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const linkStyle = { color: `var(--emerald-700)`, fontWeight: 600, textDecoration: `none` };

  return (
    <div
      onClick={() => !busy && onClose?.()}
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="beta-checkout-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `var(--surface)`,
          borderRadius: 22,
          maxWidth: 400,
          width: `100%`,
          padding: `30px 26px 24px`,
          position: `relative`,
          textAlign: `center`,
          boxShadow: `0 24px 64px color-mix(in srgb, var(--shadow) 28%, transparent)`,
          fontFamily: `var(--font-ui)`,
        }}
      >
        <button
          className="nk-btn"
          onClick={onClose}
          disabled={!!busy}
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
        <div
          style={{
            display: `inline-block`,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: `0.12em`,
            textTransform: `uppercase`,
            color: `var(--emerald-700)`,
            background: `var(--surface-2)`,
            border: `1px solid var(--line)`,
            borderRadius: 20,
            padding: `5px 12px`,
            marginBottom: 14,
          }}
        >
          Beta checkout – no charge
        </div>
        <h3
          id="beta-checkout-title"
          style={{ fontFamily: `var(--font-display)`, fontSize: 24, fontWeight: 700, color: `var(--fg)`, margin: `0 0 4px` }}
        >
          {plan.icon ? `${plan.icon} ` : ``}
          {plan.name} plan
        </h3>
        <p style={{ fontSize: 15, color: `var(--fg)`, margin: `0 0 6px`, fontWeight: 600 }}>
          {plan.price}
          <span style={{ color: `var(--muted)`, fontWeight: 500 }}>{plan.period}</span>
        </p>
        <p style={{ fontSize: 13, color: `var(--muted)`, lineHeight: 1.55, margin: `0 0 20px` }}>
          This is the early-access beta. No card is needed and you won't be charged. Your plan changes straight
          away so you can try its features.
        </p>
        {error && (
          <p
            role="alert"
            style={{
              fontSize: 13,
              color: `var(--danger, #b42318)`,
              background: `var(--surface-2)`,
              borderRadius: 10,
              padding: `10px 12px`,
              margin: `0 0 14px`,
            }}
          >
            {error}
          </p>
        )}
        <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
          <button
            ref={firstButton}
            className="nk-btn nk-btn-primary"
            onClick={() => pay(`success`)}
            disabled={!!busy}
            style={{ padding: `12px 0`, borderRadius: 28, fontWeight: 700, fontSize: 14 }}
          >
            {busy === `success` ? `Processing…` : `Complete beta payment`}
          </button>
          <button
            className="nk-btn"
            onClick={() => pay(`failed`)}
            disabled={!!busy}
            style={{
              padding: `11px 0`,
              borderRadius: 28,
              border: `1px solid var(--line)`,
              background: `var(--surface-2)`,
              color: `var(--muted)`,
              fontWeight: 600,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            {busy === `failed` ? `Processing…` : `Simulate failed payment`}
          </button>
        </div>
        <p style={{ fontSize: 12, color: `var(--muted)`, margin: `18px 0 0` }}>
          <Link to="/privacy" style={linkStyle}>
            Privacy Policy
          </Link>
          {` · `}
          <Link to="/terms" style={linkStyle}>
            Terms
          </Link>
          {` · `}
          <Link to="/terms#refunds" style={linkStyle}>
            Refund policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export { BetaCheckoutModal };
