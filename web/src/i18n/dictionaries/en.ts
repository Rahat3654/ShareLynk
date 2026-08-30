import type { Dictionary } from "./bn";

// English dictionary. Typed as `Dictionary`, so if a key is added to bn.ts and
// not translated here, the build fails rather than silently rendering Bengali
// to an English reader.

export const en: Dictionary = {
  meta: {
    tagline: "Simple connectivity • Secure sharing • Smart control",
    description:
      "Share internet securely, manage your network, and stay in control of every connection with ShareLynk.",
    homeTitle: "ShareLynk — Simple Connectivity • Secure Sharing",
  },

  nav: {
    home: "Home",
    features: "Features",
    about: "About",
    roadmap: "Roadmap",
    faq: "FAQ",
    contact: "Contact",
    team: "Team",
    docs: "Documentation",
    download: "Download",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
  },

  hero: {
    headlineA: "Secure internet sharing.",
    headlineB: "Smart connectivity.",
    subtitle:
      "Born at the University of Dhaka, ShareLynk lets you share internet easily, manage your network, and keep every connection fully under your control.",
    builtWith: "Built on modern, dependable technology",
  },

  stats: [
    { value: "10+", label: "Platforms supported" },
    { value: "256-bit", label: "Encrypted sessions" },
    { value: "99.9%", label: "Release uptime" },
    { value: "24/7", label: "Global availability" },
  ],

  features: {
    eyebrow: "Features",
    titleA: "Everything you need for",
    titleB: "smart, secure sharing",
    description:
      "A complete digital connectivity platform built around secure design, simple navigation and serious network control.",
    items: [
      {
        icon: "ShieldCheck",
        title: "Secure Wi-Fi sharing",
        description:
          "Share internet without exposing your primary network, with end-to-end encryption and granular permission control.",
      },
      {
        icon: "Network",
        title: "Smart network management",
        description:
          "Monitor connected devices, bandwidth and active sessions in real time from a single dashboard.",
      },
      {
        icon: "SlidersHorizontal",
        title: "Internet access control",
        description:
          "Set user quotas, time windows and limits. Manage or block any device in a couple of taps.",
      },
      {
        icon: "KeyRound",
        title: "Session-based authentication",
        description:
          "Short-lived session keys with automatic token rotation keep every connection protected.",
      },
      {
        icon: "Building2",
        title: "Enterprise ready",
        description:
          "SSO, role-based access and detailed audit logs for teams, campuses and organisations.",
      },
      {
        icon: "Cloud",
        title: "Cloud connected",
        description:
          "Offline-first by design, with cloud sync keeping policy and telemetry aligned across locations.",
      },
      {
        icon: "MonitorSmartphone",
        title: "Cross-platform apps",
        description:
          "Native apps for Android, Windows, macOS and Linux. One account, connected everywhere.",
      },
      {
        icon: "Gauge",
        title: "Fast downloads",
        description:
          "A global CDN delivers installers from wherever you are, in the blink of an eye.",
      },
    ],
  },

  about: {
    eyebrow: "Our story",
    titleA: "From a campus idea to a",
    titleB: "connectivity platform",
    body:
      "ShareLynk began on the University of Dhaka campus as a secure digital connectivity platform. We're building something that lets anyone share internet safely and manage an entire network without friction.",
    missionLabel: "Our mission",
    mission:
      "To become the most dependable digital connectivity platform for secure, controlled network sharing worldwide.",
    pillars: [
      {
        icon: "GraduationCap",
        title: "Born at Dhaka University",
        text: "ShareLynk started on the University of Dhaka campus, solving the internet-sharing and network problems students faced every single day.",
      },
      {
        icon: "Users",
        title: "Built by passionate engineers",
        text: "Designed and run by a group of young developers who care deeply about security and performance.",
      },
      {
        icon: "Target",
        title: "Solving a real problem",
        text: "Our focus is eliminating the unpredictable speeds, device overload and missing safeguards of shared networks.",
      },
      {
        icon: "Globe2",
        title: "A global connectivity mission",
        text: "Our long-term goal is a secure, accessible network platform for individuals and organisations everywhere.",
      },
    ],
  },

  roadmap: {
    eyebrow: "Roadmap",
    titleA: "Where we're taking",
    titleB: "trusted networking",
    description:
      "Clear milestones on the path from a campus idea to a modern digital connectivity platform.",
    status: {
      shipped: "Shipped",
      inProgress: "In progress",
      next: "Next",
      planned: "Planned",
    },
    items: [
      {
        phase: "Phase 1",
        title: "University launch",
        status: "shipped",
        description:
          "A successful first pilot on the University of Dhaka campus, solving real network problems for thousands of students.",
      },
      {
        phase: "Phase 2",
        title: "Bangladesh expansion",
        status: "inProgress",
        description:
          "Scaling to campuses, cafés, co-working spaces and local ISPs across Bangladesh.",
      },
      {
        phase: "Phase 3",
        title: "Enterprise solutions",
        status: "next",
        description:
          "SSO and advanced security policy for large organisations and multi-site management.",
      },
      {
        phase: "Phase 4",
        title: "Global rollout",
        status: "planned",
        description:
          "Taking a controlled, secure digital connectivity platform to an international audience.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    titleA: "Common",
    titleB: "questions and answers",
    description:
      "What you need to know about ShareLynk. If you can't find your answer, send us a message using the contact form below.",
    items: [
      {
        q: "What exactly is ShareLynk?",
        a: "ShareLynk is a modern, secure connectivity platform that lets people and organisations share internet safely and run their own networks.",
      },
      {
        q: "Which operating systems does it support?",
        a: "Android, Windows (x64 and ARM), macOS (Intel and Apple Silicon), and Linux (AppImage, .deb, .rpm). iOS and web apps are in progress.",
      },
      {
        q: "How secure is ShareLynk?",
        a: "Thoroughly. It uses end-to-end encryption, short-lived session tokens and role-based access control. You decide who connects, and for how long.",
      },
      {
        q: "Is the app free to download?",
        a: "Yes — our core apps are completely free to download and use.",
      },
      {
        q: "How do I get version updates?",
        a: "New versions appear automatically in the app and on this downloads page the moment they are released.",
      },
      {
        q: "How do I use it for my campus or business?",
        a: "ShareLynk is well suited to campuses, offices, cafés and businesses. Send us a message through the contact form and our team will help you deploy it.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    titleA: "Talk directly to",
    titleB: "our team",
    description: "Send us a message for any question, support request or partnership enquiry.",
    emailCard: "Email us",
    phoneCard: "Call us",
    whatsappCard: "WhatsApp",
    officeCard: "Our office",
    office: { line1: "University of Dhaka", line2: "Dhaka 1000, Bangladesh" },
    form: {
      name: "Your name",
      namePlaceholder: "Enter your name",
      email: "Email address",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "What is this about?",
      message: "Message",
      messagePlaceholder: "Tell us a bit more...",
      submit: "Send message",
      sent: "Message sent",
      success: "Thank you! We've received your message and will reply shortly.",
      error: "We couldn't send your message. Please try again.",
    },
  },

  newsletter: {
    eyebrow: "Newsletter",
    title: "Get every new feature and release",
    description:
      "Subscribe for product updates, new platform builds and networking tips, straight to your inbox.",
    placeholder: "Your email address...",
    submit: "Subscribe",
    subscribed: "Subscribed",
    success: "Welcome aboard! You're subscribed. 🎉",
    error: "Something went wrong. Please try again.",
  },

  downloads: {
    pageTitle: "Downloads",
    pageDescription:
      "Download official ShareLynk apps for Windows, macOS, Android and Linux.",
    eyebrow: "Downloads",
    titleA: "Get the ShareLynk app",
    titleB: "for your device",
    description:
      "Pick your operating system below and download the official, verified installer.",
    staleTitle: "We couldn't refresh the release list — showing the last known versions below.",
    staleBody: "We could not reach the release service, so this list may be out of date.",
    recommended: "Recommended for your device",
    recommendedTitle: "Download ShareLynk for",
    recommendedNote: "Official signed release",
    recommendedNoteTail: "Fast, encrypted Wi-Fi sharing package.",
    downloadNow: "Download now",
    allPlatforms: "All platforms",
    totalBuilds: "platform builds",
    totalBuildsPrefix: "Showing",
    colPlatform: "Platform",
    colVersion: "Version",
    colArchitecture: "Architecture",
    colSize: "Size",
    colDownload: "Download",
    yourDevice: "Your device",
    inDevelopment: "In development",
    releasedOn: "Released",
    comingSoon: "Coming soon",
    download: "Download",
    virusFree: "Every installer is",
    virusFreeStrong: "100% virus and malware free",
    virusFreeTail: "and protected by a cryptographic signature.",
  },

  team: {
    pageTitle: "The people behind ShareLynk",
    pageDescription:
      "Meet the people contributing their ideas, creativity and technical skills to build the future of ShareLynk — leadership, core engineers and interns.",
    eyebrow: "The people behind the product",
    titleA: "Meet the people behind",
    titleB: "ShareLynk",
    subtitle:
      "Meet the talented engineers, researchers and interns contributing their ideas, creativity and technical skills to build the future of ShareLynk.",
  },

  footer: {
    tagline: "Built with care in Dhaka, Bangladesh 🇧🇩",
    product: "Product",
    company: "Company",
    legal: "Legal",
    support: "Support",
    rights: "All rights reserved.",
  },

  legal: {
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "July 1, 2026",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    privacy: {
      intro:
        "ShareLynk (“we”, “us”) is committed to protecting your privacy. This policy explains what data we collect, how we use it, and the choices you have. We designed ShareLynk to be privacy-first: we collect the minimum necessary to operate the service.",
      sections: [
        {
          h: "Information we collect",
          p: "Account details you provide (name, email), telemetry required to operate secure sessions, and optional diagnostics you choose to share. We do not sell your personal data.",
        },
        {
          h: "How we use information",
          p: "To provide and secure the service, deliver software updates, respond to support requests, and improve reliability and performance.",
        },
        {
          h: "Data retention and security",
          p: "Data is encrypted in transit and at rest where applicable, and retained only as long as needed to provide the service or meet legal obligations.",
        },
        {
          h: "Your rights",
          p: "You may request access to, correction of, or deletion of your personal data by contacting privacy@sharelynk.app.",
        },
        {
          h: "Contact",
          p: "Questions? Email us at contact@sharelynk.app.",
        },
      ],
    },
    terms: {
      intro:
        "These Terms govern your access to and use of ShareLynk software and services. By downloading or using ShareLynk, you agree to these Terms.",
      sections: [
        {
          h: "Use of the service",
          p: "You agree to use ShareLynk lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to the service or the networks of others.",
        },
        {
          h: "Accounts",
          p: "You are responsible for safeguarding your account credentials and for all activity under your account.",
        },
        {
          h: "Software licenses",
          p: "ShareLynk grants you a limited, non-exclusive, non-transferable license to use the apps in accordance with these Terms.",
        },
        {
          h: "Disclaimer and liability",
          p: "The service is provided “as is” without warranties of any kind. To the maximum extent permitted by law, ShareLynk is not liable for indirect or consequential damages.",
        },
        {
          h: "Contact",
          p: "Questions about these Terms? Email legal@sharelynk.app.",
        },
      ],
    },
  },

  mockup: {
    livePreview: "Live preview",
    dashboard: "App dashboard",
    globe: "Global network",
    hubActive: "ShareLynk Hub #042 (active)",
    sharingOff: "Wi-Fi sharing off",
    sessionKey: "Session key:",
    stopSharing: "Stop sharing",
    startSharing: "Start sharing",
    connected: "Connected",
    downloadSpeed: "Download speed",
    sessionData: "Session data",
    activeDevices: "Active authorised devices",
    accessControl: "Access control →",
    remove: "Remove",
    encrypted: "End-to-end encrypted",
    encryptedNote: "Fully secure password protection",
  },
};
