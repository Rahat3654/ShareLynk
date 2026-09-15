import type { SeriesPoint } from "@/lib/owner/series";
import { EmptyState } from "@/components/owner/States";
import { BarChart3 } from "lucide-react";

/**
 * Bar chart for the analytics series.
 *
 * Hand-rolled SVG on purpose: the project has no charting dependency, the
 * Flutter owner portal draws its own bars too (owner_pages.dart `_BarChart`),
 * and one chart does not justify pulling ~100kB of Recharts into a marketing
 * site's bundle. It is a server component — no client JS at all.
 *
 * It plots CONNECTIONS. The backend has no earnings time series (see
 * lib/owner/series.ts), so labelling this "earnings over time" would be
 * inventing a number; the caller titles it accordingly.
 */
export function ConnectionsChart({
  points,
  label,
}: {
  points: SeriesPoint[];
  label: string;
}) {
  if (points.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No activity yet"
        message="Once people start connecting to your Wi-Fi, their activity appears here."
      />
    );
  }

  const max = Math.max(...points.map((p) => p.value), 1);
  const allZero = points.every((p) => p.value === 0);

  return (
    <figure className="m-0">
      {/*
        The bars are decorative to assistive tech; the table below carries the
        same numbers, so a screen reader gets exact values rather than a shape.
      */}
      <div className="flex h-44 items-end gap-1.5 sm:h-52 sm:gap-2.5" aria-hidden="true">
        {points.map((p) => {
          // Floor at 2% so an empty bucket is still a visible baseline rather
          // than nothing at all, which reads as missing data.
          const pct = allZero ? 2 : Math.max((p.value / max) * 100, p.value > 0 ? 4 : 2);
          return (
            <div key={p.key} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-[linear-gradient(180deg,#00C2FF,#0F4CFF)] transition-[height] duration-500"
                  style={{ height: `${pct}%` }}
                />
              </div>
              <span className="w-full truncate text-center text-[11px] text-slate-500">
                {p.label}
              </span>
            </div>
          );
        })}
      </div>

      <figcaption className="sr-only">
        <table>
          <caption>{label}</caption>
          <thead>
            <tr>
              <th scope="col">Period</th>
              <th scope="col">Connections</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.key}>
                <th scope="row">{p.key}</th>
                <td>{p.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figcaption>
    </figure>
  );
}
