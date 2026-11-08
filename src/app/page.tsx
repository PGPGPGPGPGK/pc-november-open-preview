import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { CourtLines } from "@/components/preview/november-open/CourtLines";
import {
  APP_STORE_URL,
  DUPR_CAP,
  DUPR_SIGNUP_URL,
  MAPS_LINK,
  PLAY_STORE_URL,
  QUERIES_PHONE,
  WHATSAPP_COMMUNITY_URL,
} from "@/components/preview/november-open/data";
import {
  ArrowRightIcon,
  BanknoteIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  MapPinIcon,
  MedalIcon,
  TrophyIcon,
  WhatsAppIcon,
} from "@/components/preview/november-open/icons";
import { CtaLink, DaysLeft, StickyCta } from "@/components/preview/november-open/islands";
import { PreviewPill } from "@/components/preview/november-open/PreviewPill";
import { RegisterSection } from "@/components/preview/november-open/RegisterSection";
import { PreviewProvider } from "@/components/preview/november-open/state";
import { Container } from "@/components/ui/Container";
import { BOOK_A_COURT_URL } from "@/lib/site";

/**
 * DESIGN PREVIEW — Pickleball Central Open · November 2026.
 *
 * A static mockup for design approval. It never calls the API, Razorpay or the
 * database. Not indexed, not for deployment.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Pickleball Central Open — November 2026 · Design preview",
  description: "Design preview only. Not live.",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

/** Browser-enforced guard: no third-party scripts, no cross-origin fetch, no form posts. */
const PREVIEW_GUARD = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' ws: wss:",
  "frame-src 'none'",
  "form-action 'none'",
  "base-uri 'self'",
].join("; ");

const h2Cls =
  "font-display text-4xl font-bold uppercase leading-[0.95] text-white text-balance md:text-5xl";
const linkCls = "text-volt underline underline-offset-2 hover:text-volt-light";

const WHO_CAN_ENTER = [
  "A DUPR ID and rating are required for every player, in every category.",
  `Every player must be rated ${DUPR_CAP} or below.`,
  "Open Singles is for male players. Open Doubles takes any gender combination.",
];

