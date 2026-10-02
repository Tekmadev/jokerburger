import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { homePath, isLocale, localeTags, locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: "Joker Burger",
    alternates: {
      canonical: homePath(lang),
      languages: {
        [localeTags.fr]: homePath("fr"),
        [localeTags.en]: homePath("en"),
        "x-default": homePath("fr"),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Joker Burger",
      title: t.meta.title,
      description: t.meta.description,
      url: homePath(lang),
      locale: localeTags[lang].replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    // Demo build: keep it out of search engines until the owner signs off. Flip to index: true at launch.
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={localeTags[lang]} data-scroll-behavior="smooth" className={`${anton.variable} ${inter.variable}`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
