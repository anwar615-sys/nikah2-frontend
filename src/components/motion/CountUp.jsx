import { useEffect, useRef, useState } from "react";
import { useMotion } from "../../context/MotionContext";
import { countUpValue } from "../../lib/motion";

// Counts from 0 to `to` (ease-out) when it scrolls into view. Shows the final number when motion is off.
export function CountUp({ to, suffix = "", duration = 1400, className, style }) {
  const { motionEnabled } = useMotion();
  const target = Number(to) || 0;
  const [value, setValue] = useState(motionEnabled ? 0 : target);
  const ref = useRef(null);

  useEffect(() => {
    if (!motionEnabled || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = (now - start) / duration;
        setValue(countUpValue(target, p));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [motionEnabled, target, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
