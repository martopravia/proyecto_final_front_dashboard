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
    editProduct: (state, action) => {
      const product = state.items.find(
        (product) => product.id === action.payload.id
      );
      Object.assign(product, action.payload);
    },
  },
});

const { actions, reducer } = productsSlice;
export const { setProducts, editProduct } = actions;
export default reducer;
