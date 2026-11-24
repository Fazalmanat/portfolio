import React, { useLayoutEffect, useRef, useState } from 'react';
import { experienceItems } from '../data/experience';
import '../styles/extras.css';
import '../styles/sections.css';

const shortTitle = (t) => t.split(' — ')[0];

function Mini({ item, side, onGo }) {
  return (
    <div className={`xp-mini-wrap ${side}`}>
      <button type="button" className="xp-mini" disabled={!item} onClick={onGo}
        aria-label={item ? `Go to ${shortTitle(item.title)}` : side === 'prev' ? 'No earlier entry above' : 'No entry below'}>
        {item ? (<><span className="d">{item.date}</span><span className="t">{shortTitle(item.title)}</span></>) : <span className="d">{side === 'prev' ? 'start' : 'end'}</span>}
      </button>
    </div>
  );
}

export default function PistaExperience() {
  const scroller = useRef(null);
  const content = useRef(null);
  const cards = useRef([]);
  const [active, setActive] = useState(0);
  const [pad, setPad] = useState(120);
  const [line, setLine] = useState({ pts: [], w: 0, h: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      setPad(Math.round(scroller.current.clientHeight * 0.34));
      requestAnimationFrame(() => {
        const pts = cards.current.filter(Boolean).map((el, i) => ({
          x: i % 2 === 0 ? el.offsetLeft + el.offsetWidth : el.offsetLeft,
          y: el.offsetTop + el.offsetHeight / 2
        }));
        setLine({ pts, w: content.current.offsetWidth, h: content.current.scrollHeight });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scroller.current);
    return () => ro.disconnect();
  }, []);

  const onScroll = () => {
    const s = scroller.current, mid = s.scrollTop + s.clientHeight / 2;
    let best = 0, bd = Infinity;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const d = Math.abs(el.offsetTop + el.offsetHeight / 2 - mid);
      if (d < bd) { bd = d; best = i; }
    });
    setActive(best);
  };

  const go = (i) => {
    const el = cards.current[i], s = scroller.current;
    if (el) s.scrollTo({ top: el.offsetTop + el.offsetHeight / 2 - s.clientHeight / 2, behavior: 'smooth' });
  };

  return (
    <section id="experience" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple"><h2>Experience</h2></div>

        <div className="xp-stage">
          <Mini side="prev" item={experienceItems[active - 1]} onGo={() => go(active - 1)} />

          <div className="xp-window">
            <div className="xp-edge">
              <div className="xp-face">
                <div className="xp-scroll" ref={scroller} onScroll={onScroll} tabIndex={0} role="region" aria-label="Experience timeline (scrollable)">
                  <div className="xp-content" ref={content} style={{ paddingTop: pad, paddingBottom: pad }}>
                    <svg className="xp-line" width={line.w} height={line.h} aria-hidden="true">
                      <polyline points={line.pts.map((p) => `${p.x},${p.y}`).join(' ')} />
                      {line.pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={i === active ? 7 : 5} />)}
                    </svg>
                    {experienceItems.map((e, i) => (
                      <div key={e.title} className={`xp-row ${i % 2 ? 'right' : 'left'}`}>
                        <article ref={(el) => (cards.current[i] = el)} className={`xp-card ${i === active ? 'on' : ''}`}>
                          <div className="xp-meta"><span className="exp-tag">{e.tag || 'Milestone'}</span>{e.date && <span className="exp-date">{e.date}</span>}</div>
                          <h3 className="xp-title">{e.title}</h3>
                          <p className="xp-desc">{e.description}</p>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Mini side="next" item={experienceItems[active + 1]} onGo={() => go(active + 1)} />
        </div>
        <p className="xp-hint">scroll inside the hexagon ↕</p>
      </div>
    </section>
  );
}