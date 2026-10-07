import React from 'react';

export default function PistaAbout() {
  const bioCards = [
    {
      title: 'Who I Am',
      items: [
        'CS & Design Graduate',
        'Full-stack & interactive experiences',
        'Clean logic, maintainable code'
      ]
    },
    {
      title: 'What I Build',
      items: [
        'Web Apps (React, Node, Flask)',
        'VR Simulations (Unity, C#)',
        'AI Voice Automation'
      ]
    },
    {
      title: 'Learning Now',
      items: [
        'Advanced Python & DSA',
        'Docker & Cloud CI/CD',
        'System Design'
      ]
    }
  ];

  return (
    <section id="about" style={{ padding: '60px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple">
          <h2>About Me</h2>
        </div>

        <div className="bio-cards-grid">
          {bioCards.map((card, idx) => (
            <div key={idx} className="bio-card-simple">
              <h3 className="bio-card-title">{card.title}</h3>
              <ul className="bio-simple-list">
                {card.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
