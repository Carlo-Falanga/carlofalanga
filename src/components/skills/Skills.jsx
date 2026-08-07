import { useEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap } from "../../lib/gsap";
import ToolBoxSkills from "./ToolBoxSkills";

gsap.registerPlugin(CustomEase);
CustomEase.create("skillsEase", "M0,0,C0.16,1,0.3,1,1,1");

const TITLE_LINES = ["Two disciplines,", "one developer."];

const blocks = [
  {
    lines: ["Frontend", "development"],
    description:
      "React and JavaScript for the interface, HTML and CSS for the foundation, GSAP and Motion for everything that moves.",
  },
  {
    lines: ["Backend", "development"],
    description:
      "Node.js and Express for the API layer, PHP and Laravel from daily practice at Boolean, MySQL and SQLite for the data underneath.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const titleRef = useRef(null);
  const blocksRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(
        lineRefs.current.map((l) => l?.querySelector(".skills-line-solid")),
        { opacity: 1 }
      );
      gsap.set(blocksRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, idx) => {
        if (!line) return;
        gsap.set(line, { yPercent: 110 });
        const solid = line.querySelector(".skills-line-solid");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
            delay: idx * 0.08,
          })
          .to(line, { yPercent: 0, duration: 0.7, ease: "skillsEase" })
          .to(solid, { opacity: 1, duration: 0.6, ease: "skillsEase" }, 0.05);
      });

      gsap.to(titleRef.current, {
        yPercent: 62,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.set(blocksRef.current, { opacity: 0, y: 40 });
      gsap.to(blocksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "skillsEase",
        scrollTrigger: {
          trigger: blocksRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="overflow-hidden border-b border-(--line) bg-(--cream)"
    >
      <div className="skills-tone full-bleed relative">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-(--sand) md:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-(--shell) md:block"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-16 left-1/2 hidden w-px -translate-x-1/2 bg-(--line) md:block"
        />

        <div className="relative section-px pt-12 pb-10 md:pt-[3vw] md:pb-[2vw]">
          <div className="font-mono text-[11px] font-light tracking-[0.08em] text-(--dim) uppercase">
            02 Skills
          </div>

          <h2
            ref={titleRef}
            aria-label="Two disciplines, one developer."
            className="mt-6 text-right font-display text-[13vw] leading-[100%] font-normal tracking-normal uppercase md:mt-[2.5vw] md:text-[7vw]"
          >
            <span aria-hidden="true">
              {TITLE_LINES.map((line, idx) => (
                <span
                  key={line}
                  className="skills-line-mask block overflow-hidden"
                >
                  <span
                    ref={(el) => (lineRefs.current[idx] = el)}
                    className="skills-line relative block"
                  >
                    <span className="skills-line-dim block text-(--dim)">
                      {line}
                    </span>
                    <span className="skills-line-solid absolute inset-0 block text-(--ink) opacity-0">
                      {line}
                    </span>
                  </span>
                </span>
              ))}
            </span>
          </h2>

          <div
            ref={blocksRef}
            className="mt-14 grid grid-cols-1 gap-y-12 md:mt-[4vw] md:grid-cols-2 md:gap-x-6"
          >
            {blocks.map((block, idx) => (
              <div
                key={block.lines.join(" ")}
                className={
                  idx === 0
                    ? "flex max-w-[32ch] flex-col gap-4 md:gap-[1.2vw]"
                    : "flex max-w-[32ch] flex-col gap-4 md:mt-[9vw] md:ml-[2vw] md:gap-[1.2vw]"
                }
              >
                <h3 className="font-display text-[26px] leading-[90%] font-normal tracking-normal text-(--ink) uppercase underline decoration-1 underline-offset-[6px] md:text-[3vw]">
                  {block.lines[0]}
                  <br />
                  {block.lines[1]}
                </h3>
                <p className="text-[15px] leading-[130%] text-(--dim) md:text-[1.25vw]">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToolBoxSkills />
    </section>
  );
}
