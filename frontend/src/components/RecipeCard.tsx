import { useState, useEffect } from "react";
import type { Recipe } from "@/types/recipe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";
import EditRecipeModal from "@/components/EditRecipeModal";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  recipe: Recipe;
  onDelete?: () => void;
  onFavoriteToggle?: () => void;
}

export default function RecipeCard({ recipe, onDelete, onFavoriteToggle }: Props) {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    user ? recipe.favorited_by.includes(user.email) : false
  );
  const [favoriteCount, setFavoriteCount] = useState(recipe.favorited_by.length);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  // Sync state with props when recipe or user changes
  useEffect(() => {
    setIsFavorited(user ? recipe.favorited_by.includes(user.email) : false);
    setFavoriteCount(recipe.favorited_by.length);
  }, [recipe, user]);

  /**
   * Toggle the favorite status of a recipe
   * @returns void
   */
  const handleToggleFavorite = async () => {
    if (!user || !token) {
      toast.error("Please log in to favorite recipes.");
      return;
    }

    setFavoriteLoading(true);

    // Optimistic update - update UI immediately
    const previousFavorited = isFavorited;
    const previousCount = favoriteCount;
    
    setIsFavorited(!isFavorited);
    setFavoriteCount(isFavorited ? favoriteCount - 1 : favoriteCount + 1);
    
    
    try {
      const response = await api.post(`/recipes/${recipe.id}/favorite`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update local state based on server response
      const updatedRecipe = response.data.recipe;
      setIsFavorited(user ? updatedRecipe.favorited_by.includes(user.email) : false);
      setFavoriteCount(updatedRecipe.favorited_by.length);
      
      // Invalidate all recipe-related queries to refresh data across all tabs
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["favorite-recipes"] });
      
      onFavoriteToggle?.();
      toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      // Revert optimistic update on error
      setIsFavorited(previousFavorited);
      setFavoriteCount(previousCount);
      toast.error("Failed to update favorite status.");
    } finally {
      setFavoriteLoading(false);
    }
  };

  /**
   * Delete a recipe
   * @returns void
   */
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    // Show immediate feedback
    toast.loading("Deleting recipe...");

    try {
      await api.delete(`/recipes/${recipe.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Invalidate all recipe-related queries to refresh the data
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["my-recipes"] });
      await queryClient.invalidateQueries({ queryKey: ["favorite-recipes"] });
      
      toast.dismiss(); // Dismiss the loading toast
      toast.success("Recipe deleted successfully!");
      onDelete?.(); // Notify parent to refresh
    } catch {
      toast.dismiss(); // Dismiss the loading toast
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <>
      <Card className="mb-4 p-2">
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            {/* Title */}
            <h2 className="text-xl font-semibold text-primary">{recipe.title}</h2>

              {/* Favorite Button */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  className="p-1 h-auto"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
                    } ${favoriteLoading ? "animate-pulse" : ""}`}
                  />
                </Button>
                {favoriteCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {favoriteCount}
                  </span>
                )}
              </div>
            </div>

          {/* Ingredients */}
          <div>
            <p className="text-sm font-medium">Ingredients:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <p className="text-sm font-medium">Instructions:</p>
            <p className="text-sm text-muted-foreground">{recipe.instructions}</p>
          </div>

          {(user && user.id === recipe.user_id) && (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  setEditing(true);
                }}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  variant="destructive"
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          )}

        </CardContent>
      </Card>
      <EditRecipeModal
        open={editing}
        onClose={() => setEditing(false)}
        recipe={recipe}
        onUpdated={onDelete ?? (() => {})} // use the same refetch
      />
    </>
  );
}
