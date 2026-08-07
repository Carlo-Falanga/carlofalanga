import { useEffect, useRef, useState } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap, ScrollTrigger } from "../../lib/gsap";

gsap.registerPlugin(CustomEase);
CustomEase.create("approachEase", "M0,0,C0.16,1,0.3,1,1,1");

const values = [
  {
    id: "01",
    line1: "Clean",
    line2: "code",
    description:
      "I write readable, maintainable code and keep the same discipline across every layer of a project.",
  },
  {
    id: "02",
    line1: "Modern",
    line2: "stack",
    description:
      "React, Node.js, Express and MySQL day to day, with PHP and Laravel in active training at Boolean.",
  },
  {
    id: "03",
    line1: "Full",
    line2: "cycle",
    description:
      "Comfortable working end-to-end, from interface to database, not locked into a single layer.",
  },
  {
    id: "04",
    line1: "Detail",
    line2: "driven",
    description:
      "Two years designing for international magazines taught me to notice what's slightly off.",
  },
];

function smoothstep(t) {
  const c = gsap.utils.clamp(0, 1, t);
  return c * c * (3 - 2 * c);
}

export default function Approach() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const arrowRef = useRef(null);
  const pillRef = useRef(null);
  const circleRefs = useRef([]);
  const fillRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const applyStep = (activeFloat, allowScale) => {
      const clamped = gsap.utils.clamp(0, values.length - 1, activeFloat);
      values.forEach((_, idx) => {
        const t = smoothstep(1 - Math.abs(clamped - idx));
        const circleEl = circleRefs.current[idx];
        const fillEl = fillRefs.current[idx];
        if (circleEl) gsap.set(circleEl, { scale: allowScale ? 1 + 0.12 * t : 1 });
        if (fillEl) gsap.set(fillEl, { opacity: t });
      });
      const nextIndex = Math.round(clamped);
      if (activeIndexRef.current !== nextIndex) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    if (prefersReducedMotion) {
      gsap.set(
        lineRefs.current.map((line) => line?.querySelector(".approach-line-solid")),
        { opacity: 1 }
      );
      gsap.set(pillRef.current, { opacity: 1 });
      applyStep(0, false);
      return;
    }

    const ctx = gsap.context(() => {
      applyStep(0, true);

      lineRefs.current.forEach((line, idx) => {
        if (!line) return;
        gsap.set(line, { yPercent: 110 });
        const solid = line.querySelector(".approach-line-solid");

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
            ease: "approachEase",
          })
          .to(
            solid,
            {
              opacity: 1,
              duration: 0.6,
              ease: "approachEase",
            },
            0.05
          );
      });

      gsap.set(pillRef.current, { opacity: 0, y: 24 });
      gsap.to(pillRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "approachEase",
        scrollTrigger: {
          trigger: pillRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.create({
        trigger: pillRef.current,
        start: "top 75%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => applyStep(self.progress * (values.length - 1), true),
      });

      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          rotate: 180,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = values[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      <div className="col-span-full grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
        <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
          06 Approach
        </div>

        <h2
          aria-label="The principles behind the build."
          className="col-span-full md:col-start-3 md:col-span-9 font-display font-normal text-[36px] md:text-[68px] leading-[0.94] tracking-[-0.02em]"
        >
          <span aria-hidden="true">
            <span className="approach-line-mask block overflow-hidden">
              <span
                ref={(el) => (lineRefs.current[0] = el)}
                className="approach-line relative block"
              >
                <span className="approach-line-dim block text-(--dim)">
                  The principles{" "}
                  <span className="text-(--mustard-deep)">✦</span> behind
                </span>
                <span className="approach-line-solid absolute inset-0 block text-(--ink) opacity-0">
                  The principles{" "}
                  <span className="text-(--mustard-deep)">✦</span> behind
                </span>
              </span>
            </span>
            <span className="approach-line-mask block overflow-hidden">
              <span
                ref={(el) => (lineRefs.current[1] = el)}
                className="approach-line relative block"
              >
                <span className="approach-line-dim block text-(--dim)">
                  <em>the build.</em>
                </span>
                <span className="approach-line-solid absolute inset-0 block text-(--ink) opacity-0">
                  <em>the build.</em>
                </span>
              </span>
            </span>
          </span>
        </h2>

        <div
          aria-hidden="true"
          className="hidden md:flex md:col-start-12 md:col-span-1 md:row-start-1 h-11 w-11 items-center justify-center justify-self-end self-start rounded-full border border-(--line) text-(--ink)"
        >
          <span ref={arrowRef} className="inline-flex">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M7 17L17 7M9 7h8v8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="col-span-full md:col-start-3 md:col-span-10 flex flex-col gap-8 md:gap-12">
        <div
          ref={pillRef}
          className="approach-pill flex flex-col md:flex-row md:items-center rounded-[32px] md:rounded-full bg-(--sand) p-3 md:p-4"
        >
          {values.map((value, idx) => (
            <div
              key={value.id}
              className="approach-item relative flex-1 md:aspect-square"
            >
              <div
                ref={(el) => (circleRefs.current[idx] = el)}
                className="approach-circle relative flex h-full w-full items-center justify-start gap-3 md:gap-4 rounded-full bg-[color-mix(in_oklab,var(--sand)_92%,var(--ink)_8%)] px-6 py-4 md:py-0"
                style={{ transformOrigin: "center" }}
              >
                <span
                  ref={(el) => (fillRefs.current[idx] = el)}
                  aria-hidden="true"
                  className="approach-fill absolute inset-0 rounded-full bg-(--mustard) opacity-0"
                />
                <span className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-(--paper) font-mono text-[11px] text-(--ink)">
                  {value.id}
                </span>
                <span className="relative z-10 font-display text-[15px] md:text-[16px] leading-[1.15] text-(--ink)">
                  {value.line1}
                  <br />
                  {value.line2}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono uppercase tracking-[0.08em] text-[12px] text-(--ink)">
            {active.line1} {active.line2}
          </span>
          <p className="max-w-[56ch] text-[14px] text-(--dim) leading-relaxed">
            {active.description}
          </p>
        </div>
      </div>
    </section>
  );
}
