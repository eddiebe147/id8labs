"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { MapPin, Mail, Linkedin } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: resumeData.social.email,
      href: `mailto:${resumeData.social.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect",
      href: `https://${resumeData.social.linkedin}`,
    },
  ];

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-32 px-6">
      <div
        className="max-w-4xl mx-auto text-center p-12 rounded-3xl backdrop-blur-md border-t border-white/20"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Location */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin
              className="w-5 h-5"
              style={{ color: "#00ff41" }}
            />
            <span
              className="text-xl font-[family-name:var(--font-vt323)]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              {resumeData.location}
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2
            className="text-xl md:text-2xl font-normal mb-4 font-[family-name:var(--font-press-start)]"
            style={{ color: "#00ff41", textShadow: "0 0 5px #00ff41" }}
          >
            Let&apos;s Connect
          </h2>
          <p
            className="text-xl mb-12 max-w-xl mx-auto font-[family-name:var(--font-vt323)]"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            Available for cinematography, story production, and creative
            consulting work.
          </p>
        </ScrollReveal>

        {/* Contact Links */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-md"
                style={{
                  background: "rgba(0, 0, 0, 0.45)",
                  border: "1px solid rgba(0, 255, 65, 0.3)",
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
                      }
                }
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <link.icon
                  className="w-5 h-5"
                  style={{ color: "#00ff41" }}
                />
                <span
                  className="text-lg font-[family-name:var(--font-vt323)]"
                  style={{ color: "rgba(255, 255, 255, 0.8)" }}
                >
                  {link.value}
                </span>
              </motion.a>
            ))}
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.3} className="mt-20">
          <p
            className="text-lg font-[family-name:var(--font-vt323)]"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Designed with early morning Miami light in mind.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
