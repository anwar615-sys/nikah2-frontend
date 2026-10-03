// Pure maths for the living hero (sunrise timeline, image→hero mapping, performance guard).
export const easeOutCubic = (x) => {
  const c = Math.min(1, Math.max(0, x));
  return 1 - Math.pow(1 - c, 3);
};
export const smooth = (a, b, x) => {
  const c = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return c * c * (3 - 2 * c);
};

// it = seconds of visible intro time. fromDay = replay started from full daylight (fade into dawn, no cut).
export function introValues(it, fromDay) {
  const into = fromDay ? smooth(0, 1.1, it) : 1;
  return {
    rise: easeOutCubic((it - 1.0) / 5.2),
    dawn: (1 - smooth(3.4, 9.5, it)) * into,
    sun: 1 - 0.5 * smooth(8, 12, it),
  };
}

// Image uv (0..1, y down) → CSS px inside a w×h hero, with the shader's cover fit.
export function uvToHero(ux, uy, w, h, imgAspect) {
  const ca = w / h;
  let sx = ux;
  let sy = uy;
  if (ca > imgAspect) sy = (uy - 0.5) / (imgAspect / ca) + 0.5;
  else sx = (ux - 0.5) / (ca / imgAspect) + 0.5;
  return { x: sx * w, y: sy * h };
}

// Slow for 3s: full → 0.6 resolution; still slow at 0.6 → fall back to the still photo.
export function qualityStep(state, frameAvgMs, dt) {
  const limit = state.quality === 1 ? 28 : 42;
  let slowFor = frameAvgMs > limit ? state.slowFor + dt : Math.max(0, state.slowFor - dt);
  let quality = state.quality;
  let fallback = false;
  if (slowFor > 3) {
    slowFor = 0;
    if (quality > 0.6) quality = 0.6;
    else fallback = true;
  }
  return { quality, slowFor, fallback };
}
