import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeCard from "@/components/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import { useMyRecipes } from "@/hooks/useMyRecipes";
import { useFavoriteRecipes } from "@/hooks/useFavoriteRecipes";
import SearchFilter from "@/components/SearchFilter";
import type { Recipe } from "@/types/recipe";
import { useState, useEffect } from "react";

/**
 * Main home page component with tabbed recipe views.
 * Displays all recipes, user's recipes, and favorite recipes
 */
export default function Home() {
  const all = useRecipes();
  const myRecipes = useMyRecipes();
  const favoriteRecipes = useFavoriteRecipes();
  const [globalSearch, setGlobalSearch] = useState("");

  return (
    <div className="w-full space-y-6">
      {/* Header with title and search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-3xl font-bold mr-4 py-2 text-primary">BrokeEats Recipes 🍽️</h1>
        <SearchFilter onFilter={setGlobalSearch}/>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="myRecipes">My Recipes</TabsTrigger>
          <TabsTrigger value="favoriteRecipes">My Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <RecipeList 
            data={all.data} 
            isLoading={all.isLoading} 
            error={all.error} 
            onDelete={all.refetch}
            onFavoriteToggle={all.refetch}
            searchTerm={globalSearch}
          />
        </TabsContent>

        <TabsContent value="myRecipes">
          <RecipeList 
            data={myRecipes.data} 
            isLoading={myRecipes.isLoading} 
            error={myRecipes.error} 
            onDelete={myRecipes.refetch}
            onFavoriteToggle={myRecipes.refetch}
            searchTerm={globalSearch}
          />
        </TabsContent>

        <TabsContent value="favoriteRecipes">
          <RecipeList 
            data={favoriteRecipes.data} 
            isLoading={favoriteRecipes.isLoading} 
            error={favoriteRecipes.error} 
            onDelete={favoriteRecipes.refetch}
            onFavoriteToggle={favoriteRecipes.refetch}
            searchTerm={globalSearch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Reusable component to display filtered recipe list
 * Handles search filtering, loading states, and recipe actions
 */
function RecipeList({
  data,
  isLoading,
  error,
  onDelete,
  onFavoriteToggle,
  searchTerm,
}: {
  data?: Recipe[];
  isLoading: boolean;
  error: any;
  onDelete?: () => void;
  onFavoriteToggle?: () => void;
  searchTerm: string;
}) {
  const [filtered, setFiltered] = useState(data ?? []);

  /**
   * Filter recipes by title and ingredients.
   * Case-insensitive search across recipe content
   */
  const handleSearch = (search: string) => {
    if (!data) return;
    if (!search.trim()) return setFiltered(data);

    const result = data.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(result);
  };

  // Keep data in sync and apply search filter
  useEffect(() => { 
    if (data) { 
      setFiltered(data);
      handleSearch(searchTerm);
    }
  }, [data, searchTerm]);

  // Handle loading and error states
  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p className="text-red-500">Something went wrong!</p>;
  if (!data || data.length === 0) return <p className="text-muted-foreground">No recipes found.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}