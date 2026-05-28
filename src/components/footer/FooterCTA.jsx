import { LuArrowRight, LuArrowDown } from "react-icons/lu";

export default function FooterCTA() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 py-16 md:py-24 px-4 md:px-6">
      <h2 className="col-span-full md:col-span-7 font-display text-[clamp(40px,7vw,96px)] leading-[0.94]">
        Looking for a <em>Full-Stack Web developer?</em>
      </h2>

      <div className="col-span-full md:col-span-5 flex flex-col justify-center gap-6">
        <p className="text-[16px] text-(--dim) leading-relaxed">
          Scarica il CV completo o scrivimi due righe.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="public/cv-carlo-alberto-falanga.pdf"
            className="btn_underline flex items-center gap-2 self-start pb-1"
            download="cv-carlo-alberto-falanga.pdf"
          >
            Scarica CV (.pdf) <LuArrowDown size={14} />
          </a>
          <a
            href="mailto:carlofalanga7@gmail.com"
            className="btn_underline flex items-center gap-2 self-start pb-1"
          >
            Scrivimi una email <LuArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
