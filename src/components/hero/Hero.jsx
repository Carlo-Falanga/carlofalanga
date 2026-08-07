import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const LINE_ONE = "CARLO";
const LINE_TWO = "FALANGA";

function renderLetters(word) {
  return Array.from(word).map((char, idx) => (
    <span key={`letter-${idx}`} className="inline-block">
      <span className="inline-block overflow-hidden">
        <span className="hero-letter relative inline-block text-(--cream)">
          {char}
        </span>
      </span>
    </span>
  ));
}

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const letters = gsap.utils.toArray(".hero-letter");
      const corners = gsap.utils.toArray(".hero-corner");

      if (reduceMotion) {
        gsap.set(letters, { yPercent: 0, opacity: 1 });
        gsap.set(corners, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(letters, { yPercent: 100, opacity: 0 });
      gsap.set(corners, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
      }).addLabel("lettersDone");

      tl.to(
        corners,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "lettersDone-=0.15"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="full-bleed relative h-dvh min-h-[640px] overflow-hidden bg-(--ink)"
    >
      <div className="relative flex h-full flex-col section-px">
        <h1 className="sr-only">
          Carlo Falanga &mdash; Full-Stack Web Developer
        </h1>

        <p className="hero-eyebrow mono-label absolute left-9 top-[118px] text-[11px] text-(--dim-invert)">
          Full-Stack Web Developer &middot; Italy
        </p>

        <div className="hero-corners flex flex-col gap-6 pt-[36dvh] md:flex-row md:items-start md:justify-between md:pt-[45dvh]">
          <p className="hero-corner text-[14px] font-normal text-(--dim-invert) leading-relaxed md:max-w-[320px]">
            I&rsquo;m a full-stack web developer &mdash; I build clean, modern
            web apps end-to-end, from interface to database. Currently studying
            at Boolean, looking for a team to build with.
          </p>

          <p className="hero-corner text-right text-[14px] font-normal uppercase text-(--cream) leading-relaxed md:max-w-[160px]">
            <span className="block">BUILD</span>
            <span className="block">THINGS THAT</span>
            <span className="block">WORK.</span>
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hero-wordmark mt-auto flex flex-col display-xl uppercase font-medium text-[clamp(44px,calc((100vw_-_72px)_*_0.224),470px)]"
        >
          <div className="flex items-baseline">
            <div className="inline-flex shrink-0">
              {renderLetters(LINE_ONE)}
            </div>
            <div className="relative z-0 grow self-stretch">
              <span
                aria-hidden="true"
                className="hero-accent-bar absolute -z-10 -left-3 top-[8%] h-[19%] w-[calc(100%_+_12px)] bg-(--mustard)"
              />
            </div>
          </div>
          <div className="inline-flex self-start">
            {renderLetters(LINE_TWO)}
          </div>
        </div>
      </div>
    </section>
  );
}
