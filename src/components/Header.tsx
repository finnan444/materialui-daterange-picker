import {
  Grid,
  makeStyles,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { setMonth, getMonth, setYear, getYear, Locale } from 'date-fns';

type HeaderProps = {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale: Locale;
};

const Header: React.FC<HeaderProps> = props => {
  const {
    date,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
    locale,
  } = props;

  const handleMonthChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setDate(setMonth(date, parseInt(event.target.value as string)));
  };
  const handleYearChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setDate(setYear(date, parseInt(event.target.value as string)));
  };

  // TODO any type
  const monthSelectRef = React.createRef<any>();
  const yearSelectRef = React.createRef<any>();

  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ container: monthSelectRef.current }}
          ref={monthSelectRef}
        >
          {generateMonths(locale).map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ container: yearSelectRef.current }}
          ref={yearSelectRef}
        >
          {generateYears(date).map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const YEAR_COUNT = 30;

const generateYears = (relativeTo: Date) => {
  const half = Math.floor(YEAR_COUNT / 2);
  return Array(YEAR_COUNT)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const generateMonths = (locale: Locale) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(locale.localize?.month(i, { width: 'abbreviated' }));
  }

  return months;
};

const useStyles = makeStyles(() => ({
  iconContainer: {
    padding: 5,
  },
  icon: {
    padding: 10,
    '&:hover': {
      background: 'none',
    },
  },
}));

export default Header;
