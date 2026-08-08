import { useRef } from "react";
import { LuArrowRight, LuArrowDown } from "react-icons/lu";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const TITLE_LINES = ["Let’s build", "something."];

export default function FooterCTA() {
  const sectionRef = useRef(null);
  const trackRefs = useRef([]);
  const fillRefs = useRef([]);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(trackRefs.current, { yPercent: 0 });
        gsap.set(fillRefs.current, { opacity: 1 });
        gsap.set([subRef.current, actionsRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(trackRefs.current, { yPercent: 100 });
      gsap.set(fillRefs.current, { opacity: 0 });
      gsap.set([subRef.current, actionsRef.current], { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.to(trackRefs.current, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.1,
      })
        .to(
          fillRefs.current,
          { opacity: 1, duration: 0.5, stagger: 0.1 },
          "<"
        )
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 py-16 md:py-32 section-px bg-(--ink)"
    >
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim-invert) pt-4">
        <span className="text-(--mustard)">05</span> Say hello
      </div>

      <div className="col-span-full md:col-start-3 md:col-span-10">
        <h2 className="font-display font-normal uppercase text-[clamp(48px,8vw,104px)] leading-[0.94] tracking-[-0.02em]">
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                ref={(el) => (trackRefs.current[i] = el)}
                className="relative inline-block text-(--dim-invert)"
              >
                {line}
                <span
                  ref={(el) => (fillRefs.current[i] = el)}
                  aria-hidden="true"
                  className="absolute inset-0 text-(--cream)"
                >
                  {line}
                </span>
              </span>
            </span>
          ))}
        </h2>

        <p
          ref={subRef}
          className="mt-6 md:mt-8 max-w-[46ch] text-[16px] md:text-[18px] text-(--dim-invert) leading-relaxed"
        >
          Full-stack web developer and Boolean master graduate, looking for
          a team to build with.
        </p>

        <div ref={actionsRef}>
          <a
            href="mailto:carlofalanga7@gmail.com"
            className="group relative mt-12 md:mt-16 inline-block"
          >
            <span className="font-display font-normal text-[clamp(22px,5.4vw,64px)] leading-none tracking-[-0.01em] text-(--cream) break-all">
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
              className="btn_underline flex items-center gap-2 self-start pb-1 text-(--cream)"
              download="cv-carlo-alberto-falanga.pdf"
            >
              Download CV (.pdf) <LuArrowDown size={14} />
            </a>
            <a
              href="mailto:carlofalanga7@gmail.com"
              className="btn_underline flex items-center gap-2 self-start pb-1 text-(--cream)"
            >
              Send me an email <LuArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
