"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  immediate?: boolean; // Show immediately without scroll trigger (for hero elements)
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  immediate = false,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  // When immediate=true, bypass useInView entirely (useful for hero elements)
  const shouldShow = immediate || isInView || prefersReducedMotion;

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0, x: 0 }
    : { opacity: 0, ...directionOffset[direction] };

  const animate = shouldShow
    ? { opacity: 1, y: 0, x: 0 }
    : { opacity: 0, ...directionOffset[direction] };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={animate}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Default export for backwards compatibility with milo/ScrollReveal
export default ScrollReveal;
