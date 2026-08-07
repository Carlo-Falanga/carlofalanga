import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";


const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// Nav pill with the "reel" hover: the label is rendered twice inside a
// fixed-height, overflow-hidden mask. On hover the stack translates up by
// exactly one row (translateY -50% of the doubled height == one row), so the
// visible copy scrolls out on top and the duplicate scrolls in from below.
// Pure transform, no top/height animation. Both copies stay --ink (the only
// color that keeps WCAG AA on the cream pill; --mustard-deep on --cream
// fails AA for 14px text), so the hover affordance comes from the pill
// background switching to --mustard instead of a text color change.
// Reduced-motion: the translate is neutralized and only the background
// color change remains, so the reel degrades to a colour change.
function NavLink({ name, href }) {
  return (
    <a
      href={href}
      className="group relative block h-[41px] shrink-0 overflow-hidden whitespace-nowrap rounded-full bg-(--cream) px-4 font-body text-[14px] font-normal normal-case tracking-normal transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-(--mustard) motion-reduce:transition-none"
    >
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span className="flex h-[41px] shrink-0 items-center text-(--ink)">
          {name}
        </span>
        <span
          aria-hidden="true"
          className="flex h-[41px] shrink-0 items-center text-(--ink)"
        >
          {name}
        </span>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-(--ink)">
      {/* Three-zone layout: nav pills left · logo centered · CTA right.
          On mobile the grid collapses to a flex row (logo left, hamburger
          right) since nav/CTA are hidden below md. */}
      <div className="flex h-[86px] items-center justify-between px-9 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
        {/* Nav pills — left */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} href={link.href} />
          ))}
        </nav>

        {/* Logo — centered on desktop (equal 1fr tracks on both sides) */}
        <img
          src="/logo/logo-dark.svg"
          alt="Carlo Falanga"
          className="h-6 w-auto shrink-0 md:justify-self-center"
        />

        {/* CTA — right (desktop) / hamburger — right (mobile) */}
        <div className="flex items-center justify-end gap-4 md:justify-self-end">
          <a
            href="/cv-carlo-alberto-falanga.pdf"
            download
            className="hidden h-[45px] shrink-0 items-center gap-2 rounded-full bg-(--cream) py-1 pr-5 pl-2 font-body text-[14px] font-normal text-(--ink) transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-(--paper) motion-reduce:transition-none md:inline-flex"
          >
            <span
              aria-hidden="true"
              className="h-7 w-7 shrink-0 rounded-full bg-(--mustard)"
            />
            Download CV
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="cursor-pointer text-(--cream) transition-colors hover:text-(--mustard) md:hidden"
          >
            {menuOpen ? <LuX size={18} /> : <LuMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="flex flex-col border-t border-(--line) bg-(--ink) font-body text-[14px] font-normal normal-case tracking-normal text-(--cream) md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-t border-(--line) px-9 py-4 transition-colors hover:text-(--mustard) first:border-t-0"
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
