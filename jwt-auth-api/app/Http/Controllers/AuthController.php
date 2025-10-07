<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Assign default role "user"
        $user->assignRole('user');

        // Load roles for frontend
        $user->load('roles');

        // Issue JWT token immediately
        $token = auth('api')->login($user); // Use your JWT guard

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'roles' => $user->getRoleNames(), // ['user'] or ['admin']
            'message' => 'User registered successfully'
        ], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Load roles for frontend
        $user->load('roles');

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user,
            'roles' => $user->getRoleNames(), // send role names to frontend
        ], 200);
    }

    public function me()
    {
        $user = auth('api')->user();
        $user->load('roles');
        return response()->json([
            'user' => $user,
            'roles' => $user->getRoleNames(),
        ]);
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }
    
    
    /**
     * List all users (Admin only)
     */
    public function listUsers(Request $request)
    {
        $currentUserId = auth('api')->id();

        // Get pagination params, default page=1, pageSize=10
        $page = (int) $request->query('page', 1);
        $pageSize = (int) $request->query('pageSize', 10);

        // Query users, exclude current user
        $query = User::where('id', '!=', $currentUserId)->with('roles');

        $total = $query->count();

        $users = $query
            ->skip(($page - 1) * $pageSize)
            ->take($pageSize)
            ->get();

        // Format roles as array of names
        $users = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ];
        });

        return response()->json([
            'data' => $users, // frontend expects 'data' key
            'total' => $total,
            'page' => $page,
            'pageSize' => $pageSize,
        ]);
    }


    protected function respondWithToken($token)
    {
        $user = auth('api')->user();
        $user->load('roles');

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user,
            'roles' => $user->getRoleNames(),
        ], 200);
    }
}
