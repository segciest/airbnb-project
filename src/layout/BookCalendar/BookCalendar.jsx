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
      className="p-6 flex max-h-[calc(100vh-250px)] sm:w-[300px] overflow-auto"
      {...options}
    />
  );
};

export default BookCalendar;
