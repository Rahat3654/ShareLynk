import Link from "next/link";
import {
  Facebook, Linkedin, Github, Youtube, Twitter, Send, MessageCircle,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site, socials } from "@/data/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook, Linkedin, Github, Youtube, Twitter, Send, MessageCircle,
};

const columns = [
  {
    title: "Product",
    links: [
      { label: "Downloads", href: "/#downloads" },
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Documentation", href: "/#downloads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
      { label: "Support", href: "mailto:support@sharelynk.com" },
      { label: "GitHub", href: "https://github.com/sharelynk" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/#faq" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            {/* Footer logo — Replace with official ShareLynk logo */}
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {site.description}
            </p>
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
                      href={l.href}
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
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            {site.tagline} · Built with care in Dhaka, Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
