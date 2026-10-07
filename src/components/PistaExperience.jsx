import React from 'react';
import { experienceItems } from '../data/experience';

export default function PistaExperience() {
  return (
    <section id="experience" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple">
          <h2>Experience</h2>
        </div>

        <div className="zigzag-experience-container">
          {/* SVG zigzag line that only spans the card area */}
          <svg
            className="zigzag-svg-line"
            viewBox={`0 0 900 ${experienceItems.length * 200}`}
            preserveAspectRatio="none"
          >
            <path
              d={experienceItems.map((_, idx) => {
                const y = idx * 200 + 70;
                const isLeft = idx % 2 === 0;
                const x = isLeft ? 220 : 680;
                const nextIdx = idx + 1;
                if (nextIdx >= experienceItems.length) return '';
                const ny = nextIdx * 200 + 70;
                const nx = nextIdx % 2 === 0 ? 220 : 680;
                return `M ${x} ${y} L ${nx} ${ny}`;
              }).join(' ')}
              fill="none"
              stroke="#96C4A0"
              strokeWidth="2.5"
              strokeDasharray="8 5"
            />
          </svg>

          {experienceItems.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`zigzag-item-row ${isLeft ? 'left' : 'right'}`}
              >
                <div className="zigzag-exp-card">
                  <div className="exp-tag-date">
                    <span className="exp-tag">{exp.tag || 'Milestone'}</span>
                    <span className="exp-date">{exp.date}</span>
                  </div>
                  <h3 className="exp-title">{exp.title}</h3>
                  <p className="exp-desc">{exp.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
