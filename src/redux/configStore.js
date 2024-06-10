import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slice/loadingSlice';
import searchSlice from './slice/searchSlice';
export const store = configureStore({
  reducer: {
    loadingSlice,
    searchSlice,
  },
});
