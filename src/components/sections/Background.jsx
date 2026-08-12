import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";

const TITLE = "Background";

const groups = [
  {
    label: "Education",
    entries: [
      {
        title: "Full-Stack Web Development Master",
        org: "Boolean",
        meta: "Jan to Aug 2026 · Remote",
        body:
          "JavaScript, React, Node and Express on one side, PHP and Laravel on the other. " +
          "MySQL and REST APIs, from the schema up to the endpoints the client consumes.",
      },
      {
        title: "Web Design Diploma",
        org: "ILAS, Istituto di Comunicazione",
        meta: "2021 to 2022 · Naples",
        body:
          "Design made for the browser: page layout, typographic hierarchy and how a composition " +
          "has to behave when the screen changes size. The first step from print towards code.",
      },
      {
        title: "Graphic Design Diploma",
        org: "ILAS, Istituto di Comunicazione",
        meta: "2021 to 2022 · Naples",
        body:
          "Typography, grids and composition, learned for print. It is the foundation everything " +
          "after it was built on, from the magazine work to the way I lay out an interface.",
      },
    ],
  },
  {
    label: "Experience",
    entries: [
      {
        title: "Graphic Designer",
        org: "Capri Green srl",
        meta: "Jul 2023 to Dec 2025 · Capri, Italy",
        body:
          "Graphics for luxury magazines with an international distribution, keeping the visual " +
          "identity and the layout consistent across issues, on editorial deadlines and in direct " +
          "contact with the editorial team and the clients.",
      },
    ],
  },
];

function Entry({ entry }) {
  return (
    <article className="bg-entry flex w-full flex-col pt-[6.15vw] pb-[6.15vw] tablet:pt-[3.13vw] tablet:pb-[3.13vw] laptop:pt-[2.5vw] laptop:pb-[2.5vw]">
      <span className="block overflow-hidden pb-[0.4vw]">
        <h4 className="bg-title t-h4 block font-display">{entry.title}</h4>
      </span>

      <div className="bg-meta mt-[3.08vw] flex flex-wrap items-center gap-[3.08vw] tablet:mt-[1.56vw] tablet:gap-[1.56vw] laptop:mt-[1.25vw] laptop:gap-[1.25vw]">
        <span className="t-body">{entry.org}</span>
        <span className="t-descrpt opacity-60">{entry.meta}</span>
      </div>

      <p className="bg-body t-body mt-[4.1vw] w-full opacity-75 tablet:mt-[2.08vw] laptop:mt-[1.25vw]">
        {entry.body}
      </p>
    </article>
  );
}

export default function Background() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const blocks = Array.from(section.querySelectorAll(".bg-group"));

    const fading = section.querySelectorAll(".bg-label, .bg-meta, .bg-body");
    const rising = section.querySelectorAll(".bg-title");

    if (prefersReducedMotion()) {
      gsap.set([heading, ...fading], { yPercent: 0, opacity: 1 });
      gsap.set(rising, { yPercent: 0 });
      gsap.set(section.querySelectorAll(".bg-rule"), { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(heading, { yPercent: 100, opacity: 0 });
      gsap.to(heading, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "siteEase",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });

      // one trigger per group, so a block never plays while it is below the fold
      blocks.forEach((block) => {
        const label = block.querySelector(".bg-label");
        const rule = block.querySelector(".bg-rule");

        gsap.set(label, { opacity: 0 });
        gsap.set(rule, { scaleX: 0 });

        gsap
          .timeline({
            defaults: { ease: "siteEase" },
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          })
          .to(label, { opacity: 1, duration: 0.5 })
          .to(rule, { scaleX: 1, duration: 0.8 }, 0.06);

        block.querySelectorAll(".bg-entry").forEach((entry) => {
          const title = entry.querySelector(".bg-title");
          const rest = entry.querySelectorAll(".bg-meta, .bg-body");

          gsap.set(title, { yPercent: 110 });
          gsap.set(rest, { opacity: 0 });

          gsap
            .timeline({
              defaults: { ease: "siteEase" },
              scrollTrigger: { trigger: entry, start: "top 85%", once: true },
            })
            .to(title, { yPercent: 0, duration: 0.7 })
            .to(rest, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.2);
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="background"
      className="section-mt section-px section-anchor"
    >
      <div className="flex w-full flex-col laptop:flex-row laptop:items-start laptop:gap-[2.5vw]">
        <div className="laptop:sticky laptop:top-[16vh] laptop:w-[45vw] laptop:shrink-0">
          <span className="block overflow-hidden">
            <h2 ref={headingRef} className="t-h2 block font-display">
              {TITLE}
            </h2>
          </span>
        </div>

        <div className="mt-[10.26vw] flex w-full flex-col tablet:mt-[5.21vw] laptop:mt-0 laptop:w-[45vw]">
          {groups.map((group) => (
            <div
              key={group.label}
              className="bg-group mt-[12vw] first:mt-0 tablet:mt-[7vw] laptop:mt-[5vw] laptop:first:mt-0"
            >
              <h3 className="bg-label t-h3 font-display uppercase">
                {group.label}
              </h3>
              <span
                aria-hidden="true"
                className="bg-rule mt-[3.08vw] block h-px origin-left bg-(--line-strong) tablet:mt-[1.56vw] laptop:mt-[1.25vw]"
              />

              {group.entries.map((entry) => (
                <Entry key={entry.title} entry={entry} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
