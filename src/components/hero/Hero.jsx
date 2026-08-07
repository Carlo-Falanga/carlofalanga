import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

const WORDMARK = "CARLO FALANGA";
// Index (into Array.from(WORDMARK)) of the first letter of "FALANGA" -- the
// point where the wordmark grows its mustard fill. Replaces the old floating
// accent squares (hero-bar / hero-signature): the colour
// fill IS the signature now.
const SECOND_WORD_INDEX = WORDMARK.indexOf(" ") + 1;

function renderWordmark(text, secondWordIndex) {
  return Array.from(text).map((char, idx) => {
    if (char === " ") {
      // Non-animated spacer: keeps the two words on one baseline without
      // entering the .hero-letter stagger (GSAP only ever queries that class).
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
              // Mustard duplicate of the same glyph, stacked on top of the
              // cream base letter. clip-path is animated (see useGSAP below)
              // from "nothing visible" to "fully visible" with the clip edge
              // moving from the bottom up, i.e. FALANGA fills with mustard
              // from the baseline upward rather than just switching colour.
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
        // FALANGA lands solid mustard with no fill motion at all.
        gsap.set(fillLetters, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(corners, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(letters, { yPercent: 100, opacity: 0 });
      // Clip fully hidden from the top down -- 0% of the mustard glyph
      // showing, ready to fill upward from the baseline.
      gsap.set(fillLetters, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(corners, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(letters, {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
      }).addLabel("lettersDone");

      // Second moment: once the wordmark has (almost) finished sliding in,
      // FALANGA fills with mustard from the bottom up, letter by letter,
      // left to right.
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

        {/* Copy row: sits at ~45-47% of the viewport height (measured on the
            source), not near the top. Small, regular-weight text — the visual
            impact of the hero comes from the wordmark below, not this row.
            Both blocks are flush with the section's own 36px inner padding
            (no extra grid offset), matching the wordmark/header/section-title
            column: left paragraph starts at the content's left edge, the
            claim's right edge sits at the content's right edge. */}
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

        {/* Breathing room before the wordmark bleeds off the bottom edge */}
        <div className="flex-1" />

        {/* Wordmark band, bleeding off the bottom edge.
            Single row: "CARLO FALANGA" gets one font-size, calibrated so the
            whole line fills ~100% of the available width (viewport - 72px of
            section padding) regardless of viewport, via clamp(min, calc((100vw
            - 72px) * k), max). k is calibrated against the measured rendered
            bounding box of the .hero-letter spans (not estimated), and the
            max is raised well past anything reachable at realistic viewports
            so it never caps the fill. CARLO stays cream; FALANGA fills solid
            mustard from the bottom up (see renderWordmark + useGSAP above). */}
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
