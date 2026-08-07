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
  const blocksRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        lineRefs.current.map((line) => line?.querySelector(".skills-line-solid")),
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

      gsap.set(blocksRef.current, { opacity: 0, y: 24 });
      gsap.to(blocksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "skillsEase",
        scrollTrigger: {
          trigger: blocksRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="border-b border-(--line)">
      <div className="skills-tone full-bleed relative">
        <div
          aria-hidden="true"
          className="skills-tone-left absolute inset-y-0 left-0 hidden w-1/2 bg-(--sand) md:block"
        />
        <div
          aria-hidden="true"
          className="skills-tone-right absolute inset-y-0 right-0 hidden w-1/2 bg-(--shell) md:block"
        />
        <div
          aria-hidden="true"
          className="skills-divider absolute top-0 bottom-20 left-1/2 hidden w-px -translate-x-1/2 bg-(--line) md:block md:bottom-28"
        />

        <div className="relative section-px pt-12 pb-12 md:pt-20 md:pb-10">
          <div className="font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim)">
            02 Skills
          </div>

          <h2
            aria-label="Two disciplines, one developer."
            className="mt-6 text-right font-display font-normal text-[36px] md:text-[76px] leading-[0.92] tracking-[-0.02em] md:mt-10"
          >
            <span aria-hidden="true">
              {TITLE_LINES.map((line, idx) => (
                <span key={line} className="skills-line-mask block overflow-hidden">
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
            className="mt-16 grid grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-6"
          >
            {blocks.map((block, idx) => (
              <div
                key={block.lines.join(" ")}
                className={
                  idx === 0
                    ? "flex max-w-[420px] flex-col gap-4"
                    : "flex max-w-[420px] flex-col gap-4 md:ml-8 md:mt-28"
                }
              >
                <h3 className="font-display font-normal uppercase leading-[1.05] tracking-[0.01em] text-[22px] text-(--ink) underline decoration-1 underline-offset-[6px] md:text-[1.95vw]">
                  {block.lines[0]}
                  <br />
                  {block.lines[1]}
                </h3>
                <p className="max-w-[34ch] text-[15px] leading-[1.5] text-(--dim) md:text-[1.12vw]">
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
