import { LuArrowUpRight } from "react-icons/lu";

export default function ProjectCard({ project }) {
  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 py-12 border-b border-(--line) ${project.comingSoon ? "opacity-35" : ""}`}
    >
      {/* Image*/}
      <div className="lg:w-5/12 shrink-0 relative bg-(--soft) aspect-video lg:aspect-auto overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot ${project.title}`}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 10px)",
            }}
          />
        )}
      </div>

      {/* Project Content */}
      <div className="lg:w-7/12 flex flex-col gap-4">
        {/* Titolo e numero */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[24px] md:text-[36px]">
            {project.comingSoon ? "Prossimamente" : project.title}
          </h3>
          <span className="font-mono text-[11px] text-(--dim) mt-2 shrink-0">
            {project.id}
          </span>
        </div>

        {/* Project Type */}
        <em className="font-italic text-[15px] text-(--dim)">
          {project.comingSoon ? "In corso" : project.type}
        </em>

        {/* Description */}
        {!project.comingSoon && (
          <>
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
                  Non pubblicato <LuArrowUpRight size={14} />
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
