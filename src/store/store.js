import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";
import filtersReducer from "./filtersSlice";
import favoritesReducer from "./favoritesSlice";
import messagesReducer from "./messagesSlice";
import authReducer from "./authSlice";
import { randomMealApi } from "./randomMealApi";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    messages: messagesReducer,
    auth: authReducer,
    [randomMealApi.reducerPath]: randomMealApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(randomMealApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    state.favorites.storageKey,
    JSON.stringify(state.favorites.items),
  );
  localStorage.setItem(
    "siftSimmerMessages",
    JSON.stringify(state.messages.items),
  );
});
