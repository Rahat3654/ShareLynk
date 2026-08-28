"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 transition-all duration-300",
            scrolled
              ? "glass-strong h-14 shadow-glow-sm"
              : "h-16 border border-transparent"
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <Button href="/#features" variant="ghost" size="sm">
              {t.navButtons.documentation}
            </Button>
            <Button href="/downloads" size="sm">
              <Download className="h-4 w-4" />
              {t.navButtons.download}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              className="grid h-10 w-10 place-items-center rounded-xl text-white"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.navButtons.menuClose : t.navButtons.menuOpen}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="container lg:hidden">
          <div className="glass-strong mt-2 animate-fade-up rounded-2xl p-4">
            <div className="flex flex-col">
              {t.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button href="/#features" variant="secondary" size="md" onClick={() => setOpen(false)}>
                  {t.navButtons.documentation}
                </Button>
                <Button href="/downloads" size="md" onClick={() => setOpen(false)}>
                  <Download className="h-4 w-4" /> {t.navButtons.download}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
