import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Menu } from "@/components/Menu";
import { Nav } from "@/components/Nav";
import { OrderBar } from "@/components/OrderBar";
import { Promos } from "@/components/Promos";
import { RestaurantJsonLd } from "@/components/RestaurantJsonLd";
import { Reviews } from "@/components/Reviews";
import { Ticker } from "@/components/Ticker";
import { WhyUs } from "@/components/WhyUs";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/i18n/config";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-cheese px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.a11y.skip}
      </a>
      <Nav lang={lang} t={{ nav: t.nav, lang: t.lang, a11y: t.a11y }} />
      <main id="main">
        <Hero t={t} />
        <Ticker items={t.ticker} />
        <Promos lang={lang} t={t.promos} days={t.days} />
        <Menu lang={lang} t={t.menu} />
        <WhyUs t={t.why} />
        <Gallery t={t.gallery} />
        <Reviews t={t.reviews} />
        <Location lang={lang} t={t.location} days={t.days} />
      </main>
      <Footer lang={lang} t={t} />
      <OrderBar t={t.orderBar} />
      <RestaurantJsonLd lang={lang} />
    </>
  );
}
