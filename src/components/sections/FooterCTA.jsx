import { useRef } from "react";
import { LuArrowUp, LuGithub, LuLinkedin } from "react-icons/lu";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/media";
import GlowText, { GLOW_KEEP, GLOW_PASS } from "../ui/GlowText";

const EMAIL = "carlofalanga7@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/Carlo-Falanga", Icon: LuGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/carlo-alberto-falanga",
    Icon: LuLinkedin,
  },
];

const HEAD_WORDS = ["Let’s", "be", "in"];
const ACCENT_WORD = "touch";
const PASS_LETTERS = HEAD_WORDS.join("").length;

function GlowWord({ word, keep, trailingSpace }) {
  return (
    <>
      <span className="inline-block">
        <GlowText text={word} keep={keep} />
      </span>
      {trailingSpace ? " " : null}
    </>
  );
}

export default function FooterCTA() {
  const sectionRef = useRef(null);
  const socialRef = useRef(null);
  const lineRefs = useRef([]);
  const asideRef = useRef(null);
  const noteRef = useRef(null);

  useGSAP(
    () => {
      const footer = sectionRef.current;
      const lines = lineRefs.current.filter(Boolean);
      const fades = [asideRef.current, noteRef.current];
      const glowPass = Array.from(footer.querySelectorAll(GLOW_PASS));
      const glowKeep = Array.from(footer.querySelectorAll(GLOW_KEEP));

      if (prefersReducedMotion()) {
        gsap.set([socialRef.current, ...fades], { opacity: 1, yPercent: 0 });
        gsap.set(lines, { yPercent: 0 });
        gsap.set(glowKeep, { opacity: 1 });
        return;
      }

      gsap.set(socialRef.current, { opacity: 0, yPercent: 100 });
      gsap.set(fades, { opacity: 0 });
      gsap.set(lines, { yPercent: 100 });

      gsap
        .timeline({
          defaults: { ease: "siteEase" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            once: true,
          },
        })
        .to(socialRef.current, { opacity: 1, yPercent: 0, duration: 0.7 })
        .to(lines, { yPercent: 0, duration: 0.7, stagger: 0.1 }, 0.1)
        .addLabel("glow", 0.45)
        .to(
          glowPass,
          { opacity: 1, duration: 0.18, stagger: 0.055, ease: "none" },
          "glow"
        )
        .to(
          glowPass,
          { opacity: 0, duration: 0.3, stagger: 0.055, ease: "none" },
          "glow+=0.26"
        )
        .to(
          glowKeep,
          { opacity: 1, duration: 0.22, stagger: 0.055, ease: "none" },
          "glow+=" + 0.055 * PASS_LETTERS
        )
        .to(fades, { opacity: 1, duration: 0.5, stagger: 0.08 }, 0.45);
    },
    { scope: sectionRef }
  );

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="section-mt section-px overflow-hidden bg-(--ink) pt-[12.82vw] pb-[4.1vw] text-(--cream) tablet:pt-[7.81vw] tablet:pb-[2.08vw] laptop:pt-[5.63vw] laptop:pb-[2.5vw]"
    >
      <div className="flex flex-col">
        <div
          ref={socialRef}
          className="flex items-center justify-center gap-[3.85vw] tablet:justify-start tablet:gap-[1.56vw] laptop:gap-[1.25vw]"
        >
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid aspect-square w-[6.15vw] place-items-center rounded-full bg-(--cream) text-[3vw] text-(--ink) transition-colors duration-300 ease-fade hover:bg-(--mustard) motion-reduce:transition-none tablet:w-[2.99vw] tablet:text-[1.46vw] laptop:w-[2vw] laptop:text-[0.98vw]"
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="mt-[6.15vw] flex flex-col items-center gap-y-[8.21vw] tablet:mt-[3.13vw] tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-y-0 laptop:mt-[2.06vw]">
          <div className="flex flex-col items-center tablet:items-start">
            <span className="block overflow-hidden">
              <h2
                ref={(el) => (lineRefs.current[0] = el)}
                className="t-h2 block font-display"
              >
                {HEAD_WORDS.map((word) => (
                  <GlowWord key={word} word={word} trailingSpace />
                ))}
                <GlowWord word={ACCENT_WORD} keep />
              </h2>
            </span>

            <a
              href={`mailto:${EMAIL}`}
              className="block transition-opacity duration-300 ease-fade hover:opacity-30 motion-reduce:transition-none"
            >
              <span className="block overflow-hidden">
                <span
                  ref={(el) => (lineRefs.current[1] = el)}
                  className="block font-display text-[5.7vw] leading-[100%] font-medium whitespace-nowrap uppercase tablet:text-[4.8vw] laptop:text-[min(5vw,80px)]"
                >
                  {EMAIL}
                </span>
              </span>
            </a>
          </div>

          <a
            ref={asideRef}
            href="#top"
            aria-label="Back to top"
            className="group relative grid aspect-square w-[8.21vw] shrink-0 place-items-center overflow-hidden rounded-full bg-(--cream) text-(--ink) transition-colors duration-300 ease-fade hover:bg-(--mustard) motion-reduce:transition-none tablet:w-[7.16vw] laptop:w-[4.38vw]"
          >
            <LuArrowUp className="h-[1.92vw] w-[1.92vw] transition-transform duration-300 ease-fade motion-reduce:transition-none tablet:h-[1.17vw] tablet:w-[1.17vw] laptop:h-[0.75vw] laptop:w-[0.75vw] laptop:group-hover:-translate-y-[2.69vw]" />
            <LuArrowUp
              aria-hidden="true"
              className="absolute hidden h-[0.75vw] w-[0.75vw] translate-y-[2.69vw] transition-transform duration-300 ease-fade group-hover:translate-y-0 motion-reduce:transition-none laptop:block"
            />
          </a>
        </div>

        <div
          ref={noteRef}
          className="mt-[8.21vw] flex flex-col items-center opacity-50 tablet:mt-[2.08vw] tablet:flex-row tablet:items-start tablet:justify-between laptop:mt-[2.06vw]"
        >
          <span className="t-link">
            &copy; 2026 Carlo Alberto Falanga
          </span>
        </div>
      </div>
    </footer>
  );
}
