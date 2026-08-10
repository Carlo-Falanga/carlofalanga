import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";
import GlowText, { GLOW_COPY } from "../ui/GlowText";

const TITLE = "Background";

const entries = [
  {
    id: "01",
    label: "(Education)",
    title: "Full-Stack Web Development Master",
    org: "Boolean",
    meta: "Jan to Aug 2026 · Remote",
    aside: "(Focus)",
    body:
      "JavaScript, React, Node and Express on one side, PHP and Laravel on the other. " +
      "MySQL and REST APIs, from the schema up to the endpoints the client consumes.",
  },
  {
    id: "02",
    label: "(Role)",
    title: "Graphic Designer",
    org: "Capri Green srl",
    meta: "Jul 2023 to Dec 2025 · Capri, Italy",
    aside: "(Highlights)",
    body:
      "Graphics for luxury magazines with an international distribution, keeping the visual " +
      "identity and the layout consistent across issues, on editorial deadlines and in direct " +
      "contact with the editorial team and the clients.",
  },
  {
    id: "03",
    label: "(Education)",
    title: "Web Design Diploma",
    org: "ILAS, Istituto di Comunicazione",
    meta: "2021 to 2022 · Naples",
    aside: "(Focus)",
    body:
      "Design made for the browser: page layout, typographic hierarchy and how a composition " +
      "has to behave when the screen changes size. The first step from print towards code.",
  },
  {
    id: "04",
    label: "(Education)",
    title: "Graphic Design Diploma",
    org: "ILAS, Istituto di Comunicazione",
    meta: "2021 to 2022 · Naples",
    aside: "(Focus)",
    body:
      "Typography, grids and composition, learned for print. It is the foundation everything " +
      "after it was built on, from the magazine work to the way I lay out an interface.",
  },
];

