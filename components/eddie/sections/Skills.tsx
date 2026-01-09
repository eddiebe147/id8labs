"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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
              background: "rgba(0, 0, 0, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2
              className="text-xl md:text-2xl font-normal font-[family-name:var(--font-press-start)]"
              style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
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
                  background: "rgba(0, 0, 0, 0.45)",
                  border: "1px solid rgba(0, 255, 65, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              >
                <Award
                  className="w-6 h-6"
                  style={{ color: "#00ff41" }}
                />
                <span
                  className="text-lg font-[family-name:var(--font-vt323)]"
                  style={{ color: "#ffffff" }}
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
                background: "rgba(0, 0, 0, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(0, 255, 65, 0.1)" }}
                >
                  <Camera
                    className="w-5 h-5"
                    style={{ color: "#00ff41" }}
                  />
                </div>
                <h3
                  className="text-base font-[family-name:var(--font-press-start)]"
                  style={{ color: "#00ff41" }}
                >
                  Production
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-lg font-[family-name:var(--font-vt323)]"
                    style={{
                      background: "rgba(0, 255, 65, 0.1)",
                      color: "rgba(255, 255, 255, 0.8)",
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
                background: "rgba(0, 0, 0, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(0, 255, 65, 0.1)" }}
                >
                  <Code
                    className="w-5 h-5"
                    style={{ color: "#00ff41" }}
                  />
                </div>
                <h3
                  className="text-base font-[family-name:var(--font-press-start)]"
                  style={{ color: "#00ff41" }}
                >
                  Technology
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.techSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-lg font-[family-name:var(--font-vt323)]"
                    style={{
                      background: "rgba(0, 255, 65, 0.1)",
                      color: "rgba(255, 255, 255, 0.8)",
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
