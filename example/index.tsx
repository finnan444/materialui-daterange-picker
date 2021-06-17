import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DateRangePickerExporter from '../src/components/DateRangePickerExporter';
import { DateRange } from '../src';

const App = () => {
  const toggle = () => {};

  const handleRangeSelect = (range: DateRange) => {
    if (range) {
      console.log(range);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7);

  return (
    <div>
      <DateRangePickerExporter
        open
        closeOnClickOutside={false}
        toggle={toggle}
        onChange={handleRangeSelect}
        // initialDateRange={defaultSelected}
        popoverProps={{
          elevation: 0,
        }}
        minDate={minDate}
        showOutsideDays
        fixedWeeks
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
