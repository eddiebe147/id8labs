"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { Sparkles, ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CurrentWork() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div
            className="relative p-12 rounded-3xl overflow-hidden backdrop-blur-md border-t border-white/20"
            style={{
              background: "rgba(255, 252, 248, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 217, 61, 0.2), transparent)",
                filter: "blur(60px)",
              }}
              animate={
                prefersReducedMotion
                  ? { scale: 1, opacity: 0.3 }
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 8,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles
                  className="w-8 h-8"
                  style={{ color: "var(--sunrise-gold)" }}
                />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--sunrise-deep-gold)" }}
                >
                  Currently
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-shadow"
                style={{ color: "var(--eddie-text-primary)" }}
              >
                {resumeData.currentWork.company}
              </h2>

              <p
                className="text-xl mb-6 font-[family-name:var(--font-crimson)] italic text-shadow"
                style={{ color: "var(--eddie-text-secondary)" }}
              >
                {resumeData.currentWork.tagline}
              </p>

              <p
                className="text-lg leading-relaxed max-w-2xl font-[family-name:var(--font-inter)]"
                style={{ color: "var(--eddie-text-secondary)" }}
              >
                {resumeData.currentWork.description}
              </p>

              <motion.div
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--sunrise-coral)" }}
                whileHover={prefersReducedMotion ? undefined : { x: 5 }}
              >
                <span>Building in public</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
