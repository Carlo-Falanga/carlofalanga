import { memo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "../../lib/gsap";
import { bioParts } from "../content";

// every plain word is its own token, a highlighted phrase counts as one token
const tokens = bioParts.flatMap((part) =>
  typeof part === "string" ? part.split(" ").map((word) => ({ word })) : [{ word: part.highlight, highlight: true }],
);

function Bio() {
  const textRef = useRef(null);

  useGSAP(() => {
    const words = textRef.current.querySelectorAll(".w");
    // words light up as the paragraph rises, all of them by the time it sits in the middle of the screen
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 90%",
      end: "center center",
      onUpdate: (self) => {
        const lit = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < lit));
      },
    });
  });

  return (
    <section id="about" className="bio">
      <h2 className="sr-only">About</h2>
      <p ref={textRef}>
        {tokens.map((t, i) => {
          const space = i > 0 && !/^[.,:]/.test(t.word) ? " " : "";
          return (
            <span key={i}>
              {space}
              {t.highlight ? (
                <span className="w hl" data-text={t.word}>
                  {t.word}
                </span>
              ) : (
                <span className="w">{t.word}</span>
              )}
            </span>
          );
        })}
      </p>
    </section>
  );
}

export default memo(Bio);
