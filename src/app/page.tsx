import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

import { CourtLines } from "@/components/preview/november-open/CourtLines";
import { DUPR_CAP, DUPR_SIGNUP_URL, MAPS_LINK, QUERIES_PHONE } from "@/components/preview/november-open/data";
import {
  ArrowRightIcon,
  BanknoteIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  MapPinIcon,
  MedalIcon,
  TrophyIcon,
} from "@/components/preview/november-open/icons";
import { CtaLink, DaysLeft, StickyCta } from "@/components/preview/november-open/islands";
import { PreviewPill } from "@/components/preview/november-open/PreviewPill";
import { RegisterSection } from "@/components/preview/november-open/RegisterSection";
import { PreviewProvider } from "@/components/preview/november-open/state";

/**
 * DESIGN PREVIEW — Pickleball Central Open · November 2026.
 *
 * A static mockup for design approval. It lives on its own route, reuses the
 * October page's design language, and never calls the API, Razorpay or the
 * database. Not indexed, not linked from anywhere, not for deployment.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Pickleball Central Open — November 2026 · Design preview",
  description: "Design preview only. Not live.",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Preview guard (browser-enforced). The root layout loads production GTM,
 * Clarity, Meta Pixel and URL Genius with hard-coded default IDs; this policy
 * stops those scripts from loading on this route, and also blocks any fetch /
 * form post to another origin — so reviewing the mock can't pollute live
 * analytics or reach the real API.
 */
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
  "font-display text-5xl font-bold uppercase leading-[0.95] text-white text-balance md:text-6xl";
const linkCls = "text-volt underline underline-offset-2 hover:text-volt-light";

const SCHEDULE: { time: string; name: string; body: string }[] = [
  {
    time: "3 PM",
    name: "Open Doubles",
    body: `Teams report. Any gender combination, both players DUPR ${DUPR_CAP} or below. ₹1,599 per team.`,
  },
  {
    time: "6 PM",
    name: "Men's Singles",
    body: `Players report. Male players, DUPR ${DUPR_CAP} or below. ₹799 per player.`,
  },
];

const WHO_CAN_ENTER = [
  "A DUPR ID and rating are required for every player, in every category.",
  `Every player must be rated ${DUPR_CAP} or below.`,
  "Men's Singles is for male players.",
  "Open Doubles takes any gender combination.",
];

const HOW_ENTRY_WORKS = [
  "Registration closes Saturday 28 November, 11:59 PM IST.",
  "Doubles: the captain enters both players' names, DUPR IDs and ratings, plus their own phone number and email, and pays ₹1,599 for the team.",
  "No partner? Request one for free. Pairing is first-come, first-served and isn't guaranteed. If a suitable partner is found we'll contact you.",
  "Once you're paired and you both agree, each of you pays ₹900 — requested only after pairing is confirmed.",
  "A pairing request does not guarantee a tournament slot.",
  "A full category has a free waitlist. Joining doesn't hold a spot.",
];

