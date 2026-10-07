import React, { useState } from 'react';

export default function CircularHudNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', svg: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/> },
    { label: 'About', href: '#about', svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/> },
    { label: 'Skills', href: '#skills', svg: <path d="M7 2v11h3v9l7-12h-4l4-8z"/> },
    { label: 'Projects', href: '#projects', svg: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/> },
    { label: 'Experience', href: '#experience', svg: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/> },
    { label: 'Metrics', href: '#stats', svg: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4h2v4zm0-6h-2V7h2v4zm4 6h-2V9h2v8zm0-10h-2V7h2v2z"/> },
    { label: 'Contact', href: '#contact', svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/> },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hud-navbar-fixed">
      {/* 3 LINES / HAMBURGER BUTTON ICON FOR THE HUD */}
      <button 
        className="hud-trigger-lines"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Expandable Menu */}
      {isOpen && (
        <div className="hud-menu-circular">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className="hud-menu-btn"
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
