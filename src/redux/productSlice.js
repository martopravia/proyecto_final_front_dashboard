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
    addProduct: (state, action) => {
      state.items.unshift(action.payload);
    },
    editProduct: (state, action) => {
      const product = state.items.find(
        (product) => product.id === action.payload.id
      );
      Object.assign(product, action.payload);
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = productsSlice;
export const { setProducts, addProduct, editProduct, deleteProduct } = actions;
export default reducer;
