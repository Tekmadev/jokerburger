"use client";

import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";
import { isOpenAt } from "@/lib/time";
import { useRestaurantTime } from "@/lib/use-restaurant-time";

const WEEK = [1, 2, 3, 4, 5, 6, 0];

type Props = {
  t: Dictionary["location"];
  days: Dictionary["days"];
  delivery: string;
};

/** Opening hours with today's row highlighted and a live open/closed pill (Montreal time). */
export function Hours({ t, days, delivery }: Props) {
  const now = useRestaurantTime();
  const open = now ? isOpenAt(now) : null;

  return (
    <div className="rounded-3xl bg-ink-2 p-5 ring-1 ring-cream/10 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl uppercase tracking-wide">{t.hours}</h3>
        {open !== null && (
          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold",
              open ? "bg-emerald-400/10 text-emerald-300" : "bg-joker/15 text-joker-light",
            )}
          >
            <span className={cx("size-2 rounded-full", open ? "animate-pulse bg-emerald-400" : "bg-joker-light")} />
            {open ? t.openUntil : t.closed}
          </span>
        )}
      </div>

      <table className="mt-4 w-full text-sm">
        <tbody>
          {WEEK.map((day) => {
            const isToday = now?.weekday === day;
            return (
              <tr
                key={day}
                aria-current={isToday ? "date" : undefined}
                className={cx(
                  "border-t border-cream/5 first:border-t-0",
                  isToday ? "font-bold text-cheese" : "text-cream/75",
                )}
              >
                <th scope="row" className="py-2 text-left font-[inherit] capitalize">
                  {days.long[day]}
                </th>
                <td className="py-2 text-right tabular-nums">{t.hoursValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-cream/60">{delivery}</p>
    </div>
  );
}
