import * as React from "react";

function SendImageModal({
  imageUrl: e,
  onSend: t,
  onCancel: n,
  sending: r,
  isPremium: i,
  onRequirePremium: a,
}) {
  let [o, s] = (0, React.useState)(`regular`),
    [c, l] = (0, React.useState)(5),
    [u, d] = (0, React.useState)(!1);
  return (
    <div className="modal-bg" onClick={n}>
      <div className="img-modal" onClick={(e) => e.stopPropagation()}>
        <div className="img-modal-head">
          <span className="img-modal-title">Send Image</span>
          <button className="modal-x" onClick={n}>
            ✕
          </button>
        </div>
        <div className="img-preview-wrap">
          <img src={e} alt="preview" className="img-preview" draggable={!1} />
        </div>
        <div className="mode-toggle">
          <button
            className={`mode-btn ${o === `regular` ? `active` : ``}`}
            onClick={() => s(`regular`)}
          >
            🖼️ Regular
          </button>
          <button
            className={`mode-btn ${o === `timed` ? `active` : ``}`}
            onClick={() => {
              if (!i) {
                a?.();
                return;
              }
              s(`timed`);
            }}
            title={i ? void 0 : `Sending view-once photos requires Premium`}
            style={i ? void 0 : { opacity: 0.65 }}
          >
            {"⏳ Timed "}
            {!i && `🔒`}
          </button>
        </div>
        {o === `timed` && i && (
          <div className="timed-opts">
            <div className="opt-label">View duration</div>
            <div className="duration-row">
              {[3, 5, 10].map((e) => (
                <button
                  key={e}
                  className={`dur-pill ${c === e ? `active` : ``}`}
                  onClick={() => l(e)}
                >
                  {e}s
                </button>
              ))}
            </div>
            <button
              className={`ss-toggle ${u ? `active` : ``}`}
              onClick={() => d((e) => !e)}
            >
              <span
                className="ss-track"
                style={{
                  background: u
                    ? `linear-gradient(135deg,#1B3A4B,#2D6A4F)`
                    : `#e5e7eb`,
                }}
              >
                <span className="ss-thumb" style={{ left: u ? 22 : 3 }} />
              </span>
              <span>{u ? `🔒 No screenshot` : `📸 Screenshot allowed`}</span>
            </button>
          </div>
        )}
        <div className="img-modal-btns">
          <button className="img-cancel" onClick={n}>
            Cancel
          </button>
          <button
            className="img-send"
            disabled={r}
            onClick={() => t({ mode: o, duration: c, noScreenshot: u })}
          >
            {r ? `Sending…` : `Send →`}
          </button>
        </div>
      </div>
    </div>
  );
}

export { SendImageModal };
