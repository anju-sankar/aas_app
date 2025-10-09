<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnalyticsController;

Route::prefix('auth')->group(function () {
    // Specific routes first
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('users', [AuthController::class, 'listUsers'])->middleware('auth:api');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::get('/analytics/visits', [AnalyticsController::class, 'visits'])->middleware('auth:api');
 
});

