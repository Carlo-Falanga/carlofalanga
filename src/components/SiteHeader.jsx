const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  return (
    <header className="grid grid-cols-3 items-center gap-x-6 p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)] border-b border-[var(--line)]">
      <span>
        Logo
      </span>

      <nav className="flex justify-center gap-6">
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href} className="hover:text-fg">
              {link.name}
            </a>
          );
        })}
      </nav>
      <span className="text-right">Portfolio / {year}</span>
    </header>
  );
}
