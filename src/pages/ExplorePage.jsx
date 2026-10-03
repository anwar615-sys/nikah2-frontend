import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as React from "react";
import { Navbar } from "../components/Navbar";
import { PlanBadge } from "../components/PlanBadge";
import { ProfileModal } from "../components/ProfileModal";
import { ReportBlockModal } from "../components/ReportBlockModal";
import { Toast } from "../components/Toast";
import { UpgradeModal } from "../components/UpgradeModal";
import { useAuth } from "../context/AuthContext";
import { Reveal, SpotlightCard } from "../components/motion";
import { api } from "../lib/api";
import { loadCountries } from "../lib/countries";

var $n = { woman: `👩`, man: `🧔`, other: `🧑` };

function ExplorePage() {
  let [e, t] = useSearchParams(),
    { user: n, isAuthenticated: r, refreshUser: i } = useAuth(),
    [a, o] = (0, React.useState)(``),
    [s, c] = (0, React.useState)(``),
    [l, u] = (0, React.useState)(``),
    [d, f] = (0, React.useState)(``),
    [p, m] = (0, React.useState)(``),
    h = e.get(`gender`) || ``,
    [g, _] = (0, React.useState)([]),
    [y, b] = (0, React.useState)(!0),
    [x, S] = (0, React.useState)(``),
    [C, w] = (0, React.useState)(null),
    [T, E] = (0, React.useState)(null),
    [ee, D] = (0, React.useState)(null),
    [O, k] = (0, React.useState)(null),
    [A, te] = (0, React.useState)(null),
    [ne, re] = (0, React.useState)(!1),
    [ie, j] = (0, React.useState)(!1),
    [M, ae] = (0, React.useState)([]);
  (0, React.useEffect)(() => {
    let e = !1;
    return (
      loadCountries()
        .then((t) => {
          e || ae(t.map((e) => e.name));
        })
        .catch(() => {
          e || ae([]);
        }),
      () => {
        e = !0;
      }
    );
  }, []);
  let [oe, se] = (0, React.useState)(!1),
    [ce, N] = (0, React.useState)(!1),
    [P, F] = (0, React.useState)(!1),
    [le, ue] = (0, React.useState)(!1),
    [de, fe] = (0, React.useState)(``),
    [pe, me] = (0, React.useState)(``),
    he = (0, React.useRef)(null),
    ge = (0, React.useRef)(null),
    _e = (0, React.useRef)(null),
    ve = (0, React.useRef)(null),
    ye = (e, t) => e.toLowerCase().startsWith(t.trim().toLowerCase()),
    I = useNavigate();
  ((0, React.useEffect)(() => {
    function e(e) {
      (he.current && !he.current.contains(e.target) && se(!1),
        ge.current && !ge.current.contains(e.target) && N(!1),
        _e.current && !_e.current.contains(e.target) && F(!1),
        ve.current && !ve.current.contains(e.target) && ue(!1));
    }
    return (
      document.addEventListener(`mousedown`, e),
      () => document.removeEventListener(`mousedown`, e)
    );
  }, []),
    (0, React.useEffect)(() => {
      if (e.get(`checkout`) !== `success`) return;
      (i(),
        D({
          message: `Payment successful — your plan has been upgraded!`,
          tone: `success`,
        }));
      let n = new URLSearchParams(e);
      (n.delete(`checkout`), t(n, { replace: !0 }));
    }, []));
  let be = (n) => {
      ue(!1);
      let r = new URLSearchParams(e);
      (n ? r.set(`gender`, n) : r.delete(`gender`), t(r, { replace: !0 }));
    },
    xe = (0, React.useCallback)(async () => {
      (re(!1), b(!0), S(``));
      try {
        let e = new URLSearchParams();
        (a && e.set(`q`, a),
          s && e.set(`ageRange`, s),
          l && e.set(`religion`, l),
          d && e.set(`nationality`, d),
          p && e.set(`location`, p),
          h && e.set(`gender`, h),
          e.set(`online`, `true`),
          e.set(`verified`, `false`),
          e.set(`limit`, `50`),
          _((await api.get(`/people?${e.toString()}`)).items));
      } catch (e) {
        S(e.message || `Could not load profiles right now.`);
      } finally {
        b(!1);
      }
    }, [a, s, l, d, p, h]);
  (0, React.useEffect)(() => {
    let e = setTimeout(xe, 250);
    return () => clearTimeout(e);
  }, [xe]);
  let Se = g,
    Ce = async (e) => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      w(e.id);
      try {
        I(
          `/messaging?conversation=${(await api.post(`/messaging/conversations`, { targetUserId: e.id })).conversationId}`,
        );
      } catch (e) {
        e.code === `CHAT_LIMIT_REACHED`
          ? D({
              message: `You've reached your Free plan's conversation limit. Upgrade to Basic or Premium for unlimited conversations.`,
              tone: `error`,
            })
          : D({
              message: e.message || `Could not start this conversation.`,
              tone: `error`,
            });
      } finally {
        w(null);
      }
    },
    we = (e) => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      k(e.id);
    },
    Te = async () => {
      if (!r) {
        I(`/login`, { state: { from: `/explore` } });
        return;
      }
      if (n?.membership?.plan !== `premium`) {
        te(
          `AI-Based Match is a Premium feature — it finds people who share your preferences and hobbies.`,
        );
        return;
      }
      (j(!0), re(!0));
      try {
        _((await api.get(`/people/ai-match`)).items);
      } catch (e) {
        (D({
          message: e.message || `Could not run AI-Based Match right now.`,
          tone: `error`,
        }),
          re(!1));
      } finally {
        j(!1);
      }
    },
    Ee = () => {
      (re(!1), xe());
    },
    De = [
      `Muslim`,
      `Hindu`,
      `Sikh`,
      `Christian`,
      `Buddhist`,
      `Jain`,
      `Jewish`,
      `Other`,
    ];
  return (
    <div
      style={{
        fontFamily: `var(--font-ui)`,
        background: `var(--bg)`,
        minHeight: `100vh`,
      }}
    >
      <style>
        {
          "\n        * { box-sizing: border-box; }\n\n        .green-text {\n          background: linear-gradient(135deg, var(--emerald-700), var(--emerald-500), var(--emerald-500), var(--mint), var(--emerald-700));\n          background-size: 200% auto;\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n          animation: shimmer-green 4s linear infinite;\n        }\n        @keyframes shimmer-green {\n          0%   { background-position: 200% center; }\n          100% { background-position: -200% center; }\n        }\n\n        .card-hover { transition: transform 0.22s, box-shadow 0.22s; cursor: pointer; }\n        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 36px color-mix(in srgb, var(--emerald-700) 16%, transparent); }\n\n        .btn-primary {\n          background: linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%);\n          color: #fff; border: none;\n          padding: 12px 0; border-radius: 28px;\n          font-family: var(--font-ui);\n          font-size: 13.5px; font-weight: 700;\n          cursor: pointer; letter-spacing: 0.03em;\n          box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow) 28%, transparent);\n          transition: all 0.22s; width: 100%;\n        }\n        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }\n        .btn-primary:disabled { background: var(--line); box-shadow: none; cursor: not-allowed; transform: none; opacity: 1; }\n\n        .btn-outline {\n          background: transparent;\n          border: 1.5px solid var(--emerald-500);\n          color: var(--emerald-700);\n          padding: 9px 0; border-radius: 28px;\n          font-family: var(--font-ui);\n          font-size: 13px; font-weight: 600;\n          cursor: pointer; width: 100%;\n          transition: all 0.2s; display: block; text-align: center;\n          text-decoration: none;\n        }\n        .btn-outline:hover { background: var(--deep); color: #fff; border-color: var(--fg); }\n\n        .filter-input {\n          background: var(--bg);\n          border: 1.5px solid var(--mint);\n          color: var(--fg);\n          border-radius: 12px;\n          padding: 10px 16px;\n          font-family: var(--font-ui);\n          font-size: 13px;\n          width: 100%;\n          outline: none;\n          transition: border-color 0.2s;\n          appearance: none;\n        }\n        .filter-input:focus { border-color: var(--emerald-500); background: var(--surface); }\n\n        .status-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex-shrink: 0; }\n        .status-dot.online  { background: var(--online); box-shadow: 0 0 8px color-mix(in srgb, var(--online) 60%, transparent); }\n        .status-dot.offline { background: var(--mint); }\n\n        @keyframes pulse { 0%, 100% { box-shadow: 0 0 8px color-mix(in srgb, var(--online) 70%, transparent); } 50% { box-shadow: 0 0 16px color-mix(in srgb, var(--online) 30%, transparent); } }\n        .pulse { animation: pulse 2s infinite; }\n\n        ::-webkit-scrollbar { width: 4px; }\n        ::-webkit-scrollbar-track { background: transparent; }\n        ::-webkit-scrollbar-thumb { background: var(--mint); border-radius: 4px; }\n        ::-webkit-scrollbar-thumb:hover { background: var(--emerald-500); }\n      "
        }
      </style>
      <Navbar />
      <section
        style={{
          paddingTop: 96,
          paddingBottom: 48,
          paddingLeft: 40,
          paddingRight: 40,
          background: `linear-gradient(160deg, var(--surface-2) 0%, var(--surface-2) 100%)`,
          borderBottom: `1px solid var(--line)`,
        }}
      >
        <div style={{ maxWidth: 1060, margin: `0 auto` }}>
          <div style={{ textAlign: `center`, marginBottom: 40 }}>
            <h1
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: `clamp(28px, 4vw, 46px)`,
                fontWeight: 700,
                color: `var(--fg)`,
                letterSpacing: `-0.025em`,
                marginBottom: 10,
              }}
            >
              {"Explore "}
              <span className="nk-shiny">Verified People</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: `var(--muted)`,
                maxWidth: 520,
                margin: `0 auto`,
              }}
            >
              Browse verified profiles and discover people who align with your
              preferences, values, and relationship goals.
            </p>
            <p
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: `clamp(20px, 2.6vw, 28px)`,
                fontWeight: 700,
                color: `var(--emerald-700)`,
                margin: `16px auto 0`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                gap: 10,
              }}
            >
              <span className="status-dot online pulse" />
              {Se.length}
              {" people online now"}
            </p>
          </div>
          <div
            style={{
              maxWidth: 600,
              margin: `0 auto 28px`,
              display: `flex`,
              gap: 10,
              alignItems: `center`,
            }}
          >
            <div style={{ position: `relative`, flex: 1 }}>
              <input
                type="text"
                placeholder="Search by name or username..."
                value={a}
                onChange={(e) => o(e.target.value)}
                className="filter-input"
                style={{
                  borderRadius: 32,
                  padding: `13px 48px 13px 22px`,
                  fontSize: 14,
                }}
              />
              <span
                style={{
                  position: `absolute`,
                  right: 18,
                  top: `50%`,
                  transform: `translateY(-50%)`,
                  fontSize: 17,
                  pointerEvents: `none`,
                }}
              >
                🔍
              </span>
            </div>
            <button className={`nk-btn nk-btn-primary${ne ? "" : " nk-btn-shimmer"}`}
              type="button"
              onClick={ne ? Ee : Te}
              disabled={ie}
              title={
                n?.membership?.plan === `premium`
                  ? `AI-Based Match`
                  : `Premium feature — matches by shared preferences/hobbies`
              }
              style={{
                flexShrink: 0,
                display: `flex`,
                alignItems: `center`,
                gap: 6,
                padding: `12px 18px`,
                borderRadius: 32,
                background: ne
                  ? `var(--surface-2)`
                  : `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
                color: ne ? `var(--emerald-700)` : `#fff`,
                fontFamily: `var(--font-ui)`,
                fontSize: 13,
                fontWeight: 700,
                cursor: ie ? `not-allowed` : `pointer`,
                boxShadow: ne ? `none` : `0 4px 16px color-mix(in srgb, var(--shadow) 28%, transparent)`,
                border: ne ? `1.5px solid var(--emerald-500)` : `none`,
              }}
            >
              {ie
                ? `Matching…`
                : ne
                  ? `✕ Clear AI Match`
                  : n?.membership?.plan === `premium`
                    ? `✨ AI Match`
                    : `✨ AI Match 🔒`}
            </button>
          </div>
          <div
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Age Range
              </label>
              <div style={{ position: `relative` }} ref={he}>
                <button className="nk-btn"
                  type="button"
                  onClick={() => {
                    (se((e) => !e), N(!1), F(!1), ue(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `var(--bg)`,
                    border: `1.5px solid var(--mint)`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: s ? `var(--fg)` : `var(--accent-text)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                  }}
                >
                  <span>{s || `Select age`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `var(--emerald-700)`,
                      transform: oe ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {oe && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `var(--surface)`,
                      borderRadius: 14,
                      border: `1.5px solid var(--line)`,
                      boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        maxHeight: 220,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {[`18-25`, `26-35`, `36-45`, `46-55`].map((e) => {
                        let t = e,
                          n = s === e;
                        return (
                          <button className="nk-btn nk-btn-soft"
                            key={t}
                            type="button"
                            onClick={() => {
                              (c(e), se(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `var(--surface-2)` : `transparent`,
                              color: n ? `var(--emerald-700)` : `var(--fg)`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `var(--font-ui)`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `var(--surface-2)`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `var(--surface-2)`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Looking For
              </label>
              <div style={{ position: `relative` }} ref={ve}>
                <button className="nk-btn"
                  type="button"
                  onClick={() => {
                    (ue((e) => !e), se(!1), N(!1), F(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `var(--bg)`,
                    border: `1.5px solid var(--mint)`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: h ? `var(--fg)` : `var(--accent-text)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                  }}
                >
                  <span>
                    {h === `woman` ? `Women` : h === `man` ? `Men` : `Everyone`}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `var(--emerald-700)`,
                      transform: le ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {le && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `var(--surface)`,
                      borderRadius: 14,
                      border: `1.5px solid var(--line)`,
                      boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div style={{ padding: `6px 8px` }}>
                      {[
                        { value: `woman`, label: `Women` },
                        { value: `man`, label: `Men` },
                      ].map(({ value: e, label: t }) => {
                        let n = h === e;
                        return (
                          <button className="nk-btn nk-btn-soft"
                            key={t}
                            type="button"
                            onClick={() => be(e)}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `var(--surface-2)` : `transparent`,
                              color: n ? `var(--emerald-700)` : `var(--fg)`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `var(--font-ui)`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `var(--surface-2)`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `var(--surface-2)`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Religion
              </label>
              <div style={{ position: `relative` }} ref={ge}>
                <button className="nk-btn"
                  type="button"
                  onClick={() => {
                    (N((e) => !e), fe(``), se(!1), ue(!1), F(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `var(--bg)`,
                    border: `1.5px solid var(--mint)`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: l ? `var(--fg)` : `var(--accent-text)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                  }}
                >
                  <span>{l || `Select religion`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `var(--emerald-700)`,
                      transform: ce ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {ce && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `var(--surface)`,
                      borderRadius: 14,
                      border: `1.5px solid var(--line)`,
                      boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        padding: 8,
                        borderBottom: `1px solid var(--line)`,
                      }}
                    >
                      <input
                        type="text"
                        autoFocus={!0}
                        placeholder="Search..."
                        value={de}
                        onChange={(e) => fe(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="filter-input"
                        style={{
                          padding: `7px 10px`,
                          fontSize: 12.5,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        maxHeight: 240,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {De.filter((e) => ye(e, de)).length === 0 && (
                        <div
                          style={{
                            padding: `10px 8px`,
                            fontSize: 12.5,
                            color: `var(--accent-text)`,
                          }}
                        >
                          No matches
                        </div>
                      )}
                      {De.filter((e) => ye(e, de)).map((e) => {
                        let t = e,
                          n = l === e;
                        return (
                          <button className="nk-btn nk-btn-soft"
                            key={t}
                            type="button"
                            onClick={() => {
                              (u(e), N(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `var(--surface-2)` : `transparent`,
                              color: n ? `var(--emerald-700)` : `var(--fg)`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `var(--font-ui)`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                              display: `flex`,
                              alignItems: `center`,
                              gap: 8,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `var(--surface-2)`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `var(--surface-2)`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Country/Nationality
              </label>
              <div style={{ position: `relative` }} ref={_e}>
                <button className="nk-btn"
                  type="button"
                  onClick={() => {
                    (F((e) => !e), me(``), se(!1), N(!1), ue(!1));
                  }}
                  style={{
                    width: `100%`,
                    textAlign: `left`,
                    background: `var(--bg)`,
                    border: `1.5px solid var(--mint)`,
                    borderRadius: 12,
                    padding: `10px 12px`,
                    cursor: `pointer`,
                    color: d ? `var(--fg)` : `var(--accent-text)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                    gap: 10,
                    fontFamily: `var(--font-ui)`,
                    fontSize: 13,
                  }}
                >
                  <span>{d || `Select Country`}</span>
                  <span
                    style={{
                      fontSize: 10,
                      color: `var(--emerald-700)`,
                      transform: P ? `rotate(180deg)` : `rotate(0deg)`,
                      transition: `transform 0.2s`,
                      flexShrink: 0,
                    }}
                  >
                    ▼
                  </span>
                </button>
                {P && (
                  <div
                    style={{
                      position: `absolute`,
                      top: `110%`,
                      left: 0,
                      right: 0,
                      zIndex: 50,
                      background: `var(--surface)`,
                      borderRadius: 14,
                      border: `1.5px solid var(--line)`,
                      boxShadow: `0 12px 40px color-mix(in srgb, var(--shadow) 14%, transparent)`,
                      overflow: `hidden`,
                    }}
                  >
                    <div
                      style={{
                        padding: 8,
                        borderBottom: `1px solid var(--line)`,
                      }}
                    >
                      <input
                        type="text"
                        autoFocus={!0}
                        placeholder="Search..."
                        value={pe}
                        onChange={(e) => me(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="filter-input"
                        style={{
                          padding: `7px 10px`,
                          fontSize: 12.5,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        maxHeight: 220,
                        overflowY: `auto`,
                        padding: `6px 8px`,
                      }}
                    >
                      {M.filter((e) => ye(e, pe)).length === 0 && (
                        <div
                          style={{
                            padding: `10px 8px`,
                            fontSize: 12.5,
                            color: `var(--accent-text)`,
                          }}
                        >
                          No matches
                        </div>
                      )}
                      {M.filter((e) => ye(e, pe)).map((e) => {
                        let t = e,
                          n = d === e;
                        return (
                          <button className="nk-btn nk-btn-soft"
                            key={t}
                            type="button"
                            onClick={() => {
                              (f(e), F(!1));
                            }}
                            style={{
                              width: `100%`,
                              textAlign: `left`,
                              padding: `7px 10px`,
                              border: `none`,
                              background: n ? `var(--surface-2)` : `transparent`,
                              color: n ? `var(--emerald-700)` : `var(--fg)`,
                              fontWeight: n ? 700 : 400,
                              fontFamily: `var(--font-ui)`,
                              fontSize: 12.5,
                              cursor: `pointer`,
                              borderRadius: 8,
                              transition: `background 0.15s`,
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = `var(--surface-2)`)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = n
                                ? `var(--surface-2)`
                                : `transparent`)
                            }
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                style={{
                  display: `block`,
                  fontSize: 11,
                  fontWeight: 700,
                  color: `var(--emerald-700)`,
                  marginBottom: 6,
                  letterSpacing: `0.07em`,
                  textTransform: `uppercase`,
                }}
              >
                Location
              </label>
              <input
                type="text"
                placeholder="City name..."
                value={p}
                onChange={(e) => m(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          background: `var(--surface-2)`,
          borderBottom: `1px solid var(--line)`,
          padding: `10px 40px`,
        }}
      >
        <div style={{ maxWidth: 1060, margin: `0 auto` }}>
          <p style={{ fontSize: 13, color: `var(--muted)` }}>
            {r ? (
              n?.membership?.plan === `free` ? (
                <>
                  <strong>Free Account:</strong>
                  {
                    " up to 3 new contacts per calendar month, with unlimited messaging once you've connected."
                  }{" "}
                  <Link
                    to="/how-it-works?tab=membership"
                    style={{
                      color: `var(--emerald-700)`,
                      fontWeight: 700,
                      textDecoration: `none`,
                    }}
                  >
                    Upgrade for more →
                  </Link>
                </>
              ) : (
                <>
                  <strong>
                    {n?.membership?.plan === `premium` ? `Premium` : `Basic`}
                    {" Account:"}
                  </strong>
                  {" Enjoy your expanded messaging limits!"}
                </>
              )
            ) : (
              <>
                <strong>Browsing as a guest:</strong>
                {" anyone can explore who's online."}{" "}
                <Link
                  to="/login"
                  state={{ from: `/explore` }}
                  style={{
                    color: `var(--emerald-700)`,
                    fontWeight: 700,
                    textDecoration: `none`,
                  }}
                >
                  Sign in
                </Link>{" "}
                to start chatting.
              </>
            )}
          </p>
        </div>
      </div>
      <section
        style={{ padding: `44px 40px`, maxWidth: 1100, margin: `0 auto` }}
      >
        {x ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `var(--danger)`,
            }}
          >
            <p style={{ fontSize: 14 }}>{x}</p>
          </div>
        ) : y ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `var(--accent-text)`,
            }}
          >
            <p style={{ fontSize: 14 }}>Loading profiles…</p>
          </div>
        ) : Se.length === 0 ? (
          <div
            style={{
              textAlign: `center`,
              padding: `72px 24px`,
              color: `var(--accent-text)`,
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 14 }}>🌿</div>
            <h3
              style={{
                fontFamily: `var(--font-display)`,
                fontSize: 22,
                fontWeight: 700,
                color: `var(--fg)`,
                marginBottom: 6,
              }}
            >
              No matches found
            </h3>
            <p style={{ fontSize: 14, color: `var(--muted)` }}>
              Try adjusting your filters to see more people.
            </p>
          </div>
        ) : (
          <Reveal stagger
            style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fill, minmax(210px, 1fr))`,
              gap: 20,
            }}
          >
            {Se.map((e) => (
              <SpotlightCard
                key={e.id}
                className="card-hover"
                onClick={() => we(e)}
                style={{
                  background: `var(--surface)`,
                  borderRadius: 18,
                  overflow: `hidden`,
                  border: `1px solid var(--line)`,
                  boxShadow: `0 4px 20px color-mix(in srgb, var(--shadow) 7%, transparent)`,
                  position: `relative`,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(160deg, var(--surface-2) 0%, var(--mint) 100%)`,
                    padding: `22px 0 14px`,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 6,
                    position: `relative`,
                  }}
                >
                  {e.avatarUrl ? (
                    <img
                      src={e.avatarUrl}
                      alt={e.displayName}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: `50%`,
                        objectFit: `cover`,
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: 52, lineHeight: 1 }}>
                      {$n[e.gender] || `🙂`}
                    </div>
                  )}
                  <span
                    className={`status-dot ${e.onlineStatus}${e.onlineStatus === `online` ? ` pulse` : ``}`}
                    style={{
                      position: `absolute`,
                      bottom: 16,
                      right: `calc(50% - 26px)`,
                      border: `2px solid var(--surface)`,
                    }}
                  />
                  <button className="nk-btn"
                    onClick={(t) => {
                      (t.stopPropagation(),
                        E({
                          type: `user`,
                          id: e.id,
                          name: e.displayName,
                        }));
                    }}
                    title="Block or report"
                    style={{
                      position: `absolute`,
                      top: 8,
                      right: 8,
                      background: `color-mix(in srgb, var(--overlay) 35%, transparent)`,
                      border: `none`,
                      borderRadius: `50%`,
                      width: 26,
                      height: 26,
                      color: `#fff`,
                      cursor: `pointer`,
                      fontSize: 13,
                      lineHeight: 1,
                    }}
                  >
                    ⋮
                  </button>
                </div>
                <div style={{ padding: `12px 14px 16px` }}>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                      marginBottom: 2,
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        gap: 5,
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: `var(--font-display)`,
                          fontWeight: 700,
                          fontSize: 14.5,
                          color: `var(--fg)`,
                          overflow: `hidden`,
                          textOverflow: `ellipsis`,
                          whiteSpace: `nowrap`,
                        }}
                      >
                        {e.displayName}{" "}
                        {e.verified && <span title="Verified">✅</span>}
                      </span>
                      <PlanBadge plan={e.plan} />
                    </span>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: `var(--muted)`,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {e.age ? `${e.age} yrs` : ``}
                    </span>
                  </div>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      gap: 4,
                      marginBottom: 10,
                    }}
                  >
                    <span
                      className={`status-dot ${e.onlineStatus}`}
                      style={{ width: 7, height: 7 }}
                    />
                    <span
                      style={{
                        fontSize: 11.5,
                        color:
                          e.onlineStatus === `online` ? `var(--online)` : `var(--emerald-500)`,
                        fontWeight: 500,
                      }}
                    >
                      {e.onlineStatus === `online` ? `Online now` : `Offline`}
                    </span>
                  </div>
                  <div
                    style={{
                      background: `var(--surface-2)`,
                      border: `1px solid var(--line)`,
                      borderRadius: 10,
                      padding: `8px 10px`,
                      marginBottom: 12,
                      display: `flex`,
                      flexDirection: `column`,
                      gap: 4,
                    }}
                  >
                    {[
                      { label: `Religion`, value: e.religion },
                      {
                        label: `Nationality`,
                        value: e.nationality,
                      },
                      {
                        label: `Location`,
                        value: e.location || e.city,
                      },
                    ].map(({ label: e, value: t }) => (
                      <div
                        key={e}
                        style={{
                          fontSize: 11.5,
                          display: `flex`,
                          justifyContent: `space-between`,
                        }}
                      >
                        <span
                          style={{
                            color: `var(--muted)`,
                            fontWeight: 600,
                          }}
                        >
                          {e}
                        </span>
                        <span
                          style={{
                            color: `var(--emerald-700)`,
                            fontWeight: 500,
                          }}
                        >
                          {t || `—`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(t) => {
                      (t.stopPropagation(), Ce(e));
                    }}
                    disabled={C === e.id}
                    className="nk-btn nk-btn-primary btn-primary"
                  >
                    {C === e.id ? `Starting…` : `💬 Chat Now`}
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </Reveal>
        )}
      </section>
      {T && (
        <ReportBlockModal
          target={T}
          onClose={() => E(null)}
          onBlocked={() => {
            (E(null), xe(), i());
          }}
        />
      )}
      {ee && (
        <Toast message={ee.message} tone={ee.tone} onDismiss={() => D(null)} />
      )}
      {O && <ProfileModal personId={O} onClose={() => k(null)} />}
      {A && <UpgradeModal message={A} onClose={() => te(null)} />}
      <section
        style={{
          background: `linear-gradient(160deg, var(--surface-2) 0%, var(--surface-2) 100%)`,
          borderTop: `1px solid var(--line)`,
          padding: `64px 40px 72px`,
          textAlign: `center`,
        }}
      >
        <div style={{ maxWidth: 620, margin: `0 auto` }}>
          <div
            style={{
              fontSize: 13,
              color: `var(--emerald-700)`,
              letterSpacing: 4,
              marginBottom: 12,
              opacity: 0.6,
            }}
          >
            ⌒ ☽ ⌒
          </div>
          <h2
            style={{
              fontFamily: `var(--font-display)`,
              fontSize: `clamp(26px, 4vw, 40px)`,
              fontWeight: 700,
              color: `var(--fg)`,
              letterSpacing: `-0.025em`,
              marginBottom: 10,
            }}
          >
            {"Ready to find your "}
            <span className="nk-shiny">match?</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: `var(--muted)`,
              marginBottom: 34,
              fontStyle: `italic`,
            }}
          >
            Create a verified profile and unlock unlimited chats with all these
            amazing people.
          </p>
          <Link className="nk-btn nk-btn-primary"
            to="/signup"
            style={{
              display: `inline-block`,
              background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 100%)`,
              color: `#fff`,
              textDecoration: `none`,
              padding: `14px 44px`,
              borderRadius: 32,
              fontFamily: `var(--font-ui)`,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: `0.04em`,
              boxShadow: `0 6px 24px color-mix(in srgb, var(--shadow) 35%, transparent)`,
            }}
          >
            Create Free Profile
          </Link>
        </div>
      </section>
      <div
        style={{
          background: `linear-gradient(135deg, var(--deep) 0%, #0D3F2D 55%, #11563D 100%)`,
          padding: `16px 40px`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          gap: 10,
        }}
      >
        <span
          style={{
            color: `#B7E4C7`,
            fontSize: 13,
            letterSpacing: `0.18em`,
            fontWeight: 600,
            textTransform: `uppercase`,
          }}
        >
          Because everyone deserves a second chance at happiness.
        </span>
        <span style={{ color: `var(--accent-text)`, fontSize: 16 }}>♥</span>
      </div>
      <footer
        style={{
          background: `var(--deep)`,
          color: `var(--accent-text)`,
          padding: `32px 40px`,
          textAlign: `center`,
        }}
      >
        <div
          style={{
            fontFamily: `var(--font-display)`,
            fontWeight: 700,
            fontSize: 22,
            color: `#fff`,
            letterSpacing: `-0.02em`,
            marginBottom: 10,
          }}
        >
          Nikha<span style={{ color: `var(--accent-text)` }}>2</span>{" "}
          <span style={{ color: `var(--emerald-700)` }}>♡</span>
        </div>
        <p
          style={{
            margin: `0 0 14px`,
            fontSize: 13,
            opacity: 0.5,
            fontFamily: `var(--font-ui)`,
          }}
        >
          © 2026 Nikha2 — The Second Chance. All rights reserved.
        </p>
        <div style={{ display: `flex`, justifyContent: `center`, gap: 24 }}>
          {[
            [`Privacy Policy`, `/privacy`],
            [`Terms & Conditions`, `/terms`],
          ].map(([e, t]) => (
            <Link
              key={e}
              to={t}
              style={{
                fontSize: 12,
                color: `var(--accent-text)`,
                opacity: 0.6,
                textDecoration: `none`,
                fontFamily: `var(--font-ui)`,
                transition: `opacity 0.2s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = `1`)}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = `0.6`)}
            >
              {e}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}

export { ExplorePage };
