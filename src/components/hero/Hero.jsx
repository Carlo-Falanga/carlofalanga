import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const WORDMARK = "CARLO FALANGA";
const SECOND_WORD_INDEX = WORDMARK.indexOf(" ") + 1;

function renderWordmark(text, secondWordIndex) {
  return Array.from(text).map((char, idx) => {
    if (char === " ") {
      return (
        <span
          key={`space-${idx}`}
          aria-hidden="true"
          className="hero-space inline-block w-[0.28em]"
        />
      );
    }

    const isSecondWord = idx >= secondWordIndex;

    return (
      <span key={`letter-${idx}`} className="inline-block">
        <span className="inline-block overflow-hidden">
          <span className="hero-letter relative inline-block text-(--cream)">
            {char}
            {isSecondWord && (
              <span
                aria-hidden="true"
                className="hero-fill absolute inset-0 text-(--mustard)"
              >
                {char}
              </span>
            )}
          </span>
        </span>
      </span>
    );
  });
}

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const letters = gsap.utils.toArray(".hero-letter");
      const fillLetters = gsap.utils.toArray(".hero-fill");
      const corners = gsap.utils.toArray(".hero-corner");

      if (reduceMotion) {
        gsap.set(letters, { yPercent: 0, opacity: 1 });
        gsap.set(fillLetters, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(corners, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(letters, { yPercent: 100, opacity: 0 });
      gsap.set(fillLetters, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(corners, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
      }).addLabel("lettersDone");

      tl.to(
        fillLetters,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          stagger: 0.07,
        },
        "lettersDone-=0.2"
      );

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

        <div className="flex-1" />

        <div
          aria-hidden="true"
          className="hero-wordmark translate-y-[4%] display uppercase font-medium leading-[0.82]"
        >
          <div className="flex items-baseline text-[clamp(30px,calc((100vw_-_72px)_*_0.1223),400px)] tracking-[-0.03em]">
            {renderWordmark(WORDMARK, SECOND_WORD_INDEX)}
          </div>
        </div>
      </div>
    </section>
  );
}
