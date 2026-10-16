import { useEffect } from "react";
import { gsap } from "./gsap";
import { mouseQuery } from "./media";

// letters near the cursor get wider and heavier (Archivo's width and weight axes)
export function useSwell(containerRef, radius, isActive) {
  useEffect(() => {
    if (!mouseQuery().matches) return;

    const letters = [...containerRef.current.querySelectorAll(".ch")];
    const setters = letters.map((ch) => ({
      width: gsap.quickTo(ch, "--wdth", { duration: 0.45, ease: "power3.out" }),
      weight: gsap.quickTo(ch, "--wght", { duration: 0.45, ease: "power3.out" }),
    }));
    let pointer = null;
    let frame = 0;
    let wasActive = false;

    const update = () => {
      frame = 0;
      const active = Boolean(pointer) && isActive();
      // nothing to reset: leave the letters alone, an entrance tween may still be running
      if (!active && !wasActive) return;
      wasActive = active;
      letters.forEach((ch, i) => {
        let f = 0;
        if (active) {
          const r = ch.getBoundingClientRect();
          const distance = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          f = Math.pow(Math.max(0, 1 - distance / radius), 2);
        }
        setters[i].width(100 + 25 * f);
        setters[i].weight(700 + 200 * f);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, radius, isActive]);
}
