import * as React from "react";

function useInView(e = 0.15) {
  let t = (0, React.useRef)(null),
    [n, r] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let n = new IntersectionObserver(
        ([e]) => {
          e.isIntersecting && r(!0);
        },
        { threshold: e },
      );
      return (t.current && n.observe(t.current), () => n.disconnect());
    }, []),
    [t, n]
  );
}

export { useInView };
