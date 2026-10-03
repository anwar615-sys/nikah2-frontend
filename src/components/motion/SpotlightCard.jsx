import "./motion.css";

// Card with a soft emerald spotlight that follows the pointer and a small lift on hover.
export function SpotlightCard({ as: Tag = "div", className = "", style, children, onPointerMove, ...rest }) {
  return (
    <Tag
      className={`nk-spot ${className}`.trim()}
      style={style}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        onPointerMove?.(e);
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
