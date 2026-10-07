import React, { useEffect, useRef } from 'react';

export default function BouncingName() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 80, y = 120;
    let vx = 1.2, vy = 0.8;
    let frameId;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elW = 320;
      const elH = 50;

      x += vx;
      y += vy;

      if (x <= 0 || x + elW >= w) vx = -vx;
      if (y <= 0 || y + elH >= h) vy = -vy;

      // Clamp inside bounds
      x = Math.max(0, Math.min(x, w - elW));
      y = Math.max(0, Math.min(y, h - elH));

      el.style.transform = `translate(${x}px, ${y}px)`;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '42px',
        fontWeight: 800,
        color: 'rgba(18, 38, 26, 0.04)',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.5px',
        userSelect: 'none',
        willChange: 'transform'
      }}
    >
      Fazal Rahman Manat
    </div>
  );
}
