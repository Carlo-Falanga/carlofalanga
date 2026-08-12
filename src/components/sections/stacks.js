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

export const groups = [
  {
    label: "Frontend",
    rows: [
      { name: "React", icons: [SiReact] },
      { name: "JavaScript", icons: [SiJavascript] },
      { name: "HTML, CSS", icons: [SiHtml5, SiCss] },
    ],
  },
  {
    label: "Backend",
    rows: [
      { name: "Node.js, Express", icons: [SiNodedotjs, SiExpress] },
      { name: "PHP, Laravel", icons: [SiPhp, SiLaravel] },
    ],
  },
  {
    label: "Database",
    rows: [
      { name: "MySQL", icons: [SiMysql] },
      { name: "SQLite", icons: [SiSqlite] },
    ],
  },
  {
    label: "Tooling",
    rows: [{ name: "Git, GitHub", icons: [SiGit, SiGithub] }],
  },
];
