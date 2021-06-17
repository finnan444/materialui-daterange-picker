import * as React from 'react';
import { StylesProvider } from '@material-ui/core/styles';

import DateRangePickerWrapper, {
  DateRangePickerWrapperProps,
} from './DateRangePickerWrapper';
import generateClassName from '../generateClassName';

const DateRangePickerExporter: React.FC<DateRangePickerWrapperProps> = props => (
  <StylesProvider generateClassName={generateClassName}>
    <DateRangePickerWrapper {...props} />
  </StylesProvider>
);

export default DateRangePickerExporter;
