<?php

// app/Http/Controllers/TenantController.php
namespace App\Http\Controllers\SuperAdmin;

use App\Models\Tenant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::all();
        return view('superadmin.tenants.index', compact('tenants'));
    }

    public function create()
    {
        return view('superadmin.tenants.create');
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|unique:tenants,name',
        //     'domain' => 'nullable|unique:tenants,domain',
        //     'admin_name' => 'required|string',
        //     'admin_email' => 'required|email|unique:users,email',
        //     'admin_password' => 'required|string|min:6|confirmed',
        // ]);

        // 1️⃣ Create the tenant
        $tenant = Tenant::create($request->only('name', 'domain'));

        // 2️⃣ Create the default tenant admin user
        $user = \App\Models\User::create([
            'name' => $request->admin_name,
            'email' => $request->admin_email,
            'password' => bcrypt($request->admin_password),
            'tenant_id' => $tenant->id, // assign to tenant
        ]);

        // 3️⃣ Assign tenant-admin role (using Spatie)
        $user->assignRole('tenant-admin');

        return redirect()->route('superadmin.tenants.index')
                        ->with('success', 'Tenant and tenant admin created successfully');
    }


    public function show(Tenant $tenant)
    {
        // Get the tenant admin user email
        $adminEmail = \App\Models\User::where('tenant_id', $tenant->id)
                    ->role('tenant-admin')  // Spatie role filter
                    ->value('email');       // only get the email

        return view('superadmin.tenants.show', compact('tenant', 'adminEmail'));
    }
}
