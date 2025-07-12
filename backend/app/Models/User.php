<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * User can have many "favorited" recipes. (Pivot table)
     */
    public function favoriteRecipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_user_favorite')->withTimestamps();
    }

    /**
     * Checks if user has favorited the recipe.
     */
    public function hasFavorited($recipeId): bool
    {
        return $this->favoriteRecipes()->where('recipe_id', $recipeId)->exists();
    }

    /**
     * User can create many recipes.
     */
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

}
