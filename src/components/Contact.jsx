import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', msg: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      data-achievement-icon="📡"
      data-achievement-title="New Quest"
      data-achievement-body="Ready to say hello."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.09</span>
          <span className="rule"></span>
          <span className="label">Contact</span>
        </div>
        <h2 className="title">Let's <em>talk</em>.</h2>
        <div className="contact-grid">
          <form className="sheet" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                required
                value={formState.msg}
                onChange={e => setFormState(prev => ({ ...prev, msg: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {submitted ? 'Sent ✓' : 'Send Message'}
            </button>
          </form>

          <div className="social-col">
            <a 
              href="https://www.linkedin.com/in/fazal-r-manat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
            <a 
              href="https://github.com/Fazalmanat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=manatfazalrahman@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              title="Compose email to manatfazalrahman@gmail.com"
            >
              <span>Email</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
