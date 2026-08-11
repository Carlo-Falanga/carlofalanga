import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { laptopQuery, prefersReducedMotion } from "../../lib/media";
import ProjectCard from "./ProjectCard";
import ProjectCursor from "./ProjectCursor";

const projects = [
  {
    title: "BoolDog",
    category: ["E-commerce", "app"],
    tags: ["React", "Node.js"],
    href: "https://github.com/Carlo-Falanga/booldog",
    image: "/images/screenshot-booldog.webp",
  },
  {
    title: "NaturaFit",
    category: ["Wellness", "platform"],
    tags: ["Laravel", "React"],
    href: "https://github.com/Carlo-Falanga/naturafit-client",
    image: "/images/screenshot-naturafit.webp",
  },
  {
    title: "Warehouse orders",
    category: ["Order", "management"],
    tags: ["React", "Node.js"],
    href: "https://github.com/Carlo-Falanga/warehouse-orders",
    image: "/images/screenshot-warehouse.webp",
  },
];

const DESKTOP_SIZE = { baseW: 28.13, baseH: 16.19, peakW: 53.13, peakH: 28.13 };
const COMPACT_SIZE = { baseW: 58, baseH: 32.6, peakW: 91.8, peakH: 51.5 };
const HEADING_LIFT = 7.6;
const SIZE_FOLLOW = 0.12;

function useReveals(sectionRef, headingRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = Array.from(section.querySelectorAll(".project-card"));

    if (prefersReducedMotion()) {
      gsap.set(heading, { opacity: 1, y: 0 });
      cards.forEach((card) => card.classList.add("is-shown"));
      return;
    }

    gsap.set(heading, { opacity: 0, y: 18 });

    const revealHeading = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(heading, { opacity: 1, y: 0, duration: 1, ease: "fadeEase" });
          revealHeading.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    revealHeading.observe(heading);

    const revealCards = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-shown");
          revealCards.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.2 }
    );
    cards.forEach((card) => revealCards.observe(card));

    return () => {
      revealHeading.disconnect();
      revealCards.disconnect();
      gsap.killTweensOf(heading);
    };
  }, [sectionRef, headingRef]);
}

function useScrollGeometry(sectionRef, headWrapRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const headWrap = headWrapRef.current;
    const frames = Array.from(section.querySelectorAll(".project-frame"));
    const desktop = laptopQuery();

    const sizeOf = (frame) => {
      const box = frame.parentElement.getBoundingClientRect();
      const centre = box.top + box.height / 2;
      const past = 1 - centre / window.innerHeight;

      let ramp = 0;
      if (past > 0 && past < 1) {
        if (past < 0.2) ramp = past / 0.2;
        else if (past <= 0.6) ramp = 1;
        else ramp = (1 - past) / 0.4;
      }

      const eased = ramp * ramp * (3 - 2 * ramp);
      const { baseW, baseH, peakW, peakH } = desktop.matches
        ? DESKTOP_SIZE
        : COMPACT_SIZE;

      return {
        w: baseW + (peakW - baseW) * eased,
        h: baseH + (peakH - baseH) * eased,
      };
    };

    const applySize = (frame, size) => {
      frame.style.width = size.w + "vw";
      frame.style.height = size.h + "vw";
    };

    const current = frames.map(sizeOf);
    let sizeRaf = 0;

    const easeSizes = () => {
      const goals = frames.map(sizeOf);
      let moving = false;

      const next = goals.map((goal, index) => ({
        w: current[index].w + (goal.w - current[index].w) * SIZE_FOLLOW,
        h: current[index].h + (goal.h - current[index].h) * SIZE_FOLLOW,
      }));

      next.forEach((size, index) => {
        current[index] = size;
        applySize(frames[index], size);
        if (Math.abs(goals[index].w - size.w) > 0.01) moving = true;
      });

      sizeRaf = moving ? requestAnimationFrame(easeSizes) : 0;
    };

    const settleSizes = () => {
      const goals = frames.map(sizeOf);
      goals.forEach((goal, index) => {
        current[index] = goal;
        applySize(frames[index], goal);
      });
    };

    let headTop = 0;
    let headLift = 0;

    const measureHead = () => {
      headTop = headWrap.getBoundingClientRect().top + window.scrollY - headLift;
    };

    const driftHeading = () => {
      const natural = headTop - window.scrollY;
      const past = Math.min(Math.max(1 - natural / window.innerHeight, 0), 1);
      headLift = -past * (HEADING_LIFT / 100) * window.innerWidth;
      headWrap.style.transform = `translateY(${headLift}px)`;
    };

    const reset = () => {
      if (sizeRaf) cancelAnimationFrame(sizeRaf);
      headLift = 0;
      headWrap.style.transform = "";
      frames.forEach((frame) => {
        frame.style.width = "";
        frame.style.height = "";
      });
    };

    if (prefersReducedMotion()) {
      settleSizes();
      window.addEventListener("resize", settleSizes);
      return () => {
        window.removeEventListener("resize", settleSizes);
        reset();
      };
    }

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        if (!sizeRaf) sizeRaf = requestAnimationFrame(easeSizes);
        driftHeading();
      });
    };

    const onResize = () => {
      measureHead();
      onScroll();
    };

    settleSizes();
    measureHead();
    driftHeading();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      reset();
    };
  }, [sectionRef, headWrapRef]);
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headWrapRef = useRef(null);

  useReveals(sectionRef, headingRef);
  useScrollGeometry(sectionRef, headWrapRef);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-px mt-[13.02vw] bg-(--ink) pt-[12.82vw] pb-[12.82vw] text-(--cream) tablet:pt-[10vw] tablet:pb-[7.81vw] laptop:mt-[6.6vw] laptop:pb-[5.63vw]"
    >
      <ProjectCursor sectionRef={sectionRef} />

      <div ref={headWrapRef} className="relative z-[1] mb-[-4.4vw] mix-blend-difference">
        <h2
          ref={headingRef}
          className="t-1h text-center font-display text-white"
        >
          Projects
        </h2>
      </div>

      <div className="relative mt-[8vw] flex flex-col items-center gap-[16vw] tablet:gap-[9vw] laptop:mt-0 laptop:gap-[4.375vw]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
