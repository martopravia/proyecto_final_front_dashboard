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
  },
});

const { actions, reducer } = userListSlice;
export const { setUsers } = actions;
export default reducer;
