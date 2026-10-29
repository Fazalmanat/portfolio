import React, { useEffect, useMemo, useState } from 'react';
import '../styles/extras.css';

const GH = 'Fazalmanat';
const LC = 'Fazalrmanat';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function useJson(url) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 12000);
    fetch(url, { signal: ac.signal })
      .then((r) => { if (!r.ok) throw new Error('bad'); return r.json(); })
      .then((data) => setState({ status: 'ok', data }))
      .catch(() => setState({ status: 'error' }))
      .finally(() => clearTimeout(t));
    return () => { ac.abort(); clearTimeout(t); };
  }, [url]);
  return state;
}

function monthly(contribs) {
  const now = new Date();
  const buckets = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    buckets.push({ key: d.toISOString().slice(0, 7), label: MONTHS[d.getUTCMonth()], count: 0 });
  }
  const map = Object.fromEntries(buckets.map((b) => [b.key, b]));
  contribs.forEach((c) => { const b = map[c.date.slice(0, 7)]; if (b) b.count += c.count; });
  return buckets;
}

export default function PistaActivity() {
  const gh = useJson(`https://github-contributions-api.jogruber.de/v4/${GH}?y=last`);
  const lc = useJson(`https://alfa-leetcode-api.onrender.com/${LC}/solved`);

  const months = useMemo(() => (gh.status === 'ok' ? monthly(gh.data.contributions || []) : []), [gh]);
  const ghTotal = months.reduce((a, m) => a + m.count, 0);
  const ghMax = Math.max(1, ...months.map((m) => m.count));
  const levels = lc.status === 'ok' ? [['Easy', lc.data.easySolved], ['Medium', lc.data.mediumSolved], ['Hard', lc.data.hardSolved]] : [];
  const lcMax = Math.max(1, ...levels.map(([, n]) => n || 0));

  return (
    <section id="activity" style={{ padding: '36px 0' }}>
      <div className="pista-container">
        <div className="section-header-simple compact"><h2>Activity</h2></div>
        <div className="act-box">
          <div className="act-col">
            <div className="act-head"><h3>GitHub</h3><a href={`https://github.com/${GH}`} target="_blank" rel="noopener noreferrer">Profile ↗</a></div>
            {gh.status === 'loading' && <p className="act-note">Loading…</p>}
            {gh.status === 'error' && <p className="act-note">Couldn't load live numbers right now.</p>}
            {gh.status === 'ok' && (
              <>
                <div className="act-big">{ghTotal}<span>contributions, last 12 months</span></div>
                <div className="act-bars" role="img" aria-label="Contributions per month">
                  {months.map((m) => (
                    <div className="act-bar-col" key={m.key}>
                      <span className="act-bar-num">{m.count}</span>
                      <div className="act-bar-track"><div className="act-bar" style={{ height: `${Math.max(3, (m.count / ghMax) * 100)}%` }} /></div>
                      <span className="act-bar-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="act-col">
            <div className="act-head"><h3>LeetCode</h3><a href={`https://leetcode.com/u/${LC}`} target="_blank" rel="noopener noreferrer">Profile ↗</a></div>
            {lc.status === 'loading' && <p className="act-note">Loading…</p>}
            {lc.status === 'error' && <p className="act-note">Couldn't load live numbers right now.</p>}
            {lc.status === 'ok' && (
              <>
                <div className="act-big">{lc.data.solvedProblem}<span>problems solved</span></div>
                <div className="act-rows">
                  {levels.map(([name, n]) => (
                    <div className="act-row" key={name}>
                      <span>{name}</span>
                      <div className="act-hbar"><i style={{ width: `${Math.max(2, ((n || 0) / lcMax) * 100)}%` }} /></div>
                      <b>{n}</b>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}