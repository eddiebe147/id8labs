"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { Eye, BookOpen, Wrench } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const phaseIcons = {
  "The Eye": Eye,
  "The Story": BookOpen,
  "The Build": Wrench,
};

export function Evolution() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll(
    prefersReducedMotion
      ? {}
      : {
          target: containerRef,
          offset: ["start end", "end start"],
        }
  );

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const parallaxValues = [y1, y2, y3];

  return (
    <section ref={containerRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
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
              The Journey
            </h2>
            <p
              className="mt-4 text-xl max-w-2xl mx-auto font-[family-name:var(--font-vt323)]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              From behind the camera to shaping narratives to building tools.
              Each chapter shaped the next.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--sunrise-coral), var(--sunrise-peach), var(--sunrise-gold), transparent)",
            }}
          />

          {/* Career Chapters */}
          <div className="space-y-24 md:space-y-32">
            {resumeData.careerChapters.map((chapter, index) => {
              const Icon = phaseIcons[chapter.phase as keyof typeof phaseIcons];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.phase}
                  style={{ y: prefersReducedMotion ? 0 : parallaxValues[index] }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon Circle */}
                  <ScrollReveal
                    delay={0.1}
                    className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center glow-coral"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--sunrise-coral), var(--sunrise-peach))",
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </ScrollReveal>

                  {/* Content Card */}
                  <ScrollReveal
                    delay={0.2}
                    direction={isEven ? "left" : "right"}
                    className={`w-full md:w-[calc(50%-3rem)] ${
                      isEven ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div
                      className="p-8 rounded-3xl backdrop-blur-md border-t border-white/20"
                      style={{
                        background: "rgba(0, 0, 0, 0.45)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {/* Mobile Icon */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 md:hidden"
                        style={{
                          background: "rgba(0, 255, 65, 0.2)",
                          border: "1px solid #00ff41",
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: "#00ff41" }} />
                      </div>

                      <span
                        className="text-sm font-[family-name:var(--font-press-start)]"
                        style={{ color: "#00ff41" }}
                      >
                        {chapter.phase}
                      </span>
                      <h3
                        className="text-2xl md:text-3xl mt-2 font-[family-name:var(--font-vt323)]"
                        style={{ color: "#ffffff" }}
                      >
                        {chapter.title}
                      </h3>
                      <p
                        className="text-lg mt-1 font-[family-name:var(--font-vt323)]"
                        style={{ color: "rgba(255, 255, 255, 0.5)" }}
                      >
                        {chapter.years}
                      </p>
                      <p
                        className="mt-4 text-lg leading-relaxed font-[family-name:var(--font-vt323)]"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {chapter.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {chapter.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-lg font-[family-name:var(--font-vt323)]"
                            style={{ color: "rgba(255, 255, 255, 0.6)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ background: "#00ff41" }}
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
