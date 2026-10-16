export const GLOW_PASS = ".glow-copy:not(.glow-keep)";
export const GLOW_KEEP = ".glow-keep";
export const GLOW_KEEP_BASE = ".glow-keep-base";
export const GLOW_LETTER = ".glow-letter";

export default function GlowText({ text, keep = false }) {
  return Array.from(text).map((char, index) => (
    <span key={`${char}-${index}`} className="glow-letter relative inline-block">
      <span className={keep ? "glow-keep-base" : undefined}>{char}</span>
      <span
        aria-hidden="true"
        className={
          "glow-copy absolute inset-0 text-(--mustard) opacity-0" +
          (keep ? " glow-keep" : "")
        }
      >
        {char}
      </span>
    </span>
  ));
}
