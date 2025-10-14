import { useEffect, useMemo, useRef, useState } from 'react';
import CosmicField from './components/CosmicField.jsx';
import ModeDeck from './components/ModeDeck.jsx';

const persona = {
  tag: 'access granted · secure shell active',
  name: 'Roman Rublev',
  alias: '@rmnrblv',
  occupation: 'Backend Engineer · Network Wrangler',
  summary:
    'Designing resilient Node.js + TypeScript services with clean architecture, automated pipelines, and battle-tested observability. Enthusiastic about networking, security, and shaping expressive developer tooling with a designer’s eye.'
};

const modes = [
  {
    id: 'now',
    label: 'Ops',
    meta: 'current breach',
    headline: 'Hardening critical paths while executing stealth releases.',
    copy: 'Scaling TypeScript-first services, maintaining edge-friendly architectures, and shipping features behind precise feature flags with zero regression leakage.',
    items: [
      { title: 'ZiP VPN Core', meta: 'secure gateway and orchestration' },
      { title: 'ZiP Infra Mesh', meta: 'distributed networking backbone' },
      { title: 'Teleport Hooks', meta: 'zero downtime rollout layer' }
    ]
  },
  {
    id: 'lab',
    label: 'Lab',
    meta: 'deep prototype',
    headline: 'Interrogating new runtimes and composing unconventional interfaces.',
    copy: 'Experimenting with Telegram bot frameworks, runtime instrumentation, and design-forward dashboards that align backend telemetry with friendly visuals.',
    items: [
      { title: 'Courier Botnet', meta: 'Telegram automations toolkit' },
      { title: 'Trace Studio', meta: 'React/Vite ops console sketches' },
      { title: 'Packet Playground', meta: 'network protocol sandboxes' }
    ]
  },
  {
    id: 'field',
    label: 'Field',
    meta: 'dispatches',
    headline: 'Supporting crews shipping fast while staying uncompromised.',
    copy: 'Partnering with teams to review security posture, tune backend performance, and translate complex systems into minimal, human-friendly interfaces.',
    items: [
      { title: 'Circuit Watch', meta: 'runtime observability playbook' },
      { title: 'Zero Day Guide', meta: 'incident-ready response loops' },
      { title: 'Ghost Choir', meta: 'async pairing rotations' }
    ]
  }
];

const skills = [
  'Node.js',
  'TypeScript',
  'React',
  'Vite',
  'Design',
  'Networking',
  'Cybersecurity',
  'Chatbots'
];

