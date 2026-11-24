import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections.css';

// A line that "travels" left to right, with a heartbeat blip in the middle.
// Loops continuously (via CSS) while the divider is in view.
export default function HeartbeatDivider() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return; }
    // on while visible, off when it leaves, so it restarts from the left on each entry
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hb ${on ? 'in' : ''}`} aria-hidden="true">
      <span className="hb-line l" />
      <svg className="hb-beat" viewBox="0 0 220 44" width="220" height="44">
        <path pathLength="1" d="M0 22 H70 L80 22 L88 12 L96 22 L104 22 L112 34 L120 4 L132 40 L140 22 H150 L158 15 L166 22 H220" />
      </svg>
      <span className="hb-line r" />
    </div>
  );
}