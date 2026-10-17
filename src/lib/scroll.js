import { prefersReducedMotion } from "./media";

// SmoothScroll creates Lenis once; the index and the "back to top" button scroll through it
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

// distance from the top of the page, read on refresh so the scroll handlers do no layout reads
export function pageTop(element) {
  let top = 0;
  for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

export function scrollToTarget(target, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
