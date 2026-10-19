import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { isCompact, mouseQuery, nativeScroll, prefersReducedMotion } from "../../lib/media";
import { scrollToTarget } from "../../lib/scroll";
import { useSwell } from "../../lib/swell";
import { naplesTime } from "../../lib/time";
import { CV, sections } from "../content";
import Chars from "../ui/Chars";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp = (v) => Math.min(Math.max(v, 0), 1);
// on desktop the column keeps this share of the screen width
const RAIL_END = 0.24;
// the browser moves the name in step with the finger, JS only when it can't
const cssScroll = () => CSS.supports("animation-timeline: scroll()") && !prefersReducedMotion();
// touch Safari before 26 can't keep a finger-driven hero smooth, so there it plays on its own (CSS transitions)
const timedHero = () =>
  window.matchMedia("(hover: none)").matches && !CSS.supports("animation-timeline: scroll()") && !prefersReducedMotion();

function bandHeight() {
  return document.querySelector(".band").offsetHeight;
}

// 100lvh does not change when the phone toolbar collapses, innerHeight does
function largeViewportHeight() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;height:100lvh";
  document.body.appendChild(probe);
  const height = probe.offsetHeight;
  probe.remove();
  return height;
}

export default function Rail({ section, project }) {
  const railRef = useRef(null);
  const topbarRef = useRef(null);
  const nameRef = useRef(null);
  const leadRef = useRef(null);
  const identityRef = useRef(null);
  const indexRef = useRef(null);
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
    // switched on after the first frame, otherwise the name would slide in from the top on load
    let transitionsOn = false;
    const progress = { value: 0 };
    // touch scroll arrives in uneven steps on iOS, a short ease hides them
    const followScroll = gsap.quickTo(progress, "value", {
      duration: 0.3,
      ease: "power2.out",
      onUpdate: () => apply(progress.value),
    });

    // read every size once, then the scroll only writes styles
    function measure() {
      const compact = isCompact();
      sizes = {
        compact,
        // a tablet in landscape gets the desktop layout but scrolls with the finger like a phone
        css: (!mouseQuery().matches || nativeScroll()) && cssScroll(),
        timed: timedHero(),
        view: compact ? largeViewportHeight() : window.innerHeight,
        name: name.offsetHeight,
        band: bandHeight(),
        rail: railRef.current.offsetHeight,
        topbar: topbarRef.current.offsetHeight,
      };
      name.classList.toggle("follow-scroll", sizes.css);
      railRef.current.classList.toggle("follow-scroll", sizes.css);
      if (transitionsOn) document.documentElement.classList.toggle("hero-timed", sizes.timed);
      if (!sizes.css) return;
      const { top0, top1, endScale } = namePath();
      name.style.setProperty("--name-y0", top0 - sizes.band + "px");
      name.style.setProperty("--name-y1", top1 - sizes.band + "px");
      name.style.setProperty("--name-scale", endScale);
      railRef.current.style.setProperty("--rail-scale", compact ? sizes.topbar / sizes.rail : RAIL_END);
      document.documentElement.style.setProperty("--hero-end", viewH * 0.8 + "px");
    }

    // where the name starts (bottom of the hero) and where it lands, from the top of the screen
    function namePath() {
      const { compact, view, name: nameHeight } = sizes;
      return {
        top0: view - nameHeight - view * 0.06,
        top1: sizes.band + (compact ? 14 : 24),
        endScale: compact ? 38 / nameHeight : 0.2,
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
      // clientWidth, not innerWidth: on Android innerWidth grows with whatever sticks out, the name included
      name.style.fontSize = ((document.documentElement.clientWidth * 0.9) / probe.offsetWidth) * 100 + "px";
      probe.remove();
    }

    // the dark hero shrinks into the rail (the top bar on phones) while the name lands in it
    function apply(progress) {
      const t = easeOut(progress);
      const { compact, view, name: nameHeight } = sizes;
      const { top0, top1, endScale } = namePath();

      // the name sits under the band, so its path is measured from there
      if (!sizes.css) gsap.set(name, { y: top0 + (top1 - top0) * t - sizes.band, scale: 1 - t * (1 - endScale) });
      name.classList.toggle("landed", t > 0.6);
      gsap.set(leadRef.current, { opacity: 1 - clamp(t * 3), y: -t * view * 0.18 });

      const rail = railRef.current;
      if (compact) {
        if (!sizes.css) gsap.set(rail, { scaleX: 1, scaleY: 1 - (1 - sizes.topbar / sizes.rail) * t });
        topbarRef.current.classList.toggle("show", t > 0.9);
        return;
      }
      if (!sizes.css) gsap.set(rail, { scaleX: 1 - (1 - RAIL_END) * t, scaleY: 1 });
      identityRef.current.style.top = top1 + nameHeight * endScale + 24 + "px";
      identityRef.current.classList.toggle("show", t > 0.95);
      indexRef.current.classList.toggle("show", t > 0.95);
    }

    // the timed hero is either open or closed: any scroll past the top closes it
    function heroProgress(scrollProgress) {
      if (!sizes.timed) return scrollProgress;
      return scrollProgress > 0.02 ? 1 : 0;
    }

    fitName();
    measure();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => viewH * 0.8,
      onUpdate: (self) => {
        if (sizes.timed) {
          const next = heroProgress(self.progress);
          if (next === progress.value) return;
          progress.value = next;
          apply(next);
          return;
        }
        if (sizes.compact && !sizes.css) {
          followScroll(self.progress);
          return;
        }
        // kept in step for the resize handler, which re-applies the last position
        progress.value = self.progress;
        apply(self.progress);
      },
      onRefresh: (self) => {
        measure();
        progress.value = heroProgress(self.progress);
        followScroll.tween.pause();
        apply(progress.value);
      },
    });
    progress.value = heroProgress(trigger.progress);
    apply(progress.value);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        transitionsOn = true;
        document.documentElement.classList.toggle("hero-timed", sizes.timed);
      }),
    );

    const onResize = () => {
      // on phones a height-only change is the address bar: the dark part follows it, a full refresh would jump
      if (window.innerWidth === viewW && isCompact()) {
        viewH = window.innerHeight;
        measure();
        apply(progress.value);
        return;
      }
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      fitName();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    // fonts.ready can resolve before Archivo is even requested, then the probe measures the fallback font
    document.fonts.load('700 100px "Archivo Variable"', "FALANGA").then(() => {
      fitName();
      measure();
      apply(heroProgress(trigger.progress));
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
            <span className="v mask">
              <span key={project.title}>{project.title}</span>
            </span>
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
            {project.href ? (
              <a className="v" href={project.href} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            ) : (
              <span className="v">Private, invite only</span>
            )}
          </p>
        </div>

        <div className={`panel${section === "stack" ? " on" : ""}`}>
          <p className="row">
            <span className="k">Every day</span>
            <span className="v">Laravel, Livewire, Filament and PostgreSQL at WebGas.net</span>
          </p>
          <p className="row">
            <span className="k">E-commerce</span>
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
