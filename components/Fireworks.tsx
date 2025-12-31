
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  color: string;
  speed: number;
  particles: Particle[];
  exploded: boolean;
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fireworks: Firework[] = [];
    const colors = ['#ff0000', '#ffd700', '#ff4500', '#00ff00', '#00ffff', '#ff00ff'];

    const createFirework = () => {
      const x = Math.random() * width;
      const y = height;
      const targetY = Math.random() * height * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworks.push({
        x,
        y,
        targetY,
        color,
        speed: 3 + Math.random() * 3,
        particles: [],
        exploded: false,
      });
    };

    const explode = (firework: Firework) => {
      const particleCount = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: firework.color,
          size: Math.random() * 3 + 1,
        });
      }
      firework.exploded = true;
    };

    const update = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.05) createFirework();

      fireworks.forEach((f, index) => {
        if (!f.exploded) {
          f.y -= f.speed;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();

          if (f.y <= f.targetY) {
            explode(f);
          }
        } else {
          f.particles.forEach((p, pIndex) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = f.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;

            if (p.alpha <= 0) {
              f.particles.splice(pIndex, 1);
            }
          });

          if (f.particles.length === 0) {
            fireworks.splice(index, 1);
          }
        }
      });

      requestAnimationFrame(update);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default Fireworks;
