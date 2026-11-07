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
    <div ref={wrapRef} className="sticky top-16 z-40">
      <div className="border-b border-volt/30 bg-[#0F1522]">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className="flex items-center gap-2 text-xs font-semibold leading-snug text-volt">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-volt" />
            <span>
              Design preview <span className="font-normal text-grey-200">· not live · nothing is submitted</span>
            </span>
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nov-preview-panel"
            onClick={() => setOpen((o) => !o)}
            className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-2 text-xs font-semibold text-white hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
          >
            <SlidersIcon className="h-4 w-4" />
            Controls
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="nov-preview-panel"
          role="dialog"
          aria-label="Design preview controls"
          className="fixed right-3 top-28 z-[56] max-h-[calc(100dvh-8rem)] w-[min(94vw,26rem)] overflow-y-auto rounded-2xl border border-volt/40 bg-navy-mid p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:right-6"
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
