// Central site content — real startup copy, no lorem ipsum.

export const site = {
  name: "ShareLynk",
  tagline: "Connect • Share • Empower",
  domain: "sharelynk.com",
  description:
    "ShareLynk is building the future of secure digital connectivity — securely share internet access, manage networks, and build smarter digital infrastructure.",
  url: "https://sharelynk.com",
  // Replace with official ShareLynk logo
  logo: "/assets/logo/sharelynk-logo.png",
};

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "Downloads", href: "/#downloads" },
  { label: "Features", href: "/#features" },
  { label: "About", href: "/#about" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const features = [
  {
    icon: "ShieldCheck",
    title: "Secure Wi-Fi Sharing",
    description:
      "Share internet access with end-to-end encryption and granular, revocable permissions — never expose your primary network.",
  },
  {
    icon: "Network",
    title: "Smart Network Management",
    description:
      "Monitor devices, bandwidth, and sessions from a single real-time dashboard with intelligent traffic insights.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Internet Access Control",
    description:
      "Set per-user quotas, time windows, and content policies. Approve or cut off any device in one tap.",
  },
  {
    icon: "KeyRound",
    title: "Session-based Authentication",
    description:
      "Short-lived, token-scoped sessions with automatic rotation keep every connection verified and auditable.",
  },
  {
    icon: "Building2",
    title: "Enterprise Ready",
    description:
      "SSO-friendly, role-based access, audit logs, and policy controls built for teams, campuses, and operators.",
  },
  {
    icon: "Cloud",
    title: "Cloud Connected",
    description:
      "Sync policies and telemetry across locations with a resilient cloud backbone and offline-first clients.",
  },
  {
    icon: "MonitorSmartphone",
    title: "Cross Platform",
    description:
      "Native apps for Android, Windows, macOS, and Linux — with iOS and Web on the way. One account, everywhere.",
  },
  {
    icon: "Gauge",
    title: "Fast Downloads",
    description:
      "Globally distributed release CDN means installers land quickly, wherever your users are.",
  },
];

export const roadmap = [
  {
    phase: "Phase 1",
    title: "University Deployment",
    status: "Shipped",
    description:
      "Born inside the University of Dhaka — piloted across campus networks to solve real connectivity gaps for thousands of students.",
  },
  {
    phase: "Phase 2",
    title: "Bangladesh Expansion",
    status: "In Progress",
    description:
      "Scaling to campuses, cafés, co-working spaces, and ISPs across Bangladesh with localized onboarding and support.",
  },
  {
    phase: "Phase 3",
    title: "Enterprise Solutions",
    status: "Next",
    description:
      "SSO, advanced policy engines, multi-site management, and SLAs for operators, enterprises, and institutions.",
  },
  {
    phase: "Phase 4",
    title: "Global Launch",
    status: "Planned",
    description:
      "A worldwide connectivity platform — trusted infrastructure for controlled digital sharing on every continent.",
  },
];

export const faqs = [
  {
    q: "What exactly is ShareLynk?",
    a: "ShareLynk is a secure connectivity platform that lets people and organizations share internet access safely, manage their networks, and control who connects — all from beautiful cross-platform apps.",
  },
  {
    q: "Which platforms are supported?",
    a: "Android, Windows (x64 & ARM), macOS (Intel & Apple Silicon), and Linux (AppImage, .deb, .rpm) are available today. iOS and a Web app are in active development.",
  },
  {
    q: "Is ShareLynk secure?",
    a: "Yes. Connections use end-to-end encryption, short-lived session tokens with automatic rotation, and role-based access controls. You decide exactly who can connect and for how long.",
  },
  {
    q: "Is it free to download?",
    a: "The core apps are free to download and use. Advanced enterprise capabilities — SSO, multi-site management, and SLAs — are part of our upcoming enterprise plans.",
  },
  {
    q: "How does version management work?",
    a: "Every download on this site is served from our release system. When our team publishes a new version, this page updates automatically — you always get the latest verified build.",
  },
  {
    q: "Can I use ShareLynk for my business or campus?",
    a: "Absolutely. ShareLynk is built for teams, campuses, cafés, and ISPs. Reach out via the contact section and our team will help you deploy it at scale.",
  },
  {
    q: "Where is my data stored?",
    a: "Telemetry and policy data sync through a resilient cloud backbone with privacy-first defaults. Clients are offline-capable, so core sharing keeps working even without connectivity.",
  },
  {
    q: "How do I get support?",
    a: "Email support@sharelynk.com, join our community channels, or open an issue on GitHub. Enterprise customers get dedicated support with response-time SLAs.",
  },
];

export const stats = [
  { value: "10+", label: "Platforms supported" },
  { value: "256-bit", label: "Encrypted sessions" },
  { value: "99.9%", label: "Release uptime" },
  { value: "24/7", label: "Global availability" },
];

export const contact = {
  emails: ["contact@sharelynk.com", "support@sharelynk.com"],
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "+880 1XXX-XXXXXX",
  office: { line1: "University of Dhaka", line2: "Dhaka 1000, Bangladesh" },
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