const FAQS: { q: string; a: ReactNode; placeholder?: boolean }[] = [
  {
    q: "Is a DUPR ID mandatory?",
    a: (
      <>
        Yes — for every player, in every category. Enter each player&apos;s DUPR ID and current
        rating. Everyone must be rated {DUPR_CAP} or below. No DUPR account yet? Creating one is
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
    a: "The captain registers and pays ₹1,599 for the whole team, entering both players' names, DUPR IDs and ratings. Only the captain's phone number and email are needed.",
  },
  {
    q: "I don't have a partner. What can I do?",
    a: "Request a partner for free. Pairing is first-come, first-served and isn't guaranteed. We'll contact you if a suitable partner is found. Once you're paired and you both agree, each of you pays ₹900 — requested only after pairing is confirmed. A pairing request does not guarantee a tournament slot.",
  },
  {
    q: "What if my category is full?",
    a: "Join the waitlist for free. It doesn't hold a spot — if one opens, we'll message you with a payment link.",
  },
  {
    q: "Why use the same phone number and email as my app account?",
    a: "So your registration links to your Pickleball Central app account. No app yet? Download it and sign in with the same number.",
  },
  {
    q: "What do winners receive?",
    a: "Medals, trophies and cash prize cheques for winners and runners-up, from a ₹30,000 total prize pool. The breakdown will be announced later.",
  },
  {
    q: "What's the refund policy?",
    placeholder: true,
    a: "Entry fees are non-refundable once the draw is published. Before the draw, write to us on WhatsApp and we'll help you transfer your spot to another player or move your entry. If we cancel the event, you get a full refund.",
  },
];

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
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
            <CourtLines className="pointer-events-none absolute -right-28 top-0 h-[36rem] w-auto text-volt opacity-[0.1] md:-right-8 md:h-[46rem]" />
            <Container size="lg" className="relative pb-12 pt-24 md:pb-16 md:pt-28">
              <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr]">
                <div>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/logo.png"
                      alt="Pickleball Central"
                      width={96}
                      height={96}
                      className="h-12 w-12 md:h-14 md:w-14"
                    />
                    <span aria-hidden="true" className="font-display text-3xl font-bold text-grey-400">
                      ×
                    </span>
                    <Image
                      src="/dupr-logo.png"
                      alt="DUPR"
                      width={96}
                      height={96}
                      className="h-10 w-10 md:h-12 md:w-12"
                    />
                  </div>

                  <h1 className="mt-7 font-display font-black uppercase leading-[0.88] text-white">
                    <span className="block text-xl font-bold tracking-[0.14em] text-grey-200 sm:text-2xl">
                      Pickleball Central Open
                    </span>
                    <span className="mt-2 block text-[4.6rem] tracking-tight sm:text-[6rem]">
                      November
                    </span>
                    <span className="block text-[4.6rem] tracking-tight text-transparent [-webkit-text-stroke:2px_#C8F400] sm:text-[6rem] sm:[-webkit-text-stroke:3px_#C8F400]">
                      2026
                    </span>
                  </h1>

                  <ul className="mt-7 grid gap-3.5 text-base md:grid-cols-2 md:gap-6">
                    <li className="flex items-start gap-3">
                      <CalendarIcon className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                      <span>
                        <span className="text-lg font-semibold text-white">
                          Sunday, 29 November 2026
                        </span>
                        <span className="block text-grey-200">
                          Doubles report 3 PM · Singles report 6 PM
                        </span>
                      </span>
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

                  <div className="mt-7 overflow-hidden rounded-2xl border border-volt/40 bg-navy-mid md:grid md:grid-cols-[1fr_auto]">
                    <div className="p-5">
                      <p className="font-display text-7xl font-black leading-none text-volt tabular-nums sm:text-8xl">
                        ₹30,000
                      </p>
                      <p className="mt-2 text-base text-grey-100">total cash prize pool</p>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-navy-border bg-navy/60 px-5 py-3 text-sm text-grey-100 md:flex-col md:justify-center md:gap-y-3 md:border-l md:border-t-0 md:px-6">
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
                    <p className="border-t border-navy-border px-5 py-3 text-xs text-grey-400 md:col-span-2">
                      For winners and runners-up. Prize breakdown announced later.
                    </p>
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <CtaLink
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-volt px-8 py-3.5 font-display text-xl font-bold uppercase tracking-wide text-navy transition hover:bg-volt-light active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Register now <ArrowRightIcon className="h-5 w-5" />
                    </CtaLink>
                    <CtaLink
                      category="partner"
                      className="inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-navy-border px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white transition hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                    >
                      Need a partner? Request one — free
                    </CtaLink>
                  </div>
                  <p className="mt-4 text-sm text-grey-200">
                    DUPR {DUPR_CAP} and below · from ₹799 · registration closes Sat 28 Nov, 11:59 PM
                    IST
                    <DaysLeft />
                  </p>
                </div>

                <div className="relative mx-auto hidden h-[32rem] w-full max-w-sm md:block">
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

          {/* ── Match day ────────────────────────────────────────── */}
          <section className="border-b border-navy-border">
            <Container size="lg" className="py-14 md:py-20">
              <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
                <div>
                  <h2 className={h2Cls}>Match day</h2>
                  <p className="mt-4 text-lg font-semibold text-white">Sunday, 29 November 2026</p>
                  <p className="mt-1 text-base text-grey-200">
                    Pickleball Central, Peerzadiguda, Hyderabad
                  </p>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-volt hover:text-volt-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    Get directions <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
                <ol className="divide-y divide-navy-border border-y border-navy-border">
                  {SCHEDULE.map((s) => (
                    <li key={s.time} className="grid grid-cols-[6.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[8rem_1fr]">
                      <p className="font-display text-6xl font-bold leading-[0.9] text-volt tabular-nums">
                        {s.time}
                      </p>
                      <div>
                        <p className="font-display text-3xl font-bold uppercase leading-none text-white">
                          {s.name}
                        </p>
                        <p className="mt-2 max-w-md text-base leading-relaxed text-grey-200">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </section>

          {/* ── Registration (category picker + form) ────────────── */}
          <RegisterSection />

          {/* ── Rules ────────────────────────────────────────────── */}
          <section className="border-b border-navy-border">
            <Container size="lg" className="py-14 md:py-20">
              <h2 className={h2Cls}>Rules and eligibility</h2>
              <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                    Who can enter
                  </h3>
                  <Bullets items={WHO_CAN_ENTER} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                    How entry works
                  </h3>
                  <Bullets items={HOW_ENTRY_WORKS} />
                </div>
              </div>
            </Container>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────── */}
          <section className="border-b border-navy-border">
            <Container size="lg" className="py-14 md:py-20">
              <h2 className={h2Cls}>Good to know</h2>
              <div className="mt-8 max-w-3xl space-y-3">
                {FAQS.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-navy-border bg-navy-mid open:border-volt/50"
                  >
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-display text-xl font-bold uppercase tracking-wide text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ChevronDownIcon className="h-5 w-5 shrink-0 text-volt transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 text-base leading-relaxed text-grey-200">
                      {f.a}
                      {f.placeholder ? (
                        <p className="mt-3 inline-block rounded-md border border-amber-300/50 px-2 py-1 text-xs text-amber-300">
                          Placeholder copy carried over from the October page — to be confirmed.
                        </p>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </Container>
          </section>

          {/* ── Close ────────────────────────────────────────────── */}
          <section>
            <Container size="lg" className="py-14 text-center md:py-20">
              <p className="font-display text-5xl font-black uppercase leading-none text-white md:text-7xl">
                See you on the <span className="text-volt">court.</span>
              </p>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-grey-200">
                Pickleball Central Open · Sunday 29 November 2026 · Pickleball Central, Peerzadiguda,
                Hyderabad.
              </p>
              <p className="mt-4 text-sm text-grey-200">
                Queries — call{" "}
                <a href={`tel:+91${QUERIES_PHONE}`} className={linkCls}>
                  {QUERIES_PHONE}
                </a>{" "}
                or{" "}
                <a
                  href={`https://wa.me/91${QUERIES_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  WhatsApp us
                </a>
                .
              </p>
            </Container>
          </section>

          <StickyCta label="Register — from ₹799" />
        </div>
      </PreviewProvider>
    </>
  );
}
