"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Loader2, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(120deg,rgba(15,76,255,0.18),rgba(0,194,255,0.08))] px-6 py-14 text-center sm:px-12">
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">
              <Mail className="h-3.5 w-3.5" /> Newsletter
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Stay ahead of every release
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Get product updates, new platform builds, and connectivity insights — no spam, unsubscribe anytime.
            </p>

            <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="h-13 w-full rounded-full border border-white/15 bg-ink-950/60 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-brand-cyan/60 focus:ring-2 focus:ring-brand-cyan/30"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={state === "loading" || state === "done"}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#0F4CFF,#00C2FF)] px-6 font-medium text-white shadow-glow-sm transition hover:shadow-glow disabled:opacity-70"
              >
                {state === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : state === "done" ? (
                  <><Check className="h-5 w-5" /> Subscribed</>
                ) : (
                  <>Subscribe <ArrowRight className="h-4 w-4" /></>
                )}
              </motion.button>
            </form>
            {state === "error" && (
              <p className="mt-3 text-sm text-amber-300">Something went wrong. Please try again.</p>
            )}
            {state === "done" && (
              <p className="mt-3 text-sm text-emerald-300">You&apos;re on the list — welcome aboard! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
