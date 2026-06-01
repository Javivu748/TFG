<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Caso;
use App\Models\Detective;
use App\Models\Administrador;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\CerrarCasoMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeAdmin();



        $query = User::with(['casos']);



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
            'adminAuth'  => auth()->user()->load('administrador'),
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

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return redirect()->route('admin.dashboard')->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Usuario eliminado correctamente',
        ]);
    }

    public function cambiarRolUser($id){
        $this->authorizeAdmin();

        $user = User::findOrFail($id);

        if ($user->rol === 'USER') {
            return redirect()->back()->with('alerta', [
                'tipo' => 'Info',
                'mensaje' => 'El usuario ya tiene el rol de usuario.',
            ]);
        }

        // Si tiene algun otro rol anterior quitarselo
        if ($user->administrador) {
            $user->administrador()->delete();
        }

        if ($user->detective) {
            $user->detective()->delete();
        }

        // Cambiar rol del usuario
        $user->rol = 'USER';
        $user->save();

        return redirect()->back()->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Usuario convertido a usuario correctamente.',
        ]);
    }

    public function cambiarRolDetec($id){
        $this->authorizeAdmin();

        $user = User::findOrFail($id);

        if ($user->rol === 'Detective') {
            return redirect()->back()->with('alerta', [
                'tipo' => 'Info',
                'mensaje' => 'El usuario ya tiene el rol de detective.',
            ]);
        }

        // Si tiene un administrador asociado, eliminarlo
        if ($user->administrador) {
            $user->administrador()->delete();
        }

        // Crear detective asociado
        Detective::create([
            'user_id' => $user->id,
            'especialidad' => 'General',
            'estado' => 'Activo',
        ]);

        // Cambiar rol del usuario
        $user->rol = 'Detective';
        $user->save();

        return redirect()->back()->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Usuario convertido a detective correctamente.',
        ]);
    }

    public function cambiarRolAdmin($id){
        $this->authorizeAdmin();

        $user = User::findOrFail($id);

        if ($user->rol === 'ADMIN') {
            return redirect()->back()->with('alerta', [
                'tipo' => 'Info',
                'mensaje' => 'El usuario ya tiene el rol de administrador.',
            ]);
        }

        // Si tiene un detective asociado, eliminarlo
        if ($user->detective) {
            $user->detective()->delete();
        }

        // Crear administrador asociado
        Administrador::create([
            'user_id' => $user->id,
            'cargo' => 'Administrador',
            'estado' => 'activo',
        ]);

        // Cambiar rol del usuario
        $user->rol = 'ADMIN';
        $user->save();

        return redirect()->back()->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Usuario convertido a administrador correctamente.',
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
