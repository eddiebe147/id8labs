"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Stats() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          {resumeData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl backdrop-blur-md"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                border: "1px solid rgba(0, 255, 65, 0.2)",
              }}
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
            >
              <div
                className="text-3xl md:text-4xl font-[family-name:var(--font-vt323)]"
                style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
              >
                {stat.value}
              </div>
              <div
                className="text-lg mt-1 font-[family-name:var(--font-vt323)]"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
