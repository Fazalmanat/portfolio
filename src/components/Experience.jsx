import React from 'react';
import { experienceItems } from '../data/experience';

export default function Experience() {
  return (
    <section 
      id="experience" 
      data-achievement-icon="🕹️" 
      data-achievement-title="History Reviewed" 
      data-achievement-body="Experience timeline explored."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.04</span>
          <span className="rule"></span>
          <span className="label">Experience</span>
        </div>
        <h2 className="title">Where the work <em>happened</em>.</h2>
        <div className="timeline">
          {experienceItems.map((item, idx) => (
            <div key={idx} className="t-item">
              <div className="t-header">
                <span className="tag">{item.tag}</span>
                {item.date && (
                  <span className="t-date mono">{item.date}</span>
                )}
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              {item.cert && (
                <span className="t-cert mono">Cert #{item.cert}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
