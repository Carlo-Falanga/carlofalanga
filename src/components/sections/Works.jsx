import { memo, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { mouseQuery } from "../../lib/media";
import { pageTop } from "../../lib/scroll";
import { projects } from "./projectList";

function Works({ onActiveChange }) {
  const [active, setActive] = useState(-1);
  const [preview, setPreview] = useState(0);
  const [peekOn, setPeekOn] = useState(false);
  const [canHover, setCanHover] = useState(() => mouseQuery().matches);
  const listRef = useRef(null);
  const peekRef = useRef(null);
  const hovering = useRef(false);

  useEffect(() => {
    const query = mouseQuery();
    const onChange = () => setCanHover(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (active !== -1) onActiveChange(active);
  }, [active, onActiveChange]);

  useGSAP(() => {
    const items = [...listRef.current.children];
    let centers = [];
    // the project closest to the middle of the screen is the lit one, unless the cursor picked one
    ScrollTrigger.create({
      trigger: listRef.current,
      start: "top bottom",
      end: "bottom top",
      onRefresh: () => {
        centers = items.map((li) => pageTop(li) + li.offsetHeight / 2);
      },
      onUpdate: (self) => {
        if (hovering.current) return;
        const middle = self.scroll() + window.innerHeight / 2;
        let best = -1;
        let gap = Infinity;
        centers.forEach((center, i) => {
          const d = Math.abs(center - middle);
          if (d < gap) {
            gap = d;
            best = i;
          }
        });
        setActive(gap < window.innerHeight * 0.3 ? best : -1);
      },
      onLeave: () => !hovering.current && setActive(-1),
      onLeaveBack: () => !hovering.current && setActive(-1),
    });
  });

  useEffect(() => {
    if (!canHover) return;
    const moveX = gsap.quickTo(peekRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const moveY = gsap.quickTo(peekRef.current, "y", { duration: 0.45, ease: "power3.out" });
    const onMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [canHover]);

  function onEnter(i) {
    if (!canHover) return;
    hovering.current = true;
    setActive(i);
    setPreview(i);
    setPeekOn(true);
  }

  function onLeaveItem() {
    hovering.current = false;
    setPeekOn(false);
  }

  return (
    <section id="work" className="works">
      <h2 className="sr-only">Work</h2>
      {canHover && (
        <div ref={peekRef} className={`peek${peekOn ? " show" : ""}`} aria-hidden="true">
          {projects.map((p, i) => (
            <img
              key={p.title}
              src={p.image}
              srcSet={`${p.imageSmall} 800w, ${p.image} 1600w`}
              sizes="min(32vw, 500px)"
              alt=""
              width="1600"
              height={p.imageHeight}
              decoding="async"
              style={{ display: preview === i ? "block" : "none" }}
            />
          ))}
        </div>
      )}
      <ul ref={listRef}>
        {projects.map((p, i) => (
          <li
            key={p.title}
            className={active === i ? "active" : ""}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={onLeaveItem}
          >
            <a className="t" href={p.demo} target="_blank" rel="noreferrer">
              {p.title}
            </a>
            <span className="s">{p.summary}</span>
            <span className="mshot">
              <img
                src={p.image}
                srcSet={`${p.imageSmall} 800w, ${p.image} 1600w`}
                sizes="92vw"
                alt={`${p.title} screenshot`} width="1600" height={p.imageHeight} loading="lazy" decoding="async" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(Works);
