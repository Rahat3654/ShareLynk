import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { localeHref } from "@/i18n";
import type { Locale } from "@/i18n";

// The ShareLynk logo, as the Flutter app draws it (ShareLynkWordmark): the
// official "S" mark followed by the wordmark as text — "Share" in the primary
// text colour and "Lynk" in the app's on-dark brand blue (#4C8DFF).
//
// The mark is the app's own asset (assets/icon/icon_master.png) with its white
// background removed, so it sits directly on the dark site with no white pill.
// The wordmark is live text rather than an image so it stays sharp at every
// size and on every screen density. Do not redraw the mark in code.
export function Logo({
  className,
  href = "/",
  locale,
}: {
  /**
   * Size the logo with a text-size class (default `text-[21px]`); the mark and
   * the gap scale with it in em, so a responsive class like
   * `text-[17px] sm:text-[21px]` resizes the whole lockup per breakpoint.
   */
  className?: string;
  href?: string | null;
  /** When given, `href` is resolved under this locale. */
  locale?: Locale;
}) {
  const content = (
    <span className={cn("group inline-flex items-center gap-[0.4em] text-[21px]", className)}>
      <Image
        src={site.logo}
        // Decorative next to the wordmark: the text already says "ShareLynk".
        alt=""
        width={64}
        height={64}
        priority
        className="h-[1.5em] w-[1.5em] shrink-0 transition-transform duration-300 group-hover:scale-105"
      />
      <span
        className="font-extrabold leading-none"
        style={{
          letterSpacing: "-0.02em",
          // Latin wordmark: pin it to Inter so the Bengali-first font stack
          // on the marketing pages never renders it in a Bengali face.
          fontFamily: "var(--font-sans-english), Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <span className="text-white">Share</span>
        <span style={{ color: "#4C8DFF" }}>Lynk</span>
      </span>
    </span>
  );

  if (href === null) return <span aria-label={site.name}>{content}</span>;
  const target = locale ? localeHref(locale, href) : href;

  return (
    <Link href={target} aria-label={`${site.name} home`} className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60">
      {content}
    </Link>
  );
}
