"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { resumeData } from "@/lib/eddie-constants";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % resumeData.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Glass Card for text */}
      <motion.div
        className="text-center px-12 py-16 rounded-3xl backdrop-blur-md border-t border-white/20"
        style={{
          background: "rgba(255, 252, 248, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name */}
        <h1
          className="text-hero font-medium tracking-tight font-[family-name:var(--font-playfair)] text-shadow"
          style={{ color: "var(--eddie-text-primary)" }}
        >
          Eddie Belaval
        </h1>

        {/* Rotating Title */}
        <div className="h-12 md:h-16 mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              className="text-xl md:text-3xl font-normal text-center font-[family-name:var(--font-inter)] text-shadow"
              style={{ color: "var(--eddie-text-secondary)" }}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {prefersReducedMotion
                ? resumeData.titles[0]
                : resumeData.titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <p
          className="mt-6 text-base md:text-lg max-w-md mx-auto font-[family-name:var(--font-crimson)] italic text-shadow"
          style={{ color: "var(--eddie-text-secondary)" }}
        >
          {resumeData.tagline}
        </p>

        {/* Location */}
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--eddie-text-light)" }}
        >
          {resumeData.location}
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2 }}
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
          transition={{
            duration: prefersReducedMotion ? 0 : 2.5,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown
            className="w-8 h-8"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
