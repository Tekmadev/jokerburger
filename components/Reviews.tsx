import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { QuoteIcon, StarIcon } from "./icons";
import { SectionHeading } from "./ui";

export function Reviews({ t }: { t: Dictionary["reviews"] }) {
  const ratings = [
    { source: "Uber Eats", ...site.ratings.uberEats, unit: t.ratings },
    { source: "Google", ...site.ratings.google, unit: t.reviews },
  ];

  return (
    <section aria-labelledby="reviews-title" className="border-y border-cream/5 bg-ink-2/60 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="reviews-title" eyebrow={t.eyebrow} title={t.title} center />

        <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {ratings.map((rating) => (
            <li
              key={rating.source}
              className="flex items-center gap-5 rounded-3xl bg-ink p-6 ring-1 ring-cream/10 sm:p-7"
            >
              <p className="font-display text-7xl leading-none text-cheese">{rating.score.toFixed(1)}</p>
              <div>
                <Stars score={rating.score} />
                <p className="mt-2 font-display text-2xl uppercase leading-none">{rating.source}</p>
                <p className="mt-1 text-sm text-cream/60">
                  {rating.count} {rating.unit}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* TODO: paste real Google reviews here with the owner's approval — never invent reviews. */}
        <ul className="scrollbar-none -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {[1, 2, 3].map((slot) => (
            <li
              key={slot}
              className="flex w-[80%] shrink-0 snap-start flex-col rounded-3xl border-2 border-dashed border-cream/15 p-6 text-cream/60 md:w-auto"
            >
              <QuoteIcon className="size-8 text-cream/20" />
              <div aria-hidden="true" className="mt-4 space-y-2.5">
                <span className="block h-2.5 w-full rounded-full bg-cream/10" />
                <span className="block h-2.5 w-11/12 rounded-full bg-cream/10" />
                <span className="block h-2.5 w-3/5 rounded-full bg-cream/10" />
              </div>
              <p className="mt-6 font-display text-lg uppercase tracking-wide text-cream/60">{t.slotTitle}</p>
              <p className="mt-1 text-sm">{t.slotText}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ score }: { score: number }) {
  const percent = `${(score / 5) * 100}%`;
  const row = (
    <span className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className="size-5" />
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex" role="img" aria-label={`${score.toFixed(1)} / 5`}>
      <span className="text-cream/15">{row}</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden text-cheese" style={{ width: percent }}>
        {row}
      </span>
    </span>
  );
}
