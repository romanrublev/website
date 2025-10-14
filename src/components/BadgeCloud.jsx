import { useEffect, useMemo, useRef } from 'react';

export default function BadgeCloud({ badges }) {
  const containerRef = useRef(null);
  const seeds = useMemo(
    () =>
      badges.map(() => ({
        angle: Math.random() * Math.PI * 2,
        radius: 110 + Math.random() * 90,
        speed: 0.0008 + Math.random() * 0.0014,
        heightOffset: (Math.random() - 0.5) * 70
      })),
    [badges]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    let animationFrame = null;
    let reduction = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = 0;

    const render = (timestamp) => {
      time = timestamp;
      badges.forEach((_, index) => {
        const badge = element.children.item(index);
        if (!badge) return;
        const { angle, radius, speed, heightOffset } = seeds[index];
        const currentAngle = angle + time * speed;
        const x = Math.cos(currentAngle) * radius;
        const y = Math.sin(currentAngle) * radius * 0.4 + heightOffset;
        const z = Math.sin(currentAngle * 0.8) * 40;
        const scale = 1 + z / 240;
        badge.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        badge.style.opacity = String(0.45 + (z + 40) / 160);
      });
      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (reduction) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(render);
    };

    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      badges.forEach((_, index) => {
        const badge = element.children.item(index);
        if (!badge) return;
        badge.style.transform = '';
        badge.style.opacity = '';
      });
    };

    start();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotion = (event) => {
      reduction = event.matches;
      if (reduction) {
        stop();
      } else {
        start();
      }
    };

    mediaQuery.addEventListener('change', handleMotion);

    return () => {
      mediaQuery.removeEventListener('change', handleMotion);
      stop();
    };
  }, [badges, seeds]);

  return (
    <div className="badge-cloud" ref={containerRef} aria-hidden="true">
      {badges.map((badge) => (
        <span key={badge.label} className="badge-cloud__badge">
          <span className="badge-cloud__glow" />
          {badge.label}
        </span>
      ))}
    </div>
  );
}
