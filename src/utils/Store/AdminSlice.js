import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminList: []
  },
  reducers: {
    getAdminlist: (state, action) => {
      state.adminList = action.payload;
    },

    updateAdminlist: (state, action) => {
      state.adminList = action.payload;
    }
  }
});

export const { getAdminlist, updateAdminlist } = adminSlice.actions;
export default adminSlice.reducer;
