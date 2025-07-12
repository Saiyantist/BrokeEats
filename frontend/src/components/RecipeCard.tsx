import type { Recipe } from "@/types/recipe";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
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
      </CardContent>
    </Card>
  );
}
