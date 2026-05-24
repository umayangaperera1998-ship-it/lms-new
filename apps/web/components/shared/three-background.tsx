"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear canvas child nodes to prevent duplicate canvases
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    // Group to hold particles and lines
    const group = new THREE.Group();
    scene.add(group);

    // Configuration
    const maxParticles = 90;
    const minDistance = 1.1;

    // Particle Positions and Velocities
    const positions = new Float32Array(maxParticles * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < maxParticles; i++) {
      // Place randomly in a 3D box
      positions[i * 3] = (Math.random() - 0.5) * 8; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z

      velocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: (Math.random() - 0.5) * 0.006,
        z: (Math.random() - 0.5) * 0.006,
      });
    }

    // Create Particles System
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create Circle Texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Standard Points material with circular texture map
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6366f1, // Indigo
      size: 0.18,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      map: texture,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particleSystem);

    // Create Line Segments System for Constellation
    const linePositions = new Float32Array(maxParticles * maxParticles * 6);
    const lineColors = new Float32Array(maxParticles * maxParticles * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.NormalBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    // Resize handler
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // 1. Move particles
      const positionsArr = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < maxParticles; i++) {
        const i3 = i * 3;

        positionsArr[i3] += velocities[i].x;
        positionsArr[i3 + 1] += velocities[i].y;
        positionsArr[i3 + 2] += velocities[i].z;

        // Bounce back if they go out of bounds
        if (Math.abs(positionsArr[i3]) > 4) velocities[i].x *= -1;
        if (Math.abs(positionsArr[i3 + 1]) > 4) velocities[i].y *= -1;
        if (Math.abs(positionsArr[i3 + 2]) > 4) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // 2. Generate line connections dynamically
      let lineCount = 0;
      const linePosArr = lineGeometry.attributes.position.array as Float32Array;
      const lineColArr = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < maxParticles; i++) {
        const i3 = i * 3;
        const x1 = positionsArr[i3];
        const y1 = positionsArr[i3 + 1];
        const z1 = positionsArr[i3 + 2];

        for (let j = i + 1; j < maxParticles; j++) {
          const j3 = j * 3;
          const x2 = positionsArr[j3];
          const y2 = positionsArr[j3 + 1];
          const z2 = positionsArr[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < minDistance) {
            const lpIdx = lineCount * 6;

            // Vertex 1 position
            linePosArr[lpIdx] = x1;
            linePosArr[lpIdx + 1] = y1;
            linePosArr[lpIdx + 2] = z1;

            // Vertex 2 position
            linePosArr[lpIdx + 3] = x2;
            linePosArr[lpIdx + 4] = y2;
            linePosArr[lpIdx + 5] = z2;

            // Fade lines based on proximity
            const alpha = 1.0 - dist / minDistance;

            // Apply Indigo-to-Violet gradient alpha
            // Vertex 1 Color
            lineColArr[lpIdx] = 0.388 * alpha; // Red
            lineColArr[lpIdx + 1] = 0.4 * alpha; // Green
            lineColArr[lpIdx + 2] = 0.945 * alpha; // Blue

            // Vertex 2 Color
            lineColArr[lpIdx + 3] = 0.49 * alpha; // Red
            lineColArr[lpIdx + 4] = 0.28 * alpha; // Green
            lineColArr[lpIdx + 5] = 0.95 * alpha; // Blue

            lineCount++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // 3. Rotate Group over time (automatic spin animation)
      group.rotation.y = elapsedTime * 0.04;
      group.rotation.x = elapsedTime * 0.025;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      texture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[1] pointer-events-none opacity-50 dark:opacity-35" 
    />
  );
}
