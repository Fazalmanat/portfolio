import React from 'react';

export default function PistaHero() {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-clean-section" id="home">
      <div className="pista-container">
        {/* FULL NAME IS ON A SINGLE STRAIGHT LINE (CENTERED) */}
        <h1 className="hero-full-name">
          Hi, I'm Fazal Rahman Manat
        </h1>

        <div className="hero-role-title">
          Full-Stack Software Developer · Unity VR &amp; AI Engineer
        </div>

        <p className="hero-bio-lede">
          Building high-performance web applications, VR emergency simulations, and AI automation tools with clean architecture and intuitive user experiences.
        </p>

        <div className="hero-cta-group">
          <button className="btn-pista-primary" onClick={() => handleScroll('projects')}>
            View Projects
          </button>
          <button className="btn-pista-outline" onClick={() => handleScroll('skills')}>
            Skills &amp; Tech Stack
          </button>
          <button className="btn-pista-outline" onClick={() => handleScroll('contact')}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
