import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

const { actions, reducer } = productsSlice;
export const { setProducts } = actions;
export default reducer;
