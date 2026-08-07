import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiSqlite,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { gsap } from "../../lib/gsap";

const rowA = [
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
];

const rowB = [
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "MySQL", Icon: SiMysql },
  { name: "SQLite", Icon: SiSqlite },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
];

function Pill({ name, Icon }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--ink) px-6 py-3 text-(--cream)">
      <Icon size={16} />
      <span className="font-body text-[14px] font-normal">{name}</span>
    </span>
  );
}

function MarqueeRow({ items, trackRef }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center gap-4">
        {doubled.map((item, idx) => (
          <Pill key={`${item.name}-${idx}`} name={item.name} Icon={item.Icon} />
        ))}
      </div>
    </div>
  );
}

export default function ToolBoxSkills() {
  const wrapperRef = useRef(null);
  const trackARef = useRef(null);
  const trackBRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set([trackARef.current, trackBRef.current], { xPercent: 0 });
        gsap.set(wrapperRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(wrapperRef.current, { opacity: 0, y: 24 });
      gsap.to(wrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      gsap.set(trackARef.current, { xPercent: 0 });
      gsap.set(trackBRef.current, { xPercent: -50 });

      gsap.to(trackARef.current, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });

      gsap.to(trackBRef.current, {
        xPercent: 0,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="flex flex-col gap-4 py-8 md:py-12">
      <MarqueeRow items={rowA} trackRef={trackARef} />
      <MarqueeRow items={rowB} trackRef={trackBRef} />
    </div>
  );
}
