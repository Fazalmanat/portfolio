import React from 'react';

const EMAIL = 'manatfazalrahman@gmail.com';
const socials = [
  ['GitHub', 'https://github.com/Fazalmanat'],
  ['LinkedIn', 'https://www.linkedin.com/in/fazal-r-manat'],
  ['LeetCode', 'https://leetcode.com/u/Fazalrmanat']
];

export default function PistaContact() {
  return (
    <section id="contact" style={{ padding: '48px 0 60px' }}>
      <div className="pista-container">
        <div className="contact-card">
          <h2>Get in touch</h2>
          <p>Have a question or want to collaborate? Send me an email.</p>
          <a href={`mailto:${EMAIL}`} className="btn-pista-primary">Email me</a>
          <p className="contact-address">{EMAIL}</p>
          <div className="contact-socials">
            {socials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="btn-pista-outline">{name}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}