// Pure motion helpers shared by MotionProvider and the motion components.
export const MOTION_KEY = 'nikha2-motion';

export function resolveMotion(setting, systemReduced) {
  if (setting === 'on') return true;
  if (setting === 'off') return false;
  return !systemReduced;
}

// Only content that starts below the fold may wait for a scroll reveal; anything visible at load renders as-is.
export function shouldStartHidden(rect, viewportH, motionEnabled) {
  return !!motionEnabled && rect.top >= viewportH * 0.9;
}

export function countUpValue(to, progress) {
  const p = Math.min(1, Math.max(0, progress));
  return Math.round(to * (1 - Math.pow(1 - p, 3)));
}
