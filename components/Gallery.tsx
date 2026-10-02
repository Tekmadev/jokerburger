import Image from "next/image";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";
import { InstagramIcon } from "./icons";
import { button, SectionHeading } from "./ui";

// Instagram-style grid. Swap these for the owner's real posts before going live.
const photos = [
  { src: "/food/joker-burger.webp", name: "Joker Burger" },
  { src: "/food/tacos-merguez.webp", name: "Tacos Merguez" },
  { src: "/food/poutine-smoke-meat.webp", name: "Poutine Smoke Meat" },
  { src: "/food/fries-joker-sauce.webp", name: "Frites & sauce Joker" },
  { src: "/food/sandwich-merguez.webp", name: "Sandwich Merguez" },
  { src: "/food/cheeseburger.webp", name: "Cheeseburger" },
  { src: "/food/creme-brulee.webp", name: "Crème brûlée" },
  { src: "/food/special-joker.webp", name: "Special Joker" },
];

export function Gallery({ t }: { t: Dictionary["gallery"] }) {
  return (
    <section aria-labelledby="gallery-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="gallery-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(button("secondary", "md"), "w-fit shrink-0")}
          >
            <InstagramIcon className="size-5" />
            {t.follow}
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-1 overflow-hidden rounded-2xl sm:gap-1.5 md:grid-cols-4">
          {photos.map((photo, i) => (
            <li key={photo.src} className={cx(i >= 6 && "hidden md:block")}>
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${photo.name} — Instagram @${site.instagramHandle}`}
                className="group relative block aspect-square overflow-hidden bg-ink-2"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 320px, (min-width: 768px) 25vw, 33vw"
                  className="object-cover transition duration-700 ease-snap group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/55 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <InstagramIcon className="size-8" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
