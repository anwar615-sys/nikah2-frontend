import * as React from "react";

function SupportChatWidget() {
  let [e, t] = (0, React.useState)(!1),
    [n, r] = (0, React.useState)([
      {
        from: `bot`,
        text: `As-salamu alaykum! 👋 Welcome to Nikha2. How can we help you today?`,
      },
    ]),
    [i, a] = (0, React.useState)(``),
    [o, s] = (0, React.useState)(1),
    [c, l] = (0, React.useState)(!1),
    u = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    e &&
      setTimeout(() => {
        (s(0), u.current?.scrollIntoView({ behavior: `smooth` }));
      }, 0);
  }, [e]);
  let d = () => {
    let e = i.trim();
    e &&
      (r((t) => [...t, { from: `user`, text: e }]),
      a(``),
      l(!0),
      setTimeout(() => {
        (l(!1),
          r((e) => [
            ...e,
            {
              from: `bot`,
              text: `Thank you for reaching out! Our team will get back to you shortly. JazakAllah Khair 🌿`,
            },
          ]));
      }, 1200));
  };
  return (
    <div style={{ position: `fixed`, bottom: 28, right: 28, zIndex: 200 }}>
      {e && (
        <div
          style={{
            position: `absolute`,
            bottom: 74,
            right: 0,
            width: `min(340px, calc(100vw - 40px))`,
            borderRadius: 24,
            background: `var(--surface)`,
            boxShadow: `0 16px 56px color-mix(in srgb, var(--shadow) 22%, transparent)`,
            overflow: `hidden`,
            animation: `slideUpFade 0.25s ease`,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 60%, var(--emerald-700) 100%)`,
              padding: `16px 18px`,
              display: `flex`,
              alignItems: `center`,
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: `50%`,
                background: `color-mix(in srgb, var(--surface) 15%, transparent)`,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                fontSize: 20,
                border: `1.5px solid rgba(255,255,255,0.25)`,
                flexShrink: 0,
              }}
            >
              🌿
            </div>
            <div>
              <div
                style={{
                  color: `#fff`,
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: `'DM Sans', sans-serif`,
                }}
              >
                Nikha2 Support
              </div>
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: `50%`,
                    background: `var(--online-soft)`,
                    display: `inline-block`,
                    boxShadow: `0 0 6px var(--online-soft)`,
                  }}
                />
                <span
                  style={{
                    color: `rgba(255,255,255,0.8)`,
                    fontSize: 11.5,
                    fontFamily: `'DM Sans', sans-serif`,
                  }}
                >
                  Online now
                </span>
              </div>
            </div>
            <button
              onClick={() => t(!1)}
              style={{
                marginLeft: `auto`,
                background: `color-mix(in srgb, var(--surface) 12%, transparent)`,
                border: `1px solid rgba(255,255,255,0.2)`,
                color: `#fff`,
                width: 30,
                height: 30,
                borderRadius: `50%`,
                cursor: `pointer`,
                fontSize: 13,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              padding: `14px 14px 10px`,
              maxHeight: 260,
              overflowY: `auto`,
              display: `flex`,
              flexDirection: `column`,
              gap: 10,
              background: `var(--bg)`,
            }}
          >
            {n.map((e, t) => (
              <div
                key={t}
                style={{
                  display: `flex`,
                  justifyContent: e.from === `user` ? `flex-end` : `flex-start`,
                  alignItems: `flex-end`,
                  gap: 6,
                }}
              >
                {e.from === `bot` && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: `50%`,
                      background: `var(--surface-2)`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    🌿
                  </div>
                )}
                <div
                  style={{
                    maxWidth: `75%`,
                    background:
                      e.from === `user`
                        ? `linear-gradient(135deg, var(--deep), var(--emerald-700))`
                        : `var(--surface)`,
                    color: e.from === `user` ? `#fff` : `var(--fg)`,
                    padding: `10px 16px`,
                    borderRadius:
                      e.from === `user`
                        ? `20px 20px 6px 20px`
                        : `20px 20px 20px 6px`,
                    fontSize: 13,
                    fontFamily: `'DM Sans', sans-serif`,
                    lineHeight: 1.55,
                    boxShadow:
                      e.from === `user`
                        ? `0 3px 12px color-mix(in srgb, var(--shadow) 25%, transparent)`
                        : `0 2px 8px rgba(0,0,0,0.07)`,
                  }}
                >
                  {e.text}
                </div>
              </div>
            ))}
            {c && (
              <div style={{ display: `flex`, alignItems: `center`, gap: 6 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: `50%`,
                    background: `var(--surface-2)`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    fontSize: 13,
                  }}
                >
                  🌿
                </div>
                <div
                  style={{
                    background: `var(--surface)`,
                    padding: `10px 16px`,
                    borderRadius: `20px 20px 20px 6px`,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.07)`,
                  }}
                >
                  <span
                    style={{
                      display: `flex`,
                      gap: 4,
                      alignItems: `center`,
                    }}
                  >
                    {[0, 1, 2].map((e) => (
                      <span
                        key={e}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: `50%`,
                          background: `var(--emerald-500)`,
                          display: `inline-block`,
                          animation: `typingDot 1.2s ${e * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={u} />
          </div>
          <div
            style={{
              display: `flex`,
              gap: 8,
              padding: `10px 12px`,
              background: `var(--surface)`,
              borderTop: `1px solid var(--line)`,
            }}
          >
            <input
              value={i}
              onChange={(e) => a(e.target.value)}
              onKeyDown={(e) => e.key === `Enter` && d()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: `1.5px solid var(--mint)`,
                borderRadius: 20,
                padding: `9px 14px`,
                fontSize: 13,
                fontFamily: `'DM Sans', sans-serif`,
                outline: `none`,
                background: `var(--bg)`,
                color: `var(--fg)`,
                transition: `border-color 0.2s`,
                minWidth: 0,
              }}
              onFocus={(e) => (e.target.style.borderColor = `var(--emerald-500)`)}
              onBlur={(e) => (e.target.style.borderColor = `var(--mint)`)}
            />
            <button
              onClick={d}
              style={{
                background: `linear-gradient(135deg, var(--deep), var(--emerald-700))`,
                border: `none`,
                borderRadius: `50%`,
                width: 38,
                height: 38,
                cursor: `pointer`,
                color: `#fff`,
                fontSize: 15,
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                boxShadow: `0 3px 10px color-mix(in srgb, var(--emerald-700) 35%, transparent)`,
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => t((e) => !e)}
        style={{
          width: 60,
          height: 60,
          borderRadius: `50%`,
          background: `linear-gradient(135deg, var(--deep) 0%, var(--emerald-700) 50%, var(--emerald-500) 100%)`,
          border: `none`,
          cursor: `pointer`,
          boxShadow: `0 6px 28px color-mix(in srgb, var(--emerald-700) 50%, transparent)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          fontSize: 24,
          transition: `transform 0.2s`,
          position: `relative`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = `scale(1.08)`)}
        onMouseLeave={(e) => (e.currentTarget.style.transform = `scale(1)`)}
      >
        <span>{e ? `✕` : `💬`}</span>
        {!e && o > 0 && (
          <span
            style={{
              position: `absolute`,
              top: -3,
              right: -3,
              background: `var(--danger)`,
              color: `#fff`,
              width: 20,
              height: 20,
              borderRadius: `50%`,
              fontSize: 11,
              fontWeight: 700,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
              border: `2px solid var(--line)`,
            }}
          >
            {o}
          </span>
        )}
      </button>
      {!e && (
        <div
          style={{
            position: `absolute`,
            bottom: 16,
            right: 70,
            background: `var(--deep)`,
            color: `#fff`,
            padding: `6px 13px`,
            borderRadius: 20,
            fontSize: 12,
            fontFamily: `'DM Sans', sans-serif`,
            whiteSpace: `nowrap`,
            boxShadow: `0 4px 14px rgba(0,0,0,0.2)`,
            pointerEvents: `none`,
          }}
        >
          Chat with us 💚
        </div>
      )}
      <style>
        {
          "\n        @keyframes slideUpFade {\n          from { opacity: 0; transform: translateY(16px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes typingDot {\n          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }\n          30% { transform: translateY(-4px); opacity: 1; }\n        }\n      "
        }
      </style>
    </div>
  );
}

export { SupportChatWidget };
