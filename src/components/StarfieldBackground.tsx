import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

interface Wave {
  y: number;
  length: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const initParticles = () => {
      const particleCount = theme === 'dark' ? 200 : 100;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (theme === 'dark' ? 0.3 : 0.5),
        vy: (Math.random() - 0.5) * (theme === 'dark' ? 0.3 : 0.5),
        radius: Math.random() * (theme === 'dark' ? 2.5 : 3) + (theme === 'dark' ? 0.5 : 1),
        opacity: Math.random() * 0.5 + (theme === 'dark' ? 0.4 : 0.3),
        hue: Math.random() * 60 + 180, // Blue-cyan range
      }));
    };

    // Initialize waves
    const initWaves = () => {
      wavesRef.current = [
        { y: canvas.height * 0.3, length: 0.02, amplitude: 30, frequency: 0.002, phase: 0 },
        { y: canvas.height * 0.5, length: 0.015, amplitude: 40, frequency: 0.0015, phase: Math.PI },
        { y: canvas.height * 0.7, length: 0.025, amplitude: 25, frequency: 0.0025, phase: Math.PI * 0.5 },
      ];
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initWaves();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const drawWave = (wave: Wave, time: number) => {
      ctx.beginPath();
      
      const wavelength = canvas.width * wave.length;
      const phase = wave.phase + time * wave.frequency;
      
      for (let x = 0; x <= canvas.width; x += 2) {
        const y = wave.y + Math.sin((x * Math.PI * 2) / wavelength + phase) * wave.amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      if (theme === 'dark') {
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1})`;
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = `rgba(0, 102, 204, ${0.08})`;
        ctx.lineWidth = 1.5;
      }
      
      ctx.stroke();
    };

    const drawConnectionLines = () => {
      const maxDistance = 150;
      
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            if (theme === 'dark') {
              ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(0, 102, 204, ${opacity * 0.5})`;
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        if (theme === 'dark') {
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 3
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 70%, 0)`);
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = `rgba(0, 102, 204, ${particle.opacity * 0.6})`;
        }
        
        ctx.fill();

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.1;
          particle.vy -= (dy / distance) * force * 0.1;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    };

    const drawGrid = () => {
      const gridSize = 50;
      ctx.strokeStyle = theme === 'dark' 
        ? 'rgba(0, 240, 255, 0.03)' 
        : 'rgba(0, 102, 204, 0.02)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    let time = 0;

    const animate = () => {
      // Clear canvas with slight trail effect
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      } else {
        ctx.fillStyle = 'rgba(250, 251, 255, 0.1)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      drawGrid();

      // Draw connection lines between particles
      drawConnectionLines();

      // Draw particles
      drawParticles();

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: theme === 'dark' ? '#0a0a0f' : '#fafbff' }}
    />
  );
}
