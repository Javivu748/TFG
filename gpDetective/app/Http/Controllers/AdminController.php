<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeAdmin();



        $query = User::with('casos');



        if ($request->filled('search')) {
            $query->where('nombre', 'like', "%{$request->search}%")->get();
        }

        $totalUsers = $query->count();

        $users = $query
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
            'users' => $user,
        ]);
    }

    public function eliminarUsuario(User $user)
    {
        $this->authorizeAdmin();

        $user->delete();

        return redirect()->route('admin.dashboard')->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Usuario eliminado correctamente',
        ]);
    }

    protected function authorizeAdmin()
    {
        if (auth()->user()->rol !== 'ADMIN') {
            abort(403);
        }
    }
}
