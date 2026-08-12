import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";
import { groups } from "./stacks";

const TITLE_LINES = ["Web", "development"];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lines = Array.from(section.querySelectorAll(".skills-line"));
    const solids = Array.from(section.querySelectorAll(".skills-line-solid"));
    const blocks = Array.from(section.querySelectorAll(".skills-group"));

    if (prefersReducedMotion()) {
      gsap.set(solids, { opacity: 1 });
      gsap.set(section.querySelectorAll(".skills-label, .skills-logos"), {
        opacity: 1,
      });
      gsap.set(section.querySelectorAll(".skills-rule"), { scaleX: 1 });
      gsap.set(section.querySelectorAll(".skills-name"), { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      lines.forEach((line, idx) => {
        gsap.set(line, { yPercent: 110 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
            delay: idx * 0.08,
          })
          .to(line, { yPercent: 0, duration: 0.7, ease: "siteEase" })
          .to(solids[idx], { opacity: 1, duration: 0.6, ease: "siteEase" }, 0.05);
      });

      // one trigger per group, or the lower groups would play far below the fold
      blocks.forEach((block) => {
        const label = block.querySelector(".skills-label");
        const rule = block.querySelector(".skills-rule");
        const names = Array.from(block.querySelectorAll(".skills-name"));
        const logos = Array.from(block.querySelectorAll(".skills-logos"));

        gsap.set(label, { opacity: 0 });
        gsap.set(rule, { scaleX: 0 });
        gsap.set(names, { yPercent: 110 });
        gsap.set(logos, { opacity: 0 });

        // the names ride up from behind their mask, as the page does elsewhere
        gsap
          .timeline({
            defaults: { ease: "siteEase" },
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          })
          .to(label, { opacity: 1, duration: 0.5 })
          .to(rule, { scaleX: 1, duration: 0.8 }, 0.06)
          .to(names, { yPercent: 0, duration: 0.7, stagger: 0.08 }, 0.18)
          .to(logos, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.34);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative mt-[6.25vw] overflow-hidden bg-(--ink) pb-[14vw] tablet:pb-[8vw] laptop:pb-[5.63vw]"
    >
      <div
        aria-label="Web development"
        className="section-px flex w-full flex-col items-center pt-[14vw] pb-[10vw] text-(--cream) tablet:pt-[8vw] tablet:pb-[6vw] laptop:pt-[5.63vw] laptop:pb-[4vw]"
      >
        <span aria-hidden="true">
          {TITLE_LINES.map((line) => (
            <span key={line} className="skills-line-mask block overflow-hidden">
              <span className="skills-line relative block text-center">
                <span className="t-h2-lg skills-line-dim block font-display text-(--dim-invert)">
                  {line}
                </span>
                <span className="t-h2-lg skills-line-solid absolute inset-0 block font-display text-(--cream) opacity-0">
                  {line}
                </span>
              </span>
            </span>
          ))}
        </span>
      </div>

      <div className="section-px w-full laptop:mx-auto laptop:w-[58vw] laptop:px-0">
        {groups.map((group) => (
          <div
            key={group.label}
            className="skills-group mt-[10vw] first:mt-0 tablet:mt-[6vw] laptop:mt-[2.5vw]"
          >
            <span className="skills-label t-descrpt block text-(--dim-invert)">
              {group.label}
            </span>
            <span
              aria-hidden="true"
              className="skills-rule mt-[2.5vw] block h-px origin-left bg-(--line-invert) tablet:mt-[1.5vw] laptop:mt-[0.6vw]"
            />

            <ul className="mt-[4vw] tablet:mt-[2.4vw] laptop:mt-[1.25vw]">
              {group.rows.map((row) => (
                <li
                  key={row.name}
                  className="group/row flex items-center justify-between gap-[4vw] py-[2.5vw] tablet:py-[1.5vw] laptop:gap-[2vw] laptop:py-[0.9vw]"
                >
                  <span className="block overflow-hidden pb-[0.4vw]">
                    <span className="skills-name t-h4 block font-display text-(--cream) uppercase transition-colors duration-500 ease-site mouse:laptop:group-hover/row:text-(--mustard) motion-reduce:transition-none">
                      {row.name}
                    </span>
                  </span>

                  <span className="skills-logos flex shrink-0 items-center gap-[3.5vw] text-(--cream) tablet:gap-[2vw] laptop:gap-[1.1vw]">
                    {row.icons.map((Icon, idx) => (
                      <Icon
                        key={idx}
                        aria-hidden="true"
                        className="h-[7vw] w-[7vw] opacity-70 transition-opacity duration-500 ease-site tablet:h-[4vw] tablet:w-[4vw] laptop:h-[2.6vw] laptop:w-[2.6vw] mouse:laptop:group-hover/row:opacity-100 motion-reduce:transition-none"
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
