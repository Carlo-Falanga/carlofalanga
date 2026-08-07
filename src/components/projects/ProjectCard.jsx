import { LuArrowUpRight } from "react-icons/lu";

function Tag({ children }) {
  return (
    <span className="rounded-full bg-(--sand) px-3 py-1 text-[13px] text-(--ink)">
      {children}
    </span>
  );
}

export default function ProjectCard({
  project,
  index,
  total,
  isLast,
  comingSoon,
  rowRef,
  imageRef,
}) {
  if (comingSoon) {
    return (
      <article
        ref={rowRef}
        className={`flex flex-col gap-4 py-10 opacity-40${
          isLast ? "" : " border-b border-(--line)"
        }`}
      >
        <div className="flex items-center justify-between font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
          <span>In progress</span>
          <span>— / —</span>
        </div>

        <div className="relative flex h-[160px] md:h-[220px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-(--shell)">
          <span
            aria-hidden="true"
            className="font-display font-normal text-[64px] md:text-[96px] leading-none text-(--line)"
          >
            03
          </span>
        </div>

        <h3 className="text-center font-display font-normal text-[26px] md:text-[36px] leading-none text-(--dim)">
          Coming soon
        </h3>
      </article>
    );
  }

  const counterCurrent = String(index + 1).padStart(2, "0");
  const counterTotal = String(total).padStart(2, "0");
  const categoryLines = project.category.split("\n");

  return (
    <article
      ref={rowRef}
      className={`group flex flex-col gap-5 md:gap-8 py-10 md:py-12${
        isLast ? "" : " border-b border-(--line)"
      }`}
    >
      <div className="flex items-center justify-between gap-4 font-mono uppercase tracking-[0.08em] text-[11px] text-(--ink) md:hidden">
        <span className="text-(--dim)">
          {categoryLines.join(" ")}
        </span>
        <span>
          {counterCurrent} <span className="text-(--dim)">/ {counterTotal}</span>
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 lg:gap-12">
        <div className="hidden md:flex md:w-[160px] lg:w-[190px] shrink-0 flex-col text-[17px] lg:text-[19px] leading-snug text-(--ink)">
          {categoryLines.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </div>

        <a
          href={project.demo ?? project.github}
          target="_blank"
          rel="noreferrer"
          className="relative block h-[200px] md:h-[260px] lg:h-[300px] w-full overflow-hidden rounded-[18px] bg-(--shell)"
          aria-label={`Open ${project.title}`}
        >
          <div
            ref={imageRef}
            className="absolute inset-0 h-[calc(100%+40px)] -top-5"
          >
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </a>

        <div className="hidden md:flex md:w-[160px] lg:w-[190px] shrink-0 flex-col items-start gap-3">
          <span className="font-mono text-[15px] text-(--ink)">
            {counterCurrent} <span className="text-(--dim)">/ {counterTotal}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:hidden">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="font-display font-normal text-[28px] md:text-[42px] lg:text-[48px] leading-none underline decoration-1 underline-offset-[10px] transition-colors duration-300 group-hover:text-(--mustard-deep)">
          {project.title}
        </h3>

        <p className="max-w-[52ch] text-[14px] text-(--dim) leading-relaxed">
          {project.description}
        </p>

        <div className="mt-1 flex gap-10">
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
              Not published
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
