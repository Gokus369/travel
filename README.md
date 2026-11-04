# Wave Story

Website for Wave Story Ventures, Varkala, Kerala: all India tour packages, travel guides and hotel bookings. Built with Next.js 16, React 19 and Tailwind CSS 4.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

If port 3000 is busy, use another one, for example `npx next dev -p 3977`.

## Editing the content

Everything lives in `src/data`, so no page code needs to change.

| To change | Edit |
| --- | --- |
| Phone, WhatsApp, email, address | `src/data/site.ts` |
| Tour packages and itineraries | `src/data/packages.ts` |
| Travel guides | `src/data/guides.ts` |
| Hotel stay types and destinations | `src/data/stays.ts` |

**Prices:** add `priceFrom: 24999` to a package and its cards and page show "From ₹24,999 per person". Without it they show "Quote on request".

**Photos:** add the file to `public/photos`, add an entry to `src/data/photos.json` with its size and credit, run `node scripts/build-photos.mjs`, then use its key in the data files. Run `npm run build` afterwards and any wrong key will fail with a type error. Photos from Wikimedia Commons must stay listed on `/credits`, which is built from that file.

## The home page film

The scroll film lives in `src/components/story`.

| To change | Edit |
| --- | --- |
| Chapter words, timing and rail labels | `chapters` in `timeline.ts` |
| Pacing, and how much scroll each scene gets | `segments` in `timeline.ts` |
| Total scroll length | `h-[850svh]` in `ScrollStory.tsx` |
| The portal, tide and water effects | the shader in `renderer.ts` |

Devices set to reduce motion (including Windows with Animation effects off) get still images first, with a Play the film button that is remembered in the browser.

The original film is in `frames/`. The site uses cleaned copies in `public/frames/v1`, made by `node scripts/build-frames.mjs`.

## Enquiries

Forms do not store anything. They compose a message and open WhatsApp or the visitor's email app, addressed to the details in `site.ts`. The visitor presses send there.

## Deploying

The site is hosted on GitHub Pages at https://gokus369.github.io/travel/. Every push to `main` rebuilds and publishes it automatically, usually within a few minutes, through `.github/workflows/deploy.yml`.

It is a static export, so there is no server. To move it to a custom domain, set `NEXT_PUBLIC_SITE_URL` to the new address and `NEXT_PUBLIC_BASE_PATH` to an empty value in that workflow.
