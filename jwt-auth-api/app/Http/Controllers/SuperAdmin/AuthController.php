<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('superadmin.auth.login');
    }

    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    // Attempt login
    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        $user = Auth::user();

        // Check if user is super-admin
        if (!$user->hasRole('super-admin')) {
            Auth::logout();
            return back()->withErrors([
                'email' => 'You are not authorized as a super-admin.',
            ])->onlyInput('email');
        }

        return redirect()->intended(route('superadmin.dashboard'));
    }

    return back()->withErrors([
        'email' => 'Invalid credentials.',
    ])->onlyInput('email');
}


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('superadmin.login');
    }
}
