import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Glowing primary CTA with animated gradient + hover lift
  primary:
    "text-white shadow-glow-sm bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] bg-[length:200%_100%] hover:bg-[position:100%_0] hover:-translate-y-0.5 hover:shadow-glow",
  secondary:
    "text-white glass hover:bg-white/[0.08] hover:-translate-y-0.5",
  ghost: "text-slate-300 hover:text-white hover:bg-white/[0.05]",
  subtle: "text-slate-200 bg-white/[0.06] hover:bg-white/[0.1]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base py-3.5",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);
    if (href) {
      if (external || href.startsWith("http")) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
