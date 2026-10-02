import { ChatImage } from "./ChatImage";
import { TimedImageMessage } from "./TimedImageMessage";

function wa(e) {
  let [t, n, r] = (e || ``).split(`:`),
    i = t === `video` ? `📹` : `📞`,
    a = t === `video` ? `Video call` : `Voice call`;
  if (n === `answered`) {
    let e = Number(r) || 0,
      t = Math.floor(e / 60),
      n = e % 60;
    return `${i} ${a} · ${t}:${String(n).padStart(2, `0`)}`;
  }
  return `${i} ${a} · No answer`;
}

function MessageRow({
  messages: e,
  meId: t,
  avatarEmoji: n,
  isGroup: r,
  senderInfo: i,
  settings: a,
  isTyping: o,
  messagesContainerRef: s,
}) {
  return (
    <div ref={s} className="msgs-scroll">
      <div className="date-row">
        <span className="date-chip">Today</span>
      </div>
      {e.map((e) => {
        let o = e.senderId === t,
          s = new Date(e.createdAt).toLocaleTimeString([], {
            hour: `2-digit`,
            minute: `2-digit`,
          }),
          c = r ? i?.get(e.senderId) : null;
        return (
          <div key={e.id} className={`msg-row ${o ? `msg-right` : `msg-left`}`}>
            {!o &&
              (c?.avatarUrl ? (
                <img
                  src={c.avatarUrl}
                  alt=""
                  className="msg-avatar"
                  style={{ objectFit: `cover` }}
                />
              ) : (
                <div className="msg-avatar">
                  {r ? (c?.name || `?`).trim().charAt(0).toUpperCase() : n}
                </div>
              ))}
            <div className="msg-col">
              {!o && r && c?.name && (
                <div className="msg-sender-name">{c.name}</div>
              )}
              {e.type === `text` && (
                <div className={`bubble ${o ? `bubble-user` : `bubble-other`}`}>
                  {e.text}
                </div>
              )}
              {e.type === `call` && (
                <div className={`bubble ${o ? `bubble-user` : `bubble-other`}`}>
                  {wa(e.text)}
                </div>
              )}
              {e.type === `image` && e.media?.mediaUrl && (
                <ChatImage
                  imageUrl={e.media.mediaUrl}
                  sender={o ? `user` : `other`}
                />
              )}
              {e.type === `timed_image` && (
                <TimedImageMessage
                  messageId={e.id}
                  duration={e.timed?.durationSeconds || 5}
                  noScreenshot={e.timed?.noScreenshot}
                />
              )}
              <div className={`msg-meta ${o ? `meta-right` : `meta-left`}`}>
                {s}
                {o && a.readReceipts && <span className="read-tick">✓✓</span>}
              </div>
            </div>
          </div>
        );
      })}
      {o && (
        <div className="msg-row msg-left">
          <div className="msg-avatar">{n}</div>
          <div className="bubble bubble-other typing-bubble">
            <span className="dot" style={{ animationDelay: `0ms` }} />
            <span className="dot" style={{ animationDelay: `150ms` }} />
            <span className="dot" style={{ animationDelay: `300ms` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export { MessageRow };
