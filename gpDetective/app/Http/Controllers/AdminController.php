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

        $totalUsers = User::count();

        $users = User::with('casos')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Auth/DashboardAdm', [
            'users' => $users,
            'totalUsers' => $totalUsers,
        ]);
    }

    public function detalleUsuario(User $user)
    {
        $this->authorizeAdmin();

        $user->load('casos');

        return Inertia::render('Auth/DetalleUsuario', [
            'user' => $user,
        ]);
    }

    protected function authorizeAdmin()
    {
        if (auth()->user()->rol !== 'ADMIN') {
            abort(403);
        }
    }
}
