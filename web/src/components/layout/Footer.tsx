import Link from "next/link";
import {
  Facebook, Linkedin, Github, Youtube, Twitter, Send, MessageCircle,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site, socials } from "@/data/site";
import { localeHref } from "@/i18n";
import type { Dictionary, Locale } from "@/i18n";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook, Linkedin, Github, Youtube, Twitter, Send, MessageCircle,
};

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const columns = [
    {
      title: t.footer.product,
      links: [
        { label: t.nav.download, href: "/downloads" },
        { label: t.nav.features, href: "/#features" },
        { label: t.nav.roadmap, href: "/#roadmap" },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, href: "/#about" },
        { label: t.nav.contact, href: "/#contact" },
        { label: t.nav.team, href: "/team" },
        { label: t.footer.support, href: "mailto:support@sharelynk.app", external: true },
        { label: "GitHub", href: "https://github.com/sharelynk", external: true },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.legal.privacyTitle, href: "/privacy" },
        { label: t.legal.termsTitle, href: "/terms" },
        { label: t.nav.faq, href: "/#faq" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo locale={locale} />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{t.meta.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = iconMap[s.icon] ?? MessageCircle;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-white"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={"external" in l && l.external ? l.href : localeHref(locale, l.href)}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-cyan"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className="text-sm text-slate-500">
            {t.meta.tagline} · {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
