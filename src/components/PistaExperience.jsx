import React, { useRef, useState, useLayoutEffect } from 'react';
import { experienceItems } from '../data/experience';

export default function PistaExperience() {
  const box = useRef(null);
  const cards = useRef([]);
  const [line, setLine] = useState({ d: '', w: 0, h: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const b = box.current.getBoundingClientRect();
      const pts = cards.current.filter(Boolean).map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left - b.left + r.width / 2, top: r.top - b.top, bottom: r.bottom - b.top };
      });
      const d = pts.slice(1).map((p, i) => `M ${pts[i].x} ${pts[i].bottom} L ${p.x} ${p.top}`).join(' ');
      setLine({ d, w: b.width, h: b.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="experience" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple"><h2>Experience</h2></div>
        <div className="zigzag-experience-container" ref={box}>
          <svg className="zigzag-svg-line" viewBox={`0 0 ${line.w} ${line.h}`} aria-hidden="true">
            <path d={line.d} fill="none" stroke="#96C4A0" strokeWidth="2.5" strokeDasharray="8 5" />
          </svg>
          {experienceItems.map((exp, i) => (
            <div key={exp.title} className={`zigzag-item-row ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="zigzag-exp-card" ref={(el) => (cards.current[i] = el)}>
                <div className="exp-tag-date">
                  <span className="exp-tag">{exp.tag || 'Milestone'}</span>
                  {exp.date && <span className="exp-date">{exp.date}</span>}
                </div>
                <h3 className="exp-title">{exp.title}</h3>
                <p className="exp-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}