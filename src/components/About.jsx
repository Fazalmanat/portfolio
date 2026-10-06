import React from 'react';

export default function About() {
  return (
    <section 
      id="about" 
      data-achievement-icon="📖" 
      data-achievement-title="Lore Unlocked" 
      data-achievement-body="You read the About section."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.01</span>
          <span className="rule"></span>
          <span className="label">About</span>
        </div>
        <h2 className="title">Not a biography — a <em>mindset</em>.</h2>
        <div className="about-grid">
          <div className="about-card sheet reveal in">
            <span className="tag">Identity</span>
            <h3>Who I Am</h3>
            <ul>
              <li>CS &amp; Design graduate</li>
              <li>I like solving problems others avoid</li>
              <li>Drawn to web development and interactive experiences</li>
            </ul>
          </div>
          <div className="about-card sheet reveal in">
            <span className="tag">Interests</span>
            <h3>What I Like</h3>
            <ul>
              <li>Building useful software</li>
              <li>Learning new technologies</li>
              <li>UI/UX</li>
              <li>Game development</li>
              <li>Backend systems</li>
            </ul>
          </div>
          <div className="about-card sheet reveal in">
            <span className="tag">Status</span>
            <h3>Currently</h3>
            <ul>
              <li>Learning modern full-stack development</li>
              <li>Sharpening data structures &amp; algorithms</li>
              <li>Exploring new frameworks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
