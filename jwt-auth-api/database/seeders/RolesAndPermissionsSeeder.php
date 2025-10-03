<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cache (optional but recommended)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

         // Disable foreign key checks (MySQL/SQLite)
        // DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // // Delete existing data safely
        // DB::table('role_has_permissions')->truncate();
        // DB::table('model_has_roles')->truncate();
        // DB::table('model_has_permissions')->truncate();
        // DB::table('roles')->truncate();
        // DB::table('permissions')->truncate();

        // // Re-enable foreign key checks
        // DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create roles
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        // Example permissions (optional)
        Permission::firstOrCreate(['name' => 'view dashboard', 'guard_name' => 'web']);
        Permission::firstOrCreate(['name' => 'manage users', 'guard_name' => 'web']);

        // Assign permissions to roles
        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->givePermissionTo(['view dashboard', 'manage users']);

        $userRole = Role::where('name', 'user')->first();
        $userRole->givePermissionTo(['view dashboard']);


        /*
        // create permissions
        Permission::create(['name' => 'create post']);
        Permission::create(['name' => 'edit post']);
        Permission::create(['name' => 'delete post']);
        Permission::create(['name' => 'view post']);

        // create roles and assign permissions
        $roleUser = Role::create(['name' => 'user']);
        $roleUser->givePermissionTo('view post');

        $roleEditor = Role::create(['name' => 'editor']);
        $roleEditor->givePermissionTo(['view post', 'create post', 'edit post']);

        $roleAdmin = Role::create(['name' => 'admin']);
        $roleAdmin->givePermissionTo(Permission::all());
        */
    }
}
