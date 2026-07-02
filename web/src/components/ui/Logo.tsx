import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

// ShareLynk wordmark + logo lockup.
// Replace with official ShareLynk logo — the image asset lives at
// /public/assets/logo/sharelynk-logo.png and is used everywhere (navbar,
// footer, hero, login, favicon). Do not recreate the logo in code.
export function Logo({
  className,
  showWordmark = true,
  size = 34,
  href = "/",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  href?: string | null;
}) {
  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        className="relative grid place-items-center rounded-xl bg-white/[0.04] p-1.5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size + 12, height: size + 12 }}
      >
        {/* Replace with official ShareLynk logo */}
        <Image
          src={site.logo}
          alt="ShareLynk logo"
          width={size}
          height={size}
          priority
          className="object-contain"
        />
      </span>
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-white">
          Share<span className="text-brand-cyan">Lynk</span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label="ShareLynk home" className="inline-flex">
      {content}
    </Link>
  );
}
