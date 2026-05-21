<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Caso;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\NuevoCasoMail;
use Illuminate\Support\Facades\Mail;

class CasoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'casos' => Auth()->user()->casos()->orderBy('created_at', 'desc')->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/CrearCaso');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $casoHoy = Auth()->user()->casos()
            ->whereDate('created_at', Carbon::today())
            ->exists();

        if ($casoHoy) {
            return redirect()->route('dashboard')->with('alerta', [
                'tipo' => 'Error',
                'mensaje' => 'Ya has creado un caso intentelo mañana',
            ]);
        }
        
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:1000',
            'estado' => 'nullable|string|max:100',
        ]);

        $user = Auth::user();

        $caso = Auth()->user()->casos()->create([
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'] ?? '',
            'estado' => $validated['estado'] ?? 'Pendiente',
        ]);

        Mail::to("javivu9@gmail.com")
            ->send(new NuevoCasoMail($user, $caso));

        return redirect()->route('dashboard')->with('alerta', [
                'tipo' => 'Exito',
                'mensaje' => 'Caso creado correctamente.',
            ]);;
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
