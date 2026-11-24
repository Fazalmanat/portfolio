import React, { useEffect, useRef, useState } from 'react';
import { achievements } from '../data/credentials';
import '../styles/extras.css';
import '../styles/sections.css';

const N = achievements.length;
const STEP = 360 / N;
const RADIUS = 210;
const WHEEL_SPEED = 0.12; // degrees per wheel pixel (lower = slower)
const TOUCH_SPEED = 0.3;  // degrees per horizontal swipe pixel

export default function PistaAchievements() {
  const stage = useRef(null);
  const touchX = useRef(null);
  const [angle, setAngle] = useState(0);

  // Scrolling while the pointer is over the ring rotates it and does NOT scroll the page.
  // Needs a non-passive native listener so preventDefault() works.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      setAngle((a) => a + d * WHEEL_SPEED);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Touch: horizontal swipe rotates the ring, vertical swipe still scrolls the page.
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchMove = (e) => {
    if (touchX.current == null) return;
    const x = e.touches[0].clientX;
    setAngle((a) => a - (x - touchX.current) * TOUCH_SPEED);
    touchX.current = x;
  };
  const onTouchEnd = () => { touchX.current = null; };

  const sel = ((Math.round(-angle / STEP) % N) + N) % N;
  const a = achievements[sel];

  // Rotate the shortest way so coin i ends up at the front.
  const spinTo = (i) => {
    const k = Math.round((angle + i * STEP) / 360);
    setAngle(-i * STEP + 360 * k);
  };

  return (
    <section id="achievements" style={{ padding: '28px 0 36px' }}>
      <div className="pista-container">
        <div className="section-header-simple compact">
          <h2>Achievements</h2>
        </div>

        <div className="holo" aria-live="polite">
          <div className="holo-panel" key={a.id}>
            <span className="holo-tag">{a.tag}</span>
            <strong>{a.short}</strong>
            <span className="holo-sub">{a.sub}</span>
          </div>
          <div className="holo-beam" aria-hidden="true" />
        </div>

        <div
          className="ring-stage"
          ref={stage}
          style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div
            className="ring"
            style={{ transform: `translateZ(${-RADIUS}px) rotateY(${angle}deg)` }}
          >
            {achievements.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`ring-coin ${c.metal} ${i === sel ? 'on' : ''}`}
                style={{
                  transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                }}
                onClick={() => spinTo(i)}
                aria-label={`${c.coin}: ${c.short}`}
              >
                <span className="coin-face front">{c.coin}</span>
                <span className="coin-face back" />
              </button>
            ))}
          </div>
        </div>

        <p className="xp-hint">
          scroll over the ring to rotate it · click a coin to bring it forward
        </p>
      </div>
    </section>
  );
}