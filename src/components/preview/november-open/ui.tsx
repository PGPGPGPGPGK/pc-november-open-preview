"use client";

/**
 * DESIGN PREVIEW ONLY — shared form primitives. Class strings are lifted from
 * the October registration form (SeasonOpenRegister) and tightened: stronger
 * placeholder contrast, a visible focus ring, an error state, tabular numerals.
 */
import type { InputHTMLAttributes, ReactNode } from "react";

import { AlertTriangleIcon, CheckIcon } from "./icons";

export const labelCls =
  "mb-1.5 block font-mono text-xs font-semibold uppercase tracking-wider text-grey-200";

/** 4.5:1+ placeholder on the navy field (grey-600 used on October is ~2.5:1). */
export function inputCls(invalid: boolean, extra = ""): string {
  return `w-full rounded-xl border bg-navy px-4 py-3.5 text-base text-white caret-volt placeholder:text-[#7D8CA3] transition-colors focus:outline-none focus:ring-2 ${
    invalid
      ? "border-red-400 focus:ring-red-400/30"
      : "border-navy-border focus:border-volt focus:ring-volt/25"
  } ${extra}`;
}

type NativeInput = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "inputMode" | "autoComplete" | "placeholder" | "autoCapitalize" | "spellCheck" | "maxLength"
>;

export type TextFieldProps = NativeInput & {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  hint?: ReactNode | undefined;
  /** Show the small "looks good" tick (touched + valid). */
  valid?: boolean | undefined;
  /** Fixed text before the input, e.g. "+91". */
  prefix?: string | undefined;
  className?: string | undefined;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  valid,
  prefix,
  className,
  ...native
}: TextFieldProps) {
  const msgId = `${id}-msg`;
  const invalid = error !== undefined;
  const input = (
    <input
      id={id}
      name={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      aria-invalid={invalid || undefined}
      aria-describedby={error !== undefined || hint ? msgId : undefined}
      className={inputCls(invalid, `${prefix ? "rounded-l-none" : ""} ${valid ? "pr-11" : ""}`)}
      {...native}
    />
  );
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative flex">
        {prefix ? (
          <span
            aria-hidden="true"
            className={`inline-flex items-center rounded-l-xl border border-r-0 bg-navy-soft px-3.5 text-base text-grey-200 ${
              invalid ? "border-red-400" : "border-navy-border"
            }`}
          >
            {prefix}
          </span>
        ) : null}
        {input}
        {valid ? (
          <CheckIcon className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-volt" />
        ) : null}
      </div>
      {error !== undefined ? (
        <p id={msgId} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-400">
          <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={msgId} className="mt-1.5 text-xs leading-relaxed text-grey-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Small mono tag used to mark preview-only surfaces. */
export function PreviewTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/50 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-volt">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-volt" />
      {children}
    </span>
  );
}

export const primaryBtnCls =
  "flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-volt px-6 py-3.5 font-display text-xl font-bold uppercase tracking-wide text-navy transition hover:bg-volt-light active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60";

export const ghostBtnCls =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-navy-border px-5 py-3 font-display text-base font-bold uppercase tracking-wide text-white transition hover:border-grey-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt";
