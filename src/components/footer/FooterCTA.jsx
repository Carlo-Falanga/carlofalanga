import { LuArrowRight, LuArrowDown } from "react-icons/lu";

export default function FooterCTA() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 py-16 md:py-32 section-px">
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        <span className="text-(--mustard)">05</span> Say hello
      </div>

      <div className="col-span-full md:col-start-3 md:col-span-10">
        <h2 className="font-display font-normal uppercase text-[clamp(48px,8vw,104px)] leading-[0.94] tracking-[-0.02em]">
          Let&rsquo;s build
          <br />
          something.
        </h2>

        <p className="mt-6 md:mt-8 max-w-[46ch] text-[16px] md:text-[18px] text-(--dim) leading-relaxed">
          Full-stack web developer in training at Boolean &mdash; looking for
          a team to build with.
        </p>

        <a
          href="mailto:carlofalanga7@gmail.com"
          className="group relative mt-12 md:mt-16 inline-block"
        >
          <span className="font-display font-normal text-[clamp(22px,5.4vw,64px)] leading-none tracking-[-0.01em] break-all">
            carlofalanga7@gmail.com
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-(--mustard) transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        </a>

        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-10">
          <a
            href="/cv-carlo-alberto-falanga.pdf"
            className="btn_underline flex items-center gap-2 self-start pb-1"
            download="cv-carlo-alberto-falanga.pdf"
          >
            Download CV (.pdf) <LuArrowDown size={14} />
          </a>
          <a
            href="mailto:carlofalanga7@gmail.com"
            className="btn_underline flex items-center gap-2 self-start pb-1"
          >
            Send me an email <LuArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
