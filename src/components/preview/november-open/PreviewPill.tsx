"use client";

/**
 * DESIGN PREVIEW ONLY — persistent "Design preview" pill + review controls.
 * Lets a reviewer flip the ILLUSTRATIVE capacity of each category (so the
 * almost-full and full/waitlist states can be seen) and jump straight to the
 * confirmation screens. Not part of the real page.
 */
import { useEffect, useRef, useState } from "react";

import { CAPACITY_LABEL, type Capacity, type PaidCategoryId } from "./data";
import { SlidersIcon, XIcon } from "./icons";
import { usePreview } from "./state";

const CAPS: Capacity[] = ["open", "low", "full"];

function Segmented({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Capacity;
  onChange: (c: Capacity) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-sm text-grey-200">{label}</p>
      <div role="radiogroup" aria-label={label} className="grid grid-cols-3 gap-1 rounded-xl bg-navy p-1">
        {CAPS.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={value === c}
            onClick={() => onChange(c)}
            className={`min-h-10 rounded-lg px-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt ${
              value === c ? "bg-volt text-navy" : "text-grey-200 hover:text-white"
            }`}
          >
            {CAPACITY_LABEL[c]}
          </button>
        ))}
      </div>
    </div>
  );
}

const jumpBtnCls =
  "min-h-11 rounded-lg border border-navy-border px-3 text-left text-sm text-grey-100 transition hover:border-volt hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt";

export function PreviewPill() {
  const [open, setOpen] = useState(false);
  const { capacity, setCapacity, showSuccess, backToForm, reset } = usePreview();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent): void => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const jump = (fn: () => void): void => {
    fn();
    setOpen(false);
    requestAnimationFrame(() =>
      document.getElementById("register")?.scrollIntoView({ block: "start" }),
    );
  };

  return (
    <div ref={wrapRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nov-preview-panel"
        onClick={() => setOpen((o) => !o)}
        className="fixed left-1/2 top-4 z-[55] flex h-12 -translate-x-1/2 items-center gap-2 rounded-full border border-volt/60 bg-navy/90 px-4 font-mono text-[11px] uppercase tracking-widest text-volt shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition hover:border-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:top-6 md:h-14 md:px-5"
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-volt" />
        <span className="hidden sm:inline">Design preview</span>
        <span className="sm:hidden">Preview</span>
        <SlidersIcon className="h-4 w-4" />
      </button>

      {open ? (
        <div
          id="nov-preview-panel"
          role="dialog"
          aria-label="Design preview controls"
          className="fixed left-1/2 top-[4.5rem] z-[56] max-h-[calc(100dvh-6rem)] w-[min(92vw,26rem)] -translate-x-1/2 overflow-y-auto rounded-2xl border border-volt/40 bg-navy-mid p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] md:top-24"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-2xl font-bold uppercase leading-none text-white">
              Design preview
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close preview controls"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-border text-grey-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-grey-200">
            A mockup for design approval. Nothing here is live: forms and payments are simulated, no
            data is sent or stored, and capacity numbers are illustrative samples.
          </p>

          <div className="mt-5 space-y-4">
            <Segmented
              label="Men's Singles capacity (sample)"
              value={capacity.singles}
              onChange={(c) => setCapacity("singles" satisfies PaidCategoryId, c)}
            />
            <Segmented
              label="Open Doubles capacity (sample)"
              value={capacity.doubles}
              onChange={(c) => setCapacity("doubles" satisfies PaidCategoryId, c)}
            />
          </div>

          <p className="mb-2 mt-6 text-sm text-grey-200">Jump to a screen</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={jumpBtnCls} onClick={() => jump(backToForm)}>
              Registration form
            </button>
            <button
              type="button"
              className={jumpBtnCls}
              onClick={() => jump(() => showSuccess("paid", "singles"))}
            >
              Singles confirmed
            </button>
            <button
              type="button"
              className={jumpBtnCls}
              onClick={() => jump(() => showSuccess("paid", "doubles"))}
            >
              Doubles confirmed
            </button>
            <button
              type="button"
              className={jumpBtnCls}
              onClick={() => jump(() => showSuccess("partner", "partner"))}
            >
              Pairing request received
            </button>
            <button
              type="button"
              className={jumpBtnCls}
              onClick={() => jump(() => showSuccess("waitlist", "singles"))}
            >
              Waitlist joined
            </button>
            <button type="button" className={jumpBtnCls} onClick={() => jump(reset)}>
              Reset everything
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
