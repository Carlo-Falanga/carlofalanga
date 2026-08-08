import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const STATEMENT =
  "Every project here is built end to end — from the first sketch of the interface down to the database.";

export default function Statement() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const compact = window.matchMedia("(max-width: 991px)").matches;

      if (reduceMotion || compact) {
        gsap.set(textRef.current, { opacity: 1 });
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(lineRef.current, { scaleY: 0 });

      gsap
        .timeline({
          defaults: { ease: "siteEase" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        })
        .to(textRef.current, { opacity: 1, duration: 0.7 }, 0.08)
        .to(lineRef.current, { scaleY: 1, duration: 0.8 }, 0.16);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="mt-[23.08vw] px-[4.1vw] min-[480px]:mt-[13.02vw] min-[480px]:px-[2.08vw] min-[992px]:mt-[9.38vw] min-[992px]:px-[2.5vw]"
    >
      <div className="flex flex-col items-center">
        <div className="flex w-[86.41vw] flex-col items-center gap-y-[4.1vw] min-[480px]:w-[44.92vw] min-[480px]:gap-y-[1.95vw] min-[992px]:w-[30.33%] min-[992px]:gap-y-[1vw]">

          <p
            ref={textRef}
            className="text-center text-[4.1vw] leading-[130%] font-normal tracking-normal text-(--ink) min-[480px]:text-[2.08vw] min-[992px]:w-[26.81vw] min-[992px]:text-[1.25vw]"
          >
            {STATEMENT}
          </p>

          <div
            ref={lineRef}
            aria-hidden="true"
            className="h-[17.95vw] w-px origin-top bg-(--ink)/30 min-[480px]:h-[10.42vw] min-[992px]:h-[6.25vw]"
          />
        </div>
      </div>
    </section>
  );
}
