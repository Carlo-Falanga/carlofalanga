import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const MAGNET_PATH =
  "M0,0 L0,120 A100,100 0 0 0 200,120 L200,0 L160,0 L160,120 A60,60 0 0 1 40,120 L40,0 Z";

export default function MagnetTransition() {
  const sectionRef = useRef(null);
  const shapeRef = useRef(null);
  const labelRef = useRef(null);
  const floodRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(shapeRef.current, { opacity: 0 });
        gsap.set(labelRef.current, { opacity: 1 });
        gsap.set(floodRef.current, { scaleY: 1, opacity: 1 });
        return;
      }

      const isCompact = window.matchMedia(
        "(pointer: coarse), (max-width: 767px)"
      ).matches;

      gsap.set(shapeRef.current, {
        yPercent: 220,
        opacity: 1,
        rotate: 0,
        scale: 1,
      });
      gsap.set(labelRef.current, { opacity: 0 });
      gsap.set(floodRef.current, { scaleY: 0, opacity: 1 });

      const scrollTriggerConfig = isCompact
        ? {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        : {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 3.2,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: scrollTriggerConfig,
      });

      tl.to(shapeRef.current, { yPercent: 0, duration: 0.16 }, 0)
        .to(labelRef.current, { opacity: 1, duration: 0.1 }, 0.08)
        .to(
          shapeRef.current,
          { rotate: 180, scale: 8, yPercent: 8, duration: 0.4, ease: "power2.in" },
          0.18
        )
        .to(labelRef.current, { opacity: 0, duration: 0.08 }, 0.5)
        .to(floodRef.current, { scaleY: 1, duration: 0.3 }, 0.52)
        .to(
          shapeRef.current,
          { opacity: 0, scale: 6, yPercent: -10, duration: 0.16 },
          0.82
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="magnet-transition full-bleed relative bg-(--cream)"
    >
      <div className="relative h-dvh min-h-[560px] w-full overflow-hidden">
        <div
          ref={floodRef}
          aria-hidden="true"
          className="magnet-flood absolute inset-0 origin-bottom bg-(--ink)"
        />

        <div className="absolute inset-0 grid place-items-center">
          <svg
            ref={shapeRef}
            viewBox="0 0 200 220"
            aria-hidden="true"
            style={{ transformOrigin: "50% 50%" }}
            className="magnet-shape [grid-area:1/1] aspect-[200/220] h-[34vh] min-h-[220px] w-auto will-change-transform"
          >
            <path d={MAGNET_PATH} fill="var(--ink)" />
          </svg>

          <span
            ref={labelRef}
            className="mono-label [grid-area:1/1] text-[11px] text-(--ink)"
          >
            Your next dev
          </span>
        </div>
      </div>
    </section>
  );
}
