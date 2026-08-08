import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

const principles = [
  {
    id: "01",
    title: "Clean code",
    description:
      "I write readable, maintainable code and keep the same discipline across every layer of a project.",
  },
  {
    id: "02",
    title: "Modern stack",
    description:
      "React, Node.js, Express and MySQL day to day, with PHP and Laravel from the Boolean master.",
  },
  {
    id: "03",
    title: "Full cycle",
    description:
      "Comfortable working end-to-end, from interface to database, not locked into a single layer.",
  },
  {
    id: "04",
    title: "Detail driven",
    description:
      "Two years designing for international magazines taught me to notice what's slightly off.",
  },
];

function Stage({ entry, flipped, index, registerGlow }) {
  return (
    <div
      className={
        "relative flex w-full shrink-0 flex-col items-center justify-between border-t border-(--line-strong) py-[7.81vw] min-[992px]:-ml-px min-[992px]:h-[60vh] min-[992px]:w-[45vw] min-[992px]:border-x min-[992px]:border-t-0 min-[992px]:px-[2.5vw] min-[992px]:py-0" +
        (flipped ? " min-[992px]:flex-col-reverse" : "")
      }
    >
      <div className="flex w-full flex-col items-center gap-[5.13vw] min-[480px]:gap-[2.6vw] min-[992px]:gap-[1.25vw]">
        <h3 className="font-display text-[9.23vw] leading-[90%] font-normal uppercase min-[480px]:text-[6.77vw] min-[992px]:text-[3vw]">
          {entry.title}
        </h3>
        <p className="w-full text-center text-[4.1vw] leading-[130%] opacity-75 min-[480px]:text-[2.08vw] min-[992px]:w-[71.76%] min-[992px]:text-[1.25vw]">
          {entry.description}
        </p>
      </div>

      <div
        className={
          "mt-[10.77vw] flex w-full flex-col items-center gap-[5.13vw] min-[480px]:mt-[5.2vw] min-[480px]:gap-[2.6vw] min-[992px]:mt-0 min-[992px]:gap-[3.13vw]" +
          (flipped ? " min-[992px]:flex-col-reverse" : "")
        }
      >
        <div className="hidden h-px w-[88.42%] shrink-0 bg-(--line-strong) min-[992px]:block" />

        <div className="flex flex-col items-center gap-[5.13vw] min-[480px]:gap-[2.6vw] min-[992px]:gap-[1.25vw]">
          <span className="text-[4.1vw] leading-[110%] opacity-60 min-[480px]:text-[2.08vw] min-[992px]:text-[1vw]">
            (Principle)
          </span>
          <span className="font-display text-[38.46vw] leading-[90%] font-normal tracking-[-0.05em] min-[480px]:text-[23.44vw] min-[992px]:text-[13.75vw]">
            {Array.from(entry.id).map((char, position) => (
              <span
                key={`${entry.id}-${position}`}
                className="relative inline-block"
              >
                <span>{char}</span>
                <span
                  aria-hidden="true"
                  ref={(node) => registerGlow(index, position, node)}
                  className="absolute inset-0 text-(--mustard) opacity-0"
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Approach() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const glowRefs = useRef([]);
  const activeRef = useRef(-1);

  const registerGlow = (stage, position, node) => {
    if (!glowRefs.current[stage]) glowRefs.current[stage] = [];
    glowRefs.current[stage][position] = node;
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        horizontal: "(min-width: 992px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions.horizontal) return;

        const distance = () => track.scrollWidth - window.innerWidth;
        const travel = () => distance() * 0.71;

        const HOLD = 0.8;

        const sizeWrapper = () => {
          wrapper.style.height = window.innerHeight + travel() / HOLD + "px";
        };

        sizeWrapper();
        ScrollTrigger.addEventListener("refreshInit", sizeWrapper);

        const paintActive = (progress) => {
          const count = principles.length;
          const nearest = Math.min(
            count - 1,
            Math.max(0, Math.floor(progress * count))
          );

          if (nearest === activeRef.current) return;
          activeRef.current = nearest;

          glowRefs.current.forEach((digits, index) => {
            if (!digits) return;
            gsap.to(digits.filter(Boolean), {
              opacity: index === nearest ? 1 : 0,
              duration: 0.22,
              stagger: 0.055,
              ease: "none",
              overwrite: true,
            });
          });
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => "+=" + travel(),
            scrub: 2,
            invalidateOnRefresh: true,
            onUpdate: (self) => paintActive(self.progress),
            onLeaveBack: () => {
              activeRef.current = -1;
              const all = glowRefs.current.flat().filter(Boolean);
              gsap.to(all, { opacity: 0, duration: 0.22, ease: "none" });
            },
          },
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", sizeWrapper);
          wrapper.style.height = "";
          activeRef.current = -1;
          gsap.set(glowRefs.current.flat().filter(Boolean), { opacity: 0 });
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={wrapperRef}
      className="relative mt-[23.08vw] min-[480px]:mt-[13.02vw] min-[992px]:mt-[9.38vw]"
    >
      <div className="min-[992px]:sticky min-[992px]:top-[-27vh] min-[992px]:h-[127vh] min-[992px]:overflow-hidden">
        <div className="section-px flex min-[992px]:h-[27vh] min-[992px]:items-start min-[992px]:pt-[2vh]">
          <h2 className="font-display text-[9.23vw] leading-[100%] font-normal uppercase min-[480px]:text-[6.77vw] min-[992px]:w-3/5 min-[992px]:text-[5vw]">
            The principles
            <br />
            behind every
            <br />
            project I build
          </h2>
        </div>

        <div
          ref={trackRef}
          className="mt-[10.77vw] flex flex-col min-[480px]:mt-[13.02vw] min-[992px]:mt-0 min-[992px]:h-dvh min-[992px]:w-max min-[992px]:flex-row min-[992px]:items-center min-[992px]:pl-[36px]"
        >
          {principles.map((entry, index) => (
            <Stage
              key={entry.id}
              entry={entry}
              index={index}
              flipped={index % 2 === 1}
              registerGlow={registerGlow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
