<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserVisit;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function visits()
    {
        $user = Auth::user();

        $query = UserVisit::selectRaw('user_id, DATE(created_at) as date, COUNT(*) as visits')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('user_id', 'date')
            ->orderBy('date');

        // Non-admins see only their own visits
        if (!$user->hasRole('admin')) {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->get());
    }
}
