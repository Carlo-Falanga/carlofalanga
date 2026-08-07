export default function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-y-12 py-12 md:py-22 section-px border-b border-(--line)"
    >
      <div className="hidden md:block md:col-start-1 md:col-span-2 font-mono uppercase font-light tracking-[0.08em] text-[11px] text-(--dim) pt-4">
        01 About
      </div>

      <h2 className="col-span-full md:col-start-3 md:col-span-10 min-w-0 font-display font-normal text-[36px] md:text-[72px] leading-[0.94] tracking-[-0.02em]">
        From <em>graphic design</em>
        <br />to web development.
      </h2>

      <div className="col-span-full md:col-start-3 md:col-span-5 flex flex-col gap-6">
        <p className="text-[16px] text-(--dim) leading-relaxed">
          I'm a Full-Stack Web Developer currently in full-time training at
          Boolean, where I'm building hands-on skills in developing complete
          web applications.
        </p>
        <p className="hidden md:block text-[16px] text-(--dim) leading-relaxed">
          I work daily with HTML, CSS, JavaScript and React on the frontend,
          Node.js and Express on the backend, and MySQL for database
          management. I'm currently following Boolean's PHP and Laravel
          specialization track.
        </p>
        <a href="#projects" className="btn_underline self-start pb-1">
          See my work →
        </a>
      </div>

      <div className="hidden md:block md:col-start-8 md:col-span-5 bg-(--soft) aspect-3/3">
        <img
          src="/images/portfolio-profile-pic.jpg"
          alt="Profile picture"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </section>
  );
}
