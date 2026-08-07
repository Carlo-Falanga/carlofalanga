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

const GROUPS = {
  frontend: {
    flow: [
      { name: "JavaScript", Icon: SiJavascript, wide: true },
      { name: "React", Icon: SiReact },
      { name: "HTML", Icon: SiHtml5, wide: true },
      { name: "CSS", Icon: SiCss, wide: true },
      { name: "React", Icon: SiReact },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML", Icon: SiHtml5, wide: true },
      { name: "CSS", Icon: SiCss },
    ],
    over: [
      { name: "HTML", Icon: SiHtml5, left: 2.5, bottom: 2.5 },
      { name: "React", Icon: SiReact, left: 10, bottom: 3.75 },
      { name: "CSS", Icon: SiCss, wide: true, left: 15, bottom: 2.5 },
      { name: "JavaScript", Icon: SiJavascript, left: 27, bottom: 2.5 },
      { name: "React", Icon: SiReact, left: 47, bottom: 2.5 },
    ],
  },
  backend: {
    flow: [
      { name: "Node.js", Icon: SiNodedotjs, wide: true },
      { name: "PHP", Icon: SiPhp },
      { name: "Laravel", Icon: SiLaravel, wide: true },
      { name: "Express", Icon: SiExpress, wide: true },
      { name: "MySQL", Icon: SiMysql },
      { name: "SQLite", Icon: SiSqlite },
      { name: "GitHub", Icon: SiGithub, wide: true },
      { name: "Git", Icon: SiGit },
    ],
    over: [
      { name: "MySQL", Icon: SiMysql, left: 2.5, bottom: 2.5 },
      { name: "SQLite", Icon: SiSqlite, left: 10, bottom: 3.75 },
      { name: "Git", Icon: SiGit, wide: true, left: 15, bottom: 2.5 },
      { name: "PHP", Icon: SiPhp, left: 27, bottom: 2.5 },
      { name: "GitHub", Icon: SiGithub, left: 47, bottom: 2.5 },
    ],
  },
};

function Pill({ Icon, name, wide, rotate, left, bottom }) {
  const style = {};
  if (rotate) style.transform = `rotateZ(${rotate}deg)`;
  if (left !== undefined) style.left = `${left}vw`;
  if (bottom !== undefined) style.bottom = `${bottom}vw`;

  const base =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-(--ink) text-(--cream)";
  const placed = left !== undefined ? "absolute" : "";

  if (!wide) {
    return (
      <span
        style={style}
        className={`${base} ${placed} h-9 w-9 md:h-[3.75vw] md:w-[3.75vw]`}
      >
        <Icon className="h-3.5 w-3.5 md:h-[1.4vw] md:w-[1.4vw]" />
      </span>
    );
  }

  return (
    <span
      style={style}
      className={`${base} ${placed} h-7 gap-1.5 whitespace-nowrap px-3 md:h-[2.5vw] md:w-[8.75vw] md:gap-[0.6vw] md:px-0`}
    >
      <Icon className="h-3 w-3 md:h-[1.15vw] md:w-[1.15vw]" />
      <span className="font-body text-[11px] font-normal md:text-[0.9vw]">
        {name}
      </span>
    </span>
  );
}

export default function ServicePills({ variant }) {
  const group = GROUPS[variant] ?? GROUPS.frontend;

  return (
    <div className="relative flex w-full items-end gap-2 md:gap-[1.25vw]">
      {group.flow.map((item, idx) => (
        <Pill key={`f-${item.name}-${idx}`} {...item} />
      ))}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {group.over.map((item, idx) => (
          <Pill key={`o-${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}
