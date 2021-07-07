import React from 'react';
import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  PopoverProps,
  Theme,
  Typography,
} from '@material-ui/core';
import { differenceInCalendarMonths, format, Locale } from 'date-fns';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { Month } from './Month';
import DefinedRanges from './DefinedRanges';
import { DateRange, DefinedRange, NavigationAction, Setter } from '../types';

export type Marker = symbol;
export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: '20px 70px',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    marginBottom: 20,
  },
}));

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  locale: Locale;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  popoverProps?: Partial<PopoverProps>;
  startText?: React.ReactNode;
  endText?: React.ReactNode;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays: boolean;
  fixedWeeks: boolean;
}

const Menu: React.FC<MenuProps> = props => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    locale,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    popoverProps,
    startText,
    endText,
    weekStartsOn,
    showOutsideDays,
    fixedWeeks,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser =
    differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };

  // TODO
  const headerDateFormat = 'MMMM dd, yyyy';

  const classes = useStyles();

  return (
    <Paper {...popoverProps}>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <Grid container className={classes.header} alignItems="center">
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {startDate
                  ? format(startDate, headerDateFormat)
                  : startText ?? 'Start'}
              </Typography>
            </Grid>
            <Grid item className={classes.headerItem}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item className={classes.headerItem}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, headerDateFormat) : endText ?? 'End'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justify="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              locale={locale}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              weekStartsOn={weekStartsOn}
              showOutsideDays={showOutsideDays}
              fixedWeeks={fixedWeeks}
            />
            <div className={classes.divider} />
            <Month
              {...commonProps}
              value={secondMonth}
              locale={locale}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              weekStartsOn={weekStartsOn}
              showOutsideDays={showOutsideDays}
              fixedWeeks={fixedWeeks}
            />
          </Grid>
        </Grid>
        <div className={classes.divider} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
