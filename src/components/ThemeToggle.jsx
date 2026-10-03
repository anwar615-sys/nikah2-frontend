import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

// Sun-to-moon pill: the sun knob rolls across and becomes a crescent, stars rise, the cloud drifts off.
export function ThemeToggle({ size = "md", style }) {
  const { theme, toggle } = useTheme();
  const ref = useRef(null);
  const dark = theme === "dark";
  return (
    <button
      ref={ref}
      type="button"
      className={`nk-theme-toggle${size === "sm" ? " nk-theme-toggle--sm" : ""}`}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      title={dark ? "Light theme" : "Dark theme"}
      onClick={() => toggle(ref.current)}
      style={style}
    >
      <span className="star s1" />
      <span className="star s2" />
      <span className="star s3" />
      <span className="cloud" />
      <span className="knob" />
    </button>
  );
}
