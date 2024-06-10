import { createSlice } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';

const initialState = {
  locatedAt: '',
  dateRange: [
    {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 8),
      key: 'selection',
    },
  ],
  numPeople: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocatedAt: (state, action) => {
      state.locatedAt = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setNumPeople: (state, action) => {
      state.numPeople = action.payload;
    },
  },
});

export const { setLocatedAt, setDateRange, setNumPeople } = searchSlice.actions;

export default searchSlice.reducer;
