<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminEmail = 'admin@example.com';

        // 1️⃣ Create roles if they don't exist
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // 2️⃣ Check if admin user already exists
        $admin = User::where('email', $adminEmail)->first();

        if (!$admin) {
            // 3️⃣ Create the admin user
            $admin = User::create([
                'name' => 'Admin',
                'email' => $adminEmail,
                'password' => Hash::make('admin123'), // default password
            ]);

            $this->command->info('Admin user created: ' . $adminEmail);
        } else {
            $this->command->info('Admin user already exists.');
        }

        // 4️⃣ Assign the admin role
        if (!$admin->hasRole('admin')) {
            $admin->assignRole($adminRole);
            $this->command->info('Admin role assigned to user.');
        }
    }
}
