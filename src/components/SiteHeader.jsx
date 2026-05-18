const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  return (
    <header className="flex p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)] border-b border-[var(--line)]">
      <span className="flex-1 ">
        Logo
      </span>

      <nav className="flex flex-1 justify-center gap-4 " >
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href} className="hover:text-fg">
              {link.name}
            </a>
          );
        })}
      </nav>
      <span className="flex-1 text-right">Portfolio / {year}</span>
    </header>
  );
}
