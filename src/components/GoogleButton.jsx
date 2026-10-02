import * as React from "react";

var Pa = import.meta.env.VITE_GOOGLE_CLIENT_ID || `420155966557-ku317ls22tq2cgnh28uidj4q1gcsgqe5.apps.googleusercontent.com`;

function GoogleButton({ onCredential: e, disabled: t }) {
  let n = (0, React.useRef)(null),
    [r, i] = (0, React.useState)(!1),
    a = (0, React.useRef)(e);
  return (
    (a.current = e),
    (0, React.useEffect)(() => {
      let e = !1,
        t = () => {
          if (!e) {
            if (!window.google?.accounts?.id) {
              setTimeout(t, 150);
              return;
            }
            (window.google.accounts.id.initialize({
              client_id: Pa,
              callback: ({ credential: e }) => a.current?.(e),
            }),
              i(!0));
          }
        };
      return (
        t(),
        () => {
          e = !0;
        }
      );
    }, []),
    (0, React.useEffect)(() => {
      !r ||
        !n.current ||
        window.google.accounts.id.renderButton(n.current, {
          theme: `outline`,
          size: `large`,
          shape: `pill`,
          text: `continue_with`,
          logo_alignment: `center`,
          width: 340,
        });
    }, [r]),
    (
      <div
        ref={n}
        style={{
          display: `flex`,
          justifyContent: `center`,
          width: `100%`,
          opacity: t ? 0.5 : 1,
          pointerEvents: t ? `none` : `auto`,
        }}
      />
    )
  );
}

export { GoogleButton };
