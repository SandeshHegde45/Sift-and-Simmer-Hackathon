import { createSlice } from "@reduxjs/toolkit";

function loadFavorites() {
  try {
    const stored = localStorage.getItem("siftSimmerFavorites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const recipe = action.payload;
      const exists = state.items.some((item) => item.idMeal === recipe.idMeal);
      if (exists) {
        state.items = state.items.filter((item) => item.idMeal !== recipe.idMeal);
      } else {
        state.items.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
