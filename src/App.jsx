import React from 'react';
import './styles/pistaTheme.css';

import CircularHudNavbar from './components/CircularHudNavbar';
import PistaHero from './components/PistaHero';
import PistaAbout from './components/PistaAbout';
import PistaSkills from './components/PistaSkills';
import PistaExperience from './components/PistaExperience';
import PistaProjects from './components/PistaProjects';
import PistaStats from './components/PistaStats';
import PistaContact from './components/PistaContact';

export default function App() {
  return (
    <>
      {/* 3-Lines Circular HUD Navbar */}
      <CircularHudNavbar />

      <main>
        {/* 1. Hero: Centered Intro + Straight Full Name */}
        <PistaHero />

        {/* 2. Biography: Clean Game Cards (No Extra Tier Data) */}
        <PistaAbout />

        {/* 3. Skills: Right-Directed Circuit Tree Branches */}
        <PistaSkills />

        {/* 4. Experience: True Zigzag Timeline with Zigzag Connecting Line */}
        <PistaExperience />

        {/* 5. Projects: Interlocking Honeycomb Beehive Grid */}
        <PistaProjects />

        {/* 6. Metrics & Stats */}
        <PistaStats />

        {/* 7. Contact: Simple Clean Form */}
        <PistaContact />
      </main>

      {/* Clean Footer */}
      <footer className="footer-simple">
        <div className="pista-container">
          <p>© {new Date().getFullYear()} Fazal Rahman Manat • All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
