"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, MapPin, Send, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";
import type { Dictionary } from "@/i18n";

export function Contact({ t }: { t: Dictionary }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const cards = [
    {
      icon: Mail,
      title: t.contact.emailCard,
      lines: contact.emails,
      hrefs: contact.emails.map((e) => `mailto:${e}`),
    },
    {
      icon: Phone,
      title: t.contact.phoneCard,
      lines: [contact.phone],
      hrefs: [`tel:${contact.phone.replace(/\s/g, "")}`],
    },
    {
      icon: MessageSquare,
      title: t.contact.whatsappCard,
      lines: [contact.whatsapp],
      hrefs: [`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`],
    },
    {
      icon: MapPin,
      title: t.contact.officeCard,
      lines: [t.contact.office.line1, t.contact.office.line2],
      hrefs: [] as string[],
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
          eyebrow={t.contact.eyebrow}
          title={
            <>
              {t.contact.titleA} <span className="text-gradient">{t.contact.titleB}</span>
            </>
          }
          description={t.contact.description}
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
                  <label className="mb-1.5 block text-sm text-slate-300">{t.contact.form.name}</label>
                  <input name="name" required placeholder={t.contact.form.namePlaceholder} className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">{t.contact.form.email}</label>
                  <input name="email" type="email" required placeholder={t.contact.form.emailPlaceholder} className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">{t.contact.form.subject}</label>
                <input name="subject" placeholder={t.contact.form.subjectPlaceholder} className={inputCls} />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">{t.contact.form.message}</label>
                <textarea name="message" required rows={4} placeholder={t.contact.form.messagePlaceholder} className={inputCls} />
              </div>
              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 py-3.5 font-medium text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-70"
              >
                {state === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : state === "done" ? (
                  <><Check className="h-5 w-5" /> {t.contact.form.sent}</>
                ) : (
                  <><Send className="h-4 w-4" /> {t.contact.form.submit}</>
                )}
              </button>
              {state === "done" && (
                <p className="mt-3 text-center text-sm text-emerald-300">{t.contact.form.success}</p>
              )}
              {state === "error" && (
                <p className="mt-3 text-center text-sm text-amber-300">{t.contact.form.error}</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
