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
      className="flex items-center gap-4 py-5 border-b border-(--line)"
    >
      <span className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim) w-24 shrink-0">
        {label}
      </span>
      <span className="text-[16px] flex-1 min-w-0 wrap-break-word">{value}</span>
      <LuArrowUpRight size={16} className="shrink-0 text-(--dim)" />
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="getintouch"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 px-4 md:px-6 border-b border-(--line)"
    >
      {/* Label */}
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        04 Contact
      </div>

      {/* Title */}
      <h2 className="col-span-full md:col-start-3 md:col-span-10 font-display text-[32px] md:text-[60px] leading-[0.94]">
        Get in <em>touch.</em>
      </h2>

      {/* Left column */}
      <div className="col-span-full md:col-span-6 border-t border-(--line)">
        {contacts.slice(0, 3).map((c) => (
          <ContactRow key={c.label} {...c} />
        ))}
      </div>

      {/* Right column */}
      <div className="col-span-full md:col-span-6 border-t border-(--line)">
        {contacts.slice(3).map((c) => (
          <ContactRow key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
