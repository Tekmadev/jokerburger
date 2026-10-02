import { site } from "@/data/site";

export type RestaurantTime = {
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
  /** 0–23 */
  hour: number;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timeZone,
  weekday: "short",
  hour: "numeric",
  hourCycle: "h23",
});

/** Weekday and hour at the restaurant (Montreal), whatever the visitor's own time zone. */
export function getRestaurantTime(date = new Date()): RestaurantTime {
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    weekday: WEEKDAYS.indexOf(parts.weekday),
    hour: Number(parts.hour) % 24,
  };
}

export function isOpenAt({ hour }: RestaurantTime) {
  return hour >= site.hours.open && hour < site.hours.close;
}
