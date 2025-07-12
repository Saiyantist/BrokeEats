<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'title',
        'ingredients',
        'instructions',
        'user_id',
    ];

    protected $casts = [
        'ingredients' => 'array',
    ];

    protected $appends = ['is_favorite', 'favorited_by'];

    /**
     * Recipe belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Recipe is favorite of the user
     */
    public function getIsFavoriteAttribute(): bool
    {
        $user = auth()->user();
        if (!$user) return false;
    
        return $user->favoriteRecipes()->where('recipe_id', $this->id)->exists();
    }

    /**
     * Get list of user emails who favorited this recipe
     */
    public function getFavoritedByAttribute(): array
    {
        return $this->FavoritedBy()->pluck('email')->toArray();
    }

    /**
     * Recipe can have many users
     */
    public function FavoritedBy()
    {
        return $this->belongsToMany(User::class, 'recipe_user_favorite')->withTimestamps();
    }
}
