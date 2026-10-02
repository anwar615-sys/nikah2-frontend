var API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? `/api` : `https://nikah2-backend.onrender.com/api`);

var TOKENS_KEY = `nikha2_tokens`;

function getTokens() {
  try {
    return JSON.parse(localStorage.getItem(TOKENS_KEY)) || null;
  } catch {
    return null;
  }
}

function setTokens(e) {
  e
    ? localStorage.setItem(TOKENS_KEY, JSON.stringify(e))
    : localStorage.removeItem(TOKENS_KEY);
}

var ApiError = class extends Error {
  constructor(e, t, n, r) {
    (super(n), (this.status = e), (this.code = t), (this.details = r));
  }
};

var refreshPromise = null;

async function refreshTokens() {
  let e = getTokens();
  if (!e?.refreshToken)
    throw new ApiError(401, `AUTH_REQUIRED`, `Not signed in.`);
  return (
    (refreshPromise ||= fetch(`${API_BASE}/auth/refresh`, {
      method: `POST`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ refreshToken: e.refreshToken }),
    })
      .then(async (e) => {
        let t = await e.json().catch(() => ({}));
        if (!e.ok)
          throw new ApiError(e.status, t?.error?.code, t?.error?.message);
        return (setTokens(t.data), t.data);
      })
      .finally(() => {
        refreshPromise = null;
      })),
    refreshPromise
  );
}

async function apiRequest(
  e,
  { method: t = `GET`, body: n, isForm: r = !1, retry: i = !0 } = {},
) {
  let a = getTokens(),
    o = {};
  (r || (o[`Content-Type`] = `application/json`),
    a?.accessToken && (o.Authorization = `Bearer ${a.accessToken}`));
  let s = await fetch(`${API_BASE}${e}`, {
    method: t,
    headers: o,
    body: n === void 0 ? void 0 : r ? n : JSON.stringify(n),
  });
  if (s.status === 204) return null;
  let c = await s.json().catch(() => ({}));
  if (!s.ok) {
    let o = c?.error?.code;
    if (i && s.status === 401 && o === `TOKEN_EXPIRED` && a?.refreshToken)
      return (
        await refreshTokens(),
        apiRequest(e, { method: t, body: n, isForm: r, retry: !1 })
      );
    throw new ApiError(
      s.status,
      o,
      c?.error?.message || `Request failed.`,
      c?.error?.details,
    );
  }
  return c.data;
}

var api = {
  get: (e) => apiRequest(e),
  post: (e, t) => apiRequest(e, { method: `POST`, body: t }),
  patch: (e, t) => apiRequest(e, { method: `PATCH`, body: t }),
  delete: (e) => apiRequest(e, { method: `DELETE` }),
  upload: (e, t) => apiRequest(e, { method: `POST`, body: t, isForm: !0 }),
};

export { API_BASE, ApiError, api, getTokens, setTokens };
