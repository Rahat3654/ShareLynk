"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Two-state language switch. Navigates to the same page under the other locale
 * so each language keeps its own shareable, indexable URL, and remembers the
 * choice so the middleware honours it on the next unprefixed visit.
 */
export function LanguageToggle({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function choose(next: Locale) {
    if (next === locale) return;
    // Max-age one year; middleware reads this before Accept-Language.
    document.cookie = `sharelynk-locale=${next};path=/;max-age=31536000;samesite=lax`;
    router.push(switchLocalePath(pathname, next));
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5",
        className
      )}
    >
      <Languages className="ml-2 mr-1 h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => choose(l)}
          aria-current={l === locale ? "true" : undefined}
          lang={l}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            l === locale
              ? "bg-gradient-to-r from-brand-blue to-brand-cyan text-white"
              : "text-slate-400 hover:text-white"
          )}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}
