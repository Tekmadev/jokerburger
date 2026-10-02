import type { Localized } from "@/i18n/config";
import type { Suit } from "./menu";

export type Promo = {
  id: string;
  /** Price in CAD. Leave out for announcements. */
  price?: number;
  /** Days the deal runs (0 = Sunday … 6 = Saturday). Empty = every day. */
  days: number[];
  /** Deal starts at this hour on its days (e.g. 18 for "dès 18 h"). */
  fromHour?: number;
  title: Localized;
  description: Localized;
  /** Short label shown on the card, e.g. "Lun · Mar · Mer". */
  when: Localized;
  suit: Suit;
  comingSoon?: boolean;
};

// Recurring deals from the Instagram posts (Jun–Sep 2026).
// TODO: confirm the exact items included in each deal with the owner.
export const promos: Promo[] = [
  {
    id: "lun-mer",
    price: 9.99,
    days: [1, 2, 3],
    suit: "spade",
    title: { fr: "Le repas à 9.99$", en: "The $9.99 meal" },
    description: {
      fr: "Un repas complet à prix fou pour bien commencer la semaine.",
      en: "A full meal at a crazy price to kick off the week.",
    },
    when: { fr: "Lun · Mar · Mer", en: "Mon · Tue · Wed" },
  },
  {
    id: "vendredi-fou",
    price: 19.99,
    days: [5, 6, 0],
    suit: "heart",
    title: { fr: "Vendredi fou — 5 articles, un prix", en: "Crazy Friday — 5 items, one price" },
    description: {
      fr: "Cinq articles pour 19.99$. Le deal du week-end, du vendredi au dimanche.",
      en: "Five items for $19.99. The weekend deal, Friday through Sunday.",
    },
    when: { fr: "Ven · Sam · Dim", en: "Fri · Sat · Sun" },
  },
  {
    id: "vendredi-soir",
    price: 17.99,
    days: [5],
    fromHour: 18,
    suit: "diamond",
    title: { fr: "Spécial vendredi soir", en: "Friday night special" },
    description: {
      fr: "Le combo du vendredi dès 18 h — crème brûlée incluse.",
      en: "The Friday combo from 6 p.m. — crème brûlée included.",
    },
    when: { fr: "Vendredi dès 18 h", en: "Friday from 6 p.m." },
  },
  {
    id: "xl-special",
    price: 23.99,
    days: [],
    suit: "club",
    title: { fr: "XL Special", en: "XL Special" },
    description: {
      fr: "Pour les très grosses faims. Disponible tous les jours.",
      en: "For serious appetites. Available every day.",
    },
    when: { fr: "Tous les jours", en: "Every day" },
  },
  {
    id: "trio-3-minutes",
    days: [],
    suit: "spade",
    comingSoon: true,
    title: { fr: "Le Trio 3 Minutes", en: "The 3-Minute Trio" },
    description: {
      fr: "Ton trio prêt en 3 minutes chrono. Joking the time.",
      en: "Your combo ready in 3 minutes flat. Joking the time.",
    },
    when: { fr: "Nouveauté", en: "New" },
  },
  {
    id: "philly-steak",
    days: [],
    suit: "heart",
    comingSoon: true,
    title: { fr: "Philly Steak", en: "Philly Steak" },
    description: {
      fr: "Steak, fromage fondu, jalapeños, sauce Joker. Il arrive.",
      en: "Steak, melted cheese, jalapeños, Joker sauce. It's coming.",
    },
    when: { fr: "Nouveauté", en: "New" },
  },
];

/** Deals that apply on a given weekday (announcements excluded). */
export function promosForDay(weekday: number) {
  const live = promos.filter((p) => !p.comingSoon);
  const dayDeals = live.filter((p) => p.days.includes(weekday));
  // No day-specific deal (Thursday) → the every-day deal takes the spotlight.
  return dayDeals.length > 0 ? dayDeals : live.filter((p) => p.days.length === 0);
}
