import * as React from "react";
import { useCall } from "./CallProvider";

function Ho(e) {
  return `${Math.floor(e / 60)
    .toString()
    .padStart(2, `0`)}:${Math.floor(e % 60)
    .toString()
    .padStart(2, `0`)}`;
}

var Uo = { width: 20, height: 20 };

function MicIcon({ muted: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M19 11a7 7 0 01-.34 2.16l-1.5-1.5A5 5 0 0017 11V5a2 2 0 00-4 0v1.34L3.41 1.77 2 3.18l18.82 18.82 1.41-1.41-4.24-4.24A6.98 6.98 0 0019 11h-2zM12 17a5 5 0 004.24-2.34l-1.46-1.46A3 3 0 019 12v-.17L7.06 9.9A5 5 0 0012 17zm-1-11.83V5a1 1 0 012 0v.17l-2-2z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.93V21h2v-2.07A7 7 0 0019 12h-2z" />
    </svg>
  );
}

function CameraIcon({ off: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M2 3.18L3.41 1.77 22 20.36l-1.41 1.41-3.02-3.02a1 1 0 01-.57.19H4a1 1 0 01-1-1V8a1 1 0 011-1h1.18L2 3.18zM17 10.5V7a1 1 0 00-1-1H8.83l9.99 9.99L17 14.5v-4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 01-.6.92c-.86.37-1.65.85-2.35 1.4a1 1 0 01-1.33-.08l-1.9-1.9a1 1 0 01.02-1.44C3.85 9.4 7.72 8 12 8s8.15 1.4 10.76 3.72a1 1 0 01.02 1.44l-1.9 1.9a1 1 0 01-1.33.08 12.6 12.6 0 00-2.35-1.4 1 1 0 01-.6-.92v-3.1A15 15 0 0012 9z" />
    </svg>
  );
}

function SpeakerToggleIcon({ on: e }) {
  return e ? (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4.03v8.05A4.5 4.5 0 0016.5 12zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.59 2l2.7-2.7-1.41-1.41L15.17 10l-2.7-2.7-1.41 1.41L13.76 11l-2.7 2.7 1.41 1.41 2.7-2.7 2.7 2.7 1.41-1.41L16.59 11z" />
    </svg>
  );
}

function useAudioOutputs() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(``),
    i =
      typeof window < `u` &&
      window.HTMLMediaElement &&
      typeof HTMLMediaElement.prototype.setSinkId == `function`;
  (0, React.useEffect)(() => {
    i &&
      navigator.mediaDevices
        .enumerateDevices()
        .then((e) => t(e.filter((e) => e.kind === `audiooutput`)))
        .catch(() => {});
  }, [i]);
  let a = e.find((e) => /speaker/i.test(e.label)),
    o = i && !!a;
  return {
    speakerAvailable: o,
    isSpeakerOn: o && n === a.deviceId,
    toggleSpeaker: () => {
      a && r((e) => (e === a.deviceId ? `` : a.deviceId));
    },
    sinkId: n,
  };
}

async function Yo(e, t) {
  if (e && typeof e.setSinkId == `function`)
    try {
      await e.setSinkId(t);
    } catch {}
}

var Xo = (e, t = `#fff`) => ({
  width: 52,
  height: 52,
  borderRadius: `50%`,
  border: `none`,
  cursor: `pointer`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  background: e,
  color: t,
  boxShadow: `0 6px 20px rgba(0,0,0,0.25)`,
  transition: `transform 0.15s`,
});

