"use client";

/**
 * DESIGN PREVIEW ONLY — tiny client islands used by the server-rendered
 * landing sections: category-aware CTA links, the "days left" hint and the
 * sticky mobile CTA (same pattern as SeasonStickyCta on /october).
 */
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

import { CLOSES_AT, type CategoryId } from "./data";
import { usePreview } from "./state";

export function CtaLink({
  category,
  className,
  children,
}: {
  category?: CategoryId | undefined;
  className: string;
  children: ReactNode;
}) {
  const { select } = usePreview();
  return (
    <a
      href="#register"
      onClick={() => {
        if (category) select(category);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

const noSubscribe = (): (() => void) => () => undefined;

function daysLeftText(): string | null {
  const ms = new Date(CLOSES_AT).getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.ceil(ms / 86_400_000);
  return days <= 1 ? "closes within a day" : `${days} days left`;
}

/** "12 days left" — null on the server, so server and client markup match. */
export function DaysLeft() {
  const text = useSyncExternalStore(noSubscribe, daysLeftText, () => null);
  return text ? <span className="font-semibold text-volt"> · {text}</span> : null;
}

/** Fixed bottom CTA on phones; hides while the registration section is on screen. */
export function StickyCta({ label }: { label: string }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("register");
    if (!target) return;
    const obs = new IntersectionObserver(
      (entries) => setHidden(entries.some((e) => e.isIntersecting)),
      { rootMargin: "0px 0px -15% 0px" },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      aria-hidden={hidden || undefined}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy-border bg-navy/95 px-4 pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      } pb-[calc(0.75rem+env(safe-area-inset-bottom))]`}
    >
      <a
        href="#register"
        tabIndex={hidden ? -1 : 0}
        className="block w-full rounded-xl bg-volt px-4 py-4 text-center font-display text-lg font-bold uppercase tracking-wide text-navy transition active:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {label}
      </a>
    </div>
  );
}
