import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { name: "Chi sono", href: "#about" },
  { name: "Competenze", href: "#skills" },
  { name: "Lavori", href: "#projects" },
  { name: "Contatti", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  const { toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) border-b border-(--line)">
        <span>Carlo Falanga</span>

        {/* NavBar*/}
        <nav className="hidden md:flex justify-center gap-6">
          {navLinks.map((link) => {
            return (
              <a key={link.name} href={link.href} className="hover:text-(--fg)">
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* year, theme toggle button + hamburger menu */}
        <div className="flex justify-end items-center gap-4">
          <span className="hidden md:block">Portfolio / {year}</span>

          <button
            onClick={toggle}
            aria-label="Toggle light/dark mode"
            className="cursor-pointer hover:text-(--fg) transition-colors text-[16px]"
          >
            ◑
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden cursor-pointer hover:text-(--fg) transition-colors text-[18px]"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col border-b border-(--line) font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim)">
          {navLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="p-4 border-t border-(--line) hover:text-(--fg)"
              >
                {link.name}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
