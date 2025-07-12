import { useState } from "react";
import type { Recipe } from "@/types/recipe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";
import EditRecipeModal from "@/components/EditRecipeModal";

interface Props {
  recipe: Recipe;
  onDelete?: () => void;
}

export default function RecipeCard({ recipe, onDelete }: Props) {
  const { user, token } = useAuth();
  // const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await api.delete(`/recipes/${recipe.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Recipe deleted.");
      onDelete?.(); // Notify parent to refresh
    } catch {
      toast.error("Failed to delete recipe.");
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold text-primary">{recipe.title}</h2>

          <div>
            <p className="text-sm font-medium">Ingredients:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Instructions:</p>
            <p className="text-sm text-muted-foreground">{recipe.instructions}</p>
          </div>

          {recipe.is_favorite && (
            <p className="text-yellow-500 text-sm">★ Favorited</p>
          )}

          {/* Controls */}
          {user && (
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => {
                setEditing(true);
                // navigate(`/edit/${recipe.id}`);
              }}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
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
