import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    category: "All",
    sort: "az",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.category = "All";
      state.sort = "az";
    },
  },
});

export const { setSearch, setCategory, setSort, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
