import { match } from "./router.js";
import { toApiError, apiError } from "./errors.js";

// Same contract as the REST client: resolves with `data`, rejects with ApiError.
export async function betaRequest(path, { method = "GET", body, isForm = false } = {}) {
  const m = match(method, path);
  if (!m) throw apiError("NOT_FOUND", "Not found.");
  try {
    return await m.handler({ params: m.params, query: m.query, body, isForm });
  } catch (err) {
    throw toApiError(err);
  }
}
