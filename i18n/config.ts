export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** A string available in every supported language. */
export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Home URL for a language. French (the default) lives at the root, English at /en. */
export function homePath(lang: Locale) {
  return lang === defaultLocale ? "/" : `/${lang}`;
}

/** BCP 47 tags used for <html lang>, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  fr: "fr-CA",
  en: "en-CA",
};
