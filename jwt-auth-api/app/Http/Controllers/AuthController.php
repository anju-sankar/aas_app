<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tenant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new user (self-registration based on domain)
     */
    public function register(Request $request)
    {
        // Determine tenant from the request domain
        $tenantDomain = $request->header('X-Tenant-Domain') ?? $request->input('tenant_domain');

        if (!$tenantDomain) {
            abort(400, 'Tenant not specified');
        }

        $tenant = Tenant::where('domain', $tenantDomain)->first();
        if (!$tenant) {
            return response()->json(['error' => 'Tenant not found for this domain'], 404);
        }

        // Validate incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create user assigned to the tenant
        $user = User::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'password'   => bcrypt($request->password),
            'tenant_id'  => $tenant->id,
        ]);

        // Assign default "user" role
        $user->assignRole('tenant-user');
        $user->load('roles');

        // Issue a JWT token with tenant_id claim
        $token = auth('api')
            ->claims(['tenant_id' => $tenant->id, 'roles' => $user->getRoleNames()])
            ->login($user);

        return response()->json([
            'message'       => 'User registered successfully',
            'access_token'  => $token,
            'token_type'    => 'bearer',
            'user'          => $user,
            'roles'         => $user->getRoleNames(),
        ], 200);
    }

    /**
     * User login
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');        

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        
        $user = auth('api')->user();

        // Add tenant_id and roles in JWT claims
        $token = auth('api')
            ->claims([
                'tenant_id' => $user->tenant_id,
                'roles' => $user->getRoleNames(),
            ])
            ->login($user);

        $user->load('roles');

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user'         => $user,
            'roles'        => $user->getRoleNames(),
        ], 200);
    }

    /**
     * Get currently authenticated user
     */
    public function me()
    {
        $user = auth('api')->user();
        $user->load('roles');

        return response()->json([
            'user'  => $user,
            'roles' => $user->getRoleNames(),
        ]);
    }

    /**
     * Logout current user (invalidate token)
     */
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh JWT token
     */
    public function refresh()
    {
        $newToken = auth('api')->refresh();
        return $this->respondWithToken($newToken);
    }

    /**
     * List users (tenant admin or super-admin only)
     */
    public function listUsers(Request $request)
    {
        $currentUser = auth('api')->user();

        // Tenant scope: super-admin sees all, others see within tenant
        $query = User::query()->with('roles');
        if (!$currentUser->hasRole('super-admin')) {
            $query->where('tenant_id', $currentUser->tenant_id);
        }

        // Optional: exclude current user
        $query->where('id', '!=', $currentUser->id);

        // Pagination
        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);
        $total = $query->count();

        $users = $query->skip(($page - 1) * $pageSize)->take($pageSize)->get();

        $users = $users->map(function ($user) {
            return [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ];
        });

        return response()->json([
            'data'     => $users,
            'total'    => $total,
            'page'     => $page,
            'pageSize' => $pageSize,
        ]);
    }

    /**
     * Helper: uniform JWT response
     */
    protected function respondWithToken($token)
    {
        $user = auth('api')->user();
        $user->load('roles');

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'user'         => $user,
            'roles'        => $user->getRoleNames(),
        ], 200);
    }
}
