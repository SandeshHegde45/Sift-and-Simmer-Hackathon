import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetail } from "../store/recipesSlice";
import { toggleFavorite } from "../store/favoritesSlice";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import RecipeImage from "../components/RecipeImage";
import { usePageMeta } from "../utils/usePageMeta";
import { useRecipeStructuredData } from "../utils/useRecipeStructuredData";

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure: measure ? measure.trim() : "" });
    }
  }
  return ingredients;
}

function getSteps(meal) {
  if (!meal.strInstructions) return [];
  return meal.strInstructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);
}

function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, detailStatus } = useSelector((state) => state.recipes);
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.idMeal === id)
  );
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    dispatch(fetchRecipeDetail(id));
    setCheckedIngredients({});
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [dispatch, id]);

  const ingredients = detail ? getIngredients(detail) : [];
  const steps = detail ? getSteps(detail) : [];

  usePageMeta(
    detail?.strMeal,
    detail?.description || (detail ? `Recipe for ${detail.strMeal}.` : undefined)
  );
  useRecipeStructuredData(detail, ingredients, steps);

  if (detailStatus === "loading" || detailStatus === "idle") {
    return <Loader label="Plating the details..." />;
  }

  if (detailStatus === "failed" || !detail) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <EmptyState
          title="Recipe not found"
          message="This dish may have wandered off the menu. Head back and try another."
        />
        <div className="mt-6 text-center">
          <Link to="/" className="font-mono text-xs uppercase tracking-widest text-forest hover:underline">
            ← Back to browsing
          </Link>
        </div>
      </div>
    );
  }

  function toggleIngredient(index) {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function handleFavoriteClick() {
    dispatch(
      toggleFavorite({
        idMeal: detail.idMeal,
        strMeal: detail.strMeal,
        strMealThumb: detail.strMealThumb,
        strCategory: detail.strCategory,
        strArea: detail.strArea,
      })
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <Link to="/" className="font-mono text-xs uppercase tracking-widest text-ink-soft hover:text-forest">
        ← Back to browsing
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-2">
            <RecipeImage
              src={detail.strMealThumb}
              name={detail.strMeal}
              category={detail.strCategory}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {detail.strCategory && (
              <span className="rounded-full bg-forest/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-forest">
                {detail.strCategory}
              </span>
            )}
            {detail.strArea && (
              <span className="rounded-full bg-mustard/20 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink">
                {detail.strArea}
              </span>
            )}
            {detail.isVegan && (
              <span className="rounded-full bg-forest/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-forest">
                Vegan
              </span>
            )}
            {detail.isGlutenFree && (
              <span className="rounded-full bg-wine/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-wine">
                Gluten-free
              </span>
            )}
          </div>

          {(detail.timeLabel || detail.servings || detail.calories || detail.difficulty) && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              {detail.timeLabel && (
                <div className="rounded-xl border border-line bg-paper px-2 py-2.5">
                  <p className="font-display text-sm font-semibold text-ink">{detail.timeLabel}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Time</p>
                </div>
              )}
              {detail.servings && (
                <div className="rounded-xl border border-line bg-paper px-2 py-2.5">
                  <p className="font-display text-sm font-semibold text-ink">{detail.servings}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Servings</p>
                </div>
              )}
              {detail.calories && (
                <div className="rounded-xl border border-line bg-paper px-2 py-2.5">
                  <p className="font-display text-sm font-semibold text-ink">{detail.calories} kcal</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Calories</p>
                </div>
              )}
              {detail.difficulty && (
                <div className="rounded-xl border border-line bg-paper px-2 py-2.5">
                  <p className="font-display text-sm font-semibold text-ink">{detail.difficulty}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Difficulty</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleFavoriteClick}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 font-body text-sm font-semibold transition-colors ${
                isFavorite
                  ? "bg-wine text-cream hover:bg-wine-light"
                  : "bg-forest text-cream hover:bg-forest-light"
              }`}
            >
              {isFavorite ? "♥ Saved to favorites" : "♡ Save to favorites"}
            </button>
            {detail.strYoutube && (
              <a
                href={detail.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-full border border-line px-5 py-3 font-body text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
              >
                Watch
              </a>
            )}
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {detail.strMeal}
          </h1>

          {detail.description && (
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink-soft">
              {detail.description}
            </p>
          )}

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-ink">Ingredients</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ingredients.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => toggleIngredient(index)}
                    className="flex w-full items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2 text-left transition-colors hover:border-forest"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] ${
                        checkedIngredients[index]
                          ? "border-forest bg-forest text-cream"
                          : "border-line text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`font-body text-sm ${
                        checkedIngredients[index] ? "text-ink-soft line-through" : "text-ink"
                      }`}
                    >
                      {item.ingredient}
                      {item.measure && (
                        <span className="text-ink-soft"> — {item.measure}</span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-ink">Instructions</h2>
            <ol className="mt-4 space-y-5">
              {steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-display text-2xl font-semibold text-mustard">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 font-body text-sm leading-relaxed text-ink-soft">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
