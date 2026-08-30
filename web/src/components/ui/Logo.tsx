import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { localeHref } from "@/i18n";
import type { Locale } from "@/i18n";

// ShareLynk wordmark + logo lockup.
// Replace with official ShareLynk logo — the image asset lives at
// /public/assets/logo/sharelynk-logo.png and is used everywhere (navbar,
// footer, hero, login, favicon). Do not recreate the logo in code.
export function Logo({
  className,
  size = 36,
  href = "/",
  locale,
}: {
  className?: string;
  size?: number;
  href?: string | null;
  /** When given, `href` is resolved under this locale. */
  locale?: Locale;
}) {
  const content = (
    <span className={cn("group inline-flex items-center", className)}>
      <span className="relative flex items-center justify-center rounded-xl bg-white/95 px-3 py-1.5 shadow-md ring-1 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
        <Image
          src={site.logo}
          alt="ShareLynk logo"
          width={160}
          height={40}
          priority
          className="h-7 w-auto object-contain"
        />
      </span>
    </span>
  );

  if (href === null) return content;
  const target = locale ? localeHref(locale, href) : href;

  return (
    <Link href={target} aria-label="ShareLynk home" className="inline-flex">
      {content}
    </Link>
  );
}
