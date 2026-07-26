import { useSelector } from "react-redux";
import { useGetRandomMealQuery } from "../store/randomMealApi";
import RecipeImage from "./RecipeImage";

function RandomDishWidget() {
  const recipesStatus = useSelector((state) => state.recipes.status);
  const isReady = recipesStatus === "succeeded";

  const { data: meal, isFetching, isError, refetch } = useGetRandomMealQuery(undefined, {
    skip: !isReady,
  });

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-wine">
            RTK Query demo
          </p>
          <p className="mt-1 font-body text-xs text-ink-soft">
            Picks a random dish from what's already loaded
          </p>
        </div>
        <button
          onClick={refetch}
          disabled={!isReady || isFetching}
          className="shrink-0 rounded-full bg-forest px-4 py-2 font-body text-xs font-semibold text-cream transition-colors hover:bg-forest-light disabled:opacity-60"
        >
          {isFetching ? "Rolling..." : "Surprise me"}
        </button>
      </div>

      {!isReady && (
        <p className="mt-4 font-body text-sm text-ink-soft">Loading recipes...</p>
      )}

      {isReady && isError && (
        <p className="mt-4 font-body text-sm text-wine">
          Couldn't pick a dish. Try again.
        </p>
      )}

      {meal && (
        <div className="mt-4 flex items-center gap-4">
          <RecipeImage
            src={meal.strMealThumb}
            name={meal.strMeal}
            category={meal.strCategory}
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-ink">
              {meal.strMeal}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              {[meal.strCategory, meal.strArea].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomDishWidget;