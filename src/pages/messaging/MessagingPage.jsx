import { Link, useSearchParams } from "react-router-dom";
import * as React from "react";
import { useCall } from "../../calls/CallProvider";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { Navbar } from "../../components/Navbar";
import { PlanBadge } from "../../components/PlanBadge";
import { ProfileModal } from "../../components/ProfileModal";
import { ReportBlockModal } from "../../components/ReportBlockModal";
import { Toast } from "../../components/Toast";
import { UpgradeModal } from "../../components/UpgradeModal";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../lib/api";
import { getSocket } from "../../lib/socket";
import { ConversationListItem } from "./ConversationListItem";
import { CreateGroupModal } from "./CreateGroupModal";
import { GroupSettingsModal } from "./GroupSettingsModal";
import { MessageComposer } from "./MessageComposer";
import { MessageRow } from "./MessageRow";
import { SendImageModal } from "./SendImageModal";

var Aa = { woman: `👩`, man: `🧔`, other: `🧑` };

function MessagingPage() {
  let { user: e } = useAuth(),
    {
      startCall: t,
      startGroupCall: n,
      activeCall: r,
      groupCall: i,
      callStatus: a,
      endCall: o,
      leaveGroupCall: s,
    } = useCall(),
    [c] = useSearchParams(),
    [l, u] = (0, React.useState)([]),
    [d, f] = (0, React.useState)(c.get(`conversation`) || null),
    [p, m] = (0, React.useState)(null),
    [h, g] = (0, React.useState)([]),
    [_, y] = (0, React.useState)(!1),
    [b, x] = (0, React.useState)(``),
    [S, C] = (0, React.useState)(!1),
    [w, T] = (0, React.useState)(``),
    [E, ee] = (0, React.useState)({
      ignoreCalls: !1,
      ignoreVideoCalls: !1,
      readReceipts: !0,
      blocked: !1,
    }),
    [D, O] = (0, React.useState)(!1),
    [k, A] = (0, React.useState)(null),
    [te, ne] = (0, React.useState)(!1),
    [re, ie] = (0, React.useState)(!1),
    [j, M] = (0, React.useState)(!1),
    [ae, oe] = (0, React.useState)(null),
    [se, ce] = (0, React.useState)(null),
    [N, P] = (0, React.useState)(null),
    [F, le] = (0, React.useState)(null),
    [ue, de] = (0, React.useState)(null),
    [fe, pe] = (0, React.useState)(null),
    me = (e, t = `info`) => P({ message: e, tone: t }),
    he = (e) => de(e),
    ge = (e, t, n = {}) => {
      le({
        message: e,
        ...n,
        onConfirm: () => {
          (le(null), t());
        },
      });
    },
    _e = (0, React.useRef)(null),
    ve = (0, React.useRef)(null),
    ye = (0, React.useRef)(null),
    I = l.find((e) => e.conversationId === d) || null,
    be = (0, React.useCallback)(async () => {
      try {
        u((await api.get(`/messaging/conversations/summary`)).items);
      } catch {}
    }, []);
  ((0, React.useEffect)(() => {
    be();
  }, [be]),
    (0, React.useEffect)(() => {
      let e = getSocket();
      if (!e) return;
      let t = (e) => {
          (e.conversationId === d &&
            (g((t) => [...t, e.message]),
            api
              .patch(`/messaging/conversations/${e.conversationId}/read`, {
                messageIds: [e.message.id],
              })
              .catch(() => {})),
            be());
        },
        n = (e) => {
          e.conversationId === d && O(e.isTyping);
        };
      return (
        e.on(`message:new`, t),
        e.on(`typing:update`, n),
        () => {
          (e.off(`message:new`, t), e.off(`typing:update`, n));
        }
      );
    }, [d]),
    (0, React.useEffect)(() => {
      d &&
        (oe(null),
        O(!1),
        (async () => {
          try {
            let t = await api.get(
              `/messaging/conversations/${d}/messages?limit=50`,
            );
            g([...t.items].reverse());
            let n = t.items.filter((t) => t.senderId !== e.id).map((e) => e.id);
            n.length &&
              api
                .patch(`/messaging/conversations/${d}/read`, {
                  messageIds: n,
                })
                .catch(() => {});
          } catch {
            g([]);
          }
        })());
    }, [d]),
    (0, React.useEffect)(() => {
      !d ||
        !I ||
        (I.isGroup
          ? (api
              .get(`/groups/${d}`)
              .then(m)
              .catch(() => m(null)),
            ee({
              ignoreCalls: !1,
              ignoreVideoCalls: !1,
              readReceipts: !0,
              blocked: !1,
            }))
          : (m(null),
            api
              .get(`/messaging/conversations/${d}/settings`)
              .then(ee)
              .catch(() => {})));
    }, [d, I?.isGroup]),
    (0, React.useEffect)(() => {
      _e.current && (_e.current.scrollTop = _e.current.scrollHeight);
    }, [h, D]));
  let xe = (0, React.useCallback)(
      (e) => {
        let t = getSocket();
        !t ||
          !d ||
          !I ||
          I.isGroup ||
          t.emit(e ? `typing:start` : `typing:stop`, {
            conversationId: d,
            targetUserId: I.other?.id,
          });
      },
      [d, I],
    ),
    Se = () => {
      (xe(!0),
        clearTimeout(ye.current),
        (ye.current = setTimeout(() => xe(!1), 2e3)));
    },
    Ce = (e) => {
      (f(e), y(!0), oe(null));
    },
    we = async () => {
      let e = b.trim();
      if (!(!e || E.blocked || !d)) {
        x(``);
        try {
          let t = await api.post(`/messaging/conversations/${d}/messages`, {
            type: `text`,
            text: e,
          });
          (g((e) => [...e, t.message]), be());
        } catch (e) {
          me(e.message || `Could not send that message.`, `error`);
        }
        ve.current?.focus();
      }
    },
    Te = (e) => {
      let t = e.target.files?.[0];
      t &&
        (A({ file: t, url: URL.createObjectURL(t) }),
        ne(!0),
        (e.target.value = ``));
    },
    Ee = async ({ mode: e, duration: t, noScreenshot: n }) => {
      if (!(!k || !d)) {
        ie(!0);
        try {
          let r = new FormData();
          (r.append(`file`, k.file),
            r.append(`purpose`, e === `timed` ? `timed_image` : `chat_image`));
          let i = await api.upload(`/media/upload`, r),
            a =
              e === `timed`
                ? {
                    type: `timed_image`,
                    mediaId: i.mediaId,
                    durationSeconds: t,
                    noScreenshot: n,
                  }
                : { type: `image`, mediaId: i.mediaId },
            o = await api.post(`/messaging/conversations/${d}/messages`, a);
          (g((e) => [...e, o.message]), be(), ne(!1), A(null));
        } catch (e) {
          me(e.message || `Could not send that image.`, `error`);
        } finally {
          ie(!1);
        }
      }
    },
    De = async (e) => {
      let t = { ...E, [e]: !E[e] };
      ee(t);
      try {
        await api.patch(`/messaging/conversations/${d}/settings`, {
          [e]: t[e],
        });
      } catch {
        ee(E);
      }
    },
    Oe = () => {
      ge(
        `Unmatch? They won't be able to contact you again.`,
        async () => {
          try {
            (await api.post(`/messaging/conversations/${d}/unmatch`, {}),
              C(!1),
              f(null),
              be());
          } catch (e) {
            me(e.message || `Could not unmatch.`, `error`);
          }
        },
        { confirmLabel: `Unmatch`, danger: !0 },
      );
    },
    ke = (r) => {
      if (I) {
        if (e?.membership?.plan === `free`) {
          he(`Voice and video calling require a Basic or Premium plan.`);
          return;
        }
        if (I.isGroup) {
          n(d, L.title, r);
          return;
        }
        I.other?.id &&
          t(d, I.other.id, r, {
            peerName: L.title,
            peerAvatarEmoji: L.avatarEmoji,
          });
      }
    },
    Ae = I?.isGroup
      ? i?.conversationId === d
        ? i
        : null
      : r?.conversationId === d && a !== `idle`
        ? r
        : null,
    je = () => {
      I?.isGroup ? s() : o();
    },
    Me = l.filter((e) =>
      ((e.isGroup ? e.group?.name : e.other?.displayName) || ``)
        .toLowerCase()
        .includes(w.toLowerCase()),
    ),
    L = I?.isGroup
      ? {
          title: p?.name || I.group?.name,
          subtitle: `${I.memberCount} members`,
          avatarEmoji: `👥`,
          avatarUrl: I.group?.avatarUrl,
          presence: null,
          plan: null,
          placeholderName: `the group`,
        }
      : {
          title: I?.other?.displayName,
          subtitle: [I?.other?.age, I?.other?.city, I?.other?.religion]
            .filter(Boolean)
            .join(` · `),
          avatarEmoji: Aa.woman,
          avatarUrl: I?.other?.avatarUrl,
          presence: I?.presence,
          plan: I?.other?.plan,
          placeholderName: I?.other?.displayName,
        },
    Ne =
      I?.isGroup && p?.members
        ? new Map(
            p.members.map((e) => [
              e.id,
              { name: e.displayName, avatarUrl: e.avatarUrl },
            ]),
          )
        : null,
    Pe = d && (
      <>
        <MessageRow
          messages={h}
          meId={e?.id}
          avatarEmoji={L.avatarEmoji}
          isGroup={!!I?.isGroup}
          senderInfo={Ne}
          settings={E}
          isTyping={D}
          messagesContainerRef={_e}
        />
        <MessageComposer
          newMessage={b}
          setNewMessage={x}
          handleSendMessage={we}
          handleImageSelect={Te}
          settings={E}
          placeholderName={L.placeholderName}
          inputRef={ve}
          onTyping={Se}
        />
      </>
    );
  return (
    <>
      <style>
        {
          "\n        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');\n        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n        .msg-root { font-family: 'Playfair Display', Georgia, serif; height: 100vh; width: 100vw; background: var(--bg); color: var(--fg); overflow: hidden; display: flex; flex-direction: column; }\n        ::-webkit-scrollbar { width: 4px; }\n        ::-webkit-scrollbar-thumb { background: var(--emerald-700); border-radius: 10px; }\n\n        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }\n        @keyframes fadeIn { from{opacity:0} to{opacity:1} }\n        @keyframes popIn { from{transform:scale(0.9);opacity:0} to{transform:scale(1);opacity:1} }\n        @keyframes slideUp { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }\n        @keyframes bounceDot { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }\n        @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 color-mix(in srgb, var(--emerald-500) 45%, transparent)} 70%{box-shadow:0 0 0 5px color-mix(in srgb, var(--emerald-500) 0%, transparent)} }\n\n        .shimmer-text { background:linear-gradient(135deg,var(--emerald-700),var(--emerald-500),var(--emerald-700)); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 3s linear infinite; }\n\n        .desktop-layout { display:none; }\n        @media (min-width:768px) {\n          .desktop-layout { display:flex; flex:1; overflow:hidden; min-height:0; }\n          .mobile-layout { display:none !important; }\n        }\n\n        .sidebar { width:290px; flex-shrink:0; display:flex; flex-direction:column; background:white; border-right:1px solid var(--line); }\n        .sidebar-head { padding:20px 20px 14px; border-bottom:1px solid var(--line); flex-shrink:0; }\n        .sidebar-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; position: relative; }\n        .sidebar-title { font-weight:700; font-size:18px; display:block; }\n        .sidebar-menu-btn { background: var(--surface-2); border: 1px solid var(--line); border-radius: 8px; width: 28px; height: 28px; cursor: pointer; color: var(--emerald-700); font-size: 16px; }\n        .sidebar-menu-dropdown { position: absolute; top: 34px; right: 0; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 8px 24px color-mix(in srgb, var(--shadow) 15%, transparent); z-index: 50; min-width: 160px; overflow: hidden; }\n        .sidebar-menu-dropdown button { width: 100%; text-align: left; padding: 10px 14px; border: none; background: var(--surface); cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--fg); }\n        .sidebar-menu-dropdown button:hover { background: var(--surface-2); }\n        .search-wrap { position:relative; }\n        .search-inp { width:100%; padding:8px 12px 8px 30px; border-radius:12px; background:var(--bg); border:1px solid var(--line); font-size:11px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }\n        .search-inp:focus { border-color:var(--emerald-700); }\n        .search-ico { position:absolute; left:9px; top:50%; transform:translateY(-50%); color:var(--muted); width:13px; height:13px; }\n        .contacts-list { flex:1; overflow-y:auto; }\n\n        .c-row { width:100%; padding:12px 16px; border-bottom:1px solid var(--line); display:flex; align-items:center; gap:12px; background:none; border-left:3px solid transparent; cursor:pointer; text-align:left; transition:background 0.15s,border-color 0.15s; }\n        .c-row:hover { background:color-mix(in srgb, var(--emerald-700) 7%, transparent); }\n        .c-row.active { background:linear-gradient(90deg,color-mix(in srgb, var(--emerald-700) 13%, transparent),color-mix(in srgb, var(--emerald-500) 7%, transparent)); border-left-color:var(--emerald-700); }\n        .c-avwrap { position:relative; flex-shrink:0; }\n        .c-av { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,var(--bg),var(--surface-2)); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:20px; }\n        .c-av.lg { width:48px; height:48px; font-size:24px; }\n        .status-dot { position:absolute; bottom:-1px; right:-1px; width:10px; height:10px; border-radius:50%; border:2px solid white; }\n        .status-dot.online { background:var(--emerald-500); animation:pulseDot 2.2s infinite; }\n        .status-dot.offline { background:var(--line); }\n        .c-inf { flex:1; min-width:0; }\n        .c-nr { display:flex; align-items:center; justify-content:space-between; margin-bottom:2px; }\n        .c-name { font-weight:600; font-size:13px; color:var(--fg); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n        .c-ts { font-size:10px; color:var(--muted); font-family:'DM Sans',sans-serif; flex-shrink:0; margin-left:4px; }\n        .c-mr { display:flex; align-items:center; justify-content:space-between; }\n        .c-msg { font-size:11px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; font-family:'DM Sans',sans-serif; }\n        .unread { background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; font-size:9px; font-weight:700; min-width:17px; height:17px; border-radius:9px; display:flex; align-items:center; justify-content:center; padding:0 4px; margin-left:6px; flex-shrink:0; }\n\n        .chat-area { flex:1; display:flex; flex-direction:column; min-width:0; }\n        .chat-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 14px; }\n\n        .chat-header { flex-shrink:0; background:white; border-bottom:1px solid var(--line); padding:12px 16px; display:flex; align-items:center; justify-content:space-between; gap:8px; min-width:0; }\n        .ch-left { display:flex; align-items:center; gap:8px; min-width:0; flex:1; overflow:hidden; }\n        .ch-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,var(--bg),var(--surface-2)); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }\n        .ch-name-row { display:flex; align-items:center; gap:8px; }\n        .ch-name { font-weight:700; font-size:15px; color:var(--fg); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:130px; }\n        .online-label { font-size:11px; color:var(--emerald-500); font-family:'DM Sans',sans-serif; font-weight:500; }\n        .offline-label { font-size:11px; color:var(--muted); font-family:'DM Sans',sans-serif; }\n        .ch-meta { font-size:11px; color:var(--muted); font-family:'DM Sans',sans-serif; }\n        .ch-actions { display:flex; align-items:center; gap:6px; flex-shrink:0; }\n        .hdr-btn { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:none; cursor:pointer; transition:transform 0.15s; }\n        .hdr-btn:hover { transform:scale(1.1); }\n        .hdr-btn:active { transform:scale(0.92); }\n        .hdr-btn.gold { background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; box-shadow:0 2px 8px color-mix(in srgb, var(--emerald-700) 25%, transparent); }\n        .hdr-btn.subtle { background:var(--surface-2); border:1px solid var(--line); color:var(--muted); }\n        .hdr-btn.subtle:hover { border-color:var(--emerald-700); color:var(--emerald-700); }\n\n        .back-btn { display:flex; align-items:center; gap:2px; background:none; border:none; cursor:pointer; color:var(--emerald-700); font-weight:700; font-size:14px; padding:4px 8px 4px 0; flex-shrink:0; min-width:32px; }\n\n        .msgs-scroll { flex:1; overflow-y:auto; padding:20px 16px; background:linear-gradient(180deg,var(--bg) 0%,var(--surface) 100%); display:flex; flex-direction:column; gap:10px; }\n        .date-row { display:flex; justify-content:center; margin-bottom:8px; }\n        .date-chip { font-size:10px; color:var(--muted); background:white; border:1px solid var(--line); padding:3px 12px; border-radius:20px; font-family:'DM Sans',sans-serif; }\n        .msg-row { display:flex; align-items:flex-end; gap:8px; animation:slideUp 0.22s ease; }\n        .msg-right { justify-content:flex-end; }\n        .msg-left { justify-content:flex-start; }\n        .msg-avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,var(--bg),var(--surface-2)); border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; color:var(--emerald-700); font-weight:700; }\n        .msg-col { max-width:70%; display:flex; flex-direction:column; }\n        .msg-sender-name { font-size:11px; font-weight:700; color:var(--emerald-700); margin:0 0 3px 2px; font-family:'DM Sans',sans-serif; }\n        .bubble { padding:10px 14px; border-radius:18px; font-size:13px; line-height:1.5; font-family:'DM Sans',sans-serif; word-break:break-word; }\n        .bubble-user { background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; border-bottom-right-radius:4px; }\n        .bubble-other { background:white; color:var(--fg); border:1px solid var(--line); border-bottom-left-radius:4px; }\n        .typing-bubble { display:flex; align-items:center; gap:5px; padding:12px 16px; }\n        .dot { display:inline-block; width:7px; height:7px; border-radius:50%; background:var(--line); animation:bounceDot 1.2s infinite; }\n        .msg-meta { font-size:10px; color:var(--muted); margin-top:3px; font-family:'DM Sans',sans-serif; }\n        .meta-right { text-align:right; padding-right:2px; }\n        .meta-left { text-align:left; padding-left:2px; }\n        .read-tick { color:var(--emerald-700); margin-left:3px; }\n\n        .chat-img { max-width:200px; border-radius:14px; cursor:pointer; display:block; object-fit:cover; transition:opacity 0.2s; }\n        .chat-img:hover { opacity:0.9; }\n        .chat-img-user { border-bottom-right-radius:4px; }\n        .chat-img-other { border-bottom-left-radius:4px; border:1px solid var(--line); }\n\n        .lightbox { position:fixed; inset:0; background:rgba(0,0,0,0.88); display:flex; align-items:center; justify-content:center; z-index:200; animation:fadeIn 0.2s ease; cursor:pointer; }\n        .lightbox-close { position:absolute; top:18px; right:22px; background:none; border:none; color:white; font-size:22px; cursor:pointer; opacity:0.7; }\n        .lightbox-close:hover { opacity:1; }\n        .lightbox-img { max-width:90vw; max-height:85vh; border-radius:12px; object-fit:contain; cursor:default; box-shadow:0 8px 48px rgba(0,0,0,0.5); }\n\n        .timed-idle { width:180px; height:110px; border-radius:14px; background:linear-gradient(135deg,color-mix(in srgb, var(--emerald-700) 8%, transparent),color-mix(in srgb, var(--emerald-500) 8%, transparent)); border:1.5px dashed color-mix(in srgb, var(--emerald-700) 35%, transparent); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; user-select:none; gap:5px; transition:transform 0.1s; }\n        .timed-idle:active { transform:scale(0.97); }\n        .timed-idle-label { font-size:12px; font-weight:600; color:var(--emerald-700); font-family:'DM Sans',sans-serif; }\n        .timed-idle-sub { font-size:10px; color:var(--muted); font-family:'DM Sans',sans-serif; }\n        .timed-viewing { position:relative; width:210px; height:210px; border-radius:14px; overflow:hidden; user-select:none; cursor:pointer; }\n        .timed-photo { width:100%; height:100%; object-fit:cover; }\n        .no-ss-overlay { position:absolute; inset:0; background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(0,0,0,0.035) 8px,rgba(0,0,0,0.035) 9px); pointer-events:none; }\n        .progress-ring { position:absolute; top:8px; right:8px; width:32px; height:32px; filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4)); }\n        .timed-timer { position:absolute; bottom:8px; right:10px; font-size:11px; color:white; font-family:'DM Sans',sans-serif; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.5); }\n        .timed-lock-badge { position:absolute; top:8px; left:10px; font-size:14px; }\n        .timed-expired { width:140px; height:58px; border-radius:14px; background:var(--surface-2); border:1px solid var(--line); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; }\n        .timed-expired-text { font-size:11px; color:var(--muted); font-family:'DM Sans',sans-serif; }\n        .screenshot-warn { font-size:10px; color:var(--danger); font-family:'DM Sans',sans-serif; }\n\n        .input-bar { flex-shrink:0; background:white; border-top:1px solid var(--line); padding:14px 16px; display:flex; align-items:center; gap:10px; }\n        .input-icon { flex-shrink:0; width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:none; border:none; cursor:pointer; color:var(--emerald-700); font-size:20px; transition:background 0.15s; }\n        .input-icon:hover { background:var(--bg); }\n        .input-icon:disabled { opacity:0.4; cursor:not-allowed; }\n        .text-input { flex:1; padding:10px 14px; border-radius:12px; background:var(--bg); border:1px solid var(--line); font-size:13px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }\n        .text-input:focus { border-color:var(--emerald-700); }\n        .text-input:disabled { opacity:0.4; cursor:not-allowed; }\n        .send-btn { flex-shrink:0; width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:transform 0.15s; box-shadow:0 2px 8px color-mix(in srgb, var(--emerald-700) 30%, transparent); }\n        .send-btn:hover { transform:scale(1.07); }\n        .send-btn:active { transform:scale(0.92); }\n        .send-btn:disabled { opacity:0.35; cursor:not-allowed; transform:none; }\n\n        .modal-bg { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:16px; animation:fadeIn 0.2s ease; }\n        .img-modal { background:white; border-radius:22px; width:100%; max-width:360px; overflow:hidden; animation:popIn 0.28s cubic-bezier(0.34,1.56,0.64,1); border:1px solid color-mix(in srgb, var(--emerald-700) 15%, transparent); }\n        .img-modal-head { display:flex; align-items:center; justify-content:space-between; padding:16px 20px 12px; border-bottom:1px solid var(--line); }\n        .img-modal-title { font-weight:700; font-size:16px; }\n        .modal-x { background:none; border:none; font-size:18px; color:var(--muted); cursor:pointer; }\n        .modal-x:hover { color:var(--fg); }\n        .img-preview-wrap { padding:16px 20px; background:var(--bg); display:flex; justify-content:center; }\n        .img-preview { max-height:180px; max-width:100%; border-radius:12px; object-fit:contain; box-shadow:0 4px 20px rgba(0,0,0,0.1); }\n        .mode-toggle { display:flex; gap:8px; padding:14px 20px 0; }\n        .mode-btn { flex:1; padding:8px 0; border-radius:10px; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:500; border:1.5px solid var(--line); background:var(--surface-2); color:var(--muted); cursor:pointer; transition:all 0.2s; }\n        .mode-btn.active { background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; border-color:transparent; }\n        .timed-opts { padding:14px 20px 0; }\n        .opt-label { font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.06em; font-family:'DM Sans',sans-serif; margin-bottom:8px; }\n        .duration-row { display:flex; gap:8px; margin-bottom:12px; }\n        .dur-pill { flex:1; padding:7px 0; border-radius:8px; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:600; border:1.5px solid var(--line); background:var(--surface-2); color:var(--muted); cursor:pointer; transition:all 0.18s; }\n        .dur-pill.active { background:color-mix(in srgb, var(--gold) 10%, transparent); border-color:var(--emerald-700); color:var(--emerald-700); }\n        .ss-toggle { display:flex; align-items:center; gap:10px; background:var(--bg); border:1.5px solid var(--line); border-radius:10px; padding:10px 14px; cursor:pointer; width:100%; font-size:13px; font-family:'DM Sans',sans-serif; color:var(--muted); transition:border-color 0.2s; }\n        .ss-toggle.active { border-color:var(--emerald-700); color:var(--emerald-700); }\n        .ss-track { position:relative; display:inline-block; width:42px; height:23px; border-radius:12px; flex-shrink:0; transition:background 0.25s; }\n        .ss-thumb { position:absolute; top:2.5px; width:18px; height:18px; border-radius:50%; background:white; box-shadow:0 1px 3px rgba(0,0,0,0.2); transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); }\n        .img-modal-btns { display:flex; gap:10px; padding:14px 20px 20px; }\n        .img-cancel { flex:1; padding:12px 0; border-radius:14px; border:1.5px solid var(--line); background:white; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:500; color:var(--muted); cursor:pointer; }\n        .img-cancel:hover { border-color:var(--emerald-500); color:var(--emerald-500); }\n        .img-send { flex:1; padding:12px 0; border-radius:14px; background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:600; border:none; cursor:pointer; box-shadow:0 4px 14px color-mix(in srgb, var(--emerald-700) 25%, transparent); }\n        .img-send:hover { transform:scale(1.02); }\n        .img-send:disabled, .img-cancel:disabled { opacity: 0.6; cursor: not-allowed; }\n\n        .settings-bg { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(5px); z-index:100; animation:fadeIn 0.2s ease; }\n        .settings-box { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:420px; background:white; border-radius:24px 24px 0 0; z-index:101; animation:popIn 0.28s cubic-bezier(0.34,1.56,0.64,1); max-height:92vh; display:flex; flex-direction:column; overflow:hidden; }\n        @media (min-width:640px) { .settings-box { bottom:auto; border-radius:24px; top:50%; transform:translate(-50%,-50%); } }\n        .settings-bar { height:5px; background:linear-gradient(90deg,var(--deep),var(--emerald-700),var(--deep)); flex-shrink:0; }\n        .settings-scroll { overflow-y:auto; padding:20px; }\n        .settings-prof { text-align:center; padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid var(--line); }\n        .settings-av { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--bg),var(--surface-2)); border:2px solid color-mix(in srgb, var(--emerald-700) 25%, transparent); font-size:48px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; position:relative; }\n        .settings-name { font-weight:700; font-size:18px; color:var(--fg); margin-bottom:3px; }\n        .settings-sub { font-size:13px; color:var(--muted); font-family:'DM Sans',sans-serif; margin-bottom:12px; }\n        .t-row { display:flex; align-items:center; justify-content:space-between; padding:12px 14px; border-radius:14px; border:1px solid var(--line); background:var(--bg); margin-bottom:10px; }\n        .t-row.danger { background:var(--danger-bg); border-color:var(--danger-bg); }\n        .t-label { font-size:13px; font-weight:600; color:var(--fg); }\n        .t-label.danger { color:var(--danger); }\n        .t-desc { font-size:11px; color:var(--muted); font-family:'DM Sans',sans-serif; margin-top:2px; }\n        .toggle-track { position:relative; display:inline-block; width:44px; height:24px; border-radius:12px; cursor:pointer; background:var(--surface-2); transition:background 0.25s; flex-shrink:0; border:none; }\n        .toggle-track.on { background:linear-gradient(135deg,var(--deep),var(--emerald-700)); }\n        .toggle-thumb { position:absolute; top:3px; left:3px; width:18px; height:18px; border-radius:50%; background:white; box-shadow:0 1px 4px rgba(0,0,0,0.2); transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1); }\n        .toggle-track.on .toggle-thumb { left:23px; }\n        .settings-done { width:100%; padding:13px 0; border-radius:14px; background:linear-gradient(135deg,var(--deep),var(--emerald-700)); color:white; font-size:14px; font-family:'DM Sans',sans-serif; font-weight:600; border:none; cursor:pointer; margin-top:4px; box-shadow:0 4px 14px color-mix(in srgb, var(--emerald-700) 25%, transparent); }\n        .settings-danger-btn { width:100%; padding:12px 0; border-radius:14px; border:1.5px solid var(--danger); background:var(--danger-bg); color:var(--danger); font-weight:700; font-size:13px; cursor:pointer; margin-bottom:10px; font-family:'DM Sans',sans-serif; }\n\n\n        .mobile-layout { display:flex; flex-direction:column; flex:1; background:white; overflow:hidden; min-height:0; }\n        .mobile-contacts { flex:1; overflow-y:auto; }\n        .mobile-chat-panel { position:fixed; top:68px; left:0; right:0; bottom:0; background:var(--bg); z-index:60; display:flex; flex-direction:column; transform:translateX(100%); transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); }\n        .mobile-chat-panel.open { transform:translateX(0); }\n        .chevron { width:14px; height:14px; color:var(--muted); flex-shrink:0; }\n\n        @media (max-width:480px) {\n          .ch-meta { display:none; }\n          .ch-name { max-width:100px; }\n          .chat-header { padding:10px 12px; }\n          .hdr-btn { width:32px; height:32px; }\n          .ch-name-row { flex-wrap:nowrap; gap:5px; }\n          .online-label, .offline-label { font-size:10px; white-space:nowrap; }\n        }\n      "
        }
      </style>
      <Navbar />
      <div className="msg-root" style={{ paddingTop: 68 }}>
        <div className="desktop-layout">
          <div className="sidebar">
            <div className="sidebar-head">
              <div className="sidebar-title-row">
                <span className="sidebar-title shimmer-text">Messages</span>
                <button
                  className="sidebar-menu-btn"
                  onClick={() => M((e) => !e)}
                >
                  ⋮
                </button>
                {j && (
                  <div className="sidebar-menu-dropdown">
                    <button
                      onClick={() => {
                        if ((M(!1), e?.membership?.plan === `free`)) {
                          he(
                            `Creating groups requires a Basic or Premium plan.`,
                          );
                          return;
                        }
                        (f(null), oe(`create-group`), y(!0));
                      }}
                    >
                      ➕ Create Group
                    </button>
                    <Link
                      to="/safety"
                      style={{
                        display: `block`,
                        padding: `10px 14px`,
                        fontFamily: `'DM Sans', sans-serif`,
                        fontSize: 13,
                        color: `var(--fg)`,
                        textDecoration: `none`,
                      }}
                    >
                      🛡️ Safety Center
                    </Link>
                  </div>
                )}
              </div>
              <div className="search-wrap">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={w}
                  onChange={(e) => T(e.target.value)}
                  className="search-inp"
                />
                <svg
                  className="search-ico"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="contacts-list">
              {Me.map((e) => {
                let t = e.isGroup ? e.group?.name : e.other?.displayName,
                  n = e.isGroup ? `👥` : Aa.woman,
                  r = e.isGroup ? e.group?.avatarUrl : e.other?.avatarUrl;
                return (
                  <button
                    key={e.conversationId}
                    onClick={() => Ce(e.conversationId)}
                    className={`c-row ${d === e.conversationId ? `active` : ``}`}
                  >
                    <div className="c-avwrap">
                      <div className="c-av">
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
                      {!e.isGroup && (
                        <span className={`status-dot ${e.presence}`} />
                      )}
                    </div>
                    <div className="c-inf">
                      <div
                        className="c-nr"
                        style={{
                          display: `flex`,
                          alignItems: `center`,
                          gap: 5,
                        }}
                      >
                        <span className="c-name">{t}</span>
                        {!e.isGroup && <PlanBadge plan={e.other?.plan} />}
                      </div>
                      <div className="c-mr">
                        <span className="c-msg">
                          {e.lastMessage?.preview || `No messages yet`}
                        </span>
                        {e.unreadCount > 0 && (
                          <span className="unread">{e.unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              {Me.length === 0 && (
                <p
                  style={{
                    padding: 20,
                    fontFamily: `'DM Sans', sans-serif`,
                    fontSize: 12.5,
                    color: `var(--muted)`,
                    textAlign: `center`,
                  }}
                >
                  No conversations yet. Head to Explore to start one!
                </p>
              )}
            </div>
          </div>
          <div className="chat-area">
            {ae === `create-group` ? (
              <CreateGroupModal
                onClose={() => oe(null)}
                onCreated={(e) => {
                  (oe(null), be(), f(e.id));
                }}
              />
            ) : ae === `manage-group` ? (
              <GroupSettingsModal
                groupId={d}
                meId={e?.id}
                onClose={() => oe(null)}
                onLeft={() => {
                  (oe(null), f(null), be());
                }}
                onDeleted={() => {
                  (oe(null), f(null), be());
                }}
                onUpdated={be}
                requestConfirm={ge}
              />
            ) : d ? (
              <>
                <ConversationListItem
                  title={L.title}
                  subtitle={L.subtitle}
                  avatarEmoji={L.avatarEmoji}
                  avatarUrl={L.avatarUrl}
                  presence={L.presence}
                  plan={L.plan}
                  onCall={ke}
                  activeCallHere={Ae}
                  onEndCall={je}
                  onSettings={() => (I?.isGroup ? oe(`manage-group`) : C(!0))}
                  onViewProfile={
                    !I?.isGroup && I?.other?.id ? () => pe(I.other.id) : void 0
                  }
                />
                {Pe}
              </>
            ) : (
              <div className="chat-placeholder">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
        <div className="mobile-layout">
          <div
            style={{
              padding: `16px 16px 12px`,
              borderBottom: `1px solid var(--line)`,
              background: `white`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                marginBottom: 10,
              }}
            >
              <span
                className="sidebar-title shimmer-text"
                style={{ fontSize: 18 }}
              >
                Messages
              </span>
              <button
                className="sidebar-menu-btn"
                onClick={() => {
                  if (e?.membership?.plan === `free`) {
                    he(`Creating groups requires a Basic or Premium plan.`);
                    return;
                  }
                  (f(null), oe(`create-group`), y(!0));
                }}
              >
                ➕
              </button>
            </div>
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search..."
                value={w}
                onChange={(e) => T(e.target.value)}
                className="search-inp"
              />
              <svg
                className="search-ico"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mobile-contacts">
            {Me.map((e) => {
              let t = e.isGroup ? e.group?.name : e.other?.displayName,
                n = e.isGroup ? `👥` : Aa.woman,
                r = e.isGroup ? e.group?.avatarUrl : e.other?.avatarUrl;
              return (
                <button
                  key={e.conversationId}
                  onClick={() => Ce(e.conversationId)}
                  className="c-row"
                  style={{ borderLeft: `none`, padding: `14px 16px` }}
                >
                  <div className="c-avwrap">
                    <div className="c-av lg">
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
                    {!e.isGroup && (
                      <span className={`status-dot ${e.presence}`} />
                    )}
                  </div>
                  <div className="c-inf">
                    <div
                      className="c-nr"
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 5,
                      }}
                    >
                      <span className="c-name">{t}</span>
                      {!e.isGroup && <PlanBadge plan={e.other?.plan} />}
                    </div>
                    <div className="c-mr">
                      <span className="c-msg">
                        {e.lastMessage?.preview || `No messages yet`}
                      </span>
                      {e.unreadCount > 0 && (
                        <span className="unread">{e.unreadCount}</span>
                      )}
                    </div>
                  </div>
                  <svg
                    className="chevron"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
          <div className={`mobile-chat-panel ${_ ? `open` : ``}`}>
            {ae === `create-group` ? (
              <CreateGroupModal
                onClose={() => {
                  (oe(null), y(!1));
                }}
                onCreated={(e) => {
                  (oe(null), be(), f(e.id));
                }}
              />
            ) : ae === `manage-group` ? (
              <GroupSettingsModal
                groupId={d}
                meId={e?.id}
                onClose={() => oe(null)}
                onLeft={() => {
                  (oe(null), f(null), y(!1), be());
                }}
                onDeleted={() => {
                  (oe(null), f(null), y(!1), be());
                }}
                onUpdated={be}
                requestConfirm={ge}
              />
            ) : (
              d && (
                <>
                  <ConversationListItem
                    title={L.title}
                    subtitle={L.subtitle}
                    avatarEmoji={L.avatarEmoji}
                    avatarUrl={L.avatarUrl}
                    presence={L.presence}
                    plan={L.plan}
                    onCall={ke}
                    activeCallHere={Ae}
                    onEndCall={je}
                    onSettings={() => (I?.isGroup ? oe(`manage-group`) : C(!0))}
                    onViewProfile={
                      !I?.isGroup && I?.other?.id
                        ? () => pe(I.other.id)
                        : void 0
                    }
                    backBtn={
                      <button onClick={() => y(!1)} className="back-btn">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    }
                  />
                  {Pe}
                </>
              )
            )}
          </div>
        </div>
        {te && k && (
          <SendImageModal
            imageUrl={k.url}
            onSend={Ee}
            onCancel={() => {
              (ne(!1), A(null));
            }}
            sending={re}
            isPremium={e?.membership?.plan === `premium`}
            onRequirePremium={() =>
              he(`Sending view-once photos requires a Premium plan.`)
            }
          />
        )}
        {S && I && !I.isGroup && (
          <>
            <div className="settings-bg" onClick={() => C(!1)} />
            <div className="settings-box">
              <div className="settings-bar" />
              <div className="settings-scroll">
                <div className="settings-prof">
                  <div
                    style={{
                      position: `relative`,
                      display: `inline-block`,
                    }}
                  >
                    <div className="settings-av">{L.avatarEmoji}</div>
                  </div>
                  <div className="settings-name">{L.title}</div>
                  <div className="settings-sub">{L.subtitle}</div>
                </div>
                {[
                  {
                    key: `ignoreCalls`,
                    label: `Ignore Calls`,
                    desc: `Block incoming voice calls`,
                  },
                  {
                    key: `ignoreVideoCalls`,
                    label: `Ignore Video Calls`,
                    desc: `Block incoming video calls`,
                  },
                  {
                    key: `readReceipts`,
                    label: `Read Receipts`,
                    desc: `Show when messages are read`,
                  },
                ].map(({ key: e, label: t, desc: n }) => (
                  <div key={e} className="t-row">
                    <div>
                      <div className="t-label">{t}</div>
                      <div className="t-desc">{n}</div>
                    </div>
                    <button
                      onClick={() => De(e)}
                      className={`toggle-track ${E[e] ? `on` : ``}`}
                    >
                      <span className="toggle-thumb" />
                    </button>
                  </div>
                ))}
                <button
                  className="settings-danger-btn"
                  onClick={() => {
                    (C(!1),
                      ce({
                        type: `user`,
                        id: I.other?.id,
                        name: I.other?.displayName,
                      }));
                  }}
                >
                  🚩 Block or Report
                </button>
                <button className="settings-danger-btn" onClick={Oe}>
                  💔 Unmatch
                </button>
                <button className="settings-done" onClick={() => C(!1)}>
                  Done
                </button>
              </div>
            </div>
          </>
        )}
        {se && (
          <ReportBlockModal
            target={se}
            onClose={() => ce(null)}
            onBlocked={() => {
              (ce(null), f(null), be());
            }}
          />
        )}
        {F && (
          <ConfirmDialog
            message={F.message}
            confirmLabel={F.confirmLabel}
            danger={F.danger}
            onConfirm={F.onConfirm}
            onCancel={() => le(null)}
          />
        )}
        {N && (
          <Toast message={N.message} tone={N.tone} onDismiss={() => P(null)} />
        )}
        {ue && <UpgradeModal message={ue} onClose={() => de(null)} />}
        {fe && <ProfileModal personId={fe} onClose={() => pe(null)} />}
      </div>
    </>
  );
}

export { MessagingPage };
