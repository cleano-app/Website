import { HebrewCalendar, flags, type Event } from "@hebcal/core";
import { PARSHOS, YOMIM_TOVIM, type Parsha } from "./content";

function noon(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
}

/** Diaspora calendar events in the 7 days from `day`. */
function weekEvents(day: Date): Event[] {
  const start = noon(day);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return HebrewCalendar.calendar({ start, end, il: false, sedrot: true });
}

/** The parsha read on the coming Shabbos (today, if today is Shabbos). */
export function hebcalParshaFor(today: Date): string | null {
  const ev = weekEvents(today).find((e) => e.getFlags() & flags.PARSHA_HASHAVUA) as
    | (Event & { parsha?: string[] })
    | undefined;
  return ev?.parsha?.join("-") ?? null;
}

/**
 * This week's parsha if we have it; otherwise the next one we have, so a
 * week without new sheets still opens on something coming up.
 */
export function defaultParsha(today = new Date()): Parsha {
  const day = noon(today);
  for (let week = 0; week < 52; week++) {
    const name = hebcalParshaFor(day);
    const found = PARSHOS.find((p) => p.hebcal === name);
    if (found) return found;
    day.setDate(day.getDate() + 7);
  }
  return PARSHOS[0];
}

/** A yom tov we have sheets for that falls in the coming 7 days. */
export function yomTovThisWeek(today = new Date()): Parsha | null {
  const descs = weekEvents(today).map((e) => e.getDesc());
  // "Purim Katan" (Adar I in a leap year) and "Pesach Sheni" are not the yom tov.
  const isIt = (d: string, key: string) => d.startsWith(key) && !/Katan|Sheni/.test(d);
  return YOMIM_TOVIM.find((y) => descs.some((d) => isIt(d, y.hebcal))) ?? null;
}
