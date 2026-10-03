import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState } from "react";
import { useMotion } from "../../context/MotionContext";
import { shouldStartHidden } from "../../lib/motion";
import "./motion.css";

// Scroll reveal: 28px rise (+8px blur) over .8s. Content already on screen, or with motion off, is never hidden.
// With `stagger`, each child reveals on its own with a .12s x (i % 3) delay.
export function Reveal({ as: Tag = "div", delay = 0, blur = true, stagger = false, className = "", style, children, ...rest }) {
  if (stagger) {
    return (
      <Tag className={className} style={style} {...rest}>
        {Children.map(children, (child, i) =>
          isValidElement(child) ? (
            <RevealOne key={child.key ?? i} delay={delay + 0.12 * (i % 3)} blur={blur} display="contents-wrap">
              {child}
            </RevealOne>
          ) : (
            child
          ),
        )}
      </Tag>
    );
  }
  return (
    <RevealOne as={Tag} delay={delay} blur={blur} className={className} style={style} {...rest}>
      {children}
    </RevealOne>
  );
}

function RevealOne({ as: Tag = "div", delay, blur, className = "", style, display, children, ...rest }) {
  const ref = useRef(null);
  const { motionEnabled } = useMotion();
  const [state, setState] = useState("idle"); // idle | pending | shown

  useLayoutEffect(() => {
    const el = ref.current;
    // Anything still pending from an earlier run (e.g. motion was toggled) must become visible.
    const settle = () => setState((s) => (s === "pending" ? "shown" : s));
    if (!el || !motionEnabled || typeof IntersectionObserver === "undefined") {
      settle();
      return undefined;
    }
    if (!shouldStartHidden(el.getBoundingClientRect(), window.innerHeight, motionEnabled)) {
      settle();
      return undefined;
    }
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // Safety net: never leave content hidden (e.g. printing, odd scroll containers)
    const t = setTimeout(settle, 6000);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [motionEnabled]);

  const cls = `nk-reveal${state === "pending" ? " pending" : state === "shown" ? " shown" : ""}${blur ? " blur" : ""}`;
  const delayStyle = state === "shown" && delay ? { transitionDelay: `${delay}s` } : null;

  // Stagger children: put the reveal on the child element itself so grid/flex layouts are untouched.
  if (display === "contents-wrap" && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      className: `${children.props.className ?? ""} ${cls}`.trim(),
      style: { ...children.props.style, ...delayStyle },
    });
  }
  return (
    <Tag ref={ref} className={`${cls} ${className}`.trim()} style={{ ...style, ...delayStyle }} {...rest}>
      {children}
    </Tag>
  );
}
