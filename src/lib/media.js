export const LAPTOP_MIN_WIDTH = 992;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function mouseQuery() {
  return window.matchMedia(
    `(min-width: ${LAPTOP_MIN_WIDTH}px) and (hover: hover) and (pointer: fine)`,
  );
}

export function isCompact() {
  return window.matchMedia(`(max-width: ${LAPTOP_MIN_WIDTH - 1}px)`).matches;
}

// Safari caps Lenis at 60fps and its fixed elements stutter under it: keep the native scroll where CSS can drive the hero
export function nativeScroll() {
  const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return safari && CSS.supports("animation-timeline: scroll()");
}
