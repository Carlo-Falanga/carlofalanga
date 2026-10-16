import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiLivewire,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiFilament,
  SiPostgresql,
  SiSqlite,
  SiShopify,
  SiWoo,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
  SiVite,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export const groups = [
  {
    label: "Frontend",
    rows: [
      { name: "React", icons: [SiReact] },
      { name: "JavaScript", icons: [SiJavascript] },
      { name: "Livewire", icons: [SiLivewire] },
      { name: "HTML, CSS, Tailwind", icons: [SiHtml5, SiCss, SiTailwindcss] },
    ],
  },
  {
    label: "Backend",
    rows: [
      { name: "PHP, Laravel", icons: [SiPhp, SiLaravel] },
      { name: "Filament", icons: [SiFilament], wordmark: true },
      { name: "Node.js, Express", icons: [SiNodedotjs, SiExpress] },
    ],
  },
  {
    label: "Database",
    rows: [
      { name: "PostgreSQL", icons: [SiPostgresql] },
      { name: "MySQL", icons: [GrMysql] },
      { name: "SQLite", icons: [SiSqlite] },
    ],
  },
  {
    label: "E-commerce",
    rows: [
      { name: "Shopify Plus", icons: [SiShopify] },
      { name: "WooCommerce", icons: [SiWoo] },
    ],
  },
  {
    label: "Tooling",
    rows: [
      { name: "Git, GitHub", icons: [SiGit, SiGithub] },
      { name: "GitHub Actions, Docker", icons: [SiGithubactions, SiDocker] },
      { name: "Vite", icons: [SiVite] },
    ],
  },
];
