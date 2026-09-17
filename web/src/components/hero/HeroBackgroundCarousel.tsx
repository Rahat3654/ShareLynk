"use client";

import { motion } from "framer-motion";

interface HeroBackgroundCarouselProps {
    imageSrc?: string;
}

export function HeroBackgroundCarousel({
    imageSrc = "/assets/hero-poster.jpg",
}: HeroBackgroundCarouselProps) {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
            {/* Subtle Background Poster Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute right-0 top-0 h-full w-full lg:w-[60%] opacity-20 sm:opacity-25"
            >
                {/* Multi-directional gradient masks for seamless dark theme blending */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050b1a] via-[#050b1a]/40 to-[#050b1a]" />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050b1a] via-transparent to-[#050b1a]" />

                <img
                    src={imageSrc}
                    alt="ShareLynk Wi-Fi Poster"
                    className="h-full w-full object-cover object-top filter brightness-95 contrast-105"
                />
            </motion.div>

            {/* Soft ambient glow behind poster */}
            <div className="absolute right-[10%] top-[20%] -z-20 h-[400px] w-[400px] rounded-full bg-brand-cyan/15 blur-[120px]" />
        </div>
    );
}
