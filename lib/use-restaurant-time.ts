"use client";

import { useSyncExternalStore } from "react";
import { getRestaurantTime, type RestaurantTime } from "./time";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  const now = getRestaurantTime();
  // Demo helper: ?day=5&hour=19 previews any day/time (0 = Sunday), handy when pitching.
  const params = new URLSearchParams(window.location.search);
  const day = Number(params.get("day") ?? now.weekday);
  const hour = Number(params.get("hour") ?? now.hour);
  const weekday = Number.isInteger(day) && day >= 0 && day <= 6 ? day : now.weekday;
  const safeHour = Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : now.hour;
  return `${weekday}:${safeHour}`;
}

function getServerSnapshot() {
  return null;
}

/**
 * Restaurant weekday/hour on the client. Returns null on the server and during hydration,
 * so the static HTML never mismatches; time-based highlights appear right after.
 */
export function useRestaurantTime(): RestaurantTime | null {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (snapshot === null) return null;
  const [weekday, hour] = snapshot.split(":").map(Number);
  return { weekday, hour };
}
