// Admin data from a real backend over HTTP (the REST contract in BLUEPRINT.md
// section 6). Used whenever preview mode is off.
import { API_BASE, api, getTokens } from "../../lib/api";

export const httpAdminApi = {
  ...api,
  // Verification photos need the admin's token, so they are fetched as a blob.
  async loadPhoto(mediaId) {
    const tokens = getTokens();
    const res = await fetch(`${API_BASE}/admin/verifications/${mediaId}/photo`, {
      headers: tokens?.accessToken ? { Authorization: `Bearer ${tokens.accessToken}` } : {},
    });
    if (!res.ok) throw new Error("fetch failed");
    return URL.createObjectURL(await res.blob());
  },
  releasePhoto(url) {
    if (url) URL.revokeObjectURL(url);
  },
};
