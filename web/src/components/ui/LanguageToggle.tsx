"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "navbar" | "compact" | "dropdown";
}

export function LanguageToggle({ className, variant = "navbar" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={toggleLanguage}
      aria-label={language === "bn" ? "Switch to English language" : "বাংলা ভাষায় পরিবর্তন করুন"}
      title={language === "bn" ? "Switch to English" : "বাংলা ভার্সন দেখুন"}
      className={cn(
        "relative flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-brand-cyan/40 hover:bg-white/[0.12] hover:text-white hover:shadow-glow-sm",
        className
      )}
    >
      <Globe className="h-3.5 w-3.5 text-brand-cyan animate-pulse-slow" />
      
      <div className="flex items-center gap-1">
        <span
          className={cn(
            "transition-opacity duration-200",
            language === "bn" ? "font-bold text-brand-cyan" : "opacity-60 hover:opacity-100"
          )}
        >
          বাংলা
        </span>
        <span className="text-slate-500">/</span>
        <span
          className={cn(
            "transition-opacity duration-200",
            language === "en" ? "font-bold text-brand-cyan" : "opacity-60 hover:opacity-100"
          )}
        >
          EN
        </span>
      </div>
    </motion.button>
  );
}
