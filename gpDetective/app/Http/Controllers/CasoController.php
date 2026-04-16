<?php

namespace App\Http\Controllers;

use App\Models\Caso;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CasoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'casos' => Auth()->user()->casos()->orderBy('created_at','desc')->get()
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
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:1000',
            'estado' => 'nullable|string|max:100',
        ]);

        Auth()->user()->casos()->create([
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'] ?? '',
            'estado' => $validated['estado'] ?? 'Pendiente',
        ]);

        return redirect()->route('dashboard')->with('success', 'Caso creado correctamente.');
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
