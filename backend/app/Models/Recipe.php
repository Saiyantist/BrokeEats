<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'title',
        'ingredients',
        'instructions',
        'is_favorite',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'is_favorite' => 'boolean',
    ];
    
}
