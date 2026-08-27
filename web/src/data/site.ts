// Central site content — natural Bangla + English digital product language.

export const site = {
  name: "ShareLynk",
  tagline: "সহজ কানেক্টিভিটি • নিরাপদ শেয়ারিং • স্মার্ট সুবিধা",
  domain: "sharelynk.app",
  description:
    "ShareLynk দিয়ে নিরাপদে ইন্টারনেট শেয়ার করুন, নেটওয়ার্ক ম্যানেজ করুন এবং স্মার্ট কানেক্টিভিটি সুবিধা উপভোগ করুন।",
  // Public canonical URL (used for OG/canonical/sitemap). Override per deploy
  // with NEXT_PUBLIC_SITE_URL; falls back to the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sharelynk.app",
  // Replace with official ShareLynk logo
  logo: "/assets/logo/sharelynk-logo.png",
};

export const nav = [
  { label: "হোম", href: "/#home" },
  { label: "ফিচারসমূহ", href: "/#features" },
  { label: "আমাদের কথা", href: "/#about" },
  { label: "রোডম্যাপ", href: "/#roadmap" },
  { label: "প্রশ্নোত্তর", href: "/#faq" },
  { label: "যোগাযোগ", href: "/#contact" },
  { label: "টিম", href: "/team" },
];

export const features = [
  {
    icon: "ShieldCheck",
    title: "নিরাপদ Wi-Fi শেয়ারিং",
    description:
      "এন্ড-টু-এন্ড এনক্রিপশন ও পারমিশন কন্ট্রোল সহ প্রাইমারি নেটওয়ার্ক নিরাপদ রেখে সহজে ইন্টারনেট শেয়ার করুন।",
  },
  {
    icon: "Network",
    title: "স্মার্ট নেটওয়ার্ক ম্যানেজমেন্ট",
    description:
      "এক সিঙ্গেল ড্যাশবোর্ড থেকে কানেক্টেড ডিভাইস, ব্যান্ডউইথ ও অ্যাক্টিভ সেশন রিয়েল-টাইমে মনিটর করুন।",
  },
  {
    icon: "SlidersHorizontal",
    title: "ইন্টারনেট অ্যাক্সেস কন্ট্রোল",
    description:
      "ইউজার কোটা, সময়সীমা ও লিমিট সেট করুন। যেকোনো ডিভাইস অনায়াসে ম্যানেজ বা ব্লক করুন।",
  },
  {
    icon: "KeyRound",
    title: "সেশন-ভিত্তিক অথেনটিকেশন",
    description:
      "অটোমেটিক টোকেন রোটেশন সহ শর্ট-লিভড সেশন কি আপনার প্রতিটি কানেকশন রাখে সুরক্ষিত।",
  },
  {
    icon: "Building2",
    title: "এন্টারপ্রাইজ রেডি",
    description:
      "টিম, ক্যাম্পাস ও প্রতিষ্ঠানের জন্য SSO, রোল-ভিত্তিক অ্যাক্সেস এবং বিস্তারিত অডিট লগ সুবিধা।",
  },
  {
    icon: "Cloud",
    title: "ক্লাউড কানেক্টেড",
    description:
      "অফলাইন-ফার্স্ট সুবিধা এবং ক্লাউড সিঙ্ক দিয়ে একাধিক লোকেশনে পলিসি ও টেলিমেট্রি সিঙ্ক রাখুন।",
  },
  {
    icon: "MonitorSmartphone",
    title: "ক্রস-প্ল্যাটফর্ম অ্যাপস",
    description:
      "Android, Windows, macOS এবং Linux এর জন্য নেটিভ অ্যাপ। এক অ্যাকাউন্টে সব জায়গায় কানেক্টেড।",
  },
  {
    icon: "Gauge",
    title: "দ্রুত ডাউনলোড সুবিধা",
    description:
      "গ্লোবাল সিডিএন দিয়ে যেকোনো স্থান থেকে পলক ফেলার আগেই দ্রুত অ্যাপ ইনস্টলার পান।",
  },
];

