import React, { useState } from 'react';

export default function PistaContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" style={{ padding: '48px 0 60px' }}>
      <div className="pista-container">
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            background: '#ffffff',
            border: '1.5px solid #96C4A0',
            borderRadius: '24px',
            padding: '28px 28px 24px',
            boxShadow: '0 6px 20px rgba(18,38,26,0.06)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: '#12261A', marginBottom: '6px' }}>
              Get In Touch
            </h2>
            <p style={{ color: '#3D5445', fontSize: '14px' }}>
              Have a question or want to collaborate?
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '14px' }}>
              <a
                href="https://github.com/Fazalmanat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pista-outline"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/fazalmanat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pista-outline"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/Fazalrmanat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pista-outline"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                LC
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="text"
                required
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  background: '#F4F7F4',
                  border: '1px solid #CFE2D3',
                  fontSize: '14px',
                  color: '#12261A',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  background: '#F4F7F4',
                  border: '1px solid #CFE2D3',
                  fontSize: '14px',
                  color: '#12261A',
                  outline: 'none'
                }}
              />
            </div>
            <textarea
              rows="3"
              required
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '14px',
                background: '#F4F7F4',
                border: '1px solid #CFE2D3',
                fontSize: '14px',
                color: '#12261A',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                className="btn-pista-primary"
                style={{ minWidth: '160px', fontSize: '14px', padding: '10px 24px' }}
                disabled={submitted}
              >
                {submitted ? 'Sent!' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
