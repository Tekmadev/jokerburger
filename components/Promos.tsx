"use client";

import { useEffect, useRef } from "react";
import { promos, promosForDay, type Promo } from "@/data/promos";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { fill, formatPrice } from "@/lib/format";
import { useRestaurantTime } from "@/lib/use-restaurant-time";
import { SuitIcon, suitTone } from "./icons";
import { SectionHeading } from "./ui";

type Props = {
  lang: Locale;
  t: Dictionary["promos"];
  days: Dictionary["days"];
};

const WEEK = [1, 2, 3, 4, 5, 6, 0];

export function Promos({ lang, t, days }: Props) {
  const now = useRestaurantTime();
  const todays = now ? promosForDay(now.weekday) : [];
  const todayIds = new Set(todays.map((promo) => promo.id));
  const lead = todays[0];

  const scrollerRef = useRef<HTMLUListElement>(null);
  const firstTodayId = lead?.id;

  // When the strip first comes into view, glide it over to today's deal.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !firstTodayId) return;
    const card = scroller.querySelector<HTMLElement>(`[data-promo="${firstTodayId}"]`);
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.setTimeout(() => {
          scroller.scrollTo({ left: card.offsetLeft - padding, behavior: reduce ? "auto" : "smooth" });
        }, 350);
      },
      { threshold: 0.5 },
    );
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [firstTodayId]);

  return (
    <section id="promos" aria-labelledby="promos-title" className="relative py-16 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionHeading id="promos-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <p className="mt-4 min-h-7 text-lg font-semibold text-cream" aria-live="polite">
            {now && lead && (
              <>
                <span className="text-cream/60">{fill(t.todayIs, { day: days.long[now.weekday] })}</span>{" "}
                <span className="text-cheese">{lead.title[lang]}</span>
              </>
            )}
          </p>
        </div>

        <ol aria-label={t.calendar} className="grid grid-cols-7 gap-1.5 sm:gap-2 lg:w-[26rem] lg:shrink-0">
          {WEEK.map((day) => {
            const deal = promosForDay(day)[0];
            const isToday = now?.weekday === day;
            return (
              <li
                key={day}
                aria-current={isToday ? "date" : undefined}
                className={cx(
                  "flex flex-col items-center gap-1 rounded-xl py-2.5 ring-1 transition-colors duration-500",
                  isToday ? "bg-cheese text-ink ring-cheese" : "bg-ink-2 text-cream ring-cream/10",
                )}
              >
                <span className={cx("text-[0.65rem] font-bold uppercase tracking-wider", !isToday && "text-cream/55")}>
                  {days.short[day]}
                </span>
                <span className="font-display text-[0.95rem] leading-none sm:text-lg">
                  {deal?.price ? deal.price.toFixed(2) : "—"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <ul
        ref={scrollerRef}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-8 pt-5 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {promos.map((promo) => (
          <PromoCard
            key={promo.id}
            promo={promo}
            lang={lang}
            t={t}
            highlight={todayIds.has(promo.id) ? (promo.fromHour ? t.tonight : t.today) : null}
          />
        ))}
      </ul>

      <p className="mx-auto max-w-7xl px-5 text-xs text-cream/60 sm:px-8">{t.note}</p>
    </section>
  );
}

function PromoCard({
  promo,
  lang,
  t,
  highlight,
}: {
  promo: Promo;
  lang: Locale;
  t: Dictionary["promos"];
  highlight: string | null;
}) {
  const red = suitTone[promo.suit] === "red";
  const soon = promo.comingSoon;

  return (
    <li data-promo={promo.id} className="shrink-0 snap-start">
      <article
        className={cx(
          "relative flex aspect-[5/7] w-[min(70vw,17rem)] flex-col rounded-[1.4rem] p-5 transition duration-500 ease-snap",
          soon
            ? "border-2 border-dashed border-cream/20 bg-ink-2 text-cream"
            : "bg-cream text-ink shadow-[0_24px_50px_-24px_rgb(0_0_0/0.9)]",
          highlight && "-translate-y-2 rotate-[-1.5deg] ring-4 ring-cheese ring-offset-4 ring-offset-ink",
        )}
      >
        {highlight && (
          <span className="absolute -top-3.5 left-5 rounded-full bg-joker px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {highlight}
          </span>
        )}

        <header className="flex items-start justify-between gap-3">
          <p className={cx("text-[0.7rem] font-bold uppercase tracking-[0.18em]", soon ? "text-cheese" : "text-ink/60")}>
            {promo.when[lang]}
          </p>
          <SuitIcon
            suit={promo.suit}
            className={cx("size-6 shrink-0", red ? "text-joker" : soon ? "text-cream" : "text-ink")}
          />
        </header>

        <div className="flex flex-1 items-center">
          {promo.price ? (
            <p className={cx("font-display leading-none", red ? "text-joker" : "text-ink")}>
              <span className="text-[4.5rem] sm:text-[5rem]">{formatPrice(promo.price, lang)}</span>
            </p>
          ) : (
            <p className="-rotate-6 rounded-lg border-[3px] border-joker-light px-3 py-1 font-display text-4xl uppercase tracking-wide text-joker-light">
              {t.comingSoon}
            </p>
          )}
        </div>

        <h3 className="font-display text-[1.6rem] uppercase leading-[0.95]">{promo.title[lang]}</h3>
        <p className={cx("mt-2 text-sm leading-snug", soon ? "text-cream/65" : "text-ink/70")}>
          {promo.description[lang]}
        </p>

        <SuitIcon
          suit={promo.suit}
          aria-hidden="true"
          className={cx(
            "absolute bottom-4 right-4 size-4 rotate-180 opacity-60",
            red ? "text-joker" : soon ? "text-cream" : "text-ink",
          )}
        />
      </article>
    </li>
  );
}
