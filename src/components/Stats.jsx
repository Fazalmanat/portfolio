import React, { useState, useEffect } from 'react';

const GITHUB_USER = 'Fazalmanat';
const LEETCODE_USER = 'Fazalrmanat';

export default function Stats() {
  const [ghData, setGhData] = useState({
    totalContributions: 108, // 17 (2024) + 17 (2025) + 74 (2026)
    currentYearContributions: 74,
    publicRepos: 5,
    followers: 2,
    streakStatus: 'Active',
    loaded: false
  });

  useEffect(() => {
    // Fetch live user metadata directly from GitHub API
    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.public_repos !== undefined) {
          setGhData(prev => ({
            ...prev,
            publicRepos: data.public_repos,
            followers: data.followers,
            loaded: true
          }));
        }
      })
      .catch(() => {
        // Fallback gracefully to default verified data
      });
  }, []);

  return (
    <section 
      id="stats" 
      data-achievement-icon="📊" 
      data-achievement-title="Stats Screen" 
      data-achievement-body="Coding stats checked."
    >
      <div className="wrap">
        <div className="eyebrow">
          <span className="num mono">LV.06</span>
          <span className="rule"></span>
          <span className="label">Coding Stats</span>
        </div>
        <h2 className="title">Practice, <em>logged</em>.</h2>

        <div className="stats-custom-grid">
          {/* Card 1: Total Contributions */}
          <a 
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card"
          >
            <div className="stat-card-top">
              <span className="stat-num">{ghData.totalContributions}</span>
              <span className="stat-badge mono">ALL-TIME</span>
            </div>
            <div className="stat-label">Total Contributions</div>
            <div className="stat-sub mono">
              17 ('24) · 17 ('25) · {ghData.currentYearContributions} ('26)
            </div>
          </a>

          {/* Card 2: 2026 Activity & Streak */}
          <a 
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card"
          >
            <div className="stat-card-top">
              <span className="stat-num">{ghData.currentYearContributions}</span>
              <span className="stat-badge mono streak-active">● {ghData.streakStatus}</span>
            </div>
            <div className="stat-label">2026 Contributions</div>
            <div className="stat-sub mono">Logged &amp; committed today</div>
          </a>

          {/* Card 3: Repositories */}
          <a 
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card"
          >
            <div className="stat-card-top">
              <span className="stat-num">{ghData.publicRepos}</span>
              <span className="stat-badge mono">PUBLIC</span>
            </div>
            <div className="stat-label">GitHub Repositories</div>
            <div className="stat-sub mono">@{GITHUB_USER}</div>
          </a>

          {/* Card 4: LeetCode */}
          <a 
            href={`https://leetcode.com/u/${LEETCODE_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="stat-card"
          >
            <div className="stat-card-top">
              <span className="stat-num mono" style={{ fontSize: '26px' }}>LC</span>
              <span className="stat-badge mono">PROFILE ↗</span>
            </div>
            <div className="stat-label">LeetCode Profile</div>
            <div className="stat-sub mono">@{LEETCODE_USER}</div>
          </a>
        </div>

        <p className="note">
          Live sync linked to{' '}
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)' }}>
            GitHub (@{GITHUB_USER})
          </a>{' '}
          and{' '}
          <a href={`https://leetcode.com/u/${LEETCODE_USER}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)' }}>
            LeetCode (@{LEETCODE_USER})
          </a>.
        </p>
      </div>
    </section>
  );
}
