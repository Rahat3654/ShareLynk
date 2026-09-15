"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Labelled text input for the owner forms.
 *
 * The label is a real <label for> rather than a placeholder: placeholder-only
 * fields disappear the moment someone types and are skipped by most screen
 * readers.
 */
export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  hint,
  className,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "type" | "className">) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hintId}
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white",
          "placeholder:text-slate-500",
          "transition-colors focus:border-brand-cyan/60 focus:bg-white/[0.06]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * role="alert" so the message is announced when it appears — a silently
 * rendered error leaves a screen-reader user staring at a form that did
 * nothing.
 */
export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export function FormNotice({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200"
    >
      {message}
    </div>
  );
}
