import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useKonamiCode } from './hooks/useKonamiCode';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Stats from './components/Stats';
import { Learning, Philosophy, Resume } from './components/SecondarySections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ToastStack from './components/ToastStack';
import FlashOverlay from './components/FlashOverlay';
import BackgroundMotion from './components/BackgroundMotion';
import MovingMarquee from './components/MovingMarquee';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const scrollProgress = useScrollProgress();
  const [toasts, setToasts] = useState([]);
  const [flashActive, setFlashActive] = useState(false);

  const fireToast = useCallback((icon, title, body) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, icon, title, body }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Initial Game Started toast
  useEffect(() => {
    const timer = setTimeout(() => {
      fireToast('🎮', 'System Online', 'Welcome to Fazal\'s portfolio.');
    }, 600);
    return () => clearTimeout(timer);
  }, [fireToast]);

  // Section observer for achievement toasts with dwell timer
  useEffect(() => {
    const seen = new Set();
    const pendingTimers = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const id = e.target.id;
        if (e.isIntersecting) {
          e.target.classList.add('in');

          if (id && !seen.has(id)) {
            const { achievementIcon, achievementTitle, achievementBody } = e.target.dataset;
            if (achievementTitle && !pendingTimers.has(id)) {
              const timer = setTimeout(() => {
                seen.add(id);
                pendingTimers.delete(id);
                fireToast(achievementIcon, achievementTitle, achievementBody);
              }, 1200);
              pendingTimers.set(id, timer);
            }
          }
        } else {
          if (id && pendingTimers.has(id)) {
            clearTimeout(pendingTimers.get(id));
            pendingTimers.delete(id);
          }
        }
      });
    }, { threshold: 0.35 });

    const elements = document.querySelectorAll('section[data-achievement-title], .reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      pendingTimers.forEach(t => clearTimeout(t));
      pendingTimers.clear();
    };
  }, [fireToast]);

  // Secret background node collection easter-egg
  const handleCollectNode = useCallback((nodeText) => {
    fireToast('👾', 'Secret Packet Decoded', `${nodeText} (+50 XP)`);
  }, [fireToast]);

  // Konami Code trigger handler
  const handleKonamiSuccess = useCallback(() => {
    setFlashActive(true);
    fireToast('🏆', 'True Gamer', 'Konami code accepted. +9999 XP.');
    setTimeout(() => setFlashActive(false), 600);
  }, [fireToast]);

  useKonamiCode(handleKonamiSuccess);

  return (
    <>
      <BackgroundMotion onCollectNode={handleCollectNode} />
      <Navbar theme={theme} toggleTheme={toggleTheme} scrollProgress={scrollProgress} />
      <FlashOverlay active={flashActive} />
      <ToastStack toasts={toasts} removeToast={removeToast} />

      <main>
        <Hero />
        <MovingMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Stats />
        <Learning />
        <Philosophy />
        <Resume />
        <MovingMarquee reverse={true} speed="32s" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
