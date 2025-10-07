<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $tenantCount = Tenant::count();
        $userCount = User::count();
        $tenantAdminCount = User::role('tenant-admin')->count();

        $recentTenants = Tenant::latest()->take(5)->get();

        return view('superadmin.dashboard', compact(
            'tenantCount',
            'userCount',
            'tenantAdminCount',
            'recentTenants'
        ));
    }
}
