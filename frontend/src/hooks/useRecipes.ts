import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Recipe } from "../types/recipe";

/**
 * Fetch recipes from API with optional ingredient filter.
 */
const fetchRecipes = async (ingredient?: string): Promise<Recipe[]> => {
  const res = await api.get("/recipes", {
    params: ingredient ? { ingredient } : {}, // Add ingredient as query param if provided
  });
  return res.data;
};

/**
 * Custom hook to fetch and cache recipes.
 * Optionally filter by ingredient on the server side
 */
export const useRecipes = (ingredient?: string) => {
  return useQuery({
    queryKey: ["recipes", ingredient], // Cache by recipes + ingredient filter
    queryFn: () => fetchRecipes(ingredient), // Fetch function
  });
};
