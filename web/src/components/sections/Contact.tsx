"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, MapPin, Send, Loader2, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";

const cards = [
  {
    icon: Mail,
    title: "Email us",
    lines: contact.emails,
    hrefs: contact.emails.map((e) => `mailto:${e}`),
  },
  {
    icon: Phone,
    title: "Call us",
    lines: [contact.phone],
    hrefs: [`tel:${contact.phone.replace(/\s/g, "")}`],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    lines: [contact.whatsapp],
    hrefs: [`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`],
  },
  {
    icon: MapPin,
    title: "Visit us",
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
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something <span className="text-gradient">connected</span>
            </>
          }
          description="Questions, partnerships, or enterprise deployments — our team in Dhaka is ready to help."
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
                  <label className="mb-1.5 block text-sm text-slate-300">Name</label>
                  <input name="name" required placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">Email</label>
                  <input name="email" type="email" required placeholder="you@company.com" className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">Subject</label>
                <input name="subject" placeholder="How can we help?" className={inputCls} />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">Message</label>
                <textarea name="message" required rows={4} placeholder="Tell us about your project or question…" className={inputCls} />
              </div>
              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 py-3.5 font-medium text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-70"
              >
                {state === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : state === "done" ? (
                  <><Check className="h-5 w-5" /> Message sent</>
                ) : (
                  <><Send className="h-4 w-4" /> Send message</>
                )}
              </button>
              {state === "done" && (
                <p className="mt-3 text-center text-sm text-emerald-300">Thanks! We&apos;ll get back to you shortly.</p>
              )}
              {state === "error" && (
                <p className="mt-3 text-center text-sm text-amber-300">Couldn&apos;t send. Please try again.</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
