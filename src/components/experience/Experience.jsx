const highlights = [
  "Designed graphics for luxury magazines with an international distribution.",
  "Maintained visual identity and layout consistency across issues, in line with industry standards.",
  "Managed multiple projects under editorial deadlines, working closely with the editorial team and clients.",
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-(--line) section-px py-12 md:py-22"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-2 md:top-0 left-4 md:left-6 font-display font-normal uppercase leading-none text-[clamp(64px,16vw,240px)] tracking-[-0.03em] text-[color-mix(in_oklab,var(--ink)_6%,transparent)]"
      >
        Experience
      </span>

      <div className="relative z-10">
        <div className="font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) mb-8 md:mb-12">
          07 Experience
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-(--line) border-t border-(--line)">
          <div className="md:col-span-3 relative flex items-start md:items-center py-8 md:py-16 md:px-8">
            <span className="font-display font-normal leading-none tracking-[-0.03em] text-[clamp(64px,10vw,168px)] text-(--ink)">
              01
            </span>
            <span
              aria-hidden="true"
              className="absolute top-8 right-6 md:top-1/2 md:-translate-y-1/2 md:right-4 h-3 w-3 bg-(--mustard)"
            />
          </div>

          <div className="md:col-span-4 flex flex-col gap-3 py-8 md:py-16 md:px-8">
            <span className="font-mono lowercase tracking-[0.08em] text-[12px] text-(--dim)">
              (Role)
            </span>
            <h3 className="font-display text-[24px] md:text-[28px] leading-[1.05] text-(--ink)">
              Graphic Designer
            </h3>
            <p className="text-[15px] text-(--dim)">Capri Green srl</p>
            <div className="mt-1 font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
              Jul 2023 &ndash; Dec 2025 &middot; Capri, Italy
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3 py-8 md:py-16 md:px-8">
            <span className="font-mono lowercase tracking-[0.08em] text-[12px] text-(--dim)">
              (Highlights)
            </span>
            <ul className="flex flex-col gap-4 max-w-[52ch]">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-[15px] text-(--dim) leading-relaxed"
                >
                  <span aria-hidden="true" className="shrink-0">
                    &mdash;
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
