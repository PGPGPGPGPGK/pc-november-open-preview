"use client";

/**
 * DESIGN PREVIEW ONLY — shared UI state for the mock (selected category,
 * illustrative capacity, which screen is showing). In-memory; nothing is sent
 * or stored anywhere.
 *
 * Reviewers can deep-link a state with query params, e.g.
 *   ?cat=partner
 *   ?cat=singles&singles=full
 *   ?view=paid-doubles | partner-received | waitlist-singles | waitlist-doubles
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Capacity, CategoryId, PaidCategoryId } from "./data";

export type SuccessKind = "paid" | "partner" | "waitlist";
export type View = { kind: "form" } | { kind: "success"; success: SuccessKind; category: CategoryId };

export type Entry = {
  name: string;
  partnerName: string;
  /** True when the details are canned sample values (preview jump), not typed in. */
  sample: boolean;
};

const SAMPLE_ENTRY: Entry = { name: "Sample Player", partnerName: "Sample Partner", sample: true };

type Ctx = {
  selected: CategoryId;
  capacity: Record<PaidCategoryId, Capacity>;
  view: View;
  entry: Entry;
  payFailed: boolean;
  select: (id: CategoryId) => void;
  setCapacity: (id: PaidCategoryId, c: Capacity) => void;
  showSuccess: (success: SuccessKind, category: CategoryId, entry?: Entry) => void;
  setPayFailed: (v: boolean) => void;
  backToForm: () => void;
  reset: () => void;
};

const PreviewContext = createContext<Ctx | null>(null);
const noSubscribe = (): (() => void) => () => undefined;

const CAPS: Capacity[] = ["open", "low", "full"];
const isCapacity = (v: string | null): v is Capacity => v !== null && CAPS.includes(v as Capacity);
const isCategory = (v: string | null): v is CategoryId =>
  v === "singles" || v === "doubles" || v === "partner";

const INITIAL_CAPACITY: Record<PaidCategoryId, Capacity> = { singles: "open", doubles: "open" };

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<CategoryId>("doubles");
  const [capacity, setCapacityState] = useState(INITIAL_CAPACITY);
  const [view, setView] = useState<View>({ kind: "form" });
  const [entry, setEntry] = useState<Entry>(SAMPLE_ENTRY);
  const [payFailed, setPayFailed] = useState(false);

  // Deep-link a state from the query string. The search string is read through
  // useSyncExternalStore ("" on the server), and applied once per change.
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => "");
  const [appliedSearch, setAppliedSearch] = useState("");
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const q = new URLSearchParams(search);
    const cat = q.get("cat");
    const s = q.get("singles");
    const d = q.get("doubles");
    const v = q.get("view");
    if (isCategory(cat)) setSelected(cat);
    setCapacityState({
      singles: isCapacity(s) ? s : "open",
      doubles: isCapacity(d) ? d : "open",
    });
    if (v === "paid-singles") setView({ kind: "success", success: "paid", category: "singles" });
    else if (v === "paid-doubles") setView({ kind: "success", success: "paid", category: "doubles" });
    else if (v === "partner-received")
      setView({ kind: "success", success: "partner", category: "partner" });
    else if (v === "waitlist-singles")
      setView({ kind: "success", success: "waitlist", category: "singles" });
    else if (v === "waitlist-doubles")
      setView({ kind: "success", success: "waitlist", category: "doubles" });
  }

  const select = useCallback((id: CategoryId) => {
    setSelected(id);
    setView({ kind: "form" });
    setPayFailed(false);
  }, []);

  const setCapacity = useCallback((id: PaidCategoryId, c: Capacity) => {
    setCapacityState((prev) => ({ ...prev, [id]: c }));
    setView({ kind: "form" });
  }, []);

  const showSuccess = useCallback((success: SuccessKind, category: CategoryId, e?: Entry) => {
    setEntry(e ?? SAMPLE_ENTRY);
    setSelected(category);
    setPayFailed(false);
    setView({ kind: "success", success, category });
  }, []);

  const backToForm = useCallback(() => {
    setView({ kind: "form" });
    setPayFailed(false);
  }, []);

  const reset = useCallback(() => {
    setSelected("doubles");
    setCapacityState(INITIAL_CAPACITY);
    setView({ kind: "form" });
    setEntry(SAMPLE_ENTRY);
    setPayFailed(false);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      selected,
      capacity,
      view,
      entry,
      payFailed,
      select,
      setCapacity,
      showSuccess,
      setPayFailed,
      backToForm,
      reset,
    }),
    [selected, capacity, view, entry, payFailed, select, setCapacity, showSuccess, backToForm, reset],
  );

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>;
}

export function usePreview(): Ctx {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error("usePreview must be used inside <PreviewProvider>");
  return ctx;
}
