<?php
// app/Http/Controllers/DetectiveController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('Detective/Dashboard', [
            'casos'       => $casos,
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
            ->findOrFail($id);

        return Inertia::render('Detective/DetalleCaso', [
            'caso' => $caso,
        ]);
    }
}
