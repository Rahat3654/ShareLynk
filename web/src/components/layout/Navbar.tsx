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
        scrolled ? "py-2.5" : "py-3.5"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-5 transition-all duration-300 shadow-2xl border backdrop-blur-2xl",
            scrolled
              ? "bg-[#050b1a]/80 border-cyan-500/30 h-14 shadow-glow-sm"
              : "bg-[#050b1a]/50 border-white/20 h-16 shadow-slate-950/50"
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1.5 lg:flex">
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <Button href="/#features" variant="subtle" size="sm" className="bg-slate-800/80 border border-white/15 text-slate-100 hover:bg-slate-700 hover:text-white">
              {t.navButtons.documentation}
            </Button>
            <Button href="/downloads" size="sm" className="shadow-lg shadow-blue-500/25">
              <Download className="h-4 w-4" />
              {t.navButtons.download}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800/80 border border-white/15 text-white hover:bg-slate-700"
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
          <div className="mt-2 animate-fade-up rounded-2xl p-4 bg-[#050b1a]/95 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col">
              {t.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button href="/#features" variant="subtle" size="md" onClick={() => setOpen(false)} className="bg-slate-800/80 border border-white/15 text-white">
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
