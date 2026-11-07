/**
 * Layout container — mirrors how the production @pc/ui Container actually renders.
 * Its `sm:px-8 lg:px-12` classes are never generated on the live marketing site (Tailwind
 * doesn't scan packages/ui there), so production gutters are 24px at every width.
 * Kept at 24px here so the approved layout is the one that would ship.
 */
import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
};

const SIZE_CLASS: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  size = "lg",
  className,
  children,
  ...rest
}: ContainerProps): ReactElement {
  return (
    <div
      className={["mx-auto w-full px-6", SIZE_CLASS[size], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
