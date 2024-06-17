import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userManagement } from '../../services/userManagement';

export const getUserInfoAsyncThunk = createAsyncThunk(
  'userManagement/getUserInfoAsyncThunk',
  async (idUser, thunkApi) => {
    const res = await userManagement.getUser(idUser);
    // trả về kết quả cần lưu trữ vào trong redux
    console.log(res);
    return res.data.content;
  }
);
const initialState = {
  userInfo: {},
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Thành công
    builder.addCase(getUserInfoAsyncThunk.fulfilled, (state, action) => {
      console.log(action);
      state.userInfo = action.payload;
    });
    // Thất bại
    builder.addCase(getUserInfoAsyncThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = userInfoSlice.actions;

export default userInfoSlice.reducer;
