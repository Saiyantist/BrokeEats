import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { Recipe } from "@/types/recipe";
import { useAuth } from "@/contexts/AuthContext";

export function useFavoriteRecipes() {
  const { token } = useAuth();

  return useQuery<Recipe[]>({
    queryKey: ["favorite-recipes"],
    queryFn: async () => {
      const response = await api.get("/recipes/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
}
