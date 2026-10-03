import "./motion.css";

// Three slow blurred blobs (emerald, gold, deep emerald) behind a section. Parent needs position: relative.
export function Aurora({ intensity = 0.55 }) {
  return (
    <div className="nk-aurora" aria-hidden="true" style={{ opacity: intensity }}>
      <span className="a1" />
      <span className="a2" style={{ opacity: 0.65 }} />
      <span className="a3" />
    </div>
  );
}
