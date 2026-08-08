import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const TITLE_LINES = ["From graphic", "design to web", "development"];

const BODY =
  "I trained as a graphic designer in Naples, then moved to code. I finished Boolean's full-stack master with top marks, and I build with React and Node on one side, PHP and Laravel on the other.";

const NUM_LABEL = "(Projects built)";
const NUM_VALUE = "02";

export default function About() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const bodyRef = useRef(null);
  const labelRef = useRef(null);
  const numRef = useRef(null);
  const glowRefs = useRef([]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const compact = window.matchMedia("(max-width: 991px)").matches;

      if (reduceMotion || compact) {
        gsap.set(lineRefs.current, { yPercent: 0, opacity: 1 });
        gsap.set([bodyRef.current, labelRef.current], { opacity: 1 });
        gsap.set(numRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(glowRefs.current, { opacity: 1 });
        return;
      }

      gsap.set(lineRefs.current, { yPercent: 100, opacity: 0 });
      gsap.set([bodyRef.current, labelRef.current], { opacity: 0 });
      gsap.set(numRef.current, { yPercent: 100, opacity: 0 });

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
        .to(bodyRef.current, { opacity: 1, duration: 0.6 }, 0.24)
        .to(labelRef.current, { opacity: 1, duration: 0.5 }, 0.32)
        .to(numRef.current, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.4)
        .to(
          glowRefs.current,
          { opacity: 1, duration: 0.22, stagger: 0.055, ease: "none" },
          0.85
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mt-[23.08vw] px-[4.1vw] min-[480px]:mt-[13.02vw] min-[480px]:px-[2.08vw] min-[992px]:mt-[9.38vw] min-[992px]:px-[2.5vw]"
    >
      <div className="flex w-full flex-col items-start">
        <h2 className="flex w-full flex-col items-start min-[480px]:w-[80%] min-[992px]:w-[60%]">
          {TITLE_LINES.map((line, idx) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => (lineRefs.current[idx] = el)}
                className="block font-display text-[9.23vw] leading-[100%] font-normal tracking-normal text-(--ink) uppercase min-[480px]:text-[6.77vw] min-[992px]:text-[5vw]"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-[3.08vw] flex w-full flex-col items-start min-[480px]:mt-[2.08vw] min-[992px]:mt-[1.88vw] min-[992px]:flex-row">
          <div className="order-2 flex flex-col items-start gap-y-[5.13vw] pt-[10.26vw] min-[480px]:gap-y-[2.6vw] min-[480px]:pt-[5.21vw] min-[992px]:order-1 min-[992px]:w-[48.13vw] min-[992px]:gap-y-[1.25vw] min-[992px]:pt-0">
            <span
              ref={labelRef}
              className="text-[4.1vw] leading-[110%] font-normal tracking-normal text-(--ink)/60 min-[480px]:text-[2.08vw] min-[992px]:text-[1vw]"
            >
              {NUM_LABEL}
            </span>
            <span
              ref={numRef}
              className="block font-display text-[38.46vw] leading-[90%] font-normal tracking-[-0.05em] text-(--ink) min-[480px]:text-[23.44vw] min-[992px]:text-[13.75vw]"
            >
              {Array.from(NUM_VALUE).map((char, idx) => (
                <span
                  key={`${char}-${idx}`}
                  className="relative inline-block"
                >
                  <span>{char}</span>
                  <span
                    aria-hidden="true"
                    ref={(el) => (glowRefs.current[idx] = el)}
                    className="absolute inset-0 text-(--mustard) opacity-0"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </div>

          <p
            ref={bodyRef}
            className="order-1 w-full text-[4.1vw] leading-[130%] font-normal tracking-normal text-(--ink) min-[480px]:ml-[42.71vw] min-[480px]:w-[42.32vw] min-[480px]:text-[2.08vw] min-[992px]:order-2 min-[992px]:ml-0 min-[992px]:w-[28.42%] min-[992px]:text-[1.25vw]"
          >
            {BODY}
          </p>
        </div>
      </div>
    </section>
  );
}
