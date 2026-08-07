const values = [
  {
    id: "01",
    line1: "Clean",
    line2: "code",
    description:
      "I write readable, maintainable code and keep the same discipline across every layer of a project.",
  },
  {
    id: "02",
    line1: "Modern",
    line2: "stack",
    description:
      "React, Node.js, Express and MySQL day to day, with PHP and Laravel in active training at Boolean.",
  },
  {
    id: "03",
    line1: "Full",
    line2: "cycle",
    description:
      "Comfortable working end-to-end, from interface to database, not locked into a single layer.",
  },
  {
    id: "04",
    line1: "Detail",
    line2: "driven",
    description:
      "Two years designing for international magazines taught me to notice what's slightly off.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        06 Approach
      </div>

      {/* Title, 2 tight lines */}
      <h2 className="col-span-full md:col-start-3 md:col-span-10 font-display font-normal text-[36px] md:text-[68px] leading-[0.94] tracking-[-0.02em]">
        The principles
        <br />
        behind <em>the build.</em>
      </h2>

      {/* Pill with 4 circles */}
      <div className="col-span-full md:col-start-3 md:col-span-10 flex flex-col gap-8 md:gap-12">
        <div className="approach-pill flex flex-col md:flex-row md:items-center rounded-[32px] md:rounded-full bg-[color-mix(in_oklab,var(--cream)_97%,var(--ink)_3%)] p-3 md:p-4">
          {values.map((value, idx) => (
            <div key={value.id} className="approach-item relative flex-1 md:aspect-square">
              <div className="approach-circle relative flex h-full w-full items-center justify-start gap-3 md:gap-4 rounded-full bg-[color-mix(in_oklab,var(--cream)_93%,var(--ink)_7%)] px-6 py-4 md:py-0">
                {/* Fill overlay: predisposed for a scroll-linked scale/opacity reveal
                    (transform-only, per motion rules). Item 0 ships already active. */}
                <span
                  aria-hidden="true"
                  className={`approach-fill absolute inset-0 origin-center rounded-full bg-(--mustard) transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    idx === 0 ? "scale-110 opacity-100" : "scale-90 opacity-0"
                  }`}
                />
                <span className="relative z-10 flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-(--paper) font-mono text-[11px] text-(--ink)">
                  {value.id}
                </span>
                <span className="relative z-10 font-display text-[15px] md:text-[16px] leading-[1.15] text-(--ink)">
                  {value.line1}
                  <br />
                  {value.line2}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active step readout: 4 rows predisposed, only the first visible at rest.
            The motion pass will crossfade between them in sync with the fill above. */}
        <div className="relative">
          {values.map((value, idx) => (
            <div
              key={value.id}
              data-approach-index={idx}
              className={`approach-desc grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 ${
                idx === 0 ? "" : "hidden"
              }`}
            >
              <span className="md:col-span-3 font-mono uppercase tracking-[0.08em] text-[12px] text-(--ink)">
                {value.line1} {value.line2}
              </span>
              <p className="md:col-span-8 md:col-start-4 max-w-[56ch] text-[14px] text-(--dim) leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
