import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { isCompact, prefersReducedMotion } from "../../lib/media";
import { scramble } from "../../lib/scramble";
import { scrollToTarget } from "../../lib/scroll";
import { useSwell } from "../../lib/swell";
import { naplesTime } from "../../lib/time";
import { CV, sections } from "../content";
import Chars from "../ui/Chars";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp = (v) => Math.min(Math.max(v, 0), 1);

function bandHeight() {
  return document.querySelector(".band").offsetHeight;
}

export default function Rail({ section, project }) {
  const railRef = useRef(null);
  const topbarRef = useRef(null);
  const nameRef = useRef(null);
  const leadRef = useRef(null);
  const identityRef = useRef(null);
  const indexRef = useRef(null);
  const projectNameRef = useRef(null);
  const live = useRef(false);
  const [leadIn, setLeadIn] = useState(false);
  const [time, setTime] = useState(naplesTime);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLeadIn(true));
    const clock = setInterval(() => setTime(naplesTime()), 30000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    const el = projectNameRef.current;
    el.dataset.text = project.title;
    scramble(el);
  }, [project]);

  useGSAP(() => {
    const name = nameRef.current;
    const letters = name.querySelectorAll(".ch");

    if (prefersReducedMotion()) {
      live.current = true;
    } else {
      gsap.fromTo(
        letters,
        { "--wdth": 62, "--wght": 200, yPercent: 35, opacity: 0 },
        {
          "--wdth": 100,
          "--wght": 700,
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "siteEase",
          stagger: 0.055,
          delay: 0.25,
          onComplete: () => {
            live.current = true;
          },
        },
      );
    }

    // the address bar on phones changes innerHeight while scrolling: keep the height from load
    let viewH = window.innerHeight;
    let viewW = window.innerWidth;
    let sizes = {};

    // read every size once, then the scroll only writes styles
    function measure() {
      sizes = {
        compact: isCompact(),
        name: name.offsetHeight,
        band: bandHeight(),
        rail: railRef.current.offsetHeight,
        topbar: topbarRef.current.offsetHeight,
      };
    }

    // phone: the surname fills the width
    function fitName() {
      if (!isCompact()) {
        name.style.fontSize = "";
        return;
      }
      const probe = document.createElement("span");
      probe.textContent = "FALANGA";
      probe.style.cssText =
        'position:absolute;visibility:hidden;white-space:nowrap;font:700 100px "Archivo Variable";letter-spacing:-0.045em';
      document.body.appendChild(probe);
      name.style.fontSize = ((window.innerWidth * 0.9) / probe.offsetWidth) * 100 + "px";
      probe.remove();
    }

    // the dark hero shrinks into the rail (the top bar on phones) while the name lands in it
    function apply(progress) {
      const t = easeOut(progress);
      const { compact, name: nameHeight } = sizes;
      const top0 = viewH - nameHeight - viewH * 0.06;
      const top1 = sizes.band + (compact ? 14 : 24);
      const endScale = compact ? 38 / nameHeight : 0.2;

      gsap.set(name, { y: top0 + (top1 - top0) * t, scale: 1 - t * (1 - endScale) });
      name.classList.toggle("landed", t > 0.6);
      gsap.set(leadRef.current, { opacity: 1 - clamp(t * 3), y: -t * viewH * 0.18 });

      const rail = railRef.current;
      if (compact) {
        gsap.set(rail, { scaleX: 1, scaleY: 1 - (1 - sizes.topbar / sizes.rail) * t });
        topbarRef.current.classList.toggle("show", t > 0.9);
        return;
      }
      gsap.set(rail, { scaleX: 1 - 0.76 * t, scaleY: 1 });
      identityRef.current.style.top = top1 + nameHeight * endScale + 24 + "px";
      identityRef.current.classList.toggle("show", t > 0.95);
      indexRef.current.classList.toggle("show", t > 0.95);
    }

    fitName();
    measure();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => viewH * 0.8,
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => {
        measure();
        apply(self.progress);
      },
    });
    apply(trigger.progress);

    const onResize = () => {
      // on phones a height-only change is the address bar, not a real resize
      if (window.innerWidth === viewW && isCompact()) return;
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      fitName();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    document.fonts.ready.then(() => {
      fitName();
      measure();
      apply(trigger.progress);
    });

    return () => window.removeEventListener("resize", onResize);
  });

  const nameIsSwelling = useCallback(() => live.current && window.scrollY < window.innerHeight * 0.1, []);
  useSwell(nameRef, 340, nameIsSwelling);

  function goTo(e, id) {
    e.preventDefault();
    scrollToTarget(document.getElementById(id), -bandHeight());
  }

  return (
    <>
      <div ref={railRef} className="rail" />
      <div ref={topbarRef} className="topbar" />

      <h1 ref={nameRef} className="name">
        <span className="sr-only">Carlo Falanga</span>
        <Chars text="Carlo" className="line" readable={false} />
        <Chars text="Falanga" className="line surname" readable={false} />
      </h1>

      <div ref={leadRef} className="lead-wrap">
        <p className={`lead${leadIn ? " in" : ""}`}>
          I build features on a <i>multi-tenant</i> SaaS platform
          <span>, and the Shopify Plus stores around it.</span>
        </p>
      </div>

      <aside ref={identityRef} className="identity">
        <div className={`panel${section === "about" ? " on" : ""}`}>
          <p>
            <em>Full stack developer</em> at WebGas.net, building features on a multi-tenant SaaS platform in
            Laravel, Livewire and PostgreSQL.
          </p>
          <p>Shopify Plus stores: Liquid themes and custom apps.</p>
        </div>

        <div className={`panel${section === "work" ? " on" : ""}`}>
          <p className="row">
            <span className="k">Project</span>
            {/* filled by the effect above, which decodes the title letter by letter */}
            <span className="v" ref={projectNameRef} />
          </p>
          <p className="row">
            <span className="k">What</span>
            <span className="v">{project.what}</span>
          </p>
          <p className="row">
            <span className="k">Built with</span>
            <span className="v">{project.builtWith}</span>
          </p>
          <p className="row">
            <span className="k">Code</span>
            <a className="v" href={project.href} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </p>
        </div>

        <div className={`panel${section === "stack" ? " on" : ""}`}>
          <p className="row">
            <span className="k">Every day</span>
            <span className="v">Laravel, Livewire, Filament and PostgreSQL at WebGas.net</span>
          </p>
          <p className="row">
            <span className="k">Stores</span>
            <span className="v">Shopify Plus: Liquid themes and custom apps</span>
          </p>
          <p className="row">
            <span className="k">On my own</span>
            <span className="v">React, Node and Express</span>
          </p>
        </div>

        <div className={`panel${section === "contact" ? " on" : ""}`}>
          <p className="row">
            <span className="k">Local time</span>
            <span className="v">{time} in Naples</span>
          </p>
          <p className="row">
            <span className="k">Based in</span>
            <span className="v">Naples, Italy</span>
          </p>
          <p className="row">
            <span className="k">CV</span>
            <a className="v" href={CV} target="_blank" rel="noreferrer">
              Download the PDF
            </a>
          </p>
        </div>
      </aside>

      <nav ref={indexRef} className="index" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.key} href={`#${s.id}`} className={section === s.key ? "on" : ""} onClick={(e) => goTo(e, s.id)}>
            {s.label}
          </a>
        ))}
      </nav>
    </>
  );
}
