import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { Logo } from "./ui";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const socials = [
    { label: "Instagram", href: site.links.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: site.links.facebook, Icon: FacebookIcon },
    { label: "TikTok", href: site.links.tiktok, Icon: TikTokIcon },
  ].filter((social): social is typeof social & { href: string } => Boolean(social.href));

  return (
    <footer className="relative overflow-hidden border-t border-cream/10 pb-28 pt-16 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-5 max-w-sm text-cream/65">{t.footer.tagline}</p>
            <p className="mt-3 font-display text-xl uppercase tracking-wide text-cheese">{t.footer.slogan}</p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/60">{t.footer.follow}</h2>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-12 place-items-center rounded-full bg-cream/[0.06] ring-1 ring-cream/15 transition hover:bg-joker hover:ring-joker"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-cream/60">@{site.instagramHandle}</p>
          </div>

          <div className="text-sm text-cream/65">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cream/60">{site.name}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <p className="mt-2">
              <a href={site.phone.href} className="hover:text-cream">
                {site.phone.display}
              </a>
            </p>
            <p className="mt-2">{t.location.hoursValue} · 7/7</p>
          </div>
        </div>

        {/* Giant watermark, drawn with a pseudo-element so it stays purely decorative. */}
        <div
          aria-hidden="true"
          data-text="Joker Burger"
          className="pointer-events-none mt-14 select-none whitespace-nowrap text-center font-display text-[14.5vw] uppercase leading-[0.8] text-cream/[0.04] before:content-[attr(data-text)] lg:text-[11.5rem]"
        />

        <div className="mt-8 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} ·{" "}
            <a href={site.links.sdc} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              {t.footer.sdc}
            </a>
          </p>
          <p lang={lang === "fr" ? "fr-CA" : "en-CA"}>{t.footer.demo}</p>
        </div>
      </div>
    </footer>
  );
}
