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
        background: `rgba(27,58,75,0.5)`,
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
          background: `#fff`,
          borderRadius: 20,
          maxWidth: 380,
          width: `100%`,
          padding: 24,
          fontFamily: `'DM Sans', sans-serif`,
          boxShadow: `0 24px 64px rgba(27,58,75,0.25)`,
        }}
      >
        {r === `menu` && (
          <>
            <h3
              style={{
                fontFamily: `'Playfair Display', serif`,
                fontSize: 18,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 4,
              }}
            >
              {e.name || `This user`}
            </h3>
            <p style={{ fontSize: 12.5, color: `#74C69D`, marginBottom: 18 }}>
              Choose an action
            </p>
            {d && (
              <p style={{ fontSize: 12, color: `#C0392B`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, flexDirection: `column`, gap: 10 }}>
              {e.type === `user` && (
                <button
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
                    border: `1.5px solid #C0392B`,
                    background: `transparent`,
                    color: `#C0392B`,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: `pointer`,
                  }}
                >
                  {"🚫 Block "}
                  {l ? `…` : ``}
                </button>
              )}
              <button
                onClick={() => i(`report`)}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid #40916C`,
                  background: `transparent`,
                  color: `#2D6A4F`,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                🚩 Report
              </button>
              <button
                onClick={t}
                style={{
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `none`,
                  background: `#F0FAF4`,
                  color: `#3D6B55`,
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
                fontFamily: `'Playfair Display', serif`,
                fontSize: 18,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 4,
              }}
            >
              {"Report "}
              {e.name || `this`}
            </h3>
            <p style={{ fontSize: 12.5, color: `#74C69D`, marginBottom: 16 }}>
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
                    color: `#1B3A4B`,
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
                border: `1.5px solid #D4EDDA`,
                padding: 10,
                fontSize: 12.5,
                fontFamily: `'DM Sans', sans-serif`,
                resize: `vertical`,
                marginBottom: 12,
              }}
            />
            {d && (
              <p style={{ fontSize: 12, color: `#C0392B`, marginBottom: 12 }}>
                {d}
              </p>
            )}
            <div style={{ display: `flex`, gap: 10 }}>
              <button
                onClick={() => i(`menu`)}
                style={{
                  flex: 1,
                  padding: `11px 0`,
                  borderRadius: 24,
                  border: `1.5px solid #D4EDDA`,
                  background: `transparent`,
                  color: `#3D6B55`,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: `pointer`,
                }}
              >
                Back
              </button>
              <button
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
                  background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
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
                fontFamily: `'Playfair Display', serif`,
                fontSize: 17,
                fontWeight: 700,
                color: `#1B3A4B`,
                marginBottom: 6,
              }}
            >
              Report submitted
            </h3>
            <p style={{ fontSize: 12.5, color: `#3D6B55`, marginBottom: 18 }}>
              Thank you — our team will review this.
            </p>
            <button
              onClick={t}
              className="btn-primary"
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
