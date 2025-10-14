import { useEffect, useState } from 'react';

export default function FluxTicker({ phrases, interval = 2400 }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!phrases?.length) return undefined;

    const timeoutIds = { current: null };
    const rotation = setInterval(() => {
      setIsVisible(false);
      timeoutIds.current = window.setTimeout(() => {
        setIndex((previous) => (previous + 1) % phrases.length);
        setIsVisible(true);
      }, 200);
    }, interval);

    return () => {
      clearInterval(rotation);
      window.clearTimeout(timeoutIds.current);
    };
  }, [phrases, interval]);

  if (!phrases?.length) return null;

  return (
    <div className="flux-ticker" aria-live="polite">
      <span className="flux-ticker__label">now streaming</span>
      <div className={`flux-ticker__content ${isVisible ? 'is-visible' : ''}`}>
        <span className="flux-ticker__pulse" aria-hidden="true" />
        <span className="flux-ticker__text">{phrases[index]}</span>
      </div>
    </div>
  );
}
