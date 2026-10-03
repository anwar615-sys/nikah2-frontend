import "./motion.css";

// Wraps a card in a slowly rotating champagne-gold edge.
export function GoldBorder({ radius = 20, className = "", style, children }) {
  return (
    <div className={`nk-gold ${className}`.trim()} style={{ borderRadius: radius, ...style }}>
      {children}
    </div>
  );
}
