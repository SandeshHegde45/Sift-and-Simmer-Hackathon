import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

// A small, self-contained RTK Query example, separate from the main
// thunk-based data flow in recipesSlice.js. This endpoint does not make a
// network call — it reads a random entry from the recipes already loaded
// into the store, using RTK Query's queryFn to reach into other slices via
// getState(). Wrapping it in RTK Query still gives the same loading/error/
// refetch shape you'd get from a real network endpoint, without depending
// on a second round trip that can fail independently of the main fetch.
export const randomMealApi = createApi({
  reducerPath: "randomMealApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRandomMeal: builder.query({
      queryFn(_arg, { getState }) {
        const items = getState().recipes.items;

        if (!items || items.length === 0) {
          return { error: { status: "CUSTOM_ERROR", error: "No recipes loaded" } };
        }

        const randomIndex = Math.floor(Math.random() * items.length);
        return { data: items[randomIndex] };
      },
    }),
  }),
});

export const { useGetRandomMealQuery } = randomMealApi;