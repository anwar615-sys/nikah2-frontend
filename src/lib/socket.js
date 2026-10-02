import { io as ha } from "socket.io-client";
import { API_BASE, getTokens } from "./api";

var SOCKET_URL = API_BASE.replace(/\/api\/?$/, ``) || window.location.origin;

var _a = null;

function getSocket() {
  let e = getTokens();
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
