function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-(--cream) font-body px-[2.6vw] py-[1.4vw] t-tag text-(--ink) tablet:px-[1.6vw] tablet:py-[0.9vw] laptop:px-[0.9vw] laptop:py-[0.62vw]">
      {children}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <span className="block overflow-hidden">
      <span
        style={{ transitionDelay: `${delay}ms` }}
        className={`project-rise block translate-y-full transition-transform duration-700 ease-site group-[.is-shown]:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

export default function ProjectCard({ project, index, total }) {
  const counter = String(index + 1).padStart(2, "0");
  const of = String(total).padStart(2, "0");

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="project-card group relative flex w-full flex-col items-center gap-[5vw] tablet:gap-[3vw] laptop:w-[86.32%] laptop:gap-[0.625vw]"
    >
      <div className="project-frame group/frame relative flex h-[50.26vw] w-full items-center justify-center overflow-hidden rounded-[1.3vw] bg-(--ink) mouse:laptop:cursor-none laptop:rounded-[0.63vw]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-400 ease-fade group-[.is-active]:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <span className="font-display text-[10vw] leading-none opacity-30 laptop:text-[4vw]">
            {counter}
          </span>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-[4vw] laptop:pointer-events-none laptop:absolute laptop:inset-0 laptop:gap-[2vw]">
        <div className="hidden font-display font-medium laptop:flex laptop:w-[9.5vw] laptop:flex-col laptop:items-end laptop:pr-[1.2vw] laptop:text-right">
          {project.category.map((line, i) => (
            <Reveal
              key={line}
              delay={i * 70}
              className="t-title3"
            >
              {line}
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={140}
          className="t-title2 font-display uppercase laptop:hidden"
        >
          <span className="underline decoration-1 underline-offset-[0.3em]">
            {project.title}
          </span>
        </Reveal>

        <div className="flex shrink-0 flex-col items-end gap-[2vw] laptop:w-[9.5vw] laptop:items-start laptop:gap-[1.25vw] laptop:pl-[1.2vw]">
          <Reveal
            delay={140}
            className="t-title2 hidden font-body laptop:block"
          >
            <span>{counter}</span>
            <span className="opacity-40"> / {of}</span>
          </Reveal>

          <div className="flex flex-wrap justify-end gap-[1.6vw] laptop:justify-start laptop:gap-[0.5vw]">
            {project.tags.map((tag, i) => (
              <Reveal key={tag} delay={210 + i * 70}>
                <Tag>{tag}</Tag>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal
        delay={350}
        className="t-title2 hidden font-display uppercase laptop:block"
      >
        <span className="underline decoration-1 underline-offset-[0.3em]">
          {project.title}
        </span>
      </Reveal>
    </a>
  );
}
