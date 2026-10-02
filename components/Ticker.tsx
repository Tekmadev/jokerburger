import type { Suit } from "@/data/menu";
import { SuitIcon } from "./icons";

const suits: Suit[] = ["spade", "heart", "diamond", "club"];

/** Loud cheese-yellow band of slogans, in the brand's own deal-driven voice. Decorative. */
export function Ticker({ items }: { items: string[] }) {
  return (
    <div aria-hidden="true" className="relative z-10 overflow-hidden py-5">
      <div className="-mx-[5%] w-[110%] -rotate-2 bg-cheese py-3 text-ink shadow-[0_18px_40px_-18px_rgb(255_197_49/0.5)]">
        <div className="flex w-max animate-ticker motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {items.map((item, i) => (
                <li key={item} className="flex items-center font-display text-2xl uppercase tracking-wide sm:text-3xl">
                  <span className="px-5 sm:px-7">{item}</span>
                  <SuitIcon
                    suit={suits[i % suits.length]}
                    className={i % 2 === 1 ? "size-5 text-joker" : "size-5 text-ink"}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
