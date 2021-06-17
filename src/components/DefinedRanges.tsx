import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { isSameDay } from 'date-fns';

import { DefinedRange, DateRange } from '../types';

type DefinedRangesProps = {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
};

const isSameRange = (first: DateRange, second: DateRange): boolean => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FC<DefinedRangesProps> = props => {
  const { ranges, setRange, selectedRange } = props;
  return (
    <List>
      {ranges.map((range, idx) => (
        <ListItem button key={idx} onClick={() => setRange(range)}>
          <ListItemText
            primaryTypographyProps={{
              variant: 'body2',
              style: {
                fontWeight: isSameRange(range, selectedRange)
                  ? 'bold'
                  : 'normal',
              },
            }}
          >
            {range.label}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default DefinedRanges;
