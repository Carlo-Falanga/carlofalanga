import { useEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap } from "../../lib/gsap";
import ToolBoxSkills from "./ToolBoxSkills";

gsap.registerPlugin(CustomEase);
CustomEase.create("skillsEase", "M0,0,C0.16,1,0.3,1,1,1");

const TITLE_LINES = ["Two disciplines,", "one developer."];

const columns = [
  {
    title: "Frontend",
    description:
      "React and JavaScript for the interface, HTML and CSS for the foundation, GSAP and Motion for everything that moves.",
  },
  {
    title: "Backend",
    description:
      "Node.js and Express for the API layer, PHP and Laravel from daily practice at Boolean, MySQL and SQLite for the data underneath.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const columnsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        lineRefs.current.map((line) => line?.querySelector(".skills-line-solid")),
        { opacity: 1 }
      );
      gsap.set(columnsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, idx) => {
        if (!line) return;
        gsap.set(line, { yPercent: 110 });
        const solid = line.querySelector(".skills-line-solid");

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          delay: idx * 0.08,
        })
          .to(line, {
            yPercent: 0,
            duration: 0.7,
            ease: "skillsEase",
          })
          .to(
            solid,
            {
              opacity: 1,
              duration: 0.6,
              ease: "skillsEase",
            },
            0.05
          );
      });

      gsap.set(columnsRef.current, { opacity: 0, y: 24 });
      gsap.to(columnsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "skillsEase",
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 90%",
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
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        02 Skills
      </div>

      <h2
        aria-label="Two disciplines, one developer."
        className="col-span-full md:col-start-3 md:col-span-10 font-display font-normal text-[36px] md:text-[72px] leading-[0.94] tracking-[-0.02em]"
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
        ref={columnsRef}
        className="col-span-full md:col-start-3 md:col-span-10 grid grid-cols-1 md:grid-cols-2"
      >
        {columns.map((column, idx) => (
          <div
            key={column.title}
            className={
              idx === 0
                ? "flex flex-col gap-4 pb-8 border-b border-(--line) md:pb-0 md:pr-16 md:border-b-0 md:border-r"
                : "flex flex-col gap-4 pt-8 md:pt-0 md:pl-16"
            }
          >
            <h3 className="inline-block self-start border-b-2 border-(--mustard) pb-2 font-display font-normal text-[22px] md:text-[26px] tracking-[-0.01em] text-(--ink)">
              {column.title}
            </h3>
            <p className="max-w-[46ch] text-[14px] text-(--dim) leading-relaxed">
              {column.description}
            </p>
          </div>
        ))}
      </div>

      <div className="col-span-full full-bleed">
        <ToolBoxSkills />
      </div>
    </section>
  );
}
