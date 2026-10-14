import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { RequireAdmin } from "./RequireAdmin";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { ADMIN_PREVIEW } from "./data";

// Entry point of the admin dashboard, mounted by the main app at /admin/*.
// Loaded on demand, so visitors to the public site never download admin code.
export default function AdminApp() {
  return (
    <Routes>
      <Route
        path="login"
        element={ADMIN_PREVIEW ? <Navigate to="/admin" replace /> : <AdminLoginPage />}
      />
      <Route
        path="*"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      />
    </Routes>
  );
}
