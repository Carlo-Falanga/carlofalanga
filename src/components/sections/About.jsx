import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";
import GlowText, { GLOW_COPY } from "../ui/GlowText";

const TITLE_LINES = ["From graphic", "design to web", "development"];

const BODY =
  "I trained as a graphic designer in Naples, then moved to code. I finished Boolean's full-stack master, and I build with React and Node on one side, PHP and Laravel on the other.";

const NUM_LABEL = "(Projects built)";
const NUM_VALUE = "03";

export default function About() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const bodyRef = useRef(null);
  const labelRef = useRef(null);
  const numRef = useRef(null);

  useGSAP(
    () => {
      const glow = Array.from(numRef.current.querySelectorAll(GLOW_COPY));

      if (prefersReducedMotion()) {
        gsap.set(lineRefs.current, { yPercent: 0, opacity: 1 });
        gsap.set([bodyRef.current, labelRef.current], { opacity: 1 });
        gsap.set(numRef.current, { yPercent: 0, opacity: 1 });
        gsap.set(glow, { opacity: 1 });
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
          glow,
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
      className="section-mt section-px"
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
          <div className="order-2 flex flex-col items-start gap-y-[5.13vw] pt-[10.26vw] tablet:gap-y-[2.6vw] tablet:pt-[5.21vw] laptop:order-1 laptop:w-[48.13vw] laptop:gap-y-[1.25vw] laptop:pt-0">
            <span
              ref={labelRef}
              className="t-descrpt tracking-normal text-(--ink)/60"
            >
              {NUM_LABEL}
            </span>
            <span
              ref={numRef}
              className="t-num-b block font-display text-(--ink)"
            >
              <GlowText text={NUM_VALUE} />
            </span>
          </div>

          <p
            ref={bodyRef}
            className="order-1 w-full t-body tracking-normal text-(--ink) tablet:ml-[42.71vw] tablet:w-[42.32vw] laptop:order-2 laptop:ml-0 laptop:w-[28.42%]"
          >
            {BODY}
          </p>
        </div>
      </div>
    </section>
  );
}
