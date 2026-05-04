<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $this->authorizeAdmin();

        $users = User::with('casos')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Auth/DashboardAdm', [
            'users' => $users,
        ]);
    }

    protected function authorizeAdmin()
    {
        if (auth()->user()->rol !== 'ADMIN') {
            abort(403);
        }
    }
}
