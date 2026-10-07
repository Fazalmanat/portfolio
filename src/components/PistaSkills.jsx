import React from 'react';
import { skillCategories } from '../data/skills';

export default function PistaSkills() {
  return (
    <section id="skills" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple">
          <h2>Skills</h2>
        </div>

        {/* Semiconductor Circuit Board Layout */}
        <div className="circuit-board">
          {/* Central vertical bus trace */}
          <div className="circuit-bus" />

          {skillCategories.map((cat, idx) => (
            <div key={idx} className="circuit-row">
              {/* Node dot on the bus */}
              <div className="circuit-node-dot" />

              {/* Horizontal trace line leading to chip */}
              <div className="circuit-trace" />

              {/* IC Chip = skill group */}
              <div className="circuit-chip">
                <div className="chip-pin-left" />
                <div className="chip-body">
                  <div className="chip-label">{cat.category}</div>
                  <div className="chip-pins-row">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="chip-pin-skill">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="chip-pin-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
