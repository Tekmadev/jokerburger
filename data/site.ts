/**
 * Restaurant info — address, phone, hours, links and ratings.
 * Everything the owner may want to change lives here (menu → data/menu.ts, promos → data/promos.ts).
 */
export const site = {
  name: "Joker Burger",
  instagramHandle: "lejokerburger",

  address: {
    street: "5910 Rue Jean-Talon Est",
    city: "Montréal",
    district: "Saint-Léonard",
    region: "QC",
    postalCode: "H1S 1M2",
    country: "CA",
  },

  // TODO: confirm the phone number with the owner — three different numbers are listed online:
  //   514-316-9626 (SDC Jean-Talon Est) · 514-316-9629 (Apple Maps) · 514-664-9487 (MontrealHalal)
  phone: {
    display: "514-316-9626",
    href: "tel:+15143169626",
  },

  email: "jokerburger24@gmail.com",

  /** Opening hours, every day of the week (24 = midnight). */
  hours: { open: 11, close: 24 },
  /** Uber Eats stops taking orders a little before closing. */
  deliveryUntil: { fr: "23 h 30", en: "11:30 p.m." },
  /** Time zone used to highlight today's deal and the open/closed status. */
  timeZone: "America/Toronto",

  links: {
    uberEats: "https://www.ubereats.com/ca/store/joker-burger/fzHddM6NX42MALe9DiHxHQ",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Joker+Burger+5910+Rue+Jean-Talon+Est+Montr%C3%A9al+QC+H1S+1M2",
    mapEmbed:
      "https://maps.google.com/maps?q=Joker%20Burger%2C%205910%20Rue%20Jean-Talon%20Est%2C%20Montr%C3%A9al%2C%20QC%20H1S%201M2&z=16&output=embed",
    instagram: "https://www.instagram.com/lejokerburger/",
    facebook: "https://www.facebook.com/profile.php?id=61558631055156",
    // TODO: add the TikTok profile URL once the owner confirms it (hidden until then).
    tiktok: null as string | null,
    sdc: "https://www.jeantalonest.com/en/merchants/joker-burger/",
  },

  ratings: {
    uberEats: { score: 4.6, count: "180+" },
    google: { score: 4.9, count: "~250" },
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
