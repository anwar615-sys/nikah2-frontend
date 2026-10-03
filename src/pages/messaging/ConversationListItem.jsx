import { PlanBadge } from "../../components/PlanBadge";

function ConversationListItem({
  title: e,
  subtitle: t,
  avatarEmoji: n,
  avatarUrl: r,
  presence: i,
  plan: a,
  backBtn: o,
  onCall: s,
  onSettings: c,
  hideCallButtons: l,
  activeCallHere: u,
  onEndCall: d,
  onViewProfile: f,
}) {
  return (
    <div className="chat-header">
      <div className="ch-left">
        {o && (
          <span
            onClick={(e) => e.stopPropagation()}
            style={{ display: `flex` }}
          >
            {o}
          </span>
        )}
        <div
          onClick={f}
          style={{
            display: `flex`,
            alignItems: `center`,
            gap: `inherit`,
            cursor: f ? `pointer` : void 0,
          }}
          title={f ? `View profile` : void 0}
        >
          <div style={{ position: `relative`, flexShrink: 0 }}>
            <div className="ch-avatar">
              {r ? (
                <img
                  src={r}
                  alt=""
                  style={{
                    width: `100%`,
                    height: `100%`,
                    borderRadius: `50%`,
                    objectFit: `cover`,
                  }}
                />
              ) : (
                n
              )}
            </div>
            {i && <span className={`status-dot ${i}`} />}
          </div>
          <div>
            <div
              className="ch-name-row"
              style={{ display: `flex`, alignItems: `center`, gap: 6 }}
            >
              <span className="ch-name">{e}</span>
              <PlanBadge plan={a} />
              {i === `online` && <span className="online-label">● Online</span>}
              {i === `offline` && (
                <span className="offline-label">Offline</span>
              )}
            </div>
            <span className="ch-meta">{t}</span>
          </div>
        </div>
      </div>
      <div className="ch-actions">
        {u ? (
          <button
            onClick={d}
            className="hdr-btn"
            style={{ background: `var(--danger)` }}
            title="End call"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 01-.6.92c-.86.37-1.65.85-2.35 1.4a1 1 0 01-1.33-.08l-1.9-1.9a1 1 0 01.02-1.44C3.85 9.4 7.72 8 12 8s8.15 1.4 10.76 3.72a1 1 0 01.02 1.44l-1.9 1.9a1 1 0 01-1.33.08 12.6 12.6 0 00-2.35-1.4 1 1 0 01-.6-.92v-3.1A15 15 0 0012 9z" />
            </svg>
          </button>
        ) : (
          !l && (
            <>
              <button
                onClick={() => s(`voice`)}
                className="hdr-btn gold"
                title="Voice Call"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
              <button
                onClick={() => s(`video`)}
                className="hdr-btn gold"
                title="Video Call"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="16"
                  height="16"
                >
                  <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              </button>
            </>
          )
        )}
        <button onClick={c} className="hdr-btn subtle" title="Settings">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="16"
            height="16"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { ConversationListItem };
