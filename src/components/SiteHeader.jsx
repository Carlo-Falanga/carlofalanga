const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  return (
    <header className="bg-bg">
      <span>
        Logo
      </span>

      <nav>
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          );
        })}
      </nav>
      <span>Portfolio / {year}</span>
    </header>
  );
}
