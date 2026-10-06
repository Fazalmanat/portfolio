import React from 'react';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <section 
      id="skills" 
      data-achievement-icon="🎒" 
      data-achievement-title="Inventory Checked" 
      data-achievement-body="Skills page inspected."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.02</span>
          <span className="rule"></span>
          <span className="label">Skills</span>
        </div>
        <h2 className="title">The <em>stack</em> behind the work.</h2>
        <div className="skills-grid">
          {skillCategories.map((item, idx) => (
            <div key={idx} className="skill-card reveal in">
              <span className="tag">{item.category}</span>
              <div className="chip-row">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
