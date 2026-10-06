import React, { useState } from 'react';

export default function Navbar({ theme, toggleTheme, scrollProgress }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleProgressClick = (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * maxScroll,
      behavior: 'smooth'
    });
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#home" className="nav-brand">FAZAL<span>.</span>R</a>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {theme === 'dark' ? (
                <path d="M12 3v1.5M12 19.5V21M4.2 4.2l1 1M18.8 18.8l1 1M3 12h1.5M19.5 12H21M4.2 19.8l1-1M18.8 5.2l1-1M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/>
              ) : (
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              )}
            </svg>
          </button>
          
          <button 
            className="nav-burger" 
            onClick={() => setIsOpen(prev => !prev)} 
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div 
        className="hud clickable-hud" 
        onClick={handleProgressClick}
        title="Click anywhere to jump to that section"
      >
        <div className="hud-track">
          <div className="hud-fill" style={{ width: `${scrollProgress}%` }}></div>
        </div>
        <span className="hud-label mono">
          EXPLORATION {String(scrollProgress).padStart(3, '0')}% <span>⚡ SEEK</span>
        </span>
      </div>
    </nav>
  );
}
