import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import HeroTable from "./HeroTable";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 px-4 md:px-6">
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        00 Index
      </div>

      {/* Title */}
      <h1 className="col-span-full md:col-start-3 md:col-span-10 min-w-0 font-display text-[clamp(52px,10vw,124px)] leading-[0.94]">
        Full-Stack
        <br />
        <em className="block">web developer</em>
      </h1>

      {/* Table */}
      <div className="col-span-full md:col-start-1 md:col-span-4">
        <HeroTable />
      </div>

      {/* Text */}
      <p className="col-span-full md:col-start-6 md:col-span-6 text-[16px] text-(--dim) leading-relaxed">
        Frontend in React, backend con Node, Express e Laravel. <br />
        Unisco la parte tecnica a un occhio da designer.
      </p>

      {/* Links */}
      <div className="col-span-full md:col-start-6 md:col-span-6 flex flex-col md:flex-row gap-3 md:gap-6">
        <a
          href="#projects"
          className="btn_underline flex items-center gap-1 pb-1"
        >
          Scopri i progetti <LuArrowRight size={16} />
        </a>
        <a
          href="/cv-carlo-alberto-falanga.pdf"
          download="cv-carlo-alberto-falanga.pdf"
          className="btn_underline flex items-center gap-1 pb-1"
        >
          Scarica il CV <LuArrowDown size={16} />
        </a>
        <a
          href="#contact"
          className="btn_underline flex items-center gap-1 pb-1"
        >
          Contattami <LuArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