function Entry({ entry, index, register }) {
  return (
    <article
      ref={(node) => register(index, "root", node)}
      className={
        "flex w-full gap-[4.1vw] border-t border-(--line-strong) pt-[6.15vw] pb-[10.26vw] tablet:gap-[2.08vw] tablet:pt-[3.13vw] tablet:pb-[5.21vw] laptop:flex-col laptop:gap-0 laptop:pt-[2.5vw] laptop:pb-[3.75vw]" +
        (entry.body ? " laptop:min-h-[32vh]" : "")
      }
    >
      <span
        aria-hidden="true"
        className="t-num-idx sticky top-[calc(3.08vw+var(--nav-offset))] block shrink-0 self-start font-display transition-[top] duration-400 ease-site motion-reduce:transition-none tablet:top-[calc(1.56vw+var(--nav-offset))] laptop:hidden"
      >
        <GlowText text={entry.id} />
      </span>

      <div className="flex w-full min-w-0 flex-col">
        <span
          ref={(node) => register(index, "label", node)}
          className="t-descrpt hidden opacity-60 laptop:block"
        >
          {entry.label}
        </span>

        <span className="block overflow-hidden laptop:mt-[1.25vw]">
          <h3
            ref={(node) => register(index, "title", node)}
            className="t-h4 block font-display"
          >
            {entry.title}
          </h3>
        </span>

        <div
          ref={(node) => register(index, "meta", node)}
          className="mt-[3.08vw] flex flex-wrap items-center gap-[3.08vw] tablet:mt-[1.56vw] tablet:gap-[1.56vw] laptop:mt-[1.25vw] laptop:gap-[1.25vw]"
        >
          <span className="t-body">
            {entry.org}
          </span>
          <span className="t-descrpt opacity-60">
            {entry.meta}
          </span>
        </div>

        {entry.aside && (
          <div
            ref={(node) => register(index, "aside", node)}
            className="mt-[6.15vw] flex flex-col items-start gap-[3.08vw] tablet:mt-[3.13vw] tablet:gap-[1.56vw] laptop:mt-[2.5vw] laptop:gap-[1.25vw]"
          >
            <span className="t-descrpt opacity-60">
              {entry.aside}
            </span>
            <p className="t-body w-full opacity-75">
              {entry.body}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Background() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const numberRefs = useRef([]);
  const parts = useRef([]);

  const register = (index, key, node) => {
    if (!parts.current[index]) parts.current[index] = {};
    parts.current[index][key] = node;
  };

  useGSAP(
    () => {
      const rows = parts.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);
      const glowInside = (element) =>
        Array.from(element.querySelectorAll(GLOW_COPY));

      const stickyIndex = (instant) => {
        const media = gsap.matchMedia();

        media.add("(min-width: 992px)", () => {
          let painted = -1;
          const glow = (i) => glowInside(numbers[i]);

          const paint = (index) => {
            if (index === painted) return;
            const previous = painted;
            painted = index;

            if (instant) {
              numbers.forEach((el, i) => {
                gsap.set(el, { opacity: i === index ? 1 : 0 });
                gsap.set(glow(i), { opacity: i === index ? 1 : 0 });
              });
              return;
            }

            if (previous >= 0) {
              gsap.to(numbers[previous], {
                opacity: 0,
                duration: 0.3,
                ease: "none",
              });
              gsap.to(glow(previous), {
                opacity: 0,
                duration: 0.2,
                ease: "none",
              });
            }

            gsap
              .timeline({ defaults: { ease: "none" } })
              .to(numbers[index], { opacity: 1, duration: 0.3 })
              .to(glow(index), { opacity: 1, duration: 0.22, stagger: 0.055 }, 0.24);
          };

          const triggers = rows.map((row, index) =>
            ScrollTrigger.create({
              trigger: row.root,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => {
                if (self.isActive) paint(index);
              },
            })
          );

          return () => {
            triggers.forEach((trigger) => trigger.kill());
            painted = -1;
            const glows = numbers.flatMap(glowInside);
            gsap.killTweensOf([...numbers, ...glows]);
            gsap.set([...numbers, ...glows], { opacity: 0 });
          };
        });
      };

      const inlineIndex = (instant) => {
        const media = gsap.matchMedia();

        media.add("(max-width: 991px)", () => {
          let painted = -1;
          const glow = (i) => glowInside(rows[i].root);

          const paint = (index) => {
            if (index === painted) return;
            const previous = painted;
            painted = index;

            if (instant) {
              rows.forEach((_, i) =>
                gsap.set(glow(i), { opacity: i === index ? 1 : 0 })
              );
              return;
            }

            if (previous >= 0) {
              gsap.to(glow(previous), {
                opacity: 0,
                duration: 0.2,
                ease: "none",
              });
            }

            gsap.to(glow(index), {
              opacity: 1,
              duration: 0.22,
              stagger: 0.055,
              ease: "none",
            });
          };

          const triggers = rows.map((row, index) =>
            ScrollTrigger.create({
              trigger: row.root,
              start: "top 40%",
              end: "bottom 40%",
              onToggle: (self) => {
                if (self.isActive) paint(index);
              },
            })
          );

          return () => {
            triggers.forEach((trigger) => trigger.kill());
            painted = -1;
            const glows = rows.flatMap((row) => glowInside(row.root));
            gsap.killTweensOf(glows);
            gsap.set(glows, { opacity: 0 });
          };
        });
      };

      if (prefersReducedMotion()) {
        gsap.set(headingRef.current, { yPercent: 0, opacity: 1 });
        rows.forEach((row) => {
          gsap.set(
            [row.title, row.label, row.meta, row.aside].filter(Boolean),
            { yPercent: 0, opacity: 1 }
          );
        });
        gsap.set(numbers, { opacity: 0 });
        stickyIndex(true);
        inlineIndex(true);
        return;
      }

      gsap.set(headingRef.current, { yPercent: 100, opacity: 0 });
      gsap.to(headingRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "siteEase",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      rows.forEach((row) => {
        gsap.set([row.label, row.meta, row.aside].filter(Boolean), {
          opacity: 0,
        });
        gsap.set(row.title, { yPercent: 100 });

        gsap
          .timeline({
            defaults: { ease: "siteEase" },
            scrollTrigger: { trigger: row.root, start: "top 82%", once: true },
          })
          .to(row.title, { yPercent: 0, duration: 0.7 })
          .to(row.label, { opacity: 1, duration: 0.5 }, 0.12)
          .to(
            [row.meta, row.aside].filter(Boolean),
            { opacity: 1, duration: 0.6, stagger: 0.08 },
            0.24
          );
      });

      gsap.set(numbers, { opacity: 0 });
      stickyIndex(false);
      inlineIndex(false);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="background"
      className="section-mt section-px"
    >
      <div className="flex w-full flex-col laptop:flex-row laptop:items-start laptop:gap-[2.5vw]">
        <div className="laptop:sticky laptop:top-[16vh] laptop:flex laptop:w-[45vw] laptop:shrink-0 laptop:flex-col">
          <span className="block overflow-hidden">
            <h2
              ref={headingRef}
              className="t-h3 block font-display"
            >
              {TITLE}
            </h2>
          </span>

          <span
            aria-hidden="true"
            className="relative mt-[3.13vw] hidden h-[12.38vw] laptop:block"
          >
            {entries.map((entry, index) => (
              <span
                key={entry.id}
                ref={(node) => (numberRefs.current[index] = node)}
                className="absolute inset-0 block font-display text-[13.75vw] leading-[90%] font-normal tracking-[-0.05em] opacity-0"
              >
                <GlowText text={entry.id} />
              </span>
            ))}
          </span>
        </div>

        <div className="mt-[10.26vw] flex w-full flex-col tablet:mt-[5.21vw] laptop:mt-0 laptop:w-[45vw]">
          {entries.map((entry, index) => (
            <Entry
              key={entry.id}
              entry={entry}
              index={index}
              register={register}
            />
          ))}
          <div className="h-px w-full shrink-0 bg-(--line-strong)" />
        </div>
      </div>
    </section>
  );
}
