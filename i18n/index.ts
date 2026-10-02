import type { Locale } from "./config";
import { en } from "./en";
import { fr, type Dictionary } from "./fr";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
