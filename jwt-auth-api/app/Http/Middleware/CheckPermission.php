<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    public function handle(Request $request, Closure $next, ...$perms)
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        foreach ($perms as $p) {
            if ($user->hasPermissionTo($p)) {
                return $next($request);
            }
        }
        return response()->json(['error' => 'Forbidden'], 403);
    }
}
