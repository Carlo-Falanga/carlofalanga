import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

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
  },
  {
    id: "04",
    label: "(Education)",
    title: "Graphic Design Diploma",
    org: "ILAS, Istituto di Comunicazione",
    meta: "2021 to 2022 · Naples",
  },
];

function Entry({ entry, index, register }) {
  return (
    <article
      ref={(node) => register(index, "root", node)}
      className={
        "flex w-full flex-col border-t border-(--line-strong) pt-[6.15vw] pb-[10.26vw] min-[480px]:pt-[3.13vw] min-[480px]:pb-[5.21vw] min-[992px]:pt-[2.5vw] min-[992px]:pb-[3.75vw]" +
        (entry.body ? " min-[992px]:min-h-[32vh]" : "")
      }
    >
      <div className="flex items-baseline gap-[4.1vw] min-[480px]:gap-[2.08vw] min-[992px]:hidden">
        <span className="font-display text-[14vw] leading-[90%] font-normal tracking-[-0.05em] min-[480px]:text-[9vw]">
          {entry.id}
        </span>
        <span className="text-[4.1vw] leading-[110%] opacity-60 min-[480px]:text-[2.08vw]">
          {entry.label}
        </span>
      </div>

      <span
        ref={(node) => register(index, "label", node)}
        className="mt-[6.15vw] hidden text-[1vw] leading-[110%] opacity-60 min-[992px]:mt-0 min-[992px]:block"
      >
        {entry.label}
      </span>

      <span className="mt-[3.08vw] block overflow-hidden min-[480px]:mt-[1.56vw] min-[992px]:mt-[1.25vw]">
        <h3
          ref={(node) => register(index, "title", node)}
          className="block font-display text-[9.23vw] leading-[90%] font-normal uppercase min-[480px]:text-[6.77vw] min-[992px]:text-[3vw]"
        >
          {entry.title}
        </h3>
      </span>

      <div
        ref={(node) => register(index, "meta", node)}
        className="mt-[3.08vw] flex flex-wrap items-center gap-[3.08vw] min-[480px]:mt-[1.56vw] min-[480px]:gap-[1.56vw] min-[992px]:mt-[1.25vw] min-[992px]:gap-[1.25vw]"
      >
        <span className="text-[4.1vw] leading-[130%] min-[480px]:text-[2.08vw] min-[992px]:text-[1.25vw]">
          {entry.org}
        </span>
        <span className="text-[4.1vw] leading-[110%] opacity-60 min-[480px]:text-[2.08vw] min-[992px]:text-[1vw]">
          {entry.meta}
        </span>
      </div>

      {entry.aside && (
        <div
          ref={(node) => register(index, "aside", node)}
          className="mt-[6.15vw] flex flex-col items-start gap-[3.08vw] min-[480px]:mt-[3.13vw] min-[480px]:gap-[1.56vw] min-[992px]:mt-[2.5vw] min-[992px]:gap-[1.25vw]"
        >
          <span className="text-[4.1vw] leading-[110%] opacity-60 min-[480px]:text-[2.08vw] min-[992px]:text-[1vw]">
            {entry.aside}
          </span>
          <p className="w-full text-[4.1vw] leading-[130%] opacity-75 min-[480px]:text-[2.08vw] min-[992px]:text-[1.25vw]">
            {entry.body}
          </p>
        </div>
      )}
    </article>
  );
}

export default function Background() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const numberRefs = useRef([]);
  const glowRefs = useRef([]);
  const parts = useRef([]);
  const activeRef = useRef(-1);

  const register = (index, key, node) => {
    if (!parts.current[index]) parts.current[index] = {};
    parts.current[index][key] = node;
  };

  const registerGlow = (index, position, node) => {
    if (!glowRefs.current[index]) glowRefs.current[index] = [];
    glowRefs.current[index][position] = node;
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const rows = parts.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);

      if (reduceMotion) {
        gsap.set(headingRef.current, { yPercent: 0, opacity: 1 });
        rows.forEach((row) => {
          gsap.set(
            [row.title, row.label, row.meta, row.aside].filter(Boolean),
            { yPercent: 0, opacity: 1 }
          );
        });
        gsap.set(numbers[0], { opacity: 1 });
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

      const show = (index) => {
        if (index === activeRef.current) return;
        const previous = activeRef.current;
        activeRef.current = index;

        if (previous >= 0) {
          gsap.to(numbers[previous], { opacity: 0, duration: 0.3, ease: "none" });
          gsap.to((glowRefs.current[previous] || []).filter(Boolean), {
            opacity: 0,
            duration: 0.2,
            ease: "none",
          });
        }

        if (index < 0) return;

        gsap
          .timeline({ defaults: { ease: "none" } })
          .to(numbers[index], { opacity: 1, duration: 0.3 })
          .to(
            (glowRefs.current[index] || []).filter(Boolean),
            { opacity: 1, duration: 0.22, stagger: 0.055 },
            0.24
          );
      };

      const media = gsap.matchMedia();

      media.add("(min-width: 992px)", () => {
        const triggers = rows.map((row, index) =>
          ScrollTrigger.create({
            trigger: row.root,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) show(index);
            },
          })
        );

        return () => {
          triggers.forEach((trigger) => trigger.kill());
          activeRef.current = -1;
          gsap.set(numbers, { opacity: 0 });
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="background"
      className="mt-[23.08vw] px-[4.1vw] min-[480px]:mt-[13.02vw] min-[480px]:px-[2.08vw] min-[992px]:mt-[9.38vw] min-[992px]:px-[2.5vw]"
    >
      <div className="flex w-full flex-col min-[992px]:flex-row min-[992px]:items-start min-[992px]:gap-[2.5vw]">
        <div className="min-[992px]:sticky min-[992px]:top-[16vh] min-[992px]:flex min-[992px]:w-[45vw] min-[992px]:shrink-0 min-[992px]:flex-col">
          <span className="block overflow-hidden">
            <h2
              ref={headingRef}
              className="block font-display text-[9.23vw] leading-[100%] font-normal uppercase min-[480px]:text-[6.77vw] min-[992px]:text-[5vw]"
            >
              {TITLE}
            </h2>
          </span>

          <span
            aria-hidden="true"
            className="relative mt-[3.13vw] hidden h-[12.38vw] min-[992px]:block"
          >
            {entries.map((entry, index) => (
              <span
                key={entry.id}
                ref={(node) => (numberRefs.current[index] = node)}
                className="absolute inset-0 block font-display text-[13.75vw] leading-[90%] font-normal tracking-[-0.05em] opacity-0"
              >
                {Array.from(entry.id).map((char, position) => (
                  <span
                    key={`${entry.id}-${position}`}
                    className="relative inline-block"
                  >
                    <span>{char}</span>
                    <span
                      ref={(node) => registerGlow(index, position, node)}
                      className="absolute inset-0 text-(--mustard) opacity-0"
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </span>
        </div>

        <div className="mt-[10.26vw] flex w-full flex-col min-[480px]:mt-[5.21vw] min-[992px]:mt-0 min-[992px]:w-[45vw]">
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
