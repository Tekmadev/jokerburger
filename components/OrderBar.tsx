"use client";

import { site } from "@/data/site";
import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";
import { useScrolledPast } from "@/lib/use-scroll";
import { ArrowUpRight, PhoneIcon } from "./icons";
import { button } from "./ui";

/** Phone-only sticky "Commander / Appeler" bar, shown once the hero buttons scroll away. */
export function OrderBar({ t }: { t: Dictionary["orderBar"] }) {
  const visible = useScrolledPast((viewportHeight) => viewportHeight * 0.75);

  return (
    <div
      inert={!visible}
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/90 px-4 pt-3 backdrop-blur-xl transition-transform duration-300 ease-snap md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex gap-3">
        <a
          href={site.links.uberEats}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(button("primary", "md"), "flex-1")}
        >
          {t.order}
          <ArrowUpRight className="size-4" />
        </a>
        <a href={site.phone.href} className={button("secondary", "md")}>
          <PhoneIcon className="size-4" />
          {t.call}
        </a>
      </div>
    </div>
  );
}
