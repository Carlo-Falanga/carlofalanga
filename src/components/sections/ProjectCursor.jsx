import { useEffect, useRef } from "react";
import { mouseQuery, prefersReducedMotion } from "../../lib/media";

const FOLLOW = 0.14;
const STRETCH_PER_PIXEL = 0.022;
const MAX_STRETCH = 1.16;
const REST_SPEED = 0.3;

export default function ProjectCursor({ sectionRef }) {
  const pointerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pointer = pointerRef.current;
    if (!section || !pointer || prefersReducedMotion()) return;

    const desktop = mouseQuery();
    const frames = Array.from(section.querySelectorAll(".project-frame"));

    const target = { x: 0, y: 0 };
    const at = { x: 0, y: 0 };
    let followRaf = 0;
    let scrollRaf = 0;
    let visible = false;
    let primed = false;

    const follow = () => {
      const stepX = (target.x - at.x) * FOLLOW;
      const stepY = (target.y - at.y) * FOLLOW;
      at.x += stepX;
      at.y += stepY;

      const speed = Math.hypot(stepX, stepY);
      const stretch = Math.min(1 + speed * STRETCH_PER_PIXEL, MAX_STRETCH);
      const angle =
        speed > REST_SPEED ? (Math.atan2(stepY, stepX) * 180) / Math.PI : 0;

      pointer.style.transform =
        `translate(${at.x}px, ${at.y}px) translate(-50%, -50%) ` +
        `rotate(${angle}deg) scale(${stretch}, ${1 / stretch}) rotate(${-angle}deg)`;

      const left = Math.abs(target.x - at.x) + Math.abs(target.y - at.y);
      followRaf = left > 0.4 ? requestAnimationFrame(follow) : 0;
    };

    const covers = (box) =>
      target.x >= box.left &&
      target.x <= box.right &&
      target.y >= box.top &&
      target.y <= box.bottom;

    const updateHover = () => {
      if (!primed) return;
      let overAnyFrame = false;

      frames.forEach((frame) => {
        const over = covers(frame.getBoundingClientRect());
        frame.closest(".project-card").classList.toggle("is-active", over);
        if (over) overAnyFrame = true;
      });

      if (overAnyFrame !== visible) {
        visible = overAnyFrame;
        pointer.style.opacity = overAnyFrame ? "1" : "0";
      }
    };

    const onPointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!primed) {
        at.x = target.x;
        at.y = target.y;
        primed = true;
      }

      updateHover();
      if (!followRaf) followRaf = requestAnimationFrame(follow);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (desktop.matches) updateHover();
      });
    };

    const applyMode = () => {
      if (desktop.matches) {
        window.addEventListener("mousemove", onPointerMove, { passive: true });
        return;
      }

      window.removeEventListener("mousemove", onPointerMove);
      visible = false;
      pointer.style.opacity = "0";
      frames.forEach((frame) =>
        frame.closest(".project-card").classList.remove("is-active")
      );
    };

    applyMode();
    desktop.addEventListener("change", applyMode);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      desktop.removeEventListener("change", applyMode);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (followRaf) cancelAnimationFrame(followRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [sectionRef]);

  return (
    <span
      ref={pointerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[clamp(48px,3.9vw,68px)] w-[clamp(48px,3.9vw,68px)] items-center justify-center rounded-full bg-(--cream) opacity-0 mix-blend-difference transition-opacity duration-300 ease-site motion-reduce:hidden mouse:laptop:flex"
    >
      <span className="font-display text-[clamp(12px,0.8vw,13px)] leading-[110%] font-normal text-(--ink) uppercase">
        Code
      </span>
    </span>
  );
}
