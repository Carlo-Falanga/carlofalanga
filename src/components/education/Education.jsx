const education = [
  {
    id: "01",
    role: "Full-Stack Web Development Master",
    org: "Boolean",
    period: "Jan 2026 – Present",
    location: "Remote",
    description:
      "Full-time intensive program. Completed HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, MySQL and REST APIs. Currently specializing in PHP and Laravel.",
    current: true,
  },
  {
    id: "02",
    role: "Web Design Diploma",
    org: "ILAS, Istituto di Comunicazione",
    period: "2021 – 2022",
    location: "Naples",
    current: false,
  },
  {
    id: "03",
    role: "Graphic Design Diploma",
    org: "ILAS, Istituto di Comunicazione",
    period: "2021 – 2022",
    location: "Naples",
    current: false,
  },
];

function EducationRow({ entry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-(--line) border-t border-(--line)">
      <div className="md:col-span-3 flex items-start md:items-center py-8 md:py-12 md:px-8">
        <span
          className={
            entry.current
              ? "font-display font-normal leading-none tracking-[-0.03em] text-[clamp(56px,8vw,120px)] text-(--ink)"
              : "font-display font-normal leading-none tracking-[-0.03em] text-[clamp(48px,7vw,100px)] text-(--dim)"
          }
        >
          {entry.id}
        </span>
      </div>

      <div className="md:col-span-4 flex flex-col gap-3 py-8 md:py-12 md:px-8">
        <span className="font-mono lowercase tracking-[0.08em] text-[12px] text-(--dim)">
          (Education)
        </span>
        <h3 className="font-display text-[22px] md:text-[24px] leading-[1.05] text-(--ink)">
          {entry.role}
        </h3>
        <p className="text-[14px] text-(--dim)">{entry.org}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
            {entry.period} &middot; {entry.location}
          </span>
          {entry.current && (
            <span className="font-mono uppercase tracking-[0.08em] text-[10px] text-(--ink) bg-(--mustard) px-2 py-1">
              In progress
            </span>
          )}
        </div>
      </div>

      <div className="md:col-span-5 flex flex-col gap-3 py-8 md:py-12 md:px-8">
        {entry.description && (
          <>
            <span className="font-mono lowercase tracking-[0.08em] text-[12px] text-(--dim)">
              (Focus)
            </span>
            <p className="max-w-[52ch] text-[14px] text-(--dim) leading-relaxed">
              {entry.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden border-b border-(--line) section-px py-12 md:py-22"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-2 md:top-0 left-4 md:left-6 font-display font-normal uppercase leading-none text-[clamp(64px,16vw,220px)] tracking-[-0.03em] text-[color-mix(in_oklab,var(--ink)_6%,transparent)]"
      >
        Education
      </span>

      <div className="relative z-10">
        <div className="font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) mb-8 md:mb-12">
          08 Education
        </div>

        {education.map((entry) => (
          <EducationRow key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
