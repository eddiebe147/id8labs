"use client";

import { Hero } from "@/components/eddie/sections/Hero";
import { Stats } from "@/components/eddie/sections/Stats";
import { Evolution } from "@/components/eddie/sections/Evolution";
import { Credits } from "@/components/eddie/sections/Credits";
import { Skills } from "@/components/eddie/sections/Skills";
import { CurrentWork } from "@/components/eddie/sections/CurrentWork";
import { Contact } from "@/components/eddie/sections/Contact";

export default function EddiePage() {
  return (
    <>
      {/* Fixed Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Frosted glass overlay - softens video into ambient background */}
        <div
          className="absolute inset-0 backdrop-blur-[12px]"
          style={{
            background: "rgba(255, 252, 248, 0.25)"
          }}
        />
        {/* Subtle vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)"
          }}
        />
      </div>

      {/* Main Content - scrolls over video */}
      <main className="relative">
        <Hero />
        <Stats />
        <Evolution />
        <Credits />
        <Skills />
        <CurrentWork />
        <Contact />
      </main>
    </>
  );
}
