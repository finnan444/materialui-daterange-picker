import * as React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import {
  addDays,
  format,
  getDate,
  isSameMonth,
  isToday,
  isWithinInterval,
  Locale,
  startOfWeek,
} from 'date-fns';
import {
  chunks,
  getDaysInMonth,
  inDateRange,
  isEndOfRange,
  isRangeSameDay,
  isStartOfRange,
} from '../utils';
import Header from './Header';
import Day from './Day';

import { DateRange, NavigationAction } from '../types';

const daysInWeek = 7;

const useStyles = makeStyles(() => ({
  root: {
    width: 290,
  },
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  daysContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20,
  },
}));

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  locale: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays: boolean;
  fixedWeeks: boolean;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

export const Month: React.FC<MonthProps> = props => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    locale,
    setValue: setDate,
    minDate,
    maxDate,
    navState,
    weekStartsOn,
    showOutsideDays,
    fixedWeeks,
  } = props;

  const [back, forward] = navState;

  const weeks = chunks(getDaysInMonth(date, locale, weekStartsOn), daysInWeek);

  const classes = useStyles();

  return (
    <Paper square elevation={0} className={classes.root}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Next)
          }
          locale={locale}
        />

        <WeekDayNames locale={locale} date={date} weekStartsOn={weekStartsOn} />

        <Grid
          item
          container
          direction="column"
          justify="space-between"
          className={classes.daysContainer}
        >
          {weeks.map((week, idx) => (
            <Grid key={idx} container direction="row" justify="center">
              {week.map(day => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, 'MM-dd-yyyy')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day) ||
                      !isWithinInterval(day, { start: minDate, end: maxDate })
                    }
                    hidden={!showOutsideDays && !isSameMonth(date, day)}
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
          {fixedWeeks &&
            additionalWeeks(weeks.length).map(week => (
              <Grid
                key={randomDate(
                  new Date(2001, 0, 1),
                  new Date(2015, 0, 1)
                ).getTime()}
                container
                direction="row"
                justify="center"
              >
                {week.map(day => {
                  return (
                    <Day
                      key={format(day, 'MM-dd-yyyy')}
                      disabled
                      hidden
                      value={getDate(day)}
                    />
                  );
                })}
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const additionalWeeks = (weeksLength: number): Date[][] => {
  const newWeeks: Date[][] = [];
  const maxWeeksInMonth = 6;
  const diff = maxWeeksInMonth - weeksLength;

  if (diff === 0) {
    return newWeeks;
  }

  for (let i = 0; i < diff; i++) {
    const week: Date[] = [];
    for (let i = 0; i < daysInWeek; i++) {
      const date = randomDate(new Date(2001, 0, 1), new Date(2015, 0, 1));
      week.push(date);
    }

    newWeeks.push(week);
  }

  return newWeeks;
};

type WeekDayNamesProps = {
  locale: Locale;
  date: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const WeekDayNames: React.FC<WeekDayNamesProps> = props => {
  const { locale, date, weekStartsOn } = props;

  const firstDateOfWeek = startOfWeek(date, {
    locale: locale,
    weekStartsOn: weekStartsOn,
  });
  const shortWeekDaysArray = Array.from(Array(7)).map((_e, i) =>
    format(addDays(firstDateOfWeek, i), 'EEEEEE')
  );

  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="row"
      justify="space-between"
      className={classes.weekDaysContainer}
    >
      {shortWeekDaysArray.map(day => (
        <Typography key={day} color="textSecondary" variant="caption">
          {day}
        </Typography>
      ))}
    </Grid>
  );
};
