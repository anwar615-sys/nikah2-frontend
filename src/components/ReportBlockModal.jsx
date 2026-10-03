import * as React from "react";
import { api } from "../lib/api";

var Kn = [
  { value: `harassment`, label: `Harassment or abuse` },
  { value: `fake_profile`, label: `Fake profile` },
  { value: `inappropriate_content`, label: `Inappropriate content` },
  { value: `spam`, label: `Spam` },
  { value: `safety_concern`, label: `Safety concern` },
  { value: `other`, label: `Other` },
];

function ReportBlockModal({ target: e, onClose: t, onBlocked: n }) {
  let [r, i] = (0, React.useState)(`menu`),
    [a, o] = (0, React.useState)(``),
    [s, c] = (0, React.useState)(``),
    [l, u] = (0, React.useState)(!1),
    [d, f] = (0, React.useState)(``);
  return (
    <div
      onClick={t}
      style={{
        position: `fixed`,
        inset: 0,
        background: `color-mix(in srgb, var(--overlay) 50%, transparent)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        zIndex: 200,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: `var(--surface)`,
          borderRadius: 20,
          maxWidth: 380,
          width: `100%`,
          padding: 24,
          fontFamily: `var(--font-ui)`,
          boxShadow: `0 24px 64px color-mix(in srgb, var(--shadow) 25%, transparent)`,
        }}
      >
        {r === `menu` && (
          <>
            <h3
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: 18,
                fontWeight: 700,
                color: `var(--fg)`,
                marginBottom: 4,
              }}
            >
              {e.name || `This user`}
            </h3>
            <p style={{ fontSize: 12.5, color: `var(--emerald-500)`, marginBottom: 18 }}>
              Choose an action
            </p>
            {d && (
              <p style={{ fontSize: 12, color: `var(--danger)`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
              {e.type === `user` && (
                <button className="nk-btn nk-btn-ghost"
                  onClick={async () => {
                    if (e.type === `user`) {
                      (u(!0), f(``));
                      try {
                        (await api.post(`/users/${e.id}/block`, {}), n?.());
                      } catch (e) {
                        f(e.message || `Could not block this user.`);
                      } finally {
                        u(!1);
                      }
                    }
                  }}
                  disabled={l}
                  style={{
                    padding: `11px 0`,
                    borderRadius: 24,
                    border: `1.5px solid var(--danger)`,
                    background: `transparent`,
                    color: `var(--danger)`,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: `pointer`,
                  }}
                >
                  {"🚫 Block "}
                  {l ? `…` : ``}
                </button>
              )}
              <button className="nk-btn nk-btn-ghost"
                onClick={() => i(`report`)}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid var(--emerald-500)`,
                  background: `transparent`,
                  color: `var(--emerald-700)`,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                🚩 Report
              </button>
              <button className="nk-btn"
                onClick={t}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `none`,
                  background: `var(--surface-2)`,
                  color: `var(--muted)`,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {r === `report` && (
          <>
            <h3
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: 18,
                fontWeight: 700,
                color: `var(--fg)`,
                marginBottom: 4,
              }}
            >
              {"Report "}
              {e.name || `this`}
            </h3>
            <p style={{ fontSize: 12.5, color: `var(--emerald-500)`, marginBottom: 16 }}>
              Our team reviews every report — nothing is ignored.
            </p>
            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                gap: 8,
                marginBottom: 12,
              }}
            >
              {Kn.map((e) => (
                <label
                  key={e.value}
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 8,
                    fontSize: 13,
                    color: `var(--fg)`,
                    cursor: `pointer`,
                  }}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={e.value}
                    checked={a === e.value}
                    onChange={() => o(e.value)}
                  />
                  {e.label}
                </label>
              ))}
            </div>
            <textarea
              value={s}
              onChange={(e) => c(e.target.value)}
              placeholder="Additional details (optional)"
              rows={3}
              style={{
                width: `100%`,
                borderRadius: 12,
                border: `1.5px solid var(--line)`,
                padding: 10,
                fontSize: 12.5,
                fontFamily: `var(--font-ui)`,
                resize: `vertical`,
                marginBottom: 12,
              }}
            />
            {d && (
              <p style={{ fontSize: 12, color: `var(--danger)`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, gap: 10 }}>
              <button className="nk-btn nk-btn-ghost"
                onClick={() => i(`menu`)}
                style={{
                  flex: 1,
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid var(--line)`,
                  background: `transparent`,
                  color: `var(--muted)`,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                Back
              </button>
              <button className="nk-btn nk-btn-primary"
                onClick={async () => {
                  if (!a) {
                    f(`Please choose a reason.`);
                    return;
                  }
                  (u(!0), f(``));
                  try {
                    (await api.post(`/reports`, {
                      targetType: e.type,
                      targetId: e.id,
                      reason: a,
                      details: s || void 0,
                    }),
                      i(`done`));
                  } catch (e) {
                    f(e.message || `Could not submit this report.`);
                  } finally {
                    u(!1);
                  }
                }}
                disabled={l}
                style={{
                  flex: 1,
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `none`,
                  background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
                  color: `#fff`,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                {l ? `Submitting…` : `Submit Report`}
              </button>
            </div>
          </>
        )}
        {r === `done` && (
          <div style={{ textAlign: `center`, padding: `12px 0` }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
            <h3
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: 17,
                fontWeight: 700,
                color: `var(--fg)`,
                marginBottom: 6,
              }}
            >
              Report submitted
            </h3>
            <p style={{ fontSize: 12.5, color: `var(--muted)`, marginBottom: 18 }}>
              Thank you — our team will review this.
            </p>
            <button
              onClick={t}
              className="nk-btn btn-primary"
              style={{ padding: `10px 0` }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { ReportBlockModal };