export const roadmap = [
  {
    phase: "ধাপ ১",
    title: "বিশ্ববিদ্যালয়ে শুভসূচনা",
    status: "সম্পন্ন",
    description:
      "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাসে হাজারো শিক্ষার্থীর রিয়েল নেটওয়ার্ক সমস্যা সমাধানে প্রথম সফল পাইলট রোলআউট।",
  },
  {
    phase: "ধাপ ২",
    title: "দেশব্যাপী সম্প্রসারণ",
    status: "চলমান",
    description:
      "বাংলাদেশের বিভিন্ন ক্যাম্পাস, ক্যাফে, কো-ওয়ার্কিং স্পেস ও স্থানীয় ISP-তে সার্ভিস স্কেলিং।",
  },
  {
    phase: "ধাপ ৩",
    title: "এন্টারপ্রাইজ সলিউশন",
    status: "পরবর্তী",
    description:
      "বড় প্রতিষ্ঠান ও মাল্টি-সাইট ম্যানেজমেন্টের জন্য SSO এবং অ্যাডভান্সড সিকিউরিটি পলিসি।",
  },
  {
    phase: "ধাপ ৪",
    title: "গ্লোবাল বিকাশ",
    status: "পরিকল্পিত",
    description:
      "আন্তর্জাতিক পরিসরে নিয়ন্ত্রিত ও নিরাপদ ডিজিটাল কানেক্টিভিটি প্ল্যাটফর্মের গ্লোবাল রোলআউট।",
  },
];

export const faqs = [
  {
    q: "ShareLynk মূলত কী?",
    a: "ShareLynk হলো একটি আধুনিক ও নিরাপদ কানেক্টিভিটি প্ল্যাটফর্ম, যা দিয়ে ব্যবহারকারী ও প্রতিষ্ঠানসমূহ নিরাপদে ইন্টারনেট শেয়ার এবং নিজস্ব নেটওয়ার্ক পরিচালনা করতে পারে।",
  },
  {
    q: "কোন কোন অপারেটিং সিস্টেমে এটি চলবে?",
    a: "বর্তমানে Android, Windows (x64 & ARM), macOS (Intel & Apple Silicon), এবং Linux (AppImage, .deb, .rpm) সাপোর্ট করে। iOS ও Web অ্যাপ রিলিজের কাজ চলছে।",
  },
  {
    q: "ShareLynk কতটা নিরাপদ?",
    a: "সম্পূর্ণ নিরাপদ। এতে রয়েছে এন্ড-টু-এন্ড এনক্রিপশন, শর্ট-লিভড সেশন টোকেন এবং রোল-ভিত্তিক অ্যাক্সেস কন্ট্রোল। আপনি ঠিক করবেন কে এবং কতক্ষণ কানেক্ট থাকবে।",
  },
  {
    q: "অ্যাপ ডাউনলোড করা কি ফ্রি?",
    a: "হ্যাঁ, আমাদের কোর অ্যাপসমূহ সম্পূর্ণ ফ্রিতে ডাউনলোড ও ব্যবহার করা যায়।",
  },
  {
    q: "ভার্সন আপডেট কীভাবে পাওয়া যায়?",
    a: "নতুন ভার্সন রিলিজ হওয়া মাত্রই অ্যাপ এবং এই ডাউনলোডের পেইজে অটোমেটিক আপডেট চলে আসে।",
  },
  {
    q: "আমাদের ক্যাম্পাস বা ব্যবসায় কীভাবে ব্যবহার করব?",
    a: "ShareLynk ক্যাম্পাস, অফিস, ক্যাফে ও বিজনেসের জন্য শতভাগ উপযোগী। যোগাযোগের ফর্মে মেসেজ দিলেই আমাদের টিম সাহায্য করবে।",
  },
];

export const stats = [
  { value: "১০+", label: "প্ল্যাটফর্ম সাপোর্ট" },
  { value: "২৫৬-বিট", label: "এনক্রিপ্টেড সেশন" },
  { value: "৯৯.৯%", label: "রিলিজ আপটাইম" },
  { value: "২৪/৭", label: "গ্লোবাল সার্ভিস" },
];

export const contact = {
  emails: ["contact@sharelynk.app", "support@sharelynk.app"],
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "+880 1XXX-XXXXXX",
  office: { line1: "ঢাকা বিশ্ববিদ্যালয়", line2: "ঢাকা ১০০০, বাংলাদেশ" },
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
