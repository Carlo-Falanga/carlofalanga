import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: "01",
    title: "BoolDog e-commerce",
    type: "Full-stack web app",
    description: "Full-stack application developed as a team project during the Boolean course. React frontend, Node.js/Express backend, MySQL persistence.",
    stack: ["React", "Node.js", "Express", "MySQL"],
    github: "https://github.com/Carlo-Falanga/booldog-project-work.git",
    demo: null,
    image: "/images/screenshot-booldog.png",
    comingSoon: false,
  },
  {
    id: "02",
    title: "Portfolio",
    type: "Personal website",
    description: "Personal portfolio designed and built from scratch. Editorial layout, scroll-driven motion, 12-column grid, and reusable React components.",
    stack: ["React", "Tailwind CSS", "Vite", "GSAP"],
    github: "https://github.com/Carlo-Falanga/carlofalanga.git",
    demo: "https://carlofalanga.dev",
    image: "/images/screenshot-portfolio.png",
    comingSoon: false,
  },
  {
    id: "03",
    comingSoon: true,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-0 md:gap-y-8 py-12 md:py-22 section-px border-b border-(--line)"
    >
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        03 Projects
      </div>

      {/* Title */}
      <h2 className="col-span-full md:col-start-3 md:col-span-10 font-display font-normal text-[36px] md:text-[72px] leading-[0.94] tracking-[-0.02em]">
        Selected <em>recent work.</em>
      </h2>

      {/* Projects List*/}
      <div className="col-span-full md:col-start-3 md:col-span-10">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );
}
