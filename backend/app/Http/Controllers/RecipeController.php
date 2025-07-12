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
        })->latest()->get();

        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'ingredients' => 'required|array',
            'instructions' => 'required|string',
        ]);

        $recipe = Recipe::create([
            ...$validated,
            'is_favorite' => $request->input('is_favorite', false),
        ]);

        return response()->json($recipe, 201);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title' => 'string',
            'ingredients' => 'array',
            'instructions' => 'string',
            'is_favorite' => 'boolean',
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
}
