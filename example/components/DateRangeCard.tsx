import {
  Button,
  Card,
  CardActions,
  ClickAwayListener,
} from '@material-ui/core';
import * as React from 'react';
import { DateRange } from '../../src';
import DateRangePickerWrapper from '../../src/components/DateRangePickerWrapper';

type DateRangeCardProps = {
  onClose: () => void;
};

export const DateRangeCard: React.FC<DateRangeCardProps> = ({ onClose }) => {
  const handleRangeSelect = (range: DateRange): void => {
    if (range) {
      console.log(range);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Card>
        <DateRangePickerWrapper
          open
          closeOnClickOutside={false}
          onChange={handleRangeSelect}
          popoverProps={{
            elevation: 0,
          }}
          minDate={minDate}
          showOutsideDays
          fixedWeeks
        />
        <CardActions>
          <div style={{ flexGrow: 1 }} />
          <Button autoFocus size="small" variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" onClick={() => console.log('Apply')}>
            Apply
          </Button>
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
};
