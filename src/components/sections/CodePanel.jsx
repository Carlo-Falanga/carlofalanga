import { useEffect, useRef } from "react";

const lines = [
  [["// Middleware per la validazione", "comment"]],
  [["// dei dati in ingresso", "comment"]],
  [],
  [
    ["export function", "keyword"],
    [" "],
    ["validate", "function"],
    ["(", "punct"],
    ["schema", "param"],
    [") {", "punct"],
  ],
  [
    ["  "],
    ["return", "keyword"],
    [" ("],
    ["req", "param"],
    [", ", "punct"],
    ["res", "param"],
    [", ", "punct"],
    ["next", "param"],
    [") ", "punct"],
    ["=>", "operator"],
    [" {", "punct"],
  ],
  [["    "], ["try", "keyword"], [" {", "punct"]],
  [
    ["      req.body "],
    ["=", "operator"],
    [" schema."],
    ["parse", "function"],
    ["(", "punct"],
  ],
  [["        req.body"]],
  [["      );", "punct"]],
  [["      "], ["next", "function"], ["();", "punct"]],
  [
    ["    ", "punct"],
    ["} ", "punct"],
    ["catch", "keyword"],
    [" (", "punct"],
    ["err", "param"],
    [") {", "punct"],
  ],
  [
    ["      "],
    ["next", "function"],
    ["(", "punct"],
    ["err", "param"],
    [");", "punct"],
  ],
  [["    }", "punct"]],
  [["  };", "punct"]],
  [["}", "punct"]],
];

const tones = {
  comment: "text-(--code-comment) italic",
  keyword: "text-(--code-keyword)",
  function: "text-(--code-function) italic",
  param: "text-(--code-param) italic",
  operator: "text-(--code-operator)",
  punct: "text-(--code-punct)",
};

const LABEL = "validate.middleware.js";

const widest = lines.reduce((longest, segments) => {
  const length = segments.reduce((total, [text]) => total + text.length, 0);
  return Math.max(longest, length);
}, LABEL.length);

const PROBE_SIZE = 100;
const MAX_SIZE = 22;

export default function CodePanel() {
  const frameRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const pre = preRef.current;

    const probe = document.createElement("span");
    probe.textContent = "0".repeat(widest);
    probe.style.cssText =
      "position:absolute;left:-9999px;top:0;white-space:pre;visibility:hidden";
    probe.style.fontFamily = getComputedStyle(pre).fontFamily;
    probe.style.fontSize = PROBE_SIZE + "px";

    const fit = () => {
      document.body.appendChild(probe);
      const reference = probe.getBoundingClientRect().width;
      probe.remove();
      if (!reference) return;

      let size = Math.min(MAX_SIZE, (pre.clientWidth * PROBE_SIZE) / reference);
      frame.style.fontSize = size + "px";

      for (let pass = 0; pass < 3; pass++) {
        if (frame.scrollHeight <= frame.clientHeight) break;
        size *= (frame.clientHeight / frame.scrollHeight) * 0.99;
        frame.style.fontSize = size + "px";
      }
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(frame);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="t-code flex h-full w-full flex-col justify-center p-[3cqw] text-(--code-fg)"
    >
      <span className="mb-[1.4em] block text-(--code-comment)">{LABEL}</span>

      <pre ref={preRef} className="font-code">
        {lines.map((segments, line) => (
          <span key={line} className="block">
            {segments.map(([text, tone], index) => (
              <span key={index} className={tones[tone] || ""}>
                {text}
              </span>
            ))}
            {segments.length === 0 && " "}
          </span>
        ))}
      </pre>
    </div>
  );
}
