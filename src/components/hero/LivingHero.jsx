import { useCallback, useEffect, useRef, useState } from "react";
import { useMotion } from "../../context/MotionContext";
import { createBirds } from "./birds";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./heroShader";
import { introValues, qualityStep, uvToHero } from "./heroMath";
import "./hero.css";

const PAUSE_KEY = "nikha2-hero-paused";
const PLAYED_KEY = "nikha2-sunrise-played";
const HERO_SRC = "/assets/hero.webp";

const store = {
  get(s, k) {
    try {
      return s.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set(s, k, v) {
    try {
      s.setItem(k, v);
    } catch (e) {
      /* storage blocked */
    }
  },
};

/**
 * The home hero: the lake photo running live (water, leaves, clouds, birds) with a sunrise that
 * releases the headline letters. Layers: still photo → WebGL scene → birds → theme veil → content.
 * `headline` is [line1, line2]; `children` (tagline, pills, buttons) fade in after the sunrise.
 * `after` renders below the content inside the section (e.g. the features strip).
 */
export function LivingHero({ headline, children, after, className = "", style, contentClassName = "", contentStyle, alt = "" }) {
  const { motionEnabled, setSetting } = useMotion();
  const [paused, setPaused] = useState(() => store.get(localStorage, PAUSE_KEY) === "1");
  const [glOk, setGlOk] = useState(true);
  const [fallback, setFallback] = useState(false);
  const [split, setSplit] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const sceneRef = useRef(null);
  const birdsRef = useRef(null);
  const veilRef = useRef(null);
  const hRef = useRef(null);
  const eng = useRef({
    running: false,
    intro: { t: 0, on: false, emitted: false, fromDay: false, played: store.get(sessionStorage, PLAYED_KEY) === "1" },
    timers: [],
    imgAspect: 1376 / 768,
  });

  const running = motionEnabled && !paused && glOk && !fallback;
  eng.current.running = running;

  const clearTimers = () => {
    eng.current.timers.forEach(clearTimeout);
    eng.current.timers = [];
  };

  const showTextNow = useCallback(() => {
    clearTimers();
    hRef.current?.querySelectorAll(".ch").forEach((c) => c.getAnimations().forEach((a) => a.cancel()));
    setWaiting(false);
    setSplit(false);
  }, []);

  const startIntro = useCallback((fromDay) => {
    clearTimers();
    Object.assign(eng.current.intro, { t: 0, on: true, emitted: false, fromDay: !!fromDay });
    setSplit(true);
    setWaiting(true);
  }, []);

  // Letters fly out of the sun, gold, and land in their headline colours.
  const emitLetters = useCallback(() => {
    const e = eng.current;
    e.intro.emitted = true;
    e.intro.played = true;
    store.set(sessionStorage, PLAYED_KEY, "1");
    const hero = heroRef.current;
    const h = hRef.current;
    if (!hero || !h) return;
    const hr = hero.getBoundingClientRect();
    const sun = uvToHero(0.505, 0.43, hr.width, hr.height, e.imgAspect);
    const css = getComputedStyle(document.documentElement);
    const endL1 = css.getPropertyValue("--hero-h1").trim();
    const endL2 = css.getPropertyValue("--hero-h2b").trim();
    const chars = h.querySelectorAll(".ch");
    chars.forEach((c, i) => {
      const cr = c.getBoundingClientRect();
      const dx = sun.x - (cr.left - hr.left + cr.width / 2);
      const dy = sun.y - (cr.top - hr.top + cr.height / 2);
      const end = c.closest(".l2") ? endL2 : endL1;
      c.animate(
        [
          { transform: `translate(${dx}px,${dy}px) scale(.15)`, opacity: 0, filter: "blur(8px)", color: "#FFE3A3", textShadow: "0 0 24px rgba(255,190,90,1)" },
          { opacity: 1, color: "#FFE3A3", textShadow: "0 0 22px rgba(255,190,90,.9)", offset: 0.3 },
          { transform: "none", opacity: 1, filter: "blur(0)", color: end, textShadow: "0 0 0 rgba(255,190,90,0)" },
        ],
        { duration: 1600, delay: i * 55, easing: "cubic-bezier(.16,.8,.24,1)", fill: "both" },
      );
    });
    const total = chars.length * 55 + 1600;
    e.timers.push(setTimeout(() => setWaiting(false), total * 0.55));
    e.timers.push(setTimeout(() => setSplit(false), total + 400));
  }, []);

  // ---- engine: WebGL scene, birds, visibility gating, performance guard ----
  useEffect(() => {
    const e = eng.current;
    const hero = heroRef.current;
    const img = imgRef.current;
    const cv = sceneRef.current;
    const gl = cv.getContext("webgl", { premultipliedAlpha: false, antialias: false });
    if (!gl) {
      setGlOk(false);
      return undefined;
    }
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (err) {
      console.warn("Living hero disabled:", err.message);
      setGlOk(false);
      return undefined;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ["t", "res", "imgAspect", "rise", "dawn", "sunStrength"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));
    const tex = gl.createTexture();

    let quality = 1;
    let slowFor = 0;
    let frameAvg = 16;
    let visible = true;
    let ready = false;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    cv.__draws = 0;
    const birds = createBirds(birdsRef.current);

    const resize = () => {
      const d = Math.min(1.5, window.devicePixelRatio || 1) * quality;
      const r = cv.getBoundingClientRect();
      cv.width = Math.max(2, Math.round(r.width * d));
      cv.height = Math.max(2, Math.round(r.height * d));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(U.res, cv.width, cv.height);
    };
    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      e.imgAspect = img.naturalWidth / img.naturalHeight;
      gl.uniform1f(U.imgAspect, e.imgAspect);
    };

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver((es) => (visible = es[0].isIntersecting), { threshold: 0.01 })
        : null;
    io?.observe(hero);

    const frame = (now) => {
      const rawDt = (now - last) / 1000;
      const dt = Math.min(0.05, rawDt);
      last = now;
      if (e.running && ready && visible && !document.hidden) {
        t += dt;
        const intro = e.intro;
        let iv = { rise: 1, dawn: 0, sun: 0.5 };
        if (intro.on) {
          intro.t += Math.min(0.25, rawDt); // the sunrise clock only runs while it can be seen
          iv = introValues(intro.t, intro.fromDay);
          if (!intro.emitted && iv.rise > 0.62) emitLetters();
          if (!intro.emitted && intro.t > 9) {
            intro.emitted = true; // safety net: the headline always appears
            showTextNow();
          }
        }
        if (veilRef.current) veilRef.current.style.opacity = String(1 - 0.55 * iv.dawn);
        gl.uniform1f(U.t, t);
        gl.uniform1f(U.rise, iv.rise);
        gl.uniform1f(U.dawn, iv.dawn);
        gl.uniform1f(U.sunStrength, iv.sun);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        cv.__draws++;
        birds.step(dt);
        frameAvg = frameAvg * 0.95 + dt * 1000 * 0.05;
        const q = qualityStep({ quality, slowFor }, frameAvg, dt);
        slowFor = q.slowFor;
        if (q.quality !== quality) {
          quality = q.quality;
          resize();
        }
        if (q.fallback) setFallback(true);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      upload();
      resize();
      birds.resize();
      ready = true;
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      if (!ready) return;
      resize();
      birds.resize();
    };
    window.addEventListener("resize", onResize);
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      img.removeEventListener("load", start);
      clearTimers();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [emitLetters, showTextNow]);

  // Start the sunrise the first time the scene runs in this session; settle the text whenever it stops.
  useEffect(() => {
    const intro = eng.current.intro;
    if (running) {
      if (!intro.played && !intro.on) startIntro(false);
    } else {
      if (!intro.emitted) intro.on = false; // an interrupted sunrise starts over next time
      showTextNow();
      if (veilRef.current) veilRef.current.style.opacity = "1";
    }
  }, [running, startIntro, showTextNow]);

  const optIn = () => {
    if (!motionEnabled) setSetting("on");
  };
  // Pause stops the scene and is remembered. Play is an explicit choice: it also turns motion on
  // (overriding a reduced-motion system setting) and clears a slow-device fallback.
  const togglePause = () => {
    if (running) {
      setPaused(true);
      store.set(localStorage, PAUSE_KEY, "1");
      return;
    }
    optIn();
    setPaused(false);
    setFallback(false);
    store.set(localStorage, PAUSE_KEY, "0");
  };
  const replay = () => {
    const fromDay = running && eng.current.intro.played;
    optIn();
    if (paused) {
      setPaused(false);
      store.set(localStorage, PAUSE_KEY, "0");
    }
    setFallback(false);
    startIntro(fromDay);
  };

  const [l1, l2] = headline;
  const renderLine = (text) =>
    split
      ? text.split(" ").map((w, wi, arr) => (
          <span key={wi}>
            <span className="wd">
              {w.split("").map((ch, ci) => (
                <span key={ci} className="ch">
                  {ch}
                </span>
              ))}
            </span>
            {wi < arr.length - 1 ? " " : null}
          </span>
        ))
      : text;
  const showScene = running;
  const pausedForUser = !running;

  return (
    <section ref={heroRef} className={`nk-hero${waiting ? " intro-wait" : ""} ${className}`.trim()} style={style} aria-label={`${l1} ${l2}`}>
      <img ref={imgRef} className="nk-hero-layer nk-hero-still" src={HERO_SRC} alt={alt} fetchPriority="high" />
      <canvas ref={sceneRef} className="nk-hero-layer nk-hero-scene" aria-hidden="true" style={{ visibility: showScene ? "visible" : "hidden" }} />
      <canvas ref={birdsRef} className="nk-hero-layer nk-hero-birds" aria-hidden="true" style={{ visibility: showScene ? "visible" : "hidden" }} />
      <div ref={veilRef} className="nk-hero-layer nk-hero-veil" />
      <div className={`nk-hero-content ${contentClassName}`.trim()} style={contentStyle}>
        <h1 ref={hRef} className={`nk-hero-h${split ? " emitting" : ""}`} aria-label={`${l1} ${l2}`}>
          <span className="l1" aria-hidden="true">{renderLine(l1)}</span>
          <span className="l2" aria-hidden="true">{renderLine(l2)}</span>
        </h1>
        {children}
      </div>
      {after}
      {glOk && (
        <>
          <button type="button" className="nk-hero-ctl replay" onClick={replay} aria-label="Replay the sunrise" title="Replay the sunrise">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 17h16v1.6H4zM12 8.5a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5zM11.2 3.5h1.6v3h-1.6zM4.6 7.2l1.1-1.1 2.1 2.1-1.1 1.1zM16.2 8.2l2.1-2.1 1.1 1.1-2.1 2.1z" />
            </svg>
          </button>
          <button
            type="button"
            className="nk-hero-ctl"
            onClick={togglePause}
            aria-pressed={pausedForUser}
            aria-label={pausedForUser ? "Play background animation" : "Pause background animation"}
            title={pausedForUser ? "Play background animation" : "Pause background animation"}
          >
            {pausedForUser ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 6.2v11.6a.8.8 0 0 0 1.2.7l9.4-5.8a.8.8 0 0 0 0-1.4L9.2 5.5A.8.8 0 0 0 8 6.2z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="6" width="3.2" height="12" rx="1" />
                <rect x="13.8" y="6" width="3.2" height="12" rx="1" />
              </svg>
            )}
          </button>
        </>
      )}
    </section>
  );
}
