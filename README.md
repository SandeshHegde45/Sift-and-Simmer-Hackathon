# Sift & Simmer

A small Indian vegetarian recipe browser built as a learning project for
React + Redux Toolkit + React Router + Tailwind CSS + Supabase.

## Stack

- **React** — UI components
- **Redux Toolkit** — global state (recipes, filters, favorites, feedback messages)
- **RTK Query** — a small bonus example (`src/store/randomMealApi.js`), separate
  from the main thunk-based data flow — queries Supabase directly via a
  custom `queryFn`
- **React Router** — client-side routing
- **Supabase** — recipe database and queries
- **React Hook Form** — the Contact page's feedback form
- **Tailwind CSS v4** — styling

## Data

Recipes are fetched in two layers, in order:

1. **Supabase** (`recipes` table) — the primary source, with real descriptions,
   time, servings, calories, difficulty, and video links. Configured via
   `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in `.env`.
2. A small bundled dataset in `src/data/fallbackIndianVegRecipes.js` — used
   only if Supabase is unreachable or empty, so the browse page is never
   blank.

Row-to-app mapping lives in `src/utils/mapSupabaseRecipe.js`.

## Project structure

```
src/
  api/            Supabase client + queries
  components/     shared UI pieces (Navbar, RecipeCard, FilterBar, ...)
  data/           bundled fallback recipe dataset
  pages/          route-level components
  store/          Redux slices, RTK Query API, and selectors
  utils/          small helpers (data mapping, generated thumbnails)
```

## Running locally

```
cp .env.example .env   # then fill in your Supabase URL + anon key
npm install
npm run dev
```

## Building for production

```
npm run build
```
