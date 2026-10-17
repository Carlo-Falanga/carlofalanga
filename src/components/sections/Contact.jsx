import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "../../lib/gsap";
import { scrollToTarget } from "../../lib/scroll";
import { useSwell } from "../../lib/swell";
import { CV, EMAIL, GITHUB, LINKEDIN } from "../content";
import Chars from "../ui/Chars";

const TITLE = ["Let's", "talk"];

function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const mailRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => setVisible(true),
    });
  });

  // the email fills the width of the column, up to 120px
  useEffect(() => {
    const mail = mailRef.current;
    const section = sectionRef.current;
    const fit = () => {
      const room = section.clientWidth - parseFloat(getComputedStyle(section).paddingLeft) * 2;
      mail.style.fontSize = "100px";
      // 0.9 leaves room for the letters that widen under the cursor
      mail.style.fontSize = Math.min(120, ((room * 0.9) / mail.offsetWidth) * 100) + "px";
    };
    fit();
    document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const mailIsSwelling = useCallback(() => {
    const r = sectionRef.current.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }, []);
  useSwell(mailRef, 220, mailIsSwelling);

  function backToTop(e) {
    e.preventDefault();
    scrollToTarget(0);
  }

  return (
    <section id="contact" ref={sectionRef} className={`contact${visible ? " in" : ""}`}>
      <h2 className="big">
        <span className="sr-only">Let's talk</span>
        {TITLE.map((line) => (
          <span className="ln" key={line} aria-hidden="true">
            {[...line].map((c, i) => (
              <span className="cl" key={i} style={{ transitionDelay: `${i * 45}ms` }}>
                {c}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <a ref={mailRef} className="mail" href={`mailto:${EMAIL}`}>
        <Chars text={EMAIL} />
      </a>
      <div className="links">
        <a href={GITHUB} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={CV} target="_blank" rel="noreferrer">
          CV (PDF)
        </a>
      </div>
      <div className="foot">
        <span>Carlo Falanga, 2026</span>
        <a href="#" className="to-top" aria-label="Back to top" onClick={backToTop}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default memo(Contact);
