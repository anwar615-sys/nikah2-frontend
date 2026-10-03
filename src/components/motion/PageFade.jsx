import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMotion } from "../../context/MotionContext";

// Fades the page in over 250ms whenever the path changes. Nothing is remounted, and no
// stacking context is left behind once the fade ends (fixed modals and widgets keep working).
export function PageFade({ children }) {
  const { pathname } = useLocation();
  const { motionEnabled } = useMotion();
  const ref = useRef(null);
  useEffect(() => {
    if (!motionEnabled || !ref.current?.animate) return;
    ref.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "ease" });
  }, [pathname, motionEnabled]);
  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
