import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '14px' }}>
        <span className="mono">
          © 2026 Fazal Rahman — Built with care. <span style={{ opacity: 0.55 }}>// psst, try the konami code</span>
        </span>
        <button onClick={scrollToTop} className="to-top">
          ⤴ Respawn at top
        </button>
      </div>
    </footer>
  );
}
