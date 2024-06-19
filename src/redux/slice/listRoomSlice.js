import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { room } from '../../services/room';

export const getRoomAsyncThunk = createAsyncThunk(
  'room/getRoomAsyncThunk',
  async (maViTri, thunkApi) => {
    const res = await room.getRoom(maViTri);
    // trả về kết quả cần lưu trữ vào trong redux
    // console.log(res);
    return res.data.content;
  }
);
const initialState = {
  arrRoom: [],
};

const listRoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Thành công
    builder.addCase(getRoomAsyncThunk.fulfilled, (state, action) => {
      console.log(action);
      state.arrRoom = action.payload;
    });
    // Thất bại
    builder.addCase(getRoomAsyncThunk.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const {} = listRoomSlice.actions;

export default listRoomSlice.reducer;
