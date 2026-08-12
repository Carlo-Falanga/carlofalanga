import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
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
    <article className="bg-entry flex w-full flex-col pt-[6.15vw] pb-[6.15vw] tablet:pt-[3.13vw] tablet:pb-[3.13vw] laptop:pt-[2.19vw] laptop:pb-[2.19vw]">
      <span className="block overflow-hidden pb-[0.4vw]">
        <h4 className="bg-title t-h4 block font-display normal-case">
          {entry.title}
        </h4>
      </span>

      <div className="bg-meta mt-[3.08vw] flex flex-wrap items-baseline gap-x-[3.08vw] gap-y-[1vw] tablet:mt-[1.56vw] tablet:gap-x-[1.56vw] laptop:mt-[0.94vw] laptop:gap-x-[1.25vw]">
        <span className="t-title1">{entry.org}</span>
        <span className="t-descrpt opacity-60">{entry.meta}</span>
      </div>

      <p className="bg-body t-body mt-[4.1vw] w-full opacity-75 tablet:mt-[2.08vw] laptop:mt-[1.25vw] laptop:w-[84%]">
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
    const stickyLabels = Array.from(
      section.querySelectorAll(".bg-sticky-label"),
    );

    const reduced = prefersReducedMotion();

    // the sticky column names the group you are reading; it is state, not decoration,
    // so it keeps working when motion is reduced, just without the crossfade
    let shown = -1;
    const show = (index) => {
      if (index === shown) return;
      shown = index;
      stickyLabels.forEach((label, i) => {
        const to = i === index ? 1 : 0;
        if (reduced) gsap.set(label, { opacity: to });
        else gsap.to(label, { opacity: to, duration: 0.35, ease: "fadeEase" });
      });
    };

    const triggers = blocks.map((block, index) =>
      ScrollTrigger.create({
        trigger: block,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) show(index);
        },
      }),
    );

    if (reduced) {
      gsap.set([heading, ...section.querySelectorAll(".bg-label, .bg-meta, .bg-body")], {
        yPercent: 0,
        opacity: 1,
      });
      gsap.set(section.querySelectorAll(".bg-title"), { yPercent: 0 });
      show(0);
      return () => triggers.forEach((trigger) => trigger.kill());
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

      // one trigger per entry, so a block never plays while it is below the fold
      section.querySelectorAll(".bg-label").forEach((label) => {
        gsap.set(label, { opacity: 0 });
        gsap.to(label, {
          opacity: 1,
          duration: 0.5,
          ease: "siteEase",
          scrollTrigger: { trigger: label, start: "top 88%", once: true },
        });
      });

      section.querySelectorAll(".bg-entry").forEach((entry) => {
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
    }, section);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
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
            <h2 ref={headingRef} className="t-h3 block font-display">
              {TITLE}
            </h2>
          </span>

          <span
            aria-hidden="true"
            className="relative mt-[1.88vw] hidden h-[2.2vw] laptop:block"
          >
            {groups.map((group) => (
              <span
                key={group.label}
                className="bg-sticky-label t-h4 absolute inset-0 block font-display opacity-0"
              >
                {group.label}
              </span>
            ))}
          </span>
        </div>

        <div className="mt-[10.26vw] flex w-full flex-col tablet:mt-[5.21vw] laptop:mt-0 laptop:w-[45vw]">
          {groups.map((group) => (
            <div
              key={group.label}
              className="bg-group mt-[12vw] first:mt-0 tablet:mt-[7vw] laptop:mt-[4vw] laptop:first:mt-0"
            >
              <h3 className="bg-label t-h4 font-display laptop:hidden">
                {group.label}
              </h3>

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
