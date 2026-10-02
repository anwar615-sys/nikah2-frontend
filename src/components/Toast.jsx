import * as React from "react";

function Toast({ message: e, tone: t = `info`, onDismiss: n }) {
  if (
    ((0, React.useEffect)(() => {
      let e = setTimeout(n, 4e3);
      return () => clearTimeout(e);
    }, [n]),
    !e)
  )
    return null;
  let r =
    t === `error`
      ? { bg: `#fff5f5`, border: `#f5c6c6`, text: `#C0392B` }
      : { bg: `#F0FAF4`, border: `#D4EDDA`, text: `#2D6A4F` };
  return (
    <div
      style={{
        position: `fixed`,
        top: 80,
        left: `50%`,
        transform: `translateX(-50%)`,
        zIndex: 400,
        background: r.bg,
        border: `1.5px solid ${r.border}`,
        color: r.text,
        padding: `12px 20px`,
        borderRadius: 16,
        fontFamily: `'DM Sans', sans-serif`,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: `0 8px 24px rgba(27,58,75,0.15)`,
        maxWidth: `90vw`,
        textAlign: `center`,
        display: `flex`,
        alignItems: `center`,
        gap: 12,
      }}
    >
      <span>{e}</span>
      <button
        onClick={n}
        style={{
          border: `none`,
          background: `none`,
          cursor: `pointer`,
          color: r.text,
          fontSize: 14,
          opacity: 0.7,
        }}
      >
        ✕
      </button>
    </div>
  );
}

export { Toast };
