import React from 'react';
import DynamicSchematic from './DynamicSchematic';

export default function Hero() {
  const handlePressStart = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="wrap hero-inner">
        <div>
          <div className="hero-coord mono">SHEET 00 / INDEX — SOFTWARE ENGINEERING &amp; DESIGN</div>
          <h1>
            Hi, I'm<br />
            <em>Fazal Rahman Manat</em>
          </h1>
          <div className="role">Software Developer — Full-Stack · Unity Enthusiast</div>
          <p className="lede">
            I build applications that combine logic, creativity, and great user experiences.
          </p>
          <div className="cta-row">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#resume" className="btn btn-ghost">Resume</a>
            <a href="#contact" className="btn btn-ghost">Contact</a>
          </div>
          <button className="press-start" onClick={handlePressStart}>
            <span className="blink">▶</span> PRESS START TO SCROLL
          </button>
        </div>

        <DynamicSchematic />
      </div>
    </section>
  );
}
