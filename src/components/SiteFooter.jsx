import FooterCTA from "./footer/FooterCTA";

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer>
      <FooterCTA />

      <div className="text-center px-4 md:px-6 py-5 border-t border-(--line) font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
        <span>© {year} Carlo Alberto Falanga</span>
      </div>
    </footer>
  );
}
