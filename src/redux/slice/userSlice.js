import { createSlice } from '@reduxjs/toolkit';
import { handleGetLocalStorage } from '../../utils/util';

const initialState = {
  user: handleGetLocalStorage('userData'),
  token: handleGetLocalStorage('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleGetValueUserData: (state, action) => {
      state.user = action.payload;
    },
    handleGetValueUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { handleGetValueUserData, handleGetValueUserToken } =
  userSlice.actions;

export default userSlice.reducer;
