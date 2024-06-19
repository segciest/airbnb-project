import React from 'react';
import { DateRangePicker } from 'react-date-range';

const BookCalendar = ({ bookedRangeDates, setBookedRangeDates }) => {
  const options = {
    rangeColors: ['#FD5B61'],
    minDate: new Date(),
  };
  return (
    <DateRangePicker
      onChange={(item) => setBookedRangeDates([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={1}
      ranges={bookedRangeDates}
      direction="horizontal"
      className="p-6 flex lg:max-h-full lg:w-full sm:w-1/4 sm:h-1/4 overflow-auto"
      {...options}
    />
  );
};

export default BookCalendar;
