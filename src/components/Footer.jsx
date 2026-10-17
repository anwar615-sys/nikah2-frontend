import { Link } from "react-router-dom";
import { openCookieSettings } from "../lib/consent";

const IS_BETA = import.meta.env.VITE_BETA === "true";

const linkStyle = {
  color: `#D8F3DC`,
  fontSize: 12,
  fontFamily: `var(--font-ui)`,
  fontWeight: 600,
  textDecoration: `none`,
  background: `none`,
  border: `none`,
  padding: 0,
  cursor: `pointer`,
};

var Footer = () => (
  <footer
    style={{
      background: `linear-gradient(135deg, var(--deep) 0%, #0D3F2D 55%, #11563D 100%)`,
      padding: `16px 24px 14px`,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `center`,
      gap: 10,
    }}
  >
    <nav aria-label="Legal" style={{ display: `flex`, flexWrap: `wrap`, justifyContent: `center`, gap: `6px 18px` }}>
      <Link to="/privacy" style={linkStyle}>
        Privacy Policy
      </Link>
      <Link to="/terms" style={linkStyle}>
        Terms
      </Link>
      <Link to="/cookies" style={linkStyle}>
        Cookie Policy
      </Link>
      <button type="button" onClick={openCookieSettings} style={linkStyle}>
        Cookie settings
      </button>
      {IS_BETA && (
        <Link to="/beta" style={linkStyle}>
          Beta notice
        </Link>
      )}
    </nav>
    <div style={{ display: `flex`, alignItems: `center`, justifyContent: `center`, gap: 10 }}>
      <span
        style={{
          color: `#B7E4C7`,
          fontSize: 12,
          letterSpacing: `0.18em`,
          fontFamily: `var(--font-ui)`,
          fontWeight: 600,
          textTransform: `uppercase`,
          textAlign: `center`,
        }}
      >
        Because everyone deserves a second chance at happiness.
      </span>
      <span style={{ color: `var(--accent-text)`, fontSize: 15, flexShrink: 0 }}>♥</span>
    </div>
  </footer>
);

export { Footer };
