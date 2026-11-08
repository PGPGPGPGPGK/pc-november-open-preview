"use client";

/**
 * DESIGN PREVIEW ONLY — one form, four modes (screens C, D, E, F):
 *   singles  · doubles (complete team) · partner request (free) · waitlist (when full)
 * Everything is simulated: submitting never touches the network. Paid modes open
 * the simulated checkout sheet; free modes jump straight to the confirmation.
 */
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { CheckoutSheet } from "./CheckoutSheet";
import {
  APP_STORE_URL,
  CATEGORIES,
  DUPR_CAP,
  DUPR_SIGNUP_URL,
  ORIGIN,
  PLAY_STORE_URL,
  SAMPLE_VALUES,
  rupees,
} from "./data";
import { AlertTriangleIcon, HourglassIcon, InfoIcon, SmartphoneIcon } from "./icons";
import { usePreview, type Entry } from "./state";
import { PreviewTag, TextField, primaryBtnCls } from "./ui";
import {
  EMPTY_VALUES,
  FIELD_ORDER,
  normalizePhone,
  validate,
  type FieldKey,
  type Values,
} from "./validation";

const FIELD_LABEL: Record<FieldKey, string> = {
  name: "Name",
  phone: "Mobile number",
  email: "Email",
  duprId: "DUPR ID",
  rating: "DUPR rating",
  pName: "Partner's name",
  pPhone: "Partner's mobile number",
  pDuprId: "Partner's DUPR ID",
  pRating: "Partner's rating",
  terms: "Terms",
  marketing: "Marketing",
};

const linkCls = "text-volt underline underline-offset-2 hover:text-volt-light";

