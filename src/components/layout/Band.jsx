import { memo, useEffect, useRef, useState } from "react";
import { bandCells, GITHUB, LINKEDIN } from "../content";

const isTouch = () => window.matchMedia("(hover: none)").matches;

function Band() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [content, setContent] = useState({ index: 0, big: "" });
  const [detailIndex, setDetailIndex] = useState(0);
  const [detailOut, setDetailOut] = useState(false);
  const [barStyle, setBarStyle] = useState({});
  const bandRef = useRef(null);
  const drawerRef = useRef(null);
  const cellRefs = useRef([]);
  const closeTimer = useRef(null);
  const detailTimer = useRef(null);
  const openedAt = useRef(0);

  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(detailTimer.current);
    };
  }, []);

  function openDrawer(i) {
    clearTimeout(closeTimer.current);
    const cell = cellRefs.current[i].getBoundingClientRect();
    setBarStyle({ transform: `translateX(${cell.left}px) scaleX(${cell.width / 100})` });
    if (openIndex === -1) openedAt.current = window.scrollY;
    setOpenIndex(i);
    if (i === openIndex) return;
    setContent({ index: i, big: bandCells[i].big() });
    setDetailOut(true);
    clearTimeout(detailTimer.current);
    detailTimer.current = setTimeout(() => {
      setDetailIndex(i);
      setDetailOut(false);
    }, 180);
  }

  function closeDrawer() {
    clearTimeout(closeTimer.current);
    setOpenIndex(-1);
  }

  function closeSoon() {
    if (isTouch()) return;
    closeTimer.current = setTimeout(closeDrawer, 160);
  }

  // keyboard: focus opens the drawer, leaving both the band and the drawer closes it
  function onBlur(e) {
    const next = e.relatedTarget;
    if (next && (bandRef.current.contains(next) || drawerRef.current.contains(next))) return;
    closeDrawer();
  }

  function onKeyDown(e) {
    if (e.key !== "Escape") return;
    // focus goes back to the cell, otherwise it stays on a link that is about to be hidden
    if (drawerRef.current.contains(document.activeElement)) cellRefs.current[openIndex].focus();
    closeDrawer();
  }

  function onCellClick(e, i) {
    if (!isTouch()) return;
    e.preventDefault();
    if (openIndex === i) closeDrawer();
    else openDrawer(i);
  }

  // on phones a tap outside or a real scroll closes the drawer
  useEffect(() => {
    if (openIndex === -1) return;
    const onPointerDown = (e) => {
      if (!bandRef.current.contains(e.target) && !drawerRef.current.contains(e.target)) closeDrawer();
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt.current) > 60) closeDrawer();
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [openIndex]);

  const open = openIndex !== -1;
  const cell = bandCells[content.index];
  const detail = bandCells[detailIndex];

  return (
    <>
      <header
        ref={bandRef}
        className={`band${open ? " open" : ""}`}
        onMouseLeave={closeSoon}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <span className="bar" style={barStyle} />
        {bandCells.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => (cellRefs.current[i] = el)}
            className="cell"
            tabIndex={0}
            aria-expanded={openIndex === i}
            onMouseEnter={() => !isTouch() && openDrawer(i)}
            onFocus={() => !isTouch() && openDrawer(i)}
            onClick={(e) => onCellClick(e, i)}
          >
            <span className="k">{c.label}</span>
            <span className="v">
              {c.href ? (
                <a href={c.href} tabIndex={-1}>
                  <span style={{ animationDelay: `${300 + i * 80}ms` }}>{c.value}</span>
                  <span aria-hidden="true">{c.hover}</span>
                </a>
              ) : (
                <>
                  <span style={{ animationDelay: `${300 + i * 80}ms` }}>{c.value}</span>
                  <span aria-hidden="true">{c.hover}</span>
                </>
              )}
            </span>
          </div>
        ))}
      </header>

      <div
        ref={drawerRef}
        className={`drawer${open ? " open" : ""}`}
        aria-hidden={!open}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={closeSoon}
      >
        <div className="in">
          <p className="big">
            <span className="rise" key={`${content.index}-${content.big}`}>
              {cell.href ? <a href={cell.href}>{content.big}</a> : content.big}
            </span>
          </p>
          <p className={`detail${detailOut ? " out" : ""}`}>
            {detail.links ? (
              <>
                <a href={GITHUB}>GitHub</a>
                <a href={LINKEDIN}>LinkedIn</a>
              </>
            ) : (
              detail.detail
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default memo(Band);
