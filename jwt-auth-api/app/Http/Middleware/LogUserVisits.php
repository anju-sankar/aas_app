<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\UserVisit;
use Illuminate\Support\Facades\Auth;

class LogUserVisits
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && $request->isMethod('GET')) {

            // Map route paths to friendly page names
            $routeMap = [
                'dashboard' => 'Dashboard',
                'profile'   => 'Profile',
                'settings'  => 'Settings',
                // add more mappings here
            ];

            $path = $request->path(); // returns the route like 'dashboard'

            if (isset($routeMap[$path])) {
                UserVisit::create([
                    'user_id' => Auth::id(),
                    'page'    => $routeMap[$path],
                    'ip'      => $request->ip(),
                ]);
            }
        }

        return $next($request);
    }
}
