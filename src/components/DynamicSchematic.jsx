import React, { useState } from 'react';

const TechIcon = ({ tech, cx, cy }) => {
  const icons = {
    React: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <ellipse rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" className="spin-slow" />
        <ellipse rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60)" />
        <ellipse rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120)" />
        <circle r="2" fill="#61DAFB" />
        <text y="20" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">React</text>
      </g>
    ),
    Unity: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <polygon points="0,-11 9.5,-5.5 9.5,5.5 0,11 -9.5,5.5 -9.5,-5.5" stroke="var(--paper)" strokeWidth="1.2" fill="none" />
        <line x1="0" y1="-11" x2="0" y2="0" stroke="var(--paper)" strokeWidth="1" />
        <line x1="9.5" y1="-5.5" x2="0" y2="0" stroke="var(--paper)" strokeWidth="1" />
        <line x1="-9.5" y1="-5.5" x2="0" y2="0" stroke="var(--paper)" strokeWidth="1" />
        <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">Unity</text>
      </g>
    ),
    Node: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <polygon points="0,-11 9.5,-5.5 9.5,5.5 0,11 -9.5,5.5 -9.5,-5.5" stroke="#539E43" strokeWidth="1.2" fill="none" />
        <text y="4" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#539E43" fontWeight="700">JS</text>
        <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">Node</text>
      </g>
    ),
    Firebase: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <path d="M-5,8 L0,-11 L3,-3 L7,-7 L3,8 Z" stroke="#F5820D" strokeWidth="1" fill="none" strokeLinejoin="round" />
        <path d="M-5,8 L3,8 L-1,0 Z" stroke="#FFCA28" strokeWidth="1" fill="none" strokeLinejoin="round" />
        <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">Firebase</text>
      </g>
    ),
    Python: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <path d="M-4,-10 C-4,-13 4,-13 4,-10 L4,-2 C4,1 0,2 0,2 C0,2 4,3 4,6 L4,10 C4,13 -4,13 -4,10 L-4,2 C-4,-1 0,-2 0,-2 C0,-2 -4,-3 -4,-6 Z" 
              stroke="#FFD343" strokeWidth="1.1" fill="none" />
        <circle cx="-1.5" cy="-7" r="1.2" fill="#3776AB" />
        <circle cx="1.5" cy="7" r="1.2" fill="#FFD343" />
        <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">Python</text>
      </g>
    ),
    CSharp: (
      <g transform={`translate(${cx}, ${cy})`} pointerEvents="none">
        <text y="5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="15" fill="#9B4F96" fontWeight="700">C#</text>
        <text y="22" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--paper-dim)">C#</text>
      </g>
    ),
  };

  return icons[tech] || null;
};

export default function DynamicSchematic() {
  const [photoError, setPhotoError] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const photoSrc = '/profile.jpg';
  const showPhoto = !photoError;

  return (
    <div className="schematic">
      <svg viewBox="0 0 360 400" fill="none">
        <defs>
          <clipPath id="photoClip">
            <circle cx="180" cy="195" r="42" />
          </clipPath>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.25" />
            <stop offset="80%" stopColor="var(--amber)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background glow circle */}
        <circle cx="180" cy="195" r="110" fill="url(#coreGlow)" className="core-glow-pulse" />

        {/* Perfectly centered orbital ring and satellite beacon */}
        <g transform="translate(180, 195)" pointerEvents="none">
          <circle 
            r="80" 
            stroke="var(--line)" 
            strokeWidth="0.8" 
            strokeDasharray="4 8" 
            className="orbit-ring-exact"
          />
          <g className="orbit-satellite-group">
            <circle cx="80" cy="0" r="3" fill="var(--amber)" opacity="0.9" />
          </g>
        </g>

        {/* Animated signal connection lines */}
        <g className="node-line-animated">
          <line x1="180" y1="195" x2="70" y2="60" />
          <line x1="180" y1="195" x2="290" y2="60" />
          <line x1="180" y1="195" x2="50" y2="205" />
          <line x1="180" y1="195" x2="310" y2="205" />
          <line x1="180" y1="195" x2="80" y2="340" />
          <line x1="180" y1="195" x2="280" y2="340" />
        </g>

        {/* Pulse ripple rings around center photo */}
        <circle className="pulse-ripple ring-1" cx="180" cy="195" r="44" />
        <circle className="pulse-ripple ring-2" cx="180" cy="195" r="44" />

        {/* Center core node */}
        <circle className="core" cx="180" cy="195" r="44" />

        {showPhoto ? (
          <image
            href={photoSrc}
            x="138"
            y="153"
            width="84"
            height="84"
            clipPath="url(#photoClip)"
            preserveAspectRatio="xMidYMid slice"
            onError={() => setPhotoError(true)}
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <g className="core-fallback" pointerEvents="none">
            <text className="core-label" x="180" y="190" textAnchor="middle">FR</text>
            <text x="180" y="208" textAnchor="middle" fill="var(--paper-dim)" fontSize="9" fontFamily="JetBrains Mono, monospace">BUILDS</text>
          </g>
        )}

        {/* Tech nodes with solid fixed hit-area to eliminate jitter */}
        <g 
          className={`node-group ${activeNode === 'React' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('React')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="70" cy="60" r="36" fill="transparent" />
          <circle className="node-dot" cx="70" cy="60" r="28" />
          <TechIcon tech="React" cx={70} cy={52} />
        </g>

        <g 
          className={`node-group ${activeNode === 'Unity' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('Unity')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="290" cy="60" r="36" fill="transparent" />
          <circle className="node-dot" cx="290" cy="60" r="28" />
          <TechIcon tech="Unity" cx={290} cy={52} />
        </g>

        <g 
          className={`node-group ${activeNode === 'Node' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('Node')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="50" cy="205" r="36" fill="transparent" />
          <circle className="node-dot" cx="50" cy="205" r="28" />
          <TechIcon tech="Node" cx={50} cy={197} />
        </g>

        <g 
          className={`node-group ${activeNode === 'Firebase' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('Firebase')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="310" cy="205" r="36" fill="transparent" />
          <circle className="node-dot" cx="310" cy="205" r="28" />
          <TechIcon tech="Firebase" cx={310} cy={197} />
        </g>

        <g 
          className={`node-group ${activeNode === 'Python' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('Python')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="80" cy="340" r="36" fill="transparent" />
          <circle className="node-dot" cx="80" cy="340" r="28" />
          <TechIcon tech="Python" cx={80} cy={332} />
        </g>

        <g 
          className={`node-group ${activeNode === 'CSharp' ? 'node-active' : ''}`}
          onMouseEnter={() => setActiveNode('CSharp')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <circle cx="280" cy="340" r="36" fill="transparent" />
          <circle className="node-dot" cx="280" cy="340" r="28" />
          <TechIcon tech="CSharp" cx={280} cy={332} />
        </g>
      </svg>
    </div>
  );
}
