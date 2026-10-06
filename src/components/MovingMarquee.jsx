import React from 'react';

export default function MovingMarquee({ items, reverse = false, speed = '25s' }) {
  const defaultItems = [
    'UNITY 3D & VR',
    'FULL-STACK ARCHITECTURE',
    'C# ',
    'PYTHON AUTOMATION',
    'AI AGENTIC WORKFLOWS',
    'INTERACTIVE EXPERIENCES',
    'RESPONSIVE INTERFACES'
  ];

  const content = items || defaultItems;

  return (
    <div className="ticker-tape-wrap" aria-hidden="true">
      <div 
        className={`ticker-tape-track ${reverse ? 'ticker-reverse' : ''}`}
        style={{ animationDuration: speed }}
      >
        <div className="ticker-tape-item">
          {content.map((item, idx) => (
            <React.Fragment key={`a-${idx}`}>
              <span className="ticker-text mono">{item}</span>
              <span className="ticker-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="ticker-tape-item">
          {content.map((item, idx) => (
            <React.Fragment key={`b-${idx}`}>
              <span className="ticker-text mono">{item}</span>
              <span className="ticker-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
