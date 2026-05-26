<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (! $user || $user->rol !== 'ADMIN' || ! $user->administrador) {
            return redirect()->route('dashboard')
                ->with('alerta', [
                    'tipo'    => 'Error',
                    'mensaje' => 'No puedes acceder a esta sección.',
                ]);
        }
        return $next($request);
    }
}