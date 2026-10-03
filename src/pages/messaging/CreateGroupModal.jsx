import * as React from "react";
import { api } from "../../lib/api";

function CreateGroupModal({ onClose: e, onCreated: t }) {
  let [n, r] = (0, React.useState)(``),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)([]),
    [c, l] = (0, React.useState)([]),
    [u, d] = (0, React.useState)(!1),
    [f, p] = (0, React.useState)(``);
  (0, React.useEffect)(() => {
    let e = setTimeout(async () => {
      if (!i.trim()) {
        s([]);
        return;
      }
      try {
        s(
          (
            await api.get(
              `/people?q=${encodeURIComponent(i)}&online=false&verified=false&limit=10`,
            )
          ).items.filter((e) => !c.some((t) => t.id === e.id)),
        );
      } catch {}
    }, 250);
    return () => clearTimeout(e);
  }, [i]);
  let m = (e) => {
      (l((t) => [...t, e]), s((t) => t.filter((t) => t.id !== e.id)));
    },
    h = (e) => l((t) => t.filter((t) => t.id !== e));
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
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            color: `var(--fg)`,
          }}
        >
          Create Group
        </h2>
        <button onClick={e} className="modal-x">
          ✕
        </button>
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
        Group name
      </label>
      <input
        value={n}
        onChange={(e) => r(e.target.value)}
        placeholder="e.g. Second Chances Support"
        className="text-input"
        style={{ flex: `none`, margin: `6px 0 18px`, background: `var(--bg)` }}
      />
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: `var(--emerald-700)`,
          textTransform: `uppercase`,
          letterSpacing: `0.06em`,
        }}
      >
        Add members
      </label>
      <input
        value={i}
        onChange={(e) => a(e.target.value)}
        placeholder="Search by name..."
        className="text-input"
        style={{ flex: `none`, margin: `6px 0 10px`, background: `var(--bg)` }}
      />
      {o.length > 0 && (
        <div
          style={{
            border: `1px solid var(--line)`,
            borderRadius: 12,
            marginBottom: 14,
            overflow: `hidden`,
          }}
        >
          {o.map((e) => (
            <button
              key={e.id}
              onClick={() => m(e)}
              style={{
                width: `100%`,
                textAlign: `left`,
                padding: `10px 12px`,
                border: `none`,
                background: `var(--surface)`,
                borderBottom: `1px solid var(--line)`,
                cursor: `pointer`,
                fontFamily: `'DM Sans', sans-serif`,
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
      {c.length > 0 && (
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: 8,
            marginBottom: 18,
          }}
        >
          {c.map((e) => (
            <span
              key={e.id}
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                gap: 6,
                background: `var(--surface-2)`,
                border: `1px solid var(--line)`,
                borderRadius: 20,
                padding: `5px 6px 5px 12px`,
                fontSize: 12.5,
                fontFamily: `'DM Sans', sans-serif`,
                color: `var(--emerald-700)`,
              }}
            >
              {e.displayName}
              <button
                onClick={() => h(e.id)}
                style={{
                  border: `none`,
                  background: `none`,
                  cursor: `pointer`,
                  color: `var(--emerald-500)`,
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
      {f && (
        <p style={{ fontSize: 12.5, color: `var(--danger)`, marginBottom: 14 }}>
          {f}
        </p>
      )}
      <div style={{ display: `flex`, gap: 10 }}>
        <button onClick={e} className="img-cancel" style={{ flex: 1 }}>
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!n.trim() || c.length === 0) {
              p(`Give the group a name and add at least one member.`);
              return;
            }
            (d(!0), p(``));
            try {
              t(
                await api.post(`/groups`, {
                  name: n.trim(),
                  memberIds: c.map((e) => e.id),
                }),
              );
            } catch (e) {
              p(e.message || `Could not create the group.`);
            } finally {
              d(!1);
            }
          }}
          disabled={u}
          className="img-send"
          style={{ flex: 1 }}
        >
          {u ? `Creating…` : `Create Group`}
        </button>
      </div>
    </div>
  );
}

export { CreateGroupModal };
