"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

type Source = { src: string; type: string };

/**
 * Looping hero clip layered over the poster. It only starts downloading once the page has
 * finished loading (so it never competes with the poster for LCP) and is skipped entirely for
 * visitors who prefer reduced motion or have Data Saver on.
 */
export function HeroVideo({ sources }: { sources: Source[] }) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion || saveData) return;

    const start = () => setEnabled(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 250);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    // iOS needs the muted property set before play() for inline autoplay.
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={cx(
        "absolute inset-0 size-full object-cover object-[50%_15%] transition-opacity duration-1000",
        playing ? "opacity-100" : "opacity-0",
      )}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
