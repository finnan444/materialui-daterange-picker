import * as React from 'react';
import classNames from 'classnames';
import { makeStyles, PopoverProps } from '@material-ui/core';

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
  dateRangeBackdrop: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    bottom: 0,
    zIndex: 0,
    right: 0,
    left: 0,
    top: 0,
  },
}));

export interface DateRangePickerWrapperProps {
  open: boolean;
  toggle: () => void;
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
}

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps
) => {
  const classes = useStyles();

  const { closeOnClickOutside, wrapperClassName, toggle, open } = props;

  const handleToggle = () => {
    if (closeOnClickOutside === false) {
      return;
    }

    toggle();
  };

  const handleKeyPress = (event: any) =>
    event?.key === 'Escape' && handleToggle();

  const wrapperClasses = classNames(classes.dateRangePicker, wrapperClassName);

  return (
    <div className={classes.dateRangePickerContainer}>
      {open && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={classes.dateRangeBackdrop}
          onKeyPress={handleKeyPress}
          onClick={handleToggle}
        />
      )}

      <div className={wrapperClasses}>
        <DateRangePicker {...props} />
      </div>
    </div>
  );
};

export default DateRangePickerWrapper;
