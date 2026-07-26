import { generateDishThumb } from "../utils/dishIllustration";

function RecipeImage({ src, name, category, alt, loading, className }) {
  function handleError(event) {
    event.currentTarget.onerror = null;
    event.currentTarget.src = generateDishThumb(name, category);
  }

  return (
    <img
      src={src || generateDishThumb(name, category)}
      alt={alt || name}
      loading={loading}
      onError={handleError}
      className={className}
    />
  );
}

export default RecipeImage;
