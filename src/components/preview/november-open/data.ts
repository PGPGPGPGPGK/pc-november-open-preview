/**
 * DESIGN PREVIEW ONLY — static facts + illustrative numbers for the
 * Pickleball Central Open · November 2026 mockup. Nothing here is live
 * inventory, and nothing in this folder talks to the API, Razorpay or the
 * database.
 */

export const DUPR_CAP = 3.7;

export type CategoryId = "singles" | "doubles" | "partner";
export type PaidCategoryId = Exclude<CategoryId, "partner">;
export type Capacity = "open" | "low" | "full";

export type Category = {
  id: CategoryId;
  name: string;
  /** Rupees; null = free request. */
  price: number | null;
  priceLabel: string;
  unit: string;
  report: string | null;
  max: number | null;
  maxUnit: string | null;
  /** One-line eligibility shown on the collapsed card. */
  meta: string;
  /** Bullets shown when the card is selected. */
  points: string[];
};

export const CATEGORIES: Record<CategoryId, Category> = {
  singles: {
    id: "singles",
    name: "Men's Singles",
    price: 799,
    priceLabel: "₹799",
    unit: "per player",
    report: "6 PM",
    max: 24,
    maxUnit: "players",
    meta: "Report 6 PM IST · Max 24 players",
    points: [
      "Male players, DUPR 3.7 or below",
      "DUPR ID and rating required",
      "Reporting time: 6 PM IST",
    ],
  },
  doubles: {
    id: "doubles",
    name: "Open Doubles",
    price: 1599,
    priceLabel: "₹1,599",
    unit: "for the complete team",
    report: "3 PM",
    max: 24,
    maxUnit: "teams",
    meta: "Report 3 PM IST · Max 24 teams · Any gender mix",
    points: [
      "Any gender combination, both players DUPR 3.7 or below",
      "Both players' names, DUPR IDs and ratings required",
      "Only the captain enters a phone number and email",
      "Reporting time: 3 PM IST",
    ],
  },
  partner: {
    id: "partner",
    name: "Request a Doubles Partner",
    price: null,
    priceLabel: "Free",
    unit: "to request",
    report: null,
    max: null,
    maxUnit: null,
    meta: "No payment now · ₹900 each only if paired",
    // The matching steps live in the form itself, so the card stays a summary.
    points: [],
  },
};

export const CATEGORY_ORDER: CategoryId[] = ["singles", "doubles", "partner"];

/** ILLUSTRATIVE capacity used by the preview controls — never live numbers. */
export const SAMPLE_TAKEN: Record<PaidCategoryId, Record<Capacity, number>> = {
  singles: { open: 17, low: 23, full: 24 },
  doubles: { open: 14, low: 23, full: 24 },
};

export const CAPACITY_LABEL: Record<Capacity, string> = {
  open: "Open",
  low: "Almost full",
  full: "Full",
};

// ── Real, existing links (copied from the production site) ───────────────
/** landing/MobileApp.tsx + app/download/page.tsx */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.snowflakeenterprises.pickleballcentral";
export const APP_STORE_URL = "https://apps.apple.com/in/app/pickleball-central/id6787500349";
/** events/EventRegistrationClosed.tsx */
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/HLVDJubO2B3FfLLBqS9KiU";
/** app/october/page.tsx */
export const QUERIES_PHONE = "9700744634";
export const DUPR_SIGNUP_URL = "https://dashboard.dupr.com/signup";
/** landing/LocationHours.tsx */
export const MAPS_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=17.391391,78.611158&destination_place_id=ChIJW8rKJbCfyzsRu4zLBYpLEoc";

/** Registration deadline: Sat 28 Nov 2026, 11:59 PM IST. */
export const CLOSES_AT = "2026-11-28T23:59:00+05:30";

/** Obviously fake values for the preview-only "fill sample data" helper. */
export const SAMPLE_VALUES = {
  name: "Sample Player",
  phone: "9876543210",
  email: "sample.player@example.com",
  duprId: "SAMPL1",
  rating: "3.45",
  pName: "Sample Partner",
  pDuprId: "SAMPL2",
  pRating: "3.20",
} as const;

export const rupees = (n: number): string => `₹${n.toLocaleString("en-IN")}`;
