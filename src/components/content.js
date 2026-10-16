import { naplesTime } from "../lib/time";

export const EMAIL = "carlofalanga7@gmail.com";
export const GITHUB = "https://github.com/Carlo-Falanga";
export const LINKEDIN = "https://linkedin.com/in/carlo-alberto-falanga";
export const CV = "/carlo-alberto-falanga-cv.pdf";

// one entry per cell of the band: the short value, the value it rolls to on hover, and the drawer
export const bandCells = [
  {
    label: "Role",
    value: "Full stack developer",
    hover: "Laravel, PostgreSQL, React",
    big: () => "Full stack developer",
    detail: "Laravel, Livewire, Filament and PostgreSQL at work. React, Node and Express in my own projects.",
  },
  {
    label: "Based in",
    value: "Naples, Italy",
    hover: "Central European Time",
    big: () => `Naples, ${naplesTime()}`,
    detail: "Central European Time, Italy.",
  },
  {
    label: "Currently",
    value: "WebGas.net",
    hover: "Multi-tenant SaaS in Laravel",
    big: () => "WebGas.net",
    detail:
      "Since September 2026: features and production fixes on a multi-tenant SaaS platform in Laravel, plus Shopify Plus stores.",
  },
  {
    label: "Before",
    value: "Graphic designer",
    hover: "Luxury magazines, Capri",
    big: () => "Graphic designer",
    detail:
      "Graphics for luxury magazines with an international distribution, in Capri, from July 2023 to December 2025.",
  },
  {
    label: "Contact",
    value: "Write me",
    hover: EMAIL,
    href: `mailto:${EMAIL}`,
    big: () => EMAIL,
    links: true,
  },
];

// plain strings are single words, objects are the phrases that get the yellow block
export const bioParts = [
  "I trained as a graphic designer, then moved to code. Today I build",
  { highlight: "web applications" },
  "end to end: at WebGas.net I ship features on a",
  { highlight: "multi-tenant SaaS" },
  "platform and follow tickets down to the",
  { highlight: "production fix" },
  ".",
];

export const sections = [
  { key: "about", id: "about", label: "About" },
  { key: "work", id: "work", label: "Work" },
  { key: "stack", id: "stack", label: "Stack" },
  { key: "contact", id: "contact", label: "Contact" },
];
