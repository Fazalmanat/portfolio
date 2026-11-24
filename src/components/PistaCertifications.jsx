import React from 'react';
import { certifications } from '../data/credentials';
import '../styles/extras.css';
import '../styles/sections.css';

export default function PistaCertifications() {
  return (
    <section id="certifications" style={{ padding: '28px 0 40px' }}>
      <div className="pista-container">
        <div className="section-header-simple compact"><h2>Certifications</h2></div>
        <ul className="cert-circles">
          {certifications.map((c) => {
            const inner = (
              <>
                <span className="cert-circle">{c.glyph}</span>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer">{c.issuer}</span>
              </>
            );
            const tip = [c.date, c.cert && `ID ${c.cert}`].filter(Boolean).join(' · ') || c.name;
            return (
              <li key={c.name}>
                {c.url
                  ? <a className="cert-item" title={tip} href={c.url} target="_blank" rel="noopener noreferrer">{inner}</a>
                  : <div className="cert-item" title={tip}>{inner}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}