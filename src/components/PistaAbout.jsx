import React, { useEffect, useRef, useState } from 'react';
import '../styles/extras.css';

const cards = [
  { title: 'Who I Am', items: ['CS & Design Graduate', 'Full-stack & interactive experiences', 'Clean logic, maintainable code'] },
  { title: 'What I Build', items: ['Web Apps (React, Node, Flask)', 'VR Simulations (Unity, C#)', 'AI Voice Automation'] },
  { title: 'Learning Now', items: ['Advanced Python & DSA', 'Docker & Cloud CI/CD', 'System Design'] }
];

export default function PistaAbout() {
  const ref = useRef(null);
  const [spread, setSpread] = useState(false);

  // Spread shortly after the deck is mostly on screen, or immediately if it was scrolled past.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSpread(true); return; }
    let timer;
    const go = (ms) => { if (!timer) timer = setTimeout(() => setSpread(true), ms); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) go(400); }, { threshold: 0.3 });
    io.observe(el);
    const onScroll = () => { if (el.getBoundingClientRect().bottom < 0) go(0); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section id="about" style={{ padding: '80px 0 40px' }}>
      <div className="pista-container">
        <h2 className="sr-only">About me</h2>
        <div ref={ref} className={`about-deck ${spread ? 'spread' : ''}`}>
          {cards.map((c, i) => (
            <article key={c.title} className="about-card-play" style={{ '--i': i }}>
              <h3>{c.title}</h3>
              <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}