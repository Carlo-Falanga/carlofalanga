import styles from "./SiteHeader.module.css";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const year = new Date().getFullYear();

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <span className={styles.mark}>
        Logo
      </span>

      <nav className={styles.nav}>
        {navLinks.map((link) => {
          return (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          );
        })}
      </nav>
      <span className={styles.right}>Portfolio / {year}</span>
    </header>
  );
}
