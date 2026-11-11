/**
 * Weekly grid lookup in Asia/Tashkent (UTC+5, no DST).
 * Slots may cross midnight ("21:00 — 08:00") or cover a whole day
 * ("Весь день" / "Kun Bo'yi"). A timed slot wins over an all-day slot.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ScheduledShow {
    time: string;
    title: string;
    host: string;
    description?: string;
    genre?: string;
}

export type WeeklySchedule = Partial<Record<DayKey, ScheduledShow[]>>;

const TASHKENT_OFFSET_MS = 5 * 60 * 60 * 1000;
const MINUTES_PER_DAY = 24 * 60;

const WEEKDAYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export interface TimeRange {
    start: number;
    end: number;
    overnight: boolean;
    allDay: boolean;
}

export interface ZonedTime {
    year: number;
    month: number;
    day: number;
    minutes: number;
    weekday: DayKey;
}

export interface ShowSlot {
    show: ScheduledShow;
    /** Instant when this slot ends and the next one may begin. */
    endsAt: Date;
}

/** Build an absolute instant from a Tashkent civil date and time. */
export function dateInTashkent(
    year: number,
    month: number,
    day: number,
    hour = 0,
    minute = 0,
): Date {
    return new Date(Date.UTC(year, month - 1, day, hour, minute) - TASHKENT_OFFSET_MS);
}

export function zonedTashkent(date: Date): ZonedTime {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Tashkent",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short",
        hourCycle: "h23",
    }).formatToParts(date);

    const read = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((part) => part.type === type)?.value ?? "";

    let hour = Number(read("hour"));
    if (hour === 24) hour = 0;
    const minute = Number(read("minute"));
    const weekdayToken = read("weekday").slice(0, 3).toLowerCase();
    const weekday = WEEKDAYS.includes(weekdayToken as DayKey)
        ? (weekdayToken as DayKey)
        : "mon";

    return {
        year: Number(read("year")),
        month: Number(read("month")),
        day: Number(read("day")),
        minutes: hour * 60 + minute,
        weekday,
    };
}

/** Two clock times → a range. No clock times → an all-day slot. */
export function parseShowTime(time: string): TimeRange | null {
    const matches = [...time.matchAll(/(\d{1,2}):(\d{2})/g)];
    if (matches.length === 0) {
        return { start: 0, end: MINUTES_PER_DAY, overnight: false, allDay: true };
    }
    if (matches.length < 2) return null;

    const start = toMinutes(Number(matches[0][1]), Number(matches[0][2]));
    const end = toMinutes(Number(matches[1][1]), Number(matches[1][2]));
    if (start == null || end == null) return null;

    return {
        start,
        end,
        overnight: end <= start,
        allDay: false,
    };
}

export function findCurrentShow(schedule: WeeklySchedule, date: Date): ScheduledShow | null {
    return findCurrentSlot(schedule, date)?.show ?? null;
}

/**
 * The show that starts when the current one ends, or the next start
 * after a gap in the grid.
 */
export function findNextShow(schedule: WeeklySchedule, date: Date): ScheduledShow | null {
    const current = findCurrentSlot(schedule, date);
    if (current) {
        const following = findCurrentSlot(schedule, current.endsAt);
        if (following && following.show !== current.show) return following.show;
        return nextStartingAtOrAfter(schedule, current.endsAt);
    }
    return nextStartingAtOrAfter(schedule, date);
}

function findCurrentSlot(schedule: WeeklySchedule, date: Date): ShowSlot | null {
    const zone = zonedTashkent(date);
    const yesterday = addDays(zone.year, zone.month, zone.day, -1);
    const yesterdayKey = weekdayOf(yesterday.year, yesterday.month, yesterday.day);

    for (const show of schedule[yesterdayKey] ?? []) {
        const range = parseShowTime(show.time);
        if (!range || range.allDay || !range.overnight) continue;
        if (zone.minutes < range.end) {
            return {
                show,
                endsAt: atMinutes(zone.year, zone.month, zone.day, range.end),
            };
        }
    }

    let allDay: ScheduledShow | null = null;
    for (const show of schedule[zone.weekday] ?? []) {
        const range = parseShowTime(show.time);
        if (!range) continue;
        if (range.allDay) {
            allDay ??= show;
            continue;
        }
        if (!range.overnight && zone.minutes >= range.start && zone.minutes < range.end) {
            return {
                show,
                endsAt: atMinutes(zone.year, zone.month, zone.day, range.end),
            };
        }
        if (range.overnight && zone.minutes >= range.start) {
            return {
                show,
                endsAt: atMinutes(zone.year, zone.month, zone.day, range.end + MINUTES_PER_DAY),
            };
        }
    }

    if (allDay) {
        return {
            show: allDay,
            endsAt: atMinutes(zone.year, zone.month, zone.day, MINUTES_PER_DAY),
        };
    }
    return null;
}

function nextStartingAtOrAfter(schedule: WeeklySchedule, date: Date): ScheduledShow | null {
    const zone = zonedTashkent(date);
    let best: { at: number; show: ScheduledShow } | null = null;

    for (let offset = 0; offset < 8; offset++) {
        const cal = addDays(zone.year, zone.month, zone.day, offset);
        const key = weekdayOf(cal.year, cal.month, cal.day);
        for (const show of schedule[key] ?? []) {
            const range = parseShowTime(show.time);
            if (!range) continue;
            const startMinute = range.allDay ? 0 : range.start;
            const start = atMinutes(cal.year, cal.month, cal.day, startMinute);
            if (start.getTime() < date.getTime()) continue;
            if (!best || start.getTime() < best.at) {
                best = { at: start.getTime(), show };
            }
        }
    }

    return best?.show ?? null;
}

function toMinutes(hour: number, minute: number): number | null {
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    if (minute < 0 || minute > 59 || hour < 0 || hour > 24) return null;
    if (hour === 24) return minute === 0 ? MINUTES_PER_DAY : null;
    return hour * 60 + minute;
}

function atMinutes(year: number, month: number, day: number, minutes: number): Date {
    const extraDays = Math.floor(minutes / MINUTES_PER_DAY);
    const rest = minutes % MINUTES_PER_DAY;
    const cal = addDays(year, month, day, extraDays);
    return dateInTashkent(cal.year, cal.month, cal.day, Math.floor(rest / 60), rest % 60);
}

function addDays(year: number, month: number, day: number, offset: number) {
    const utc = new Date(Date.UTC(year, month - 1, day + offset));
    return {
        year: utc.getUTCFullYear(),
        month: utc.getUTCMonth() + 1,
        day: utc.getUTCDate(),
    };
}

function weekdayOf(year: number, month: number, day: number): DayKey {
    return WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
}
