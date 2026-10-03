import * as React from "react";

function ChatImage({ imageUrl: e, sender: t }) {
  let [n, r] = (0, React.useState)(!1);
  return (
    <>
      <img
        src={e}
        alt="sent"
        className={`chat-img ${t === `user` ? `chat-img-user` : `chat-img-other`}`}
        onClick={() => r(!0)}
        onContextMenu={(e) => e.preventDefault()}
        draggable={!1}
      />
      {n && (
        <div className="lightbox" onClick={() => r(!1)}>
          <button className="nk-btn lightbox-close" onClick={() => r(!1)}>
            ✕
          </button>
          <img
            src={e}
            alt="full"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            draggable={!1}
          />
        </div>
      )}
    </>
  );
}

export { ChatImage };
