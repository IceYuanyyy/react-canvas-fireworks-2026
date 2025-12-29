import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Particle, Firework, Point } from '../types';

export interface FireworksCanvasHandle {
  triggerNumberBurst: (text: string) => void;
}

interface FireworksCanvasProps {
  phase?: 'waiting' | 'counting' | 'celebrating';
}

const FireworksCanvas = forwardRef<FireworksCanvasHandle, FireworksCanvasProps>(({ phase = 'waiting' }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const hueRef = useRef<number>(Math.random() * 360);
  const timerTickRef = useRef<number>(0);

  function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const calculateDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const createFirework = (sx: number, sy: number, tx: number, ty: number) => {
    // Force vertical or near-vertical trajectory by keeping tx close to sx
    const horizontalVariance = random(-15, 15);
    const adjustedTx = sx + horizontalVariance;

    const fw: Firework = {
      x: sx,
      y: sy,
      targetX: adjustedTx,
      targetY: ty,
      distanceToTarget: calculateDistance({ x: sx, y: sy }, { x: adjustedTx, y: ty }),
      distanceTraveled: 0,
      coordinates: Array.from({ length: 8 }, () => ({ x: sx, y: sy })), // Longer streak for rocket
      coordinateCount: 8,
      angle: Math.atan2(ty - sy, adjustedTx - sx),
      speed: 1.5,
      acceleration: 1.05,
      brightness: random(60, 90),
      targetRadius: 1,
      hue: hueRef.current
    };
    fireworksRef.current.push(fw);
  };

  const createShapeParticles = useCallback((text: string, x: number, y: number, hue: number, sizeMult: number = 1, isCountdown: boolean = false) => {
    const offscreenCanvas = document.createElement('canvas');
    const offCtx = offscreenCanvas.getContext('2d')!;
    
    let fontSize = text.length > 2 ? 100 : 200; 
    if (isCountdown) fontSize /= 2;

    offCtx.font = `bold ${fontSize}px Orbitron`;
    const metrics = offCtx.measureText(text);
    offscreenCanvas.width = metrics.width + 60;
    offscreenCanvas.height = fontSize + 60;
    offCtx.fillStyle = 'white';
    offCtx.font = `bold ${fontSize}px Orbitron`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(text, offscreenCanvas.width / 2, offscreenCanvas.height / 2);

    const imgData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;
    const step = isCountdown ? 1 : 2; 
    
    // Orange-Red (Hue 15) for countdown
    const colorStr = isCountdown ? `hsla(15, 100%, 60%, 1)` : `hsla(${hue}, 100%, 75%, 1)`;

    for (let i = 0; i < offscreenCanvas.height; i += step) {
      for (let j = 0; j < offscreenCanvas.width; j += step) {
        const idx = (i * offscreenCanvas.width + j) * 4;
        if (imgData[idx + 3] > 128) {
          particlesRef.current.push({
            x, y,
            vx: (j - offscreenCanvas.width / 2) * 0.4 * sizeMult + random(-1.5, 1.5),
            vy: (i - offscreenCanvas.height / 2) * 0.4 * sizeMult + random(-1.5, 1.5),
            alpha: 1,
            color: colorStr,
            size: isCountdown ? random(1, 2.5) : random(2, 5),
            decay: isCountdown ? random(0.006, 0.012) : random(0.003, 0.007),
            gravity: 0.02,
            friction: 0.97
          });
        }
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    triggerNumberBurst: (text: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Centered explosion for the countdown
      createShapeParticles(text, canvas.width / 2, canvas.height / 2, 0, 0.5, true);
    }
  }));

  const createParticles = (x: number, y: number, hue: number, type: 'normal' | 'text' = 'normal') => {
    if (type === 'text' && phase === 'celebrating') {
      createShapeParticles("2026", x, y, hue, 0.5, false);
      return;
    }

    // Increased count and spread for "stunning" effect
    let particleCount = phase === 'celebrating' ? 250 : 150; 
    const isGlitter = Math.random() > 0.6;

    while (particleCount--) {
      const angle = random(0, Math.PI * 2);
      const speed = random(1, phase === 'celebrating' ? 22 : 15);
      
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: `hsla(${hue + random(-20, 20)}, 100%, ${random(50, 90)}%, 1)`,
        size: random(1, 4.5),
        decay: random(0.007, 0.015),
        gravity: 0.07,
        friction: 0.93
      });

      // Add "shimmer/glitter" particles
      if (Math.random() > 0.7) {
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed * 0.6,
          vy: Math.sin(angle) * speed * 0.6,
          alpha: 1,
          color: isGlitter ? `hsla(45, 100%, 85%, 1)` : `hsla(0, 0%, 100%, 1)`, // Gold or Silver
          size: random(0.5, 2),
          decay: random(0.002, 0.006),
          gravity: 0.03,
          friction: 0.98
        });
      }
    }
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    requestAnimationFrame(animate);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Slower trail fade
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    hueRef.current += 1.0;

    // Update & Draw Fireworks (Rising Rockets)
    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      const fw = fireworksRef.current[i];
      fw.coordinates.pop();
      fw.coordinates.unshift({ x: fw.x, y: fw.y });

      fw.speed *= fw.acceleration;
      const vx = Math.cos(fw.angle) * fw.speed;
      const vy = Math.sin(fw.angle) * fw.speed;
      fw.distanceTraveled += Math.sqrt(vx * vx + vy * vy);

      // Rocket ascent trail particles - denser for "stunning" effect
      if (Math.random() > 0.3) {
        particlesRef.current.push({
          x: fw.x,
          y: fw.y,
          vx: random(-0.8, 0.8),
          vy: random(1, 4),
          alpha: 0.6,
          color: `hsla(${fw.hue}, 100%, 80%, 1)`,
          size: random(1, 2),
          decay: 0.04,
          gravity: 0.08,
          friction: 0.85
        });
      }

      if (fw.distanceTraveled >= fw.distanceToTarget) {
        const particleType = (phase === 'celebrating' && Math.random() > 0.88) ? 'text' : 'normal';
        createParticles(fw.targetX, fw.targetY, fw.hue, particleType);
        fireworksRef.current.splice(i, 1);
      } else {
        fw.x += vx;
        fw.y += vy;
        
        ctx.beginPath();
        ctx.moveTo(fw.coordinates[fw.coordinates.length - 1].x, fw.coordinates[fw.coordinates.length - 1].y);
        ctx.lineTo(fw.x, fw.y);
        ctx.strokeStyle = `hsl(${fw.hue}, 100%, ${fw.brightness}%)`;
        ctx.lineWidth = 3; // Thicker rising line
        ctx.stroke();
      }
    }

    // Update & Draw Particles (Explosions)
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= p.decay) {
        particlesRef.current.splice(i, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Add a subtle "shimmer" to long-lived particles
        const renderAlpha = p.decay < 0.005 ? p.alpha * (0.8 + Math.sin(Date.now() * 0.02) * 0.2) : p.alpha;
        ctx.fillStyle = p.color.replace('1)', `${renderAlpha})`);
        ctx.fill();
      }
    }

    // Auto Launch logic
    timerTickRef.current++;
    
    let threshold = 25; 
    if (phase === 'counting') threshold = 8; 
    if (phase === 'celebrating') threshold = 5; 

    if (timerTickRef.current >= threshold) {
      // Launch from more varied positions across the bottom
      const sx = random(50, canvas.width - 50);
      const sy = canvas.height;
      // Target height - higher for more impressive scale
      const ty = random(50, canvas.height * 0.6);
      createFirework(sx, sy, sx, ty); // Passing same sx to tx for verticality
      timerTickRef.current = 0;
    }
  }, [phase, createShapeParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(animate);

    const handleClick = (e: MouseEvent) => {
      const launchCount = phase === 'celebrating' ? 12 : 6;
      for(let i=0; i<launchCount; i++) {
        setTimeout(() => {
          const sx = e.clientX + random(-100, 100);
          createFirework(sx, canvas.height, sx, e.clientY + random(-50, 50));
        }, i * 80);
      }
    };

    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [animate, phase]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block w-full h-full cursor-crosshair z-0"
    />
  );
});

export default FireworksCanvas;