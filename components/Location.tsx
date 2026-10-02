import type { ReactNode } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { fill } from "@/lib/format";
import { Hours } from "./Hours";
import { ArrowUpRight, CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";
import { button, SectionHeading } from "./ui";

type Props = {
  lang: Locale;
  t: Dictionary["location"];
  days: Dictionary["days"];
};

export function Location({ lang, t, days }: Props) {
  const { address } = site;

  return (
    <section id="trouver" aria-labelledby="location-title" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <SectionHeading id="location-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <Detail icon={<MapPinIcon className="size-5" />} label={t.address} className="sm:col-span-2">
              <address className="not-italic">
                {address.street}
                <br />
                {address.city} ({address.district}), {address.region} {address.postalCode}
              </address>
              <a
                href={site.links.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-semibold text-cheese underline-offset-4 hover:underline"
              >
                {t.directions}
                <ArrowUpRight className="size-4" />
              </a>
            </Detail>
            <Detail icon={<PhoneIcon className="size-5" />} label={t.phone}>
              <a href={site.phone.href} className="text-lg font-semibold underline-offset-4 hover:underline">
                {site.phone.display}
              </a>
            </Detail>
            <Detail icon={<MailIcon className="size-5" />} label={t.email}>
              <a href={`mailto:${site.email}`} className="break-all font-semibold underline-offset-4 hover:underline">
                {site.email}
              </a>
            </Detail>
          </dl>

          <div className="mt-8">
            <Hours t={t} days={days} delivery={fill(t.delivery, { time: site.deliveryUntil[lang] })} />
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {t.amenities.map((amenity) => (
              <li
                key={amenity}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream/[0.06] px-3 py-1.5 text-xs font-semibold text-cream/80 ring-1 ring-cream/10"
              >
                <CheckIcon className="size-3.5 text-cheese" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-3xl bg-ink-2 ring-1 ring-cream/10 lg:min-h-[32rem]">
            <iframe
              src={site.links.mapEmbed}
              title={t.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0 [filter:invert(92%)_hue-rotate(180deg)_saturate(0.8)_brightness(0.95)]"
            />
          </div>
          <a
            href={site.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(button("cheese", "lg"), "w-full")}
          >
            <MapPinIcon className="size-5" />
            {t.directions}
          </a>
        </div>
      </div>
    </section>
  );
}

function Detail({
  icon,
  label,
  children,
  className,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-cream/60">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-joker/15 text-joker-light">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 pl-12 text-cream">{children}</dd>
    </div>
  );
}
