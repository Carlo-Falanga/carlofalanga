import { useEffect, useRef, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { prefersReducedMotion } from "../../lib/media";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Stack", href: "#skills" },
  { name: "Work", href: "#projects" },
  { name: "Background", href: "#background" },
  { name: "Contact", href: "#contact" },
];

function NavLink({ name, href }) {
  return (
    <a
      href={href}
      className="group relative block shrink-0 overflow-hidden rounded-full bg-white px-[calc(0.82*var(--nav-vw))] pt-[calc(0.64*var(--nav-vw))] pb-[calc(0.55*var(--nav-vw))] font-body text-[calc(0.74*var(--nav-vw))] leading-none font-normal whitespace-nowrap normal-case tracking-normal transition-colors duration-300 ease-site hover:bg-(--mustard) motion-reduce:transition-none"
    >
      <span className="block h-[1em] overflow-hidden">
        <span className="flex flex-col transition-transform duration-300 ease-site group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <span className="block h-[1em] shrink-0 text-(--ink)">{name}</span>
          <span
            aria-hidden="true"
            className="block h-[1em] shrink-0 text-(--ink)"
          >
            {name}
          </span>
        </span>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 120);
        lastY.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;

    const publishOffset = () => {
      const offset = hidden && !menuOpen ? 0 : header.offsetHeight;
      document.documentElement.style.setProperty("--nav-offset", offset + "px");
    };

    publishOffset();
    window.addEventListener("resize", publishOffset);
    return () => window.removeEventListener("resize", publishOffset);
  }, [hidden, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 w-full bg-(--ink) transition-transform duration-400 ease-site motion-reduce:transition-none ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="section-px flex items-center justify-between py-[clamp(10px,3vw,14px)] tablet:grid tablet:grid-cols-[1fr_auto_1fr] tablet:items-center tablet:gap-6 tablet:py-[1.1vw] laptop:py-[calc(1.1*var(--nav-vw))]">
          <div className="order-2 flex items-center gap-[2.5vw] tablet:order-none tablet:gap-0 tablet:justify-self-start">
            <nav className="hidden w-fit items-center gap-[calc(0.3125*var(--nav-vw))] rounded-full bg-(--cream) p-[calc(0.31*var(--nav-vw))] laptop:flex">
              {navLinks.map((link) => (
                <NavLink key={link.name} name={link.name} href={link.href} />
              ))}
            </nav>

            <a
              href="/carlo-alberto-falanga-cv.pdf"
              download="Carlo-Alberto-Falanga-CV.pdf"
              className="t-footer rounded-full bg-(--mustard) px-[clamp(14px,4.6vw,20px)] py-[clamp(9px,3vw,13px)] font-medium text-(--ink) transition-opacity duration-300 hover:opacity-80 tablet:hidden motion-reduce:transition-none"
            >
              Download CV
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="t-footer cursor-pointer rounded-full bg-(--cream) px-[clamp(14px,4.6vw,20px)] py-[clamp(9px,3vw,13px)] text-(--ink) transition-colors duration-300 hover:bg-(--mustard) tablet:px-[2.3vw] tablet:py-[1.5vw] laptop:hidden motion-reduce:transition-none"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <img
            src="/logo/logo-dark.svg"
            alt="Carlo Falanga"
            className="order-1 h-[clamp(16px,4.4vw,20px)] w-auto shrink-0 tablet:order-none tablet:h-[clamp(15px,2.2vw,18px)] tablet:justify-self-center laptop:h-[calc(1.15*var(--nav-vw))]"
          />

          <div className="order-3 hidden items-center justify-end gap-4 tablet:flex tablet:justify-self-end">
            <a
              href="/carlo-alberto-falanga-cv.pdf"
              download="Carlo-Alberto-Falanga-CV.pdf"
              className="group/cta inline-flex w-[clamp(120px,18vw,150px)] shrink-0 items-center gap-[clamp(6px,0.9vw,8px)] rounded-full border-[clamp(3px,0.46vw,4px)] border-(--shell) bg-white p-[clamp(3px,0.46vw,4px)] font-body text-[clamp(12px,1.48vw,13px)] leading-[90%] font-normal text-(--ink) laptop:w-[calc(9.2*var(--nav-vw))] laptop:gap-[calc(0.45*var(--nav-vw))] laptop:border-[calc(0.23*var(--nav-vw))] laptop:p-[calc(0.23*var(--nav-vw))] laptop:text-[calc(0.74*var(--nav-vw))]"
            >
              <span
                aria-hidden="true"
                className="relative flex h-[clamp(20px,3vw,25px)] w-[clamp(20px,3vw,25px)] shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--mustard) transition-colors duration-400 ease-fade group-hover/cta:bg-(--ink) laptop:h-[calc(1.5*var(--nav-vw))] laptop:w-[calc(1.5*var(--nav-vw))] motion-reduce:transition-none"
              >
                <LuArrowRight className="h-[clamp(9px,1.32vw,11px)] w-[clamp(9px,1.32vw,11px)] text-(--ink) transition-all duration-400 ease-fade group-hover/cta:translate-x-[2.1vw] group-hover/cta:text-(--cream) laptop:h-[calc(0.66*var(--nav-vw))] laptop:w-[calc(0.66*var(--nav-vw))] laptop:group-hover/cta:translate-x-[calc(1.05*var(--nav-vw))] motion-reduce:transition-none" />
                <LuArrowRight className="absolute h-[clamp(9px,1.32vw,11px)] w-[clamp(9px,1.32vw,11px)] -translate-x-[2vw] text-(--cream) opacity-0 transition-all duration-400 ease-fade group-hover/cta:translate-x-0 group-hover/cta:opacity-100 laptop:h-[calc(0.66*var(--nav-vw))] laptop:w-[calc(0.66*var(--nav-vw))] laptop:-translate-x-[var(--nav-vw)] motion-reduce:transition-none" />
              </span>
              <span className="transition-transform duration-400 ease-fade group-hover/cta:translate-x-[calc(0.3125*var(--nav-vw))] motion-reduce:transition-none">
                Download CV
              </span>
            </a>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="fixed inset-0 z-40 flex flex-col items-center bg-(--ink) pt-[23.3vh] laptop:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="t-h4 mb-[3.12vw] text-(--cream) transition-colors duration-300 hover:text-(--mustard) tablet:mb-[1.56vw] motion-reduce:transition-none"
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
