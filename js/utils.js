/**
 * UTILIDADES COMPARTIDAS
 */

const Utils = {
  prefersReducedMotion: () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  getPerformanceTier: () => {
    const cores = navigator.hardwareConcurrency || 2;
    const mem   = navigator.deviceMemory    || 2;
    if (cores >= 6 && mem >= 4) return 'high';
    if (cores >= 4 && mem >= 2) return 'medium';
    return 'low';
  },

  clamp: (v, mn, mx) => Math.min(Math.max(v, mn), mx),
  lerp:  (a, b, t)   => a + (b - a) * t,
  rand:  (mn, mx)    => Math.random() * (mx - mn) + mn,
  randInt:(mn,mx)    => Math.floor(Math.random() * (mx - mn + 1)) + mn,
  dist:  (x1,y1,x2,y2) => Math.hypot(x2-x1, y2-y1),

  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOut:    t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2,
  easeOutBack:  t => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

const PageVis = {
  isHidden: () => document.hidden,
  onChange:  cb => document.addEventListener('visibilitychange', cb),
};
