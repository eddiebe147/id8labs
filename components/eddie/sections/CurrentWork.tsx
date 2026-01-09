"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
              background: "rgba(0, 0, 0, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 255, 65, 0.15), transparent)",
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
                  style={{ color: "#00ff41" }}
                />
                <span
                  className="text-sm font-[family-name:var(--font-press-start)]"
                  style={{ color: "#00ff41" }}
                >
                  Currently
                </span>
              </div>

              <h2
                className="text-xl md:text-2xl font-normal mb-4 font-[family-name:var(--font-press-start)]"
                style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
              >
                {resumeData.currentWork.company}
              </h2>

              <p
                className="text-2xl mb-6 font-[family-name:var(--font-vt323)]"
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                {resumeData.currentWork.tagline}
              </p>

              <p
                className="text-xl leading-relaxed max-w-2xl font-[family-name:var(--font-vt323)]"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {resumeData.currentWork.description}
              </p>

              <motion.div
                className="mt-8 inline-flex items-center gap-2 text-lg font-[family-name:var(--font-vt323)]"
                style={{ color: "#00ff41" }}
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
