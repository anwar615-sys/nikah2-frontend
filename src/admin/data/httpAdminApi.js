// Admin data over the shared API client (REST contract in BLUEPRINT.md section 6,
// or the Supabase connector in a public-beta build).
import { API_BASE, api, getTokens } from "../../lib/api";

export const httpAdminApi = {
  ...api,
  // Verification photos are private. Beta: a 5-minute signed link from the
  // `verification` bucket (only admins and the owner may read it).
  // REST backend: fetched with the admin's token as a blob.
  async loadPhoto(mediaId) {
    if (import.meta.env.VITE_BETA === "true") {
      const { signedUrl } = await import("../../beta/media.js");
      return signedUrl("verification", mediaId, 300);
    }
    const tokens = getTokens();
    const res = await fetch(`${API_BASE}/admin/verifications/${mediaId}/photo`, {
      headers: tokens?.accessToken ? { Authorization: `Bearer ${tokens.accessToken}` } : {},
    });
    if (!res.ok) throw new Error("fetch failed");
    return URL.createObjectURL(await res.blob());
  },
  releasePhoto(url) {
    if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
  },
};
