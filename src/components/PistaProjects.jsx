import React, { useState } from 'react';
import { featuredProjects, sideQuests } from '../data/projects';

export default function PistaProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const [modalAnim, setModalAnim] = useState('');

  const openProject = (proj) => {
    setActiveProject(proj);
    setModalAnim('opening');
  };

  const closeProject = () => {
    setModalAnim('closing');
    setTimeout(() => {
      setActiveProject(null);
      setModalAnim('');
    }, 300);
  };

  const row1 = [
    { ...featuredProjects[0], isBig: true },
    { ...sideQuests[0], isBig: false }
  ];
  const row2 = [
    { ...sideQuests[1], isBig: false },
    { ...featuredProjects[1], isBig: true },
    { ...sideQuests[2], isBig: false }
  ];
  const row3 = [
    { ...sideQuests[3], isBig: false }
  ];

  const renderRow = (items) =>
    items.map((proj, idx) => (
      <div
        key={idx}
        className={`hex-cell ${proj.isBig ? 'big-cell' : ''}`}
        onClick={() => openProject(proj)}
      >
        <h3>{proj.title}</h3>
        <p>{proj.description || 'Interactive project.'}</p>
        <span style={{ fontSize: '11px', fontWeight: 700, marginTop: '8px', color: '#2E6B42' }}>
          View ↗
        </span>
      </div>
    ));

  return (
    <section id="projects" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple">
          <h2>Projects</h2>
        </div>

        <div className="beehive-grid-interlocking">
          <div className="beehive-row">{renderRow(row1)}</div>
          <div className="beehive-row">{renderRow(row2)}</div>
          <div className="beehive-row">{renderRow(row3)}</div>
        </div>

        {/* Animated Detail Modal */}
        {activeProject && (
          <div
            className={`project-modal-backdrop ${modalAnim}`}
            onClick={closeProject}
          >
            <div
              className={`project-modal-card ${modalAnim}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="project-modal-close" onClick={closeProject}>✕</button>

              <h3 className="project-modal-title">{activeProject.title}</h3>
              <p className="project-modal-desc">
                {activeProject.description || 'Interactive web build / game project.'}
              </p>

              {activeProject.tags && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {activeProject.tags.map((t, idx) => (
                    <span key={idx} className="skill-chip-plain">{t}</span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={activeProject.link || activeProject.demoUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pista-primary"
                  style={{ fontSize: '13.5px', padding: '10px 20px' }}
                >
                  View Demo ↗
                </a>
                <button
                  className="btn-pista-outline"
                  onClick={closeProject}
                  style={{ fontSize: '13.5px', padding: '10px 18px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
