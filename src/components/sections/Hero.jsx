import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";
import GlowText, {
  GLOW_KEEP,
  GLOW_LETTER,
  GLOW_PASS,
} from "../ui/GlowText";

const LINE_ONE = "CARLO";
const LINE_TWO = "FALANGA";

function Word({ word, keepGlow }) {
  return (
    <span className="hero-line block overflow-hidden py-[0.06em]">
      <span className="block whitespace-nowrap">
        <GlowText text={word} keep={keepGlow} />
      </span>
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const hero = containerRef.current;
      const find = (selector) => Array.from(hero.querySelectorAll(selector));

      const letters = find(GLOW_LETTER);
      const corners = find(".hero-corner");
      const glowPass = find(GLOW_PASS);
      const glowKeep = find(GLOW_KEEP);

      if (prefersReducedMotion()) {
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

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () =>
            "+=" + (containerRef.current.offsetHeight || window.innerHeight),
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(".hero-wordmark", { yPercent: 26, ease: "none" }, 0)
        .to(corners, { yPercent: -140, opacity: 0, ease: "none" }, 0);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="full-bleed relative h-svh min-h-[640px] overflow-hidden bg-(--ink)"
    >
      <div className="section-px relative flex h-full flex-col justify-center laptop:justify-end">
        <h1 className="sr-only">
          Carlo Falanga, Full-Stack Web Developer
        </h1>

        <div className="hero-corners contents tablet:flex tablet:flex-row tablet:items-end tablet:justify-between tablet:pb-[2vh] laptop:mt-auto laptop:pb-[0.8vh]">
          <p className="hero-corner t-body order-3 mt-[6vw] text-center text-(--dim-invert) uppercase tablet:order-1 tablet:mt-0 tablet:text-left">
            Full-Stack Web Developer &middot; Italy
          </p>

          <p className="hero-corner t-body order-1 mb-[6vw] text-center text-(--cream) uppercase tablet:order-2 tablet:mb-0 tablet:max-w-[14vw] tablet:text-right">
            <span className="inline tablet:block">BUILD</span>{" "}
            <span className="inline tablet:block">THINGS THAT</span>{" "}
            <span className="inline tablet:block">WORK.</span>
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hero-wordmark display-xl order-2 mb-[0.4vh] flex flex-col font-bold text-[18.5vw] text-(--cream) uppercase tablet:text-[clamp(38px,min(calc((100vw_-_(2_*_var(--sp-section-x)))_*_0.172),40vh),400px)]"
        >
          <Word word={LINE_ONE} />
          <Word word={LINE_TWO} keepGlow />
        </div>
      </div>
    </section>
  );
}
