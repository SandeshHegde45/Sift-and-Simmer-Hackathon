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
- **Supabase** — recipe database, queries, and email/password authentication
- **React Hook Form** — the Contact, Login, and Register forms
- **Tailwind CSS v4** — styling

## Authentication

The whole app requires a signed-in Supabase user (email + password) —
`RequireAuth.jsx` redirects to `/login` if no session is found. `/login` and
`/register` are the only public routes. Session state is bootstrapped and
kept in sync via `src/utils/useAuthListener.js`, which checks for an existing
session on load and subscribes to `supabase.auth.onAuthStateChange`.

Note: favorites and contact messages are still stored per-browser in
`localStorage`, not tied to the signed-in account — that would need its own
Supabase table with row-level security if you want per-user data.

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