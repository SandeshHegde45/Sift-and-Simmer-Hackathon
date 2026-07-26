import { supabase } from "./supabaseClient";

export async function fetchAllRecipesFromSupabase() {
  const { data, error } = await supabase.from("recipes").select("*");
  if (error) throw error;
  return data || [];
}

export async function fetchRecipeByIdFromSupabase(id) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}
