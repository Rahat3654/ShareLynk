"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, MapPin, Send, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const { language } = useLanguage();
  const t = translations[language].contact;

  const cards = [
    {
      icon: Mail,
      title: t.cards.email,
      lines: contact.emails,
      hrefs: contact.emails.map((e) => `mailto:${e}`),
    },
    {
      icon: Phone,
      title: t.cards.phone,
      lines: [contact.phone],
      hrefs: [`tel:${contact.phone.replace(/\s/g, "")}`],
    },
    {
      icon: MessageSquare,
      title: t.cards.whatsapp,
      lines: [contact.whatsapp],
      hrefs: [`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`],
    },
    {
      icon: MapPin,
      title: t.cards.office,
      lines: [
        language === "en" ? "University of Dhaka" : contact.office.line1,
        language === "en" ? "Dhaka 1000, Bangladesh" : contact.office.line2,
      ],
      hrefs: [],
    },
  ];

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
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleStart} <span className="text-gradient">{t.titleGradient}</span>
            </>
          }
          description={t.description}
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
                  <label className="mb-1.5 block text-sm text-slate-300">{t.form.nameLabel}</label>
                  <input name="name" required placeholder={t.form.namePlaceholder} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">{t.form.emailLabel}</label>
                  <input name="email" type="email" required placeholder={t.form.emailPlaceholder} className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">{t.form.subjectLabel}</label>
                <input name="subject" placeholder={t.form.subjectPlaceholder} className={inputCls} />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">{t.form.messageLabel}</label>
                <textarea name="message" required rows={4} placeholder={t.form.messagePlaceholder} className={inputCls} />
              </div>
              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 py-3.5 font-medium text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-70"
              >
                {state === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : state === "done" ? (
                  <><Check className="h-5 w-5" /> {t.form.submitDone}</>
                ) : (
                  <><Send className="h-4 w-4" /> {t.form.submitIdle}</>
                )}
              </button>
              {state === "done" && (
                <p className="mt-3 text-center text-sm text-emerald-300">{t.form.successMsg}</p>
              )}
              {state === "error" && (
                <p className="mt-3 text-center text-sm text-amber-300">{t.form.errorMsg}</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
