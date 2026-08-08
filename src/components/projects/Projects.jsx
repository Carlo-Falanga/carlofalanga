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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const heading = headingRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const lines = section.querySelectorAll(".project-rise");
    const frames = section.querySelectorAll(".project-frame");

    if (reduced) {
      gsap.set([heading, ...lines, ...frames], { opacity: 1, y: 0, yPercent: 0 });
      return;
    }

    gsap.set(heading, { opacity: 0, y: 18 });
    gsap.set(lines, { yPercent: 100 });
    gsap.set(frames, { opacity: 0, y: 18 });

    const reveal = (target) => {
      if (target === heading) {
        gsap.to(heading, { opacity: 1, y: 0, duration: 1, ease: "refEase" });
        return;
      }
      gsap.to(target.querySelectorAll(".project-rise"), {
        yPercent: 0,
        duration: 1,
        ease: "refEase",
        stagger: 0.08,
      });
      gsap.to(target.querySelector(".project-frame"), {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "refEase",
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    observer.observe(heading);
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      gsap.killTweensOf([heading, ...lines, ...frames]);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-px mt-[23.08vw] min-[480px]:mt-[13.02vw] min-[992px]:mt-[9.38vw]"
    >
      <h2
        ref={headingRef}
        className="font-display leading-[100%] font-normal uppercase text-[16vw] min-[480px]:text-[13vw] min-[992px]:text-[10.63vw]"
      >
        Projects
      </h2>

      <div className="mt-[8vw] flex flex-col gap-[10vw] min-[480px]:gap-[6vw] min-[992px]:mt-[3vw] min-[992px]:gap-[4.375vw]">
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
