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

export const frontendItems = [
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
];

export const backendItems = [
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "MySQL", Icon: SiMysql },
  { name: "SQLite", Icon: SiSqlite },
];

export const allItems = [
  ...frontendItems,
  ...backendItems,
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
];
