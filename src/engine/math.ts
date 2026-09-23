export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};

export const smoothstep = (x: number) => {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
};

export const smootherstep = (x: number) => {
  const t = clamp(x, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export const easeInOutExpo = (x: number) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  if (x < 0.5) return Math.pow(2, 20 * x - 10) / 2;
  return (2 - Math.pow(2, -20 * x + 10)) / 2;
};

export const equalPowerCrossfade = (t: number) => {
  const clampedT = clamp(t, 0, 1);
  return {
    gainA: Math.cos(clampedT * 0.5 * Math.PI),
    gainB: Math.sin(clampedT * 0.5 * Math.PI)
  };
};

// 1D Perlin Noise placeholder (simple sine-based pseudo-random for shake)
export const perlin1D = (t: number, offset: number = 0) => {
  return Math.sin(t + offset) * Math.cos(t * 1.5 + offset) * Math.sin(t * 0.3 + offset);
};
