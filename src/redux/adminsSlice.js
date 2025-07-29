import { createSlice } from "@reduxjs/toolkit";

const adminsSlice = createSlice({
  name: "admins",
  initialState: [],
  reducers: {
    setAdmins: (state, action) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = adminsSlice;
export const { setAdmins } = actions;
export default reducer;
