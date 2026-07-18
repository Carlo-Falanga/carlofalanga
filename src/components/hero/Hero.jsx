import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

function renderWord(word) {
  return Array.from(word).map((char, idx) => (
    <span key={`${word}-${idx}`} className="inline-block overflow-hidden">
      <span className="hero-letter inline-block">{char}</span>
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
        gsap.set(".hero-bar", { scaleX: 1 });
        gsap.set(".hero-signature", { scale: 1, opacity: 1 });
        gsap.set(corners, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(letters, { yPercent: 100, opacity: 0 });
      gsap.set(".hero-bar", { scaleX: 0 });
      gsap.set(".hero-signature", { scale: 0, opacity: 0 });
      gsap.set(corners, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
      })
        .to(
          ".hero-bar",
          { scaleX: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.15"
        )
        .to(
          ".hero-signature",
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2.4)" },
          "-=0.1"
        )
        .to(
          corners,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.1"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-(--ink) flex flex-col px-4 md:px-6"
    >
      <h1 className="sr-only">
        Carlo Falanga &mdash; Full-Stack Web Developer
      </h1>

      {/* Breathing room / omitted 3D object */}
      <div className="flex-1" />

      {/* Corner blocks */}
      <div className="hero-corners flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-8 md:pb-12">
        <p className="hero-corner max-w-[42ch] text-[15px] md:text-[16px] text-(--dim-invert) leading-relaxed">
          I&rsquo;m a full-stack web developer &mdash; I build clean, modern
          web apps end-to-end, from interface to database. Currently studying
          at Boolean, looking for a team to build with.
        </p>

        <p className="hero-corner display uppercase font-medium text-right text-[clamp(20px,2.4vw,34px)] leading-[1.05] text-(--cream)">
          <span className="block">BUILD</span>
          <span className="block">THINGS THAT</span>
          <span className="block">WORK.</span>
        </p>
      </div>

      {/* Wordmark band, bleeding off the bottom edge */}
      <div
        aria-hidden="true"
        className="hero-wordmark translate-y-[6%] display uppercase font-black text-(--cream) text-[clamp(72px,15vw,220px)] leading-[0.82] tracking-[-0.03em]"
      >
        <div className="relative">
          <span className="hero-bar absolute left-0 bottom-[6%] h-[58%] w-[46%] origin-left bg-(--mustard) z-0" />
          <div className="relative z-10 flex">{renderWord("CARLO")}</div>
        </div>
        <div className="flex items-start">
          <div className="flex">{renderWord("FALANGA")}</div>
          <span className="hero-signature inline-block w-2 h-2 md:w-3 md:h-3 ml-2 md:ml-3 mt-3 md:mt-6 bg-(--mustard)" />
        </div>
      </div>
    </section>
  );
}
