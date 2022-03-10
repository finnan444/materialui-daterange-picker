# Material UI DateRange Picker

A react date range picker implementation using @material-ui v4 and date-fns.

<a href='https://www.npmjs.com/package/@finnan444/material-ui-daterange-picker'>
    <img src='https://img.shields.io/npm/v/@finnan444/material-ui-daterange-picker.svg' alt='Latest npm version'>
</a>

## Preview

![Screenshot](/screenshot.png?raw=true "Screenshot")

## Usage

```bash
npm i @finnan444/material-ui-daterange-picker

# or with yarn
yarn add @finnan444/material-ui-daterange-picker
```

## Basic example
See also **example** directory. You can run it using `npm run start` command.

```tsx
import React from "react";
import { DateRangePicker, DateRange } from '@finnan444/material-ui-daterange-picker';

type Props = {}

const App: React.FC<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={open}
      onToggle={toggle}
      onChange={(range) => setDateRange(range)}
      showOutsideDays
      fixedWeeks
    />
  );
}

export default App;
```

## Types
```ts
export interface DateRange {
    startDate?: Date;
    endDate?: Date;
}

export type DefinedRange = {
    startDate: Date;
    endDate: Date;
    label: string;
};
```

## Props

| Name                  | Type                    | Required   | Default value     | Description                                                                               |
|:----------------------|:------------------------|:-----------|:------------------|:------------------------------------------------------------------------------------------|
| `onChange`            | `(DateRange) => void`   | _required_ | -                 | Handler function for providing selected date range.                                       |
| `onToggle`            | `() => void`            | _optional_ | -                 | Handler function to show / hide the DateRangePicker.                                      |
| `initialDateRange`    | `DateRange`             | _optional_ | `{}`              | Initially selected date range.                                                            |
| `minDate`             | `Date`                  | _optional_ | 10 years ago      | Min date allowed in range.                                                                |
| `maxDate`             | `Date`                  | _optional_ | 10 years from now | Max date allowed in range.                                                                |
| `definedRanges`       | `DefinedRange[]`        | _optional_ | -                 | Custom defined ranges to show in the list.                                                |
| `closeOnClickOutside` | `boolean`               | _optional_ | `true`            | Defines if DateRangePicker will be closed when clicking outside of it.                    |
| `wrapperClassName`    | `object`                | _optional_ | `undefined`       | Defines additional wrapper style classes.                                                 |
| `locale`              | `Locale`                | _optional_ | enGB              | The locale for date calculation.                                                          |
| `popoverProps`        | `Partial<PopoverProps>` | _optional_ | -                 | PopoverProps applied to main Popover component.                                           |
| `startText`           | `React.ReactNode`       | _optional_ | Start             | Text for start toolbar placeholder.                                                       |
| `endText`             | `React.ReactNode`       | _optional_ | End               | Text for end toolbar placeholder.                                                         |
| `showOutsideDays`     | `boolean`               | _optional_ | `false`           | Show the outside days. An outside day is a day falling in the next or the previous month. |
| `fixedWeeks`          | `boolean`               | _optional_ | `false`           | Display six weeks per months, regardless the month’s number of weeks.                     |
| `weekStartsOn`        | `Union`                 | _optional_ | [0,1,2,3,4,5,6]   | The index of the first day of the week (0 - Sunday).                                      |

## Development
[TSDX](https://tsdx.io/) is used to publish this package.