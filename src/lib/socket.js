import { io as ha } from "socket.io-client";
import { API_BASE, getTokens } from "./api";

var SOCKET_URL = API_BASE.replace(/\/api\/?$/, ``) || window.location.origin;

// Public beta: Supabase Realtime behind the same on/off/emit interface (src/beta/socket.js).
var IS_BETA = import.meta.env.VITE_BETA === "true";

var _a = null;

function betaSocket() {
  let handlers = new Map(),
    impl = null,
    stopped = false,
    s = {
      connected: false,
      disconnected: false,
      on(e, t) {
        (handlers.get(e) || handlers.set(e, new Set()).get(e)).add(t);
        return s;
      },
      off(e, t) {
        handlers.get(e)?.delete(t);
        return s;
      },
      emit(e, t) {
        impl?.send(e, t);
        return s;
      },
      connect() {},
      disconnect() {
        stopped = true;
        s.connected = false;
        s.disconnected = true;
        impl?.stop();
        impl = null;
      },
    };
  import("../beta/socket.js")
    .then((m) =>
      m.startBetaSocket({
        dispatch: (e, t) => handlers.get(e)?.forEach((fn) => fn(t)),
      }),
    )
    .then((i) => {
      if (!i) return;
      if (stopped) return void i.stop();
      ((impl = i), (s.connected = true));
    })
    .catch(() => {});
  return s;
}

function getSocket() {
  let e = getTokens();
  if (IS_BETA) return e?.accessToken ? (_a ||= betaSocket()) : null;
  return e?.accessToken
    ? (_a
        ? _a.disconnected &&
          ((_a.auth = { token: e.accessToken }), _a.connect())
        : (_a = ha(SOCKET_URL, {
            path: `/socket.io`,
            auth: { token: e.accessToken },
            autoConnect: !0,
            reconnection: !0,
          })),
      _a)
    : null;
}

function disconnectSocket() {
  _a &&= (_a.disconnect(), null);
}

export { disconnectSocket, getSocket };
