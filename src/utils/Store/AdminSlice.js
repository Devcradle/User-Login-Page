import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminList: []
  },
  reducers: {
    getAdminlist: (state, action) => {
      state.adminList = action.payload;
    }
  }
});

export const { getAdminlist } = adminSlice.actions;
export default adminSlice.reducer;
