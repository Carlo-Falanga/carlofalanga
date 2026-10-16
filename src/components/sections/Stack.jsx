import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { LAPTOP_MIN_WIDTH } from "../../lib/media";
import { scramble } from "../../lib/scramble";
import { layers } from "./stacks";

function TechRow({ tech }) {
  const { Icon } = tech;
  return (
    <div className="tech">
      <span className="logo">
        <Icon aria-hidden="true" />
      </span>
      <div>
        <b>{tech.name}</b>
        <p>{tech.where}</p>
      </div>
    </div>
  );
}

export default function Stack() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const whereRef = useRef(null);
  const shown = useRef(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: the section stays pinned (CSS sticky) and the layers light up one at a time
      mm.add(`(min-width: ${LAPTOP_MIN_WIDTH}px)`, () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const index = Math.min(layers.length - 1, Math.floor(self.progress * layers.length));
            setCurrent(index);
            if (index !== shown.current && self.progress > 0) {
              shown.current = index;
              whereRef.current.children[index].querySelectorAll("b").forEach((el, n) => scramble(el, 4 + n * 5));
            }
          },
        });
      });

      // phones: plain rows, the one in the middle of the screen gets the yellow block
      mm.add(`(max-width: ${LAPTOP_MIN_WIDTH - 1}px)`, () => {
        sectionRef.current.querySelectorAll(".mrow").forEach((row) => {
          ScrollTrigger.create({
            trigger: row.querySelector("h3"),
            start: "top 55%",
            end: "bottom 30%",
            toggleClass: { targets: row, className: "on" },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="stack" ref={sectionRef} className="stack">
      <h2 className="sr-only">Stack</h2>
      <div className="pin">
        <ul className="layers">
          {layers.map((layer, i) => (
            <li key={layer.name} className={current === i ? "on" : ""}>
              {layer.name}
            </li>
          ))}
        </ul>
        <div className="where" ref={whereRef}>
          {layers.map((layer, i) => (
            <div key={layer.name} className={current === i ? "on" : ""}>
              {layer.techs.map((tech) => (
                <TechRow key={tech.name} tech={tech} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="stack-m">
        {layers.map((layer) => (
          <div key={layer.name} className="mrow">
            <h3>{layer.name}</h3>
            <div className="techs">
              {layer.techs.map((tech) => (
                <TechRow key={tech.name} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
