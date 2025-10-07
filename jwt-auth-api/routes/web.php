<?php
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\SuperAdmin\AuthController;
use App\Http\Controllers\SuperAdmin\DashboardController;
use App\Http\Controllers\SuperAdmin\TenantController;


Route::get('/', function () {
    return view('welcome');
});
//Super-admin login routes
Route::prefix('superadmin')->name('superadmin.')->group(function () {
    Route::get('/', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

// Super-admin protected routes
Route::prefix('superadmin')->name('superadmin.')->middleware(['auth', 'role:super-admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Tenant CRUD
    Route::get('tenants', [TenantController::class, 'index'])->name('tenants.index');
    Route::get('tenants/create', [TenantController::class, 'create'])->name('tenants.create');
    Route::post('tenants', [TenantController::class, 'store'])->name('tenants.store');
    Route::get('tenants/{tenant}', [TenantController::class, 'show'])->name('tenants.show');
    Route::get('tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');
    Route::put('tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
    Route::delete('tenants/{tenant}', [TenantController::class, 'destroy'])->name('tenants.destroy');
});

// Social login routes
// Route::prefix('auth')->group(function () {
//     Route::get('{provider}/callback', [SocialAuthController::class, 'handleProviderCallback'])
//         ->where('provider', 'google|facebook|github');
//     Route::get('{provider}', [SocialAuthController::class, 'redirectToProvider'])
//         ->where('provider', 'google|facebook|github');
// });

//   Route::get('/auth/{provider}/callback', function() {
//       return 'Route works!';
//  });

 Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);
 Route::get('/auth/{provider}', [SocialAuthController::class, 'redirectToProvider']);
