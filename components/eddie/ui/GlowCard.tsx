"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "coral" | "gold" | "peach" | "pink";
  delay?: number;
}

export function GlowCard({
  children,
  className,
  delay = 0,
}: GlowCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-2xl backdrop-blur-md p-6",
        !prefersReducedMotion && "transition-all duration-300 ease-out",
        !prefersReducedMotion && "hover:-translate-y-1 hover:backdrop-blur-lg",
        className
      )}
      style={{
        background: "rgba(255, 252, 248, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
            }
      }
    >
      {children}
    </motion.div>
  );
}
