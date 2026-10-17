import {
  SiReact,
  SiLivewire,
  SiTailwindcss,
  SiLaravel,
  SiNodedotjs,
  SiPostgresql,
  SiSqlite,
  SiShopify,
  SiGithubactions,
  SiDocker,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

export const layers = [
  {
    name: "Frontend",
    techs: [
      { name: "React", Icon: SiReact, where: "Clients for NaturaFit, Warehouse orders and BoolDog." },
      { name: "Livewire", Icon: SiLivewire, where: "The SaaS platform at WebGas.net." },
      { name: "Tailwind", Icon: SiTailwindcss, where: "The Scalo landing page." },
    ],
  },
  {
    name: "Backend",
    techs: [
      {
        name: "Laravel, Filament",
        Icon: SiLaravel,
        where: "A modular monolith with Filament at WebGas.net, and the APIs for NaturaFit and Scalo.",
      },
      { name: "Node, Express", Icon: SiNodedotjs, where: "The Warehouse orders API and the BoolDog backend." },
    ],
  },
  {
    name: "Database",
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql, where: "WebGas.net, with workspace-level tenant isolation." },
      { name: "MySQL", Icon: GrMysql, where: "NaturaFit and BoolDog." },
      { name: "SQLite", Icon: SiSqlite, where: "Warehouse orders and Scalo." },
    ],
  },
  {
    name: "E-commerce",
    techs: [
      { name: "Shopify Plus", Icon: SiShopify, where: "Liquid themes, custom apps and the GraphQL Admin API." },
    ],
  },
  {
    name: "DevOps",
    techs: [
      {
        name: "GitHub Actions",
        Icon: SiGithubactions,
        where: "CI and code review on the team's pull requests at WebGas.net.",
      },
      { name: "Docker", Icon: SiDocker, where: "Containerized deploys at WebGas.net." },
    ],
  },
];