export default function App() {
  const [activeModeId, setActiveModeId] = useState(modes[0].id);
  const [statusIndex, setStatusIndex] = useState(0);
  const holoRef = useRef(null);
  const statusPhrases = useMemo(
    () => [
      'latency nominal',
      'cipher rotating',
      'kernel quiet',
      'stack patched'
    ],
    []
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((previous) => (previous + 1) % statusPhrases.length);
    }, 2200);
    return () => {
      window.clearInterval(interval);
    };
  }, [statusPhrases.length]);

  useEffect(() => {
    const element = holoRef.current;
    if (!element) return undefined;

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    if (!finePointerQuery.matches) {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--glow-x', '50%');
      element.style.setProperty('--glow-y', '30%');
      return undefined;
    }

    const handlePointer = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty('--tilt-x', `${y * -10}deg`);
      element.style.setProperty('--tilt-y', `${x * 12}deg`);
      element.style.setProperty('--glow-x', `${x * 40}%`);
      element.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
    };

    const resetTilt = () => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--glow-x', '50%');
      element.style.setProperty('--glow-y', '30%');
    };

    element.addEventListener('pointermove', handlePointer);
    element.addEventListener('pointerleave', resetTilt);
    element.addEventListener('pointerup', resetTilt);

    return () => {
      element.removeEventListener('pointermove', handlePointer);
      element.removeEventListener('pointerleave', resetTilt);
      element.removeEventListener('pointerup', resetTilt);
    };
  }, []);

  return (
    <div className="app-shell">
      <CosmicField />
      <main className="holo-card" ref={holoRef}>
        <div className="holo-card__aurora" aria-hidden="true" />
        <header className="holo-card__header">
          <div className="holo-card__tag">
            <span className="holo-card__tag-dot" />
            {persona.tag}
          </div>
          <div className="holo-card__identity">
            <div className="holo-card__identity-header">
              <h1 className="holo-card__title">{persona.name}</h1>
              <span className="holo-card__alias">{persona.alias}</span>
            </div>
            <p className="holo-card__role">{persona.occupation}</p>
            <p className="holo-card__summary">{persona.summary}</p>
          </div>
        </header>
        <section className="holo-card__status">
          <div className="status-beam">
            <span className="status-beam__label">system status</span>
            <span className="status-beam__value">
              {statusPhrases[statusIndex]}
            </span>
            <span className="status-beam__orb" aria-hidden="true" />
          </div>
        </section>
        <section className="skill-cluster" aria-label="Skill matrix">
          <h2 className="skill-cluster__label">skill matrix</h2>
          <ul className="skill-cluster__list">
            {skills.map((skill) => (
              <li key={skill}>
                <span className="skill-cluster__bullet" aria-hidden="true" />
                {skill}
              </li>
            ))}
          </ul>
        </section>
        <ModeDeck
          modes={modes}
          activeModeId={activeModeId}
          onSelect={setActiveModeId}
        />
        <footer className="holo-card__footer">
          <div className="cta-links">
            <a href="mailto:dev@rmnrblv.com">
              <svg
                className="cta-links__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25Zm2-.25a.75.75 0 0 0-.75.75v.3l8 4.8 8-4.8v-.3a.75.75 0 0 0-.75-.75Z"
                />
                <path d="M20.5 9.63 13.03 14a1.75 1.75 0 0 1-1.82 0L3.5 9.63v7.62c0 .414.336.75.75.75h12.5c.414 0 .75-.336.75-.75Z" />
              </svg>
              <span>Email</span>
            </a>
            <a
              href="https://github.com/romanrublev"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="cta-links__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.53 1.02 1.53 1.02.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.02-2.69-.1-.25-.44-1.28.1-2.67 0 0 .83-.27 2.72 1.02a9.47 9.47 0 0 1 4.95 0c1.89-1.29 2.72-1.02 2.72-1.02.54 1.39.2 2.42.1 2.67.63.7 1.02 1.6 1.02 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
                />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rmnrblv"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="cta-links__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10.25H5.9v8.18h2.45v-8.18Zm-.23-2.89a1.43 1.43 0 1 0-2.86 0 1.43 1.43 0 0 0 2.86 0ZM18.1 18.43v-4.42c0-2.36-1.26-3.46-2.95-3.46-1.36 0-1.97.75-2.31 1.27v-1.09H10.4c.03.72 0 8.7 0 8.7h2.45v-4.86c0-.26.02-.51.1-.69.22-.51.7-1.05 1.51-1.05 1.06 0 1.49.79 1.49 1.95v4.65h2.15Z"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/rmnrblv"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="cta-links__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 7.35A4.65 4.65 0 1 0 12 16.64a4.65 4.65 0 0 0 0-9.29Zm0 7.48a2.83 2.83 0 1 1 0-5.65 2.83 2.83 0 0 1 0 5.65Z"
                />
                <path
                  d="M17.55 2H6.45A4.46 4.46 0 0 0 2 6.45v11.1A4.46 4.46 0 0 0 6.45 22h11.1A4.46 4.46 0 0 0 22 17.55V6.45A4.46 4.46 0 0 0 17.55 2Zm2.64 15.55a2.65 2.65 0 0 1-2.64 2.64H6.45a2.65 2.65 0 0 1-2.64-2.64V6.45A2.65 2.65 0 0 1 6.45 3.8h11.1a2.65 2.65 0 0 1 2.64 2.64v11.11Z"
                />
                <circle cx="17.66" cy="6.35" r="1.1" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
