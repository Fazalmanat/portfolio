import React from 'react';
import { education } from '../data/education';
import '../styles/extras.css';
import '../styles/sections.css';

export default function PistaEducation() {
  return (
    <section id="education" style={{ padding: '28px 0 40px' }}>
      <div className="pista-container">
        <div className="section-header-simple compact"><h2>Education</h2></div>
        <ol className="edu-list">
          {education.map((e) => (
            <li className="edu-item" key={`${e.institution}-${e.degree}`}>
              <span className="edu-badge" aria-hidden="true"><span>{e.glyph}</span></span>
              <div className="edu-card">
                <div className="edu-meta">
                  <span className="edu-period">{e.period}</span>
                  {e.grade && <span className="edu-grade">{e.grade}</span>}
                </div>
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.institution}</p>
                {e.details && <p className="edu-desc">{e.details}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}