<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Caso;
use App\Models\User;
use App\Models\Detective;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\NuevoCasoMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class CasoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $casos = Auth::user()->casos()
            ->with(['evidencias' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->through(function ($caso) {
                $caso->evidencias = $caso->evidencias->map(function ($evidencia) {
                    $evidencia->archivo_url = $evidencia->archivo
                        ? Storage::url($evidencia->archivo)
                        : null;

                    return $evidencia;
                });

                return $caso;
            });

        return Inertia::render('Dashboard', [
            'casos' => $casos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $detectives = Detective::with('user:id,nombre')
            ->where('estado', 'activo')
            ->get()
            ->map(fn($d) => [
                'id'     => $d->id,
                'nombre' => $d->user->nombre ?? 'Sin nombre',
                'badge'  => $d->badge_number,
            ]);

        return Inertia::render('Auth/CrearCaso', [
            'detectives' => $detectives,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $casoHoy = Auth::user()->casos()
            ->whereDate('created_at', Carbon::today())
            ->exists();

        if ($casoHoy) {
            return redirect()->route('dashboard')->with('alerta', [
                'tipo'    => 'Error',
                'mensaje' => 'Ya has creado un caso intentelo mañana',
            ]);
        }

        $validated = $request->validate([
            'titulo'        => 'required|string|max:255',
            'descripcion'   => 'nullable|string|max:1000',
            'estado'        => 'nullable|string|max:100',
            'detective_id'  => 'nullable|exists:detectives,id',
            'lat'           => 'nullable|numeric|between:-90,90',
            'lng'           => 'nullable|numeric|between:-180,180',
            // --- Evidencia (opcional al crear el caso) ---
            'evidencia_titulo'  => 'nullable|string|max:300',
            'evidencia_archivo' => 'nullable|file|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        $user = Auth::user();

        $caso = Auth::user()->casos()->create([
            'titulo'       => $validated['titulo'],
            'descripcion'  => $validated['descripcion'] ?? '',
            'estado'       => $validated['estado'] ?? 'Pendiente',
            'detective_id' => $validated['detective_id'] ?? null,
            'lat'          => $validated['lat'] ?? null,
            'lng'          => $validated['lng'] ?? null,
        ]);

        // Si viene archivo, guardar la evidencia ligada al caso
        if ($request->hasFile('evidencia_archivo')) {
            $ruta = $request->file('evidencia_archivo')->store('evidencias', 'public');

            $caso->evidencias()->create([
                'titulo'  => $validated['evidencia_titulo'],
                'archivo' => $ruta,
            ]);
        }

        if ($caso->detective_id) {
            $detective = Detective::with('user')->find($caso->detective_id);

            Mail::to($detective->user->email)
                ->send(new NuevoCasoMail($user, $caso));
        }

        return redirect()->route('dashboard')->with('alerta', [
            'tipo'    => 'Exito',
            'mensaje' => 'Caso creado correctamente.',
        ]);
    }

    public function createEvidencia(Caso $caso)
    {
        $caso = Auth::user()->casos()->findOrFail($caso->id);

        $evidenciasCount = $caso->evidencias()->count();

        if ($evidenciasCount >= 3) {
            return redirect()->route('dashboard')->with('alerta', [
                'tipo'    => 'Error',
                'mensaje' => 'Este caso ya alcanzó el máximo de 3 evidencias.',
            ]);
        }

        return Inertia::render('Auth/CrearEvidencia', [
            'caso' => $caso,
            'evidencias_count' => $evidenciasCount,
        ]);
    }

    public function storeEvidencia(Request $request, Caso $caso)
    {
        $caso = Auth::user()->casos()->findOrFail($caso->id);

        $evidenciasCount = $caso->evidencias()->count();

        if ($evidenciasCount >= 3) {
            return redirect()->route('dashboard')->with('alerta', [
                'tipo'    => 'Error',
                'mensaje' => 'Este caso ya alcanzó el máximo de 3 evidencias.',
            ]);
        }

        $validated = $request->validate([
            'titulo'  => 'required|string|max:255',
            'archivo' => 'required|file|mimes:jpg,jpeg,png,pdf,mp4|max:20480',
        ]);

        $ruta = $request->file('archivo')->store('evidencias', 'public');

        $caso->evidencias()->create([
            'titulo'  => $validated['titulo'],
            'archivo' => $ruta,
        ]);

        return redirect()->route('dashboard')->with('alerta', [
            'tipo'    => 'Exito',
            'mensaje' => 'Evidencia añadida correctamente.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Caso $caso)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Caso $caso)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Caso $caso)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Caso $caso)
    {
        //
    }
}
