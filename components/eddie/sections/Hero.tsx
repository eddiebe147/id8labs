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
          background: "rgba(0, 0, 0, 0.45)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name */}
        <h1
          className="text-5xl md:text-6xl lg:text-8xl font-normal tracking-tight font-[family-name:var(--font-climate-crisis)]"
          style={{
            color: "#ffffff",
            textShadow: "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          Eddie Belaval
        </h1>

        {/* Rotating Title */}
        <div className="h-12 md:h-16 mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              className="text-sm md:text-base font-normal text-center font-[family-name:var(--font-press-start)]"
              style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
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
          className="mt-6 text-xl md:text-2xl max-w-md mx-auto font-[family-name:var(--font-vt323)]"
          style={{ color: "rgba(255, 255, 255, 0.8)" }}
        >
          {resumeData.tagline}
        </p>

        {/* Location */}
        <p
          className="mt-4 text-lg font-[family-name:var(--font-vt323)]"
          style={{ color: "rgba(255, 255, 255, 0.5)" }}
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
