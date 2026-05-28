import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: "01",
    title: "BoolDog e-commerce",
    type: "Full-stack web app",
    description: "Applicazione full-stack sviluppata in team durante il corso Boolean. Frontend React, backend Node.js/Express, persistenza su MySQL.",
    stack: ["React", "Node.js", "Express", "MySQL"],
    github: "https://github.com/Carlo-Falanga/booldog-project-work.git",
    demo: null,
    image: "/images/screenshot-booldog.png",
    comingSoon: false,
  },
  {
    id: "02",
    title: "Portfolio",
    type: "Sito personale",
    description: "Portfolio personale progettato e sviluppato da zero. Layout editoriale, dark/light mode, griglia 12 colonne e componenti React riutilizzabili.",
    stack: ["React", "Tailwind CSS", "Vite"],
    github: "https://github.com/Carlo-Falanga/carlofalanga.git",
    demo: null,
    image: "/images/screenshot-portfolio.png",
    comingSoon: false,
  },
  {
    id: "03",
    comingSoon: true,
  },
  {
    id: "04",
    comingSoon: true,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-0 md:gap-y-8 py-12 md:py-22 px-4 md:px-6 border-b border-(--line)"
    >
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        03 Projects
      </div>

      {/* Title */}
      <h2 className="col-span-full md:col-start-3 md:col-span-10 font-display text-[32px] md:text-[60px] leading-[0.94]">
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
