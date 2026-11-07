"use client";

/**
 * DESIGN PREVIEW ONLY — selectable category card (screen B). A real radio
 * input sits inside each label so keyboard + screen-reader behaviour is native.
 * The selected card expands to show its eligibility; capacity is an
 * ILLUSTRATIVE sample driven by the preview controls.
 */
import { useRef } from "react";

import { CATEGORIES, SAMPLE_TAKEN, type CategoryId } from "./data";
import { CheckIcon } from "./icons";
import { usePreview } from "./state";

type Props = { id: CategoryId; order: number; className?: string | undefined };

export function CategoryCard({ id, order, className }: Props) {
  const { selected, capacity, select } = usePreview();
  const ref = useRef<HTMLLabelElement>(null);
  const c = CATEGORIES[id];
  const isSelected = selected === id;
  const isPartner = id === "partner";
  const paid = id === "partner" ? null : id;
  const cap = paid ? capacity[paid] : null;
  const taken = paid && cap ? SAMPLE_TAKEN[paid][cap] : null;
  const max = c.max;
  const full = cap === "full";
  const left = taken !== null && max !== null ? max - taken : null;

  const onChange = (): void => {
    select(id);
    // On phones the form opens right under the card — bring both into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() =>
        ref.current?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" }),
      );
    }
  };

  const surface = isSelected
    ? "border-volt bg-volt/10"
    : isPartner
      ? "border-dashed border-navy-border bg-transparent hover:border-grey-400"
      : "border-navy-border bg-navy-mid hover:border-grey-400";

  return (
    <label
      ref={ref}
      style={{ order }}
      className={`relative block scroll-mt-20 cursor-pointer rounded-2xl border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt ${surface} ${className ?? ""}`}
    >
      <input
        type="radio"
        name="nov-category"
        value={id}
        checked={isSelected}
        onChange={onChange}
        className="sr-only"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-[1.65rem] font-bold uppercase leading-[1.05] tracking-wide text-white">
            {c.name}
          </p>
          <p className="mt-1.5 text-sm text-grey-200">{c.meta}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-3xl font-bold leading-none text-white tabular-nums">
            {c.priceLabel}
          </p>
          <p className="mt-1 max-w-[6.5rem] text-xs leading-tight text-grey-400">{c.unit}</p>
        </div>
      </div>

      {taken !== null && max !== null && c.maxUnit !== null ? (
        <div className="mt-3.5">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span
              className={
                full ? "font-semibold text-white" : cap === "low" ? "font-semibold text-amber-300" : "text-grey-200"
              }
            >
              {full
                ? "Full — join the waitlist"
                : cap === "low"
                  ? `Only ${left} ${left === 1 ? "spot" : "spots"} left`
                  : `${taken} of ${max} ${c.maxUnit} taken`}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey-400">
              Sample count
            </span>
          </div>
          <div
            role="img"
            aria-label={`${taken} of ${max} ${c.maxUnit} taken — illustrative sample, not live`}
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-border"
          >
            <div
              className={`h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                full ? "bg-grey-400" : cap === "low" ? "bg-amber-300" : "bg-volt"
              }`}
              style={{ width: `${Math.round((taken / max) * 100)}%` }}
            />
          </div>
        </div>
      ) : null}

      {isSelected && c.points.length > 0 ? (
        <ul className="mt-3.5 space-y-1.5 border-t border-navy-border pt-3.5">
          {c.points.map((p) => (
            <li key={p} className="flex gap-2 text-sm leading-snug text-grey-100">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </label>
  );
}
