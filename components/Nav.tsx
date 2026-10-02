"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { homePath, localeTags, type Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { useScrolledPast } from "@/lib/use-scroll";
import { CloseIcon, MenuIcon } from "./icons";
import { button, Logo } from "./ui";

type Props = {
  lang: Locale;
  t: Pick<Dictionary, "nav" | "lang" | "a11y">;
};

export function Nav({ lang, t }: Props) {
  const scrolled = useScrolledPast(() => 24);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#menu", label: t.nav.menu },
    { href: "#promos", label: t.nav.promos },
    { href: "#trouver", label: t.nav.findUs },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-ink/85 shadow-[0_1px_0_rgb(246_239_228/0.08)] backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/70 to-transparent",
      )}
    >
      <nav aria-label={t.a11y.mainNav} className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" aria-label={t.a11y.home} className="shrink-0 rounded-md" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-lg uppercase tracking-wide text-cream/80 transition hover:text-cheese"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch lang={lang} label={t.lang.switchTo} />
          <div className="hidden sm:block">
            <a href={site.links.uberEats} target="_blank" rel="noopener noreferrer" className={button("primary", "sm")}>
              {t.nav.order}
            </a>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full bg-cream/[0.06] ring-1 ring-cream/20 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-cream/10 bg-ink/95 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden"
      >
        <ul className="divide-y divide-cream/10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-3xl uppercase tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.links.uberEats}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(button("primary", "lg"), "mt-4 w-full")}
        >
          {t.nav.order}
        </a>
      </div>
    </header>
  );
}

function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const other: Locale = lang === "fr" ? "en" : "fr";
  return (
    <div className="flex items-center rounded-full bg-cream/[0.06] p-1 text-xs font-bold ring-1 ring-cream/20">
      <span aria-current="true" className="rounded-full bg-cream px-2.5 py-1.5 uppercase text-ink">
        {lang}
      </span>
      <Link
        href={homePath(other)}
        scroll={false}
        hrefLang={localeTags[other]}
        lang={localeTags[other]}
        aria-label={label}
        className="rounded-full px-2.5 py-1.5 uppercase text-cream/70 transition hover:text-cream"
      >
        {other}
      </Link>
    </div>
  );
}
