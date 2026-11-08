"use client";

/**
 * DESIGN PREVIEW ONLY — mock confirmation states (screen G + waitlist):
 *   paid      → "You're in"            (after simulated payment)
 *   partner   → "Pairing request received"
 *   waitlist  → "You're on the waitlist"
 * Reference numbers and positions are samples.
 */
import { useEffect, useRef, useState } from "react";

import { CATEGORIES, WHATSAPP_COMMUNITY_URL, rupees } from "./data";
import { ArrowRightIcon, CalendarIcon, HourglassIcon, WhatsAppIcon } from "./icons";
import { usePreview } from "./state";
import { PreviewTag, ghostBtnCls } from "./ui";

/** Check mark that draws itself once on mount — the page's single authored motion. */
function DrawnCheck() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="29" stroke="#C8F400" strokeWidth="3" opacity="0.35" />
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="#C8F400"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="182"
        strokeDashoffset={drawn ? 0 : 182}
        transform="rotate(-90 32 32)"
        style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
      <path
        d="M20 33l8 8 16-17"
        stroke="#C8F400"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset={drawn ? 0 : 40}
        style={{ transition: "stroke-dashoffset 500ms 250ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3">
      <dt className="shrink-0 text-grey-400">{label}</dt>
      <dd className="text-right text-white">{children}</dd>
    </div>
  );
}

