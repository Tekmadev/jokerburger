import type { Locale } from "@/i18n/config";

/** Prices in the brand's own style: "9.99$" in French (as on their posts), "$9.99" in English. */
export function formatPrice(price: number, lang: Locale) {
  const amount = price.toFixed(2);
  return lang === "fr" ? `${amount}$` : `$${amount}`;
}

/** Replaces `{key}` placeholders in a dictionary string. */
export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
