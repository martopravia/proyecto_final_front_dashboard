import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = userListSlice;
export const { setUsers, deleteUser } = actions;
export default reducer;
