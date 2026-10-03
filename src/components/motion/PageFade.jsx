import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMotion } from "../../context/MotionContext";

// Eases the page in over 200ms (from 75% opacity, never from black) whenever the path changes. Nothing is remounted, and no
// stacking context is left behind once the fade ends (fixed modals and widgets keep working).
export function PageFade({ children }) {
  const { pathname } = useLocation();
  const { motionEnabled } = useMotion();
  const ref = useRef(null);
  useEffect(() => {
    if (!motionEnabled || !ref.current?.animate) return;
    ref.current.animate([{ opacity: 0.75, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }], { duration: 200, easing: "ease-out" });
  }, [pathname, motionEnabled]);
  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
