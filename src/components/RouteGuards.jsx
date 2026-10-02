import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import { useAuth } from "../context/AuthContext";

function RequireAuth({ children: e }) {
  let { user: t, isAuthenticated: n, loading: r } = useAuth(),
    i = useLocation();
  return r ? null : n ? (
    t && !t.profileComplete && i.pathname !== `/complete-profile` ? (
      <Navigate
        to="/complete-profile"
        state={{ from: i.pathname + i.search }}
        replace={!0}
      />
    ) : (
      e
    )
  ) : (
    <Navigate
      to="/login"
      state={{ from: i.pathname + i.search }}
      replace={!0}
    />
  );
}

function RequireAdmin({ children: e }) {
  let { user: t, isAuthenticated: n, loading: r } = useAuth(),
    i = useLocation();
  return r ? null : !n || t?.role !== `admin` ? (
    <Navigate to="/admin/login" state={{ from: i.pathname }} replace={!0} />
  ) : (
    e
  );
}

function ScrollToTop() {
  return (
    (0, React.useEffect)(() => {
      window.scrollTo({ top: 0, left: 0, behavior: `auto` });
    }, [useLocation().pathname]),
    null
  );
}

function ProfileCompletionGate() {
  let { user: e, isAuthenticated: t, loading: n } = useAuth(),
    r = useLocation(),
    i = useNavigate();
  return (
    (0, React.useEffect)(() => {
      n ||
        !t ||
        !e ||
        r.pathname.startsWith(`/admin`) ||
        (e.profileComplete === !1 &&
          r.pathname !== `/complete-profile` &&
          i(`/complete-profile`, {
            state: { from: r.pathname + r.search },
            replace: !0,
          }));
    }, [n, t, e, r, i]),
    null
  );
}

export { ProfileCompletionGate, RequireAdmin, RequireAuth, ScrollToTop };
