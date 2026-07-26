import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndianVegRecipes } from "../store/recipesSlice";
import { selectFilteredRecipes } from "../store/selectors";
import FilterBar from "../components/FilterBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import RandomDishWidget from "../components/RandomDishWidget";
import { clearFilters } from "../store/filtersSlice";
import { usePageMeta } from "../utils/usePageMeta";

function Home() {
  usePageMeta(
    null,
    "Browse Indian vegetarian recipes with ingredients, step-by-step instructions, prep time, servings, and calories."
  );
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.recipes);
  const filteredItems = useSelector(selectFilteredRecipes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIndianVegRecipes());
    }
  }, [status, dispatch]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute -right-10 top-10 hidden h-40 w-40 rotate-12 rounded-3xl bg-mustard/30 sm:block" />
        <div className="pointer-events-none absolute right-24 top-40 hidden h-16 w-16 -rotate-6 rounded-full bg-wine/20 sm:block" />
        <div className="pointer-events-none absolute left-8 bottom-4 hidden h-10 w-10 rotate-45 rounded-lg bg-forest/15 sm:block" />

        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-wine">
            A vegetarian tour of India
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Cook something worth writing down.
          </h1>
          <p className="mt-4 max-w-lg font-body text-base text-ink-soft">
            A hand-picked collection of Indian vegetarian dishes, from
            everyday curries to festival sweets. Filter by course or search
            for something specific.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
            <FilterBar />
            <RandomDishWidget />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {status === "loading" && <Loader label="Gathering Indian vegetarian dishes..." />}

        {status === "failed" && (
          <EmptyState
            title="The kitchen's a bit smoky"
            message={error || "Something went wrong fetching recipes. Please try again."}
            actionLabel="Reset filters"
            onAction={() => dispatch(clearFilters())}
          />
        )}

        {status === "succeeded" && filteredItems.length === 0 && (
          <EmptyState
            title="No dishes found"
            message="Try a different search term or course filter."
            actionLabel="Reset filters"
            onAction={() => dispatch(clearFilters())}
          />
        )}

        {status === "succeeded" && filteredItems.length > 0 && (
          <>
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-ink-soft">
              {filteredItems.length} recipe{filteredItems.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredItems.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
