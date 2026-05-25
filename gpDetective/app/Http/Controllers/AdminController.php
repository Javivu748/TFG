<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Caso;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\CerrarCasoMail;
use Illuminate\Support\Facades\Mail;

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
    public function alternarEstado($id)
    {
        $this->authorizeAdmin();

        $caso = Caso::findOrFail($id);

        $user = User::findOrFail($caso->detective_id);

        if ($caso->estado === 'Pendiente') {
            $caso->estado = 'En Proceso';
        } elseif ($caso->estado === 'En Proceso') {
            $caso->estado = 'Pendiente';
        }
        $caso->save();

        return redirect()->back()->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Estado del caso actualizado correctamente.',
        ]);;
    }

    public function detalleUsuario(User $user)
    {
        $this->authorizeAdmin();

        $user->load([
            'casos',
            'detective.casos.user:id,nombre,email' 
        ]);

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

    public function eliminarCaso($id)
    {
        $this->authorizeAdmin();

        $caso = Caso::findOrFail($id);
        $user = User::findOrFail($caso->user_id);

        Mail::to($user->email)
            ->send(new CerrarCasoMail($user, $caso));

        $caso->delete();


        return redirect()->back()->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Caso Cerrado Coorrectamente',
        ]);
    }

    protected function authorizeAdmin()
    {
        if (auth()->user()->rol !== 'ADMIN') {
            abort(403);
        }
    }
}
