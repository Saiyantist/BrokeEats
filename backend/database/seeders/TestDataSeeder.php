<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Recipe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filipinoUsers = [
            [
                'name' => 'Kyle Andrei Santos',
                'email' => 'kyle.santos@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Zoe Isabella Reyes',
                'email' => 'zoe.reyes@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Marcus Gabriel Cruz',
                'email' => 'marcus.cruz@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Aria Nicole Aquino',
                'email' => 'aria.aquino@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Ethan James Torres',
                'email' => 'ethan.torres@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Luna Sofia Mendoza',
                'email' => 'luna.mendoza@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Axel Rafael Bautista',
                'email' => 'axel.bautista@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Maya Gabrielle Dela Cruz',
                'email' => 'maya.delacruz@example.com',
                'password' => Hash::make('password'),
            ],
        ];

        $users = [];
        foreach ($filipinoUsers as $userData) {
            $users[] = User::create($userData);
        }

        // Create budget-friendly Filipino recipes using RecipeFactory
        $budgetRecipes = [
            [
                'title' => 'Budget Adobo (₱80 Budget Meal)',
                'ingredients' => [
                    '150g chicken wings (cheaper cut)',
                    '1/4 cup soy sauce',
                    '2 tbsp vinegar',
                    '3 cloves garlic, minced',
                    '1 small onion, sliced',
                    '1 bay leaf',
                    '1/2 tsp black pepper',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Heat oil in a pan over medium heat. Sauté garlic and onion until fragrant. Add chicken wings and cook until lightly browned. Pour in soy sauce and vinegar. Add bay leaf and pepper. Bring to a boil, then reduce heat to low. Simmer covered for 20-25 minutes until chicken is tender. Season with salt if needed. Serve with rice. Total cost: ~₱50",
                'user_id' => $users[0]->id,
            ],
            [
                'title' => 'Student Sinigang (₱100 Budget)',
                'ingredients' => [
                    '100g pork belly, cut into small chunks',
                    '1 bunch kangkong (₱10)',
                    '1 small eggplant, sliced',
                    '1 tomato, quartered',
                    '1 small onion, sliced',
                    '1 packet sinigang mix (₱5)',
                    '3 cups water',
                    '1 tbsp fish sauce',
                    'Salt to taste'
                ],
                'instructions' => "In a pot, bring water to a boil. Add pork belly and simmer for 20 minutes until tender. Add tomato and onion, cook for 3 minutes. Stir in sinigang mix and fish sauce. Add eggplant and cook for 2 minutes. Finally, add kangkong and cook for 1 minute until wilted. Season with salt. Serve hot with rice. Total cost: ~₱40",
                'user_id' => $users[1]->id,
            ],
            [
                'title' => 'Fancy Pancit Canton (₱60 Budget)',
                'ingredients' => [
                    '2 packs pancit canton noodles (₱20)',
                    '50g pork, sliced thinly',
                    '1 cup cabbage, shredded',
                    '1 small carrot, julienned',
                    '3 cloves garlic, minced',
                    '1 small onion, sliced',
                    '2 tbsp soy sauce',
                    '1 tbsp cooking oil',
                    'Salt and pepper to taste'
                ],
                'instructions' => "Cook noodles according to package instructions, drain and set aside. Heat oil in a pan over high heat. Sauté garlic and onion until fragrant. Add pork and cook until browned. Add vegetables and stir-fry for 2 minutes. Add noodles and soy sauce. Toss everything together for 2 minutes. Season with salt and pepper. Serve hot. Total cost: ~₱35",
                'user_id' => $users[2]->id,
            ],
            [
                'title' => 'Egg Drop Sinigang (₱60 Budget)',
                'ingredients' => [
                    '4 eggs',
                    '1 bunch kangkong (₱10)',
                    '1 small eggplant, sliced',
                    '1 tomato, quartered',
                    '1 small onion, sliced',
                    '1 packet sinigang mix (₱5)',
                    '3 cups water',
                    '1 tbsp fish sauce',
                    'Salt to taste'
                ],
                'instructions' => "In a pot, bring water to a boil. Add tomato and onion, cook for 3 minutes. Stir in sinigang mix and fish sauce. Add eggplant and cook for 2 minutes. Crack eggs one by one into the simmering broth. Add kangkong and cook for 1 minute until wilted. Season with salt. Serve hot with rice. Total cost: ~₱30",
                'user_id' => $users[3]->id,
            ],
            [
                'title' => 'Budget Sisig (₱80 Budget)',
                'ingredients' => [
                    '100g pork belly, boiled and chopped',
                    '1 small onion, minced',
                    '3 cloves garlic, minced',
                    '2 tbsp soy sauce',
                    '1 tbsp vinegar',
                    '1 tbsp mayonnaise',
                    '1 egg',
                    '1 tbsp cooking oil',
                    'Salt and pepper to taste'
                ],
                'instructions' => "Heat oil in a pan and sauté garlic and onion until fragrant. Add chopped pork and cook until crispy. Add soy sauce and vinegar. Stir in mayonnaise. Create a well in the center and crack the egg. Cook until egg is set. Season with salt and pepper. Serve hot with rice. Total cost: ~₱45",
                'user_id' => $users[4]->id,
            ],
            [
                'title' => 'Tofu Adobo (₱40 Vegetarian Budget)',
                'ingredients' => [
                    '1 block firm tofu, cubed (₱15)',
                    '1/4 cup soy sauce',
                    '2 tbsp vinegar',
                    '3 cloves garlic, minced',
                    '1 small onion, sliced',
                    '1 bay leaf',
                    '1/2 tsp black pepper',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Heat oil in a pan over medium heat. Sauté garlic and onion until fragrant. Add tofu cubes and cook until lightly browned. Pour in soy sauce and vinegar. Add bay leaf and pepper. Bring to a boil, then reduce heat to low. Simmer for 10 minutes until sauce thickens. Season with salt. Serve with rice. Total cost: ~₱25",
                'user_id' => $users[5]->id,
            ],
            [
                'title' => 'Budget Chicken Curry (₱100 Budget)',
                'ingredients' => [
                    '100g chicken wings',
                    '1 small potato, cubed',
                    '1 small carrot, sliced',
                    '1 small onion, sliced',
                    '3 cloves garlic, minced',
                    '1 packet curry powder (₱5)',
                    '1 cup coconut milk',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Heat oil in a pot and sauté garlic and onion. Add chicken and cook until browned. Add curry powder and stir for 1 minute. Pour in coconut milk and bring to a boil. Add potato and carrot. Simmer for 20 minutes until chicken is tender and vegetables are soft. Season with salt. Serve with rice. Total cost: ~₱40",
                'user_id' => $users[6]->id,
            ],
            [
                'title' => 'Student Ginisang Munggo (₱30 Budget)',
                'ingredients' => [
                    '1 cup mung beans (₱10)',
                    '1 small onion, sliced',
                    '3 cloves garlic, minced',
                    '1 tomato, sliced',
                    '1 cup malunggay leaves',
                    '2 tbsp fish sauce',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Soak mung beans in water for 2 hours, then drain. In a pot, heat oil and sauté garlic, onion, and tomato. Add mung beans and 3 cups water. Bring to a boil and simmer for 30 minutes until beans are soft. Add malunggay leaves and fish sauce. Cook for 2 minutes. Season with salt. Serve with rice. Total cost: ~₱20",
                'user_id' => $users[7]->id,
            ],
            [
                'title' => 'Budget Beef Tapa (₱100 Budget)',
                'ingredients' => [
                    '100g beef sirloin, sliced thinly',
                    '3 tbsp soy sauce',
                    '2 tbsp vinegar',
                    '2 cloves garlic, minced',
                    '1/2 tsp black pepper',
                    '1 tbsp cooking oil',
                    '2 eggs',
                    'Salt to taste'
                ],
                'instructions' => "Marinate beef in soy sauce, vinegar, garlic, and pepper for 30 minutes. Heat oil in a pan over medium heat. Cook beef slices until browned and crispy. Remove from pan. In the same pan, fry eggs sunny side up. Serve beef tapa with fried eggs and rice. Total cost: ~₱50",
                'user_id' => $users[0]->id,
            ],
            [
                'title' => 'Budget Kare-Kare (₱100 Budget)',
                'ingredients' => [
                    '100g pork belly, cut into pieces',
                    '1/2 cup peanut butter',
                    '1 bunch string beans, cut',
                    '1 small eggplant, sliced',
                    '3 cloves garlic, minced',
                    '1 small onion, sliced',
                    '2 cups water',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Heat oil in a pot and sauté garlic and onion. Add pork and cook until browned. Pour in water and simmer for 30 minutes until pork is tender. Mix in peanut butter and stir well. Add vegetables and cook for 10 minutes until tender. Season with salt. Serve with rice. Total cost: ~₱35",
                'user_id' => $users[1]->id,
            ],
            [
                'title' => 'Student Lumpia (₱30 Budget)',
                'ingredients' => [
                    '10 lumpia wrappers (₱15)',
                    '1 cup bean sprouts',
                    '1 small carrot, julienned',
                    '1 small onion, sliced',
                    '2 cloves garlic, minced',
                    '1 tbsp soy sauce',
                    '1 tbsp cooking oil',
                    'Salt to taste'
                ],
                'instructions' => "Heat oil in a pan and sauté garlic and onion. Add bean sprouts and carrot. Stir-fry for 3 minutes. Add soy sauce and season with salt. Let mixture cool. Place 2 tbsp of mixture on each lumpia wrapper and roll tightly. Heat oil in a pan and fry lumpia until golden brown. Serve with sweet chili sauce. Total cost: ~₱30",
                'user_id' => $users[2]->id,
            ],
            [
                'title' => 'Budget Tinolang Manok (₱100 Budget)',
                'ingredients' => [
                    '100g chicken wings',
                    '1 thumb ginger, sliced',
                    '3 cloves garlic, minced',
                    '1 small onion, sliced',
                    '1 small green papaya, sliced',
                    '1 cup malunggay leaves',
                    '3 cups water',
                    '2 tbsp fish sauce',
                    'Salt to taste'
                ],
                'instructions' => "In a pot, heat oil and sauté ginger, garlic, and onion until fragrant. Add chicken pieces and cook until lightly browned. Pour in water and bring to a boil. Reduce heat and simmer for 25 minutes until chicken is tender. Add green papaya and cook for 5 minutes. Add malunggay leaves and cook for 2 minutes. Season with fish sauce and salt. Serve hot with rice. Total cost: ~₱40",
                'user_id' => $users[3]->id,
            ],
        ];

        // Use RecipeFactory to create recipes
        foreach ($budgetRecipes as $recipeData) {
            Recipe::create([
                'title' => $recipeData['title'],
                'ingredients' => $recipeData['ingredients'],
                'instructions' => $recipeData['instructions'],
                'user_id' => $recipeData['user_id'],
            ]);
        }

        $this->command->info('Test data (users and recipes) seeded successfully!');
    }
} 