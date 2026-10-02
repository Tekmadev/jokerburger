import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";

export const alt = "Joker Burger — Saint-Léonard, Montréal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// The link preview people see when the URL is shared by text, WhatsApp or Instagram DM.
export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "fr");

  const [anton, burger] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Anton-Regular.ttf")),
    readFile(path.join(process.cwd(), "assets/og/burger-card.jpg")),
  ]);
  const burgerSrc = `data:image/jpeg;base64,${burger.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 78% 50%, #4a0a10 0%, #0b0b0b 55%)",
          fontFamily: "Anton",
          color: "#f6efe4",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 40,
            width: 390,
            height: 546,
            display: "flex",
            borderRadius: 30,
            background: "#e11d2e",
            border: "12px solid #f6efe4",
            transform: "rotate(-10deg) translateX(-60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 70,
            top: 40,
            width: 390,
            height: 546,
            display: "flex",
            overflow: "hidden",
            borderRadius: 30,
            border: "2px solid rgba(246,239,228,0.35)",
            transform: "rotate(5deg)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
          }}
        >
          <img src={burgerSrc} alt="" width={390} height={546} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 0 72px", width: 660 }}>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: 2 }}>
            <span style={{ color: "#e11d2e" }}>JOKER</span>
            <span style={{ marginLeft: 14 }}>BURGER</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 46, fontSize: 92, lineHeight: 0.92 }}>
            <span>{t.hero.titleTop.toUpperCase()}</span>
            <span style={{ color: "#ffc531" }}>{t.hero.titleAccent.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", marginTop: 40, fontSize: 30, color: "rgba(246,239,228,0.75)", letterSpacing: 1 }}>
            {`${site.address.street.toUpperCase()} · ${site.address.district.toUpperCase()}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }],
    },
  );
}
