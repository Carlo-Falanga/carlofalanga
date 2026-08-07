import ToolBoxSkills from "./ToolBoxSkills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        02 Skills
      </div>

      {/* Title */}
      <h2 className="col-span-full md:col-start-3 md:col-span-10 min-w-0 font-display font-normal text-[36px] md:text-[72px] leading-[0.94] tracking-[-0.02em]">
        Stack - <em className="font-display ">tools used daily</em>
      </h2>

      {/* Skills grid */}
      <div className="col-span-full md:col-start-3 md:col-span-10">
        <ToolBoxSkills />
      </div>
    </section>
  );
}
