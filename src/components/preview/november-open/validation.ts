/**
 * DESIGN PREVIEW ONLY — client-side validation for the mock forms. Messages are
 * written the way the production form should word them. DUPR ID rules are the
 * real ones, reused from `@/lib/dupr` (the browser mirror of the API check).
 */
import { DUPR_CAP } from "./data";

import { duprIdError, normalizeDuprId } from "@/lib/dupr";

export type Values = {
  name: string;
  phone: string;
  email: string;
  duprId: string;
  rating: string;
  pName: string;
  pDuprId: string;
  pRating: string;
  terms: boolean;
};

export type FieldKey = keyof Values;
export type Errors = Partial<Record<FieldKey, string>>;

export const EMPTY_VALUES: Values = {
  name: "",
  phone: "",
  email: "",
  duprId: "",
  rating: "",
  pName: "",
  pDuprId: "",
  pRating: "",
  terms: false,
};

/** DOM order — the first invalid field in this order receives focus. */
export const FIELD_ORDER: FieldKey[] = [
  "name",
  "phone",
  "email",
  "duprId",
  "rating",
  "pName",
  "pDuprId",
  "pRating",
  "terms",
];

const cap = (s: string): string => (s === "" ? s : s.charAt(0).toUpperCase() + s.slice(1));

export function nameError(value: string, who: "" | "partner"): string | null {
  const v = value.trim();
  const possessive = who === "partner" ? "your partner's" : "your";
  if (v === "") return `Enter ${possessive} full name.`;
  if (v.length < 2) return "That name looks too short — enter it as it appears on DUPR.";
  return null;
}

/** Strict 10-digit Indian mobile; accepts +91 / 0 prefixes. */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export function phoneError(value: string): string | null {
  if (value.trim() === "") return "Enter your mobile number.";
  if (normalizePhone(value) === null) {
    return "Enter a valid 10-digit Indian mobile number — it starts with 6, 7, 8 or 9.";
  }
  return null;
}

export function emailError(value: string): string | null {
  const v = value.trim();
  if (v === "") return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
    return "That email doesn't look right — try something like name@example.com.";
  }
  return null;
}

export function ratingError(value: string, who: "" | "partner"): string | null {
  const v = value.trim();
  const possessive = who === "partner" ? "your partner's" : "your";
  if (v === "") return `Enter ${possessive} DUPR rating, for example 3.45.`;
  if (!/^\d+(\.\d{1,3})?$/.test(v)) return "Ratings are numbers only, like 3.45.";
  const n = Number.parseFloat(v);
  if (n > 8) return "DUPR ratings run from 0 to 8 — check the number.";
  if (n > DUPR_CAP) {
    return `${cap(possessive)} DUPR rating of ${n} is above this tournament's ${DUPR_CAP} cap. Only players rated ${DUPR_CAP} or below can enter.`;
  }
  return null;
}

export function duprIdMessage(
  id: string,
  phone: string,
  name: string,
  who: "" | "partner",
): string | null {
  const msg = duprIdError(id, phone, name, who === "partner" ? "your partner" : "");
  return msg === null ? null : cap(msg);
}

export function validate(v: Values, withPartner: boolean): Errors {
  const e: Errors = {};
  const set = (k: FieldKey, msg: string | null): void => {
    if (msg !== null) e[k] = msg;
  };
  set("name", nameError(v.name, ""));
  set("phone", phoneError(v.phone));
  set("email", emailError(v.email));
  set("duprId", duprIdMessage(v.duprId, v.phone, v.name, ""));
  set("rating", ratingError(v.rating, ""));
  if (withPartner) {
    set("pName", nameError(v.pName, "partner"));
    set("pDuprId", duprIdMessage(v.pDuprId, "", v.pName, "partner"));
    if (
      e.pDuprId === undefined &&
      normalizeDuprId(v.pDuprId) !== "" &&
      normalizeDuprId(v.pDuprId) === normalizeDuprId(v.duprId)
    ) {
      e.pDuprId = "Both players can't share one DUPR ID — enter your partner's own.";
    }
    set("pRating", ratingError(v.pRating, "partner"));
  }
  if (!v.terms) e.terms = "Please accept the tournament terms to continue.";
  return e;
}
