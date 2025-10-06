<?php
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use App\Http\Middleware\LogUserVisits;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\CheckPermission;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Middleware aliases
        $middleware->alias([
            'role' => CheckRole::class,
            'permission' => CheckPermission::class,
            'log.visits' => LogUserVisits::class,
        ]);

        // Global middleware
        $middleware->append(LogUserVisits::class);

        // Assign to groups
        $middleware->appendToGroup('web', LogUserVisits::class);
        $middleware->appendToGroup('api', LogUserVisits::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
