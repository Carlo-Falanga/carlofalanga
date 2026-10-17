import { memo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "../../lib/gsap";
import { isCompact } from "../../lib/media";
import { layers } from "./stacks";

function TechRow({ tech }) {
  const { Icon } = tech;
  return (
    <div className="tech">
      <span className="logo">
        <Icon aria-hidden="true" />
      </span>
      <b>
        <span>{tech.name}</span>
      </b>
    </div>
  );
}

function Stack() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // both triggers always exist: one created by gsap.matchMedia on rotation sends the page back to the top

      // desktop: the section stays pinned (CSS sticky) and the layers light up one at a time
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (isCompact()) return;
          const index = Math.min(layers.length - 1, Math.floor(self.progress * layers.length));
          setCurrent(index);
        },
      });

      // phones: plain rows, the one closest to the middle of the screen gets the yellow block
      const rows = [...sectionRef.current.querySelectorAll(".mrow")];
      const lightClosest = (self) => {
        if (!isCompact()) return;
        const middle = window.innerHeight * 0.45;
        let closest = -1;
        let best = Infinity;
        rows.forEach((row, i) => {
          const distance = Math.abs(row.querySelector("h3").getBoundingClientRect().top - middle);
          if (distance < best) {
            best = distance;
            closest = i;
          }
        });
        rows.forEach((row, i) => row.classList.toggle("on", self.isActive && i === closest));
      };
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".stack-m"),
        start: "top 60%",
        end: "bottom 30%",
        onUpdate: lightClosest,
        onToggle: lightClosest,
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
        <div className="where">
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

export default memo(Stack);
