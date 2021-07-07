import * as React from 'react';
import classNames from 'classnames';
import { ClickAwayListener, makeStyles, PopoverProps } from '@material-ui/core';

import DateRangePicker from './DateRangePicker';

import { DateRange, DefinedRange } from '../types';
import { Locale } from 'date-fns';

const useStyles = makeStyles(() => ({
  dateRangePickerContainer: {
    position: 'relative',
  },
  dateRangePicker: {
    position: 'relative',
    zIndex: 1,
  },
}));

export interface DateRangePickerWrapperProps {
  open: boolean;
  onToggle?: () => void;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date;
  maxDate?: Date;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
  /**
   * The date-fns locale object to localize the user interface. Defaults to
   * `enGB`.
   */
  locale?: Locale;

  /**
   * popoverProps applied to main Popover component
   */
  popoverProps?: Partial<PopoverProps>;

  /**
   * Text for start toolbar placeholder.
   * @default 'Start'
   */
  startText?: React.ReactNode;

  /**
   * Text for end toolbar placeholder.
   * @default 'End'
   */
  endText?: React.ReactNode;

  /**
   * Show the outside days.  An outside day is a day falling in the next or the
   * previous month. Default is `false`.
   */
  showOutsideDays?: boolean;

  /**
   * Display six weeks per months, regardless the month’s number of weeks.
   * To use this prop, [[showOutsideDays]] must be set. Default to `false`.
   */
  fixedWeeks?: boolean;

  /** The index of the first day of the week (0 - Sunday)
   * @param {0|1|2|3|4|5|6}
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const DateRangePickerWrapper: React.FC<DateRangePickerWrapperProps> = props => {
  const classes = useStyles();

  const { closeOnClickOutside, wrapperClassName, onToggle } = props;

  const handleToggle = (): void => {
    if (closeOnClickOutside === false) {
      return;
    }

    if (onToggle) {
      onToggle();
    }
  };

  const wrapperClasses = classNames(classes.dateRangePicker, wrapperClassName);

  return (
    <ClickAwayListener onClickAway={handleToggle}>
      <div className={classes.dateRangePickerContainer}>
        <div className={wrapperClasses}>
          <DateRangePicker {...props} />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default DateRangePickerWrapper;
