<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompletarPerfil extends Controller
{
         public function show()
    {
        return Inertia::render('Auth/posLogin');
    }

    public function update(Request $request)
    {
        $request->validate([
            'telefono' => 'required|string|max:20|unique:users,telefono',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = $request->user();

        $user->update([
            'telefono' => $request->telefono,
            'password' => $request->password ? bcrypt($request->password) : null,
        ]);

        return redirect()->intended('/dashboard');
    }
}
