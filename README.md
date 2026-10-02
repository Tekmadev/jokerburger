# Joker Burger — demo site

One-page demo for **Joker Burger**, 5910 Rue Jean-Talon Est, Saint-Léonard (Montréal).
Built with Next.js 16 (App Router), Tailwind CSS 4 and Motion. French lives at `/`, English at `/en`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Editing content

Each kind of content lives in one file:

| What | File |
| --- | --- |
| Address, phone, email, hours, links, ratings | `data/site.ts` |
| Menu categories, items, prices, descriptions, photos | `data/menu.ts` |
| Weekly deals (days, start hour, price) | `data/promos.ts` |
| All interface text, FR and EN | `i18n/fr.ts`, `i18n/en.ts` |

Food photos are `public/food/<item-id>.webp` (square, 900×900).

## "Today's deal"

The promo strip, the week calendar, the open/closed pill and the hours table use **Montreal time**, whatever the visitor's time zone.
To preview another day during a pitch, add `?day=` (0 = Sunday … 6 = Saturday) and optionally `?hour=`:

- `/?day=1`: Monday → the 9.99$ deal
- `/?day=4`: Thursday → no day deal, so the XL Special takes the spotlight
- `/?day=5&hour=19`: Friday night → Vendredi fou + the 18 h special

## Hero video (optional)

The hero is a still with CSS motion: a slow push-in, rising steam, embers and a flickering rim light.
To use a real clip, drop a **9:16** loop into `public/hero/` as `hero.mp4` (and optionally `hero.webm`) and rebuild.
It's detected at build time, loads only after the page has finished loading, plays muted on loop over the poster, and is skipped
for visitors with reduced motion or Data Saver enabled. The prompt is in `joker-burger-demo-plan.md` §5; use
`public/hero/hero-poster.jpg` as the start frame. Encode with:

```bash
ffmpeg -i clip.mp4 -vf scale=720:1280 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart public/hero/hero.mp4
```

```bash
ffmpeg -i clip.mp4 -vf scale=720:1280 -c:v libvpx-vp9 -crf 36 -b:v 0 -an public/hero/hero.webm
```

## Before going live

- [ ] **Confirm the phone number.** Three different numbers are listed online (see the TODO in `data/site.ts`).
- [ ] Replace the AI-generated food photos with real photos of each dish (`public/food/`), and the hero photo too.
- [ ] Paste 3 real Google reviews, with the owner's approval (`components/Reviews.tsx`). Never invent reviews.
- [ ] Confirm deal details, menu descriptions and prices with the owner (prices currently come from Uber Eats).
- [ ] Add the TikTok URL in `data/site.ts` (it's hidden until then).
- [ ] Allow search engines: remove `robots: { index: false, follow: false }` in `app/[lang]/layout.tsx`.
- [ ] Custom domain and analytics.

## Notes

- The brand is the playing-card joker only. There are no references to the comic-book character anywhere.
- Food images were generated with Higgsfield (Soul 2.0) for the demo.
