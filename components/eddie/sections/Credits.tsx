"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { GlowCard } from "@/components/eddie/ui/GlowCard";
import { Film, Tv, Video, Building2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Credits() {
  const featuredCredits = [
    ...resumeData.credits.realityTV.filter((c) => c.featured),
    ...resumeData.credits.scripted.filter((c) => c.featured),
    ...resumeData.credits.documentary.filter((c) => c.featured),
  ];

  const otherCredits = [
    ...resumeData.credits.realityTV.filter((c) => !c.featured),
    ...resumeData.credits.documentary.filter((c) => !c.featured),
  ];

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
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
              The Work
            </h2>
            <p
              className="mt-4 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter)]"
              style={{ color: "var(--eddie-text-secondary)" }}
            >
              From MTV to TLC to A&E. Stories captured across networks and
              continents.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Credits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredCredits.map((credit, index) => (
            <GlowCard
              key={credit.title}
              delay={index * 0.1}
              glowColor={index % 2 === 0 ? "coral" : "gold"}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: "rgba(255, 107, 107, 0.1)" }}
                >
                  <Tv
                    className="w-5 h-5"
                    style={{ color: "var(--sunrise-coral)" }}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="font-semibold font-[family-name:var(--font-playfair)] text-shadow"
                    style={{ color: "var(--eddie-text-primary)" }}
                  >
                    {credit.title}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--sunrise-deep-coral)" }}
                  >
                    {credit.network}
                  </p>
                  <p
                    className="text-sm mt-2"
                    style={{ color: "var(--eddie-text-secondary)" }}
                  >
                    {credit.role}
                  </p>
                  {credit.years && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--eddie-text-light)" }}
                    >
                      {credit.years}
                    </p>
                  )}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Other Credits - Compact List */}
        <ScrollReveal delay={0.3}>
          <div
            className="p-8 rounded-3xl backdrop-blur-md border-t border-white/20"
            style={{
              background: "rgba(255, 252, 248, 0.35)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              className="font-semibold mb-6 font-[family-name:var(--font-playfair)] text-shadow"
              style={{ color: "var(--eddie-text-primary)" }}
            >
              Additional Credits
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherCredits.map((credit) => (
                <div key={credit.title} className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sunrise-peach)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--eddie-text-secondary)" }}
                  >
                    {credit.title}{" "}
                    <span style={{ color: "var(--eddie-text-light)" }}>
                      ({credit.network})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Commercial Work */}
        <ScrollReveal delay={0.4} className="mt-16">
          <h3
            className="text-xl font-semibold mb-6 text-center font-[family-name:var(--font-playfair)] text-shadow"
            style={{ color: "var(--eddie-text-primary)" }}
          >
            Brand Collaborations
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {resumeData.credits.commercial.map((brand, index) => (
              <motion.div
                key={brand.brand}
                className="px-6 py-3 rounded-full backdrop-blur-md"
                style={{
                  background: "rgba(255, 252, 248, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(255, 160, 122, 0.3)",
                      }
                }
              >
                <span
                  className="font-medium"
                  style={{ color: "var(--eddie-text-primary)" }}
                >
                  {brand.brand}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
