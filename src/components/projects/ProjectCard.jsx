function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-(--cream) px-[1.1vw] py-[0.75vw] text-[2.6vw] leading-[90%] min-[480px]:text-[1.4vw] min-[992px]:px-[0.9vw] min-[992px]:py-[0.62vw] min-[992px]:text-[1vw]">
      {children}
    </span>
  );
}

function Reveal({ children, className = "" }) {
  return (
    <span className="block overflow-hidden">
      <span className={`project-rise block ${className}`}>{children}</span>
    </span>
  );
}

export default function ProjectCard({ project, index, total, cardRef }) {
  const counter = String(index + 1).padStart(2, "0");
  const of = String(total).padStart(2, "0");

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="project-card group block w-full"
    >
      <div className="flex flex-col gap-[4vw] min-[992px]:flex-row min-[992px]:items-center min-[992px]:gap-[2.5vw]">
        <div className="order-2 shrink-0 font-display uppercase leading-[110%] min-[992px]:order-1 min-[992px]:w-[15vw]">
          {project.category.map((line) => (
            <Reveal key={line} className="text-[4.6vw] min-[480px]:text-[2.4vw] min-[992px]:text-[1.5vw]">
              {line}
            </Reveal>
          ))}
        </div>

        <div className="project-frame order-1 flex w-full items-center justify-center overflow-hidden rounded-[2.4vw] bg-(--sand) p-[2.4vw] min-[992px]:order-2 min-[992px]:h-[28vw] min-[992px]:w-[53vw] min-[992px]:rounded-[0.63vw] min-[992px]:p-[1.6vw]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full rounded-[1.2vw] object-cover object-top shadow-[0_1.2vw_3vw_rgba(32,32,35,0.12)] min-[992px]:rounded-[0.4vw]"
            />
          ) : (
            <span className="font-display text-[10vw] leading-none text-(--line-strong) min-[992px]:text-[5vw]">
              {counter}
            </span>
          )}
        </div>

        <div className="order-3 flex shrink-0 items-center justify-between gap-[1.2vw] min-[992px]:w-[15vw] min-[992px]:flex-col min-[992px]:items-end min-[992px]:justify-center min-[992px]:gap-[1.25vw]">
          <Reveal className="font-mono text-[3vw] leading-[110%] min-[480px]:text-[1.6vw] min-[992px]:text-[1vw]">
            <span>{counter}</span>
            <span className="opacity-40"> / {of}</span>
          </Reveal>

          <div className="flex flex-wrap gap-[0.8vw] min-[992px]:justify-end min-[992px]:gap-[0.5vw]">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[3vw] min-[992px]:mt-[1.25vw]">
        <Reveal className="font-display text-[5.6vw] leading-[130%] font-medium min-[480px]:text-[2.6vw] min-[992px]:text-[1.5vw]">
          <span className="project-name inline-block">{project.title}</span>
        </Reveal>
      </div>
    </a>
  );
}
