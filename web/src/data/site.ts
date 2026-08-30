// Locale-independent site data. All translatable copy lives in src/i18n/dictionaries.

export const site = {
  name: "ShareLynk",
  domain: "sharelynk.app",
  // Public canonical URL (used for OG/canonical/sitemap). Override per deploy
  // with NEXT_PUBLIC_SITE_URL; falls back to the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://website.sharelynk.app",
  logo: "/assets/logo/sharelynk-logo.png",
};

/** Nav entries. `key` indexes into dict.nav; hrefs are locale-prefixed at render. */
export const nav = [
  { key: "home", href: "/#home" },
  { key: "features", href: "/#features" },
  { key: "about", href: "/#about" },
  { key: "roadmap", href: "/#roadmap" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/#contact" },
  { key: "team", href: "/team" },
] as const;

export const contact = {
  emails: ["contact@sharelynk.app", "support@sharelynk.app"],
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "+880 1XXX-XXXXXX",
};

export const socials = [
  { label: "Facebook", href: "https://facebook.com/sharelynk", icon: "Facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sharelynk", icon: "Linkedin" },
  { label: "GitHub", href: "https://github.com/sharelynk", icon: "Github" },
  { label: "YouTube", href: "https://youtube.com/@sharelynk", icon: "Youtube" },
  { label: "X", href: "https://x.com/sharelynk", icon: "Twitter" },
  { label: "Telegram", href: "https://t.me/sharelynk", icon: "Send" },
  { label: "Discord", href: "https://discord.gg/sharelynk", icon: "MessageCircle" },
];
