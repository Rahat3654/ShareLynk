"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, MapPin, Send, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";

const cards = [
  {
    icon: Mail,
    title: "ইমেইল করুন",
    lines: contact.emails,
    hrefs: contact.emails.map((e) => `mailto:${e}`),
  },
  {
    icon: Phone,
    title: "ফোন করুন",
    lines: [contact.phone],
    hrefs: [`tel:${contact.phone.replace(/\s/g, "")}`],
  },
  {
    icon: MessageSquare,
    title: "হোয়াটসঅ্যাপ (WhatsApp)",
    lines: [contact.whatsapp],
    hrefs: [`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`],
  },
  {
    icon: MapPin,
    title: "আমাদের অফিস",
    lines: [contact.office.line1, contact.office.line2],
    hrefs: [],
  },
];

export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  const inputCls =
    "w-full rounded-2xl border border-white/15 bg-ink-950/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/25";

  return (
    <section id="contact" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow="যোগাযোগ"
          title={
            <>
              সরাসরি কথা বলুন <span className="text-gradient">আমাদের টিমের সাথে</span>
            </>
          }
          description="যেকোনো তথ্য, সহায়তা বা পার্টনারশিপের জন্য নিচের ফর্মে বার্তা পাঠাতে পারেন।"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Contact cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-brand-cyan/30">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/15 ring-1 ring-white/10">
                    <c.icon className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{c.title}</h3>
                  <div className="mt-2 space-y-1">
                    {c.lines.map((line, j) =>
                      c.hrefs[j] ? (
                        <a key={line} href={c.hrefs[j]} className="block text-sm text-slate-400 transition-colors hover:text-brand-cyan">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-slate-400">{line}</p>
                      )
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Contact form */}
          <Reveal delay={1}>
            <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">আপনার নাম</label>
                  <input name="name" required placeholder="নাম লিখুন" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">ইমেইল ঠিকানা</label>
                  <input name="email" type="email" required placeholder="আপনার ইমেইল..." className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">বিষয়</label>
                <input name="subject" placeholder="কী বিষয়ে জানতে চান?" className={inputCls} />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">বার্তা</label>
                <textarea name="message" required rows={4} placeholder="আপনার বার্তা বিস্তারিত লিখুন..." className={inputCls} />
              </div>
              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 py-3.5 font-medium text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-70"
              >
                {state === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : state === "done" ? (
                  <><Check className="h-5 w-5" /> মেসেজ পাঠানো হয়েছে</>
                ) : (
                  <><Send className="h-4 w-4" /> মেসেজ পাঠান</>
                )}
              </button>
              {state === "done" && (
                <p className="mt-3 text-center text-sm text-emerald-300">ধন্যবাদ! আপনার মেসেজ আমরা পেয়েছি। খুব দ্রুতই উত্তর দেব।</p>
              )}
              {state === "error" && (
                <p className="mt-3 text-center text-sm text-amber-300">মেসেজ পাঠানো সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
