"use client";

// Decorative marquee that sits behind the hero mockup.
//
// Point this at real ShareLynk product imagery once it exists, by dropping the
// files in /public/assets/ and listing their paths below.
// It is intentionally empty by default: the hero must not depend on
// third-party image hosts, and shipping unlicensed stock as product art is
// not an option. With no images the component renders nothing and the hero
// falls back to its ambient gradient glows.
export const heroBackgroundImages: string[] = [];

export function HeroBackgroundSlider({ images = heroBackgroundImages }: { images?: string[] }) {
  if (!images.length) return null;

  const displayImages = [...images, ...images]; // Duplicate for infinite continuous sliding loop

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-8 -z-20 overflow-hidden rounded-[32px] opacity-40"
    >
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover opacity-85 brightness-90 saturate-125"
            />
            <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
          </div>
        ))}
      </div>
    </div>
  );
}
