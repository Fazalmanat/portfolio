import React, { useState } from 'react';

const BACKGROUND_NODES = [
  { id: 'n1', text: 'SYS_OK // 60FPS', top: '12%', left: '4%', dir: 'h' },
  { id: 'n2', text: '0x4F // UNITY_CORE', top: '22%', right: '5%', dir: 'v' },
  { id: 'n3', text: 'RAYCAST_HIT: TRUE', top: '38%', left: '3%', dir: 'h' },
  { id: 'n4', text: 'C#_ASYNC_DISPATCH', top: '48%', right: '4%', dir: 'h' },
  { id: 'n5', text: 'SHADERS_COMPILED', top: '64%', left: '5%', dir: 'v' },
  { id: 'n6', text: 'AI_AGENT_STANDBY', top: '75%', right: '3%', dir: 'h' },
  { id: 'n7', text: 'LATENCY: 12MS', top: '88%', left: '4%', dir: 'h' },
  { id: 'n8', text: 'SECRET_NODE // 0x88', top: '93%', right: '6%', dir: 'v' },
];

export default function BackgroundMotion({ onCollectNode }) {
  const [collected, setCollected] = useState(new Set());

  const handleNodeClick = (node) => {
    if (collected.has(node.id)) return;
    setCollected(prev => new Set(prev).add(node.id));
    if (onCollectNode) {
      onCollectNode(node.text);
    }
  };

  return (
    <div className="bg-hud-matrix" aria-hidden="true">
      {/* Subtle vertical and horizontal grid rule lines */}
      <div className="bg-grid-line v-left" />
      <div className="bg-grid-line v-right" />
      <div className="bg-grid-line h-top" />
      <div className="bg-grid-line h-mid" />
      <div className="bg-grid-line h-bottom" />

      {/* Floating, fading monospace data nodes */}
      {BACKGROUND_NODES.map((node, idx) => {
        const isFound = collected.has(node.id);
        return (
          <button
            key={node.id}
            type="button"
            className={`bg-hud-node mono ${node.dir === 'v' ? 'node-vertical' : ''} ${isFound ? 'node-collected' : ''}`}
            style={{
              top: node.top,
              left: node.left,
              right: node.right,
              animationDelay: `${idx * 1.5}s`
            }}
            onClick={() => handleNodeClick(node)}
            title={isFound ? 'Node Decoded ✓' : 'Click to decode secret data packet'}
          >
            <span className="node-bracket">[</span>
            <span className="node-val">{isFound ? 'DECODED +50XP' : node.text}</span>
            <span className="node-bracket">]</span>
          </button>
        );
      })}
    </div>
  );
}
