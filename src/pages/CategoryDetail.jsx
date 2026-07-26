import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndianVegRecipes } from "../store/recipesSlice";
import { selectAllRecipes } from "../store/selectors";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { usePageMeta } from "../utils/usePageMeta";

function CategoryDetail() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  usePageMeta(
    decodedCategory,
    `Indian vegetarian ${decodedCategory.toLowerCase()} recipes on Sift & Simmer.`
  );
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.recipes);
  const items = useSelector(selectAllRecipes);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIndianVegRecipes());
    }
  }, [status, dispatch]);

  const categoryItems = useMemo(
    () => items.filter((meal) => meal.strCategory === decodedCategory),
    [items, decodedCategory]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Link to="/categories" className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-forest">
        ← All categories
      </Link>

      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        {decodedCategory}
      </h1>

      {status === "loading" && <Loader label="Loading category..." />}

      {status === "failed" && (
        <div className="mt-8">
          <EmptyState
            title="The kitchen's a bit smoky"
            message="Something went wrong loading this category. Please try again shortly."
          />
        </div>
      )}

      {status === "succeeded" && categoryItems.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="Nothing here yet"
            message="This category doesn't have any dishes in the collection."
          />
          <div className="mt-4 text-center">
            <Link to="/categories" className="font-mono text-xs uppercase tracking-widest text-forest hover:underline">
              Back to categories
            </Link>
          </div>
        </div>
      )}

      {status === "succeeded" && categoryItems.length > 0 && (
        <>
          <p className="mt-2 mb-6 font-mono text-xs uppercase tracking-widest text-ink-soft">
            {categoryItems.length} dish{categoryItems.length !== 1 ? "es" : ""}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categoryItems.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryDetail;
