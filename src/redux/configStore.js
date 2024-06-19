import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slice/loadingSlice';
import searchSlice from './slice/searchSlice';
import userSlice from './slice/userSlice';
export const store = configureStore({
  reducer: {
    loadingSlice,
    searchSlice,
    userSlice,
  },
});
