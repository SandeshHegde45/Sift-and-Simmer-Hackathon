import { Link } from "react-router";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";
import { usePageMeta } from "../utils/usePageMeta";

function Favorites() {
  usePageMeta("Favorites", "Your saved Indian vegetarian recipes on Sift & Simmer.");
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-wine">
        Your recipe box
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Nothing pinned yet"
            message="Tap the heart on any recipe to save it here for next time."
          />
          <div className="mt-6 text-center">
            <Link to="/" className="font-mono text-xs uppercase tracking-widest text-forest hover:underline">
              Browse recipes →
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
