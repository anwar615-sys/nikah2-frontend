import "./motion.css";

// Endless horizontal strip; the content is rendered twice and slid by -50%. Pauses on hover.
export function Marquee({ speed = 40, gap = 14, className = "", style, children }) {
  return (
    <div className={`nk-marquee ${className}`.trim()} style={style}>
      <div className="nk-marquee-track" style={{ "--nk-speed": `${speed}s`, gap }}>
        {children}
        <div aria-hidden="true" style={{ display: "contents" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
