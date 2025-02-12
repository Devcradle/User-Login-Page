import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: []
  },
  reducers: {
    getUserlist: (state, action) => {
      state.userList = action.payload;
    },

    updateUserlist: (state, action) => {
      const { name, designation, department, image, userId } = action.payload;
      const userData = state.userList;

      const updatedUserData = userData.map((item) =>
        item._id === userId
          ? { ...item, name, designation, department, image }
          : item
      );
      state.userList = updatedUserData;
    }
  }
});

export const { getUserlist, updateUserlist } = userSlice.actions;
export default userSlice.reducer;
