import React, { useEffect, useRef } from 'react';
import '../styles/extras.css';

// Faint honeycomb grid fixed behind the page; the lines brighten near the cursor.
export default function HoneycombBackground() {
  const glow = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduce) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = glow.current;
        if (!el) return;
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
        el.style.opacity = 1;
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="honey-bg" aria-hidden="true">
      <div className="honey-lines" />
      <div className="honey-glow" ref={glow} />
    </div>
  );
}