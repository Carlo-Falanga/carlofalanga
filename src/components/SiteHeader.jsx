import { Fragment, useState } from "react";
import { LuArrowRight, LuMenu, LuX } from "react-icons/lu";

const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function NavLink({ name, href }) {
  return (
    <a
      href={href}
      className="group relative block h-[41px] shrink-0 overflow-hidden whitespace-nowrap rounded-full px-8 font-body text-[14px] font-normal normal-case tracking-normal transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-(--mustard) motion-reduce:transition-none"
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
      <div className="flex h-[86px] items-center justify-between px-9 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
        <nav className="hidden w-fit items-center overflow-hidden rounded-full bg-(--cream) md:flex md:justify-self-start">
          {navLinks.map((link, index) => (
            <Fragment key={link.name}>
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="h-5 w-px shrink-0 bg-(--line)"
                />
              )}
              <NavLink name={link.name} href={link.href} />
            </Fragment>
          ))}
        </nav>

        <img
          src="/logo/logo-dark.svg"
          alt="Carlo Falanga"
          className="h-6 w-auto shrink-0 md:justify-self-center"
        />

        <div className="flex items-center justify-end gap-4 md:justify-self-end">
          <a
            href="/cv-carlo-alberto-falanga.pdf"
            download
            className="hidden h-[45px] shrink-0 items-center gap-2 rounded-full bg-(--cream) py-1 pr-5 pl-2 font-body text-[14px] font-normal text-(--ink) transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-(--paper) motion-reduce:transition-none md:inline-flex"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--mustard)"
            >
              <LuArrowRight size={14} className="text-(--ink)" />
            </span>
            Download CV
          </a>

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
