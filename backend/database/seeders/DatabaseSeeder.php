<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the test data seeder
        $this->call([
            TestDataSeeder::class,
        ]);

        // Create additional test user
        User::factory()->create([
            'name' => 'Juan Dela Cruz',
            'email' => 'juan.delacruz@example.com',
        ]);
    }
}
