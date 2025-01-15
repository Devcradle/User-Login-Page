import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: []
  },
  reducers: {
    getUserlist: (state, action) => {
      state.userList = action.payload;
    }
  }
});

export const { getUserlist } = userSlice.actions;
export default userSlice.reducer;
