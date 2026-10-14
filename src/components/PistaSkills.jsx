import React, { useMemo, useState } from 'react';
import { skillCategories } from '../data/skills';
import { layoutSkills, ROOT, R, CAPW, CAPH, LH } from './skillLayout';
import '../styles/extras.css';

const seg = (a, b) => `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
const anchor = { r: 'start', l: 'end', t: 'middle', b: 'middle' };
const textX = (l) => (l.side === 'r' ? l.x : l.side === 'l' ? l.x + l.w : l.x + l.w / 2);

export default function PistaSkills() {
  const { arms, vb } = useMemo(() => layoutSkills(skillCategories), []);
  const [active, setActive] = useState(null); // { arm, k }
  const [showNames, setShowNames] = useState(true);
  const hex = [[0, -ROOT], [28, -16], [28, 16], [0, ROOT], [-28, 16], [-28, -16]].map((p) => p.join(',')).join(' ');

  return (
    <section id="skills" style={{ padding: '32px 0' }}>
      <div className="pista-container">
        
        <div className="skilltree-bar">
          <button type="button" className="skilltree-toggle" aria-pressed={showNames} onClick={() => setShowNames((v) => !v)}>
            {showNames ? '☑' : '☐'} Show skill names
          </button>
        </div>

        <div className="skilltree-wrap">
          <svg className="skilltree" viewBox={vb.join(' ')} role="group" aria-label="Skill snowflake">
            {arms.map((arm, i) => {
              const armOn = active && active.arm === i;
              return (
                <g key={arm.cat.category}>
                  <path className="st-line st-arm" d={seg(arm.start, arm.end)} />
                  {arm.nodes.map((nd, k) => {
                    const lit = armOn && active.k === k;
                    const label = nd.label || (lit ? nd.fallback : null);
                    return (
                      <g key={nd.skill}>
                        <path className={`st-line st-twig ${lit ? 'lit' : ''}`} d={seg(nd.base, nd.joint)} />
                        <path className={`st-line st-sub ${lit ? 'lit' : ''}`} d={seg(nd.joint, nd)} />
                        {lit && <path className="st-line st-arm lit" d={seg(arm.start, nd.base)} />}
                        <g className={`st-node ${lit ? 'lit' : ''}`} tabIndex={0} aria-label={`${arm.cat.category}: ${nd.skill}`}
                          onMouseEnter={() => setActive({ arm: i, k })} onMouseLeave={() => setActive(null)}
                          onFocus={() => setActive({ arm: i, k })} onBlur={() => setActive(null)}>
                          <circle cx={nd.x} cy={nd.y} r={R + 5} fill="transparent" stroke="none" />
                          <circle cx={nd.x} cy={nd.y} r={R} />
                          <text className="st-mono" x={nd.x} y={nd.y + 4}>{nd.skill.slice(0, 2)}</text>
                          {label && (showNames || lit) && (
                            <text className="st-name" x={textX(label)} y={label.y + LH - 3} style={{ textAnchor: anchor[label.side] }}>{nd.skill}</text>
                          )}
                        </g>
                      </g>
                    );
                  })}
                  <g className={`st-cap ${armOn ? 'lit' : ''}`} transform={`translate(${arm.cap.x}, ${arm.cap.y})`}>
                    <rect width={CAPW} height={CAPH} rx="12" />
                    <text className="st-cap-title" x={CAPW / 2} y="17" style={{ fontSize: 13 }}>{arm.cat.category}</text>
                    <text className="st-cap-sub" x={CAPW / 2} y="30">{arm.cat.skills.length} skills</text>
                  </g>
                </g>
              );
            })}
            <polygon className={`st-root ${active ? 'lit' : ''}`} points={hex} />
            <text className="st-root-text" x="0" y="5" style={{ fontSize: 14 }}>Skills</text>
          </svg>
        </div>
      </div>
    </section>
  );
}