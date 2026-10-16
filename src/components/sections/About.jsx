import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";

const TITLE_LINES = ["From graphic", "design to web", "development"];

const BODY =
  "I trained as a graphic designer in Naples, then moved to code. I finished Boolean's full-stack master, and I build with React and Node on one side, PHP and Laravel on the other.";

export default function About() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const bodyRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(lineRefs.current, { yPercent: 0, opacity: 1 });
        gsap.set(bodyRef.current, { opacity: 1 });
        return;
      }

      gsap.set(lineRefs.current, { yPercent: 100, opacity: 0 });
      gsap.set(bodyRef.current, { opacity: 0 });

      gsap
        .timeline({
          defaults: { ease: "siteEase" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        })
        .to(lineRefs.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
        })
        .to(bodyRef.current, { opacity: 1, duration: 0.6 }, 0.24);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-mt section-px section-anchor"
    >
      <div className="flex w-full flex-col items-start">
        <h2 className="flex w-full flex-col items-start tablet:w-[80%] laptop:w-[60%]">
          {TITLE_LINES.map((line, idx) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => (lineRefs.current[idx] = el)}
                className="t-h3 block font-display tracking-normal text-(--ink)"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-[3.08vw] flex w-full flex-col items-start tablet:mt-[2.08vw] laptop:mt-[1.88vw] laptop:flex-row">
          <p
            ref={bodyRef}
            className="w-full t-body tracking-normal text-(--ink) tablet:ml-[42.71vw] tablet:w-[42.32vw] laptop:ml-[48.13vw] laptop:w-[28.42%]"
          >
            {BODY}
          </p>
        </div>
      </div>
    </section>
  );
}
