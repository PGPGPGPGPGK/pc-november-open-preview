# Pickleball Central Open · November 2026 — design preview

**Design review only. This is not the live site and nothing here is real.**

A clickable mockup of the registration experience for the Pickleball Central Open (Sunday 29 November 2026),
built for design approval. All rights reserved.

- **Live preview:** https://pgpgpgpgpgk.github.io/pc-november-open-preview/
- Category picker, simplified single-page registration, free doubles-partner request, full-category waitlist,
  simulated checkout and mock confirmation screens.

## Safety

- Static files only — no server, no API, no database.
- Forms and payments are **simulated**. No registration is created, no Razorpay order is made, nothing is sent or stored.
- Capacity numbers are **illustrative samples**, not live availability.
- No analytics or tracking (no GTM, GA4, Meta Pixel or Clarity). A Content-Security-Policy meta tag also blocks
  third-party scripts and cross-origin requests.
- `noindex, nofollow` on the page.
- The checkout simulation shows the registration details being passed to Razorpay as prefill, so the customer types
  them once. Please use the sample data, not real personal details.

## Run / build

```bash
pnpm install
pnpm dev        # http://127.0.0.1:3010/pc-november-open-preview/
pnpm typecheck
pnpm lint
pnpm build      # static export → out/
```

## Republish (GitHub Pages serves the `gh-pages` branch)

```bash
pnpm build
# copy out/ to a temp folder, add an empty .nojekyll, commit it as a fresh repo, then:
git push --force <remote> HEAD:gh-pages
```

## Provenance

The design source lives in the Pickleball Central monorepo (local branch `design/november-open-preview`,
commits `0aaf1f1` and `d15d4b0`, not pushed to the organisation repo). This repo is a standalone static copy of
`apps/web-marketing/src/components/preview/november-open/` with four adaptations only:

1. `@pc/ui`'s `Container` is a local copy (`src/components/ui/Container.tsx`).
2. The preview page is the site root (`src/app/page.tsx`).
3. The site chrome (floating menu, footer) links to the live site by absolute URL; the "Read the terms" link does too.
4. `next.config.ts` exports statically under the `/pc-november-open-preview` base path, with an image loader that honours it.

Production analytics, the API client and every other part of the production site are intentionally absent.
