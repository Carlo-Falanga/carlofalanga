const stack = ["react", "node", "express", "mysql"];

const year = new Date().getFullYear();

export default function SpecStrip() {
  return (
    <div className="grid grid-cols-4 items-baseline gap-x-6 p-4 border-y border-[var(--line)] font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)]">
      <div>
        <span className="font-body text-[13px] text-[var(--accent)]">•</span>{" "}
        Open to opportunities
      </div>
      <div>
        <span>Stack - </span>
        <span className="font-body normal-case font-medium tracking-normal text-[13px] text-[var(--fg)]">
          {stack
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(" · ")}
        </span>
      </div>
      <div>
        <span>Focus - </span>
        <span className="font-body normal-case font-medium tracking-normal text-[13px] text-[var(--fg)]">
          Frontend / Fullstack
        </span>
      </div>
      <div className="text-right">Edition / {year}</div>
    </div>
  );
}
