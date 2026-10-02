import * as React from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { getSocket } from "../lib/socket";

var CallContext = (0, React.createContext)(null);

function useCall() {
  let e = (0, React.useContext)(CallContext);
  if (!e) throw Error(`useCall must be used within a CallProvider`);
  return e;
}

var jo = null;

function getAudioContext() {
  let e = window.AudioContext || window.webkitAudioContext;
  return e
    ? ((jo ||= new e()),
      jo.state === `suspended` && jo.resume().catch(() => {}),
      jo)
    : null;
}

function No(e, t) {
  let n = null,
    r = !1;
  function i(a) {
    if (!r) return;
    let o = e[a % e.length],
      s = getAudioContext();
    if (s && o.freqs.length) {
      let e = s.createGain();
      ((e.gain.value = t), e.connect(s.destination));
      let n = s.currentTime,
        r = n + o.duration / 1e3;
      for (let t of o.freqs) {
        let i = s.createOscillator();
        ((i.type = `sine`),
          (i.frequency.value = t),
          i.connect(e),
          i.start(n),
          i.stop(r));
      }
    }
    n = setTimeout(() => i(a + 1), o.duration);
  }
  return {
    start() {
      r || ((r = !0), i(0));
    },
    stop() {
      ((r = !1), (n &&= (clearTimeout(n), null)));
    },
  };
}

var Po = No(
  [
    { freqs: [440, 480], duration: 1e3 },
    { freqs: [], duration: 3e3 },
  ],
  0.08,
);

var Fo = No(
  [
    { freqs: [950], duration: 350 },
    { freqs: [], duration: 150 },
    { freqs: [950], duration: 350 },
    { freqs: [], duration: 1400 },
  ],
  0.12,
);

var Io = 4500;

var Lo = 45e3;

var Ro = {
  audio: { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 },
  video: !1,
};

var zo = {
  audio: { echoCancellation: !0, noiseSuppression: !0, autoGainControl: !0 },
  video: {
    facingMode: `user`,
    width: { ideal: 640 },
    height: { ideal: 480 },
  },
};

async function Bo(e) {
  let t =
      e === `video`
        ? [
            zo,
            {
              audio: {
                echoCancellation: !0,
                noiseSuppression: !0,
                autoGainControl: !0,
              },
              video: !0,
            },
            { audio: !0, video: !0 },
          ]
        : [Ro, { audio: !0, video: !1 }],
    n;
  for (let e of t)
    try {
      return await navigator.mediaDevices.getUserMedia(e);
    } catch (e) {
      n = e;
    }
  throw n;
}

