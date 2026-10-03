var Footer = () => (
  <div
    style={{
      background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 50%, var(--emerald-700) 100%)`,
      padding: `14px 40px`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      gap: 10,
    }}
  >
    <span
      style={{
        color: `var(--mint)`,
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
    <span style={{ color: `var(--emerald-500)`, fontSize: 15, flexShrink: 0 }}>♥</span>
  </div>
);

export { Footer };
