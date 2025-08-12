import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: 0,
  },
  reducers: {
    categoriesRequested(state) {
      state.loading = true;
      state.error = null;
    },
    categoriesReceived(state, action) {
      state.loading = false;
      state.items = action.payload;
      state.lastFetched = Date.now();
    },
    categoriesRequestFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    updateCategory: (state, action) => {
      const category = state.items.find(
        (category) => category.id === action.payload.id
      );
      Object.assign(category, action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.items.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const {
  categoriesRequested,
  categoriesReceived,
  categoriesRequestFailed,
  addCategory,
  updateCategory,
  deleteCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
