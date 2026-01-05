"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { Award, Shield, Camera, Code } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Skills() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <div
            className="inline-block px-12 py-8 rounded-3xl backdrop-blur-md border-t border-white/20"
            style={{
              background: "rgba(255, 252, 248, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              className="text-section font-bold font-[family-name:var(--font-playfair)] text-shadow"
              style={{ color: "var(--eddie-text-primary)" }}
            >
              The Craft
            </h2>
          </div>
        </ScrollReveal>

        {/* Certifications */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {resumeData.certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-md border-t border-white/20"
                style={{
                  background: "rgba(255, 252, 248, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              >
                <Award
                  className="w-6 h-6"
                  style={{ color: "var(--sunrise-deep-gold)" }}
                />
                <span
                  className="font-semibold font-[family-name:var(--font-playfair)]"
                  style={{ color: "var(--eddie-text-primary)" }}
                >
                  {cert.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Production Skills */}
          <ScrollReveal delay={0.2}>
            <div
              className="p-8 rounded-3xl h-full backdrop-blur-md border-t border-white/20"
              style={{
                background: "rgba(255, 252, 248, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(255, 107, 107, 0.1)" }}
                >
                  <Camera
                    className="w-5 h-5"
                    style={{ color: "var(--sunrise-coral)" }}
                  />
                </div>
                <h3
                  className="font-semibold font-[family-name:var(--font-playfair)] text-shadow"
                  style={{ color: "var(--eddie-text-primary)" }}
                >
                  Production
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm"
                    style={{
                      background: "rgba(255, 107, 107, 0.1)",
                      color: "var(--eddie-text-secondary)",
                    }}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Skills */}
          <ScrollReveal delay={0.3}>
            <div
              className="p-8 rounded-3xl h-full backdrop-blur-md border-t border-white/20"
              style={{
                background: "rgba(255, 252, 248, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(127, 219, 218, 0.1)" }}
                >
                  <Code
                    className="w-5 h-5"
                    style={{ color: "var(--miami-aqua)" }}
                  />
                </div>
                <h3
                  className="font-semibold font-[family-name:var(--font-playfair)] text-shadow"
                  style={{ color: "var(--eddie-text-primary)" }}
                >
                  Technology
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.techSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm"
                    style={{
                      background: "rgba(127, 219, 218, 0.1)",
                      color: "var(--eddie-text-secondary)",
                    }}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
