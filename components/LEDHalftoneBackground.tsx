'use client';

import { useEffect, useRef, useState } from 'react';
import { perlinNoise } from '@/utils/perlin-noise';

interface LEDHalftoneBackgroundProps {
  className?: string;
}

/**
 * LED Halftone Background Component
 *
 * Creates a living, breathing LED panel backdrop with halftone dots.
 * Features:
 * - Dark charcoal center with fiery orange edge accents
 * - Slow, swooning perlin noise movement (60-90 second cycles)
 * - Position-based color zones: edges glow with fire, center stays calm and dark
 * - Text zones always render in dark charcoal tones
 * - Responsive dot scaling
 * - High performance with RAF and visibility API
 */
export default function LEDHalftoneBackground({ className = '' }: LEDHalftoneBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Page Visibility API - pause animation when tab is inactive
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;

    // Responsive dot spacing - BIGGER DOTS
    const getOptimalDotSpacing = () => {
      const width = window.innerWidth;
      if (width < 768) return 18; // Mobile: lighter pattern, bigger dots
      if (width < 1024) return 14; // Tablet: medium density, bigger dots
      return 10; // Desktop: bigger, more visible dots
    };

    let dotSpacing = getOptimalDotSpacing();

    // Resize canvas to fill screen
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Update dot spacing on resize
      dotSpacing = getOptimalDotSpacing();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color palette - fiery gradients
    const fireColors = {
      brightOrange: '#ff6b1a',
      redOrange: '#ff3d00',
      yellow: '#ffb347',
      vhsOrange: 'hsl(17, 85%, 62%)', // Brand color
    };

    const darkColors = {
      charcoal: '#1a1a1a',
      deepBlack: '#0a0a0a',
    };

    // Animation state
    let time = 0;
    const animationSpeed = prefersReducedMotion ? 0 : 0.0003; // Slow, swooning movement

    /**
     * Get color based on smooth flowing blob shapes
     * Strategy: Multiple large blob shapes with internal gradients
     * Creates layered, cloud-like forms with clean edges
     * Inspired by the BG sample - smooth blobs, not noise texture
     */
    const getColorAtPosition = (x: number, y: number, time: number, width: number, height: number): string => {
      // Normalize coordinates to 0-1 range
      const normalizedX = x / width;
      const normalizedY = y / height;

      // Calculate distance from center for masking
      const centerX = 0.5;
      const centerY = 0.45;
      const distanceFromCenter = Math.sqrt(
        Math.pow(normalizedX - centerX, 2) +
        Math.pow(normalizedY - centerY, 2)
      );

      // Center zone radius (area that must stay dark)
      const centerRadius = 0.35;

      // If we're in the center zone, force dark colors
      if (distanceFromCenter < centerRadius) {
        const centerGradient = distanceFromCenter / centerRadius;
        if (centerGradient < 0.5) {
          return darkColors.deepBlack;
        } else {
          return darkColors.charcoal;
        }
      }

      // HORIZONTAL WAVE LAYERS - like ocean waves flowing left to right
      // Stretch noise horizontally (lower x scale) for banded appearance
      const xScale = 0.0002; // Very stretched horizontally
      const yScale = 0.0006; // Tighter vertically = horizontal bands

      // Layer 1 - Primary horizontal wave (NO horizontal drift - only vertical breathing)
      const wave1 = (perlinNoise.noise2D(
        x * xScale,
        y * yScale + time * 0.008
      ) + 1) / 2;

      // Layer 2 - Secondary wave
      const wave2 = (perlinNoise.noise2D(
        x * xScale * 1.2,
        y * yScale * 0.8 + time * 0.006
      ) + 1) / 2;

      // Layer 3 - Slower, larger wave for depth
      const wave3 = (perlinNoise.noise2D(
        x * xScale * 0.6,
        y * yScale * 1.3 + time * 0.004
      ) + 1) / 2;

      // Layer 4 - Detail wave
      const wave4 = (perlinNoise.noise2D(
        x * xScale * 1.5,
        y * yScale * 1.1 + time * 0.005
      ) + 1) / 2;

      // Combine waves - use max for more coverage, then add layers for depth
      // This creates bold overlapping bands
      const maxWave = Math.max(wave1, wave2, wave3, wave4);
      const combined = maxWave * 0.7 + (wave1 + wave2 + wave3) / 3 * 0.3;

      // Lower thresholds - more fire coverage
      if (combined < 0.2) {
        return darkColors.deepBlack;
      } else if (combined < 0.28) {
        return darkColors.charcoal;
      }

      // Calculate intensity within the lit area
      const intensity = (combined - 0.28) / 0.72;

      // Color gradient - smooth transitions with lighter orange highlights
      if (intensity < 0.1) {
        return '#2a1a1a'; // Very dark red-brown edge
      } else if (intensity < 0.2) {
        return '#3a1a1a'; // Dark red-brown
      } else if (intensity < 0.32) {
        return '#4a1a1a'; // Medium dark red-brown
      } else if (intensity < 0.44) {
        return '#6a1a1a'; // Medium dark red
      } else if (intensity < 0.55) {
        return '#8b1a1a'; // Medium red
      } else if (intensity < 0.65) {
        return '#aa2200'; // Bright red
      } else if (intensity < 0.75) {
        return '#cc3300'; // Red-orange
      } else if (intensity < 0.85) {
        return fireColors.redOrange; // Red-orange
      } else if (intensity < 0.93) {
        return fireColors.brightOrange; // Bright orange
      } else {
        return '#ff8844'; // Light orange highlights
      }
    };

    // Mouse interaction removed per user preference

    /**
     * Draw halftone dot at position
     */
    const drawDot = (
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    /**
     * Main animation loop
     */
    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Draw halftone dot pattern
      for (let y = 0; y < height; y += dotSpacing) {
        for (let x = 0; x < width; x += dotSpacing) {
          // Get color based on position relative to edges
          const color = getColorAtPosition(x, y, time, width, height);

          // UNIFORM DOT SIZE - all dots equal, no variation
          // Ensure radius is never negative to prevent IndexSizeError in canvas arc()
          const radius = Math.max(0.1, dotSpacing / 2.5); // Clean, equal-sized dots

          // Draw dot
          drawDot(x, y, radius, color);
        }
      }

      // Increment time for animation
      time += animationSpeed;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