function CallProvider({ children: e }) {
  let { isAuthenticated: t, user: n } = useAuth(),
    [r, i] = (0, React.useState)(`idle`),
    [a, o] = (0, React.useState)(null),
    [s, c] = (0, React.useState)(null),
    [l, u] = (0, React.useState)(null),
    [d, f] = (0, React.useState)(!1),
    [p, m] = (0, React.useState)(!1),
    [h, g] = (0, React.useState)(null),
    [_, y] = (0, React.useState)(0),
    [b, x] = (0, React.useState)(null),
    [S, C] = (0, React.useState)(null),
    [w, T] = (0, React.useState)(new Map()),
    E = (0, React.useRef)(null),
    ee = (0, React.useRef)([]),
    D = (0, React.useRef)(null),
    O = (0, React.useRef)(null),
    k = (0, React.useRef)(null),
    A = (0, React.useRef)(null),
    te = (0, React.useRef)(null),
    ne = (0, React.useRef)(null),
    re = (0, React.useRef)(null),
    ie = (0, React.useRef)(`idle`),
    j = (0, React.useRef)(new Map()),
    M = (0, React.useRef)(null),
    ae = (0, React.useRef)(null),
    oe = (0, React.useRef)(null);
  ((0, React.useEffect)(() => {
    re.current = a;
  }, [a]),
    (0, React.useEffect)(() => {
      ie.current = r;
    }, [r]),
    (0, React.useEffect)(() => {
      M.current = S;
    }, [S]),
    (0, React.useEffect)(() => {
      oe.current = s;
    }, [s]));
  let se = () => {
      k.current &&= (clearTimeout(k.current), null);
    },
    ce = () => {
      A.current &&= (clearTimeout(A.current), null);
    },
    N = () => {
      te.current &&= (clearInterval(te.current), null);
    },
    P = () => {
      ae.current &&= (clearTimeout(ae.current), null);
    },
    F = (0, React.useCallback)(() => {
      if ((se(), ce(), N(), E.current)) {
        try {
          E.current.close();
        } catch {}
        E.current = null;
      }
      (c((e) => (e?.getTracks().forEach((e) => e.stop()), null)),
        u(null),
        (ee.current = []),
        (D.current = null),
        (O.current = null),
        i(`idle`),
        o(null),
        f(!1),
        m(!1),
        y(0));
    }, []),
    le = (0, React.useCallback)(() => {
      P();
      for (let { pc: e } of j.current.values())
        try {
          e.close();
        } catch {}
      (j.current.clear(),
        T(new Map()),
        c((e) => (e?.getTracks().forEach((e) => e.stop()), null)),
        C(null));
    }, []),
    ue = (0, React.useCallback)(async () => {
      if (ne.current) return ne.current;
      let e = await api.get(`/calls/ice-servers`);
      return ((ne.current = e.iceServers), e.iceServers);
    }, []),
    de = (0, React.useCallback)(
      async (e, t) => {
        let n = await ue(),
          r = new RTCPeerConnection({ iceServers: n });
        return (
          (E.current = r),
          t.getTracks().forEach((e) => r.addTrack(e, t)),
          (r.onicecandidate = (t) => {
            t.candidate &&
              getSocket()?.emit(`call:ice-candidate`, {
                sessionId: e,
                candidate: t.candidate.toJSON(),
              });
          }),
          (r.ontrack = (e) => u(e.streams[0])),
          (r.onconnectionstatechange = () => {
            if (r.connectionState === `connected`)
              (se(),
                i(`connected`),
                (te.current ||= setInterval(() => y((e) => e + 1), 1e3)));
            else if (r.connectionState === `failed`) {
              g(`Connection failed. Please try again.`);
              let e = re.current?.sessionId;
              (e &&
                getSocket()?.emit(`call:reject`, {
                  sessionId: e,
                  reason: `error`,
                }),
                F());
            }
          }),
          r
        );
      },
      [ue, F],
    ),
    fe = (0, React.useCallback)(async () => {
      let e = E.current;
      if (e) {
        for (let t of ee.current)
          try {
            await e.addIceCandidate(t);
          } catch {}
        ee.current = [];
      }
    }, []),
    pe = (0, React.useCallback)(
      async (e, t, n) => {
        let r = await ue(),
          i = new RTCPeerConnection({ iceServers: r });
        return (
          n.getTracks().forEach((e) => i.addTrack(e, n)),
          (i.onicecandidate = (n) => {
            n.candidate &&
              getSocket()?.emit(`call:group-ice-candidate`, {
                sessionId: e,
                targetUserId: t,
                candidate: n.candidate.toJSON(),
              });
          }),
          (i.ontrack = (e) => {
            T((n) => {
              let r = n.get(t);
              if (!r) return n;
              let i = new Map(n);
              return (i.set(t, { ...r, stream: e.streams[0] }), i);
            });
          }),
          (i.onconnectionstatechange = () => {
            T((e) => {
              let n = e.get(t);
              if (!n) return e;
              let r = new Map(e);
              return (
                r.set(t, { ...n, connectionState: i.connectionState }),
                r
              );
            });
          }),
          j.current.set(t, { pc: i, pendingCandidates: [] }),
          i
        );
      },
      [ue],
    ),
    me = (0, React.useCallback)(
      async (e, t, r, i, a) => {
        let o;
        try {
          o = await Bo(t);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            C(null));
          return;
        }
        (c(o),
          C({
            sessionId: e,
            conversationId: r,
            type: t,
            groupName: i,
            status: `connecting`,
            direction: a,
          }));
        let s;
        try {
          s = await api.post(`/calls/sessions/${e}/join`);
        } catch (e) {
          (g(e.message || `Could not join the call.`),
            o.getTracks().forEach((e) => e.stop()),
            c(null),
            C(null));
          return;
        }
        let l = n?.id;
        for (let t of s.participants) {
          T((e) => {
            let n = new Map(e);
            return (
              n.set(t.userId, {
                name: t.name,
                avatarUrl: t.avatarUrl,
                stream: null,
                connectionState: `new`,
              }),
              n
            );
          });
          let n = await pe(e, t.userId, o);
          if (l && l < t.userId)
            try {
              let r = await n.createOffer();
              (await n.setLocalDescription(r),
                getSocket()?.emit(`call:group-offer`, {
                  sessionId: e,
                  targetUserId: t.userId,
                  sdp: { type: r.type, sdp: r.sdp },
                }));
            } catch {}
        }
        C((t) => (t && t.sessionId === e ? { ...t, status: `active` } : t));
      },
      [pe, n],
    ),
    he = (0, React.useCallback)(
      async (e, t, n) => {
        if (ie.current !== `idle` || M.current) return;
        g(null);
        let r;
        try {
          r = await api.post(`/calls/sessions`, { conversationId: e, type: n });
        } catch (e) {
          g(e.message || `Could not start the call.`);
          return;
        }
        if (r.reused) {
          await me(r.sessionId, r.type, e, t, `outgoing`);
          return;
        }
        let i;
        try {
          i = await Bo(n);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            api.post(`/calls/sessions/${r.sessionId}/leave`).catch(() => {}));
          return;
        }
        (c(i),
          C({
            sessionId: r.sessionId,
            conversationId: e,
            type: n,
            groupName: t,
            status: `active`,
            direction: `outgoing`,
          }));
      },
      [me],
    ),
    ge = (0, React.useCallback)(async () => {
      let e = M.current;
      !e ||
        e.status !== `incoming` ||
        (P(),
        await me(
          e.sessionId,
          e.type,
          e.conversationId,
          e.groupName,
          `incoming`,
        ));
    }, [me]),
    _e = (0, React.useCallback)(() => {
      (P(), C(null));
    }, []),
    ve = (0, React.useCallback)(() => {
      let e = M.current;
      e &&
        (api.post(`/calls/sessions/${e.sessionId}/leave`).catch(() => {}),
        le());
    }, [le]),
    ye = (0, React.useCallback)(
      async (e, t, n, r = {}) => {
        if (ie.current !== `idle` || M.current) return;
        g(null);
        let a;
        try {
          a = await api.post(`/calls/sessions`, { conversationId: e, type: n });
        } catch (e) {
          g(e.message || `Could not start the call.`);
          return;
        }
        (o({
          sessionId: a.sessionId,
          conversationId: e,
          type: n,
          peerUserId: t,
          peerName: r.peerName,
          peerAvatarEmoji: r.peerAvatarEmoji,
          direction: `outgoing`,
          calleeMaybeUnavailable: a.calleeOnline === !1,
        }),
          i(`outgoing-ringing`));
        let s = () =>
            getSocket()?.emit(`call:reject`, {
              sessionId: a.sessionId,
              reason: `error`,
            }),
          l;
        try {
          l = await Bo(n);
        } catch {
          (g(`Could not access camera/microphone. Check your permissions.`),
            s(),
            F());
          return;
        }
        c(l);
        let u = await de(a.sessionId, l);
        try {
          let e = await u.createOffer();
          (await u.setLocalDescription(e),
            getSocket()?.emit(
              `call:offer`,
              { sessionId: a.sessionId, sdp: { type: e.type, sdp: e.sdp } },
              (e) => {
                e?.ok || (g(`Could not reach the other person.`), s(), F());
              },
            ));
        } catch {
          (g(`Could not start the call.`), s(), F());
          return;
        }
        k.current = setTimeout(() => {
          let e = re.current?.peerName;
          (x({
            reason: `no-answer`,
            title: `No Answer`,
            subtitle: e ? `${e} didn't pick up.` : void 0,
          }),
            api.post(`/calls/sessions/${a.sessionId}/end`).catch(() => {}),
            F());
        }, Lo);
      },
      [de, F],
    ),
    I = (0, React.useCallback)(async () => {
      let e = re.current;
      if (ie.current !== `incoming-ringing` || !e) return;
      ce();
      let t;
      try {
        t = await Bo(e.type);
      } catch {
        (g(`Could not access camera/microphone. Check your permissions.`),
          getSocket()?.emit(`call:reject`, {
            sessionId: e.sessionId,
            reason: `no-media-permission`,
          }),
          F());
        return;
      }
      (c(t), i(`connecting`));
      let n = await de(e.sessionId, t),
        r = async (t) => {
          (await n.setRemoteDescription(t), await fe());
          let r = await n.createAnswer();
          (await n.setLocalDescription(r),
            getSocket()?.emit(`call:answer`, {
              sessionId: e.sessionId,
              sdp: { type: r.type, sdp: r.sdp },
            }));
        };
      if (D.current?.sessionId === e.sessionId) {
        let { sdp: e } = D.current;
        ((D.current = null), await r(e));
      } else O.current = r;
    }, [de, fe, F]),
    be = (0, React.useCallback)(
      (e = `declined`) => {
        let t = re.current;
        (t &&
          getSocket()?.emit(`call:reject`, {
            sessionId: t.sessionId,
            reason: e,
          }),
          F());
      },
      [F],
    ),
    xe = (0, React.useCallback)(() => {
      let e = re.current;
      ie.current === `idle` ||
        !e ||
        (api.post(`/calls/sessions/${e.sessionId}/end`).catch(() => {}), F());
    }, [F]),
    Se = (0, React.useCallback)(() => {
      f((e) => {
        let t = !e;
        return (
          s?.getAudioTracks().forEach((e) => {
            e.enabled = !t;
          }),
          t
        );
      });
    }, [s]),
    Ce = (0, React.useCallback)(() => {
      m((e) => {
        let t = !e;
        return (
          s?.getVideoTracks().forEach((e) => {
            e.enabled = !t;
          }),
          t
        );
      });
    }, [s]),
    we = (0, React.useCallback)(() => g(null), []);
  ((0, React.useEffect)(() => {
    r === `outgoing-ringing` ? Po.start() : Po.stop();
  }, [r]),
    (0, React.useEffect)(() => {
      r === `incoming-ringing` || S?.status === `incoming`
        ? Fo.start()
        : Fo.stop();
    }, [r, S?.status]));
  let Te = (0, React.useRef)(!1);
  (0, React.useEffect)(() => {
    if (!b) return;
    (window.history.pushState({ callEndNoticeOpen: !0 }, ``),
      (Te.current = !0));
    let e = () => {
      ((Te.current = !1), x(null));
    };
    window.addEventListener(`popstate`, e);
    let t = setTimeout(() => {
      Te.current ? window.history.back() : x(null);
    }, Io);
    return () => {
      (window.removeEventListener(`popstate`, e), clearTimeout(t));
    };
  }, [b]);
  let Ee = (0, React.useCallback)(() => {
    Te.current ? window.history.back() : x(null);
  }, []);
  ((0, React.useEffect)(() => {
    if (!t) return;
    let e = getSocket();
    if (!e) return;
    let r = async (t) => {
        if (ie.current !== `idle` || M.current) {
          e.emit(`call:reject`, { sessionId: t.sessionId, reason: `busy` });
          return;
        }
        let n = `Someone`;
        try {
          let e = (
            await api.get(`/messaging/conversations/summary`)
          ).items.find((e) => e.conversationId === t.conversationId);
          e?.other?.displayName && (n = e.other.displayName);
        } catch {}
        (o({
          sessionId: t.sessionId,
          conversationId: t.conversationId,
          type: t.type,
          peerUserId: t.from,
          peerName: n,
          peerAvatarEmoji: `🙂`,
          direction: `incoming`,
        }),
          i(`incoming-ringing`),
          (A.current = setTimeout(() => {
            (e.emit(`call:reject`, {
              sessionId: t.sessionId,
              reason: `timeout`,
            }),
              F());
          }, Lo)));
      },
      a = async (e) => {
        let t = re.current;
        if (!(!t || t.sessionId !== e.sessionId))
          if (O.current) {
            let t = O.current;
            ((O.current = null), await t(e.sdp));
          } else D.current = { sessionId: e.sessionId, sdp: e.sdp };
      },
      s = async (e) => {
        let t = re.current;
        if (!(!t || t.sessionId !== e.sessionId || !E.current)) {
          se();
          try {
            (await E.current.setRemoteDescription(e.sdp),
              await fe(),
              i(`connecting`));
          } catch {}
        }
      },
      c = async (e) => {
        let t = re.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = E.current;
        if (n?.remoteDescription)
          try {
            await n.addIceCandidate(e.candidate);
          } catch {}
        else ee.current.push(e.candidate);
      },
      l = (e) => {
        let t = re.current;
        !t ||
          t.sessionId !== e.sessionId ||
          (e.reason === `busy`
            ? x({
                reason: `busy`,
                title: `Unavailable`,
                subtitle: `They're on another call.`,
              })
            : e.reason === `declined`
              ? x({
                  reason: `declined`,
                  title: `Call Declined`,
                  subtitle: t.peerName
                    ? `${t.peerName} declined your call.`
                    : void 0,
                })
              : e.reason === `timeout`
                ? x({
                    reason: `no-answer`,
                    title: `No Answer`,
                    subtitle: t.peerName
                      ? `${t.peerName} didn't pick up.`
                      : void 0,
                  })
                : g(`Call ended.`),
          F());
      },
      u = (e) => {
        let t = re.current;
        !t || t.sessionId !== e.sessionId || F();
      },
      d = (e) => {
        ie.current !== `idle` ||
          M.current ||
          (C({
            sessionId: e.sessionId,
            conversationId: e.conversationId,
            type: e.type,
            groupName: e.groupName,
            status: `incoming`,
            direction: `incoming`,
          }),
          (ae.current = setTimeout(() => {
            C((t) =>
              t?.sessionId === e.sessionId && t.status === `incoming`
                ? null
                : t,
            );
          }, Lo)));
      },
      f = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let r = oe.current;
        if (!r) return;
        T((t) => {
          let n = new Map(t);
          return (
            n.set(e.userId, {
              name: e.name,
              avatarUrl: e.avatarUrl,
              stream: null,
              connectionState: `new`,
            }),
            n
          );
        });
        let i = await pe(e.sessionId, e.userId, r),
          a = n?.id;
        if (a && a < e.userId)
          try {
            let t = await i.createOffer();
            (await i.setLocalDescription(t),
              getSocket()?.emit(`call:group-offer`, {
                sessionId: e.sessionId,
                targetUserId: e.userId,
                sdp: { type: t.type, sdp: t.sdp },
              }));
          } catch {}
      },
      p = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (!n) {
          let t = oe.current;
          if (!t) return;
          (await pe(e.sessionId, e.from, t), (n = j.current.get(e.from)));
        }
        let { pc: r } = n;
        try {
          await r.setRemoteDescription(e.sdp);
          for (let e of n.pendingCandidates)
            try {
              await r.addIceCandidate(e);
            } catch {}
          n.pendingCandidates = [];
          let t = await r.createAnswer();
          (await r.setLocalDescription(t),
            getSocket()?.emit(`call:group-answer`, {
              sessionId: e.sessionId,
              targetUserId: e.from,
              sdp: { type: t.type, sdp: t.sdp },
            }));
        } catch {}
      },
      m = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (n)
          try {
            await n.pc.setRemoteDescription(e.sdp);
            for (let e of n.pendingCandidates)
              try {
                await n.pc.addIceCandidate(e);
              } catch {}
            n.pendingCandidates = [];
          } catch {}
      },
      h = async (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.from);
        if (n)
          if (n.pc.remoteDescription)
            try {
              await n.pc.addIceCandidate(e.candidate);
            } catch {}
          else n.pendingCandidates.push(e.candidate);
      },
      _ = (e) => {
        let t = M.current;
        if (!t || t.sessionId !== e.sessionId) return;
        let n = j.current.get(e.userId);
        if (n) {
          try {
            n.pc.close();
          } catch {}
          j.current.delete(e.userId);
        }
        T((t) => {
          let n = new Map(t);
          return (n.delete(e.userId), n);
        });
      };
    return (
      e.on(`call:incoming`, r),
      e.on(`call:offer`, a),
      e.on(`call:answer`, s),
      e.on(`call:ice-candidate`, c),
      e.on(`call:rejected`, l),
      e.on(`call:ended`, u),
      e.on(`call:group-incoming`, d),
      e.on(`call:group-participant-joined`, f),
      e.on(`call:group-offer`, p),
      e.on(`call:group-answer`, m),
      e.on(`call:group-ice-candidate`, h),
      e.on(`call:group-participant-left`, _),
      () => {
        (e.off(`call:incoming`, r),
          e.off(`call:offer`, a),
          e.off(`call:answer`, s),
          e.off(`call:ice-candidate`, c),
          e.off(`call:rejected`, l),
          e.off(`call:ended`, u),
          e.off(`call:group-incoming`, d),
          e.off(`call:group-participant-joined`, f),
          e.off(`call:group-offer`, p),
          e.off(`call:group-answer`, m),
          e.off(`call:group-ice-candidate`, h),
          e.off(`call:group-participant-left`, _));
      }
    );
  }, [t, fe, F, pe, n]),
    (0, React.useEffect)(() => {
      t || (F(), le());
    }, [t]),
    (0, React.useEffect)(() => {
      if (!t) return;
      let e = () => {
        if (document.visibilityState !== `visible`) return;
        let e = getSocket();
        e && !e.connected && e.connect();
      };
      return (
        document.addEventListener(`visibilitychange`, e),
        window.addEventListener(`focus`, e),
        () => {
          (document.removeEventListener(`visibilitychange`, e),
            window.removeEventListener(`focus`, e));
        }
      );
    }, [t]));
  let De = {
    callStatus: r,
    activeCall: a,
    localStream: s,
    remoteStream: l,
    isMuted: d,
    isCameraOff: p,
    callError: h,
    callDurationSec: _,
    startCall: ye,
    acceptCall: I,
    declineCall: be,
    endCall: xe,
    toggleMute: Se,
    toggleCamera: Ce,
    clearCallError: we,
    groupCall: S,
    groupParticipants: w,
    startGroupCall: he,
    acceptGroupCall: ge,
    declineGroupCall: _e,
    leaveGroupCall: ve,
    callEndNotice: b,
    dismissCallEndNotice: Ee,
  };
  return <CallContext.Provider value={De}>{e}</CallContext.Provider>;
}

export { CallProvider, useCall };
