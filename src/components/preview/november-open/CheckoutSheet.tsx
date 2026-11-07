"use client";

/**
 * DESIGN PREVIEW ONLY — stand-in for Razorpay Checkout. Opens a clearly labelled
 * simulated sheet with "succeed" / "fail" buttons so both outcomes can be
 * reviewed. No Razorpay script is loaded, no request is made, no money moves.
 */
import { useEffect, useRef, useState } from "react";

import { AlertTriangleIcon } from "./icons";
import { ghostBtnCls, primaryBtnCls } from "./ui";

type Props = {
  open: boolean;
  title: string;
  lines: { label: string; value: string }[];
  total: string;
  /** What the production checkout would pass to Razorpay as prefill — typed once, never re-asked. */
  contact: { name: string; phone: string; email: string };
  onSuccess: () => void;
  onFail: () => void;
  onClose: () => void;
};

export function CheckoutSheet({
  open,
  title,
  lines,
  total,
  contact,
  onSuccess,
  onFail,
  onClose,
}: Props) {
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      setShown(true);
      primaryRef.current?.focus();
    });
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
      setShown(false);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] flex items-end justify-center bg-black/75 transition-opacity duration-300 sm:items-center sm:p-6 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nov-checkout-title"
        className={`max-h-[94dvh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-navy-border bg-navy-mid transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl ${
          shown ? "translate-y-0" : "translate-y-8"
        }`}
      >
        <div className="flex items-start gap-2.5 bg-amber-300 px-5 py-3 text-navy">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-semibold leading-snug">
            Simulated checkout — preview only. No payment is taken and nothing is sent.
          </p>
        </div>

        <div className="p-6">
          <h3 id="nov-checkout-title" className="font-display text-2xl font-bold uppercase text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-grey-200">
            This is where the secure Razorpay window would open.
          </p>

          <div className="mt-5 rounded-xl border border-volt/40 bg-volt/5 p-4 text-sm">
            <p className="font-semibold text-white">Prefilled from your registration</p>
            <dl className="mt-2 space-y-1">
              <div className="flex justify-between gap-4">
                <dt className="text-grey-400">Name</dt>
                <dd className="text-right text-white">{contact.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-grey-400">Mobile</dt>
                <dd className="text-right text-white tabular-nums">{contact.phone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-grey-400">Email</dt>
                <dd className="min-w-0 break-all text-right text-white">{contact.email}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-grey-200">
              Passed to Razorpay automatically, so you never type these twice.
            </p>
          </div>

          <dl className="mt-3 divide-y divide-navy-border rounded-xl border border-navy-border bg-navy text-sm">
            {lines.map((l) => (
              <div key={l.label} className="flex justify-between gap-4 px-4 py-3">
                <dt className="text-grey-400">{l.label}</dt>
                <dd className="text-right text-white">{l.value}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 px-4 py-3">
              <dt className="text-grey-200">Total · GST included</dt>
              <dd className="font-display text-2xl font-bold text-white tabular-nums">{total}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-3">
            <button ref={primaryRef} type="button" onClick={onSuccess} className={primaryBtnCls}>
              Simulate successful payment
            </button>
            <button type="button" onClick={onFail} className={ghostBtnCls}>
              Simulate failed payment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-sm text-grey-400 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
