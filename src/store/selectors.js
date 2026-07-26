import { createSelector } from "@reduxjs/toolkit";

export const selectAllRecipes = (state) => state.recipes.items;
export const selectFilters = (state) => state.filters;

export const selectFilteredRecipes = createSelector(
  [selectAllRecipes, selectFilters],
  (items, filters) => {
    let result = items;

    if (filters.search.trim() !== "") {
      const term = filters.search.trim().toLowerCase();
      result = result.filter((meal) => meal.strMeal.toLowerCase().includes(term));
    }

    if (filters.category !== "All") {
      result = result.filter((meal) => meal.strCategory === filters.category);
    }

    result = [...result].sort((a, b) =>
      filters.sort === "za"
        ? b.strMeal.localeCompare(a.strMeal)
        : a.strMeal.localeCompare(b.strMeal)
    );

    return result;
  }
);

export const selectCategoryCounts = createSelector([selectAllRecipes], (items) => {
  const counts = {};
  items.forEach((meal) => {
    const category = meal.strCategory || "Other";
    counts[category] = (counts[category] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
});
