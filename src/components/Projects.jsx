import React from 'react';
import { featuredProjects, sideQuests } from '../data/projects';

export default function Projects() {
  return (
    <section 
      id="projects" 
      data-achievement-icon="🗺️" 
      data-achievement-title="Quest Log Opened" 
      data-achievement-body="Featured projects found."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.03</span>
          <span className="rule"></span>
          <span className="label">Featured Projects</span>
        </div>
        <h2 className="title">Two problems worth <em>solving</em>.</h2>

        {featuredProjects.map(p => (
          <div key={p.id} className="project sheet">
            <div className="project-visual">
              {p.visualType === 'chart' ? (
                <svg viewBox="0 0 200 200" fill="none">
                  <rect x="30" y="30" width="140" height="140" rx="4" stroke="var(--amber)" strokeWidth="1.4"/>
                  <path d="M50 130 L85 80 L110 105 L150 55" stroke="var(--teal)" strokeWidth="2" fill="none"/>
                  <circle cx="150" cy="55" r="5" fill="var(--teal)"/>
                  <circle cx="50" cy="130" r="5" fill="var(--amber)"/>
                  <path d="M100 30 V170 M30 100 H170" stroke="var(--paper-faint)" strokeWidth="0.6" strokeDasharray="3 5"/>
                </svg>
              ) : (
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="70" stroke="var(--teal)" strokeWidth="1.4"/>
                  <path d="M70 90 h60 M70 105 h40 M70 120 h50" stroke="var(--paper-dim)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M155 70 l15 -15 M155 130 l15 15" stroke="var(--amber)" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="8" fill="var(--amber)"/>
                </svg>
              )}
            </div>
            <div className="project-body">
              <span className="project-index mono">{p.index}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.note && (
                <p className="project-note mono">{p.note}</p>
              )}
              <div className="quest-meta">
                <span className="star-chip">DIFFICULTY {p.difficulty}</span>
                <span className="xp-chip">{p.xp}</span>
                <span className={`status-chip ${p.status === 'IN PROGRESS' ? 'wip' : p.status === 'PROTOTYPE' ? 'proto' : 'done'}`}>
                  {p.status}
                </span>
              </div>
              <div className="project-tags">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="chip">{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.demoUrl ? (
                  <a href={p.demoUrl} className="btn btn-primary">Live Demo</a>
                ) : (
                  <span className="btn btn-ghost btn-disabled" title="Demo not yet available">No Live Demo</span>
                )}
                {p.githubUrl ? (
                  <a href={p.githubUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">GitHub</a>
                ) : (
                  <span className="btn btn-ghost btn-disabled" title="Tracked via Unity Version Control">No GitHub</span>
                )}
                <a href={p.readMoreUrl} className="btn btn-ghost">Read More</a>
              </div>
            </div>
          </div>
        ))}

        <div className="eyebrow" style={{ marginTop: '56px' }}>
          <span className="num mono">LV.03b</span>
          <span className="rule"></span>
          <span className="label">Side Quests</span>
        </div>
        <div className="small-projects">
          {sideQuests.map((sq, idx) => (
            <div key={idx} className="small-card">
              {sq.title} <span>↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
