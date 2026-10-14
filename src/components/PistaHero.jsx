import React, { useState } from 'react';
import '../styles/extras.css';

const BOOT = ['> waking up…', '> loading projects… ok', '> lights on'];
const STEP = 380;

export default function PistaHero({ onAwake = () => {} }) {
  const [phase, setPhase] = useState('dim'); // dim -> booting -> awake
  const [lines, setLines] = useState(0);
  const [pull, setPull] = useState(0);
  const [startY, setStartY] = useState(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const wake = () => {
    if (phase !== 'dim') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('awake'); onAwake(); return;
    }
    setPhase('booting');
    BOOT.forEach((_, i) => setTimeout(() => setLines(i + 1), STEP * (i + 1)));
    setTimeout(() => { setPhase('awake'); onAwake(); }, STEP * BOOT.length + 500);
  };

  const onDown = (e) => { e.currentTarget.setPointerCapture(e.pointerId); setStartY(e.clientY); };
  const onMove = (e) => startY !== null && setPull(Math.max(0, Math.min(70, e.clientY - startY)));
  const onUp = () => { const d = pull; setStartY(null); setPull(0); if (d > 30) wake(); };

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

      <div className={`boot-layer ${phase}`} aria-hidden={phase === 'awake'}>
        <p className="boot-name">Hi, I'm Fazal Rahman Manat</p>
        {phase !== 'dim' && (
          <div className="boot-lines" aria-live="polite">
            {BOOT.slice(0, lines).map((l) => <div key={l}>{l}</div>)}
          </div>
        )}
        {phase !== 'awake' && (
          <div className="cord" style={{ height: 450 + pull }}>
            <span className="cord-line" />
            {phase === 'dim' && <span className="cord-hint">pull to wake</span>}
            <button type="button" className="cord-bead" aria-label="Pull the cord to turn the page on"
              onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onClick={wake} />
          </div>
        )}
      </div>
    </section>
  );
}