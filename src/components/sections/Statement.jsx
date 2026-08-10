import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { isCompact, prefersReducedMotion } from "../../lib/media";

const STATEMENT =
  "Every project here is built end to end, from the first sketch of the interface down to the database.";

export default function Statement() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isCompact()) {
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
      className="section-mt section-px"
    >
      <div className="flex flex-col items-center">
        <div className="flex w-[86.41vw] flex-col items-center gap-y-[4.1vw] tablet:w-[44.92vw] tablet:gap-y-[1.95vw] laptop:w-[30.33%] laptop:gap-y-[1vw]">

          <p
            ref={textRef}
            className="t-body text-center tracking-normal text-(--ink) laptop:w-[26.81vw] laptop:text-[1.25vw]"
          >
            {STATEMENT}
          </p>

          <div
            ref={lineRef}
            aria-hidden="true"
            className="h-[17.95vw] w-px origin-top bg-(--ink)/30 tablet:h-[10.42vw] laptop:h-[6.25vw]"
          />
        </div>
      </div>
    </section>
  );
}
