<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\AnalyticsController;

Route::prefix('auth')->group(function () {
    // Specific routes first
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('users', [AuthController::class, 'listUsers']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::get('/analytics/visits', [AnalyticsController::class, 'visits'])->middleware('auth:api');

    // Wildcard provider routes LAST
    Route::get('{provider}', [SocialAuthController::class, 'redirectToProvider']);
    Route::get('{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);
});

