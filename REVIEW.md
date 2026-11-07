# November Open refinement review — 7 November 2026

This is one static tournament page for Arun's review. Production, the organisation repository, backend, database and mobile apps were not modified.

## Changes

- Preserve the category picker and inline registration, partner request, waitlist and simulated checkout flows.
- Compact reporting schedule: Sunday 29 November, Open Doubles 3 PM and Men's Singles 6 PM.
- Reduce hero, section and heading sizes while retaining the brand fonts, imagery, date, ₹30,000 prize pool, DUPR 3.7 cap and 28 November 11:59 PM IST deadline.
- Use the redesigned header and approved footer; their links open existing live pages.
- Compact practice and WhatsApp promotions. The planned first-booking offer explicitly says it is not live and eligibility/details require confirmation.
- Separate required terms agreement from optional marketing consent; both start unchecked. No details are transmitted or persisted.
- Remove the October refund placeholder and automatic app-account linking promise.
- Keep Razorpay simulated, showing contact prefill and explaining payment-method verification.
- Fix mobile menu scroll locking on navigation/resizing, preview strip positioning, sticky-header scroll offsets, sample coupon confirmation totals and full-capacity partner confirmation wording.

## Typography diagnosis

Claude's controlled tests found binary text edges across Arial, DM Sans and Barlow Condensed, with Windows `FontSmoothing=0` and `SPI_GETFONTSMOOTHING=False`. Browser font loading succeeds. This is a local OS rasterization issue, not evidence of a broken site font or a missing weight. A forced browser antialiasing flag did not fix it.

The brand font system is preserved. The old transform-centred preview pill is removed and small labels are more readable. No OS setting was changed. Screenshots from this laptop still show aliased edges; the global pixelation issue cannot honestly be marked resolved until Windows font smoothing is enabled and visually rechecked.

## Validation

- TypeScript, ESLint and static production build pass.
- Impeccable 4.8.0 context and polish guidance, mechanical detector (zero findings), independent source review and installed Playwright CLI used. No added dependencies or paid services.
- Browser widths 390, 768 and 1440: no horizontal overflow; initial consent states correct; complete doubles checkout and confirmation work without marketing opt-in.
- Desktop validation: invalid phone/email/DUPR ID and over-cap ratings, required terms, simulated payment failure/retry/success, free partner request, singles waitlist, and doubles partner validation exercised.
- Additional regression checks: mobile menu navigation and desktop resize restore scrolling; sample coupon shows ₹699 consistently for singles; full doubles capacity offers a free team waitlist after partner request; no browser exceptions.
- All four images return HTTP 200, brand fonts load locally, robots exclude indexing, CSP is present, and registration QA records no POST or third-party requests.
- Local page heights before → after: mobile 8,600 → 7,450 px; tablet 6,854 → 5,662 px. Mobile schedule reduced from about 688 to 135 px. Registration keeps comfortable input spacing.

## Screenshots

Existing before captures and final after/flow captures are outside the repository at:

`C:/Users/pg/AppData/Local/Temp/design-pro/pc-nov-open/shots/refine/`

- Before: `before/full-390.png`, `before/full-768.png`, `before/full-1440.png`.
- Final captures: `qa/top-{390,768,1440}.png`, `qa/full-{390,768,1440}.png`.
- Flow captures: `qa/d-*.png`, `qa/doubles-success-{390,768,1440}.png`.
- Text diagnostics: `diag/` (including DPR comparisons).

## Decisions before production

- Approve November-specific refund/cancellation policy; none is invented in this preview.
- Confirm prize breakdown and planned app welcome-offer activation/eligibility.
- GST-inclusive language follows the existing October event evidence; confirm it applies to the proposed November prices.
- Production consent storage should include consent version, timestamp and optional marketing choice. This preview intentionally has no persistence.
- Resolve local Windows font smoothing before approving text sharpness on this laptop.
