import { useEffect } from "react";

function parseDurationToIso(label) {
  if (!label) return undefined;
  const hourMatch = label.match(/(\d+)\s*hr/i);
  const minMatch = label.match(/(\d+)\s*min/i);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  if (!hours && !minutes) return undefined;
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}`;
}

export function useRecipeStructuredData(recipe, ingredients, steps) {
  useEffect(() => {
    if (!recipe) return undefined;

    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      name: recipe.strMeal,
      image: recipe.strMealThumb ? [recipe.strMealThumb] : undefined,
      description: recipe.description || undefined,
      recipeCategory: recipe.strCategory || undefined,
      recipeCuisine: recipe.strArea || undefined,
      recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
      totalTime: parseDurationToIso(recipe.timeLabel),
      recipeIngredient: ingredients.map((item) =>
        item.measure ? `${item.measure} ${item.ingredient}` : item.ingredient
      ),
      recipeInstructions: steps.map((step) => ({
        "@type": "HowToStep",
        text: step,
      })),
      nutrition: recipe.calories
        ? { "@type": "NutritionInformation", calories: `${recipe.calories} calories` }
        : undefined,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [recipe, ingredients, steps]);
}
