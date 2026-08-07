import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
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

gsap.registerPlugin(CustomEase);
CustomEase.create("toolboxEase", "M0,0,C0.16,1,0.3,1,1,1");

const rowAFlow = [
  { name: "JavaScript", Icon: SiJavascript, wide: true },
  { name: "React", Icon: SiReact },
  { name: "HTML", Icon: SiHtml5, wide: true },
  { name: "CSS", Icon: SiCss },
  { name: "React", Icon: SiReact, wide: true },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "CSS", Icon: SiCss, wide: true },
  { name: "Node.js", Icon: SiNodedotjs, wide: true },
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel, wide: true },
  { name: "MySQL", Icon: SiMysql },
  { name: "Express", Icon: SiExpress, wide: true },
  { name: "SQLite", Icon: SiSqlite },
  { name: "PHP", Icon: SiPhp, wide: true },
];

const rowAOver = [
  { name: "CSS", Icon: SiCss, left: 7.5 },
  { name: "React", Icon: SiReact, left: 22.5 },
  { name: "SQLite", Icon: SiSqlite, wide: true, left: 92, rotate: 20 },
  { name: "MySQL", Icon: SiMysql, left: 82.5 },
];

const rowBFlow = [
  { name: "CSS", Icon: SiCss },
  { name: "React", Icon: SiReact, wide: true },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "HTML", Icon: SiHtml5, wide: true },
  { name: "React", Icon: SiReact },
  { name: "JavaScript", Icon: SiJavascript, wide: true },
  { name: "HTML", Icon: SiHtml5 },
  { name: "Express", Icon: SiExpress, wide: true },
  { name: "SQLite", Icon: SiSqlite },
  { name: "Node.js", Icon: SiNodedotjs, wide: true },
  { name: "Git", Icon: SiGit },
  { name: "MySQL", Icon: SiMysql, wide: true },
  { name: "GitHub", Icon: SiGithub },
  { name: "Laravel", Icon: SiLaravel, wide: true },
];

const rowBOver = [
  { name: "JavaScript", Icon: SiJavascript, left: 15 },
  { name: "HTML", Icon: SiHtml5, left: 30 },
  { name: "Git", Icon: SiGit, left: 58 },
  { name: "PHP", Icon: SiPhp, left: 75 },
];

function Pill({ name, Icon, wide, rotate, left }) {
  const style = {};
  if (rotate) style.transform = `rotateZ(${rotate}deg)`;
  if (left !== undefined) style.left = `${left}vw`;

  const base =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-(--ink) text-(--cream)";
  const placed = left !== undefined ? "absolute top-0" : "";

  if (!wide) {
    return (
      <span
        style={style}
        className={`${base} ${placed} h-11 w-11 md:h-[3.75vw] md:w-[3.75vw]`}
      >
        <Icon className="h-4 w-4 md:h-[1.4vw] md:w-[1.4vw]" />
      </span>
    );
  }

  return (
    <span
      style={style}
      className={`${base} ${placed} h-8 gap-2 whitespace-nowrap px-4 md:h-[2.5vw] md:w-[8.75vw] md:gap-[0.6vw] md:px-0`}
    >
      <Icon className="h-3.5 w-3.5 md:h-[1.15vw] md:w-[1.15vw]" />
      <span className="font-body text-[12px] font-normal md:text-[0.9vw]">
        {name}
      </span>
    </span>
  );
}

function Row({ flow, over }) {
  return (
    <div className="relative flex items-start gap-3 md:h-[4.6vw] md:gap-[1.25vw]">
      {flow.map((item, idx) => (
        <Pill key={`f-${item.name}-${idx}`} {...item} />
      ))}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {over.map((item, idx) => (
          <Pill key={`o-${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function ToolBoxSkills() {
  const wrapperRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) {
        gsap.set(wrapperRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(wrapperRef.current, { opacity: 0, y: 24 });
      gsap.to(wrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "toolboxEase",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="full-bleed overflow-hidden">
      <div className="mx-auto flex w-[105.26%] flex-col gap-2 md:gap-0">
        <Row flow={rowAFlow} over={rowAOver} />
        <Row flow={rowBFlow} over={rowBOver} />
      </div>
    </div>
  );
}
