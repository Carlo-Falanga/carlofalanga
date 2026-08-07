import { useEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap } from "../../lib/gsap";
import ToolBoxSkills from "./ToolBoxSkills";

gsap.registerPlugin(CustomEase);
CustomEase.create("skillsEase", "M0,0,C0.16,1,0.3,1,1,1");

const TITLE_LINES = ["Web", "development"];

const services = [
  {
    id: "frontend",
    title: ["Frontend", "development"],
    body: "React and JavaScript for the interface, HTML and CSS for the foundation, GSAP and Motion for everything that moves.",
  },
  {
    id: "backend",
    title: ["Backend", "development"],
    body: "Node.js and Express for the API layer, PHP and Laravel from daily practice at Boolean, MySQL and SQLite underneath.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      gsap.set(
        lineRefs.current.map((l) => l?.querySelector(".skills-line-solid")),
        { opacity: 1 }
      );
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
              start: "top 75%",
              once: true,
            },
            delay: idx * 0.08,
          })
          .to(line, { yPercent: 0, duration: 0.7, ease: "skillsEase" })
          .to(solid, { opacity: 1, duration: 0.6, ease: "skillsEase" }, 0.05);
      });

      gsap.to(titleRef.current, {
        yPercent: 55,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative mt-[6.25vw] overflow-hidden bg-(--cream)"
    >
      <div aria-hidden="true" className="absolute inset-0 flex">
        <div className="w-1/2 bg-(--sand)" />
        <div className="w-1/2 bg-(--shell)" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="flex w-[105.26%] justify-center">
          <div
            ref={titleRef}
            aria-label="Web development"
            className="absolute top-[0.8vw] z-2 flex w-auto flex-col items-center text-[--cream] mix-blend-difference"
          >
            <span aria-hidden="true">
              {TITLE_LINES.map((line, idx) => (
                <span
                  key={line}
                  className="skills-line-mask block overflow-hidden"
                >
                  <span
                    ref={(el) => (lineRefs.current[idx] = el)}
                    className="skills-line relative block text-center"
                  >
                    <span className="skills-line-dim block font-display text-[13vw] leading-[100%] font-normal tracking-normal text-(--dim) uppercase md:text-[7vw]">
                      {line}
                    </span>
                    <span className="skills-line-solid absolute inset-0 block font-display text-[13vw] leading-[100%] font-normal tracking-normal text-white uppercase opacity-0 md:text-[7vw]">
                      {line}
                    </span>
                  </span>
                </span>
              ))}
            </span>
          </div>

          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group/side flex w-1/2 flex-col"
            >
              <div
                className={`flex h-[42vh] flex-col justify-end md:h-[56vh] ${
                  idx === 0
                    ? "items-start pl-6 md:pl-[5.63vw]"
                    : "items-end pr-6 md:pr-[5.63vw]"
                }`}
              >
                <div
                  className={`flex w-full flex-col md:w-[30.88vw] ${
                    idx === 0 ? "items-start" : "items-end text-right"
                  }`}
                >
                  <h3 className="font-body text-[16px] leading-[130%] font-medium tracking-normal text-(--ink) uppercase underline decoration-1 underline-offset-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/side:-translate-y-[1.6vw] motion-reduce:transition-none motion-reduce:group-hover/side:translate-y-0 md:text-[1.5vw]">
                    {service.title[0]}
                    <br />
                    {service.title[1]}
                  </h3>
                  <div className="h-[9rem] w-full md:h-[6.5vw]">
                    <p className="translate-y-[1.2vw] text-[14px] leading-[130%] text-(--dim) opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/side:translate-y-0 group-hover/side:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none md:text-[1.25vw]">
                      {service.body}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <ToolBoxSkills />
      </div>
    </section>
  );
}
