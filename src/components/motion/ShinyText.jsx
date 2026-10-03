import "./motion.css";

// Metallic emerald text with a slow moving highlight (static gradient when motion is off).
export function ShinyText({ as: Tag = "span", className = "", style, children }) {
  return (
    <Tag className={`nk-shiny ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
