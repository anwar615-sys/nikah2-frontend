import * as React from "react";
import { api, getTokens, setTokens } from "../lib/api";
import { disconnectSocket } from "../lib/socket";

var AuthContext = (0, React.createContext)(null);

function useAuth() {
  let e = (0, React.useContext)(AuthContext);
  if (!e) throw Error(`useAuth must be used within an AuthProvider`);
  return e;
}

function AuthProvider({ children: e }) {
  let [t, n] = (0, React.useState)(null),
    [r, i] = (0, React.useState)(!0),
    a = (0, React.useCallback)(async () => {
      try {
        let e = await api.get(`/me`);
        return (n(e), e);
      } catch {
        return (setTokens(null), n(null), null);
      }
    }, []);
  (0, React.useEffect)(() => {
    (async () => {
      (getTokens()?.accessToken && (await a()), i(!1));
    })();
  }, [a]);
  let o = (0, React.useCallback)(
      async (e) => {
        let t = await api.post(`/auth/signup`, e);
        return (setTokens(t.auth), await a(), t);
      },
      [a],
    ),
    s = (0, React.useCallback)(
      async (e, t) => {
        let n = await api.post(`/auth/login`, { email: e, password: t });
        return (setTokens(n.auth), await a(), n);
      },
      [a],
    ),
    c = (0, React.useCallback)(
      async (e) => {
        let t = await api.post(`/auth/google`, { idToken: e });
        setTokens(t.auth);
        let n = await a();
        return { ...t, me: n };
      },
      [a],
    ),
    l = (0, React.useCallback)(
      async (e, t) => {
        let n = await api.post(`/admin/auth/login`, {
          idToken: e,
          password: t,
        });
        setTokens(n.auth);
        let r = await a();
        return { ...n, me: r };
      },
      [a],
    ),
    u = (0, React.useCallback)(async () => {
      let e = getTokens();
      try {
        e?.refreshToken &&
          (await api.post(`/auth/logout`, { refreshToken: e.refreshToken }));
      } catch {}
      (setTokens(null), n(null), disconnectSocket());
    }, []),
    d = (0, React.useCallback)(async () => {
      (await api.delete(`/me`), setTokens(null), n(null), disconnectSocket());
    }, []),
    f = (0, React.useCallback)(() => a(), [a]);
  return (
    <AuthContext.Provider
      value={{
        user: t,
        loading: r,
        isAuthenticated: !!t,
        signup: o,
        login: s,
        loginWithGoogle: c,
        loginAdminWithGoogle: l,
        logout: u,
        deleteAccount: d,
        refreshUser: f,
      }}
    >
      {e}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
