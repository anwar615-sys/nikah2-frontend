import { useMotion } from "../../context/MotionContext";
import "./motion.css";

// Headline that resolves word by word from a blur (.14s per word, .9s each).
// `startIndex` continues the timing from an earlier BlurText in the same line;
// `wordClassName` styles each word (e.g. "nk-shiny") on an inner span so it keeps its own animation.
export function BlurText({ text, as: Tag = "span", className = "", style, wordClassName = "", startIndex = 0 }) {
  const { motionEnabled } = useMotion();
  if (!motionEnabled) {
    return (
      <Tag className={className} style={style}>
        {wordClassName ? <span className={wordClassName}>{text}</span> : text}
      </Tag>
    );
  }
  const words = String(text).split(/(\s+)/);
  let n = startIndex;
  return (
    <Tag className={`nk-blurtext ${className}`.trim()} style={style} aria-label={text}>
      {words.map((w, i) =>
        w === "" ? null : /^\s+$/.test(w) ? (
          w
        ) : (
          <span key={i} aria-hidden="true" className="w" style={{ animationDelay: `${0.14 * n++}s` }}>
            {wordClassName ? <span className={wordClassName}>{w}</span> : w}
          </span>
        ),
      )}
    </Tag>
  );
}
