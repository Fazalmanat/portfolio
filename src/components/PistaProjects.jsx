import React, { useState, useEffect, useRef } from 'react';
import { featuredProjects, sideQuests } from '../data/projects';
import '../styles/extras.css';

// Hexagons are placed edge-to-edge (facing sides parallel, constant gap), mixed sizes.
const R_B = 150, R_S = 90, GAP = 10;
const apo = (R) => (R * Math.sqrt(3)) / 2;
const dist = (a, b) => apo(a) + apo(b) + GAP;
const step = (c, k, d) => ({ x: c.x + d * Math.cos((k * Math.PI) / 3), y: c.y + d * Math.sin((k * Math.PI) / 3) });

function buildLayout(big, small) {
  const d = dist(R_B, R_S);
  const f0 = { x: 0, y: 0 };
  const s0 = step(f0, 0, d);
  const f1 = step(s0, 1, d);
  const s1 = step(f1, 5, d);
  const s2 = step(f0, 2, d);
  const s3 = step(f0, 1, d);
  const slots = [[big[0], R_B, f0], [small[0], R_S, s0], [big[1], R_B, f1], [small[1], R_S, s1], [small[2], R_S, s2], [small[3], R_S, s3]].filter(([p]) => p);
  const minX = Math.min(...slots.map(([, R, c]) => c.x - apo(R)));
  const maxX = Math.max(...slots.map(([, R, c]) => c.x + apo(R)));
  const minY = Math.min(...slots.map(([, R, c]) => c.y - R));
  const maxY = Math.max(...slots.map(([, R, c]) => c.y + R));
  return {
    w: maxX - minX, h: maxY - minY,
    items: slots.map(([p, R, c]) => ({ p, big: R === R_B, left: c.x - apo(R) - minX, top: c.y - R - minY, w: 2 * apo(R), h: 2 * R }))
  };
}

export default function PistaProjects() {
  const [active, setActive] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeBtn = useRef(null);
  const opener = useRef(null);

  const layout = buildLayout(featuredProjects, sideQuests);
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    const fit = () => setScale(Math.min(1, el.clientWidth / layout.w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout.w]);

  const open = (p, e) => { opener.current = e.currentTarget; setClosing(false); setActive(p); };
  const close = () => {
    setClosing(true);
    setTimeout(() => { setActive(null); setClosing(false); opener.current?.focus(); }, 250);
  };

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active]);

  const state = closing ? 'closing' : 'opening';
  const links = active ? [
    ['Live demo', active.links.demo], ['GitHub', active.links.github], ['Read more', active.links.more]
  ].filter(([, url]) => url) : [];

  return (
    <section id="projects" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple"><h2>Projects</h2></div>
        <div className="hex-field-wrap" ref={wrapRef} style={{ height: layout.h * scale }}>
          <div className="hex-field" style={{ width: layout.w, height: layout.h, transform: `scale(${scale})`, left: `calc(50% - ${(layout.w * scale) / 2}px)` }}>
            {layout.items.map(({ p, big, left, top, w, h }) => (
              <div className="hex-wrap" key={p.id} style={{ left, top, width: w, height: h }}>
                <button
                  type="button"
                  className={`hex-cell ${big ? 'big-cell' : ''} ${p.media?.src && p.media.type !== 'video' ? 'has-media' : ''}`}
                  style={p.media?.src ? { '--hex-img': `url(${p.media.src})` } : undefined}
                  onClick={(e) => open(p, e)}
                >
                  <h3>{p.title}</h3>
                  {p.description && <p>{p.description}</p>}
                  <span className="hex-view">View details</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {active && (
          <div className={`project-modal-backdrop ${state}`} onClick={close}>
            <div className={`project-modal-card ${state}`} role="dialog" aria-modal="true"
              aria-labelledby="proj-title" onClick={(e) => e.stopPropagation()}>
              <button ref={closeBtn} className="project-modal-close" onClick={close} aria-label="Close">✕</button>
              <h3 id="proj-title" className="project-modal-title">{active.title}</h3>

              {active.media?.src ? (
                active.media.type === 'video'
                  ? <video className="modal-media" src={active.media.src} controls playsInline />
                  : <img className="modal-media" src={active.media.src} alt={active.media.alt} />
              ) : (
                <div className="modal-media placeholder">Screenshot or video coming soon</div>
              )}

              <p className="project-modal-desc">{active.description || 'Description coming soon.'}</p>
              {active.tags?.length > 0 && (
                <div className="modal-tags">{active.tags.map((t) => <span key={t} className="skill-chip-plain">{t}</span>)}</div>
              )}
              <div className="modal-actions">
                {links.length === 0 && <span className="modal-muted">Links coming soon</span>}
                {links.map(([label, url], i) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className={i === 0 ? 'btn-pista-primary' : 'btn-pista-outline'}>{label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}