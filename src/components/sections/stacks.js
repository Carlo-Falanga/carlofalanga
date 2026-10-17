import {
  SiJavascript,
  SiReact,
  SiLivewire,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiFilament,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSqlite,
  SiShopify,
  SiGraphql,
  SiGit,
  SiGithubactions,
  SiDocker,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export const layers = [
  {
    name: "Frontend",
    techs: [
      { name: "JavaScript", Icon: SiJavascript },
      { name: "React", Icon: SiReact },
      { name: "Livewire", Icon: SiLivewire },
      { name: "Tailwind", Icon: SiTailwindcss },
      { name: "Bootstrap", Icon: SiBootstrap },
    ],
  },
  {
    name: "Backend",
    techs: [
      { name: "PHP", Icon: SiPhp },
      { name: "Laravel", Icon: SiLaravel },
      { name: "Filament", Icon: SiFilament },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
    ],
  },
  {
    name: "Database",
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: GrMysql },
      { name: "SQLite", Icon: SiSqlite },
    ],
  },
  {
    name: "E-commerce",
    techs: [
      { name: "Shopify Plus", Icon: SiShopify },
      // Liquid has no logo of its own, it's Shopify's template language
      { name: "Liquid", Icon: SiShopify },
      { name: "GraphQL", Icon: SiGraphql },
    ],
  },
  {
    name: "DevOps",
    techs: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub Actions", Icon: SiGithubactions },
      { name: "Docker", Icon: SiDocker },
    ],
  },
];
