import React, { useEffect, useState } from 'react';

export default function AmbientLights() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let frameId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="ambient-container" aria-hidden="true">
      {/* Gentle mouse follower glow */}
      <div 
        className="ambient-cursor" 
        style={{ 
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)` 
        }} 
      />

      {/* Floating slow-drifting background glow orbs */}
      <div className="ambient-orb orb-amber" />
      <div className="ambient-orb orb-teal" />
      <div className="ambient-orb orb-indigo" />
    </div>
  );
}
