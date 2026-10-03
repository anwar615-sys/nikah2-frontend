import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Admin-only area: anyone who is not a signed-in admin goes to /admin/login.
function RequireAdmin({ children: e }) {
  let { user: t, isAuthenticated: n, loading: r } = useAuth(),
    i = useLocation();
  return r ? null : !n || t?.role !== `admin` ? (
    <Navigate to="/admin/login" state={{ from: i.pathname }} replace={!0} />
  ) : (
    e
  );
}

export { RequireAdmin };
