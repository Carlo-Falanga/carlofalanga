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

const items = [
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "MySQL", Icon: SiMysql },
  { name: "SQLite", Icon: SiSqlite },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
];

function Pill({ Icon, name }) {
  return (
    <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-(--ink) px-5 whitespace-nowrap text-(--cream) md:h-[3vw] md:gap-[0.6vw] md:px-[1.6vw]">
      <Icon className="h-4 w-4 md:h-[1.3vw] md:w-[1.3vw]" />
      <span className="font-body text-[13px] font-normal md:text-[1vw]">
        {name}
      </span>
    </span>
  );
}

export default function ToolBoxSkills() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) {
        gsap.set(trackRef.current, { xPercent: 0 });
        return;
      }

      gsap.fromTo(
        trackRef.current,
        { xPercent: 0 },
        { xPercent: -50, duration: 34, ease: "none", repeat: -1 }
      );
    },
    { scope: wrapperRef }
  );

  const doubled = [...items, ...items];

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden py-6 md:py-[2vw]">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-3 md:gap-[1.25vw]"
      >
        {doubled.map((item, idx) => (
          <Pill key={`${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}
