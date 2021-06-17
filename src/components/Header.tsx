import {
  Grid,
  makeStyles,
  IconButton,
  Select,
  MenuItem,
  RootRef,
} from '@material-ui/core';
import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { setMonth, getMonth, setYear, getYear, Locale } from 'date-fns';

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

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale: Locale;
}

const generateYears = (relativeTo: Date, count: number): number[] => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
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

  const generateMonths = (): any[] => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(locale.localize?.month(i, { width: 'abbreviated' }));
    }

    return months;
  };

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

  const domRef = React.createRef();

  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center">
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
        <RootRef rootRef={domRef}>
          <Select
            value={getMonth(date)}
            onChange={handleMonthChange}
            // MenuProps={{ disablePortal: true }}
            MenuProps={{ container: domRef.current }}
          >
            {generateMonths().map((month, idx) => (
              <MenuItem key={month} value={idx}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </RootRef>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map(year => (
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

export default Header;
