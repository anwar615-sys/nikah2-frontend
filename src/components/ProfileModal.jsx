import { useNavigate } from "react-router-dom";
import * as React from "react";
import { PlanBadge } from "./PlanBadge";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";

var Xn = { woman: `👩`, man: `🧔`, other: `🧑` };

function ProfileModal({ personId: e, onClose: t }) {
  let { isAuthenticated: n } = useAuth(),
    r = useNavigate(),
    [i, a] = (0, React.useState)(null),
    [o, s] = (0, React.useState)(!0),
    [c, l] = (0, React.useState)(``),
    [u, d] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let t = !1;
      return (
        s(!0),
        l(``),
        api
          .get(`/people/${e}`)
          .then((e) => {
            t || a(e);
          })
          .catch((e) => {
            t || l(e.message || `Could not load this profile.`);
          })
          .finally(() => {
            t || s(!1);
          }),
        () => {
          t = !0;
        }
      );
    }, [e]),
    (
      <div
        onClick={t}
        style={{
          position: `fixed`,
          inset: 0,
          zIndex: 250,
          background: `rgba(27,58,75,0.5)`,
          backdropFilter: `blur(8px)`,
          WebkitBackdropFilter: `blur(8px)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          padding: 16,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: `#fff`,
            borderRadius: 24,
            maxWidth: 420,
            width: `100%`,
            maxHeight: `88vh`,
            overflowY: `auto`,
            position: `relative`,
            boxShadow: `0 28px 72px rgba(27,58,75,0.32)`,
            fontFamily: `'DM Sans', sans-serif`,
          }}
        >
          <button
            onClick={t}
            aria-label="Close"
            style={{
              position: `absolute`,
              top: 14,
              right: 14,
              zIndex: 2,
              background: `rgba(27,58,75,0.35)`,
              border: `none`,
              borderRadius: `50%`,
              width: 30,
              height: 30,
              cursor: `pointer`,
              color: `#fff`,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {o ? (
            <div
              style={{
                padding: `60px 24px`,
                textAlign: `center`,
                color: `#74C69D`,
                fontSize: 13.5,
              }}
            >
              Loading profile…
            </div>
          ) : c || !i ? (
            <div
              style={{
                padding: `60px 24px`,
                textAlign: `center`,
                color: `#C0392B`,
                fontSize: 13.5,
              }}
            >
              {c || `Profile not found.`}
            </div>
          ) : (
            <>
              <div
                style={{
                  background: `linear-gradient(160deg, #D4EDDA 0%, #B7E4C7 100%)`,
                  padding: `40px 24px 20px`,
                  display: `flex`,
                  flexDirection: `column`,
                  alignItems: `center`,
                  gap: 8,
                }}
              >
                {i.avatarUrl ? (
                  <img
                    src={i.avatarUrl}
                    alt={i.displayName}
                    style={{
                      width: 92,
                      height: 92,
                      borderRadius: `50%`,
                      objectFit: `cover`,
                      border: `3px solid #fff`,
                    }}
                  />
                ) : (
                  <div style={{ fontSize: 72, lineHeight: 1 }}>
                    {Xn[i.gender] || `🙂`}
                  </div>
                )}
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: `'Playfair Display', serif`,
                      fontWeight: 700,
                      fontSize: 20,
                      color: `#1B3A4B`,
                    }}
                  >
                    {i.displayName}{" "}
                    {i.verified && <span title="Verified">✅</span>}
                  </span>
                  <PlanBadge plan={i.plan} size="md" />
                </div>
                <div
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 5,
                  }}
                >
                  <span
                    className="status-dot-modal"
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: `50%`,
                      background:
                        i.onlineStatus === `online` ? `#22C55E` : `#B7E4C7`,
                      display: `inline-block`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color:
                        i.onlineStatus === `online` ? `#22C55E` : `#3D6B55`,
                      fontWeight: 600,
                    }}
                  >
                    {i.onlineStatus === `online` ? `Online now` : `Offline`}
                  </span>
                </div>
              </div>
              <div style={{ padding: `20px 24px 24px` }}>
                {i.bio && (
                  <p
                    style={{
                      fontSize: 13,
                      color: `#3D6B55`,
                      lineHeight: 1.6,
                      marginBottom: 16,
                      fontStyle: `italic`,
                    }}
                  >
                    “{i.bio}”
                  </p>
                )}
                <div
                  style={{
                    background: `#F0FAF4`,
                    border: `1px solid #D4EDDA`,
                    borderRadius: 14,
                    padding: `12px 14px`,
                    marginBottom: 16,
                    display: `flex`,
                    flexDirection: `column`,
                    gap: 7,
                  }}
                >
                  {[
                    [`Age`, i.age ? `${i.age} yrs` : null],
                    [`Religion`, i.religion],
                    [`Country`, i.nationality],
                    [`Location`, i.location || i.city],
                    [`Has Kids`, i.hasKids],
                  ]
                    .filter(([, e]) => e)
                    .map(([e, t]) => (
                      <div
                        key={e}
                        style={{
                          fontSize: 12.5,
                          display: `flex`,
                          justifyContent: `space-between`,
                        }}
                      >
                        <span
                          style={{
                            color: `#3D6B55`,
                            fontWeight: 600,
                          }}
                        >
                          {e}
                        </span>
                        <span
                          style={{
                            color: `#2D6A4F`,
                            fontWeight: 500,
                          }}
                        >
                          {t}
                        </span>
                      </div>
                    ))}
                </div>
                {i.hobbies?.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: `#2D6A4F`,
                        letterSpacing: `0.06em`,
                        textTransform: `uppercase`,
                        marginBottom: 6,
                      }}
                    >
                      Hobbies & Interests
                    </div>
                    <div
                      style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        gap: 6,
                      }}
                    >
                      {i.hobbies.map((e) => (
                        <span
                          key={e}
                          style={{
                            fontSize: 11.5,
                            background: `#F0FAF4`,
                            border: `1px solid #D4EDDA`,
                            color: `#2D6A4F`,
                            borderRadius: 20,
                            padding: `4px 10px`,
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    borderTop: `1px dashed #D4EDDA`,
                    paddingTop: 14,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: `#2D6A4F`,
                      letterSpacing: `0.06em`,
                      textTransform: `uppercase`,
                      marginBottom: 8,
                    }}
                  >
                    Contact Details
                  </div>
                  {i.contact?.username && (
                    <div
                      style={{
                        fontSize: 12.5,
                        display: `flex`,
                        justifyContent: `space-between`,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          color: `#3D6B55`,
                          fontWeight: 600,
                        }}
                      >
                        Username
                      </span>
                      <span
                        style={{
                          color: `#2D6A4F`,
                          fontWeight: 500,
                          fontFamily: `monospace`,
                          fontSize: 11,
                        }}
                      >
                        @{i.contact.username}
                      </span>
                    </div>
                  )}
                  {i.contact?.isPrivate ? (
                    <div
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 8,
                        background: `#FDF6EC`,
                        border: `1px solid #F0E0BE`,
                        borderRadius: 10,
                        padding: `9px 12px`,
                        color: `#9A6B00`,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      🔒 Private Account
                    </div>
                  ) : (
                    <>
                      {i.contact?.phoneNumber && (
                        <div
                          style={{
                            fontSize: 12.5,
                            display: `flex`,
                            justifyContent: `space-between`,
                            marginBottom: 6,
                          }}
                        >
                          <span
                            style={{
                              color: `#3D6B55`,
                              fontWeight: 600,
                            }}
                          >
                            Phone
                          </span>
                          <span
                            style={{
                              color: `#2D6A4F`,
                              fontWeight: 500,
                            }}
                          >
                            {i.contact.phoneNumber}
                          </span>
                        </div>
                      )}
                      {i.contact?.email && (
                        <div
                          style={{
                            fontSize: 12.5,
                            display: `flex`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <span
                            style={{
                              color: `#3D6B55`,
                              fontWeight: 600,
                            }}
                          >
                            Email
                          </span>
                          <span
                            style={{
                              color: `#2D6A4F`,
                              fontWeight: 500,
                            }}
                          >
                            {i.contact.email}
                          </span>
                        </div>
                      )}
                      {!i.contact?.phoneNumber &&
                        !i.contact?.email &&
                        !i.contact?.username && (
                          <div
                            style={{
                              fontSize: 12,
                              color: `#9DC4B0`,
                            }}
                          >
                            Not visible on your current plan.
                          </div>
                        )}
                    </>
                  )}
                </div>
                <button
                  onClick={async () => {
                    if (!n) {
                      (t(), r(`/login`, { state: { from: `/explore` } }));
                      return;
                    }
                    d(!0);
                    try {
                      let n = await api.post(`/messaging/conversations`, {
                        targetUserId: e,
                      });
                      (t(), r(`/messaging?conversation=${n.conversationId}`));
                    } catch (e) {
                      l(e.message || `Could not start this conversation.`);
                    } finally {
                      d(!1);
                    }
                  }}
                  disabled={u}
                  style={{
                    width: `100%`,
                    padding: `12px 0`,
                    borderRadius: 28,
                    border: `none`,
                    background: `linear-gradient(135deg, #1B3A4B 0%, #2D6A4F 100%)`,
                    color: `#fff`,
                    fontWeight: 700,
                    fontSize: 13.5,
                    cursor: u ? `not-allowed` : `pointer`,
                    letterSpacing: `0.03em`,
                  }}
                >
                  {u ? `Starting…` : `💬 Chat Now`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
}

export { ProfileModal };
