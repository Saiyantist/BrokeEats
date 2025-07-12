import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Recipe } from "../types/recipe";

// API Call Function (GET /api/recipes?ingredient=egg)
const fetchRecipes = async (ingredient?: string): Promise<Recipe[]> => {
  const res = await api.get("/recipes", {
    params: ingredient ? { ingredient } : {}, // dynamic query param
  });
  return res.data;
};

// Custom hook that wraps the React Query logic
export const useRecipes = (ingredient?: string) => {
  return useQuery({
    queryKey: ["recipes", ingredient], // Caches result by key+ingredient
    queryFn: () => fetchRecipes(ingredient), // What to run when fetching
  });
};
