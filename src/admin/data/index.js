// The admin dashboard's single doorway to data and sign-in.
//
// Every admin page uses `adminApi` and `useAdminSession` from here, never a
// backend directly. In a public-beta build (VITE_BETA=true) the requests are
// answered by the Supabase connector in src/beta/; otherwise by the REST
// backend. The pages do not change.
import { useAuth } from "../../context/AuthContext";
import { httpAdminApi } from "./httpAdminApi";

export const adminApi = httpAdminApi;

// Who is signed in to the admin area.
export const useAdminSession = useAuth;
