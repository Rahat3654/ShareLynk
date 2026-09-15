import { cn } from "@/lib/utils";

/** Titled surface used for every dashboard block, so spacing stays uniform. */
export function Panel({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("glass rounded-2xl p-5 shadow-card sm:p-6", className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
