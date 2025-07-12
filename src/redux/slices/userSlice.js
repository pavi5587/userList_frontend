import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
  },
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },
    userFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userStart, userSuccess, userFailure } = userSlice.actions;

export default userSlice.reducer;
