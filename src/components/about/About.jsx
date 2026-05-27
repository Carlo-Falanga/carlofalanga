export default function About() {
  return (
    <section id="about" className="grid grid-cols-12 gap-x-6 gap-y-12 py-22">
      <div className="col-start-1 col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        01 About
      </div>

      <h2 className="col-start-3 col-span-10 font-display text-[80px] leading-[0.94]">
        Da <em className="font-italic">graphic design</em>
        <br />a web development.
      </h2>

      {/* Testo + link */}
      <div className="col-start-3 col-span-5 flex flex-col gap-6">
        <p className="text-[16px] text-(--dim) leading-relaxed">
          Sono un Full-Stack Web Developer attualmente in formazione full-time presso Boolean, dove sto sviluppando competenze pratiche nella realizzazione di applicazioni web complete.
        </p>
        <p className="text-[16px] text-(--dim) leading-relaxed">
          Lavoro quotidianamente con HTML, CSS, JavaScript e React per il frontend, Node.js e Express per il backend e gestione di database con MySQL.
        </p>
        <p className="text-[16px] text-(--dim) leading-relaxed">
         Mi occupo di sviluppo di interfacce responsive, gestione dello stato e integrazione di API REST, con un approccio orientato alla costruzione di applicazioni funzionali e ben strutturate.
        </p>
        <a href="#work" className="btn_underline self-start pb-1">
          View my work →
        </a>
      </div>

      <div className="col-start-8 col-span-5 bg-(--soft) aspect-3/3 rounded overflow-hidden">
        <img
          src="/images/portfolio-profile-pic.jpg"
          alt="Profile picture"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </section>
  );
}
