import { useMotion } from "../context/MotionContext";

// Small switch: animations on/off. Turning it on overrides the system "reduce motion" request.
export function MotionToggle({ style }) {
  const { motionEnabled, setSetting } = useMotion();
  return (
    <button
      type="button"
      className="nk-btn nk-btn-soft nk-motion-toggle"
      aria-pressed={motionEnabled}
      aria-label={motionEnabled ? "Turn animations off" : "Turn animations on"}
      title={motionEnabled ? "Animations on" : "Animations off"}
      onClick={() => setSetting(motionEnabled ? "off" : "on")}
      style={style}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M3 12c2.5-5 5.5-5 8 0s5.5 5 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {!motionEnabled && <path d="M4 20 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
      </svg>
    </button>
  );
}
