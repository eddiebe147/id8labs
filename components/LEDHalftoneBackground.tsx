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
     * Check if a point is inside a text zone
     */
    const isInTextZone = (x: number, y: number): boolean => {
      return textZonesRef.current.some((zone) => {
        return (
          x >= zone.left &&
          x <= zone.right &&
          y >= zone.top &&
          y <= zone.bottom
        );
      });
    };

    /**
     * Calculate distance from viewport edges
     * Returns a value 0-1 where 0 = at edge, 1 = center of screen
     */
    const getDistanceFromEdge = (x: number, y: number, width: number, height: number): number => {
      // Calculate distance from nearest edge (normalized 0-1)
      const distanceFromLeft = x / width;
      const distanceFromRight = (width - x) / width;
      const distanceFromTop = y / height;
      const distanceFromBottom = (height - y) / height;

      // Get minimum distance from any edge
      const minDistanceX = Math.min(distanceFromLeft, distanceFromRight);
      const minDistanceY = Math.min(distanceFromTop, distanceFromBottom);
      const edgeDistance = Math.min(minDistanceX, minDistanceY);

      // Square it for smoother falloff toward center
      return edgeDistance * edgeDistance * 2;
    };

    /**
     * Get color based on diagonal position with structured gradient bands
     * Strategy: Diagonal sweep from lower-left to upper-right
     * Center stays dark/black for text readability
     * Fiery colors in bottom-right portion
     */
    const getColorAtPosition = (x: number, y: number, time: number, width: number, height: number): string => {
      // Normalize coordinates to 0-1 range
      const normalizedX = x / width;
      const normalizedY = y / height;

      // Calculate diagonal distance from top-left to bottom-right
      // This creates diagonal gradient bands
      // Add time-based subtle drift for breathing effect
      const timeOffset = Math.sin(time * 0.5) * 0.1; // Subtle breathing
      const diagonalPosition = (normalizedX + (1 - normalizedY)) / 2 + timeOffset;

      // Calculate distance from center for masking
      const centerX = 0.5;
      const centerY = 0.4; // Slightly higher for hero section
      const distanceFromCenter = Math.sqrt(
        Math.pow(normalizedX - centerX, 2) +
        Math.pow(normalizedY - centerY, 2)
      );

      // Center zone radius (area that must stay dark)
      const centerRadius = 0.35;

      // If we're in the center zone, force dark colors
      if (distanceFromCenter < centerRadius) {
        // Gradient within center zone from deep black to charcoal
        const centerGradient = distanceFromCenter / centerRadius;
        if (centerGradient < 0.5) {
          return darkColors.deepBlack;
        } else {
          return darkColors.charcoal;
        }
      }

      // Outside center: use diagonal position for gradient bands
      // Add subtle Perlin noise for organic variation within bands
      const noiseVariation = perlinNoise.noise2D(x * 0.001, y * 0.001) * 0.1;
      const bandPosition = diagonalPosition + noiseVariation;

      // Create distinct color bands sweeping diagonally
      // Black → Charcoal → Dark Red → Red → Orange → Yellow
      if (bandPosition < 0.3) {
        return darkColors.deepBlack;
      } else if (bandPosition < 0.45) {
        return darkColors.charcoal;
      } else if (bandPosition < 0.55) {
        return '#4a1a1a'; // Dark red-brown
      } else if (bandPosition < 0.65) {
        return '#8b1a1a'; // Medium dark red
      } else if (bandPosition < 0.75) {
        return fireColors.redOrange; // Bright red
      } else if (bandPosition < 0.85) {
        return fireColors.brightOrange; // Orange
      } else if (bandPosition < 0.95) {
        return fireColors.vhsOrange; // VHS orange
      } else {
        return fireColors.yellow; // Yellow highlights
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

          // Dot size varies slightly with noise for organic feel - BIGGER RADIUS
          const noiseVariation = perlinNoise.noise2D(x * 0.01, y * 0.01) * 0.5 + 0.5;
          const radius = (dotSpacing / 2.2) * noiseVariation; // Increased from /3 to /2.2 for bigger dots

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
