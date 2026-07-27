import { createSlice } from "@reduxjs/toolkit";
import { getStoredSession } from "../api/localAuth";
import { setSession, signIn, signOut } from "./authSlice";

const FAVORITES_KEY_PREFIX = "siftSimmerFavorites";
export function getFavoritesStorageKey(user) {
  return user?.email
    ? `${FAVORITES_KEY_PREFIX}:${user.email}`
    : `${FAVORITES_KEY_PREFIX}:guest`;
}

function loadFavorites(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

const initialStorageKey = getFavoritesStorageKey(getStoredSession());

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(initialStorageKey),
    storageKey: initialStorageKey,
  },
  reducers: {
    toggleFavorite(state, action) {
      const recipe = action.payload;
      const exists = state.items.some((item) => item.idMeal === recipe.idMeal);
      if (exists) {
        state.items = state.items.filter(
          (item) => item.idMeal !== recipe.idMeal,
        );
      } else {
        state.items.push(recipe);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSession, (state, action) => {
        const key = getFavoritesStorageKey(action.payload);
        state.storageKey = key;
        state.items = loadFavorites(key);
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const key = getFavoritesStorageKey(action.payload.user);
        state.storageKey = key;
        state.items = loadFavorites(key);
      })
      .addCase(signOut.fulfilled, (state) => {
        const key = getFavoritesStorageKey(null);
        state.storageKey = key;
        state.items = loadFavorites(key);
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
