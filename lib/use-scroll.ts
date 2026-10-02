"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** True once the page is scrolled further than `offset(viewportHeight)` pixels. Always false on the server. */
export function useScrolledPast(offset: (viewportHeight: number) => number) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset(window.innerHeight),
    () => false,
  );
}
