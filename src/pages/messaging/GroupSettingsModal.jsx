import * as React from "react";
import { api } from "../../lib/api";

function GroupSettingsModal({
  groupId: e,
  meId: t,
  onClose: n,
  onLeft: r,
  onDeleted: i,
  onUpdated: a,
  requestConfirm: o,
}) {
  let [s, c] = (0, React.useState)(null),
    [l, u] = (0, React.useState)(``),
    [d, f] = (0, React.useState)(``),
    [p, m] = (0, React.useState)([]),
    [h, g] = (0, React.useState)(``),
    _ = (0, React.useCallback)(async () => {
      try {
        let t = await api.get(`/groups/${e}`);
        (c(t), u(t.name));
      } catch (e) {
        g(e.message);
      }
    }, [e]);
  if (
    ((0, React.useEffect)(() => {
      _();
    }, [_]),
    (0, React.useEffect)(() => {
      let e = setTimeout(async () => {
        if (!d.trim()) {
          m([]);
          return;
        }
        try {
          m(
            (
              await api.get(
                `/people?q=${encodeURIComponent(d)}&online=false&verified=false&limit=10`,
              )
            ).items.filter((e) => !s?.members.some((t) => t.id === e.id)),
          );
        } catch {}
      }, 250);
      return () => clearTimeout(e);
    }, [d, s]),
    !s)
  )
    return (
      <div className="chat-area" style={{ padding: 24 }}>
        Loading…
      </div>
    );
  let y = s.myRole === `admin`,
    b = async () => {
      try {
        let t = await api.patch(`/groups/${e}`, { name: l });
        (c(t), a?.(t));
      } catch (e) {
        g(e.message);
      }
    },
    x = async (t) => {
      try {
        (c(await api.post(`/groups/${e}/members`, { userId: t })), f(``));
      } catch (e) {
        g(e.message);
      }
    },
    S = async (n) => {
      try {
        (await api.delete(`/groups/${e}/members/${n}`), n === t ? r?.() : _());
      } catch (e) {
        g(e.message);
      }
    };
  return (
    <div className="chat-area" style={{ padding: 24, overflowY: `auto` }}>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: `space-between`,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontFamily: `var(--font-display)`,
            fontSize: 20,
            fontWeight: 700,
            color: `var(--fg)`,
          }}
        >
          Group Settings
        </h2>
        <button onClick={n} className="nk-btn modal-x">
          ✕
        </button>
      </div>
      {h && (
        <p style={{ fontSize: 12.5, color: `var(--danger)`, marginBottom: 14 }}>
          {h}
        </p>
      )}
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `var(--emerald-700)`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Group name
      </label>
      <div style={{ display: `flex`, gap: 8, margin: `6px 0 20px` }}>
        <input
          value={l}
          onChange={(e) => u(e.target.value)}
          disabled={!y}
          className="text-input"
          style={{ background: `var(--bg)` }}
        />
        {y && (
          <button
            onClick={b}
            className="nk-btn img-send"
            style={{ padding: `0 18px` }}
          >
            Save
          </button>
        )}
      </div>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `var(--emerald-700)`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Members ({s.members.length})
      </label>
      <div
        style={{
          border: `1px solid var(--line)`,
          borderRadius: 12,
          margin: `6px 0 20px`,
          overflow: `hidden`,
        }}
      >
        {s.members.map((e) => (
          <div
            key={e.id}
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,
              padding: `10px 12px`,
              borderBottom: `1px solid var(--line)`,
              fontFamily: `var(--font-ui)`,
              fontSize: 13,
            }}
          >
            <span>
              {e.displayName}{" "}
              {e.role === `admin` && (
                <span
                  style={{
                    fontSize: 10,
                    color: `var(--emerald-700)`,
                    fontWeight: 700,
                  }}
                >
                  ADMIN
                </span>
              )}
            </span>
            {(y && e.id !== t) || e.id === t ? (
              <button className="nk-btn nk-btn-soft"
                onClick={() => S(e.id)}
                style={{
                  border: `none`,
                  background: `none`,
                  color: e.id === t ? `var(--emerald-700)` : `var(--danger)`,
                  cursor: `pointer`,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {e.id === t ? `Leave` : `Remove`}
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {y && (
        <>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: `var(--emerald-700)`,
              textTransform: `uppercase`,
              letterSpacing: `0.06em`,
            }}
          >
            Add member
          </label>
          <input
            value={d}
            onChange={(e) => f(e.target.value)}
            placeholder="Search by name..."
            className="text-input"
            style={{
              flex: `none`,
              margin: `6px 0 10px`,
              background: `var(--bg)`,
            }}
          />
          {p.length > 0 && (
            <div
              style={{
                border: `1px solid var(--line)`,
                borderRadius: 12,
                marginBottom: 20,
                overflow: `hidden`,
              }}
            >
              {p.map((e) => (
                <button className="nk-btn"
                  key={e.id}
                  onClick={() => x(e.id)}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    padding: `10px 12px`,
                    border: `none`,
                    background: `var(--surface)`,
                    borderBottom: `1px solid var(--line)`,
                    cursor: `pointer`,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                    color: `var(--fg)`,
                  }}
                >
                  {"+ "}
                  {e.displayName}
                </button>
              ))}
            </div>
          )}
          <button className="nk-btn"
            onClick={() => {
              o(
                `Delete this group for everyone? This can't be undone.`,
                async () => {
                  try {
                    (await api.delete(`/groups/${e}`), i?.());
                  } catch (e) {
                    g(e.message);
                  }
                },
                { confirmLabel: `Delete Group`, danger: !0 },
              );
            }}
            style={{
              width: `100%`,
              padding: `12px 0`,
              borderRadius: 14,
              border: `1.5px solid var(--danger)`,
              background: `var(--danger-bg)`,
              color: `var(--danger)`,
              fontWeight: 700,
              fontSize: 13,
              cursor: `pointer`,
            }}
          >
            Delete Group
          </button>
        </>
      )}
    </div>
  );
}

export { GroupSettingsModal };
