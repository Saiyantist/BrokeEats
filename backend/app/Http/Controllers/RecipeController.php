<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('ingredient');

        $recipes = Recipe::when($search, function ($query, $search) {
            return $query->whereJsonContains('ingredients', $search);
        })
        ->latest()
        ->get();

        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'ingredients' => 'required|array',
            'instructions' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();
        $recipe = Recipe::create([...$validated, 'user_id' => auth()->id()]);

        return response()->json($recipe, 201);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title' => 'string',
            'ingredients' => 'array',
            'instructions' => 'string',
        ]);

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return response()->json(null, 204);
    }

    public function show(Recipe $recipe)
    {
        return response()->json($recipe);
    }

    public function toggleFavorite(Recipe $recipe)
    {
        $user = auth()->user();
        $wasFavorited = $user->hasFavorited($recipe->id);
        
        if ($wasFavorited) {
            $recipe->FavoritedBy()->detach($user->id);
        } else {
            $recipe->FavoritedBy()->attach($user->id);
        }
        
        // Refresh the recipe to get updated data
        $recipe->refresh();
        
        return response()->json([
            'message' => $wasFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites',
            'recipe' => $recipe
        ]);
    }

    public function myRecipes()
    {
        $recipes = auth()->user()->recipes()->latest()->get();
        return response()->json($recipes);
    }

    public function favoriteRecipes()
    {
        $recipes = auth()->user()->favoriteRecipes()->latest()->get();
        return response()->json($recipes);
    }

}
