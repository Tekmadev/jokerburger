import type { Suit } from "@/data/menu";
import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";
import { SuitIcon, suitTone } from "./icons";
import { SectionHeading } from "./ui";

const aces: Array<{ suit: Suit; tilt: string }> = [
  { suit: "spade", tilt: "-rotate-2" },
  { suit: "heart", tilt: "rotate-[1.5deg]" },
  { suit: "diamond", tilt: "-rotate-1" },
  { suit: "club", tilt: "rotate-2" },
];

/** "Nos 4 as" — the four reasons to pick Joker, dealt as four aces. */
export function WhyUs({ t }: { t: Dictionary["why"] }) {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-joker py-16 text-cream sm:py-24">
      <div aria-hidden="true" className="card-back absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="why-title" eyebrow={t.eyebrow} title={t.title} onRed />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const { suit, tilt } = aces[i % aces.length];
            const red = suitTone[suit] === "red";
            return (
              <li
                key={item.title}
                className={cx(
                  "relative flex min-h-[16rem] flex-col rounded-[1.25rem] bg-cream p-4 text-ink shadow-[0_30px_60px_-25px_rgb(0_0_0/0.75)] transition duration-500 ease-snap hover:-translate-y-2 hover:rotate-0 sm:aspect-[5/7] sm:min-h-0 sm:p-6",
                  tilt,
                )}
              >
                <AceIndex suit={suit} red={red} className="flex" />
                <div className="flex flex-1 items-center justify-center py-3">
                  <SuitIcon suit={suit} className={cx("size-14 sm:size-20", red ? "text-joker" : "text-ink")} />
                </div>
                <h3 className="font-display text-[1.35rem] uppercase leading-[0.95] sm:text-3xl">{item.title}</h3>
                <p className="mt-2 text-xs leading-snug text-ink/70 sm:pr-6 sm:text-sm">{item.text}</p>
                <AceIndex suit={suit} red={red} className="absolute bottom-4 right-4 hidden rotate-180 sm:flex" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function AceIndex({ suit, red, className }: { suit: Suit; red: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("w-fit flex-col items-center leading-none", red ? "text-joker" : "text-ink", className)}
    >
      <span className="font-display text-xl sm:text-2xl">A</span>
      <SuitIcon suit={suit} className="mt-0.5 size-3.5 sm:size-4" />
    </span>
  );
}
