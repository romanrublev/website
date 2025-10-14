import { useEffect, useRef } from 'react';

const glyphs = '0123456789abcdef{}[]#@$%&*+=<>?/\\|';
const clampDpr = () => Math.min(window.devicePixelRatio || 1, 2);

export default function CosmicField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let columns = [];
    let animationFrame = null;
    let reduction = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const columnWidth = 16;

    const resize = () => {
      const dpr = clampDpr();
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '16px "Share Tech Mono", monospace';
      ctx.textBaseline = 'top';

      const columnCount = Math.ceil(width / columnWidth);
      columns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * columnWidth,
        y: Math.random() * height,
        speed: 70 + Math.random() * 120
      }));
    };

    const draw = (delta) => {
      ctx.fillStyle = 'rgba(3, 6, 4, 0.18)';
      ctx.fillRect(0, 0, width, height);

      columns.forEach((column) => {
        column.y += (column.speed * delta) / 1000;
        if (column.y > height + 40) {
          column.y = -Math.random() * 120;
          column.speed = 70 + Math.random() * 120;
        }

        const glyph = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        ctx.fillStyle = `rgba(57, 255, 20, ${0.45 + Math.random() * 0.55})`;
        ctx.fillText(glyph, column.x, column.y);

        if (Math.random() > 0.92) {
          ctx.fillStyle = 'rgba(20, 198, 122, 0.1)';
          ctx.fillRect(column.x, column.y - 2, columnWidth, columnWidth);
        }
      });
    };

    let last = performance.now();
    resize();

    const render = (timestamp) => {
      const delta = Math.min(timestamp - last, 120);
      last = timestamp;
      draw(delta);
      animationFrame = requestAnimationFrame(render);
    };

    const start = () => {
      if (reduction) return;
      cancelAnimationFrame(animationFrame);
      last = performance.now();
      animationFrame = requestAnimationFrame(render);
    };

    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      ctx.clearRect(0, 0, width, height);
    };

    start();

    const handleResize = () => {
      resize();
      if (!reduction) start();
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotion = (event) => {
      reduction = event.matches;
      if (reduction) {
        stop();
      } else {
        resize();
        start();
      }
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotion);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotion);
      stop();
    };
  }, []);

  return <canvas ref={canvasRef} className="cosmic-field" aria-hidden="true" />;
}
