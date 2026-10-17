import { Link } from "react-router-dom";

// One-line privacy notice with links, used under forms and in dialogs.
function PrivacyNote({ text = `We handle your information as described in our`, style }) {
  const link = { color: `var(--emerald-700)`, fontWeight: 600, textDecoration: `underline` };
  return (
    <p style={{ fontFamily: `var(--font-ui)`, fontSize: 11.5, color: `var(--muted)`, lineHeight: 1.5, margin: `10px 0 0`, ...style }}>
      {text}{" "}
      <Link to="/privacy" style={link}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link to="/terms" style={link}>
        Terms
      </Link>
      .
    </p>
  );
}

export { PrivacyNote };
