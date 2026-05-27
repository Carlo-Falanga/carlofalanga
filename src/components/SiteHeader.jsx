import { useTheme } from "../hooks/useTheme";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  const { toggle } = useTheme();

  return (
    <header className="grid grid-cols-3 items-center gap-x-6 p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) border-b border-(--line)">

      <span>Carlo Falanga</span>

      <nav className="flex justify-center gap-6">
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href} className="hover:text-(--fg)">
              {link.name}
            </a>
          );
        })}
      </nav>

      <div className="flex justify-end items-center gap-4">
        <span>Portfolio / {year}</span>
        <button
          onClick={toggle}
          aria-label="Toggle light/dark mode"
          className="cursor-pointer hover:text-(--fg) transition-colors text-[16px]"
        >
          ◑
        </button>
      </div>

    </header>
  );
}
