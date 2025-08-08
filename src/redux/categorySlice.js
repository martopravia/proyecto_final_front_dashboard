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
      const { id, name } = action.payload;
      const index = state.categories.findIndex((cat) => cat.id === id);
      if (index !== -1) {
        state.categories[index].name = name;
      }
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
