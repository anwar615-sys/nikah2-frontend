import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MOTION_KEY, resolveMotion } from "../lib/motion";

const MotionContext = createContext({ motionEnabled: false, setting: "auto", setSetting: () => {} });

function readSetting() {
  try {
    const s = localStorage.getItem(MOTION_KEY);
    // Animations are part of the brand: they start on unless the visitor turns them off with the switch.
    return s === "on" || s === "off" || s === "auto" ? s : "on";
  } catch (e) {
    return "on";
  }
}
const reducedQuery = () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null);

export function MotionProvider({ children }) {
  const [setting, setSettingState] = useState(readSetting);
  const [systemReduced, setSystemReduced] = useState(() => !!reducedQuery()?.matches);

  useEffect(() => {
    const mq = reducedQuery();
    if (!mq) return undefined;
    const on = () => setSystemReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const motionEnabled = resolveMotion(setting, systemReduced);
  // Written synchronously in render as well as in the effect so first-paint CSS already knows the state.
  if (typeof document !== "undefined") document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
  }, [motionEnabled]);

  const setSetting = useCallback((s) => {
    try {
      if (s === "auto") localStorage.removeItem(MOTION_KEY);
      else localStorage.setItem(MOTION_KEY, s);
    } catch (e) {
      /* storage blocked: setting applies for this visit */
    }
    setSettingState(s);
  }, []);

  const value = useMemo(() => ({ motionEnabled, setting, setSetting }), [motionEnabled, setting, setSetting]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
