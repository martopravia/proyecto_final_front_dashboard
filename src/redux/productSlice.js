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
    productsRequested(state) {
      state.loading = true;
      state.error = null;
    },
    productsReceived(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.lastFetched = Date.now();
    },
    productsRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetProductsLastFetched(state) {
      state.lastFetched = 0;
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
export const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  resetProductsLastFetched,
  addProduct,
  editProduct,
  deleteProduct,
} = actions;
export default reducer;
