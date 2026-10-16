// one span per letter, so GSAP can drive each letter's width and weight; screen readers read the hidden copy
export default function Chars({ text, className = "", readable = true }) {
  return (
    <span className={className}>
      {readable && <span className="sr-only">{text}</span>}
      {[...text].map((c, i) => (
        <span className="ch" key={i} aria-hidden="true">
          {c}
        </span>
      ))}
    </span>
  );
}
