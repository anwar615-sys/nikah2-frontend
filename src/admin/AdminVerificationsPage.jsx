import * as React from "react";
import {
  adminCardStyle,
  adminDangerButton,
  adminPrimaryButton,
  adminTitleStyle,
} from "./styles";
import { ADMIN_THEME } from "./theme";
import { API_BASE, api, getTokens } from "../lib/api";

function AdminVerificationPhoto({ mediaId: e, alt: t, style: n }) {
  let [r, i] = (0, React.useState)(null),
    [a, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let t,
        n = !1;
      return (
        (async () => {
          let r = getTokens();
          try {
            let a = await fetch(`${API_BASE}/admin/verifications/${e}/photo`, {
              headers: r?.accessToken
                ? { Authorization: `Bearer ${r.accessToken}` }
                : {},
            });
            if (!a.ok) throw Error(`fetch failed`);
            let o = await a.blob();
            if (n) return;
            ((t = URL.createObjectURL(o)), i(t));
          } catch {
            n || o(!0);
          }
        })(),
        () => {
          ((n = !0), t && URL.revokeObjectURL(t));
        }
      );
    }, [e]),
    a ? (
      <div
        style={{
          ...n,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `var(--danger-bg)`,
          color: `var(--danger)`,
          fontSize: 12,
        }}
      >
        Failed to load
      </div>
    ) : r ? (
      <img src={r} alt={t} style={n} />
    ) : (
      <div
        style={{
          ...n,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          background: `var(--surface-2)`,
          color: `var(--muted)`,
          fontSize: 12,
        }}
      >
        Loading…
      </div>
    )
  );
}

function AdminVerificationsPage() {
  let [e, t] = (0, React.useState)([]),
    [n, r] = (0, React.useState)(!0),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(null),
    c = (0, React.useCallback)(async () => {
      (r(!0), a(``));
      try {
        t((await api.get(`/admin/verifications?limit=50`)).items);
      } catch (e) {
        a(e.message);
      } finally {
        r(!1);
      }
    }, []);
  (0, React.useEffect)(() => {
    c();
  }, [c]);
  async function l(e, n) {
    s(e);
    try {
      (await api.post(`/admin/users/${e}/verification`, { decision: n }),
        t((t) => t.filter((t) => t.id !== e)));
    } catch (e) {
      alert(e.message);
    } finally {
      s(null);
    }
  }
  return (
    <div>
      <h1 style={{ ...adminTitleStyle, fontSize: 26, marginBottom: 20 }}>
        Verifications
      </h1>
      <div
        style={{ fontSize: 13, color: ADMIN_THEME.textMuted, marginBottom: 20 }}
      >
        Pending requests with submitted ID/selfie evidence — review the photo(s)
        before approving.
      </div>
      {i && (
        <div style={{ ...adminCardStyle, color: ADMIN_THEME.danger }}>{i}</div>
      )}
      {!n && e.length === 0 && (
        <div style={adminCardStyle}>No pending verification requests.</div>
      )}
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
          gap: 18,
        }}
      >
        {e.map((e) => (
          <div key={e.id} style={adminCardStyle}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{e.name}</div>
            <div
              style={{
                fontSize: 12.5,
                color: ADMIN_THEME.textMuted,
                marginBottom: 12,
              }}
            >
              {e.email}
            </div>
            {e.mediaIds.length === 0 ? (
              <div
                style={{
                  fontSize: 12.5,
                  color: ADMIN_THEME.danger,
                  marginBottom: 12,
                }}
              >
                No photo was submitted with this request.
              </div>
            ) : (
              <div style={{ display: `flex`, gap: 10, marginBottom: 12 }}>
                {e.mediaIds.map((e) => (
                  <AdminVerificationPhoto
                    key={e}
                    mediaId={e}
                    alt="Verification evidence"
                    style={{
                      width: 130,
                      height: 130,
                      objectFit: `cover`,
                      borderRadius: 12,
                      border: `1px solid ${ADMIN_THEME.border}`,
                    }}
                  />
                ))}
              </div>
            )}
            <div style={{ display: `flex`, gap: 8 }}>
              <button
                disabled={o === e.id}
                style={adminPrimaryButton(o === e.id)}
                onClick={() => l(e.id, `approve`)}
              >
                Approve
              </button>
              <button
                disabled={o === e.id}
                style={adminDangerButton}
                onClick={() => l(e.id, `reject`)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { AdminVerificationsPage };
