/* eslint-disable import/prefer-default-export */

import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  Locale,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

// eslint-disable-next-line no-unused-vars
import { DefinedRange } from './types';

const getDefaultRanges = (date: Date, locale: Locale): DefinedRange[] => [
  {
    label: 'Today',
    startDate: date,
    endDate: date,
  },
  {
    label: 'Yesterday',
    startDate: addDays(date, -1),
    endDate: addDays(date, -1),
  },
  {
    label: 'This Week',
    startDate: startOfWeek(date, { locale }),
    endDate: endOfWeek(date, { locale }),
  },
  {
    label: 'Last Week',
    startDate: startOfWeek(addWeeks(date, -1), { locale }),
    endDate: endOfWeek(addWeeks(date, -1), { locale }),
  },
  {
    label: 'Last 7 Days',
    startDate: addWeeks(date, -1),
    endDate: date,
  },
  {
    label: 'This Month',
    startDate: startOfMonth(date),
    endDate: endOfMonth(date),
  },
  {
    label: 'Last Month',
    startDate: startOfMonth(addMonths(date, -1)),
    endDate: endOfMonth(addMonths(date, -1)),
  },
];

export function defaultRanges(locale: Locale) {
  return getDefaultRanges(new Date(), locale);
}
