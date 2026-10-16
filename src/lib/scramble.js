const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const KEEP = " ,.";

// letters shuffle and settle from the left; the delay (in frames) staggers several lines
export function scramble(el, delay = 0) {
  const target = el.dataset.text || (el.dataset.text = el.textContent);
  const run = Number(el.dataset.run || 0) + 1;
  el.dataset.run = run;
  let frame = -delay;

  const tick = () => {
    if (Number(el.dataset.run) !== run) return;
    frame++;
    const settled = Math.max(0, Math.floor(frame / 2));
    el.textContent = [...target]
      .map((c, i) => (KEEP.includes(c) || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join("");
    if (settled <= target.length) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  tick();
}
