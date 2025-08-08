import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const category = state.categories.find(
        (category) => category.id === action.payload.id
      );
      Object.assign(category, action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
  },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
