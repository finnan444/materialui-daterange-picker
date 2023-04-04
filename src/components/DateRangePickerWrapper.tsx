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

export type DateRangePickerWrapperProps = {
  open: boolean;
  onChange: (dateRange: DateRange) => void;
  onToggle?: () => void;
  initialDateRange?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  definedRanges?: DefinedRange[];
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
  /**
   * The date-fns locale object to localize the user interface.
   * @default 'enGB'
   */
  locale?: Locale;

  /**
   * PopoverProps applied to main Popover component
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
   * Show the outside days. An outside day is a day falling in the next or the previous month.
   * @default false
   */
  showOutsideDays?: boolean;

  /**
   * Display six weeks per months, regardless the month’s number of weeks.
   * @default false
   */
  fixedWeeks?: boolean;

  /** The index of the first day of the week (0 - Sunday).
   * @param {0|1|2|3|4|5|6}
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

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
