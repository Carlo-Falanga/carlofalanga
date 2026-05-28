import { useState } from "react";
import { LuMenu, LuX, LuSunMoon } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";


const navLinks = [
  { name: "Chi sono", href: "#about" },
  { name: "Competenze", href: "#skills" },
  { name: "Lavori", href: "#projects" },
  { name: "Contatti", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-x-6 p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) border-b border-(--line)">
        <img
          src={theme === "dark" ? "/logo/logo-dark.svg" : "/logo/logo-light.svg"}
          alt="Carlo Falanga"
          className="h-5"
        />

        {/* NavBar*/}
        <nav className="hidden md:flex justify-center gap-6">
          {navLinks.map((link) => {
            return (
              <a key={link.name} href={link.href} className="whitespace-nowrap hover:text-[#3A86FF]">
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* year, theme toggle button + hamburger menu */}
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={toggle}
            aria-label="Toggle light/dark mode"
            className="cursor-pointer hover:text-[#3A86FF] transition-colors"
          >
            <LuSunMoon size={14} />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden cursor-pointer hover:text-[#3A86FF] transition-colors"
          >
            {menuOpen ? <LuX size={16} /> : <LuMenu size={16} />}
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
                className="p-4 border-t border-(--line) hover:text-[#3A86FF]"
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
