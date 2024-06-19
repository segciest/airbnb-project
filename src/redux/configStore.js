import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slice/loadingSlice';
import searchSlice from './slice/searchSlice';

import userSlice from './slice/userSlice';

import listRoomSlice from './slice/listRoomSlice';
import userInfoSlice from './slice/userInfoSlice';
import userOrderRoomSlice from './slice/userOrderRoomSlice';
import orderedRoomSlice from './slice/orderedRoomSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    loadingSlice,
    searchSlice,

    userSlice,

    listRoomSlice,
    userInfoSlice,
    userOrderRoomSlice,
    orderedRoomSlice,
  },
});
