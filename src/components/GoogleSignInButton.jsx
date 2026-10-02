import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

var wn = import.meta.env.VITE_GOOGLE_CLIENT_ID || `420155966557-ku317ls22tq2cgnh28uidj4q1gcsgqe5.apps.googleusercontent.com`;

function GoogleSignInButton({ redirectTo: e = `/explore`, onError: t }) {
  let n = (0, React.useRef)(null),
    [r, i] = (0, React.useState)(!1),
    { loginWithGoogle: a } = useAuth(),
    o = useNavigate();
  return (
    (0, React.useEffect)(() => {
      let n = !1,
        r = () => {
          if (!n) {
            if (!window.google?.accounts?.id) {
              setTimeout(r, 150);
              return;
            }
            (window.google.accounts.id.initialize({
              client_id: wn,
              callback: async ({ credential: n }) => {
                try {
                  o(
                    (await a(n)).me?.profileComplete === !1
                      ? `/complete-profile`
                      : e,
                    { state: { from: e } },
                  );
                } catch (e) {
                  t?.(e.message || `Google sign-in failed. Please try again.`);
                }
              },
            }),
              i(!0));
          }
        };
      return (
        r(),
        () => {
          n = !0;
        }
      );
    }, [a, o, e, t]),
    (0, React.useEffect)(() => {
      !r ||
        !n.current ||
        window.google.accounts.id.renderButton(n.current, {
          theme: `outline`,
          size: `large`,
          shape: `pill`,
          text: `continue_with`,
          logo_alignment: `center`,
          width: 360,
        });
    }, [r]),
    (
      <div
        ref={n}
        style={{ display: `flex`, justifyContent: `center`, width: `100%` }}
      />
    )
  );
}

export { GoogleSignInButton };
