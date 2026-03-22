import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfterPlugin from "dayjs/plugin/isSameOrAfter";
import isSameOrBeforePlugin from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBeforePlugin);
dayjs.extend(isSameOrAfterPlugin);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

// Format date
export function formatDate(
  date: Date | string | number,
  format: string = "YYYY-MM-DD HH:mm:ss",
): string {
  return dayjs(date).format(format);
}

// Parse date
export function parseDate(date: string, format?: string): Dayjs {
  return format ? dayjs(date, format) : dayjs(date);
}

// Add days/months/years
export function addDate(
  date: Date | string | number,
  value: number,
  unit: dayjs.ManipulateType,
): Dayjs {
  return dayjs(date).add(value, unit);
}

// Subtract days/months/years
export function subtractDate(
  date: Date | string | number,
  value: number,
  unit: dayjs.ManipulateType,
): Dayjs {
  return dayjs(date).subtract(value, unit);
}

// Compare dates
export function isBefore(
  date: Date | string | number,
  compare: Date | string | number,
): boolean {
  return dayjs(date).isBefore(dayjs(compare));
}
export function isAfter(
  date: Date | string | number,
  compare: Date | string | number,
): boolean {
  return dayjs(date).isAfter(dayjs(compare));
}
export function isSame(
  date: Date | string | number,
  compare: Date | string | number,
  unit?: dayjs.UnitType,
): boolean {
  return dayjs(date).isSame(dayjs(compare), unit);
}
export function isSameOrBefore(
  date: Date | string | number,
  compare: Date | string | number,
  unit?: dayjs.UnitType,
): boolean {
  return dayjs(date).isSameOrBefore(dayjs(compare), unit);
}
export function isSameOrAfter(
  date: Date | string | number,
  compare: Date | string | number,
  unit?: dayjs.UnitType,
): boolean {
  return dayjs(date).isSameOrAfter(dayjs(compare), unit);
}

// Start/end of day/week/month/year
export function startOf(
  date: Date | string | number,
  unit: dayjs.UnitType,
): Dayjs {
  return dayjs(date).startOf(unit);
}
export function endOf(
  date: Date | string | number,
  unit: dayjs.UnitType,
): Dayjs {
  return dayjs(date).endOf(unit);
}

// Get week of year
export function getWeek(date: Date | string | number): number {
  return dayjs(date).week();
}

// Get dayjs instance
export function dayjsInstance(date?: Date | string | number): Dayjs {
  return date ? dayjs(date) : dayjs();
}

// Convert to UTC
export function toUTC(date: Date | string | number): Dayjs {
  return dayjs(date).utc();
}

// Convert to timezone
export function toTimezone(date: Date | string | number, tz: string): Dayjs {
  return dayjs(date).tz(tz);
}

// Get current date/time
export function now(): Dayjs {
  return dayjs();
}

// Get human-readable 'time ago' string
export function timeAgo(date: Date | string | number): string {
  return dayjs(date).fromNow();
}
