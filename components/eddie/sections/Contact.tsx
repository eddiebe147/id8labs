"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/lib/eddie-constants";
import { ScrollReveal } from "@/components/eddie/ui/ScrollReveal";
import { MapPin, Mail, Globe, Linkedin } from "lucide-react";
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
      icon: Globe,
      label: "Website",
      value: resumeData.social.website,
      href: `https://${resumeData.social.website}`,
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
          background: "rgba(255, 252, 248, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Location */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin
              className="w-5 h-5"
              style={{ color: "var(--sunrise-coral)" }}
            />
            <span
              className="text-lg"
              style={{ color: "var(--eddie-text-secondary)" }}
            >
              {resumeData.location}
            </span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2
            className="text-section font-bold mb-4 font-[family-name:var(--font-playfair)] text-shadow"
            style={{ color: "var(--eddie-text-primary)" }}
          >
            Let&apos;s Connect
          </h2>
          <p
            className="text-lg mb-12 max-w-xl mx-auto font-[family-name:var(--font-inter)]"
            style={{ color: "var(--eddie-text-secondary)" }}
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
                  background: "rgba(255, 252, 248, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                      }
                }
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <link.icon
                  className="w-5 h-5"
                  style={{ color: "var(--sunrise-coral)" }}
                />
                <span
                  className="font-medium"
                  style={{ color: "var(--eddie-text-primary)" }}
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
            className="text-sm"
            style={{ color: "var(--eddie-text-light)" }}
          >
            Designed with early morning Miami light in mind.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
