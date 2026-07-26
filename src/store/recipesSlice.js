import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllRecipesFromSupabase, fetchRecipeByIdFromSupabase } from "../api/supabaseRecipes";
import { mapSupabaseRecipe } from "../utils/mapSupabaseRecipe";
import { fallbackIndianVegRecipes } from "../data/fallbackIndianVegRecipes";

function findFallbackRecipeById(id) {
  return fallbackIndianVegRecipes.find((meal) => meal.idMeal === id) || null;
}

export const fetchIndianVegRecipes = createAsyncThunk(
  "recipes/fetchIndianVegRecipes",
  async () => {
    // Primary source: the Supabase recipes table.
    try {
      const rows = await fetchAllRecipesFromSupabase();
      if (rows && rows.length > 0) {
        return rows.map(mapSupabaseRecipe);
      }
    } catch (error) {
      // Supabase unreachable or misconfigured — fall through to the
      // bundled dataset below so the page is never empty.
    }

    return fallbackIndianVegRecipes;
  }
);

export const fetchRecipeDetail = createAsyncThunk(
  "recipes/fetchRecipeDetail",
  async (id) => {
    if (id.startsWith("local-")) {
      return findFallbackRecipeById(id);
    }

    try {
      const row = await fetchRecipeByIdFromSupabase(id);
      if (row) {
        return mapSupabaseRecipe(row);
      }
    } catch (error) {
      // Supabase unreachable — fall through to the bundled dataset.
    }

    return findFallbackRecipeById(id);
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    detail: null,
    detailStatus: "idle",
    detailError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndianVegRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIndianVegRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchIndianVegRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRecipeDetail.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.detail = null;
      })
      .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.detail = action.payload;
      })
      .addCase(fetchRecipeDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
