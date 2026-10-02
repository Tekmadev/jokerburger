import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties, ReactNode } from "react";
import heroPoster from "@/public/hero/hero-poster.jpg";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";
import { HeroVideo } from "./HeroVideo";
import { ArrowUpRight, CheckIcon, ClockIcon, PhoneIcon, StarIcon } from "./icons";
import { button, Eyebrow, JokerIndex } from "./ui";

// Drop a 9:16 loop into public/hero/ (hero.webm and/or hero.mp4, see the build plan §5)
// and it is picked up on the next build, playing over the poster.
const videoSources = [
  { file: "hero.webm", type: "video/webm" },
  { file: "hero.mp4", type: "video/mp4" },
]
  .filter(({ file }) => existsSync(path.join(process.cwd(), "public", "hero", file)))
  .map(({ file, type }) => ({ src: `/hero/${file}`, type }));

const steam = [
  { left: "18%", size: "46%", delay: "0s", drift: "-14%" },
  { left: "40%", size: "40%", delay: "2.7s", drift: "10%" },
  { left: "30%", size: "52%", delay: "5.4s", drift: "-4%" },
];

const embers = [
  { left: "8%", top: "40%", delay: "0s", duration: "6s", drift: "40px" },
  { left: "16%", top: "36%", delay: "1.4s", duration: "7.5s", drift: "-20px" },
  { left: "11%", top: "46%", delay: "2.8s", duration: "6.8s", drift: "26px" },
  { left: "22%", top: "42%", delay: "4.1s", duration: "8s", drift: "-34px" },
  { left: "5%", top: "34%", delay: "5.3s", duration: "7s", drift: "18px" },
  { left: "26%", top: "38%", delay: "3.5s", duration: "6.4s", drift: "30px" },
];

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden md:block">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_76%_52%,rgb(225_29_46/0.26),transparent_72%)]" />
        <div className="suit-pattern absolute inset-0" />
      </div>

      <div className="mx-auto grid min-h-svh max-w-7xl md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] md:items-center md:gap-8 md:px-8 md:pb-16 md:pt-28 lg:gap-14">
        {/* Media: full-bleed on phones, a tilted joker card from tablet up. */}
        <div className="absolute inset-0 md:relative md:inset-auto md:order-2 md:flex md:justify-center">
          <div className="relative size-full md:aspect-[5/7] md:h-auto md:w-full md:max-w-[min(26rem,calc((100svh-11rem)*5/7))]">
            <div
              aria-hidden="true"
              className="card-back absolute inset-0 hidden -translate-x-[14%] translate-y-[3%] -rotate-[10deg] rounded-[1.6rem] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ring-[10px] ring-inset ring-cream md:block"
            />
            <div className="relative size-full overflow-hidden md:rotate-[4deg] md:rounded-[1.6rem] md:shadow-[0_40px_90px_-25px_rgb(0_0_0/0.95),0_0_90px_-20px_rgb(225_29_46/0.45)] md:ring-1 md:ring-cream/20 md:transition-transform md:duration-700 md:ease-snap md:hover:rotate-[1.5deg]">
              {/* On the card, zoom in so the burger fills it instead of the photo's empty lower half. */}
              <div className="absolute inset-0 md:origin-[50%_6%] md:scale-[1.3]">
                <Image
                  src={heroPoster}
                  alt={t.hero.imageAlt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="animate-kenburns object-cover object-[50%_15%]"
                />
                {videoSources.length > 0 && <HeroVideo sources={videoSources} />}
              </div>
              <HeroEffects />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgb(11_11_11/0.85)_36%,rgb(11_11_11/0.2)_60%,transparent_74%)] md:bg-[linear-gradient(to_top,rgb(11_11_11/0.6),transparent_32%)]" />
              <JokerIndex className="absolute left-4 top-4 hidden text-xl text-cream md:flex" />
              <JokerIndex className="absolute bottom-4 right-4 hidden rotate-180 text-xl text-cream md:flex" />
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-12 pt-32 sm:px-8 md:order-1 md:min-h-0 md:px-0 md:py-0">
          <Eyebrow className="animate-rise text-cheese">{t.hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[clamp(3.4rem,14.5vw,4.75rem)] uppercase leading-[0.86] tracking-tight md:text-[clamp(4.25rem,7.4vw,7.75rem)]"
          >
            <span className="block">{t.hero.titleTop}</span>
            <span className="block text-cheese">{t.hero.titleAccent}</span>
          </h1>
          {/* Headline and lead render without an entrance animation: they're the LCP candidates. */}
          <p className="mt-5 max-w-md text-base text-cream/85 text-pretty sm:text-lg md:max-w-lg">
            {t.hero.lead}
          </p>
          <div className="mt-7 flex animate-rise flex-col gap-3 [animation-delay:240ms] min-[420px]:flex-row">
            <a href={site.links.uberEats} target="_blank" rel="noopener noreferrer" className={button("primary", "lg")}>
              {t.hero.order}
              <ArrowUpRight className="size-5" />
            </a>
            <a href={site.phone.href} className={button("secondary", "lg")}>
              <PhoneIcon className="size-5" />
              {t.hero.call}
            </a>
          </div>
          <ul className="mt-7 flex animate-rise flex-wrap gap-2 text-xs font-semibold [animation-delay:320ms] sm:text-sm">
            <Badge>
              <StarIcon className="size-4 text-cheese" />
              {site.ratings.uberEats.score} Uber Eats
            </Badge>
            <Badge>
              <CheckIcon className="size-4 text-cheese" />
              {t.hero.badgeHalal}
            </Badge>
            <Badge>
              <ClockIcon className="size-4 text-cheese" />
              {t.hero.badgeHours}
            </Badge>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 ring-1 ring-cream/15 backdrop-blur">
      {children}
    </li>
  );
}

/** Pure-CSS life for the still: rising steam, embers off the red flame and a flickering rim light. */
function HeroEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      <div className="absolute inset-y-0 left-0 w-3/4 animate-flicker bg-[radial-gradient(55%_40%_at_0%_22%,rgb(225_29_46/0.4),transparent_70%)] mix-blend-screen" />
      <div className="absolute left-[18%] top-[2%] h-[32%] w-[64%]">
        {steam.map((puff, i) => (
          <span
            key={i}
            className="absolute bottom-0 aspect-square animate-steam rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.2),transparent)] mix-blend-screen"
            style={{ left: puff.left, width: puff.size, animationDelay: puff.delay, "--drift": puff.drift } as CSSProperties}
          />
        ))}
      </div>
      {embers.map((ember, i) => (
        <span
          key={i}
          className={cx(
            "absolute size-[3px] animate-ember rounded-full bg-cheese shadow-[0_0_8px_2px_rgb(255_120_40/0.8)]",
            i % 2 === 1 && "size-[2px] bg-joker-light",
          )}
          style={
            {
              left: ember.left,
              top: ember.top,
              animationDelay: ember.delay,
              animationDuration: ember.duration,
              "--drift": ember.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