const HOW_ENTRY_WORKS = [
  "Registration closes Saturday 28 November, 11:59 PM IST.",
  "Doubles: the captain enters both players' names, DUPR IDs and ratings, plus the partner's phone number and their own phone number and email, and pays ₹1,599 for the team.",
  "No partner? Request one for free. Pairing is first-come, first-served and isn't guaranteed. If a suitable partner is found we'll contact you.",
  "Once you're paired and you both agree, each of you pays ₹800 — requested only after pairing is confirmed.",
  "A pairing request does not guarantee a tournament slot. You can also register for Open Singles separately.",
  "A full category has a free waitlist. Joining doesn't hold a spot. Admins may increase capacity or invite selected waitlisted entries.",
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Is a DUPR ID mandatory?",
    a: (
      <>
        Yes — for every player, in every category. Enter each player&apos;s DUPR ID and current
        rating; everyone must be rated {DUPR_CAP} or below. No DUPR account yet? Creating one is
        free at{" "}
        <a href={DUPR_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
          dupr.com
        </a>
        .
      </>
    ),
  },
  {
    q: "How does the Open Doubles entry work?",
    a: "The captain registers and pays ₹1,599 for the whole team, entering both players' names, DUPR IDs and ratings. The captain's phone number and email and the partner's phone number are required.",
  },
  {
    q: "I don't have a partner. What can I do?",
    a: "Request a partner for free. Pairing is first-come, first-served and isn't guaranteed. We'll contact you if a suitable partner is found. Once you're paired and you both agree, each of you pays ₹800 — requested only after pairing is confirmed. A pairing request does not guarantee a tournament slot.",
  },
  {
    q: "What if my category is full?",
    a: "Join the waitlist for free. It doesn't hold a spot — if one opens, we'll message you with a payment link.",
  },
  {
    q: "What do winners receive?",
    a: "Medals, trophies and cash prize cheques for winners and runners-up, from a ₹30,000 total prize pool. The breakdown will be announced later.",
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base leading-relaxed text-grey-100">
          <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-volt" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function NovemberOpenPreviewPage() {
  return (
    <>
      <meta httpEquiv="Content-Security-Policy" content={PREVIEW_GUARD} />
      <PreviewProvider>
        <div className="bg-navy pb-24 text-white md:pb-0">
          <PreviewPill />

          {/* ── Hero ─────────────────────────────────────────────── */}
          <section className="relative overflow-hidden border-b border-navy-border">
            <CourtLines className="pointer-events-none absolute -right-28 top-0 h-[30rem] w-auto text-volt opacity-[0.1] md:-right-8 md:h-[40rem]" />
            <Container size="lg" className="relative pb-10 pt-8 md:pb-14 md:pt-12">
              <div className="grid items-center gap-8 md:grid-cols-[1.25fr_1fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <Image src="/dupr-logo.png" alt="DUPR" width={96} height={96} className="h-9 w-9" />
                    <span className="text-sm font-semibold text-grey-200">DUPR-rated tournament</span>
                  </div>

                  <h1 className="mt-5 font-display font-black uppercase leading-[0.9] text-white">
                    <span className="block text-lg font-bold tracking-[0.14em] text-grey-200 sm:text-xl">
                      Pickleball Central Open
                    </span>
                    <span className="mt-1.5 block text-[3.25rem] tracking-tight sm:text-[5rem] md:text-[5.5rem]">
                      November <span className="text-volt">2026</span>
                    </span>
                  </h1>

                  <ul className="mt-5 grid gap-3 text-base md:grid-cols-2 md:gap-6">
                    <li className="flex items-start gap-3">
                      <CalendarIcon className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                      <span className="text-lg font-semibold text-white">Sunday, 29 November 2026</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                      <span>
                        <span className="text-lg font-semibold text-white">Pickleball Central</span>
                        <span className="block text-grey-200">
                          Peerzadiguda, Hyderabad ·{" "}
                          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className={linkCls}>
                            Directions
                          </a>
                        </span>
                      </span>
                    </li>
                  </ul>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-volt/40 bg-navy-mid md:grid md:grid-cols-[1fr_auto]">
                    <div className="px-5 py-4">
                      <p className="font-display text-6xl font-black leading-none text-volt tabular-nums sm:text-7xl">
                        ₹30,000
                      </p>
                      <p className="mt-1.5 text-base text-grey-100">total cash prize pool</p>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-navy-border bg-navy/60 px-5 py-3 text-sm text-grey-100 md:flex-col md:justify-center md:border-l md:border-t-0 md:px-6">
                      <span className="inline-flex items-center gap-2">
                        <TrophyIcon className="h-5 w-5 text-volt" /> Trophies
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MedalIcon className="h-5 w-5 text-volt" /> Medals
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <BanknoteIcon className="h-5 w-5 text-volt" /> Cash prize cheques
                      </span>
                    </div>
                    <p className="border-t border-navy-border px-5 py-2.5 text-xs text-grey-400 md:col-span-2">
                      For winners and runners-up. Prize breakdown announced later.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <CtaLink className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-volt px-8 py-3.5 font-display text-xl font-bold uppercase tracking-wide text-navy transition hover:bg-volt-light active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      Register now <ArrowRightIcon className="h-5 w-5" />
                    </CtaLink>
                    <CtaLink
                      category="partner"
                      className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-navy-border px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white transition hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                    >
                      Need a partner? Request one — free
                    </CtaLink>
                  </div>
                  <p className="mt-3 text-sm text-grey-200">
                    DUPR {DUPR_CAP} and below · from ₹799 · registration closes Sat 28 Nov, 11:59 PM IST
                    <DaysLeft />
                  </p>
                </div>

                <div className="relative mx-auto hidden h-[28rem] w-full max-w-sm md:block">
                  <Image
                    src="/season5-player.png"
                    alt=""
                    fill
                    sizes="24rem"
                    className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
            </Container>
          </section>

          {/* ── Schedule: one slim timeline ──────────────────────── */}
          <section aria-label="Match day schedule" className="border-b border-navy-border bg-navy-mid/40">
            <Container size="lg" className="py-4 md:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <p className="shrink-0 text-sm font-semibold uppercase tracking-wide text-grey-200">
                  Match day · Sun 29 Nov · reporting times
                </p>
                <ol className="grid flex-1 grid-cols-2 gap-4">
                  <li>
                    <div className="flex items-center gap-2" aria-hidden="true">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-volt" />
                      <span className="h-px flex-1 bg-navy-border" />
                    </div>
                    <p className="mt-1.5 font-display text-3xl font-bold leading-none text-volt tabular-nums">
                      3:00 PM
                    </p>
                    <p className="mt-1 text-sm text-grey-100">Open Doubles</p>
                  </li>
                  <li>
                    <div className="flex items-center gap-2" aria-hidden="true">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-volt" />
                    </div>
                    <p className="mt-1.5 font-display text-3xl font-bold leading-none text-volt tabular-nums">
                      6:00 PM
                    </p>
                    <p className="mt-1 text-sm text-grey-100">Open Singles</p>
                  </li>
                </ol>
              </div>
            </Container>
          </section>

          {/* ── Registration (category picker + form) ────────────── */}
          <RegisterSection />

          {/* ── Rules + FAQ side by side on wide screens ─────────── */}
          <section id="rules" className="scroll-mt-28 border-b border-navy-border">
            <Container size="lg" className="py-10 md:py-14">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <h2 className={h2Cls}>Rules and eligibility</h2>
                  <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-wide text-white">
                    Who can enter
                  </h3>
                  <Bullets items={WHO_CAN_ENTER} />
                  <h3 className="mt-7 font-display text-xl font-bold uppercase tracking-wide text-white">
                    How entry works
                  </h3>
                  <Bullets items={HOW_ENTRY_WORKS} />
                </div>
                <div>
                  <h2 className={h2Cls}>Good to know</h2>
                  <div className="mt-6 space-y-2.5">
                    {FAQS.map((f) => (
                      <details
                        key={f.q}
                        className="group rounded-2xl border border-navy-border bg-navy-mid open:border-volt/50"
                      >
                        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-display text-lg font-bold uppercase tracking-wide text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <ChevronDownIcon className="h-5 w-5 shrink-0 text-volt transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="px-5 pb-4 text-base leading-relaxed text-grey-200">{f.a}</div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* ── Two compact promos ───────────────────────────────── */}
          <section aria-label="Practice and community" className="border-b border-navy-border">
            <Container size="lg" className="py-10 md:py-12">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col rounded-2xl border border-navy-border bg-navy-mid p-5 sm:p-6">
                  <h2 className="font-display text-3xl font-bold uppercase leading-none text-white text-balance">
                    Want to practice before the tournament?
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-grey-200">
                    Get match-ready at Pickleball Central. Book a court, practice your shots and come
                    prepared for tournament day.
                  </p>
                  <a
                    href={BOOK_A_COURT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-xl bg-volt px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-navy transition hover:bg-volt-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Book a Court <ArrowRightIcon className="h-5 w-5" />
                  </a>
                  <div className="mt-4 rounded-xl border border-dashed border-volt/50 bg-volt/5 p-3.5 text-sm leading-relaxed text-grey-100">
                    <p className="font-semibold text-volt">Coming with the app update</p>
                    <p className="mt-1">
                      Eligible first-time court bookers get 20% off their first booking through the
                      Pickleball Central app.
                    </p>
                    <p className="mt-1.5 text-xs text-grey-400">
                      Not live yet — offer details to be confirmed. Get the app:{" "}
                      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                        App Store
                      </a>{" "}
                      ·{" "}
                      <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                        Google Play
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl border border-navy-border bg-navy-mid p-5 sm:p-6">
                  <h2 className="font-display text-3xl font-bold uppercase leading-none text-white text-balance">
                    Want to know more and stay updated?
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-grey-200">
                    Join our Pickleball Central community for tournament updates, open-play sessions
                    and everything happening on court.
                  </p>
                  <a
                    href={WHATSAPP_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-12 w-fit items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-black transition active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <WhatsAppIcon /> Join the Community
                  </a>
                  <p className="mt-auto pt-5 text-sm text-grey-200">
                    Questions about the tournament? Call{" "}
                    <a href={`tel:+91${QUERIES_PHONE}`} className={linkCls}>
                      {QUERIES_PHONE}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <StickyCta label="Register — from ₹799" />
        </div>
      </PreviewProvider>
    </>
  );
}
