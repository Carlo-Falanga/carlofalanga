import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { isCompact, prefersReducedMotion } from "../../lib/media";
import StackMarquee from "./StackMarquee";

const TITLE_LINES = ["Web", "development"];

const services = [
  {
    id: "frontend",
    title: ["Frontend", "development"],
    body: "React and JavaScript for the interface, HTML and CSS for the foundation, and a layout that has to hold at every screen size.",
  },
  {
    id: "backend",
    title: ["Backend", "development"],
    body: "Node.js and Express for the API layer, PHP and Laravel from the Boolean master, MySQL underneath and SQLite picked up on my own.",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRefs = useRef([]);
  const blockRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      const solids = lineRefs.current
        .filter(Boolean)
        .map((line) => line.querySelector(".skills-line-solid"));
      gsap.set(solids, { opacity: 1 });
      gsap.set(blockRefs.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (isCompact()) {
        blockRefs.current.filter(Boolean).forEach((block) => {
          gsap.set(block, { opacity: 0, y: 24 });
          gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "siteEase",
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          });
        });
      } else {
        gsap.set(blockRefs.current, { opacity: 0 });
        gsap.to(blockRefs.current, {
          opacity: 1,
          duration: 0.7,
          ease: "siteEase",
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        });
      }

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
          .to(line, { yPercent: 0, duration: 0.7, ease: "siteEase" })
          .to(solid, { opacity: 1, duration: 0.6, ease: "siteEase" }, 0.05);
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
      <div aria-hidden="true" className="absolute inset-0 hidden laptop:flex">
        <div className="w-1/2 bg-(--sand)" />
        <div className="w-1/2 bg-(--shell)" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="flex w-full flex-col laptop:w-[105.26%] laptop:flex-row laptop:justify-center">
          <div
            ref={titleRef}
            aria-label="Web development"
            className="section-px z-2 flex w-full flex-col items-center pt-[14vw] pb-[10vw] text-(--ink) tablet:pt-[8vw] tablet:pb-[6vw] laptop:absolute laptop:top-[0.8vw] laptop:w-auto laptop:p-0 laptop:text-[--cream] laptop:mix-blend-difference"
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
                    <span className="t-h2-lg skills-line-dim block font-display text-(--dim)">
                      {line}
                    </span>
                    <span className="t-h2-lg skills-line-solid absolute inset-0 block font-display text-(--ink) opacity-0 laptop:text-white">
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
              className="group/side flex w-full flex-col laptop:w-1/2"
            >
              <div
                className={`section-px flex flex-col justify-end py-[12vw] tablet:py-[7vw] laptop:h-[82vh] laptop:py-0 ${
                  idx === 0
                    ? "items-start laptop:pl-[5.63vw]"
                    : "items-start laptop:items-end laptop:pr-[5.63vw]"
                }`}
              >
                <div
                  ref={(el) => (blockRefs.current[idx] = el)}
                  className={`flex w-full flex-col items-start laptop:w-[30.88vw] ${
                    idx === 0 ? "" : "laptop:items-end laptop:text-right"
                  }`}
                >
                  <h3 className="t-title2 font-body text-(--ink) uppercase underline decoration-1 underline-offset-4 transition-transform duration-500 ease-site laptop:group-hover/side:-translate-y-[1.6vw] motion-reduce:transition-none motion-reduce:group-hover/side:translate-y-0">
                    {service.title[0]}
                    <br />
                    {service.title[1]}
                  </h3>
                  <div className="mt-[4vw] w-full tablet:mt-[2.4vw] laptop:mt-0 laptop:h-[6.5vw]">
                    <p className="t-body text-(--dim) transition-all duration-500 ease-site laptop:translate-y-[1.2vw] laptop:opacity-0 laptop:group-hover/side:translate-y-0 laptop:group-hover/side:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none">
                      {service.body}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <StackMarquee />
      </div>
    </section>
  );
}
