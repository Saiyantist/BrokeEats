import { useRecipes } from "@/hooks/useRecipes";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const { data, isLoading, error } = useRecipes();

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Something went wrong!</p>;

  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">No recipes found. Be the first to add one!</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
