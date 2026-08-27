import { GraduationCap, Target, Users, Globe2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  { icon: GraduationCap, title: "ঢাকা বিশ্ববিদ্যালয় থেকে সূচনা", text: "শিক্ষার্থীদের প্রতিদিনের ইন্টারনেট শেয়ারিং ও নেটওয়ার্ক সমস্যা সমাধানের লক্ষ্যে ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাসে ShareLynk-এর যাত্রা শুরু।" },
  { icon: Users, title: "দেশসেরা ইঞ্জিনিয়ারদের উদ্যোগ", text: "সিকিউরিটি ও পারফর্ম্যান্স নিয়ে দারুণ সচেতন একদল তরুণ ডেভেলপার দিয়ে শেয়ারলিংক তৈরি ও পরিচালিত।" },
  { icon: Target, title: "বাস্তব সমস্যার সহজ সমাধান", text: "শেয়ার করা নেটওয়ার্কের আনপ্রেডিক্টেবল স্পিড, অতিরিক্ত ডিভাইস ও নিরাপত্তার অভাব দূর করাই আমাদের মূল ফোকাস।" },
  { icon: Globe2, title: "গ্লোবাল কানেক্টিভিটি মিশন", text: "আমাদের ভবিষ্যৎ লক্ষ্য হলো বিশ্বজুড়ে যেকোনো ব্যক্তি ও প্রতিষ্ঠানের জন্য নিরাপদ ও গ্রহণযোগ্য নেটওয়ার্ক প্ল্যাটফর্ম তৈরি করা।" },
];

export function About() {
  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="আমাদের পথচলা"
              title={
                <>
                  ক্যাম্পাসের উদ্ভাবন থেকে <span className="text-gradient">কানেক্টিভিটি প্ল্যাটফর্ম</span>
                </>
              }
            />
            <Reveal delay={2}>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস থেকে শুরু হওয়া ShareLynk একটি সুরক্ষিত ডিজিটাল কানেক্টিভিটি প্ল্যাটফর্ম। আমরা এমন একটি সলিউশন তৈরি করছি যা দিয়ে যে কেউ নিরাপদে ইন্টারনেট শেয়ার ও পুরো নেটওয়ার্ক সহজে ম্যানেজ করতে পারে।
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm uppercase tracking-wider text-cyan-200/80 font-medium">আমাদের লক্ষ্য</p>
                <p className="mt-2 text-xl font-medium text-white">
                  বিশ্বজুড়ে নিরাপদ ও নিয়ন্ত্রিত নেটওয়ার্ক শেয়ারিংয়ের জন্য সবচেয়ে নির্ভরযোগ্য ডিজিটাল কানেক্টিভিটি প্ল্যাটফর্ম হয়ে ওঠা।
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-cyan/30">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/15 ring-1 ring-white/10">
                    <p.icon className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
