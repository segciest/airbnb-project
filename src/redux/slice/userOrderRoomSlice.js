import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userManagement } from '../../services/userManagement';

export const getUserOrderAsyncThunk = createAsyncThunk(
  'userManagement/getUserOrderAsyncThunk',
  async (maNguoiDung, thunkApi) => {
    const res = await userManagement.getOrderRoom(maNguoiDung);
    // trả về kết quả cần lưu trữ vào trong redux
    console.log(res);
    return res.data.content;
  }
);
const initialState = {
  userOrder: [],
};

const userOrderRoomSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Thành công
    builder.addCase(getUserOrderAsyncThunk.fulfilled, (state, action) => {
      console.log(action);
      state.userOrder = action.payload;
    });
    // Thất bại
    builder.addCase(getUserOrderAsyncThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = userOrderRoomSlice.actions;

export default userOrderRoomSlice.reducer;
