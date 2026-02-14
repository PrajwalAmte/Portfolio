import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

const DARK_MODE_CONFIG = {
  PARTICLE_COUNT: 15000,
  MIN_RADIUS: 1.5,
  MAX_RADIUS: 6,
  SPIRAL_BRANCHES: 5,
  SPIRAL_TIGHTNESS: 1.5,
  ROTATION_SPEED: 0.001,
  CAMERA_TILT_X: -0.02,
  CAMERA_TILT_Z: 0.55,
  COLORS: {
    YELLOW: 0xffff00,
    GOLD: 0xffd700,
    ORANGE: 0xffa500,
    DARK_ORANGE: 0xff8c00,
    RED_ORANGE: 0xff6b35,
  },
};

const LIGHT_MODE_CONFIG = {
  NODE_COUNT: 150,
  MIN_RADIUS: 6,
  MAX_RADIUS: 16,
  CONNECTION_DISTANCE: 5.5,
  ROTATION_SPEED: 0.0003,
  COLORS: {
    DARK_BLUE: 0x003d7a,
    MEDIUM_BLUE: 0x004d94,
    BLUE: 0x0059a8,
  },
};

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    if (theme === 'dark') {
      camera.rotation.x = DARK_MODE_CONFIG.CAMERA_TILT_X;
      camera.rotation.z = DARK_MODE_CONFIG.CAMERA_TILT_Z;
    }

    let particles: THREE.Points;
    let geometry: THREE.BufferGeometry;
    let material: THREE.PointsMaterial;

    const createDarkModeParticles = () => {
      const { PARTICLE_COUNT, MIN_RADIUS, MAX_RADIUS, SPIRAL_BRANCHES, SPIRAL_TIGHTNESS } = DARK_MODE_CONFIG;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);

      const colorPalette = [
        new THREE.Color(DARK_MODE_CONFIG.COLORS.GOLD),
        new THREE.Color(DARK_MODE_CONFIG.COLORS.ORANGE),
        new THREE.Color(DARK_MODE_CONFIG.COLORS.DARK_ORANGE),
        new THREE.Color(DARK_MODE_CONFIG.COLORS.RED_ORANGE),
        new THREE.Color(DARK_MODE_CONFIG.COLORS.YELLOW),
      ];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
        const spinAngle = radius * SPIRAL_TIGHTNESS;
        const branchAngle = ((i % SPIRAL_BRANCHES) / SPIRAL_BRANCHES) * Math.PI * 2;

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2;
        const randomY = Math.pow(Math.random(), 6) * (Math.random() < 0.5 ? 1 : -1) * 0.08;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const distanceRatio = (radius - MIN_RADIUS) / (MAX_RADIUS - MIN_RADIUS);
        const colorIndex = Math.floor(distanceRatio * (colorPalette.length - 1));
        const color = colorPalette[colorIndex];
        const opacity = 1.0 - distanceRatio * 0.2;

        colors[i3] = color.r * opacity;
        colors[i3 + 1] = color.g * opacity;
        colors[i3 + 2] = color.b * opacity;

        sizes[i] = Math.random() * 2.5 + 0.5;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
      });
    };

    const createLightModeParticles = () => {
      const { NODE_COUNT, MIN_RADIUS, MAX_RADIUS, CONNECTION_DISTANCE } = LIGHT_MODE_CONFIG;
      const positions = new Float32Array(NODE_COUNT * 3);
      const colors = new Float32Array(NODE_COUNT * 3);
      const sizes = new Float32Array(NODE_COUNT);

      const networkColors = [
        new THREE.Color(LIGHT_MODE_CONFIG.COLORS.DARK_BLUE),
        new THREE.Color(LIGHT_MODE_CONFIG.COLORS.MEDIUM_BLUE),
        new THREE.Color(LIGHT_MODE_CONFIG.COLORS.BLUE),
      ];

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        const color = networkColors[Math.floor(Math.random() * networkColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 1.5 + 1;
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });

      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const lineColor = new THREE.Color(LIGHT_MODE_CONFIG.COLORS.DARK_BLUE);

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        const x1 = positions[i3];
        const y1 = positions[i3 + 1];
        const z1 = positions[i3 + 2];

        for (let j = i + 1; j < NODE_COUNT; j++) {
          const j3 = j * 3;
          const x2 = positions[j3];
          const y2 = positions[j3 + 1];
          const z2 = positions[j3 + 2];

          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);

          if (distance < CONNECTION_DISTANCE) {
            linePositions.push(x1, y1, z1, x2, y2, z2);
            lineColors.push(lineColor.r, lineColor.g, lineColor.b);
            lineColors.push(lineColor.r, lineColor.g, lineColor.b);
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);
      (geometry as any).lines = lines;
    };

    const createParticles = () => {
      if (particles) {
        const lines = (geometry as any).lines;
        if (lines) {
          scene.remove(lines);
          lines.geometry.dispose();
          (lines.material as THREE.Material).dispose();
        }
        scene.remove(particles);
        geometry.dispose();
        material.dispose();
      }

      if (theme === 'dark') {
        createDarkModeParticles();
      } else {
        createLightModeParticles();
      }

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
    };

    createParticles();

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (particles) {
        if (theme === 'dark') {
          particles.rotation.y += DARK_MODE_CONFIG.ROTATION_SPEED;
          particles.rotation.x = -0.5 + mouseY * 0.1;
          particles.rotation.z = 0.15 + mouseX * 0.05;
        } else {
          particles.rotation.y += LIGHT_MODE_CONFIG.ROTATION_SPEED;
          particles.rotation.x = mouseY * 0.2;
          particles.rotation.z = mouseX * 0.2;

          const lines = (geometry as any).lines;
          if (lines) {
            lines.rotation.y += LIGHT_MODE_CONFIG.ROTATION_SPEED;
            lines.rotation.x = mouseY * 0.2;
            lines.rotation.z = mouseX * 0.2;
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (particles) {
        const lines = (geometry as any).lines;
        if (lines) {
          scene.remove(lines);
          lines.geometry.dispose();
          (lines.material as THREE.Material).dispose();
        }
        scene.remove(particles);
        geometry.dispose();
        material.dispose();
      }
      renderer.dispose();
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
