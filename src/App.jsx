import React, { useState, useEffect } from 'react';
import './styles/pistaTheme.css';

import CircularHudNavbar from './components/CircularHudNavbar';
import PistaHero from './components/PistaHero';
import PistaAbout from './components/PistaAbout';
import PistaSkills from './components/PistaSkills';
import PistaExperience from './components/PistaExperience';
import PistaProjects from './components/PistaProjects';
import PistaCertifications from './components/PistaCertifications';
import PistaContact from './components/PistaContact';
import PistaActivity from './components/PistaActivity';
import Reveal from './components/Reveal';
import HoneycombBackground from './components/HoneycombBackground';

export default function App() {
  const [awake, setAwake] = useState(false);

  // Page stays on the landing screen until the cord is pulled.
  useEffect(() => {
    const v = awake ? '' : 'hidden';
    document.documentElement.style.overflow = v;
    document.body.style.overflow = v;
    if (!awake) window.scrollTo(0, 0);
  }, [awake]);

  const hidden = { visibility: awake ? 'visible' : 'hidden' };

  return (
    <>
      <HoneycombBackground />
      {awake && <CircularHudNavbar />}
      <main>
        <PistaHero onAwake={() => setAwake(true)} />
        <div style={hidden}>
          <PistaAbout />
          <Reveal><PistaProjects /></Reveal>
          <Reveal><PistaSkills /></Reveal>
          <Reveal><PistaExperience /></Reveal>
          <Reveal><PistaCertifications /></Reveal>
          <Reveal><PistaActivity /></Reveal>
          <Reveal><PistaContact /></Reveal>
        </div>
      </main>
      <footer className="footer-simple" style={hidden}>
        <div className="pista-container">
          <p>© {new Date().getFullYear()} Fazal Rahman Manat • All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}