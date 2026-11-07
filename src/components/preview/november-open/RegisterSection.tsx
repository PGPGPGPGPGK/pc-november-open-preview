"use client";

/**
 * DESIGN PREVIEW ONLY — registration section: category selector + form in one
 * place. On phones the form opens directly under the chosen card (flex `order`),
 * so picking a category and filling the form needs no extra navigation. From
 * `lg` up it becomes two columns: cards on the left, the form on the right.
 */
import { Container } from "@/components/ui/Container";

import { CategoryCard } from "./CategoryCard";
import { CATEGORY_ORDER, DUPR_CAP } from "./data";
import { EntryForm } from "./EntryForm";
import { usePreview } from "./state";
import { SuccessPanel } from "./SuccessPanel";

export function RegisterSection() {
  const { selected, view } = usePreview();
  const panelOrder = CATEGORY_ORDER.indexOf(selected) * 2 + 1;

  return (
    <section id="register" className="scroll-mt-4 border-b border-navy-border">
      <Container size="lg" className="py-14 md:py-20">
        <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-white text-balance md:text-6xl">
          Pick your category
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-grey-200">
          DUPR {DUPR_CAP} and below. Registration closes Saturday 28 November, 11:59 PM IST. Prices
          include GST.
        </p>

        <div className="mt-8 flex flex-col gap-4 lg:grid lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-x-10">
          {/* Phones: `contents` lets cards and form share one flex column, so the
              form can sit right under the chosen card. Desktop: a sticky column. */}
          <div className="contents lg:sticky lg:top-24 lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-3 lg:self-start">
            {CATEGORY_ORDER.map((id, i) => (
              <CategoryCard key={id} id={id} order={i * 2} />
            ))}
          </div>

          <div
            style={{ order: panelOrder }}
            className="rounded-2xl border border-navy-border bg-navy-mid p-5 sm:p-7 lg:col-start-2 lg:row-start-1"
          >
            {view.kind === "success" ? <SuccessPanel /> : <EntryForm />}
          </div>
        </div>
      </Container>
    </section>
  );
}
