import { useEffect, useRef } from "react";
import { allItems } from "./stacks";

function Pill({ Icon, name }) {
  return (
    <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-(--cream) px-5 whitespace-nowrap text-(--ink) tablet:h-[6.2vw] tablet:gap-[1.2vw] tablet:px-[3.2vw] laptop:h-[3.1vw] laptop:gap-[0.6vw] laptop:px-[1.6vw]">
      <Icon className="h-3.5 w-3.5 tablet:h-[2.2vw] tablet:w-[2.2vw] laptop:h-[1.1vw] laptop:w-[1.1vw]" />
      <span className="t-tag font-body">{name}</span>
    </span>
  );
}

export default function StackMarquee({ items = allItems, speed = 34 }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    // off screen it would still run on the compositor, so it starts paused
    const watcher = new IntersectionObserver(([entry]) => {
      wrapper.classList.toggle("is-paused", !entry.isIntersecting);
    });
    watcher.observe(wrapper);

    return () => watcher.disconnect();
  }, []);

  const repeats = items.length < 8 ? 4 : 2;
  const doubled = Array.from({ length: repeats }, () => items).flat();

  return (
    <div
      ref={wrapperRef}
      className="is-paused w-full overflow-hidden py-10 tablet:py-[7vw] laptop:py-[3.5vw]"
    >
      <div
        className="marquee-track flex w-max items-center gap-3 tablet:gap-[2.5vw] laptop:gap-[1.25vw]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, idx) => (
          <Pill key={`${item.name}-${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}
