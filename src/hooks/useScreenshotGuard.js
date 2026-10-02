import * as React from "react";

function useScreenshotGuard(e) {
  (0, React.useEffect)(() => {
    let t = (t) => {
        if (
          t.key === `PrintScreen` ||
          (t.metaKey && t.shiftKey && [`3`, `4`, `5`].includes(t.key))
        ) {
          try {
            navigator.clipboard.writeText(``);
          } catch {}
          e();
        }
      },
      n = () => {
        document.visibilityState === `hidden` && e();
      };
    return (
      document.addEventListener(`keyup`, t),
      document.addEventListener(`visibilitychange`, n),
      () => {
        (document.removeEventListener(`keyup`, t),
          document.removeEventListener(`visibilitychange`, n));
      }
    );
  }, [e]);
}

export { useScreenshotGuard };
