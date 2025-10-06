<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserVisit;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserVisitsSeeder extends Seeder
{
    public function run(): void
    {
        // Clean table first (optional)
        DB::table('user_visits')->truncate();

        // Pages to simulate visits
        $pages = ['dashboard', 'profile', 'settings'];

        // Get all users
        $users = User::all();

        // Generate visits for last 7 days
        foreach ($users as $user) {
            for ($days = 0; $days < 7; $days++) {
                $date = Carbon::now()->subDays($days);
                foreach ($pages as $page) {
                    // Random number of visits per page per day
                    $visitsCount = rand(1, 5);
                    for ($i = 0; $i < $visitsCount; $i++) {
                        UserVisit::create([
                            'user_id' => $user->id,
                            'page' => $page,
                            'ip' => '127.0.0.1',
                            'created_at' => $date,
                            'updated_at' => $date,
                        ]);
                    }
                }
            }
        }
    }
}
