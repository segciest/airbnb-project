import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userManagement } from '../../services/userManagement';

export const getUserOrderDetailAsyncThunk = createAsyncThunk(
  'userManagement/getUserOrderDetailAsyncThunk',
  async (maPhong, thunkApi) => {
    const res = await userManagement.getOrderRoomDetail(maPhong);
    // trả về kết quả cần lưu trữ vào trong redux
    console.log(res);
    return res.data.content;
  }
);
const initialState = {
  orderedRoom: {},
};

const orderedRoomSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Thành công
    builder.addCase(getUserOrderDetailAsyncThunk.fulfilled, (state, action) => {
      console.log(action);
      state.orderedRoom = action.payload;
    });
    // Thất bại
    builder.addCase(getUserOrderDetailAsyncThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = orderedRoomSlice.actions;

export default orderedRoomSlice.reducer;
