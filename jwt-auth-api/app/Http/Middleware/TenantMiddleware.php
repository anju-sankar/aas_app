<?php
// app/Http/Middleware/TenantMiddleware.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TenantMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check() && !Auth::user()->hasRole('super-admin')) {
            // Scope users by tenant
            $request->merge(['tenant_id' => Auth::user()->tenant_id]);
        }
        return $next($request);
    }
}
