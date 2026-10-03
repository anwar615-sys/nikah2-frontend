import * as React from "react";

function SearchableSelect({
  value: e,
  onChange: t,
  options: n,
  placeholder: r,
  loading: i,
  disabled: a,
  inputStyle: o,
  emptyLabel: s,
}) {
  let [c, l] = (0, React.useState)(!1),
    [u, d] = (0, React.useState)(``),
    f = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    function e(e) {
      f.current && !f.current.contains(e.target) && l(!1);
    }
    return (
      document.addEventListener(`mousedown`, e),
      () => document.removeEventListener(`mousedown`, e)
    );
  }, []);
  let p = n.filter((e) => e.toLowerCase().includes(u.trim().toLowerCase()));
  return (
    <div style={{ position: `relative` }} ref={f}>
      <button className="nk-btn"
        type="button"
        disabled={a}
        onClick={() => {
          a || (l((e) => !e), d(``));
        }}
        style={{
          ...o,
          textAlign: `left`,
          cursor: a ? `not-allowed` : `pointer`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          gap: 10,
          color: e ? `var(--fg)` : `var(--emerald-500)`,
          opacity: a ? 0.6 : 1,
        }}
      >
        <span>{i ? `Loading…` : e || r}</span>
        <span
          style={{
            fontSize: 10,
            color: `var(--emerald-700)`,
            transform: c ? `rotate(180deg)` : `rotate(0deg)`,
            transition: `transform 0.2s`,
            flexShrink: 0,
          }}
        >
          ▼
        </span>
      </button>
      {c && !a && (
        <div
          style={{
            position: `absolute`,
            top: `110%`,
            left: 0,
            right: 0,
            zIndex: 60,
            background: `var(--surface)`,
            borderRadius: 14,
            border: `1.5px solid var(--line)`,
            boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
            overflow: `hidden`,
          }}
        >
          <div style={{ padding: 8, borderBottom: `1px solid var(--line)` }}>
            <input
              type="text"
              autoFocus={!0}
              placeholder="Search..."
              value={u}
              onChange={(e) => d(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ ...o, padding: `7px 10px`, fontSize: 12.5 }}
            />
          </div>
          <div
            style={{ maxHeight: 220, overflowY: `auto`, padding: `6px 8px` }}
          >
            {p.length === 0 && (
              <div
                style={{
                  padding: `10px 8px`,
                  fontSize: 12.5,
                  color: `var(--emerald-500)`,
                }}
              >
                {s || `No matches`}
              </div>
            )}
            {p.map((n) => {
              let r = e === n;
              return (
                <button className="nk-btn nk-btn-soft"
                  key={n}
                  type="button"
                  onClick={() => {
                    (t(n), l(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    padding: `7px 10px`,
                    border: `none`,
                    background: r ? `var(--surface-2)` : `transparent`,
                    color: r ? `var(--emerald-700)` : `var(--fg)`,
                    fontWeight: r ? 700 : 400,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 12.5,
                    cursor: `pointer`,
                    borderRadius: 8,
                    transition: `background 0.15s`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = `var(--surface-2)`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = r
                      ? `var(--surface-2)`
                      : `transparent`)
                  }
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export { SearchableSelect };
