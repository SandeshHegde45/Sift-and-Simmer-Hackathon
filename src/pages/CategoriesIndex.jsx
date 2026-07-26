import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndianVegRecipes } from "../store/recipesSlice";
import { selectAllRecipes, selectCategoryCounts } from "../store/selectors";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import RecipeImage from "../components/RecipeImage";
import { usePageMeta } from "../utils/usePageMeta";

function CategoriesIndex() {
  usePageMeta(
    "Categories",
    "Browse Indian vegetarian recipes by course — curries, breads, rice, desserts, and more."
  );
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.recipes);
  const items = useSelector(selectAllRecipes);
  const categoryCounts = useSelector(selectCategoryCounts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIndianVegRecipes());
    }
  }, [status, dispatch]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-wine">Browse by course</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Categories
      </h1>
      <p className="mt-3 max-w-lg font-body text-sm text-ink-soft">
        Every dish in Sift &amp; Simmer is tagged by course, straight from the
        source data — pick one to see what's inside.
      </p>

      {status === "loading" && <Loader label="Sorting dishes into categories..." />}

      {status === "failed" && (
        <div className="mt-8">
          <EmptyState
            title="The kitchen's a bit smoky"
            message="Something went wrong loading categories. Please try again shortly."
          />
        </div>
      )}

      {status === "succeeded" && categoryCounts.length === 0 && (
        <div className="mt-8">
          <EmptyState title="No categories yet" message="Check back once recipes have loaded." />
        </div>
      )}

      {status === "succeeded" && categoryCounts.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categoryCounts.map(({ category, count }) => {
            const sample = items.find((meal) => meal.strCategory === category);
            return (
              <Link
                key={category}
                to={`/categories/${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {sample && (
                  <RecipeImage
                    src={sample.strMealThumb}
                    name={sample.strMeal}
                    category={sample.strCategory}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="font-display text-lg font-semibold text-cream">{category}</h2>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-mustard-light">
                    {count} dish{count !== 1 ? "es" : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoriesIndex;
