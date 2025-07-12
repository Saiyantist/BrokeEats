import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { Recipe } from "@/types/recipe";
import { useAuth } from "@/contexts/AuthContext";

export function useMyRecipes() {
  const { token } = useAuth();

  return useQuery<Recipe[]>({
    queryKey: ["my-recipes"],
    queryFn: async () => {
      const response = await api.get("/recipes/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
}
