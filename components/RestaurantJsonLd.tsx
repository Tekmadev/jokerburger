import { site } from "@/data/site";
import { homePath, localeTags, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";

/** schema.org Restaurant data so search engines and maps can read the basics. */
export function RestaurantJsonLd({ lang }: { lang: Locale }) {
  const url = new URL(homePath(lang), siteUrl).toString();
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url,
    image: new URL("/hero/hero-poster.jpg", siteUrl).toString(),
    telephone: site.phone.href.replace("tel:", ""),
    email: site.email,
    servesCuisine: ["Burgers", "Fast food", "Halal"],
    priceRange: "$",
    inLanguage: localeTags[lang],
    hasMenu: `${url}#menu`,
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "23:59",
      },
    ],
    sameAs: [site.links.instagram, site.links.facebook, site.links.tiktok].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
