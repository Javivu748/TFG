<?php
// app/Http/Controllers/DetectiveController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Caso;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use App\Models\Evidencia;
use Illuminate\Support\Facades\Mail;
use App\Mail\CerrarCasoMail;

class DetectiveController extends Controller
{
    // Panel principal — lista de casos asignados
    public function index(Request $request)
    {
        $detective = auth()->user()->detective;

        if (!$detective) {
            return redirect()->route('dashboard')
                ->with('alerta', [
                    'tipo'    => 'Exito',
                    'mensaje' => 'Caso creado correctamente.',
                ]);
        }

        $casos = $detective->casos()
            ->with('user:id,nombre,email') // quien creó el caso
            ->when($request->search, function ($query, $search) {
                $query->where('titulo', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        $cMap = $detective->casos()
            ->whereNotNull('lat')
            ->whereNotNull('lng')
            ->with('user:id,nombre')
            ->select('id', 'titulo', 'estado', 'lat', 'lng', 'user_id')
            ->get();

        return Inertia::render('Detective/Dashboard', [
            'casos'       => $casos,
            'casosMapa'  => $cMap,
            'totalCasos'  => $detective->casos()->count(),
            'detective'   => $detective->load('user:id,nombre,email'),
            'flash'       => ['alerta' => session('alerta')],
        ]);
    }

    // Ver detalle de un caso
    public function show($id)
    {
        $detective = auth()->user()->detective;

        if (! $detective) {
            abort(403, 'No autorizado');
        }

        // Solo puede ver sus propios casos
        $caso = $detective->casos()
            ->with('user:id,nombre,email,telefono')
            ->with('evidencias')
            ->findOrFail($id);

        return Inertia::render('Detective/Detalle', [
            'caso' => $caso,
        ]);
    }

    // Descargar evidencia
    public function descargarEvidencia($id)
    {
        $detective = auth()->user()->detective;

        if (!$detective) {
            abort(403, 'No autorizado');
        }

        $evidencia = Evidencia::findOrFail($id);

        if ($evidencia->caso->detective_id !== $detective->id) {
            abort(403, 'No autorizado');
        }

        $rutaArchivo = $evidencia->archivo;

        if (!Storage::disk('public')->exists($rutaArchivo)) {
            abort(404, 'Archivo no encontrado');
        }

        return Storage::disk('public')->download($rutaArchivo, basename($rutaArchivo));
    }

    public function cerrarCaso($id)
    {

        $caso = Caso::with('evidencias')->findOrFail($id);
        $user = User::findOrFail($caso->user_id);

        foreach ($caso->evidencias as $evidencia) {
            if ($evidencia->archivo) {
                Storage::disk('public')->delete($evidencia->archivo);
            }
        }

        Mail::to($user->email)
            ->send(new CerrarCasoMail($user, $caso));

        $caso->delete();

        return redirect()->route('detective.dashboard')->with('alerta', [
            'tipo' => 'Exito',
            'mensaje' => 'Caso Cerrado Coorrectamente',
        ]);
    }
}
