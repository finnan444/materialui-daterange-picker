import { Button, Card, CardActions } from '@material-ui/core';
import { DateRange } from '../../../src';
import DateRangePickerWrapper from '../../../src/components/DateRangePickerWrapper';
import React from 'react';

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
    <Card>
      <DateRangePickerWrapper
        open
        onToggle={onClose}
        closeOnClickOutside
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
  );
};
