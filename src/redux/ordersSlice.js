import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: 0,
  },
  reducers: {
    ordersRequested(state) {
      state.loading = true;
      state.error = null;
    },
    ordersReceived(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.lastFetched = Date.now();
    },
    ordersRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetCategoriesLastFetched(state) {
      state.lastFetched = 0;
    },
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },
    updateOrder: (state, action) => {
      const order = state.items.find((order) => order.id === action.payload.id);
      Object.assign(order, action.payload);
    },
    deleteOrder: (state, action) => {
      state.orders = state.items.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const {
  ordersRequested,
  ordersReceived,
  ordersRequestFailed,
  resetCategoriesLastFetched,
  addOrder,
  updateOrder,
  deleteOrder,
} = ordersSlice.actions;
export default ordersSlice.reducer;
