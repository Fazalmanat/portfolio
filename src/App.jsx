import React, { useState, useEffect } from 'react';
import './styles/pistaTheme.css';

import CircularHudNavbar from './components/CircularHudNavbar';
import PistaHero from './components/PistaHero';
import PistaAbout from './components/PistaAbout';
import PistaSkills from './components/PistaSkills';
import PistaExperience from './components/PistaExperience';
import PistaEducation from './components/PistaEducation';
import PistaProjects from './components/PistaProjects';
import PistaCertifications from './components/PistaCertifications';
import PistaContact from './components/PistaContact';
import PistaAchievements from './components/PistaAchievements';
import PistaActivity from './components/PistaActivity';
import HeartbeatDivider from './components/HeartbeatDivider';
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
          <HeartbeatDivider />
          <PistaAbout />
          <HeartbeatDivider />
          <Reveal><PistaProjects /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaSkills /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaExperience /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaEducation /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaAchievements /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaCertifications /></Reveal>
          <HeartbeatDivider />
          <Reveal><PistaActivity /></Reveal>
          <HeartbeatDivider />
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