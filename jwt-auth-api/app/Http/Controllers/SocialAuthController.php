<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\Tenant;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class SocialAuthController extends Controller
{
    /**
     * Redirect to social provider (Google, Facebook, etc.)
     */
    public function redirectToProvider($provider, Request $request)
    {   
        $tenantDomain = $request->input('tenant_domain');

        if (!$tenantDomain) {
            abort(400, 'Tenant not specified');
        }

        $encodedState = base64_encode($tenantDomain);

        return Socialite::driver($provider)
            ->stateless()
            ->with(['state' => $encodedState])
            ->redirect();
    }

    /**
     * Handle provider callback and issue JWT
     */
    public function handleProviderCallback($provider, Request $request)
    {
        // Get tenant domain from state
        $encodedState = $request->input('state');
        $tenantDomain = $encodedState ? base64_decode($encodedState) : null;
        if (!$tenantDomain) {
            return response()->json(['error' => 'Tenant domain missing or invalid'], 400);
        }

        $tenant = \App\Models\Tenant::where('domain', $tenantDomain)->firstOrFail();
        
        if (!$tenant) {
            return response()->json(['error' => 'Tenant not found for this domain'], 404);
        }

        $socialUser = Socialite::driver($provider)->stateless()->user();

        if (!$socialUser->getEmail()) {
            return response()->json(['error' => 'No email returned from provider'], 422);
        }

        // Find or create tenant-specific user
        $user = User::where('email', $socialUser->getEmail())
            ->where('tenant_id', $tenant->id)
            ->first();

        if (!$user) {
            $user = User::create([
                'name'       => $socialUser->getName() ?? $socialUser->getNickname() ?? 'Social User',
                'email'      => $socialUser->getEmail(),
                'password'   => bcrypt(Str::random(16)), // Random secure password
                'tenant_id'  => $tenant->id,
            ]);

            // Assign default role only on creation
            $user->assignRole('tenant-user');
        }

        $user->load('roles');

        // Issue JWT token with tenant_id + roles claim
        $token = auth('api')
            ->claims([
                'tenant_id' => $tenant->id,
                'roles'     => $user->getRoleNames(),
            ])
            ->login($user);

        // Use configured or fallback frontend URL
        $frontendUrl = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:3000'));

        return redirect($frontendUrl . '/oauth-success?token=' . $token);
    }
}
