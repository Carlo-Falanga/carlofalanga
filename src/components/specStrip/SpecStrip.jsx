const stack = ["JavaScript", "React", "Express", "PHP", "Laravel", "MySQL"];

export default function SpecStrip() {
  return (
    <div className="grid grid-cols-1 items-baseline gap-x-6 p-4 md:px-12 border-y border-(--line) font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim)">
      <div className="py-1 md:py-0 md:text-center">
        <span>Stack - </span>
        <span className="font-body normal-case font-medium tracking-normal text-[13px] text-(--fg)">
          {stack
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(" · ")}
        </span>
      </div>
    </div>
  );
}
