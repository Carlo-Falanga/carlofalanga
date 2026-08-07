import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const LINE_ONE = "CARLO";
const LINE_TWO = "FALANGA";

function Word({ word, keepGlow }) {
  return (
    <span className="hero-line block overflow-hidden py-[0.06em]">
      <span className="block whitespace-nowrap">
        {Array.from(word).map((char, idx) => (
          <span key={`${word}-${idx}`} className="hero-letter relative inline-block">
            <span className="text-(--cream)">{char}</span>
            <span
              aria-hidden="true"
              className={`hero-glow absolute inset-0 text-(--mustard) opacity-0 ${
                keepGlow ? "hero-glow-keep" : ""
              }`}
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
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
      const glowPass = gsap.utils.toArray(".hero-glow:not(.hero-glow-keep)");
      const glowKeep = gsap.utils.toArray(".hero-glow-keep");

      if (reduceMotion) {
        gsap.set(letters, { yPercent: 0, opacity: 1 });
        gsap.set(corners, { opacity: 1, y: 0 });
        gsap.set(glowKeep, { opacity: 1 });
        return;
      }

      gsap.set(letters, { yPercent: 110, opacity: 0 });
      gsap.set(corners, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.045,
      }).addLabel("in", "-=0.35");

      tl.to(
        glowPass,
        { opacity: 1, duration: 0.18, stagger: 0.055, ease: "none" },
        "in"
      );

      tl.to(
        glowPass,
        { opacity: 0, duration: 0.3, stagger: 0.055, ease: "none" },
        "in+=0.26"
      );

      tl.to(
        glowKeep,
        { opacity: 1, duration: 0.22, stagger: 0.055, ease: "none" },
        "in+=" + 0.055 * LINE_ONE.length
      );

      tl.to(
        corners,
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
        "in+=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="full-bleed relative h-dvh min-h-[640px] overflow-hidden bg-(--ink)"
    >
      <div className="section-px relative flex h-full flex-col">
        <h1 className="sr-only">
          Carlo Falanga &mdash; Full-Stack Web Developer
        </h1>

        <div className="hero-corners mt-auto flex flex-col gap-6 pb-[3vh] md:flex-row md:items-end md:justify-between">
          <p className="hero-corner text-[15px] leading-[130%] font-normal tracking-normal text-(--dim-invert) uppercase md:text-[1.25vw]">
            Full-Stack Web Developer &middot; Italy
          </p>

          <p className="hero-corner text-right text-[15px] leading-[130%] font-normal tracking-normal text-(--cream) uppercase md:max-w-[14vw] md:text-[1.25vw]">
            <span className="block">BUILD</span>
            <span className="block">THINGS THAT</span>
            <span className="block">WORK.</span>
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hero-wordmark display-xl mb-[2vh] flex flex-col font-bold text-[clamp(38px,min(calc((100vw_-_72px)_*_0.172),38vh),400px)] uppercase"
        >
          <Word word={LINE_ONE} />
          <Word word={LINE_TWO} keepGlow />
        </div>
      </div>
    </section>
  );
}
