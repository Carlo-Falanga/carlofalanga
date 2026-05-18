const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  return (
    <header className="grid grid-cols-12 gap-x-6 p-4 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)] border-b border-[var(--line)]">
      <span className="col-start-1 col-span-2 ">
        Logo
      </span>

      <nav className="col-start-4 col-span-6 flex justify-center gap-4" >
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href} className="hover:text-fg">
              {link.name}
            </a>
          );
        })}
      </nav>
      <span className="col-start-11 col-span-2 text-right">Portfolio / {year}</span>
    </header>
  );
}
