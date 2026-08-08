import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "BoolDog",
    category: ["E-commerce", "app"],
    tags: ["React", "Node.js"],
    href: "https://github.com/Carlo-Falanga/booldog-project-work",
    image: "/images/screenshot-booldog.png",
  },
  {
    title: "NaturaFit",
    category: ["Wellness", "platform"],
    tags: ["Laravel", "React"],
    href: "https://github.com/Carlo-Falanga/naturafit-client",
    image: null,
  },
  {
    title: "Warehouse orders",
    category: ["Order", "management"],
    tags: ["JavaScript", "Web"],
    href: "https://github.com/Carlo-Falanga/warehouse-orders",
    image: null,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);
  const pointerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const heading = headingRef.current;
    const frames = section.querySelectorAll(".project-frame");

    if (reduced) {
      gsap.set(heading, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(heading, { opacity: 0, y: 18 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(heading, { opacity: 1, y: 0, duration: 1, ease: "refEase" });
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    observer.observe(heading);

    const BASE_W = 28.13;
    const BASE_H = 16.19;
    const PEAK_W = 53.13;
    const PEAK_H = 28.13;

    const sizeFrames = () => {
      const vh = window.innerHeight;
      frames.forEach((frame) => {
        const box = frame.parentElement.getBoundingClientRect();
        const centre = box.top + box.height / 2;
        const p = 1 - centre / vh;

        let t = 0;
        if (p > 0 && p < 1) {
          if (p < 0.2) t = p / 0.2;
          else if (p <= 0.6) t = 1;
          else t = (1 - p) / 0.4;
        }
        const eased = t * t * (3 - 2 * t);

        frame.style.width = BASE_W + (PEAK_W - BASE_W) * eased + "vw";
        frame.style.height = BASE_H + (PEAK_H - BASE_H) * eased + "vw";
      });
    };

    const pointer = pointerRef.current;
    const target = { x: 0, y: 0 };
    const at = { x: 0, y: 0 };
    let pointerRaf = 0;
    let visible = false;
    let primed = false;

    const drawPointer = () => {
      const vx = (target.x - at.x) * 0.14;
      const vy = (target.y - at.y) * 0.14;
      at.x += vx;
      at.y += vy;

      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(1 + speed * 0.022, 1.16);
      const angle = speed > 0.3 ? (Math.atan2(vy, vx) * 180) / Math.PI : 0;

      pointer.style.transform =
        `translate(${at.x}px, ${at.y}px) translate(-50%, -50%) ` +
        `rotate(${angle}deg) scale(${stretch}, ${1 / stretch}) rotate(${-angle}deg)`;

      pointerRaf =
        Math.abs(target.x - at.x) + Math.abs(target.y - at.y) > 0.4
          ? requestAnimationFrame(drawPointer)
          : 0;
    };

    const onPointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!primed) {
        at.x = target.x;
        at.y = target.y;
        primed = true;
      }

      const overFrame = [...frames].some((frame) => {
        const box = frame.getBoundingClientRect();
        return (
          event.clientX >= box.left &&
          event.clientX <= box.right &&
          event.clientY >= box.top &&
          event.clientY <= box.bottom
        );
      });

      if (overFrame !== visible) {
        visible = overFrame;
        pointer.style.opacity = overFrame ? "1" : "0";
      }

      if (!pointerRaf) pointerRaf = requestAnimationFrame(drawPointer);
    };

    const desktop = window.matchMedia("(min-width: 992px)");
    let frameId = 0;
    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        if (desktop.matches) sizeFrames();
      });
    };

    if (desktop.matches) {
      sizeFrames();
      window.addEventListener("mousemove", onPointerMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) cancelAnimationFrame(frameId);
      gsap.killTweensOf(heading);
      frames.forEach((frame) => {
        frame.style.width = "";
        frame.style.height = "";
      });
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-px mt-[23.08vw] min-[480px]:mt-[13.02vw] min-[992px]:mt-[9.38vw]"
    >
      <span
        ref={pointerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[3.9vw] w-[3.9vw] items-center justify-center rounded-full bg-(--cream) opacity-0 mix-blend-difference transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hidden min-[992px]:flex"
      >
        <span className="font-display text-[0.7vw] leading-[110%] font-normal text-(--ink) uppercase">
          Code
        </span>
      </span>

      <h2
        ref={headingRef}
        className="text-center font-display leading-[100%] font-normal uppercase text-[16vw] min-[480px]:text-[13vw] min-[992px]:text-[10.63vw]"
      >
        Projects
      </h2>

      <div className="mt-[8vw] flex flex-col items-center gap-[5.47vw] min-[992px]:mt-[3vw] min-[992px]:gap-[4.375vw]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            total={projects.length}
            cardRef={(node) => {
              cardRefs.current[index] = node;
            }}
          />
        ))}
      </div>
    </section>
  );
}
