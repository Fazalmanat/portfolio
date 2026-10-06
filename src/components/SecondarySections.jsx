import React from 'react';
import { learningTopics } from '../data/miscData';

export function Learning() {
  return (
    <section 
      id="learning" 
      data-achievement-icon="🌱" 
      data-achievement-title="Skill Tree" 
      data-achievement-body="Learning goals revealed."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.07</span>
          <span className="rule"></span>
          <span className="label">What I'm Learning</span>
        </div>
        <h2 className="title">Still in <em>progress</em>.</h2>
        <div className="learn-row">
          {learningTopics.map((topic, idx) => (
            <span key={idx} className="learn-chip">{topic}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="philosophy">
      <div className="wrap">
        <span className="mark">“</span>
        <blockquote style={{ margin: '0 auto' }}>
          I enjoy creating software that is both functional and intuitive — building applications that solve real problems while continuously learning better ways to design, develop, and improve.
        </blockquote>
      </div>
    </section>
  );
}

export function Resume() {
  return (
    <section 
      id="resume" 
      data-achievement-icon="💾" 
      data-achievement-title="Save File Located" 
      data-achievement-body="Resume section reached."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.08</span>
          <span className="rule"></span>
          <span className="label">Resume</span>
        </div>
        <div className="sheet resume-box">
          <div className="resume-highlights">
            <div>
              <span className="tag">Education</span>
              <p>CS &amp; Design</p>
            </div>
            <div>
              <span className="tag">Skills</span>
              <p>Full-stack + Unity</p>
            </div>
            <div>
              <span className="tag">Experience</span>
              <p>Projects &amp; hackathons</p>
            </div>
          </div>
          <a href="#" className="btn btn-primary">Download Resume ↓</a>
        </div>
      </div>
    </section>
  );
}
