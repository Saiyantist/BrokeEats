<?php

use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// =========================
/** Authenticated Routes */
// =========================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    /** Recipe Protected Routes */
    Route::apiResource('recipes', RecipeController::class)->except(['index', 'show']);
    Route::post('/recipes/{recipe}/favorite', [RecipeController::class, 'toggleFavorite']);
    
    /** My Recipes - Must come before {recipe} route */
    Route::get('/recipes/my-recipes', [RecipeController::class, 'myRecipes']);
    
    /** My Favorite Recipes - Must come before {recipe} route */
    Route::get('/recipes/favorites', [RecipeController::class, 'favoriteRecipes']);
    
});

// =========================
/** Guest Routes */
// =========================

/** Authentication Routes */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/** Public Recipe Routes - Separated for conflict resolution */
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{recipe}', [RecipeController::class, 'show']); // Individual Recipe Route - Must come after specific routes