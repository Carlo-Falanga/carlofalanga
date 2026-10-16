import { useEffect, useRef } from "react";

const tones = {
  comment: "text-(--code-comment) italic",
  keyword: "text-(--code-keyword)",
  function: "text-(--code-function) italic",
  param: "text-(--code-param) italic",
  operator: "text-(--code-operator)",
  punct: "text-(--code-punct)",
  string: "text-(--code-string)",
  number: "text-(--code-number)",
};

function widestLine({ label, lines }) {
  return lines.reduce((longest, segments) => {
    const length = segments.reduce((total, [text]) => total + text.length, 0);
    return Math.max(longest, length);
  }, label.length);
}

const PROBE_SIZE = 100;
const MAX_SIZE = 22;

export default function CodePanel({ snippet }) {
  const frameRef = useRef(null);
  const labelRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const label = labelRef.current;
    const pre = preRef.current;

    const probe = document.createElement("span");
    probe.textContent = "0".repeat(widestLine(snippet));
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

      // measured against the content box, scrollHeight ignores the bottom padding
      const style = getComputedStyle(frame);
      const room =
        frame.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom);

      for (let pass = 0; pass < 3; pass++) {
        const used =
          pre.getBoundingClientRect().bottom -
          label.getBoundingClientRect().top;
        if (used <= room) break;
        size *= (room / used) * 0.99;
        frame.style.fontSize = size + "px";
      }
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [snippet]);

  return (
    <div
      ref={frameRef}
      className="t-code flex h-full w-full flex-col justify-center-safe p-[3cqw] text-(--code-fg)"
    >
      <span ref={labelRef} className="mb-[1.4em] block text-(--code-comment)">
        {snippet.label}
      </span>

      <pre ref={preRef} className="font-code">
        {snippet.lines.map((segments, line) => (
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
