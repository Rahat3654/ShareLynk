"use client";

import { motion } from "framer-motion";

// Replace these image URLs with your custom images whenever you want!
export const heroBackgroundImages = [
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
];

export function HeroBackgroundSlider({ images = heroBackgroundImages }: { images?: string[] }) {
  const displayImages = [...images, ...images]; // Duplicate for infinite continuous sliding loop

  return (
    <div className="pointer-events-none absolute -inset-8 -z-20 overflow-hidden rounded-[32px] opacity-40">
      {/* Dark gradient mask so it strictly stays in the background behind the mockup window */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/40 to-[#050b1a]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050b1a] via-transparent to-[#050b1a]" />

      {/* Continuous Sliding Image Track */}
      <div className="flex gap-4 h-full items-center animate-hero-slide w-max">
        {displayImages.map((src, i) => (
          <div
            key={i}
            className="relative h-72 w-96 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          >
            <img
              src={src}
              alt="Background feature preview"
              className="h-full w-full object-cover opacity-85 brightness-90 saturate-125"
            />
            <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
          </div>
        ))}
      </div>
    </div>
  );
}