function CallAvatar({ name: e, size: t = 96 }) {
  let n = (e || `?`).trim().charAt(0).toUpperCase() || `?`;
  return (
    <div
      style={{
        width: t,
        height: t,
        borderRadius: `50%`,
        background: `linear-gradient(135deg, #2D6A4F, #74C69D)`,
        color: `#fff`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        fontFamily: `'Playfair Display', serif`,
        fontSize: t * 0.4,
        fontWeight: 700,
        boxShadow: `0 8px 28px rgba(27,58,75,0.3)`,
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

var Qo = {
  position: `fixed`,
  inset: 0,
  zIndex: 600,
  background: `linear-gradient(160deg, #0d2418 0%, #1B3A4B 100%)`,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `stretch`,
  fontFamily: `'DM Sans', sans-serif`,
  color: `#fff`,
  overflowY: `auto`,
  boxSizing: `border-box`,
  paddingTop: `max(20px, env(safe-area-inset-top))`,
  paddingBottom: `max(20px, env(safe-area-inset-bottom))`,
  paddingLeft: `max(16px, env(safe-area-inset-left))`,
  paddingRight: `max(16px, env(safe-area-inset-right))`,
};

var $o = {
  position: `relative`,
  zIndex: 2,
  flex: 1,
  minHeight: 0,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `center`,
  justifyContent: `center`,
  gap: 14,
};

var es = {
  position: `relative`,
  zIndex: 2,
  flexShrink: 0,
  display: `flex`,
  justifyContent: `center`,
  gap: 20,
  paddingTop: 24,
};

var ts = {
  background: `rgba(192,57,43,0.85)`,
  padding: `6px 16px`,
  borderRadius: 20,
  fontSize: 12,
  fontWeight: 600,
};

function VideoTile({
  name: e,
  stream: t,
  isVideoCall: n,
  isLocal: r,
  sinkId: i,
}) {
  let a = (0, React.useRef)(null),
    o = (0, React.useRef)(null),
    s = n && !!t;
  return (
    (0, React.useEffect)(() => {
      a.current && (a.current.srcObject = t || null);
    }, [t]),
    (0, React.useEffect)(() => {
      o.current && (o.current.srcObject = t || null);
    }, [t]),
    (0, React.useEffect)(() => {
      (Yo(a.current, i), Yo(o.current, i));
    }, [i]),
    (
      <div
        style={{
          position: `relative`,
          borderRadius: 14,
          overflow: `hidden`,
          background: `#12291d`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          aspectRatio: `4/3`,
        }}
      >
        {s ? (
          <video
            ref={a}
            autoPlay={!0}
            playsInline={!0}
            muted={!0}
            style={{ width: `100%`, height: `100%`, objectFit: `cover` }}
          />
        ) : (
          <CallAvatar name={e} size={56} />
        )}
        {!r && <audio ref={o} autoPlay={!0} style={{ display: `none` }} />}
        <div
          style={{
            position: `absolute`,
            bottom: 6,
            left: 8,
            fontSize: 11,
            fontWeight: 600,
            textShadow: `0 1px 4px rgba(0,0,0,0.6)`,
          }}
        >
          {r ? `You` : e || `Someone`}
        </div>
      </div>
    )
  );
}

function CallScreen({
  groupCall: e,
  groupParticipants: t,
  localStream: n,
  isMuted: r,
  isCameraOff: i,
  errorBanner: a,
  acceptGroupCall: o,
  declineGroupCall: s,
  leaveGroupCall: c,
  toggleMute: l,
  toggleCamera: u,
  speakerAvailable: d,
  isSpeakerOn: f,
  toggleSpeaker: p,
  sinkId: m,
}) {
  let h = e.type === `video`,
    g = e.status === `incoming`,
    _ = Array.from(t.entries()),
    v = _.length + 1;
  if (g)
    return (
      <div style={Qo}>
        <div style={$o}>
          <CallAvatar name={e.groupName} />
          <div
            style={{
              fontFamily: `'Playfair Display', serif`,
              fontSize: 24,
              fontWeight: 700,
              textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
            }}
          >
            {e.groupName || `Group`}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, letterSpacing: `0.04em` }}>
            {"Incoming group "}
            {h ? `video` : `voice`}
            {" call…"}
          </div>
          {a && <div style={ts}>{a}</div>}
        </div>
        <div style={es}>
          <button style={Xo(`#C0392B`)} onClick={s} title="Decline">
            <SpeakerIcon />
          </button>
          <button style={Xo(`#2D6A4F`)} onClick={o} title="Accept">
            <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
        </div>
      </div>
    );
  let y = v <= 1 ? 1 : v <= 4 ? 2 : 3;
  return (
    <div style={Qo}>
      <div
        style={{
          position: `relative`,
          zIndex: 2,
          flex: 1,
          minHeight: 0,
          overflowY: `auto`,
          width: `100%`,
          maxWidth: 720,
          margin: `0 auto`,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 20,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {e.groupName || `Group call`}
        </div>
        <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: `0.04em` }}>
          {e.status === `connecting` ? `Connecting…` : `${v} in call`}
        </div>
        {a && <div style={ts}>{a}</div>}
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(${y}, 1fr)`,
            gap: 10,
            width: `100%`,
          }}
        >
          <VideoTile
            name="You"
            stream={n}
            isVideoCall={h}
            isLocal={!0}
            sinkId={m}
          />
          {_.map(([e, t]) => (
            <VideoTile
              key={e}
              name={t.name}
              stream={t.stream}
              isVideoCall={h}
              isLocal={!1}
              sinkId={m}
            />
          ))}
        </div>
      </div>
      <div style={es}>
        <button
          style={Xo(
            r ? `#fff` : `rgba(255,255,255,0.18)`,
            r ? `#1B3A4B` : `#fff`,
          )}
          onClick={l}
          title={r ? `Unmute` : `Mute`}
        >
          <MicIcon muted={r} />
        </button>
        {h && (
          <button
            style={Xo(
              i ? `#fff` : `rgba(255,255,255,0.18)`,
              i ? `#1B3A4B` : `#fff`,
            )}
            onClick={u}
            title={i ? `Turn camera on` : `Turn camera off`}
          >
            <CameraIcon off={i} />
          </button>
        )}
        {d && (
          <button
            style={Xo(
              f ? `#fff` : `rgba(255,255,255,0.18)`,
              f ? `#1B3A4B` : `#fff`,
            )}
            onClick={p}
            title={f ? `Switch to earpiece` : `Switch to speaker`}
          >
            <SpeakerToggleIcon on={f} />
          </button>
        )}
        <button style={Xo(`#C0392B`)} onClick={c} title="Leave call">
          <SpeakerIcon />
        </button>
      </div>
    </div>
  );
}

