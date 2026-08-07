import { LuArrowUpRight } from "react-icons/lu";

const contacts = [
  {
    label: "Email",
    value: "carlofalanga7@gmail.com",
    href: "mailto:carlofalanga7@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/carlo-alberto-falanga",
    href: "https://linkedin.com/in/carlo-alberto-falanga",
  },
  { label: "Phone", value: "+39 366 412 5407", href: "tel:+393664125407" },
  {
    label: "GitHub",
    value: "github.com/Carlo-Falanga",
    href: "https://github.com/Carlo-Falanga",
  },
  {
    label: "Fiverr",
    value: "fiverr.com/carlo_falanga",
    href: "https://it.fiverr.com/carlo_falanga",
  },
];

function ContactRow({ label, value, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-4 py-5 border-b border-(--line) transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-(--mustard)"
    >
      <span className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim) w-24 shrink-0">
        {label}
      </span>
      <span className="text-[16px] flex-1 min-w-0 wrap-break-word">{value}</span>
      <LuArrowUpRight
        size={16}
        className="shrink-0 text-(--dim) transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-(--mustard) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        <span className="text-(--mustard)">04</span> Contact
      </div>

      <h2 className="col-span-full md:col-start-3 md:col-span-10 font-display font-normal text-[36px] md:text-[72px] leading-[0.94] tracking-[-0.02em]">
        Get in <em>touch.</em>
      </h2>

      <div className="col-span-full md:col-span-6 border-t border-(--line)">
        {contacts.slice(0, 3).map((c) => (
          <ContactRow key={c.label} {...c} />
        ))}
      </div>

      <div className="col-span-full md:col-span-6 border-t border-(--line)">
        {contacts.slice(3).map((c) => (
          <ContactRow key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
