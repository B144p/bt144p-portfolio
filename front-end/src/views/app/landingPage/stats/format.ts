import { SITE_UTC_OFFSET_SECONDS } from "@/utils/date";

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Seconds → "142h 30m" */
export const formatHours = (totalSeconds: number): string => {
  const totalMinutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toLocaleString("en-US")}h ${minutes}m`;
};

export const formatPercent = (percent: number): string => `${percent.toFixed(1)}%`;

/** Unix seconds → "Jul 20, 2026" in the site's fixed +07:00 zone (see
 *  utils/date.ts), so server and browser agree and match the backend's days. */
export const formatDay = (unixSeconds: number): string => {
  const d = new Date((unixSeconds + SITE_UTC_OFFSET_SECONDS) * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};
