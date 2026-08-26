"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import type { TeamMember } from "@/data/team";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  const initials = getInitials(member.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/40 hover:bg-slate-900/90 hover:shadow-glow-sm ${
        featured ? "p-8 lg:p-10 border-brand-cyan/30 bg-gradient-to-br from-brand-blue/15 via-slate-900/80 to-slate-950/90" : "p-6"
      }`}
    >
      {/* Background glow on hover */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-blue/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div>
        {/* Header Avatar & Info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-brand-cyan/40 shadow-md"
              />
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan font-bold text-white text-lg shadow-lg ring-2 ring-white/15">
                {initials}
              </div>
            )}
            {featured && (
              <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-brand-cyan text-slate-950 shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-white truncate tracking-tight">{member.name}</h3>
            
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-0.5 text-xs font-semibold text-brand-cyan">
                {member.role}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <GraduationCap className="h-3.5 w-3.5 text-brand-cyan shrink-0" />
              <span className="truncate">{member.institution}</span>
            </p>
          </div>
        </div>

        {/* Optional Bio (Leadership card) */}
        {member.bio && (
          <p className="mt-4 text-sm leading-relaxed text-slate-300 font-normal">
            {member.bio}
          </p>
        )}

        {/* Contribution Section */}
        <div className="mt-6 border-t border-white/10 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Contribution to ShareLynk
          </h4>
          <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-slate-300">
            {member.contributions.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills / Tech Stack Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links Footer */}
      {member.socials && (
        <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/10 pt-4">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-brand-cyan/40 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} GitHub`}
              className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-brand-cyan/40 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
