import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { RequireAdmin } from "./RequireAdmin";
import { AdminLoginPage } from "./pages/AdminLoginPage";

// Entry point of the admin dashboard, mounted by the main app at /admin/*.
// Loaded on demand, so visitors to the public site never download admin code.
export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
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
