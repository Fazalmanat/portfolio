import React, { useEffect, useRef, useState } from 'react';
import '../styles/extras.css';

const SHADES = ['#0e2015', '#12291c', '#173222'];

// Hexagonal wall: pointy-top hexagon tiles that cover the whole viewport.
function build(w, h) {
  const R = w < 640 ? 44 : 60, W = Math.sqrt(3) * R, RH = 1.5 * R;
  const cols = Math.ceil(w / W) + 2, rows = Math.ceil(h / RH) + 2, tiles = [];
  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const x = c * W + (r % 2 ? W / 2 : 0), y = r * RH;
      tiles.push({ x, y, cx: x + W / 2, cy: y + R, shade: Math.floor(Math.random() * 3),
        rot: Math.random() * 80 - 40, dx: Math.random() * 120 - 60, dy: 380 + Math.random() * 420, j: Math.random() });
    }
  }
  return { tiles, W, H: 2 * R };
}

export default function PistaHero({ onAwake = () => {} }) {
  const [phase, setPhase] = useState('dim'); // dim -> breaking -> awake
  const [wall, setWall] = useState(() => build(window.innerWidth, window.innerHeight));
  const [origin, setOrigin] = useState(null);
  const woke = useRef(false);
  const wallRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const breakWall = (x, y) => {
    if (woke.current) return;
    woke.current = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPhase('awake'); onAwake(); return; }
    setOrigin({ x, y });
    setPhase('breaking');
    setTimeout(() => { setPhase('awake'); onAwake(); }, 1900);
  };

  useEffect(() => {
    wallRef.current?.focus();
    const onKey = (e) => { if (!['Tab', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) breakWall(window.innerWidth / 2, window.innerHeight / 2); };
    const onResize = () => setWall(build(window.innerWidth, window.innerHeight));
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, []);

  const delay = (t) => {
    const W = window.innerWidth, H = window.innerHeight;
    const maxD = Math.hypot(Math.max(origin.x, W - origin.x), Math.max(origin.y, H - origin.y)) || 1;
    return (Math.hypot(t.cx - origin.x, t.cy - origin.y) / maxD) * 650 + t.j * 220;
  };

  return (
    <section className={`hero-clean-section ${phase === 'awake' ? 'awake' : ''}`} id="home">
      <div className="pista-container">
        <h1 className="hero-full-name">Hi, I'm Fazal Rahman Manat</h1>
        <div className="hero-role-title">Full-Stack Software Developer · Unity VR &amp; AI Engineer</div>
        <p className="hero-bio-lede">
          Building high-performance web applications, VR emergency simulations, and AI automation tools with clean architecture and intuitive user experiences.
        </p>
        <div className="hero-cta-group">
          <button className="btn-pista-primary" onClick={() => scrollTo('projects')}>View Projects</button>
          <button className="btn-pista-outline" onClick={() => scrollTo('skills')}>Skills &amp; Tech Stack</button>
          <button className="btn-pista-outline" onClick={() => scrollTo('contact')}>Contact Me</button>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll ↓</div>

      {phase !== 'awake' && (
        <div ref={wallRef} className={`wall ${phase}`} role="button" tabIndex={0}
          aria-label="Break through the wall to enter the portfolio"
          onPointerDown={(e) => breakWall(e.clientX, e.clientY)}>
          {wall.tiles.map((t, i) => (
            <span key={i} className={`wall-tile ${phase === 'breaking' ? 'fall' : ''}`}
              style={{ left: t.x, top: t.y, width: wall.W, height: wall.H, background: SHADES[t.shade],
                '--rot': `${t.rot}deg`, '--dx': `${t.dx}px`, '--dy': `${t.dy}px`,
                animationDelay: origin ? `${delay(t)}ms` : undefined }} />
          ))}
          <div className="wall-text">
            <p className="wall-name">Hi, I'm Fazal Rahman Manat</p>
            <p className="wall-hint">tap anywhere to break through</p>
          </div>
        </div>
      )}
    </section>
  );
}