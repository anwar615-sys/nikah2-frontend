import * as React from "react";

function MessageComposer({
  newMessage: e,
  setNewMessage: t,
  handleSendMessage: n,
  handleImageSelect: r,
  settings: i,
  placeholderName: a,
  inputRef: o,
  onTyping: s,
}) {
  let c = (0, React.useRef)(null);
  return (
    <div className="input-bar">
      <input
        ref={c}
        type="file"
        accept="image/*"
        style={{ display: `none` }}
        onChange={r}
      />
      <button className="nk-btn nk-btn-soft input-icon" title="Emoji">
        😊
      </button>
      <button
        className="nk-btn nk-btn-soft input-icon"
        title="Send image"
        onClick={() => c.current?.click()}
        disabled={i.blocked}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="18"
          height="18"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </button>
      <input
        ref={o}
        type="text"
        placeholder={i.blocked ? `You can't message here.` : `Message ${a}...`}
        value={e}
        onChange={(e) => {
          (t(e.target.value), s?.());
        }}
        onKeyDown={(e) => {
          e.key === `Enter` && !e.shiftKey && (e.preventDefault(), n());
        }}
        disabled={i.blocked}
        className="text-input"
      />
      <button
        onClick={n}
        disabled={!e.trim() || i.blocked}
        className="nk-btn send-btn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}

export { MessageComposer };
