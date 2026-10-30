import { HebrewCalendar, flags, type Event } from "@hebcal/core";
import { PARSHOS, type Parsha } from "./content";

/** The parsha read on the coming Shabbos (today, if today is Shabbos). Diaspora reading. */
export function hebcalParshaFor(today: Date): string | null {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const ev = HebrewCalendar.calendar({ start, end, il: false, sedrot: true, noHolidays: true }).find(
    (e: Event) => e.getFlags() & flags.PARSHA_HASHAVUA,
  ) as (Event & { parsha?: string[] }) | undefined;
  return ev?.parsha?.join("-") ?? null;
}

/** This week's parsha if we have it, else the first one we have. */
export function defaultParsha(today = new Date()): Parsha {
  const name = hebcalParshaFor(today);
  return PARSHOS.find((p) => p.hebcal === name) ?? PARSHOS[0];
}
