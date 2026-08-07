import { LuArrowUpRight } from "react-icons/lu";

export default function ProjectCard({ project }) {
  if (project.comingSoon) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 py-8 border-b border-(--line) opacity-35">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] text-(--dim) shrink-0">
            {project.id}
          </span>
          <h3 className="font-display text-[24px] md:text-[36px]">
            Coming soon
          </h3>
        </div>
        <em className="font-italic text-[15px] text-(--dim)">In progress</em>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-12 border-b border-(--line)">
      <div className="lg:w-5/12 shrink-0 relative bg-(--soft) aspect-video lg:aspect-auto overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot ${project.title}`}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="lg:w-7/12 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[24px] md:text-[36px]">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] text-(--mustard) mt-2 shrink-0">
            {project.id}
          </span>
        </div>

        <em className="font-italic text-[15px] text-(--dim)">
          {project.type}
        </em>

        <p className="text-[15px] text-(--dim) leading-relaxed">
          {project.description}
        </p>

        <div className="border-t border-(--line)" />

        <div className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
          {project.stack.join(" · ")}
        </div>

        <div className="border-t border-(--line)" />

        <div className="flex gap-12">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn_underline flex items-center gap-1 text-[14px]"
          >
            GitHub <LuArrowUpRight size={14} />
          </a>

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn_underline flex items-center gap-1 text-[14px]"
            >
              Live <LuArrowUpRight size={14} />
            </a>
          ) : (
            <span className="flex items-center gap-1 text-[14px] text-(--dim)">
              Not published <LuArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
