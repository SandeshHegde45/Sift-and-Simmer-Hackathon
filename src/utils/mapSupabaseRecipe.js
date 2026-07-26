function safeParseJson(value) {
  if (!value) return null;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function mapSupabaseRecipe(row) {
  const ingredients = safeParseJson(row.ingredients) || [];
  const instructionSteps = safeParseJson(row.instructions) || [];

  const mapped = {
    idMeal: row.id,
    strMeal: row.title,
    strMealThumb: row.image,
    strCategory: row.category,
    strArea: "Indian",
    strInstructions: instructionSteps
      .slice()
      .sort((a, b) => (a.step || 0) - (b.step || 0))
      .map((step) => step.text)
      .join("\n"),
    strYoutube: row.video_url || null,
    // Extra fields Supabase gives us that the fallback dataset
    // dataset don't have. Consumers should treat these as optional.
    description: row.description || null,
    timeLabel: row.time || null,
    servings: row.servings ?? null,
    calories: row.calories ?? null,
    difficulty: row.difficulty || null,
    isVegan: Boolean(row.is_vegan),
    isGlutenFree: Boolean(row.is_gluten_free),
  };

  ingredients.slice(0, 20).forEach((ingredient, index) => {
    mapped[`strIngredient${index + 1}`] = ingredient.item;
    mapped[`strMeasure${index + 1}`] = ingredient.quantity;
  });

  return mapped;
}
