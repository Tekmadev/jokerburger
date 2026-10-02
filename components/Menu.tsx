"use client";

import { domAnimation, LazyMotion, m, MotionConfig } from "motion/react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { menu, type MenuItem, type Suit } from "@/data/menu";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { formatPrice } from "@/lib/format";
import { ArrowUpRight, JokerStar, SuitIcon, suitTone } from "./icons";
import { button, SectionHeading } from "./ui";

type Props = {
  lang: Locale;
  t: Dictionary["menu"];
};

export function Menu({ lang, t }: Props) {
  const [activeId, setActiveId] = useState(menu[0].id);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const active = menu.find((category) => category.id === activeId) ?? menu[0];

  function select(index: number) {
    setActiveId(menu[index].id);
    // Keep the chosen tab visible in the horizontally scrolling tab bar on phones.
    tabsRef.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = menu.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="suit-pattern relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="menu-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div
          role="tablist"
          aria-label={t.tabs}
          className="scrollbar-none -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {menu.map((category, index) => {
            const selected = category.id === active.id;
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls="menu-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cx(
                  "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-display text-lg uppercase tracking-wide transition duration-200",
                  selected
                    ? "bg-joker text-white shadow-[0_10px_28px_-12px_rgb(225_29_46/0.9)]"
                    : "bg-ink-2 text-cream/70 ring-1 ring-cream/10 hover:text-cream hover:ring-cream/30",
                )}
              >
                <SuitIcon suit={category.suit} className={cx("size-3.5", selected ? "text-white" : "text-cream/40")} />
                {category.label[lang]}
              </button>
            );
          })}
        </div>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="mt-8">
          {active.tagline && (
            <p className="mb-5 flex items-center gap-3 font-display text-xl uppercase tracking-wide text-cheese">
              <span className="h-px w-8 bg-cheese/60" />
              {active.tagline[lang]}
            </p>
          )}

          <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
              <ul key={active.id} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {active.items.map((item, index) => (
                  <li key={item.id} className="[perspective:1400px]">
                    <m.div
                      className="relative h-full [transform-style:preserve-3d]"
                      initial={{ rotateY: 180 }}
                      whileInView={{ rotateY: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.85, delay: index * 0.09, ease: [0.2, 0.9, 0.1, 1] }}
                    >
                      <MenuCard item={item} lang={lang} t={t} suit={active.suit} />
                      <CardBack />
                    </m.div>
                  </li>
                ))}
              </ul>
            </MotionConfig>
          </LazyMotion>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/60">{t.footnote}</p>
          <a href={site.links.uberEats} target="_blank" rel="noopener noreferrer" className={button("primary", "md")}>
            {t.order}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuCard({
  item,
  lang,
  t,
  suit,
}: {
  item: MenuItem;
  lang: Locale;
  t: Dictionary["menu"];
  suit: Suit;
}) {
  const price = item.comingSoon
    ? t.comingSoon
    : item.price
      ? formatPrice(item.price, lang)
      : t.yourWay;

  return (
    <article className="group flex h-full flex-col rounded-[1.25rem] bg-ink-2 p-2 ring-1 ring-cream/10 [backface-visibility:hidden] transition duration-300 hover:-translate-y-1 hover:ring-cheese/40 sm:p-2.5">
      <div className="relative aspect-square overflow-hidden rounded-[0.95rem] bg-black">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw"
          className={cx(
            "object-cover transition duration-700 ease-snap group-hover:scale-[1.06]",
            item.comingSoon && "opacity-70 grayscale-[35%]",
          )}
        />
        <SuitIcon
          suit={suit}
          className={cx(
            "absolute left-2.5 top-2.5 size-4 drop-shadow",
            suitTone[suit] === "red" ? "text-joker" : "text-cream",
          )}
        />
        {item.rank && (
          <span className="absolute right-2 top-2 rounded-full bg-cheese px-2 py-1 text-[0.6rem] font-extrabold uppercase leading-none tracking-wide text-ink shadow-md sm:text-xs">
            #{item.rank} {t.mostLiked}
          </span>
        )}
        {item.comingSoon && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-fit -rotate-6 rounded-md border-2 border-joker-light bg-ink/70 px-2.5 py-0.5 font-display text-xl uppercase tracking-wide text-joker-light backdrop-blur-sm">
            {t.comingSoon}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3 sm:px-2">
        <h3 className="font-display text-lg uppercase leading-[1.05] sm:text-2xl">{item.name}</h3>
        <p className="mt-1.5 line-clamp-3 text-xs leading-snug text-cream/60 sm:text-sm">{item.description[lang]}</p>
        <p
          className={cx(
            "mt-auto pt-3 font-display leading-none",
            item.price && !item.comingSoon ? "text-2xl text-cheese sm:text-3xl" : "text-lg uppercase text-cream/70",
          )}
        >
          {price}
        </p>
      </div>
    </article>
  );
}

/** The red back of the card, seen during the flip. */
function CardBack() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-[1.25rem] bg-cream p-2 [backface-visibility:hidden] [transform:rotateY(180deg)]"
    >
      <div className="card-back grid size-full place-items-center rounded-[0.95rem]">
        <span className="grid size-16 place-items-center rounded-full bg-cream text-joker ring-4 ring-joker/30 sm:size-20">
          <JokerStar className="size-8 sm:size-10" />
        </span>
      </div>
    </div>
  );
}
