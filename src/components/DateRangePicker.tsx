import * as React from 'react';
import {
  addMonths,
  addYears,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  Locale,
  max,
  min,
} from 'date-fns';

import { enGB } from 'date-fns/locale';

import { DateRange, DefinedRange, NavigationAction } from '../types';
import { getValidatedMonths, parseOptionalDate } from '../utils';

import { defaultRanges } from '../defaults';

import Menu, { Marker, MARKERS } from './Menu';
import { PopoverProps } from '@material-ui/core';

type DateRangePickerProps = {
  open: boolean;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  onChange: (dateRange: DateRange) => void;
  popoverProps?: Partial<PopoverProps>;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
};

const DateRangePicker: React.FC<DateRangePickerProps> = props => {
  const { locale } = props;

  const {
    open,
    onChange,
    initialDateRange,
    minDate,
    maxDate,
    definedRanges = defaultRanges(locale ?? enGB),
    popoverProps,
    weekStartsOn,
    showOutsideDays,
    fixedWeeks,
  } = props;

  const today = new Date();

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [initialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid
  );

  const [dateRange, setDateRange] = React.useState<DateRange>({
    ...initialDateRange,
  });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(
    initialFirstMonth || today
  );
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1)
  );

  const { startDate, endDate } = dateRange;

  // handlers
  const setFirstMonthValidated = (date: Date): void => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date): void => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const setDateRangeValidated = (range: DateRange): void => {
    let { startDate: newStart, endDate: newEnd } = range;

    if (newStart && newEnd) {
      range.startDate = newStart = max([newStart, minDateValid]);
      range.endDate = newEnd = min([newEnd, maxDateValid]);

      setDateRange(range);
      onChange(range);

      setFirstMonth(newStart);
      setSecondMonth(
        isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd
      );
    } else {
      const emptyRange = {};

      setDateRange(emptyRange);
      onChange(emptyRange);

      setFirstMonth(today);
      setSecondMonth(addMonths(firstMonth, 1));
    }
  };

  const onDayClick = (day: Date): void => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      const newRange = { startDate, endDate: day };
      onChange(newRange);
      setDateRange(newRange);
    } else {
      setDateRange({ startDate: day, endDate: undefined });
    }
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction): void => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date): void => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (day: Date): boolean =>
    (startDate &&
      !endDate &&
      hoverDay &&
      isAfter(hoverDay, startDate) &&
      isWithinInterval(day, {
        start: startDate,
        end: hoverDay,
      })) as boolean;

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  return open ? (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      ranges={definedRanges}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      locale={locale ?? enGB}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      setDateRange={setDateRangeValidated}
      helpers={helpers}
      handlers={handlers}
      popoverProps={popoverProps}
      weekStartsOn={weekStartsOn}
      showOutsideDays={showOutsideDays ?? false}
      fixedWeeks={fixedWeeks ?? false}
    />
  ) : null;
};

export default DateRangePicker;
