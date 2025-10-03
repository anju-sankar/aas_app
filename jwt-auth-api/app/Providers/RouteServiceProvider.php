<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    // Remove or comment out the $namespace property
    // protected $namespace = 'App\\Http\\Controllers';

    public function boot()
    {
        parent::boot();
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            // Remove ->namespace($this->namespace) to avoid issues
            ->group(base_path('routes/api.php'));
    }

    public function map()
    {
        $this->mapApiRoutes();
        // You can add web routes here too if needed:
        // $this->mapWebRoutes();
    }

    // Optional if you have web routes
    // protected function mapWebRoutes()
    // {
    //     Route::middleware('web')
    //         ->group(base_path('routes/web.php'));
    // }
}
