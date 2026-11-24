import React, { useEffect, useState } from 'react';

export default function CircularHudNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cur, setCur] = useState(0);

  const toggle = () => {
    if (isOpen) { setIsOpen(false); setTimeout(() => setMounted(false), 230); }
    else { setMounted(true); setIsOpen(true); }
  };

  const navItems = [
    { label: 'Home', href: '#home', svg: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/> },
    { label: 'About', href: '#about', svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/> },
    { label: 'Projects', href: '#projects', svg: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/> },
    { label: 'Skills', href: '#skills', svg: <path d="M7 2v11h3v9l7-12h-4l4-8z"/> },
    { label: 'Experience', href: '#experience', svg: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/> },
    { label: 'Education', href: '#education', svg: <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/> },
    { label: 'Achievements', href: '#achievements', svg: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> },
    { label: 'Certifications', href: '#certifications', svg: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4h2v4zm0-6h-2V7h2v4zm4 6h-2V9h2v8zm0-10h-2V7h2v2z"/> },
    { label: 'Activity', href: '#activity', svg: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4h2v4zm0-6h-2V7h2v4zm4 6h-2V9h2v8zm0-10h-2V7h2v2z"/> },
    { label: 'Contact', href: '#contact', svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/> },
  ];

  // Track which section is current, for the compact shortcut list.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.innerHeight * 0.4;
      let c = 0;
      navItems.forEach((it, i) => {
        const el = document.querySelector(it.href);
        if (el && el.getBoundingClientRect().top <= y) c = i;
      });
      setCur(c);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  const miniIdx = [...new Set([0, cur - 1, cur, cur + 1])].filter((i) => i >= 0 && i < navItems.length);

  const handleNavClick = (href) => {
    if (isOpen) toggle();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hud-navbar-fixed">
      {/* 3 LINES / HAMBURGER BUTTON ICON FOR THE HUD */}
      <button 
        className={`hud-trigger-lines ${isOpen ? 'open' : ''}`}
        onClick={toggle}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Compact shortcuts: home, previous, current, next */}
      {!mounted && (
        <div className="hud-mini" aria-label="Section shortcuts">
          {miniIdx.map((i) => (
            <button key={navItems[i].href} type="button" className={`hud-mini-btn ${i === cur ? 'on' : ''}`}
              onClick={() => handleNavClick(navItems[i].href)}>{navItems[i].label}</button>
          ))}
        </div>
      )}

      {/* Expandable Menu */}
      {mounted && (
        <div className={`hud-menu-circular ${isOpen ? 'in' : 'out'}`}>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className="hud-menu-btn"
              style={{ '--i': idx }}
              onClick={() => handleNavClick(item.href)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                {item.svg}
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}