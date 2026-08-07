import { useEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";
import { gsap } from "../../lib/gsap";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(CustomEase);
CustomEase.create("projectsEase", "M0,0,C0.16,1,0.3,1,1,1");

const projects = [
  {
    title: "BoolDog",
    category: "E-commerce\napp",
    description:
      "Full-stack application developed as a team project during the Boolean course. React frontend, Node.js/Express backend, MySQL persistence.",
    stack: ["React", "Node.js", "Express", "MySQL"],
    github: "https://github.com/Carlo-Falanga/booldog-project-work.git",
    demo: null,
    image: "/images/screenshot-booldog.png",
    imageWidth: 960,
    imageHeight: 755,
  },
  {
    title: "Portfolio",
    category: "Personal\nwebsite",
    description:
      "Personal portfolio designed and built from scratch. Editorial layout, scroll-driven motion, 12-column grid, and reusable React components.",
    stack: ["React", "Tailwind CSS", "Vite", "GSAP"],
    github: "https://github.com/Carlo-Falanga/carlofalanga.git",
    demo: "https://carlofalanga.dev",
    image: "/images/screenshot-portfolio.png",
    imageWidth: 957,
    imageHeight: 752,
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const titleLineRefs = useRef([]);
  const rowRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        titleLineRefs.current.map((line) =>
          line?.querySelector(".proj-line-solid")
        ),
        { opacity: 1 }
      );
      gsap.set(rowRefs.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      titleLineRefs.current.forEach((line, idx) => {
        if (!line) return;
        gsap.set(line, { yPercent: 110 });
        const solid = line.querySelector(".proj-line-solid");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
            delay: idx * 0.08,
          })
          .to(line, { yPercent: 0, duration: 0.7, ease: "projectsEase" })
          .to(
            solid,
            { opacity: 1, duration: 0.6, ease: "projectsEase" },
            0.05
          );
      });

      rowRefs.current.forEach((row) => {
        if (!row) return;

        gsap.set(row, { opacity: 0, y: 48 });
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "projectsEase",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      imageRefs.current.forEach((imageEl) => {
        if (!imageEl) return;

        gsap.fromTo(
          imageEl,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: imageEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-12 md:py-22 border-b border-(--line)"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 section-px">
        <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
          03 Projects
        </div>

        <h2
          aria-label="Selected projects."
          className="col-span-full md:col-start-3 md:col-span-10 font-display font-normal text-[40px] md:text-[88px] leading-[0.92] tracking-[-0.02em]"
        >
          <span aria-hidden="true">
            <span className="proj-line-mask block overflow-hidden">
              <span
                ref={(el) => (titleLineRefs.current[0] = el)}
                className="proj-line relative block"
              >
                <span className="proj-line-dim block text-(--dim)">
                  Selected
                </span>
                <span className="proj-line-solid absolute inset-0 block text-(--ink) opacity-0">
                  Selected
                </span>
              </span>
            </span>
            <span className="proj-line-mask block overflow-hidden">
              <span
                ref={(el) => (titleLineRefs.current[1] = el)}
                className="proj-line relative block"
              >
                <span className="proj-line-dim block text-(--dim)">
                  projects.
                </span>
                <span className="proj-line-solid absolute inset-0 block text-(--ink) opacity-0">
                  projects.
                </span>
              </span>
            </span>
          </span>
        </h2>
      </div>

      <div className="col-span-full mt-12 md:mt-20 flex flex-col section-px">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            total={projects.length}
            isLast={idx === projects.length - 1}
            rowRef={(el) => (rowRefs.current[idx] = el)}
            imageRef={(el) => (imageRefs.current[idx] = el)}
          />
        ))}

        <ProjectCard
          comingSoon
          rowRef={(el) => (rowRefs.current[projects.length] = el)}
        />
      </div>
    </section>
  );
}
