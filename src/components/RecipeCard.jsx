import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import RecipeImage from "./RecipeImage";

function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.idMeal === recipe.idMeal)
  );

  function handleToggleFavorite() {
    dispatch(toggleFavorite(recipe));
  }

  return (
    <div className="group relative rounded-2xl border border-line bg-paper p-3 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <div className="relative overflow-hidden rounded-xl">
          <RecipeImage
            src={recipe.strMealThumb}
            name={recipe.strMeal}
            category={recipe.strCategory}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {recipe.timeLabel && (
            <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] font-semibold text-cream backdrop-blur-sm">
              {recipe.timeLabel}
            </span>
          )}
        </div>

        <div className="px-1 pb-1 pt-3">
          {(recipe.strCategory || recipe.strArea) && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-mustard">
              {[recipe.strCategory, recipe.strArea].filter(Boolean).join(" · ")}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug text-ink">
            {recipe.strMeal}
          </h3>
        </div>
      </Link>

      <button
        onClick={handleToggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-lg shadow-sm transition-colors ${
          isFavorite ? "bg-wine text-mustard-light" : "bg-cream/90 text-ink-soft hover:text-wine"
        }`}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default RecipeCard;
