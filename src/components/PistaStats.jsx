import React from 'react';
import { certifications } from '../data/miscData';

export default function PistaStats() {
  return (
    <section id="stats" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple">
          <h2>Certifications</h2>
        </div>

        <div style={{ maxWidth: '660px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {certifications.map((cert, idx) => (
              <div key={idx} className="bio-card-simple" style={{ padding: '18px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: '#12261A' }}>{cert.name}</div>
                    <div style={{ fontSize: '13px', color: '#3D5445', marginTop: '2px' }}>{cert.issuer}</div>
                  </div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pista-outline"
                      style={{ padding: '4px 14px', fontSize: '12px', borderRadius: '12px' }}
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
