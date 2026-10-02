import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { JokerStar, SuitIcon } from "./icons";

export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-display uppercase tracking-wide transition duration-200 active:scale-[0.97] disabled:opacity-50",
  primary:
    "bg-joker text-white shadow-[0_12px_32px_-12px_rgb(225_29_46/0.9)] hover:bg-joker-light focus-visible:outline-cheese",
  secondary: "bg-cream/[0.06] text-cream ring-1 ring-inset ring-cream/25 backdrop-blur hover:bg-cream/[0.12] hover:ring-cream/50",
  cheese: "bg-cheese text-ink hover:bg-[#ffd25c]",
  lg: "px-7 py-4 text-lg",
  md: "px-5 py-3 text-base",
  sm: "px-4 py-2 text-sm",
};

export function button(variant: "primary" | "secondary" | "cheese", size: "lg" | "md" | "sm" = "md") {
  return cx(buttonStyles.base, buttonStyles[variant], buttonStyles[size]);
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em]", className)}>
      <SuitIcon suit="spade" className="size-3 shrink-0" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  center = false,
  onRed = false,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
  onRed?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", center && "mx-auto text-center", className)}>
      <Eyebrow className={cx(center && "justify-center", onRed ? "text-cream" : "text-cheese")}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-3 font-display text-[clamp(2.75rem,9vw,4.75rem)] uppercase leading-[0.92] tracking-tight text-balance"
      >
        {title}
      </h2>
      {lead && (
        <p className={cx("mt-4 text-base text-pretty sm:text-lg", onRed ? "text-cream/90" : "text-cream/70")}>{lead}</p>
      )}
    </div>
  );
}

/** "JOKER BURGER" wordmark with a tiny playing card. */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={cx("inline-flex items-center", lg ? "gap-4" : "gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cx(
          "relative grid shrink-0 -rotate-[8deg] place-items-center rounded-[5px] bg-cream text-joker shadow-[0_4px_12px_rgb(0_0_0/0.5)] ring-1 ring-black/10",
          lg ? "h-14 w-10 rounded-lg" : "h-8 w-[1.4rem]",
        )}
      >
        <span
          className={cx(
            "absolute font-display leading-none text-ink",
            lg ? "left-1.5 top-1 text-xs" : "left-[3px] top-[2px] text-[0.5rem]",
          )}
        >
          J
        </span>
        <JokerStar className={lg ? "size-6" : "size-3.5"} />
      </span>
      <span
        className={cx("font-display uppercase leading-none tracking-wide", lg ? "text-4xl sm:text-5xl" : "text-[1.35rem]")}
      >
        <span className="text-joker">Joker</span> Burger
      </span>
    </span>
  );
}

/** Vertical "JOKER" index found in the corner of a real joker card. Pass the display class (e.g. "flex"). */
export function JokerIndex({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cx("flex-col items-center font-display leading-[0.95]", className)}>
      {"JOKER".split("").map((letter, i) => (
        <span key={i}>{letter}</span>
      ))}
      <JokerStar className="mt-1 size-[0.9em] text-joker" />
    </span>
  );
}
