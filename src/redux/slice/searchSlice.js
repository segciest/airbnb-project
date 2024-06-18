import { createSlice } from '@reduxjs/toolkit';
import { addDays, formatISO, parseISO } from 'date-fns';

const initialState = {
  locatedAt: '',
  dateRange: [
    {
      startDate: formatISO(addDays(new Date(), 1)),
      endDate: formatISO(addDays(new Date(), 8)),
      key: 'selection',
    },
  ],
  numPeople: 1,
  location: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocatedAt: (state, action) => {
      state.locatedAt = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload.map((range) => ({
        ...range,
        startDate: range.startDate,
        endDate: range.endDate,
      }));
    },
    setNumPeople: (state, action) => {
      state.numPeople = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocatedAt, setDateRange, setNumPeople, setLocation } =
  searchSlice.actions;

export default searchSlice.reducer;
