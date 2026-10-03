import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { THEME_KEY, nextTheme, resolveTheme } from "../lib/theme";

const ThemeContext = createContext(null);

function readStored() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function systemDark() {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Motion is off when the visitor chose "off", or left it on "auto" with reduced motion requested.
// (MotionContext arrives later and writes data-motion; until then the system setting decides.)
function motionAllowed() {
  const m = document.documentElement.dataset.motion;
  if (m === "off") return false;
  if (m === "on") return true;
  return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    typeof document !== "undefined" && (document.documentElement.dataset.theme === "dark" || document.documentElement.dataset.theme === "light")
      ? document.documentElement.dataset.theme
      : resolveTheme(readStored(), systemDark()),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Follow the system setting while the visitor has not chosen a theme themselves.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const stored = readStored();
      if (stored !== "light" && stored !== "dark") setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const setTheme = useCallback((t) => {
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {
      /* storage blocked: theme still applies for this visit */
    }
    document.documentElement.dataset.theme = t;
    setThemeState(t);
  }, []);

  const toggle = useCallback(
    (originEl) => {
      const t = nextTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
      if (!document.startViewTransition || !motionAllowed()) {
        setTheme(t);
        return;
      }
      const r = originEl?.getBoundingClientRect?.();
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const y = r ? r.top + r.height / 2 : 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const vt = document.startViewTransition(() => setTheme(t));
      vt.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
    },
    [setTheme],
  );

  const value = useMemo(() => ({ theme, setTheme, toggle }), [theme, setTheme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
