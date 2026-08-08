import { useRef } from "react";

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-(--cream) px-[2.6vw] py-[1.4vw] text-[2.6vw] leading-[90%] min-[480px]:px-[1.6vw] min-[480px]:py-[0.9vw] min-[480px]:text-[1.4vw] min-[992px]:px-[0.9vw] min-[992px]:py-[0.62vw] min-[992px]:text-[1vw]">
      {children}
    </span>
  );
}

function Reveal({ children, className = "" }) {
  return (
    <span className="block overflow-hidden">
      <span
        className={`project-rise block translate-y-full transition-transform duration-400 ease-[ease] group-hover:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

export default function ProjectCard({ project, index, total, cardRef }) {
  const counter = String(index + 1).padStart(2, "0");
  const of = String(total).padStart(2, "0");
  const pointerRef = useRef(null);

  const movePointer = (event) => {
    const node = pointerRef.current;
    if (!node) return;
    const box = event.currentTarget.getBoundingClientRect();
    node.style.transform = `translate(${event.clientX - box.left}px, ${
      event.clientY - box.top
    }px) translate(-50%, -50%)`;
  };

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={movePointer}
      className="project-card group relative flex w-full flex-col items-center gap-[2.4vw] min-[992px]:w-[86.32%] min-[992px]:gap-[0.625vw]"
    >
      <div className="pointer-events-none absolute left-0 top-0 z-10 hidden min-[992px]:block">
        <span
          ref={pointerRef}
          className="flex h-[7vw] w-[7vw] items-center justify-center rounded-full bg-(--ink) font-mono text-[0.7vw] uppercase text-(--cream) opacity-0 transition-opacity duration-300 ease-[ease] group-hover:opacity-100 motion-reduce:transition-none"
        >
          GitHub
        </span>
      </div>

      <div className="project-frame flex h-[50.26vw] w-full items-center justify-center overflow-hidden rounded-[1.3vw] bg-(--sand) min-[992px]:rounded-[0.63vw]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-400 ease-[ease] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <span className="font-display text-[10vw] leading-none text-(--line-strong) min-[992px]:text-[4vw]">
            {counter}
          </span>
        )}
      </div>

      <div className="flex w-full items-start justify-between gap-[2vw] min-[992px]:pointer-events-none min-[992px]:absolute min-[992px]:inset-0 min-[992px]:items-center">
        <div className="flex flex-col font-display font-medium min-[992px]:w-[15vw] min-[992px]:items-center">
          {project.category.map((line) => (
            <Reveal
              key={line}
              className="text-[4vw] leading-[130%] min-[480px]:text-[2.2vw] min-[992px]:text-[1.5vw]"
            >
              {line}
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col items-end gap-[2vw] min-[992px]:w-[15vw] min-[992px]:items-center min-[992px]:gap-[1.25vw]">
          <Reveal className="font-mono text-[3vw] leading-[110%] min-[480px]:text-[1.6vw] min-[992px]:text-[1vw]">
            <span>{counter}</span>
            <span className="opacity-40"> / {of}</span>
          </Reveal>

          <div className="flex flex-wrap justify-end gap-[1.6vw] min-[992px]:justify-center min-[992px]:gap-[0.5vw]">
            {project.tags.map((tag) => (
              <Reveal key={tag}>
                <Tag>{tag}</Tag>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="font-display text-[4.6vw] leading-[130%] font-medium uppercase min-[480px]:text-[2.2vw] min-[992px]:text-[1.5vw]">
        <span className="underline decoration-1 underline-offset-[0.3em]">
          {project.title}
        </span>
      </Reveal>
    </a>
  );
}
