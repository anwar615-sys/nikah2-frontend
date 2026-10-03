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
      ? { bg: `var(--danger-bg)`, border: `var(--danger-line)`, text: `var(--danger)` }
      : { bg: `var(--surface-2)`, border: `var(--line)`, text: `var(--emerald-700)` };
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
        fontFamily: `var(--font-ui)`,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: `0 8px 24px color-mix(in srgb, var(--shadow) 15%, transparent)`,
        maxWidth: `90vw`,
        textAlign: `center`,
        display: `flex`,
        alignItems: `center`,
        gap: 12,
      }}
    >
      <span>{e}</span>
      <button className="nk-btn nk-btn-soft"
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
