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

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSpread(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSpread(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
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