# The Hartwell Family

A family website for the Hartwell family — four generations rooted at Oakridge Farm. The landing page features the extended-family portrait and the family name, with five icon tiles that each open their own page:

- **Gallery** — a filterable photo album with a full-screen lightbox (arrow keys to browse).
- **Events** — a live countdown to the next reunion, an upcoming-events timeline with one-click "Add to calendar" downloads, and past gatherings.
- **News** — "The Hartwell Herald": births, graduations, and milestones, each readable in full.
- **Travel** — a journal of family trips and the next adventure being planned.
- **Contact** — family contacts and a message form that delivers to the family inbox via Netlify Forms.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing) deployed on Netlify
- Tailwind CSS 4 with shadcn/ui components and lucide icons
- Netlify Forms for the contact form
- Netlify Image CDN for responsive, WebP-optimized photos

## Making it yours

All names, dates, photos, stories, and trips live in `src/lib/family.ts`. Change `surname` there to rename the site, and update `siteName` in `src/routes/__root.tsx` plus the page titles in `src/routes/*.tsx`. Replace the images in `public/img/` with real family photos (keep the file names, or update them in `family.ts`).

## Run locally

```bash
pnpm install
netlify dev   # full Netlify emulation (forms, image CDN) on http://localhost:8888
# or
pnpm dev      # Vite only on http://localhost:3000
```

## Ideas for later

- A visual, interactive family tree with profiles for each relative
- Family-only login so members can upload photos and post news themselves
- RSVP tracking for events
