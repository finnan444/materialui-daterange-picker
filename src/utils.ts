import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isSameMonth,
  isValid,
  isWithinInterval,
  Locale,
  max,
  min,
  startOfMonth,
  startOfWeek,
  toDate,
} from 'date-fns';

import { DateRange } from './types';

export const identity = <T>(x: T): any => x;

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size)
  );

export const combine = (...args: any[]): string =>
  args.filter(identity).join(' ');

export const getDaysInMonth = (
  date: Date,
  locale: Locale,
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
): Date[] => {
  const startWeek = startOfWeek(startOfMonth(date), { locale, weekStartsOn });
  const endWeek = endOfWeek(endOfMonth(date), { locale, weekStartsOn });
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date): boolean =>
  (startDate && isSameDay(day, startDate)) as boolean;

export const isEndOfRange = ({ endDate }: DateRange, day: Date): boolean =>
  (endDate && isSameDay(day, endDate)) as boolean;

export const inDateRange = (
  { startDate, endDate }: DateRange,
  day: Date
): boolean =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, { start: startDate, end: endDate }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean;

export const isRangeSameDay = ({ startDate, endDate }: DateRange): boolean => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

type Falsy = false | null | undefined | 0 | '';

export const parseOptionalDate = (
  date: Date | Falsy,
  defaultValue: Date
): Date => {
  if (date) {
    const parsed = toDate(date);
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};

export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date
): [Date | undefined, Date | undefined] => {
  const { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  }
  return [startDate, endDate];
};
