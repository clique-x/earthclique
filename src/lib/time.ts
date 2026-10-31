// Haridwar runs on IST (UTC+5:30), with no daylight saving.
const IST_OFFSET_MIN = 330;

/** Hours since midnight in Haridwar, as a float (0–24). */
export function haridwarHour(date = new Date()): number {
  if (typeof window !== "undefined") {
    const forced = new URLSearchParams(window.location.search).get("hour");
    if (forced !== null && !Number.isNaN(Number(forced))) return Number(forced);
  }
  const utcMin = date.getUTCHours() * 60 + date.getUTCMinutes() + date.getUTCSeconds() / 60;
  const local = (utcMin + IST_OFFSET_MIN) % (24 * 60);
  return local / 60;
}

/** Sun elevation for a given hour: -1 (midnight) to 1 (noon). Sunrise ~6, sunset ~18. */
export function sunElevation(hour: number): number {
  return Math.sin(((hour - 6) / 12) * Math.PI);
}

export function formatHour(hour: number): string {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function openStatus(hour: number, open: number, close: number): { open: boolean; line: string } {
  if (hour >= open && hour < close) {
    return { open: true, line: `Open now in SIDCUL, until ${close > 12 ? close - 12 : close} pm` };
  }
  return { open: false, line: `Closed now, opens at ${open} am` };
}