function calendarUrl(report: string | null): string {
  // 3 PM IST = 09:30Z, 6 PM IST = 12:30Z (reporting hour only).
  const start = report === "6 PM" ? "20261129T123000Z" : "20261129T093000Z";
  const end = report === "6 PM" ? "20261129T133000Z" : "20261129T103000Z";
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `Pickleball Central Open — report ${report ?? "3 PM"} IST`,
    dates: `${start}/${end}`,
    location: "Pickleball Central, Peerzadiguda, Hyderabad",
    details: "Pickleball Central Open · November 2026",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

export function SuccessPanel() {
  const { view, entry, capacity, backToForm, select } = usePreview();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    }
  }, [view]);

  if (view.kind !== "success") return null;
  const category = CATEGORIES[view.category];
  const isDoubles = view.category === "doubles";
  const who = isDoubles
    ? `${entry.name || "Captain"} & ${entry.partnerName || "Partner"}`
    : entry.name || "Player";

  const wrapper = "scroll-mt-32 outline-none";

  // ── Pairing request received ─────────────────────────────────────
  if (view.success === "partner") {
    const steps: { title: string; body: string; done?: boolean }[] = [
      { title: "Request received", body: "You're in the matching queue.", done: true },
      { title: "We look for a partner", body: "First-come, first-served. Pairing isn't guaranteed." },
      { title: "We contact you", body: "If a suitable partner is found, we'll get in touch." },
      { title: "You both agree", body: "Each player confirms before anything is charged." },
      { title: "Payment requested", body: "₹800 each — only after pairing is confirmed." },
      { title: "Slot confirmed", body: "A pairing request alone doesn't guarantee a slot." },
    ];
    return (
      <div ref={ref} tabIndex={-1} className={wrapper}>
        <PreviewTag>Preview state · request received</PreviewTag>
        <div className="mt-5 flex items-center gap-4">
          <DrawnCheck />
          <h3 className="font-display text-4xl font-bold uppercase leading-none text-white text-balance">
            Pairing request received
          </h3>
        </div>
        <p className="mt-4 text-base leading-relaxed text-grey-200">
          Thanks{entry.name ? `, ${entry.name.split(" ")[0]}` : ""}. You haven&apos;t paid anything,
          and a pairing request does not guarantee a tournament slot. We&apos;ll contact you if a
          suitable partner is found.
        </p>

        <ol className="mt-6 space-y-0">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-5 last:pb-0">
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-7 h-[calc(100%-1.25rem)] w-px bg-navy-border"
                />
              ) : null}
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  s.done ? "border-volt bg-volt" : "border-navy-border bg-navy-mid"
                }`}
              >
                {s.done ? <span className="h-2 w-2 rounded-full bg-navy" /> : null}
              </span>
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  {s.title}
                  {s.done ? <span className="sr-only"> (done)</span> : null}
                </p>
                <p className="text-sm leading-snug text-grey-200">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-navy-border bg-navy p-4 text-sm leading-relaxed text-grey-100">
          <p className="font-semibold text-white">Have a partner in mind already?</p>
          <p className="mt-1 text-grey-200">
            {capacity.doubles === "full"
              ? "Open Doubles is full. Join the complete-team waitlist for free; it doesn't hold a slot."
              : "Register a complete team for ₹1,599 and your slot is secured as soon as you pay."}
          </p>
          <button
            type="button"
            onClick={() => select("doubles")}
            className="mt-3 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-volt hover:text-volt-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
          >
            {capacity.doubles === "full" ? "Join the team waitlist" : "Register a complete team"} <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
        <button type="button" onClick={() => select("singles")} className={`mt-4 ${ghostBtnCls}`}>
          Register for Open Singles separately — ₹799
        </button>
        <button type="button" onClick={backToForm} className={`mt-4 ${ghostBtnCls}`}>
          Back to categories
        </button>
      </div>
    );
  }

  // ── Waitlist joined ──────────────────────────────────────────────
  if (view.success === "waitlist") {
    return (
      <div ref={ref} tabIndex={-1} className={wrapper}>
        <PreviewTag>Preview state · waitlist joined</PreviewTag>
        <div className="mt-5 flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-amber-300/60 text-amber-300">
            <HourglassIcon className="h-7 w-7" />
          </span>
          <h3 className="font-display text-4xl font-bold uppercase leading-none text-white text-balance">
            You&apos;re on the waitlist
          </h3>
        </div>
        <dl className="mt-6 divide-y divide-navy-border rounded-xl border border-navy-border bg-navy text-sm">
          <Row label="Category">{category.name}</Row>
          <Row label={isDoubles ? "Team" : "Player"}>{who}</Row>
          <Row label="Position">#3 (sample)</Row>
          <Row label="Charged">₹0</Row>
        </dl>
        <p className="mt-5 text-base leading-relaxed text-grey-200">
          If a spot opens we&apos;ll message you with a payment link. Joining the waitlist doesn&apos;t
          hold a place — your slot is confirmed only once you&apos;ve paid.
        </p>
        <button type="button" onClick={backToForm} className={`mt-6 ${ghostBtnCls}`}>
          Back to categories
        </button>
      </div>
    );
  }

  // ── Paid: you're in ──────────────────────────────────────────────
  return (
    <div ref={ref} tabIndex={-1} className={wrapper}>
      <PreviewTag>Preview state · after payment</PreviewTag>
      <div className="mt-5 flex items-center gap-4">
        <DrawnCheck />
        <h3 className="font-display text-5xl font-bold uppercase leading-none text-white">
          You&apos;re in
        </h3>
      </div>
      <p className="mt-4 text-base leading-relaxed text-grey-200">
        {isDoubles
          ? "Your team is registered for the Pickleball Central Open."
          : "You're registered for the Pickleball Central Open."}{" "}
        A confirmation would go to the {isDoubles ? "captain's " : ""}phone and email you entered.
      </p>

      <dl className="mt-6 divide-y divide-navy-border rounded-xl border border-navy-border bg-navy text-sm">
        <Row label="Category">{category.name}</Row>
        <Row label={isDoubles ? "Team" : "Player"}>{who}</Row>
        <Row label="Date">Sunday, 29 November 2026</Row>
        <Row label="Report at">
          <span className="font-display text-lg font-bold text-volt">{category.report} IST</span>
        </Row>
        <Row label="Venue">Pickleball Central, Peerzadiguda</Row>
        <Row label="Paid">{rupees(entry.paidTotal ?? category.price ?? 0)} (simulated)</Row>
        <Row label="Reference">PCO-NOV-0000 (sample)</Row>
      </dl>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href={WHATSAPP_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-3 font-display text-base font-bold uppercase tracking-wide text-black transition active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <WhatsAppIcon /> WhatsApp community
        </a>
        <a
          href={calendarUrl(category.report)}
          target="_blank"
          rel="noopener noreferrer"
          className={ghostBtnCls}
        >
          <CalendarIcon className="h-5 w-5" /> Add to calendar
        </a>
      </div>
      <button type="button" onClick={backToForm} className={`mt-5 ${ghostBtnCls}`}>
        Register another category
      </button>
    </div>
  );
}
