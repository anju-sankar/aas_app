<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        // Make sure the role exists
        Role::firstOrCreate(['name' => 'super-admin']);

        // Check if a super admin already exists
        if (!User::where('email', 'superadmin@example.com')->exists()) {
            User::create([
                'name' => 'Super Admin',
                'email' => 'superadmin@example.com',
                'password' => Hash::make('password123'), // Change to secure password
            ])->assignRole('super-admin');

            $this->command->info('Super Admin created: superadmin@example.com / password123');
        } else {
            $this->command->info('Super Admin already exists.');
        }
    }
}
