var Footer = () => (
  <div
    style={{
      background: `linear-gradient(135deg, var(--deep) 0%, #0D3F2D 55%, #11563D 100%)`,
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
);

export { Footer };
