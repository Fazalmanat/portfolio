import React from 'react';
import { certifications } from '../data/miscData';

export default function Certifications() {
  return (
    <section 
      id="certifications" 
      data-achievement-icon="🏅" 
      data-achievement-title="Badges Collected" 
      data-achievement-body="Certifications viewed."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.05</span>
          <span className="rule"></span>
          <span className="label">Certifications</span>
        </div>
        <h2 className="title">Formal <em>credentials</em>.</h2>
        <div className="cert-grid">
          {certifications.map((c, idx) => (
            <a
              key={idx}
              className="cert-card"
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${c.name} — ${c.issuer}`}
            >
              <div className="glyph" style={{ color: c.color }}>{c.glyph}</div>
              <div className="cert-info">
                <div className="name">{c.name}</div>
                <div className="cert-issuer mono">{c.issuer}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