var is = { declined: `🚫`, "no-answer": `📵`, busy: `📵` };

function CallNotice({ notice: e, onDismiss: t }) {
  return (
    <div style={Qo}>
      <button
        onClick={t}
        aria-label="Close"
        style={{
          position: `absolute`,
          top: 20,
          right: 20,
          zIndex: 2,
          background: `rgba(255,255,255,0.14)`,
          border: `none`,
          borderRadius: `50%`,
          width: 36,
          height: 36,
          color: `#fff`,
          fontSize: 16,
          cursor: `pointer`,
        }}
      >
        ✕
      </button>
      <div style={{ ...$o, textAlign: `center` }}>
        <div style={{ fontSize: 46, marginBottom: 6 }}>
          {is[e.reason] || `📵`}
        </div>
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 26,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {e.title}
        </div>
        {e.subtitle && (
          <div style={{ fontSize: 13.5, opacity: 0.75, maxWidth: 280 }}>
            {e.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function CallOverlay() {
  let {
      callStatus: e,
      activeCall: t,
      localStream: n,
      remoteStream: r,
      isMuted: i,
      isCameraOff: a,
      callError: o,
      callDurationSec: s,
      acceptCall: c,
      declineCall: l,
      endCall: u,
      toggleMute: d,
      toggleCamera: f,
      clearCallError: p,
      groupCall: m,
      groupParticipants: h,
      acceptGroupCall: g,
      declineGroupCall: _,
      leaveGroupCall: y,
      callEndNotice: b,
      dismissCallEndNotice: x,
    } = useCall(),
    S = (0, React.useRef)(null),
    C = (0, React.useRef)(null),
    w = (0, React.useRef)(null),
    [T, E] = (0, React.useState)(null),
    {
      speakerAvailable: ee,
      isSpeakerOn: D,
      toggleSpeaker: O,
      sinkId: k,
    } = useAudioOutputs();
  if (
    ((0, React.useEffect)(() => {
      S.current && (S.current.srcObject = n || null);
    }, [n]),
    (0, React.useEffect)(() => {
      (C.current && (C.current.srcObject = r || null),
        w.current && (w.current.srcObject = r || null));
    }, [r]),
    (0, React.useEffect)(() => {
      (Yo(C.current, k), Yo(w.current, k));
    }, [k]),
    (0, React.useEffect)(() => {
      if (!o) return;
      E(o);
      let e = setTimeout(() => {
        (E(null), p());
      }, 3500);
      return () => clearTimeout(e);
    }, [o]),
    b)
  )
    return <CallNotice notice={b} onDismiss={x} />;
  if (e === `idle` && !m)
    return T ? (
      <div
        style={{
          position: `fixed`,
          top: 80,
          left: `50%`,
          transform: `translateX(-50%)`,
          zIndex: 500,
        }}
      >
        <div
          style={{
            background: `#fff5f5`,
            border: `1.5px solid #f5c6c6`,
            color: `#C0392B`,
            padding: `12px 20px`,
            borderRadius: 16,
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: `0 8px 24px rgba(27,58,75,0.15)`,
          }}
        >
          {T}
        </div>
      </div>
    ) : null;
  if (m)
    return (
      <CallScreen
        groupCall={m}
        groupParticipants={h}
        localStream={n}
        isMuted={i}
        isCameraOff={a}
        errorBanner={T}
        acceptGroupCall={g}
        declineGroupCall={_}
        leaveGroupCall={y}
        toggleMute={d}
        toggleCamera={f}
        speakerAvailable={ee}
        isSpeakerOn={D}
        toggleSpeaker={O}
        sinkId={k}
      />
    );
  if (!t) return null;
  let A = t.type === `video`,
    te = () => {
      (c(),
        w.current?.play?.().catch(() => {}),
        C.current?.play?.().catch(() => {}));
    };
  return (
    <div style={Qo}>
      {A && (
        <video
          ref={C}
          autoPlay={!0}
          playsInline={!0}
          muted={!0}
          style={{
            position: `absolute`,
            inset: 0,
            width: `100%`,
            height: `100%`,
            objectFit: `cover`,
            background: `#0d2418`,
          }}
        />
      )}
      <audio ref={w} autoPlay={!0} style={{ display: `none` }} />
      {A &&
        n &&
        (e === `outgoing-ringing` ||
          e === `connecting` ||
          e === `connected`) && (
          <video
            ref={S}
            autoPlay={!0}
            playsInline={!0}
            muted={!0}
            style={{
              position: `absolute`,
              ...(e === `connected`
                ? {
                    bottom: 110,
                    right: 20,
                    width: 110,
                    height: 150,
                    borderRadius: 16,
                    border: `2px solid rgba(255,255,255,0.3)`,
                  }
                : { inset: 0, width: `100%`, height: `100%`, borderRadius: 0 }),
              objectFit: `cover`,
              zIndex: 1,
            }}
          />
        )}
      <div style={$o}>
        {!(A && e === `connected`) && <CallAvatar name={t.peerName} />}
        <div
          style={{
            fontFamily: `'Playfair Display', serif`,
            fontSize: 24,
            fontWeight: 700,
            textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
          }}
        >
          {t.peerName || `Unknown`}
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, letterSpacing: `0.04em` }}>
          {e === `incoming-ringing` &&
            `Incoming ${A ? `video` : `voice`} call…`}
          {e === `outgoing-ringing` && `Calling…`}
          {e === `connecting` && `Connecting…`}
          {e === `connected` && Ho(s)}
        </div>
        {e === `outgoing-ringing` && t.calleeMaybeUnavailable && (
          <div
            style={{
              fontSize: 11.5,
              opacity: 0.65,
              maxWidth: 260,
              textAlign: `center`,
            }}
          >
            They may not be online right now — this might not reach them.
          </div>
        )}
        {T && (
          <div
            style={{
              background: `rgba(192,57,43,0.85)`,
              padding: `6px 16px`,
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {T}
          </div>
        )}
      </div>
      <div style={es}>
        {e === `incoming-ringing` ? (
          <>
            <button
              style={Xo(`#C0392B`)}
              onClick={() => l(`declined`)}
              title="Decline"
            >
              <SpeakerIcon />
            </button>
            <button style={Xo(`#2D6A4F`)} onClick={te} title="Accept">
              <svg viewBox="0 0 24 24" fill="currentColor" style={Uo}>
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {(e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  i ? `#fff` : `rgba(255,255,255,0.18)`,
                  i ? `#1B3A4B` : `#fff`,
                )}
                onClick={d}
                title={i ? `Unmute` : `Mute`}
              >
                <MicIcon muted={i} />
              </button>
            )}
            {A && (e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  a ? `#fff` : `rgba(255,255,255,0.18)`,
                  a ? `#1B3A4B` : `#fff`,
                )}
                onClick={f}
                title={a ? `Turn camera on` : `Turn camera off`}
              >
                <CameraIcon off={a} />
              </button>
            )}
            {ee && (e === `connecting` || e === `connected`) && (
              <button
                style={Xo(
                  D ? `#fff` : `rgba(255,255,255,0.18)`,
                  D ? `#1B3A4B` : `#fff`,
                )}
                onClick={O}
                title={D ? `Switch to earpiece` : `Switch to speaker`}
              >
                <SpeakerToggleIcon on={D} />
              </button>
            )}
            <button style={Xo(`#C0392B`)} onClick={u} title="Hang up">
              <SpeakerIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export { CallOverlay };
