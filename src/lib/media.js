export const LAPTOP_MIN_WIDTH = 992;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function laptopQuery() {
  return window.matchMedia(`(min-width: ${LAPTOP_MIN_WIDTH}px)`);
}

export function isCompact() {
  return window.matchMedia(`(max-width: ${LAPTOP_MIN_WIDTH - 1}px)`).matches;
}
