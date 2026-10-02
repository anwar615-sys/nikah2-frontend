var Footer = () => (
  <div
    style={{
      background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 50%, #40916C 100%)`,
      padding: `14px 40px`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      gap: 10,
    }}
  >
    <span
      style={{
        color: `#B7E4C7`,
        fontSize: 12,
        letterSpacing: `0.18em`,
        fontFamily: `'DM Sans', sans-serif`,
        fontWeight: 600,
        textTransform: `uppercase`,
        textAlign: `center`,
      }}
    >
      Because everyone deserves a second chance at happiness.
    </span>
    <span style={{ color: `#74C69D`, fontSize: 15, flexShrink: 0 }}>♥</span>
  </div>
);

export { Footer };
