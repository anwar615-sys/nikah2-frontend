// The admin dashboard's single doorway to data and sign-in.
//
// Every admin page uses `adminApi` and `useAdminSession` from here, never a
// backend directly. To connect a different backend later (Supabase, a new
// Node server, AWS...), add an adapter with the same methods
// (get, post, patch, delete, upload, loadPhoto, releasePhoto) and select it
// below. The pages do not change.
import { useAuth } from "../../context/AuthContext";
import { httpAdminApi } from "./httpAdminApi";
import { mockAdminApi } from "./mockAdminApi";
import { ADMIN_PREVIEW } from "./preview";

export { ADMIN_PREVIEW };

export const adminApi = ADMIN_PREVIEW ? mockAdminApi : httpAdminApi;

const PREVIEW_SESSION = {
  user: { name: "Preview Admin", email: "preview-admin@nikha2.local", role: "admin" },
  isAuthenticated: true,
  loading: false,
  logout: async () => {},
};

// Who is signed in to the admin area. In preview mode: a fixed sample admin.
export const useAdminSession = ADMIN_PREVIEW ? () => PREVIEW_SESSION : useAuth;
