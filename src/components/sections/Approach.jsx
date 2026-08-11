import { Fragment, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { LAPTOP_MIN_WIDTH } from "../../lib/media";
import GlowText, { GLOW_COPY } from "../ui/GlowText";
import CodePanel from "./CodePanel";

const PINNED_TRACK = `(min-width: ${LAPTOP_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`;
const CAROUSEL = `(max-width: ${LAPTOP_MIN_WIDTH - 1}px), (prefers-reduced-motion: reduce)`;

const principles = [
  {
    id: "01",
    title: "Clean code",
    description:
      "I write readable, maintainable code and keep the same discipline across every layer of a project.",
    panel: {
      surface: "bg-(--code-bg)",
      content: <CodePanel />,
    },
  },
  {
    id: "02",
    title: "Modern stack",
    description:
      "React, Node.js, Express and MySQL day to day, with PHP and Laravel from the Boolean master.",
    panel: {
      surface: "bg-(--code-bg)",
      image: {
        src: "/images/approach-schema.webp",
        tall: "/images/approach-schema-tall.webp",
        alt: "Entity relationship diagram of the NaturaFit database, with the recipes, categories, tags and recipe_tag tables",
      },
    },
  },
  {
    id: "03",
    title: "Full cycle",
    description:
      "Comfortable working end-to-end, from interface to database, not locked into a single layer.",
    panel: {
      surface: "bg-(--paper)",
      image: {
        src: "/images/approach-naturafit.webp",
        alt: "Recipe detail page from NaturaFit, served by the Laravel API",
      },
    },
  },
  {
    id: "04",
    title: "Detail driven",
    description:
      "Two years designing for international magazines taught me to notice what's slightly off.",
  },
];

function Stage({ entry, flipped }) {
  return (
    <div
      className={
        "approach-stage relative -ml-px flex h-[62svh] w-[82vw] shrink-0 snap-start items-center justify-center gap-[12vw] border-x border-(--line-strong) px-[6vw] text-center tablet:w-[52vw] tablet:gap-[6vw] tablet:px-[3vw] laptop:w-[45vw] laptop:justify-between laptop:gap-0 laptop:px-[2.5vw] laptop:motion-safe:h-[60vh] " +
        (flipped ? "flex-col-reverse" : "flex-col")
      }
    >
      <div className="flex w-full flex-col items-center gap-[5.13vw] tablet:gap-[2.6vw] laptop:gap-[1.25vw]">
        <h3 className="t-h4 font-display">{entry.title}</h3>
        <p className="t-body w-full text-center opacity-75 laptop:w-[71.76%]">
          {entry.description}
        </p>
      </div>

      <div
        className={
          "flex w-full items-center gap-[5.13vw] tablet:gap-[2.6vw] laptop:gap-[3.13vw] " +
          (flipped ? "flex-col-reverse" : "flex-col")
        }
      >
        <div className="h-px w-[88.42%] shrink-0 bg-(--line-strong)" />

        <span className="t-num-b font-display">
          <GlowText text={entry.id} />
        </span>
      </div>
    </div>
  );
}

export default function Approach() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const activeRef = useRef(-1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pinned = stageRef.current;
    const heading = headingRef.current;
    const track = trackRef.current;
    if (!wrapper || !pinned || !heading || !track) return;

    const stages = Array.from(track.querySelectorAll(".approach-stage"));
    const glowOf = (stage) => Array.from(stage.querySelectorAll(GLOW_COPY));
    const everyGlow = () => stages.flatMap(glowOf);

    const mm = gsap.matchMedia();

    mm.add(PINNED_TRACK, () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const travel = () => distance() * 0.71;

      const STAGE = 0.6;
      const GAP = 0.05;

      const lead = () => window.innerHeight * 0.25;
      const tail = () => window.innerHeight * 0.15;
      const run = () => lead() + travel();

      const eased = (progress) =>
        Math.min(Math.max((progress * run() - lead()) / travel(), 0), 1);

      let centers = [];

      const sizeWrapper = () => {
        const vh = window.innerHeight;
        const headHeight = heading.offsetHeight;
        const trackHeight = vh * (STAGE + 2 * GAP);

        track.style.height = trackHeight + "px";
        pinned.style.top = -(headHeight - vh * ((1 - STAGE) / 2 - GAP)) + "px";
        pinned.style.height = headHeight + trackHeight + "px";
        wrapper.style.height = vh + run() + tail() + "px";
        centers = stages.map((item) => item.offsetLeft + item.offsetWidth / 2);
      };

      sizeWrapper();
      ScrollTrigger.addEventListener("refreshInit", sizeWrapper);

      const paintActive = (progress) => {
        const x = -distance() * eased(progress);
        const middle = window.innerWidth / 2;

        let nearest = 0;
        let best = Infinity;
        centers.forEach((center, index) => {
          const gap = Math.abs(center + x - middle);
          if (gap < best) {
            best = gap;
            nearest = index;
          }
        });

        if (nearest === activeRef.current) return;
        activeRef.current = nearest;

        stages.forEach((stage, index) => {
          if (index === nearest) return;
          gsap.to(glowOf(stage), {
            opacity: 0,
            duration: 0.2,
            ease: "none",
            overwrite: true,
          });
        });

        gsap.to(glowOf(stages[nearest]), {
          opacity: 1,
          duration: 0.22,
          stagger: 0.055,
          delay: 0.2,
          ease: "none",
          overwrite: true,
        });
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: eased,
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + run(),
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => paintActive(self.progress),
          onLeaveBack: () => {
            activeRef.current = -1;
            gsap.to(everyGlow(), { opacity: 0, duration: 0.22, ease: "none" });
          },
        },
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", sizeWrapper);
        wrapper.style.height = "";
        pinned.style.top = "";
        pinned.style.height = "";
        track.style.height = "";
        activeRef.current = -1;
        gsap.set(everyGlow(), { opacity: 0 });
        tween.kill();
      };
    });

    mm.add(CAROUSEL, () => {
      const progress = progressRef.current;
      let progressRaf = 0;

      const drawProgress = () => {
        const scrollable = track.scrollWidth - track.clientWidth;
        const visible = (track.clientWidth / track.scrollWidth) * 100;
        const reached = scrollable > 0 ? track.scrollLeft / scrollable : 0;

        progress.style.width = visible + "%";
        progress.style.left = reached * (100 - visible) + "%";
      };

      const onTrackScroll = () => {
        if (progressRaf) return;
        progressRaf = requestAnimationFrame(() => {
          progressRaf = 0;
          drawProgress();
        });
      };

      drawProgress();
      track.addEventListener("scroll", onTrackScroll, { passive: true });
      window.addEventListener("resize", drawProgress);

      const paintStage = (index) => {
        if (index === activeRef.current) return;
        activeRef.current = index;

        stages.forEach((stage, position) => {
          gsap.set(glowOf(stage), { opacity: position === index ? 1 : 0 });
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => paintStage(stages.indexOf(entry.target)));
        },
        { root: track, threshold: 0.6 },
      );

      stages.forEach((stage) => observer.observe(stage));

      return () => {
        observer.disconnect();
        track.removeEventListener("scroll", onTrackScroll);
        window.removeEventListener("resize", drawProgress);
        if (progressRaf) cancelAnimationFrame(progressRaf);
        activeRef.current = -1;
        gsap.set(everyGlow(), { opacity: 0 });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="approach" ref={wrapperRef} className="section-mt relative">
      <div
        ref={stageRef}
        className="laptop:motion-safe:sticky laptop:motion-safe:overflow-hidden"
      >
        <div ref={headingRef} className="section-px flex items-start pt-[2vh]">
          <h2 className="t-h3 font-display laptop:w-3/5">
            The principles
            <br />
            behind every
            <br />
            project I build
          </h2>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-[8vw] flex snap-x snap-mandatory scroll-pl-(--sp-section-x) items-center overflow-x-auto px-(--sp-section-x) tablet:mt-[4vw] laptop:motion-safe:mt-0 laptop:motion-safe:h-dvh laptop:motion-safe:w-max laptop:motion-safe:snap-none laptop:motion-safe:overflow-visible laptop:motion-safe:pr-0"
        >
          {principles.map((entry, index) => (
            <Fragment key={entry.id}>
              <Stage entry={entry} flipped={index % 2 === 1} />

              {entry.panel && (
                <figure
                  className={
                    "@container h-[62svh] w-[82vw] shrink-0 snap-start overflow-hidden tablet:w-[52vw] laptop:w-[45vw] laptop:motion-safe:h-[60vh] " +
                    entry.panel.surface
                  }
                >
                  {entry.panel.image ? (
                    <picture>
                      {entry.panel.image.tall && (
                        <source
                          media="(max-width: 991px)"
                          srcSet={entry.panel.image.tall}
                        />
                      )}
                      <img
                        src={entry.panel.image.src}
                        alt={entry.panel.image.alt}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </picture>
                  ) : (
                    entry.panel.content
                  )}
                </figure>
              )}
            </Fragment>
          ))}
        </div>

        <div className="section-px mt-[6vw] flex items-center gap-[4vw] tablet:mt-[3vw] tablet:gap-[2vw] laptop:motion-safe:hidden">
          <span className="t-descrpt shrink-0 font-semibold opacity-70">Swipe</span>
          <span className="relative block h-[2px] w-full bg-(--line-strong)">
            <span
              ref={progressRef}
              className="absolute inset-y-0 left-0 block bg-(--mustard)"
            />
          </span>
        </div>
      </div>
    </section>
  );
}
