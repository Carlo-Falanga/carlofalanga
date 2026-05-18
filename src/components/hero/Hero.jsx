import HeroTable from "./HeroTable";

export default function Hero() {
  return (
    <section className="grid grid-cols-12 gap-x-6 gap-y-12 py-22">
      <div className="col-start-1 col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)] pt-4">
        00 Index
      </div>
      <h1 className="col-start-3 col-span-10 font-display text-[124px] leading-[0.94]">
        Junior
        <br />
        <em className="block font-italic">web developer</em>
      </h1>

      <div className="col-start-1 col-span-4">
        <HeroTable />
      </div>
      <p className="col-start-6 col-span-6">
        Costruisco applicazioni web full-stack con React, Node ed Express.
        Interfacce <em className="font-italic">responsive</em>, codice
        strutturato, dettagli curati - un background da graphic designer che si
        vede solo dove serve.
      </p>
      <div className="col-start-6 col-span-6 flex gap-6">
        <a href="#selectedwork" className="btn_underline pb-1">View selected work →</a>
        <a href="" className="btn_underline pb-1">Download CV ↓</a>
        <a href="#getintouch" className="btn_underline pb-1">Get in touch →</a>
      </div>
    </section>
  );
}