function AppAccountNote() {
  return (
    <div className="flex gap-3 rounded-xl border border-navy-border bg-navy p-4">
      <SmartphoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
      <div className="text-sm leading-relaxed">
        <p className="text-white">
          Tip: use the same phone number and email as your Pickleball Central app account, if you
          have one.
        </p>
        <p className="mt-1 text-grey-200">
          No app yet? You can{" "}
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
            download it on the App Store
          </a>{" "}
          or{" "}
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
            Google Play
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const PARTNER_STEPS = [
  "Requesting a partner is free — nothing is charged now.",
  "Pairing is first-come, first-served, and it isn't guaranteed.",
  "We'll contact you if a suitable partner is found.",
  "Once you're paired and you both agree, each of you pays ₹800.",
  "Payment is requested only after pairing is confirmed.",
];

export function EntryForm() {
  const { selected, capacity, payFailed, setPayFailed, showSuccess, select } = usePreview();
  const category = CATEGORIES[selected];
  const isPartner = selected === "partner";
  const isDoubles = selected === "doubles";
  const paidId = selected === "partner" ? null : selected;
  const waitlist = paidId !== null && capacity[paidId] === "full";
  const doublesFull = capacity.doubles === "full";
  const paysNow = !isPartner && !waitlist;

  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponState, setCouponState] = useState<
    { kind: "idle" } | { kind: "ok" } | { kind: "bad"; message: string }
  >({ kind: "idle" });

  // Typed values survive a category switch; validation state does not.
  const modeKey = `${selected}:${String(waitlist)}`;
  const [scope, setScope] = useState(modeKey);
  if (scope !== modeKey) {
    setScope(modeKey);
    setTouched({});
    setSubmitted(false);
    setSheetOpen(false);
  }

  useEffect(() => {
    if (payFailed) {
      document.getElementById("nov-pay-alert")?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [payFailed]);

  const errors = useMemo(() => validate(values, isDoubles), [values, isDoubles]);
  const errorKeys = FIELD_ORDER.filter((k) => errors[k] !== undefined);
  // Reward early, punish late: a blur only complains about a field that has a
  // value. Empty fields and the terms box are flagged on submit.
  const shown = (k: FieldKey): string | undefined =>
    submitted || (touched[k] === true && k !== "terms" && String(values[k]) !== "")
      ? errors[k]
      : undefined;
  const isValid = (k: FieldKey): boolean =>
    (touched[k] === true || submitted) && errors[k] === undefined && String(values[k]) !== "";

  const set = <K extends FieldKey>(k: K, v: Values[K]): void => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (payFailed) setPayFailed(false);
  };
  const blur = (k: FieldKey) => (): void => setTouched((t) => ({ ...t, [k]: true }));

  const base = category.price ?? 0;
  const discount = couponState.kind === "ok" ? Math.min(100, base) : 0;
  const total = base - discount;

  const applyCoupon = (): void => {
    const code = coupon.trim().toUpperCase();
    if (code === "") return;
    setCouponState(
      code === "SAMPLE"
        ? { kind: "ok" }
        : { kind: "bad", message: "That code isn't valid or has expired." },
    );
  };

  const entry = (): Entry => ({
    paidTotal: paysNow ? total : 0,
    name: values.name.trim(),
    partnerName: values.pName.trim(),
    sample: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
    setPayFailed(false);
    const first = errorKeys[0];
    if (first !== undefined) {
      requestAnimationFrame(() => document.getElementById(`nov-${first}`)?.focus());
      return;
    }
    if (isPartner) showSuccess("partner", "partner", entry());
    else if (waitlist) showSuccess("waitlist", selected, entry());
    else setSheetOpen(true);
  };

  const fillSample = (): void => {
    setValues({ ...EMPTY_VALUES, ...SAMPLE_VALUES });
    setTouched({});
    setSubmitted(false);
    setPayFailed(false);
  };

  // ── Copy per mode ────────────────────────────────────────────────
  const title = waitlist
    ? `Join the waitlist`
    : isPartner
      ? "Request a doubles partner"
      : isDoubles
        ? "Open Doubles team entry"
        : "Open Singles entry";
  const subtitle = waitlist
    ? `${category.name} is full. Joining is free and doesn't hold a spot.`
    : isPartner
      ? "Free to request. You pay nothing unless you're paired and you both agree."
      : isDoubles
        ? `${rupees(1599)} for the complete team · both players DUPR ${DUPR_CAP} or below · report 3 PM IST`
        : `${rupees(799)} per player · DUPR ${DUPR_CAP} or below · report 6 PM IST`;
  const submitLabel = isPartner
    ? "Send partner request"
    : waitlist
      ? "Join the waitlist"
      : `Pay ${rupees(total)}`;
  const submitNote = paysNow
    ? "Preview only — opens a simulated checkout. No payment is taken."
    : "Preview only — nothing is sent.";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="nov-form-title"
      // A blur-triggered error message pushes everything below it down; if the
      // pointer was already pressed on a button/checkbox, that tap is lost.
      // Pressing a non-text control therefore keeps focus where it is.
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("input:not([type='checkbox']), textarea")) e.preventDefault();
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <PreviewTag>Preview form · nothing is submitted</PreviewTag>
        <button
          type="button"
          onClick={fillSample}
          className="min-h-11 rounded-lg border border-navy-border px-3 font-mono text-xs font-semibold uppercase tracking-wider text-grey-200 transition hover:border-volt hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
        >
          Fill sample data
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-grey-400">
        This is a design preview — please use the sample data rather than real personal details.
      </p>

      <h3
        id="nov-form-title"
        className="mt-5 font-display text-4xl font-bold uppercase leading-none text-white text-balance"
      >
        {title}
      </h3>
      <p className="mt-2 text-base leading-relaxed text-grey-200">{subtitle}</p>
      {isDoubles && !waitlist ? (
        <p className="mt-1 flex min-h-11 flex-wrap items-center gap-x-1.5 text-sm text-grey-200">
          No partner yet?
          <button
            type="button"
            onClick={() => select("partner")}
            className={`${linkCls} min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt`}
          >
            Request one for free
          </button>
        </p>
      ) : null}

      {/* Mode notes */}
      {waitlist ? (
        <div className="mt-5 flex gap-3 rounded-xl border border-amber-300/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-grey-100">
          <HourglassIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p>
            If a spot opens we&apos;ll message you with a payment link. Nothing is charged to join,
            and joining doesn&apos;t reserve a place.
          </p>
        </div>
      ) : null}
      {isPartner ? (
        <p className="mt-3 text-sm leading-relaxed text-grey-200">You may also register for Open Singles independently at ₹799. Requesting a doubles partner does not reserve or pay for a Singles entry.</p>
      ) : null}
      {isPartner && doublesFull ? (
        <div className="mt-5 flex gap-3 rounded-xl border border-amber-300/50 bg-amber-300/10 p-4 text-sm leading-relaxed text-grey-100">
          <HourglassIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <p>
            Open Doubles is full right now. A matched pair would join the Open Doubles waitlist
            instead of getting a slot.
          </p>
        </div>
      ) : null}
      {isPartner ? (
        <ol className="mt-5 space-y-3 rounded-xl border border-navy-border bg-navy p-4">
          {PARTNER_STEPS.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm leading-snug text-grey-100">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-volt font-display text-sm font-bold text-volt"
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
          <li className="flex gap-3 border-t border-navy-border pt-3 text-sm leading-snug text-amber-300">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>A pairing request does not guarantee a tournament slot.</span>
          </li>
        </ol>
      ) : null}

      <div className="mt-6">
        <AppAccountNote />
      </div>

      {/* Captain / player */}
      <fieldset className="mt-7 min-w-0 border-0 p-0">
        <legend className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-white">
          {isDoubles ? "Captain — the person registering" : "Your details"}
        </legend>
        <div className="space-y-4">
          <TextField
            id="nov-name"
            label="Full name"
            value={values.name}
            onChange={(v) => set("name", v)}
            onBlur={blur("name")}
            error={shown("name")}
            valid={isValid("name")}
            hint="As it appears on your DUPR profile."
            autoComplete="name"
            placeholder="First and last name"
          />
          <TextField
            id="nov-phone"
            label="Mobile number"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            onBlur={blur("phone")}
            error={shown("phone")}
            valid={isValid("phone")}
            prefix="+91"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile number"
            hint={
              isDoubles
                ? "The captain's number is used for the whole team."
                : "Confirmations and updates go here."
            }
          />
          <TextField
            id="nov-email"
            label="Email"
            value={values.email}
            onChange={(v) => set("email", v)}
            onBlur={blur("email")}
            error={shown("email")}
            valid={isValid("email")}
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="nov-duprId"
              label="DUPR ID"
              value={values.duprId}
              onChange={(v) => set("duprId", v)}
              onBlur={blur("duprId")}
              error={shown("duprId")}
              valid={isValid("duprId")}
              autoCapitalize="characters"
              spellCheck={false}
              autoComplete="off"
              placeholder="e.g. 4XK29P"
              hint={
                <>
                  Copy it from your DUPR profile. No account?{" "}
                  <a href={DUPR_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    Create one free
                  </a>
                  .
                </>
              }
            />
            <TextField
              id="nov-rating"
              label="DUPR rating"
              value={values.rating}
              onChange={(v) => set("rating", v)}
              onBlur={blur("rating")}
              error={shown("rating")}
              valid={isValid("rating")}
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 3.45"
              hint={`${DUPR_CAP} or below`}
            />
          </div>
        </div>
      </fieldset>

      {/* Partner (complete team only) */}
      {isDoubles ? (
        <fieldset className="mt-8 min-w-0 border-0 p-0">
          <legend className="font-display text-xl font-bold uppercase tracking-wide text-white">
            Your partner
          </legend>
          <p className="mb-4 mt-1 text-sm text-grey-200">
            Enter your partner&apos;s name, mobile number, DUPR ID and rating.
          </p>
          <div className="space-y-4">
            <TextField
              id="nov-pName"
              label="Partner's full name"
              value={values.pName}
              onChange={(v) => set("pName", v)}
              onBlur={blur("pName")}
              error={shown("pName")}
              valid={isValid("pName")}
              autoComplete="off"
              placeholder="First and last name"
            />
            <TextField
              id="nov-pPhone"
              label="Partner's mobile number"
              value={values.pPhone}
              onChange={(v) => set("pPhone", v)}
              onBlur={blur("pPhone")}
              error={shown("pPhone")}
              valid={isValid("pPhone")}
              prefix="+91"
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              placeholder="10-digit mobile number"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="nov-pDuprId"
                label="Partner's DUPR ID"
                value={values.pDuprId}
                onChange={(v) => set("pDuprId", v)}
                onBlur={blur("pDuprId")}
                error={shown("pDuprId")}
                valid={isValid("pDuprId")}
                autoCapitalize="characters"
                spellCheck={false}
                autoComplete="off"
                placeholder="e.g. 7MQ31R"
              />
              <TextField
                id="nov-pRating"
                label="Partner's rating"
                value={values.pRating}
                onChange={(v) => set("pRating", v)}
                onBlur={blur("pRating")}
                error={shown("pRating")}
                valid={isValid("pRating")}
                inputMode="decimal"
                autoComplete="off"
                placeholder="e.g. 3.20"
                hint={`${DUPR_CAP} or below`}
              />
            </div>
          </div>
        </fieldset>
      ) : null}

      {/* Consent: required agreement, and a separate optional marketing opt-in */}
      <div className="mt-7 space-y-1">
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-grey-100">
          <input
            id="nov-terms"
            type="checkbox"
            checked={values.terms}
            onChange={(e) => set("terms", e.target.checked)}
            onBlur={blur("terms")}
            aria-invalid={shown("terms") !== undefined || undefined}
            aria-describedby={shown("terms") !== undefined ? "nov-terms-msg" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C8F400]"
          />
          <span>
            I agree to the{" "}
            <a href="#rules" className={linkCls}>
              tournament rules
            </a>
            ,{" "}
            <a href={`${ORIGIN}/terms`} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href={`${ORIGIN}/privacy`} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Privacy Policy
            </a>
            . <span className="text-volt">*</span>
          </span>
        </label>
        {shown("terms") !== undefined ? (
          <p id="nov-terms-msg" className="flex items-start gap-1.5 pb-1 text-sm text-red-400">
            <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{shown("terms")}</span>
          </p>
        ) : null}
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed text-grey-100">
          <input
            id="nov-marketing"
            type="checkbox"
            checked={values.marketing}
            onChange={(e) => set("marketing", e.target.checked)}
            aria-describedby="nov-marketing-note"
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#C8F400]"
          />
          <span>
            I&apos;d like to receive tournament news, offers and promotional emails from Pickleball
            Central. I can unsubscribe at any time.
          </span>
        </label>
        <p id="nov-marketing-note" className="pl-8 text-xs leading-relaxed text-grey-400">
          Optional. Not needed to register, pay, request a partner or join a waitlist.
        </p>
      </div>

      {/* Total + coupon */}
      <div className="mt-7 rounded-2xl border border-navy-border bg-navy p-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-grey-200">
            {paysNow ? "Total · tax treatment to be confirmed" : "Due now"}
          </span>
          <span className="text-right">
            {discount > 0 ? (
              <span className="mr-2 text-sm text-grey-400 line-through tabular-nums">
                {rupees(base)}
              </span>
            ) : null}
            <span className="font-display text-3xl font-bold leading-none text-white tabular-nums">
              {paysNow ? rupees(total) : "₹0"}
            </span>
          </span>
        </div>
        {isPartner ? (
          <p className="mt-2 text-sm text-grey-200">
            ₹800 per person is requested later, only after pairing is confirmed.
          </p>
        ) : null}
        {paysNow ? (
          <div className="mt-3 border-t border-navy-border pt-3">
            {couponOpen ? (
              <div>
                <label htmlFor="nov-coupon" className="mb-1.5 block text-sm text-grey-200">
                  Coupon code <span className="text-grey-400">(preview: try SAMPLE)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="nov-coupon"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponState({ kind: "idle" });
                    }}
                    autoCapitalize="characters"
                    autoComplete="off"
                    className="w-full rounded-xl border border-navy-border bg-navy-mid px-4 py-3 text-base text-white caret-volt placeholder:text-[#7D8CA3] focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/25"
                    placeholder="Optional"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={coupon.trim() === ""}
                    className="shrink-0 rounded-xl border border-volt px-5 font-display text-sm font-bold uppercase tracking-wide text-volt transition hover:bg-volt/10 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
                  >
                    Apply
                  </button>
                </div>
                {couponState.kind === "ok" ? (
                  <p className="mt-1.5 text-sm text-volt">Coupon applied — {rupees(discount)} off (sample).</p>
                ) : null}
                {couponState.kind === "bad" ? (
                  <p className="mt-1.5 text-sm text-red-400">{couponState.message}</p>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCouponOpen(true)}
                className="min-h-11 text-sm text-grey-200 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              >
                Have a coupon code?
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Errors */}
      {submitted && errorKeys.length > 0 ? (
        <div
          role="alert"
          className="mt-5 flex gap-3 rounded-xl border border-red-400/60 bg-red-400/10 p-4 text-sm leading-relaxed text-grey-100"
        >
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <p>
            <span className="font-semibold text-white">
              {errorKeys.length === 1 ? "One thing to fix" : `${errorKeys.length} things to fix`}:
            </span>{" "}
            {errorKeys.map((k) => FIELD_LABEL[k]).join(" · ")}
          </p>
        </div>
      ) : null}
      {payFailed ? (
        <div
          id="nov-pay-alert"
          role="alert"
          className="mt-5 flex gap-3 rounded-xl border border-red-400/60 bg-red-400/10 p-4 text-sm leading-relaxed text-grey-100"
        >
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          <p>
            <span className="font-semibold text-white">Payment didn&apos;t go through.</span> You
            haven&apos;t been charged and your details are still here — try again, or use a
            different payment method.
          </p>
        </div>
      ) : null}

      <button type="submit" className={`mt-5 ${primaryBtnCls}`}>
        {submitLabel}
      </button>
      <p className="mt-2.5 text-center text-xs text-grey-400">{submitNote}</p>

      <CheckoutSheet
        open={sheetOpen}
        title={isDoubles ? "Open Doubles — team entry" : "Open Singles — entry"}
        lines={[
          { label: "Category", value: category.name },
          isDoubles
            ? {
                label: "Team",
                value: `${values.name.trim() || "Captain"} & ${values.pName.trim() || "Partner"}`,
              }
            : { label: "Player", value: values.name.trim() || "Player" },
          { label: "Reports", value: `${category.report ?? ""} IST · Sun 29 Nov` },
          ...(discount > 0 ? [{ label: "Coupon (sample)", value: `− ${rupees(discount)}` }] : []),
        ]}
        total={rupees(total)}
        contact={{
          name: values.name.trim() || "—",
          phone: `+91 ${normalizePhone(values.phone) ?? values.phone.trim()}`,
          email: values.email.trim() || "—",
        }}
        onClose={() => setSheetOpen(false)}
        onFail={() => {
          setSheetOpen(false);
          setPayFailed(true);
        }}
        onSuccess={() => {
          setSheetOpen(false);
          showSuccess("paid", selected, entry());
        }}
      />
    </form>
  );
}
