// Locale-independent site data. All translatable copy lives in src/i18n/dictionaries.

export const site = {
  name: "ShareLynk",
  domain: "sharelynk.app",
  // Public canonical URL (used for OG/canonical/sitemap). Override per deploy
  // with NEXT_PUBLIC_SITE_URL; falls back to the production domain.
  //
  // This MUST be the apex. It previously fell back to website.sharelynk.app,
  // which meant every canonical, hreflang, og:url and sitemap entry served from
  // https://sharelynk.app pointed back at the subdomain — so Google filed the
  // apex under "Alternate page with proper canonical tag" and never indexed it.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sharelynk.app",
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

// `phone` and `whatsapp` were the literal placeholders "+880 1XXX-XXXXXX",
// published on the live site as a tel: link and a wa.me link built from a
// number that does not exist. They are null until there is a real number to
// put here; the Contact section renders a card only for the channels that are
// actually set, so adding one back is a one-line change.
export const contact: {
  emails: string[];
  phone: string | null;
  whatsapp: string | null;
} = {
  emails: ["contact@sharelynk.app", "support@sharelynk.app"],
  phone: null,
  whatsapp: null,
};

// Every entry here is rendered as a live link in the footer, so a dead one is
// a broken link on every page. github.com/sharelynk and youtube.com/@sharelynk
// both returned 404 and were removed; add them back once the accounts exist.
export const socials = [
  { label: "Facebook", href: "https://facebook.com/sharelynk", icon: "Facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sharelynk", icon: "Linkedin" },
  { label: "X", href: "https://x.com/sharelynk", icon: "Twitter" },
  { label: "Telegram", href: "https://t.me/sharelynk", icon: "Send" },
  { label: "Discord", href: "https://discord.gg/sharelynk", icon: "MessageCircle" },
];
