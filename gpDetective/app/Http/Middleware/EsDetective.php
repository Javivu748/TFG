<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EsDetective
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (! $user || $user->rol !== 'Detective' || ! $user->detective) {
            return redirect()->route('dashboard')
                ->with('alerta', [
                    'tipo'    => 'Error',
                    'mensaje' => 'No puedes acceder a esta sección.',
                ]);
        }

        return $next($request);
    }
}
