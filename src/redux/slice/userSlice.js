import { createSlice } from '@reduxjs/toolkit';
import { handleGetLocalStorage } from '../../utils/util';


const initialState = {
  user: handleGetLocalStorage('userData'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleGetValueUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { handleGetValueUserData } = userSlice.actions;

export default userSlice.reducer;
